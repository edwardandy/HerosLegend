/**
 * Created with JetBrains WebStorm.
 * User: yan.xing
 * Date: 14-1-15
 * Time: PM5:49
 * To change this template use File | Settings | File Templates.
 */

ResolutionHelper = Class.singleton({

    initialize : function( )
    {
        this.designedWidth  = 640;
        this.designedHeight = 960;

        var director = cc.Director.getInstance();

        var size = director.getWinSize();

        this.actualWidth    = size.width;
        this.actualHeight   = size.height;

        this.heightDiff     = this.actualHeight * ( this.designedWidth / this.actualWidth ) - this.designedHeight;

//        cc.log( "The actual view size :  Width & Height is " + this.actualViewWidth + ", " + this.actualViewHeight );
        cc.log( "The actual window size : width & height is " + this.actualWidth + ", " + this.actualHeight );
    },

    destroy: function()
    {
        ;
    },

    //由于我们是一个fixWidth的设定，一般需要调整的是顶部的内容需要向上或者向下移动
    shiftElementUp : function( point )
    {
        if ( !point || (point.x == undefined || point.x == null) || (point.y == undefined || point.y == null))
        {
            return {x:0, y:0};  //如果point非法，返回(0,0)
        }
        var heightDiff = this.actualHeight - this.designedHeight;

        return { x:point.x, y:point.y+heightDiff };
    },

    //传入的坐标是根据(640*960)来的设计坐标，然后，转出的是根据不同分辨率下设计的坐标
    transformPointWithXYScale : function( point )
    {
        if ( !point || (point.x == undefined || point.x == null) || (point.y == undefined || point.y == null))
        {
            return {x:0, y:0};  //如果point非法，返回(0,0)
        }

        var newPoint = {};

        newPoint.x = point.x * ( this.actualWidth / this.designedWidth );
        newPoint.y = point.y * ( this.actualHeight / this.designedHeight );

        return newPoint;
    },

    transformPointWithXScale : function( point )
    {
        if ( !point || (point.x == undefined || point.x == null) || (point.y == undefined || point.y == null))
        {
            return {x:0, y:0};  //如果point非法，返回(0,0)
        }

        var newPoint = {};

        newPoint.x = point.x * ( this.actualWidth / this.designedWidth );
        newPoint.y = point.y * ( this.actualWidth / this.designedWidth );

        return newPoint;
    },

    transformPointWithYScale : function( point )
    {
        if ( !point || (point.x == undefined || point.x == null) || (point.y == undefined || point.y == null))
        {
            return {x:0, y:0};  //如果point非法，返回(0,0)
        }

        var newPoint = {};

        newPoint.x = point.x * ( this.actualHeight / this.designedHeight );
        newPoint.y = point.y * ( this.actualHeight / this.designedHeight );

        return newPoint;
    },

    //某些列表在高度更高的设备中，需要将显示区域设置的更大一些，从而能够来充满屏幕
    getActualHeight : function( designedHeight )
    {
        if (!designedHeight)
        {
            return this.actualHeight;
        }
        else
        {
            return designedHeight + this.getHeightDiff();
        }
    },

    getDesignedHeight : function()
    {
        return this.designedHeight;
    },

    getDesignedWidth : function()
    {
        return this.designedWidth;
    },

    getActualWidth : function()
    {
        return this.actualWidth;
    },

    getDesignAspectRatio: function()
    {
        return (this.designedWidth / this.designedHeight);
    },

    getActualAspectRatio: function()
    {
        return (this.actualWidth / this.actualHeight);
    },

    //返回实际分辨率和当前分辨率的差距，如果是iphone5S，高度1136，则返回正值
    getHeightDiff : function()
    {
        return this.heightDiff;
    },

    getYScale : function()
    {
        return this.actualHeight / this.designedHeight;
    },

    getXScale : function()
    {
        return this.actualWidth / this.designedWidth;
    }
});