/**
 * Created by chenyonghua on 13-12-28.
 */
var SignalCollisionResponseStrategy = DealCollisionResponseStrategy.extend({
    _signals: null,
    ctor: function()
    {
        this._super();
        this._signals = [];
    },
    addSignal: function( value )
    {
        this._signals.push( value );
    },
    dealCollision: function( spatialComponent )
    {
        var entityBus = this.getOwner().lookupComponent( GameConst.entityBus );
        if( entityBus )
        {
            for( var i = 0, len = this._signals.length; i < len; i++ )
            {
                entityBus.getSignal( this._signals[i] ).dispatch( spatialComponent );
            }

        }
        return this._super();
    }
});