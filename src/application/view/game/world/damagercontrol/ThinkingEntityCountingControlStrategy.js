/**
 * Created by chenyonghua on 14-1-1.
 */
/**
 * Created by chenyonghua on 13-11-26.
 */
var ThinkingEntityCountingControlStrategy = EntityCountingControlStrategy.extend({
    _timeGenerator:1,
    _cooldownTimer:0,
    ctor:function()
    {
        this._super();
    },
    setCooldownTime:function(value)
    {
        this._timeGenerator = value;
    },
    onTick:function(dt)
    {
        this._super(dt);
        this._cooldownTimer -= dt;
        if (this._cooldownTimer <= 0 && this.getHitCounter() <= 0)
        {
            this.resetCount();
        }
    },
    onHit:function(hitee)
    {
        this._super(hitee);
        if (this.getHitCounter() <= 0)
        {
            this._cooldownTimer = this._timeGenerator.getNextValue();
        }
    },
    /*RowSpatialObject*/
    canDamagerHit:function(potentialHitee)
    {
        return this._cooldownTimer <= 0 && this._super(potentialHitee);
    },
    isDamagerDead:function()
    {
        return false;
    }
});