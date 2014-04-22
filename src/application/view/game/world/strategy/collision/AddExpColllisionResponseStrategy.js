/**
 * Created by chenyonghua on 14-3-9.
 */
var AddExpColllisionResponseStrategy = DealCollisionResponseStrategy.extend( {
    addAmount: 0,
    ctor: function()
    {
        this._super();
    },
    dealCollision: function( spatialComponent )
    {
        var gameOver = this.getOwner().lookupComponentByEntity("gameOver",GameConst.world);
        if(gameOver)
        {
            var entityBus = this.getOwner().lookupComponent( GameConst.entityBus );
            if(entityBus)
            {
                entityBus.getSignal(EntitySignals.ADD_EXP ).dispatch();
            }
            gameOver.addExp(this.addAmount);
        }
        return this._super();
    }
} );