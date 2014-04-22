/**
 * Created by Administrator on 13-12-16.
 */
var MultiList = cc.Layer.extend({
    itemClazz:null,
    row:0,
    col:0,
    rowSpace:0,
    colSpace:0,
    _direction:Direction.HORIZONTAL,

    mContainer:null,
    mList:null,

    _data:null,
    _currentPoint:0,
    _index:0,
    _mask:null,
    _itemSize:null,

    _bClicked:false,
    _startPt:null,

    _curSelectItemId:-1,
    _bMultiSelect:false,
    _multiSelectIds:[],

    _lastDelta:0,
    _tweenPosition:0,
    _bTweening:false,
    /**
    * public 销毁前释放资源
    */
    dispose:function(){
        this.mContainer.release();

        var len1 = this.mList.length;
        for(var i=0; i<len1; ++i)
        {
            var len2 = this.mList[i].length;
            for(var j=0;j<len2;++j)
            {
                this.mList[i][j].dispose();
            }
        }

        this._mask.release();
        this.itemInstance.release();
    },
    /**
     * constructor
     * @param clazz
     * @param itemSize cc.Size
     * @param row
     * @param col
     * @param rowSpace
     * @param colSpace
     * @param direction
     */
    ctor:function(clazz,itemSize, row, col, rowSpace,colSpace,direction){
        this._super();
        this.itemClazz 		= clazz;
        this.row 			= row;
        this.col 			= col;
        this.rowSpace 		= rowSpace;
        this.colSpace 		= colSpace;
        this._direction		= direction? direction : Direction.HORIZONTAL;
        this.itemInstance	= new clazz();
        this.itemInstance.retain();

        this._itemSize      = itemSize;

        //遮罩层
        this._mask				= cc.LayerColor.create(cc.c4b(255,0,0,255),0,0);
        this._mask.retain();

        //容器
        this.mContainer			= cc.ClippingNode.create(this._mask);
        this.addChild(this.mContainer);

        this.make();
        this.drawMask();

        this.setTouchMode(cc.TOUCH_ONE_BY_ONE);
        this.setTouchEnabled(true);
        this.setContentSize(cc.size((this._itemSize.width+this.colSpace)*this.col - this.colSpace
            ,(this._itemSize.height+this.rowSpace)*this.row - this.rowSpace));
        this.scheduleUpdate();
    },
    /**
     * public 绘制遮罩
     */
    drawMask:function(drawX, drawY, drawWidth, drawHeight){
        if(!drawX)
            drawX = 0;
        if(!drawY)
            drawY = 0;
        if(!drawWidth)
            drawWidth = (this._itemSize.width+this.colSpace)*this.col - this.colSpace;
        if(!drawHeight)
            drawHeight = (this._itemSize.height+this.rowSpace)*this.row - this.rowSpace;
        this._mask.setPosition(cc.p(drawX,drawY));
        this._mask.setContentSize(cc.size(drawWidth,drawHeight));
    },
    /**
     * private 刷新显示对象中的元素
     */
    make:function(){
        this.mList = [];

        var len_1;
        var len_2;
        if(this._direction == Direction.HORIZONTAL){
            len_1 = this.row;
            len_2 = this.col;
        }
        else
        {
            len_1 = this.col;
            len_2 = this.row;
        }

        var item;
        for (var i = 0; i < len_1 + 1; i++)
        {
            if(this.mList[i] == null)
                this.mList[i] = [];
            for (var j = 0; j < len_2; j++)
            {
                item		= this.getNewItem();
                item.setItemId(-1);
                item.retain();
                this.mList[i].push(item);
            }
        }
    },
    /**
     * protected 获取新的子项
     */
    getNewItem:function(){
        var item = new this.itemClazz();
        this.mContainer.addChild(item);
        return item;
    },
    /**
     * protected 设置滚动方向
     */
    setDirection:function(dir){
        this._direction = dir;
    },
    /**
     * public 获取列表数据
     */
    getData:function(){
        return this._data;
    },
    /**
     * public 设置列表数据
     */
    setData:function(value){
        this._data 			= value;
        this._currentPoint   = 0;
        this._index		= 0;
        this.fill(true);
    },
    /**
     * public 执行滚动时的数据更新
     */
    fill:function(isAll){
        var i
        var j;
        var len			= this.mList.length;
        var item;
        var isNeed;
        var needList	= [];
        var outList	= [];
        var rowNum = -1;
        if(isAll){
            for (i = 0; i < len; i++)
            {
                rowNum = Math.floor((this._currentPoint + (i * this.getItemSize())) / this.getItemSize());
                for (j = 0; j < this.mList[i].length; j++)
                {
                    item							= this.mList[i][j];
                    if(this._direction == Direction.HORIZONTAL){

                        item.setItemId(rowNum * this.col + j);
                        item.setData(this._data[item.getItemId()-this.col]);
                        item.setPosition(this.convertX(j * (this._itemSize.width + this.colSpace))
                        ,this.convertY((rowNum * this.getItemSize())-this._currentPoint - this.getItemSize()));
                    }
                    else
                    {
                        item.setItemId(rowNum * this.row + j);
                        item.setData(this._data[item.getItemId()-this.row]);
                        item.setPosition(this.convertX((rowNum * this.getItemSize())-this._currentPoint - this.getItemSize())
                            ,this.convertY(j * (this._itemSize.height + this.rowSpace)));
                    }
                }
            }
        }
        else
        {
            for (i = 0; i < len; i++)
            {
                needList.push(Math.ceil((this._currentPoint + (i* this.getItemSize())) / this.getItemSize()));
            }
            //找到显示区域外的子项
            for (i = 0; i < len; i++)
            {
                if(this._direction == Direction.HORIZONTAL){
                    rowNum		= Math.floor(this.mList[i][0].getItemId() / this.col);
                }
                else
                {
                    rowNum		= Math.floor(this.mList[i][0].getItemId() / this.row);
                }
                isNeed		= false;
                for (j = 0; j < needList.length; j++)
                {
                    if (rowNum == needList[j])
                    {
                        isNeed	= true;
                        needList.splice(j, 1);
                        break;
                    }
                }
                if (!isNeed)
                {
                    outList.push(this.mList[i]);
                }else
                {
                    var llen = this.mList[i].length;
                    for (var k = 0; k < llen; k++)
                    {
                        item 	= this.mList[i][k];

                        if(this._direction == Direction.HORIZONTAL){

                            item.setPositionY(this.convertY((Math.floor(item.getItemId() / this.col) * this.getItemSize())
                                - this._currentPoint - this.getItemSize()));
                        }
                        else
                        {
                            item.setPositionX(this.convertX((Math.floor(item.getItemId() / this.row) * this.getItemSize())
                                - this._currentPoint - this.getItemSize()));
                        }
                    }
                }
            }
            //列表外的子项修正到显示区域内
            len	= outList.length;
            var temp;
            var tlen;
            for (i = 0; i < len; i++)
            {
                temp 	= outList[i];
                rowNum 	= needList[i];
                for (j = 0, tlen = temp.length; j < tlen; j++)
                {
                    item				= temp[j];

                    if(this._direction == Direction.HORIZONTAL){
                        item.setItemId(rowNum * this.col + j);
                        item.setData(this._data[item.getItemId()-this.col]);
                        item.setPositionY(this.convertY((Math.floor(item.getItemId() / this.col) * this.getItemSize())
                            - this._currentPoint - this.getItemSize()));
                    }
                    else
                    {
                        item.setItemId(rowNum * this.row + j);
                        item.setData(this._data[item.getItemId()-this.row]);
                        item.setPositionX(this.convertX((Math.floor(item.getItemId() / this.row) * this.getItemSize())
                            - this._currentPoint - this.getItemSize()));
                    }
                }
            }
        }

        var len1 = this.mList.length;
        for(var i = 0;i<len1;++i)
        {
            var len2 = this.mList[i].length;
            for(var j=0; j<len2; ++j)
            {
                var item = this.mList[i][j];
                var id = item.getItemId();
                if(this._bMultiSelect)
                {
                    var idx = this._multiSelectIds.indexOf(id);
                    if(idx>-1 && !item.isSelected())
                        item.setSelected(true);
                    else if(idx<=-1 && item.isSelected())
                        item.setSelected(false);
                }
                else
                {
                    if(this._curSelectItemId<0)
                    {
                        if(item.isSelected())
                            item.setSelected(false);
                    }
                    else if(id == this._curSelectItemId && !item.isSelected())
                        item.setSelected(true);
                    else if(id != this._curSelectItemId && item.isSelected())
                        item.setSelected(false);
                }
            }
        }
    },
    /**
     * private 行或列的间距
     */
    getItemSize:function(){
        if(this._direction == Direction.HORIZONTAL)
        {
            return this._itemSize.height + this.rowSpace;
        }
        return this._itemSize.width + this.colSpace;
    },
    /**
     * private 将原点在左上角的Y坐标转换为原点在左下角的Y坐标
     * @param srcY
     * @returns {number}
     */
    convertY:function(srcY){
        var height = (this._itemSize.height + this.rowSpace)*this.row
                - this.rowSpace;
        return height - srcY - this._itemSize.height
                + this.itemInstance.getAnchorPointInPoints().y;
    },
    /**
     * private 将原点在左上角的Y坐标转换为原点在左下角的Y坐标
     * @param srcX
     * @returns {*}
     */
    convertX:function(srcX){
        return srcX + this.itemInstance.getAnchorPointInPoints().x;
    },
    /**
     * public 获取行列的索引
     */
    getIndex:function(){
        return this._index;
    },
    /**
     * public 设置行列索引
     * @param value
     */
    setIndex:function(value){
        if(value <=0)
        {
            value = 0;
        }
        else if(value >= this.getTotalIndex())
        {
            value = this.getTotalIndex();
        }
        if(Math.abs(this._index - value) >= 5)
        {
            if(this._index < value)
            {
                this.setCurrentPoint((value - 5) * this.getItemSize());
            }
            else
            {
                this.setCurrentPoint((value + 5) * this.getItemSize());
            }
        }
        this._index = value;

        createjs.Tween.removeTweens(this);
        this._tweenPosition = this.getCurrentPoint();
        createjs.Tween.get(this).to({_tweenPosition:(this._index * this.getItemSize())},0.5,createjs.Ease.quadOut);
        this._bTweening = true;
    },
    /**
     * public 总索引数
     */
    getTotalIndex:function(){
        var num;
        if(this._direction == Direction.HORIZONTAL)
        {
            num = Math.ceil(this._data.length / this.col) - this.row;
        }
        else if(this._direction == Direction.VERTICAL)
        {
            num = Math.ceil(this._data.length / this.row) - this.col;
        }

        return num <0?0:num;
    },
    /**
     * public 获取列表位置
     */
    getCurrentPoint:function(){
        return this._currentPoint;
    },
    /**
     * public 设置列表位置
     */
    setCurrentPoint:function(value){
        this._currentPoint = value;
        if(this._currentPoint >= this.getTotalIndex() * this.getItemSize())
        {
            this._currentPoint 	= this.getTotalIndex() * this.getItemSize();
        }else if(this._currentPoint<=0){
            this._currentPoint = 0;
        }
        this.fill();
    },
    /**
     * public 单页的行或列数
     */
    getPageNum:function(){
        if(this._direction == Direction.HORIZONTAL)
        {
            return this.row;
        }
        return this.col;
    },
    // --------------------------------------------------------
    // -------------------- 对数据的查询操作 --------------------
    // --------------------------------------------------------
    /**
     * public 查找ITEM
     */
    searchItem:function(searchField,filedValue){
        var item;
        var len = this.mList.length;
        var i;
        for (i = 0; i < len;i++ ){
            var lenj = this.mList[i].length;
            for (var j = 0 ; j < lenj; j++)
            {
                item                = this.mList[i][j];
                if(item.getData() && item.getData()[searchField] == filedValue){
                    return item;
                }
            }
        }
        return null;
    },
    /**
     * public update single item
     */
    updateItem:function(searchField,filedValue,value){
        var item = this.searchItem(searchField,filedValue);
        if(item){
            item.setData(value);
        }
        this.updateItemData(searchField,filedValue,value);
    },
    /**
     *  public 查找数据池里面的数据
     */
    searchItemData:function(searchField,filedValue){
        var o;
        var len = this._data.length;
        var i;
        for (i = 0; i < len;i++ ){
            o = this._data[i];
            if(o && o[searchField] == filedValue){
                return o;
            }
        }
        return null;
    },
    /**
     * private 通过itemid查找item
     * @param id
     * @returns {*}
     */
    searchItemByItemId:function(id){
        if(id<0)
            return null;
        var len1 = this.mList.length;
        for(var i = 0;i<len1;++i)
        {
            var len2 = this.mList[i].length;
            for(var j=0; j<len2; ++j)
            {
                var item = this.mList[i][j];
                if(id == item.getItemId())
                    return item;
            }
        }
        return null;
    },
    /**
     * public 执行所有ITEM的update方法
     */
    updateItems:function(object){
        var item;
        var len = this.mList.length;
        var i;
        for (i = 0; i < len;i++ ){
            var lenj = this.mList[i].length
            for (var j = 0 ; j < lenj; j++)
            {
                item                = this.mList[i][j];
                if(item.getData()){
                    item.updateObject(object);
                }
            }
        }
    },
    /**
     * public 只更新数据池里的数据
     */
    updateItemData:function(searchField,filedValue,value){
        var o;
        var len = this._data.length;
        var i;
        for (i = 0; i < len;i++ ){
            o = this._data[i];
            if(o && o[searchField] == filedValue){
                this._data[i] = value;
                break;
            }
        }
    },
    /**
     * 触摸相应
     * @param touch
     * @param evt
     * @returns {boolean}
     */
    onTouchBegan:function(touch,evt){
        this._lastDelta = 0;
        var loc = touch.getLocation();
        loc = this.getParent().convertToNodeSpace(loc);
        if(!cc.rectContainsPoint(this.getBoundingBox(),loc))
        {
            cc.log("[onTouchBegan] touch not in location")
            return false;
        }
        this._bClicked = true;
        this._startPt = loc;
        createjs.Tween.removeTweens(this);
        return true;
    },
    onTouchMoved:function(touch,evt){
        var movedPt = touch.getLocation();
        var delta;
        if(Direction.HORIZONTAL == this._direction)
            delta = movedPt.y - this._startPt.y;
        else
            delta = this._startPt.x - movedPt.x;
        if(Math.abs(delta) >2)
            this._bClicked = false;
        if(this._bClicked)
            return;

        var deltaPt = touch.getDelta();
        if(Direction.HORIZONTAL == this._direction)
            delta = deltaPt.y;
        else
            delta = -deltaPt.x;
        this.setCurrentPoint(this._currentPoint + delta);
        this._lastDelta = delta;
    },
    onTouchEnded:function(touch,evt){
        if(this._bClicked)
        {
            var clickPt = this.convertToNodeSpace(touch.getLocation());
            var len = this.mList.length;
            for(var i=0; i<len; ++i)
            {
                if(this.mList[i] == undefined)
                {
                    return;
                }
                var item = this.mList[i][0];
                if((Direction.HORIZONTAL == this._direction
                    && clickPt.y>=(item.getPositionY()-item.getAnchorPointInPoints().y)
                    && clickPt.y<(item.getPositionY()-item.getAnchorPointInPoints().y+this._itemSize.height))
                    || (Direction.VERTICAL == this._direction)
                    && clickPt.x>=(item.getPositionX()-item.getAnchorPointInPoints().x)
                    && clickPt.x<(item.getPositionX()-item.getAnchorPointInPoints().x+this._itemSize.width))
                {
                    len = this.mList[i].length;
                    for(var j=0;j<len;++j)
                    {
                        item = this.mList[i][j];
                        if((Direction.VERTICAL == this._direction
                            && clickPt.y>=(item.getPositionY()-item.getAnchorPointInPoints().y)
                            && clickPt.y<(item.getPositionY()-item.getAnchorPointInPoints().y+this._itemSize.height))
                            || (Direction.HORIZONTAL == this._direction)
                            && clickPt.x>=(item.getPositionX()-item.getAnchorPointInPoints().x)
                            && clickPt.x<(item.getPositionX()-item.getAnchorPointInPoints().x+this._itemSize.width))
                        {
                            var id = item.getItemId();
                            if(this._bMultiSelect)
                            {
                                var idx = this._multiSelectIds.indexOf(id);
                                if(idx>-1)
                                    this._multiSelectIds.splice(idx,1);
                                else
                                    this._multiSelectIds.push(id);

                                item.setSelected(!item.isSelected());
                            }
                            else
                            {
                                if(id != this._curSelectItemId)
                                {
                                    if(this._curSelectItemId>=0)
                                    {
                                        var old = this.searchItemByItemId(this._curSelectItemId);
                                        if(old)
                                            old.setSelected(false);
                                    }
                                    this._curSelectItemId = id;
                                    item.setSelected(true);
                                }
                            }

                        }
                    }
                }
            }
            return;
        }

        var delta = this._lastDelta;
        var scale = 10;
        var target = this._currentPoint + delta*scale;
        if(target >= this.getTotalIndex() * this.getItemSize())
            target 	= this.getTotalIndex() * this.getItemSize();
        else if(target<=0)
            target = 0;

        var interval = cc.Director.getInstance().getAnimationInterval();
        var time = (target - this._currentPoint)/(delta/interval);

        this._tweenPosition = this.getCurrentPoint();
        createjs.Tween.get(this).to({_tweenPosition:target},time,createjs.Ease.quadOut)
            .call(this.onTweenComplete,[],this);
        this._bTweening = true;
    },
    onTweenComplete:function(){
        this._bTweening = false;
    },
    /**
     * private 每帧显示之前更新Tween的位置
     * @param delta
     */
    update:function(delta){
        if(this._bTweening)
            this.setCurrentPoint(this._tweenPosition);
    },
    /**
     * public 设置列表项是否可以多选，可动态切换
     * @param bMulti
     */
    setMultiSeleted:function(bMulti){
        if(bMulti == this._bMultiSelect)
            return;
        this.unselectAllItems();
        this._bMultiSelect = bMulti;
        this._curSelectItemId = -1;
        this._multiSelectIds = [];
    },
    /**
     * private 取消所有列表项的选中状态
     */
    unselectAllItems:function(){
        var len1 = this.mList.length;
        for(var i = 0;i<len1;++i)
        {
            var len2 = this.mList[i].length;
            for(var j=0; j<len2; ++j)
            {
                var item = this.mList[i][j];
                item.setSelected(false);
            }
        }
    },
    /**
     * public 获取所有选中的列表项或者数据
     * @param bGetDatas
     * @returns {Array}
     */
    getSelectedItemsOrDatas:function(bGetDatas){
        var ret = [];
        if(this._bMultiSelect)
        {
            if(this._multiSelectIds.length>0)
            {
                var len = this._multiSelectIds.length;
                for(var i=0;i<len;++i)
                {
                    var item = this.searchItemByItemId(this._multiSelectIds[i]);
                    if(item)
                    {
                        if(bGetDatas)
                            ret.push(item.getData());
                        else
                            ret.push(item);
                    }

                }
            }
        }
        else if(this._curSelectItemId>=0)
        {
            item = this.searchItemByItemId(this._curSelectItemId);
            if(item)
            {
                if(bGetDatas)
                    ret.push(item.getData());
                else
                    ret.push(item);
            }
        }
        return ret;
    }
});