/**
 * Created by ios on 13-12-26.
 */
var PopUpManager = cc.Class.extend({
    /**
     * PopupData 数组
     */
    mPopupInfo:[],
    /**
     * 已经打开的面板，PopupInfo 数组
     */
    mOpenList:[],

    mContainer:0,
    mIsNeedAlign:false,

    dispose:function(){
        if(this.mPopupInfo && this.mPopupInfo.length>0)
        {
            var len = this.mPopupInfo.length;
            for(var i = 0;i<len;++i)
            {
                if(this.mPopupInfo[i])
                {
                    this.mPopupInfo[i].dispose();
                }
            }
            this.mPopupInfo.length = 0;
        }

        if(this.mOpenList && this.mOpenList.length > 0)
        {
            len = this.mOpenList.length;
            for(i=0;i<len;++i)
            {
                if(this.mOpenList[i]){
                    this.mOpenList[i].release();
                }
            }
            this.mOpenList.length = 0;
        }

        if(this.mContainer)
        {
            this.mContainer.removeAllChildren();
            if(this.mContainer.getParent())
                this.mContainer.getParent().removeChild(this.mContainer);
            this.mContainer.release();
        }
    },

    initialize:function(container){
        this.mContainer = container;
        this.mContainer.retain();
    },
    /**
     * 注册窗口
     */
    registerPopUp:function(id,popup,theAppear){
        var o = this.getPopupData(popup);
        if(o == null){
            o 				= new PopUpData();
            o.id			= id;
            o.owner 		= popup;
            o.owner.retain();
            o.state     	= 0;

            var appear;
            if(theAppear == null)
            {
                appear = new AppearMove();
            }
            else
            {
                appear = theAppear;
            }
            appear.init(this.mContainer);
            o.appear		= appear;

            this.mPopupInfo.push(o);
        }
        return o;
    },
    /**
     * 删除窗口
     */
    removePopUp:function(popup){
        var n = this.mPopupInfo.length;
        for (var i = n-1; i >=0; i--)
        {
            var o = this.mPopupInfo[i];
            if (o.owner == popup)
            {
                this.mPopupInfo.splice(i,1);
                o.dispose();
            }
        }
    },
    /**
     * 打开窗口
     */
    open:function(idOrwindow,params,modal,type){
        if(null == modal)
            modal = true;
        if(null == type)
            type = PopWindowType.QUEUE;
        if(this.findWindowInfoByOwner(idOrwindow) != null)
        {
            cc.log("【PopupManager】 窗口已打开。")
            return;
        }
        var o = this.getPopupData(idOrwindow);
        if(o){
            var win = this.createWindowInfo(modal,type,params,o);
            this.startOpen(win);
        }
        else
        {
            throw Error("can't find the window" + idOrwindow);
        }
    },
    /**
     * 创建窗口数据对象
     */
    createWindowInfo:function(modal,type,params,popup){
        return new PopUpInfo(modal,type,params,popup);
    },
    /**
     * 关闭窗口
     */
    close:function(idOrwindow,params){
        var o = this.findWindowInfoByOwner(idOrwindow);
        if(o){
            o.params   	     = params;
            this.startClose(o);
        }
    },
    /**
     * 关闭所有窗口
     */
    closeAllPopUp:function(){
        var n = this.mOpenList.length;
        for (var i= 0; i < n; i++)
        {
            this.startClose(this.mOpenList[i]);
        }
    },
    /**
     *  准备打开窗口
     * @param o
     *
     */
    startOpen:function(win,from){
        if(null == from)
            from = 0;
        if(from == 0)
        {
            var containsOwner = (this.mContainer == win.popUpData.owner.getParent());
            this.createModalWindow(win.popUpData);
            if (win.modal)
            {
                if ( containsOwner )
                {
                    this.mContainer.addChild(win.popUpData.modalWindow
                        , win.popUpData.owner.getZOrder());
                }
                else
                {
                    this.mContainer.addChild(win.popUpData.modalWindow);
                }
                win.popUpData.modalWindow.setVisible(true);
            }
            if (!containsOwner)
            {
                this.mContainer.addChild(win.popUpData.owner);
            }
            this.mOpenList.push(win);
        }
        //加载素材
        if (win.popUpData.state == 0)
        {
            win.popUpData.state = 2;
            win.popUpData.owner.initilize();
        }

        win.popUpData.owner.setVisible(true);

        //处理打开窗口逻辑
        win.popUpData.owner.onOpen(win.params);
        win.params = null;
        win.popUpData.appear.appear(win,this.onOpenComplete,this);
    },
    /**
     * 打开结束
     */
    onOpenComplete:function(win){
        if(this.checkAutoAlign()){
            this.mIsNeedAlign = true;
            this.autoAlignPopUp();
        }

        win.popUpData.owner.setVisible(true);
        win.popUpData.owner.onOpenComplete();
    },
    /**
     * 只要有一个窗口的属性为多窗口并行。
     */
    checkAutoAlign:function(){
        var len = this.mOpenList.length;
        for (var i = 0; i < len; i++)
        {
            if(this.mOpenList[i].type == PopWindowType.PARALLEL){
                return true;
            }
        }
        return false;
    },
    /**
     * 定位各个并行窗口的位置
     *
     */
    autoAlignPopUp:function(){
        var n = this.mOpenList.length;
        if(n == 0){
            return;
        }
        var totalWidth = 0;
        var maxH       = 0;
        for (var i = 0; i < n; i++)
        {
            var owner = this.mOpenList[i].popUpData.owner;
            totalWidth += owner.getContentSize().width;
            maxH = Math.max(owner.getContentSize().height,maxH);
        }
        var winSize = cc.Director.getInstance().getWinSize();
        var originalStageW = winSize.width;
        var originalStageH = winSize.height;
        var startX = (originalStageW - totalWidth)/2;
        var startY = (originalStageH - maxH)/2;

        var targetX = 0;
        var targetY = 0;
        for (i = 0; i < n; i++)
        {
            owner   	  	= this.mOpenList[i].popUpData.owner;

            var anchorPoint = owner.getAnchorPointInPoints();
            targetY       	= startY + anchorPoint.y;
            if(i >0){
                var dis = this.mOpenList[i-1].popUpData.owner;
                var ap      = dis.getAnchorPointInPoints();
                targetX     += dis.getContentSize().width - ap.x + anchorPoint.x;
            }else{
                targetX 	= startX + anchorPoint.x;
            }
            var moveTo = cc.MoveTo.create(0.7,cc.p(targetX,targetY));
            var action = cc.EaseExponentialInOut.create(moveTo);
            owner.runAction(action);
        }
    },
    /**
     * 准备关闭窗口
     */
    startClose:function(o){
        o.popUpData.appear.disAppear(o,this.onCloseComplete,this);
    },
    /**
     * 关闭结束
     */
    onCloseComplete:function(o){
        if(o.modal){
            o.popUpData.modalWindow.setVisible(false);
            this.mContainer.removeChild(o.popUpData.modalWindow);
        }
        o.popUpData.owner.onCloseComplete();

        this.removeWindowData(this.mOpenList,o);

        if(this.mIsNeedAlign){
            this.autoAlignPopUp();
        }
    },
    /**
     * 创建模式窗口
     */
    createModalWindow:function(o){
        if(o.modalWindow == null){
            var sp = cc.Layer.create();
            if(!sp.init())
                return;

            var winSize = cc.Director.getInstance().getWinSize();
            sp.setContentSize(winSize);
            sp.setTouchMode(cc.TOUCH_ONE_BY_ONE);
            sp.setTouchEnabled(true);

            o.modalWindow = sp;
            o.modalWindow.retain();
        }
    },
    /**
     * 查找窗口数据
     */
    getPopupData:function(idOrWindow){
        var n = this.mPopupInfo.length;
        for (var i= 0; i < n; i++)
        {
            var o = this.mPopupInfo[i];
            if (o.owner == idOrWindow || o.id == idOrWindow)
                return o;
        }
        return null;
    },
    /**
     * 查找已打开的窗口数据
     */
    findWindowInfoByOwner:function(idOrwindow){
        var len = this.mOpenList.length;
        for (var i = 0; i < len; i++)
        {
            if(idOrwindow == this.mOpenList[i].popUpData.owner
                || idOrwindow == this.mOpenList[i].popUpData.id){
                return this.mOpenList[i];
            }
        }
        return null;
    },
    /**
     * 切换至最上层
     * @param popUp
     *
     */
    bringToFront:function(popUp){
        if(popUp && popUp.getParent())
        {
            var o = this.getPopupData(popUp);
            if (o && this.findWindowInfoByOwner(popUp))
            {
                popUp.setZOrder((popUp.getParent().getChildrenCount()-1));
            }
        }
    },
    /**
     * 删除窗口数据
     */
    removeWindowData:function(vector,o){
        var n = vector.length;
        for (var i = n-1; i >=0; i--)
        {
            var pd = vector[i];
            if (pd == o)
            {
                vector.splice(i,1);
                return;
            }
        }
    }
});

PopUpManager.getInstance = function(){
    return PopUpManager.instance? PopUpManager.instance:(PopUpManager.instance = new PopUpManager);
};