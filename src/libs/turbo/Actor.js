/**
 * Created by chenyonghua on 13-11-6.
 */
Actor = cc.Class.extend( {
    signalBus:null,
    _context:null,
    ctor: function()
    {
        this.signalBus = null;
        this._context   = null;
    },
    getContext:function()
    {
        return this._context;
    },
    setContext:function(value)
    {
        this._context = value;
    },
    getSignalBus:function()
    {
        return this.getContext().getSignalBus();
    }
});