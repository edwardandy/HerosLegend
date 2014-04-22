/**
 * Created by Edward on 13-12-21.
 */
var TabItem = cc.Node.extend({
    skin:null,
    _data:null,
    setSkin:function(mov){
        this.skin = mov;
        this.skin.setAnchorPoint(cc.p(0,0));
        this.skin.retain();
        this.addChild(this.skin);
        this.setContentSize(this.skin.getContentSize());
    },
    setData:function(o){
        this._data = o;
        if(o){
            this.initlize();
        }
    },
    getData:function(){
        return this._data;
    },
    initlize:function(){
        ;
    },
    onBeginTouched:function(){

    },
    onSelect:function(){
        ;
    },
    onUnselect:function(){
        ;
    },
    dispose:function(){
        if(this.skin)
            this.skin.release();
    }
});