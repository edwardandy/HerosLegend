/**
 * Created by chenyonghua on 13-12-5.
 */
var DeadHealthStrategy = sf.Strategy.extend( {
    _dying: false,
    _entityBus: null,
    _animationName: null,
    ctor: function()
    {
        this._super();
    },
    setAnimation: function( animationName )
    {
        this._animationName = animationName;
    },
    onHealthChange: function( amount, damageType, originator )
    {
        var healthComponent = this.getOwner().lookupComponent( GameConst.health );
        if( healthComponent.getHealth() <= 0 && this._dying == false )
        {
            this._dying = true;

            var scrollMap = this.getOwner().lookupComponentByEntity( GameConst.scrollMap, GameConst.world );

            var spatial = this.getOwner().lookupComponent( GameConst.spatial );
            spatial.setVelX( 0 );
            spatial.setVelY( -scrollMap.getVelocity() );


            var destoryingComponent = new DestoryingComponent();
            destoryingComponent.setAnimation(this._animationName);
            this.getOwner().addComponent( destoryingComponent, "destoryingComponent" );
            destoryingComponent.destory( spatial );
        }
    }
} );