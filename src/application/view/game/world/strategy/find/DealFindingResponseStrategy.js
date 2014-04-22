/**
 * Created by chenyonghua on 13-12-26.
 */
var DealFindingResponseStrategy = sf.FindingResponseStrategy.extend({
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
    onFind:function(collidingObjects)
    {
        var health = this.getOwner().lookupComponent(GameConst.health);
        if(health != null && health.isDead())
        {
            return;
        }

        var didDealFinding = false;
        var numHit = collidingObjects.length;
        for (var i = 0; i < numHit; i++)
        {
            if ( this.controlStrategy != null && !this.controlStrategy.canDamagerHit(collidingObjects[i]))
            {
                continue;
            }
            didDealFinding = this.dealFinding(collidingObjects[i]) || didDealFinding;
        }
        if (didDealFinding && this.getOwner())
        {
            if (this.controlStrategy != null && this.controlStrategy.hasOwnProperty("onComplete"))
            {
                this.controlStrategy.onComplete();
            }
            this.getOwner().lookupComponent(GameConst.entityBus ).getSignal(EntitySignals.DEALING_FINDING).dispatch();
        }
    },
    dealFinding:function(spatialComponent)
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
})