/**
 * Created by chenyonghua on 13-12-31.
 */
var ChangeHealthStrategy = sf.Strategy.extend( {
    ctor: function()
    {
        this._super();
    },
    onHealthChange: function( amount, damageType, originator )
    {
        var healthComponent = this.getOwner().lookupComponent( GameConst.health );
        if( healthComponent.getHealth() > 0)
        {
            if(amount < 0)
            {
                var render      = this.getOwner().lookupComponent(GameConst.render);
                var actionTo    = cc.TintTo.create(0.1,255,10,10);
                var actionBack    = cc.TintTo.create(0.1,255,255,255);
                var sequence    = cc.Sequence.create(actionTo, actionBack);
                render.getDisplayObject().runAction(sequence);
            }
            else if(amount > 0)
            {
                var render      = this.getOwner().lookupComponent(GameConst.render);
                var actionTo    = cc.TintTo.create(0.1,70,255,0);
                var actionBack    = cc.TintTo.create(0.1,255,255,255);
                var sequence    = cc.Sequence.create(actionTo, actionBack);
                render.getDisplayObject().runAction(sequence);
            }
        }
    }
} );