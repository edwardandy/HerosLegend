/**
 * Created by chenyonghua on 13-11-6.
 */
Model = Actor.extend({
    ctor:function(modelName)
    {
        this.modelName = modelName || this.constructor.NAME;
    },
    dispatch: function( type, params )
    {
        var paramsArr = Array.prototype.slice.call( arguments );
        //remove the type
        paramsArr.shift();
        this.getSignalBus().dispatch( type, paramsArr );
    }
});

Model.NAME = "Model";

Model.prototype.getName = function()
{
    return this.modelName;
};

Model.prototype.onRegister = function()
{
    return;
};

Model.prototype.onRemove = function()
{
    return;
};

Model.prototype.modelName = null;
