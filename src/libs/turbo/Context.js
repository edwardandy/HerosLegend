/**
 * Created by chenyonghua on 13-11-5.
 */
Context = cc.Class.extend( {
    signalBus: null,
    controllerMap: null,
    modelMap: null,
    ctor: function()
    {
        if( Context.INSTANCE )
        {
            throw(new Error( "Context already exists" ));
        }

        this.controllerMap = {};
        this.modelMap = {};
        this.signalBus = TurboSignalBus.getInstance();
    },
    getSignalBus: function()
    {
        return this.signalBus;
    },
    // controller
    registerController: function( controller )
    {
        if( typeof(controller.getName()) != "string" || !controller.getName() )
        {
            throw new Error( "the controller's name " + controller.getName() + " is not legal. " );
            return;
        }
        if( this.controllerMap[controller] != null )
        {
            throw new Error( "the controller named " + controller.getName() + " already exist. " );
            return;
        }
        if( this.controllerMap[controller.getName()] == null )
        {
            this.controllerMap[controller.getName()] = controller;
            controller.setContext(this);
            controller.onRegister();
        }
    },
    retrieveController: function( controllerName )
    {
        if( this.controllerMap[controllerName] == null )
        {
            throw new Error( "the controller named " + controllerName + " doesn't exist. " );
            return null;
        }
        return this.controllerMap[controllerName];
    },
    hasController: function( controllerName )
    {
        return this.controllerMap[controllerName] != null;
    },
    unRegisterController: function( controllerName )
    {
        if( this.controllerMap[controllerName] == null )
        {
            throw new Error( "the controller named " + controllerName + " doesn't exist. " );
            return null;
        }
        this.controllerMap[controllerName].onRemove();
        delete this.controllerMap[controllerName];
    },

    //model
    registerModel: function( model )
    {
        if( typeof(model.getName()) != "string" || !model.getName() )
        {
            throw new Error( "the model's name " + model.getName() + " is not legal. " );
            return;
        }
        if( this.modelMap[model.getName()] != null )
        {
            throw new Error( "the model named " + model.getName() + " already exist. " );
            return;
        }
        if( this.modelMap[model.getName()] == null )
        {
            this.modelMap[model.getName()] = model;
            model.setContext(this);
            model.onRegister();
        }
    },
    retrieveModel: function( modelName )
    {
        if( this.modelMap[modelName] == null )
        {
            throw new Error( "the model named " + modelName + " doesn't exist. " );
            return null;
        }
        return this.modelMap[modelName];
    },
    hasModel: function( modelName )
    {
        return this.modelMap[modelName] != null;
    },
    unRegisterModel: function( modelName )
    {
        if( this.modelMap[modelName] == null )
        {
            throw new Error( "the model named " + modelName + " doesn't exist. " );
            return null;
        }
        this.modelMap[modelName].onRemove();
        delete this.modelMap[modelName];
    },
    dispatch: function( type, params )
    {
        var paramsArr = Array.prototype.slice.call( arguments );
        //remove the type
        paramsArr.shift();
        this.signalBus.dispatch( type, paramsArr );
    }
} );