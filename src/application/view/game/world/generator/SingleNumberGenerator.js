/**
 * Created by chenyonghua on 13-12-28.
 */
var SingleNumberGenerator = cc.Class.extend( {
    _value:0,
    ctor: function()
    {

    },
    setValue: function(value)
    {
        this._value = value;
    },
    getNextValue:function()
    {
        return this._value;
    }
} );