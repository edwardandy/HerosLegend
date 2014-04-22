/**
 * Created by ios on 13-12-26.
 */
var PopWindowType = {
    /**
     * 队列
     */
    QUEUE:0,
    /**
     * 覆盖
     */
    COVER:1,
    /**
     * 叠加
     */
    PARALLEL:2
};

var PopUpData = cc.Class.extend({
    id:'',
    owner:null,
    appear:null,
    /**
     * 状态：0：未加载，1：正在加载，2：加载完成
     */
    state:0,
    modalWindow:null,
    dispose:function(){
        if(this.owner)
            this.owner.release();
        if(this.appear)
            this.appear.dispose();
        if(this.modalWindow)
            this.modalWindow.release();
    }
});

var PopUpInfo = cc.Class.extend({
    /**
     * 是否是模式窗口
     */
    modal:false,
    /**
     * 0:队列,1:叠加 ,2:并行
     */
    type:0,
    /**
     * 参数
     */
    params:null,
    popUpData:null,
    ctor:function(modal,type,params,popup){
        if(modal)
            this.modal = modal;
        if(type)
            this.type = type;
        if(params)
            this.params = params;
        if(popup)
            this.popUpData = popup;

    },
    getBody:function(){
        return this;
    }
});

var IPopUpWindow = cc.Layer.extend({
    initilize:function(){

    },
    onOpen:function(params){

    },
    onOpenComplete:function(){

    },
    onClose:function(params){

    },
    onCloseComplete:function(){

    }
});