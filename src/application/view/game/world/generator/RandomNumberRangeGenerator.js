/**
 * Created by chenyonghua on 14-2-21.
 */
var RandomNumberRangeGenerator = cc.Class.extend({
    min:0,
    max:1,
    ctor:function()
    {

    },
    getNextValue:function()
    {
        return this.min + ((this.max - this.min) * Math.random());
    }
})