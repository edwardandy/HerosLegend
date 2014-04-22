/**
 * Created by chenyonghua on 13-12-26.
 */
var SeekingComponent = sf.TickedComponent.extend( {
    _spatial: null,
    _render: null,
    _steeringForce: null,
    _maxForce: 1,
    _maxSpeed: 0.3,
    _velocity: null,
    _mass: 1,
    _isSeeking: false,

    _signalBus: null,

    targetRow: null,
    targetCol: null,
    isRotated: true,
    ctor: function()
    {
        this._super();
        this._steeringForce = new Vector2D( 0, 0 );
        this._velocity = new Vector2D( 0, 0 );
    },
    onAdd: function()
    {
        this._spatial = this.getOwner().lookupComponent( GameConst.spatial );
        this._render = this.getOwner().lookupComponent( GameConst.render );
        this._signalBus = this.getOwner().lookupComponent( GameConst.entityBus );
        this._render.getDisplayObject().setAnchorPoint( cc.p( 0.5, 0 ) );
        if( this.targetCol != null && this.targetRow != null )
        {
            this.seek( this.targetCol, this.targetRow );
        }
    },
    onRemove: function()
    {
        this._spatial = null;
        this._render = null;
    },
    stop: function()
    {
        this._isSeeking = false;
    },
    seek: function( col, row )
    {
        this.targetCol = col;
        this.targetRow = row;
//        cc.log( "col:" + col + ",row:" + row );
        var target = new Vector2D( this.targetCol, this.targetRow );
        if( this._spatial == null )
        {
            return;
        }

        var position = new Vector2D( this._spatial.getRenderCol(), this._spatial.getRenderRow() );

        var desiredVelocity = target.subtract( position );
        desiredVelocity.normalize();
        desiredVelocity = desiredVelocity.multiply( this._maxSpeed );
        var force = desiredVelocity.subtract( this._velocity );
        this._steeringForce = this._steeringForce.add( force );
        this._isSeeking = true;
    },
    setMaxSpeed: function( value )
    {
        this._maxSpeed = value;
    },
    onTick: function( dt )
    {
        if( !this._isSeeking )
        {
            return;
        }
        this._steeringForce.truncate( this._maxForce );
        this._steeringForce = this._steeringForce.divide( this._mass );
        this._velocity = this._velocity.add( this._steeringForce );
        this._steeringForce = new Vector2D( 0, 0 );
        this._spatial.setVelX( this._velocity.x );
        this._spatial.setVelY( this._velocity.y );
        if( this.isRotated )
        {
            this._render.setRotation( -cc.pToAngle( this._velocity ) * 180 / Math.PI + 90 );
        }
        var distance = cc.pDistance( cc.p( this._spatial.getRenderCol(), this._spatial.getRenderRow() ), cc.p( this.targetCol, this.targetRow ) );
        if( distance < 0.6 )
        {
            this._isSeeking = false;
            if( this._signalBus )
            {
                this._signalBus.getSignal( EntitySignals.ARRIVE ).dispatch();
            }
        }
    }

} )