/**
 * Created by chenyonghua on 14-3-21.
 */
var ThrowingComponent = sf.TickedComponent.extend( {
    _isThrowing: false,
    yAcceleration: 0.005,

    _targetCol: -1,
    _targetRow: -1,
    _duration: 0.1,

    _spatial: null,
    _transform: null,
    _yVel: 0,
    _angle:0,
    ctor: function()
    {
        this._super();
    },
    onAdd: function()
    {
        this._spatial = this.getOwner().lookupComponent( GameConst.spatial );
        this._transform = this.getOwner().lookupComponent( GameConst.transform );
        this.throwTo( 10 );
    },
    onRemove: function()
    {
        this._spatial = null;
        this._transform = null;
    },
    throwTo: function( col )
    {
        this._isThrowing = true;
        this._targetCol = col;
        this._duration = Math.abs( (this._spatial.getRenderCol() - this._targetCol) / this._spatial.getVelX() );
        this.yAcceleration = this._spatial.getVelX() / 40;
        this._yVel = 0.5 * this.yAcceleration * this._duration;
    },
    onTick: function()
    {
        if( this._isThrowing && this._transform )
        {
            this._transform.setRowOffset( this._transform.getRowOffset() + this._yVel );
            this._yVel -= this.yAcceleration;

            //切换角度
            this._angle = cc.pToAngle( cc.p( this._targetCol - this._spatial.getRenderCol(), -this._transform.getRowOffset() ) ) * 180 / Math.PI;
            var render = this.getOwner().lookupComponent( GameConst.render );
            render.getDisplayObject().setAnchorPoint( cc.p( 0.5, 0 ) );
            if( this._yVel > 0 )
            {
                render.setRotation( this._angle );
            }
            else
            {
                render.setRotation( -this._angle );
            }

            if( this._yVel <= (-0.5 * this.yAcceleration * this._duration) )
            {
                this._isThrowing = false;
                this.getOwner().destory();
            }
        }
    }
} );

var WeaponTrajectorys = sf.TickedComponent.extend({
    _isThrowing: false,

    _duration: 0,
    _targetPos:null,

    _spatial: null,
    _transform: null,

    _lastPos:null,
    _angle:0,
    _bezierTrack:null,
    _elapsedDur:0,
    _bReachEnd:false,
    ctor: function()
    {
        this._super();
    },
    onAdd: function()
    {
        this._spatial = this.getOwner().lookupComponent( GameConst.spatial );
        this._transform = this.getOwner().lookupComponent( GameConst.transform );
        this.throwTo( new cc.Point(10,5) );
    },
    onRemove: function()
    {
        this._spatial = null;
        this._transform = null;
    },
    throwTo: function( targetPos )
    {
        if(this._isThrowing)
        {
            this._lastPos = null;
            this._angle = 0;
            this._elapsedDur = 0;
            this._bReachEnd = false;
        }
        this._isThrowing = true;
        this._targetPos = targetPos;
        this._duration = Math.abs( (this._spatial.getRenderCol() - this._targetPos.x) / this._spatial.getVelX() );

        this._bezierTrack = new BezierTraj;
        this._bezierTrack.init(cc.p(this._spatial.getRenderCol(),this._spatial.getRenderRow()),this._targetPos,this.genControlPoint())
    },
    genControlPoint:function(){
        var mid = GameMathUtil.interpolateTwoPoints(this._bezierTrack.startPos,this._bezierTrack.endPos,0.5);
        mid.y -= 1;
        if(mid.y < 0)
            mid.y = 0;
        return mid;
    },
    onTick: function(delta)
    {
        if( this._isThrowing && this._transform )
        {
            if(null == this._lastPos)
            {
                this._lastPos = this._bezierTrack.startPos;
            }
            else
            {
                //到达终点
                if(this._bReachEnd)
                {
                    this._isThrowing = false;
                    this.getOwner().destory();
                    return;
                }

                this._elapsedDur += delta;
                var progress = this._elapsedDur/this._duration;
                if(progress > 1)
                    progress = 1;
                //更新轨迹
                this._bezierTrack.updateTrack(progress);
                //更新坐标
                this._transform.setColOffset(this._bezierTrack.curPos.x - this._lastPos.x);
                this._transform.setRowOffset(this._bezierTrack.curPos.y - this._lastPos.y);
                //更新角度
                this._angle = cc.pToAngle( cc.p( this._transform.getColOffset(), -this._transform.getRowOffset() ) ) * 180 / Math.PI;
                var render = this.getOwner().lookupComponent( GameConst.render );
                render.getDisplayObject().setAnchorPoint( cc.p( 0.5, 0 ) );
                render.setRotation( this._angle );

                this._lastPos = this._bezierTrack.curPos;

                if(progress >= 1)
                    this._bReachEnd = true;
            }
        }
    }
});