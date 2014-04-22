/**
 * Created by chenyonghua on 13-10-25.
 */
var s_rcVisible = cc.rect(0, 0, 0, 0);
var s_ptCenter = cc.p(0, 0);
var s_ptTop = cc.p(0, 0);
var s_ptTopRight = cc.p(0, 0);
var s_ptRight = cc.p(0, 0);
var s_ptBottomRight = cc.p(0, 0);
var s_ptBottom = cc.p(0, 0);
var s_ptLeft = cc.p(0, 0);
var s_ptTopLeft = cc.p(0, 0);

var VisibleRect = {
    rect:function () {
        if (s_rcVisible.width == 0) {
            var s = cc.Director.getInstance().getWinSize();
            s_rcVisible = cc.rect(0, 0, s.width, s.height);
        }
        return s_rcVisible;
    },
    center:function () {
        if (s_ptCenter.x == 0) {
            var rc = VisibleRect.rect();
            s_ptCenter.x = rc.x + rc.width / 2;
            s_ptCenter.y = rc.y + rc.height / 2;
        }
        return s_ptCenter;
    },
    top:function () {
        if (s_ptTop.x == 0) {
            var rc = VisibleRect.rect();
            s_ptTop.x = rc.x + rc.width / 2;
            s_ptTop.y = rc.y + rc.height;
        }
        return s_ptTop;
    },
    topRight:function () {
        if (s_ptTopRight.x == 0) {
            var rc = VisibleRect.rect();
            s_ptTopRight.x = rc.x + rc.width;
            s_ptTopRight.y = rc.y + rc.height;
        }
        return s_ptTopRight;
    },
    right:function () {
        if (s_ptRight.x == 0) {
            var rc = VisibleRect.rect();
            s_ptRight.x = rc.x + rc.width;
            s_ptRight.y = rc.y + rc.height / 2;
        }
        return s_ptRight;
    },
    rightBottom:function () {
        if (s_ptBottomRight.x == 0) {
            var rc = VisibleRect.rect();
            s_ptBottomRight.x = rc.x + rc.width;
            s_ptBottomRight.y = rc.y;
        }
        return s_ptBottomRight;
    },
    bottom:function () {
        if (s_ptBottom.x == 0) {
            var rc = VisibleRect.rect();
            s_ptBottom.x = rc.x + rc.width / 2;
            s_ptBottom.y = rc.y;
        }
        return s_ptBottom;
    },
    leftBottom:function () {
        return VisibleRect.rect();
    },
    left:function () {
        if (s_ptLeft.x == 0) {
            var rc = VisibleRect.rect();
            s_ptLeft.x = rc.x;
            s_ptLeft.y = rc.y + rc.height / 2;
        }
        return s_ptLeft;
    },
    topLeft:function () {
        if (s_ptTopLeft.x == 0) {
            var rc = VisibleRect.rect();
            s_ptTopLeft.x = rc.x;
            s_ptTopLeft.y = rc.y + rc.height;
        }
        return s_ptTopLeft;
    }
};
