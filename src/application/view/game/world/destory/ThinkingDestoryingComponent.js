/**
 * Created by chenyonghua on 13-12-19.
 */
var ThinkingDestoryingComponent = RepeatingThinkingComponent.extend({
    ctor:function()
    {
        this._super();
    },
    onAdd:function()
    {
        this.setRepeatTimes(1);
    },
    onThink:function()
    {
        this.destoryOwner();
    },
    destoryOwner:function()
    {
        if(this.getOwner() != null)
        {
            this.getOwner().destory();
        }
    }
});