/**
 * Created by chenyonghua on 13-11-6.
 */
TurboSignalBus = cc.Class.extend( {
    signalMap: null,
    ctor: function()
    {
        this.signalMap = {};
    },
    getName: function()
    {
        return "SignalBus";
    },
    /**
     * retrieve the signal by the type
     * @param type
     * @returns {*}
     */
    getSignal: function( type )
    {
        if( this.signalMap[type] == null )
        {
            this.signalMap[type] = new signals.Signal();
        }
        return this.signalMap[type];
    },
    /**
     * Dispatch/Broadcast Signal to all listeners added to the queue.
     * @param {string} [type] Event's type
     * @param {array} [params] Parameters that should be passed to each handler.
     */
    dispatch: function( type, params )
    {
        this.getSignal( type ).dispatch.apply( this, params );
    },
    /**
     * Add a listener to the signal.
     * @param {string} [type] Event's type
     * @param {Function}[listener] Signal handler function.
     * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
     * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
     * @return {SignalBinding} An Object representing the binding between the Signal and listener.
     */
    addContextListener: function( type, listener, listenerContext, priority )
    {
        this.getSignal( type ).add( listener, listenerContext, priority );
    },
    /**
     * Add listener to the signal that should be removed after first execution (will be executed only once).
     * @param {string} [type] Event's type
     * @param {Function} listener Signal handler function.
     * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
     * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
     * @return {SignalBinding} An Object representing the binding between the Signal and listener.
     */
    addContextListenerOnce: function( type, listener, listenerContext, priority )
    {
        this.getSignal( type ).addOnce( listener, listenerContext, priority );
    },
    /**
     * Remove a single listener from the dispatch queue.
     * @param {Function} listener Handler function that should be removed.
     * @param {Object} [listenerContext] Execution context (since you can add the same handler multiple times if executing in a different context).
     * @return {Function} Listener handler function.
     */
    removeContextListener: function( type, listener, listenerContext )
    {
        this.getSignal( type ).remove( listener, listenerContext );
    },
    /**
     * Prevents listeners at the next bubble stage from receiving the event.
     * @param type Event's type
     */
    stopPropagation: function( type )
    {
        this.getSignal( type ).halt();
    }
} );
TurboSignalBus.INSTANCE = null;
TurboSignalBus.getInstance = function()
{
    if( TurboSignalBus.INSTANCE == null )
    {
        TurboSignalBus.INSTANCE = new TurboSignalBus();
    }
    return TurboSignalBus.INSTANCE;
}