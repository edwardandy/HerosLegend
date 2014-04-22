/**
 * Created by Administrator on 14-3-24.
 */
var GameMathUtil = cc.Class.extend({
    _tempPoint0:null,
    _tempPoint1:null,
    ctor:function(){
        this._tempPoint0 = cc.PointZero();
        this._tempPoint1 = cc.PointZero();
    }
});
/**
 * 在2点之间进行插值
 * @param p0
 * @param p1
 * @param f 插值百分比
 * @returns {null}
 */
GameMathUtil.interpolateTwoPoints = function(p0, p1, f){
    if(f > 1)
        f = 1;
    if(f < 0)
        f = 0;

    this._tempPoint0.x = p0.x + (p1.x - p0.x)*f;
    this._tempPoint0.y = p0.y + (p1.y - p0.y)*f;

    return this._tempPoint0;
};
/**
 * 计算2点之间的距离
 * @param p0
 * @param p1
 * @returns {number}
 */
GameMathUtil.distanceTwoPoints = function(p0,p1){
    return Math.sqrt(Math.pow(p1.x - p0.x,2) + Math.pow(p1.y - p0.y,2));
};