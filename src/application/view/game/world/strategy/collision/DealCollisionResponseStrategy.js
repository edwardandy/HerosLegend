/**
 * Created by chenyonghua on 13-12-28.
 */
/**
 * Created by chenyonghua on 13-12-28.
 */
var DealCollisionResponseStrategy = sf.CollisionResponseStrategy.extend({
    controlStrategy:null,
    ctor:function()
    {
        this._super();
    },
    setControlStrategy:function(value)
    {
        this.controlStrategy = value;
    },
    getControlStrategy:function()
    {
        return this.controlStrategy;
    },
    onCollision:function(collidingObjects)
    {
        var didDealCollision = false;
        var numHit = collidingObjects.length;
        for (var i = 0; i < numHit; i++)
        {
            if ( this.controlStrategy != null && !this.controlStrategy.canDamagerHit(collidingObjects[i]))
            {
                continue;
            }
            didDealCollision = this.dealCollision(collidingObjects[i]) || didDealCollision;
        }

        if (didDealCollision && this.getOwner())
        {
            if (this.controlStrategy != null && this.controlStrategy.hasOwnProperty("onComplete"))
            {
                this.controlStrategy.onComplete();
            }
            this.getOwner().lookupComponent(GameConst.entityBus ).getSignal(EntitySignals.DEALING_COLLISION).dispatch();
        }
    },
    dealCollision:function(spatialComponent)
    {
        if (this.controlStrategy != null)
        {
            this.controlStrategy.onHit(spatialComponent);
        }
        return true;
    },
    onTick:function(dt)
    {
        if (this.controlStrategy == null)
        {
            return;
        }
        this.controlStrategy.onTick(dt);
    },
    shouldRemove:function()
    {
        return (this.controlStrategy == null) ? false : this.controlStrategy.isDamagerDead();
    }
});