/**
 * Created by chenyonghua on 13-11-26.
 */
var DamageCollisionResponseStrategy = DealCollisionResponseStrategy.extend( {
    damageAmount: 0,
    damageType: null,
    ctor: function()
    {
        this._super();
    },
    dealCollision: function( spatialComponent )
    {
        var healthComponent = spatialComponent.getOwner().lookupComponent( GameConst.health );
        if( healthComponent == null || healthComponent.isDead() )
        {
            return false;
        }
        healthComponent.modify( (-1) * this.damageAmount, this.damageType, this.getOwner() );
        return this._super(spatialComponent);
    }
} );