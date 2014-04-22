/**
 * Created by chenyonghua on 13-11-7.
 */
HttpQueue = cc.Class.extend( {
    _queue: null,
    _running: false,
    ctor: function()
    {
        this._running    = false;
        this._queue      = [];
    },
    push:function(value)
    {
        this._queue.push( value );
        if(!this._running)
        {
            this.next();
        }
    },
    next:function()
    {
        if (this._queue.length == 0)
        {
            this._running = false;
        }
        else
        {
            this._running = true;
            this._queue.shift().call();
        }
    }
} );