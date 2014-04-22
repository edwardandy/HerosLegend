/**
 * Created by chenyonghua on 13-10-31.
 */
TouchScaleLayer = cc.Layer.extend( {
    distance: 0,    //两个触摸点之间的距离
    deltax: 0,    //目标x轴的改变值
    deltay: 0,    //目标y轴的改变值
    mscale: 0,   //初始地图缩放比例
    flag:0,
    ctor:function()
    {
        this.mscale = 1;
        this._super();
        cc.associateWithNative(this, cc.Layer);
        if ('touches' in sys.capabilities)
            this.setTouchEnabled(true);
        else if ('mouse' in sys.capabilities)
            this.setMouseEnabled(true);
    },
    onTouchesBegan:function (touches, event) {
        if(touches.length>=2)
        {
            var mPoint1 = touches[0].getLocationInView();
            mPoint1     = cc.Director.getInstance().convertToGL(mPoint1);

            var mPoint2 = touches[1].getLocationInView();
            mPoint2     = cc.Director.getInstance().convertToGL(mPoint2);

            this.distance = cc.pDistance(mPoint1,mPoint2);//计算两个触摸点距离
            this.deltax = (mPoint1.x + mPoint2.x)/2;     //得到两个触摸点中点和精灵锚点的差值
            this.deltay = (mPoint1.y + mPoint2.y)/2;
        }
        else
        {
            this.flag = 1;
        }
    },
    onTouchesMoved: function (touches, event) {
        if(touches.length>=2)
        {
            var mPoint1 = touches[0].getLocationInView();
            mPoint1     = cc.Director.getInstance().convertToGL(mPoint1);

            var mPoint2 = touches[1].getLocationInView();
            mPoint2     = cc.Director.getInstance().convertToGL(mPoint2);
            var mdistance = cc.pDistance(mPoint1,mPoint2);
            if(this.distance == 0)
            {
                this.distance = mdistance;
            }
            if (this.flag == 0)
            {
                this.mscale = mdistance/this.distance * this.mscale;
                this.distance = mdistance;
                this.setScale(this.mscale);

//                var x = (mPoint2.x+mPoint1.x)/2;      //计算两触点中点与精灵锚点的差值
//                var y = (mPoint2.y+mPoint1.y)/2;
//                var diff = cc.pAdd(cc.p(x-this.deltax,y-this.deltay), this.getPosition());
//                this.setPosition(diff);
            }
            else
            {
                this.distance = mdistance;
            }
            this.deltax = (mPoint1.x + mPoint2.x)/2;     //得到两个触摸点中点和精灵锚点的差值
            this.deltay = (mPoint1.y + mPoint2.y)/2;

            this.flag = 0;
        }
        else if(touches.length == 1)
        {
            var touch = touches[0];
            var delta = touch.getDelta();
            var diff = cc.pAdd(delta, this.getPosition());
            this.setPosition(diff);
        }
    },
    onTouchesEnded:function(touches, event)
    {
        this.mscale = this.getScale();
        this.distance = 0;
        this.flag = 0;
    }
} )
;