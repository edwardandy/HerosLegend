/**
 * Created by chenyonghua on 13-12-31.
 */
var AddHealthCollisionResponseStrategy = DealCollisionResponseStrategy.extend( {
    addAmount: 0,
    ctor: function()
    {
        this._super();
    },
    dealCollision: function( spatialComponent )
    {
        var player = this.getOwner().getOwningGroup().lookup( GameConst.PLAYER );
        if( player )
        {
            var health = player.lookupComponent( GameConst.health );
            this.addHealth(health)
        }
        var followers = this.getOwner().getOwningGroup().lookupEntities( "follower" );
        for( var i = 0, len = followers.length; i < len; i++ )
        {
            var follower = followers[i];
            var health = follower.lookupComponent( GameConst.health );
            this.addHealth(health)
        }
        return this._super();
    },
    addHealth: function( healthComponent )
    {
        if(healthComponent)
        {
            healthComponent.modify( this.addAmount, null, this );
            var entityBus = this.getOwner().lookupComponent( GameConst.entityBus );
            if(entityBus)
            {
                entityBus.getSignal(EntitySignals.ADD_HP ).dispatch();
            }
        }
    }
} );