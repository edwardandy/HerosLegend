/**
 * Created by Administrator on 13-12-16.
 */
var ListItem = cc.Layer.extend({
    _itemId:-1,
    _data:null,
    _skin:null,
    _isSelected:false,
    ctor:function(){
        this._super();
    },
    dispose:function(){
        if(this._skin)
            this._skin.release();
    },
    setSkin:function(skin){
        this._skin = skin;
        this.addChild(this._skin,0,1);
        this.setContentSize(skin.getContentSize());
    },
    setItemId:function(id){
        this._itemId = id;
    },
    getItemId:function(){
        return this._itemId;
    },
    setData:function(data){
        this._data = data;
        this.initlize();
    },
    getData:function(){
        return this._data;
    },
    initlize:function(){

    },
    updateObject:function(object){
    },
    isSelected:function(){
        return this._isSelected;
    },
    setSelected:function(b){
        if(b != this._isSelected)
        {
            this._isSelected = b;
            if(this._isSelected)
                this.onSelected();
            else
                this.onUnselected();
        }
    },
    onSelected:function(){
    },
    onUnselected:function(){
    }
});

