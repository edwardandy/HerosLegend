/**
 * Created by chenyonghua on 14-2-27.
 */
var GameViewComponent = sf.EntityComponent.extend({
    _view:null,
    ctor:function()
    {
        this._super();
    },
    onRemove:function()
    {
        this._view.removeAllChildren(false);
    },
    setView:function(value)
    {
        this._view = value;
    },
    getView:function()
    {
        return this._view;
    }
})