/**
 * Created by chenyonghua on 13-11-25.
 */
var SignalDescriptor = cc.Class.extend({
    _id:"",
    _signiture:null,
    ctor:function(id,signiture)
    {
        this._id        = id;
        this._signiture = signiture;
    },
    getId:function()
    {
        return this._id;
    },
    getSigniture:function()
    {
        return this._signiture;
    }
});