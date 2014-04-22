/**
 * Created by chenyonghua on 13-11-26.
 */
var ResettingEntityCountingControlStrategy = EntityCountingControlStrategy.extend({
    ctor:function()
    {
        this._super();
    },
    onTick:function(dt)
    {
        this._super(dt);
        if (this.getHitCounter() <= 0)
        {
            this.resetCount();
        }
    },
    isDamagerDead:function()
    {
        return false;
    }
});