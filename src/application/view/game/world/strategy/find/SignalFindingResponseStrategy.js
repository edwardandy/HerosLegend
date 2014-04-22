/**
 * Created by chenyonghua on 13-12-26.
 */
var SignalFindingResponseStrategy = DealFindingResponseStrategy.extend( {
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
    dealFinding: function( spatialComponent )
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
} )