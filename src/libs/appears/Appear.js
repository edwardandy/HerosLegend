/**
 * Created by ios on 13-12-27.
 */
var Appear = cc.Class.extend({
    mContainer:null,
    init:function(container){
        this.mContainer = container;
        if(this.mContainer)
            this.mContainer.retain();
    },
    appear:function(win, onOpenComplete,caller){
        win.popUpData.owner.setVisible(true);
    },
    disAppear:function(win, onCloseComplete,caller){
        win.popUpData.owner.setVisible(false);
    },
    dispose:function(){
        if(this.mContainer){
            this.mContainer.release();
        }
    }
});

var AppearMove = Appear.extend({
    appear:function(win, onOpenComplete,caller){
        this._super(win,onOpenComplete,caller);

        var winSize = cc.Director.getInstance().getWinSize();
        var dis = win.popUpData.owner;
        var ox = (winSize.width - dis.getContentSize().width)/2 + dis.getAnchorPointInPoints().x;
        var oy = dis.getAnchorPointInPoints().y - dis.getContentSize().height;
        dis.setPosition(cc.p(ox,oy));
        var ny = (winSize.height - dis.getContentSize().height)/2 + dis.getAnchorPointInPoints().y;
        var acMove = cc.MoveTo.create(0.4,cc.p(ox,ny));
        var acEase = cc.EaseBackIn.create(acMove);

        var cb = function(node,data){
            onOpenComplete.call(caller,data);
        }
        var acCall = cc.CallFunc.create(cb,null,win);

        dis.runAction(cc.Sequence.create(acEase,acCall));
    },
    disAppear:function(win, onOpenComplete,caller){
        var winSize = cc.Director.getInstance().getWinSize();
        var dis = win.popUpData.owner;
        var ox = (winSize.width - dis.getContentSize().width)/2 + dis.getAnchorPointInPoints().x;
        var oy = dis.getAnchorPointInPoints().y - dis.getContentSize().height;
        var acMove = cc.MoveTo.create(0.4,cc.p(ox,oy));
        var acEase = cc.EaseBackOut.create(acMove);

        var cb = function(node,data){
            onOpenComplete.call(caller,data);
        }
        var acCall = cc.CallFunc.create(cb,null,win);

        dis.runAction(cc.Sequence.create(acEase,acCall));
    }
});


