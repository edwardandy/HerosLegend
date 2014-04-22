/**
 * Created by chenyonghua on 13-11-6.
 */
Controller = Actor.extend( {
    ctor: function(controllerName, viewComponent)
    {
        this.controllerName= controllerName || this.constructor.NAME;
        this.viewComponent=viewComponent;
    },
    dispatch: function( type, params )
    {
        var paramsArr = Array.prototype.slice.call( arguments );
        //remove the type
        paramsArr.shift();
        this.getSignalBus().dispatch( type, paramsArr );
    },
    addContextListener: function( type, listener, listenerContext, priority )
    {
        listenerContext = listenerContext || this;
        this.getSignalBus().addContextListener(type, listener, listenerContext, priority);
    }
    ,
    addContextListenerOnce: function( type, listener, listenerContext, priority )
    {
        listenerContext = listenerContext || this;
        this.getSignalBus().addContextListenerOnce(type, listener, listenerContext, priority);
    },
    removeContextListener: function( type, listener, listenerContext )
    {
        listenerContext = listenerContext || this;
        this.getSignalBus().removeContextListener(type, listener, listenerContext);
    },
    stopPropagation: function( type )
    {
        this.getSignalBus().stopPropagation(type);
    }
} );

Controller.NAME = "Controller";

Controller.prototype.getName = function()
{
    return this.controllerName;
};

Controller.prototype.setViewComponent = function( viewComponent )
{
    this.viewComponent = viewComponent;
};

Controller.prototype.getViewComponent = function()
{
    return this.viewComponent;
};

/**
 * Called by the View when the Controller is registered
 * @return {void}
 */
Controller.prototype.onRegister = function()
{
    return;
};

/**
 * Called by the View when the Controller is removed
 */
Controller.prototype.onRemove = function()
{
    return;
};

/**
 * @ignore
 * The Controllers name. Should only be accessed by Controller subclasses.
 *
 * @protected
 * @type string
 */
Controller.prototype.controllerName = null;

/**
 * @ignore
 * The Controllers viewComponent. Should only be accessed by Controller subclasses.
 *
 * @protected
 * @type Object
 */
Controller.prototype.viewComponent = null;