/**
 * Created by chenyonghua on 13-12-18.
 */
var DestoryingComponent = sf.EntityComponent.extend( {
    _signalDescriptor:null,
    _entityBus: null,
    _animationName:null,
    ctor: function()
    {
        this._super();
    },
    setAnimation: function( animationName )
    {
        this._animationName = animationName;
    },
    setSignalDescriptor:function(value)
    {
        this._signalDescriptor = value;
        if(this._entityBus && !this._entityBus.getSignal(this._signalDescriptor ).has(this.destory,this))
        {
            this._entityBus.getSignal(this._signalDescriptor ).add(this.destory,this);
        }
    },
    onAdd: function()
    {
        this._entityBus = this.getOwner().lookupComponent( GameConst.entityBus );
        if(this._signalDescriptor && !this._entityBus.getSignal(this._signalDescriptor ).has(this.destory,this))
        {
            this._entityBus.getSignal(this._signalDescriptor ).add(this.destory,this);
        }
    },
    onRemove: function()
    {
        if(this._signalDescriptor && this._entityBus.getSignal(this._signalDescriptor ).has(this.destory,this))
        {
            this._entityBus.getSignal(this._signalDescriptor ).remove(this.destory,this);
        }
        this._entityBus = null;
    },
    destory: function( spatial )
    {
        if( !(spatial instanceof SimpleRowSpatialComponent))
        {
            spatial = this.getOwner().lookupComponent( GameConst.spatial );
        }

        var scrollMap = spatial.getOwner().lookupComponentByEntity( GameConst.scrollMap, GameConst.world );
        spatial.setVelX( 0 );
        spatial.setVelY( -scrollMap.getVelocity() );

        var animationRender = spatial.getOwner().lookupComponent( GameConst.render );
        if(animationRender && this._animationName )
        {
            animationRender.queue( this._animationName, false );
            var entityBus = spatial.getOwner().lookupComponent( GameConst.entityBus );
            entityBus.getSignal( EntitySignals.ANIMATION_COMPLETE ).addOnce( this.onComplete, this );
        }
        else
        {
            spatial.getOwner().destory();
        }
    },
    onComplete: function( animationRender )
    {
        if(animationRender.getAnimationName() == this._animationName)
        {
            var entityBus = animationRender.getOwner().lookupComponent( GameConst.entityBus );
            entityBus.getSignal( EntitySignals.DEAD_ANIMATION_COMPLETE ).dispatch();
            animationRender.getOwner().destory();
        }
    }
} );