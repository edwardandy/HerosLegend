/**
 * Created by chenyonghua on 13-12-28.
 */
var LinearGenerator = cc.Class.extend({
    _values:null,
    _curIndex:0,
    ctor:function()
    {

    },
    setArray:function(value)
    {
        this._values = value;
    },
    getNextValue:function()
    {
        if (this._values == null)
        {
            return null;
        }
        this._curIndex = this.wrapIndex(this._curIndex + 1);
        return this._values[this._curIndex];
    },
    wrapIndex:function(index)
    {
        var numValues = this._values.length;
        if (index < 0)
        {
            return 0;
        }
        if (index >= numValues)
        {
            return numValues -1;
        }
        return index;
    }
})