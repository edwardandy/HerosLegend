/**
 * Created by chenyonghua on 13-11-25.
 */
var SignalBus = sf.EntityComponent.extend( {
    _signals:null,
    ctor:function()
    {
        this._super();
        this._signals = {};
    },
    onAdd:function()
    {

    },
    onRemove:function()
    {
    },
    getSignal:function(desc)
    {
        if (!(desc.getId() in this._signals))
        {
            this._signals[desc.getId()] = new signals.Signal();
        }
        return this._signals[desc.getId()];
    },
    getSignalById:function(id)
    {
        if (!(id in this._signals))
        {
            this._signals[id] = new signals.Signal();
        }
        return this._signals[id];
    }
} );