/**
 * Created by Administrator on 14-3-24.
 */
/**
 * 贝塞尔曲线轨迹计算，包含一个控制点
 * @type {*}
 */
var BezierTraj = cc.Class.extend({
        startPos:null,
        endPos:null,
        ctrlPos:null,
        curPos:null,
    /**
     * 初始化贝塞尔曲线
     * @param stPos 开始点
     * @param edPos 结束点
     * @param clPos 控制点
     */
        init:function(stPos,edPos,clPos){
            this.startPos = stPos;
            this.endPos = edPos;
            this.ctrlPos = clPos;
            this.curPos = new cc.Point;
        },
    /**
     * 更新当前点方法
     * @param progress 当前的进度
     */
        updateTrack:function(progress){
            var t0 = 1 - progress;
            var t1 = t0 * t0;
            var t2 = 2 * progress * t0;
            var t3 = progress * progress;

            this.curPos.x = t1 * this.startPos.x + t2 * this.ctrlPos.x + t3 * this.endPos.x;
            this.curPos.y = t1 * this.startPos.y + t2 * this.ctrlPos.y + t3 * this.endPos.y;
        }
});