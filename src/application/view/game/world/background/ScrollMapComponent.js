/**
 * Created by chenyonghua on 13-12-9.
 */
var ScrollMapComponent = sf.TickedComponent.extend( {
    _distance: 0,                   //移动的距离
    _velocity: 0.005,                  //移动的速度
    _renderList: null,
    _data: null,
    _currentIndex: 0,
    _totalRenderCount: null,
    _cellSize: 100,
    _container: null,
    _endY: 0,
    _offset: 0,

    repeatForever: true,
    _worldBus: null,
    _direction: Direction.HORIZONTAL,
    ctor: function( view, direction )
    {
        this._super();
        this._container = view;
        this._direction = direction;
    },
    setOffset: function( value )
    {
        this._offset = value;
        if( this._direction == Direction.HORIZONTAL )
        {
            this._container.setPositionX( value );
        }
        else
        {
            this._container.setPositionY( value );
        }
    },
    //[[BackgroundItemVO,BackgroundItemVO,BackgroundItemVO],[BackgroundItemVO,BackgroundItemVO,BackgroundItemVO],[BackgroundItemVO,BackgroundItemVO,BackgroundItemVO],[BackgroundItemVO,BackgroundItemVO,BackgroundItemVO]]
    setData: function( value )
    {
        cc.log( "[ScrollMapComponent] setData" );
        this._data = value;
        var winSize = cc.Director.getInstance().getWinSize();
        if( this._direction == Direction.HORIZONTAL )
        {
            this._totalRenderCount = Math.ceil( (winSize.width - this._offset) / this._cellSize ) + 1;
            this._endY = this._cellSize * (this._data.length - Math.ceil( winSize.width / this._cellSize ) - 1 ) + this._offset;
        }
        else
        {
            this._totalRenderCount = Math.ceil( (winSize.height - this._offset) / this._cellSize ) + 1;
            this._endY = this._cellSize * (this._data.length - Math.ceil( winSize.height / this._cellSize ) - 1 ) + this._offset;
        }
    },
    setCellSize: function( value )
    {
        this._cellSize = value;
    },
    setVelocity: function( value )
    {
        if( this._worldBus )
        {
            this._worldBus.getSignal( EntitySignals.UPDATE_MAP_VELOCITY ).dispatch( value - this._velocity );
        }
        this._velocity = value;
    },
    getVelocity: function()
    {
        return this._velocity;
    },
    onAdd: function()
    {
        this._worldBus = this.getOwner().lookupComponentByEntity( GameConst.worldBus, GameConst.world );
        this._renderList = {};
        this.refreshDisplayItems( true );
    },
    onRemove: function()
    {
        this._worldBus = null;
        if( this._container )
        {
            this._container.removeAllChildren( true );
            this._container.removeFromParent( true );
        }
        this._trashList = null;
        this._tagMap = null;
    },
    _pause: false,
    stop: function()
    {
        this._pause = true;
    },
    resume: function()
    {
        this._pause = false;
    },
    isRunning: function()
    {
        return !this._pause;
    },
    onTick: function( dt )
    {
        if( this._pause )
        {
            return;
        }
        var targetY = this._distance + this._velocity * GameConst.CELL_SIZE.y;
        if( targetY <= this._endY || this.repeatForever )
        {
            this.setDistance( targetY );
        }
        else
        {
            this._velocity = 0;
        }
//        cc.log("this._container.numChildren:"+this._container.getChildren().length)
    },
    setDistance: function( value )
    {
        this._distance = value;
        if( this._worldBus )
        {
            this._worldBus.getSignal( EntitySignals.UPDATE_DISTANCE ).dispatch( this.getDistance() );
        }
        this.refreshDisplayItems();
    },
    getDistance: function()
    {
        return Math.floor( this._distance / 10 );
    },
    refreshDisplayItems: function( isAll )
    {
        var needList = [];
        var outList = [];
        var isNeed = false;
        var index = 0;
        var j = 0;
        var len = 0;
        if( isAll )
        {
            for( i = 0; i < this._totalRenderCount; i++ )
            {
                index = Math.floor( (this._distance + (i * this._cellSize)) / this._cellSize );
                this._renderList[index] = this.createRow( index );
            }
        }
        else
        {

            for( var i = 0; i < this._totalRenderCount; i++ )
            {
                index = Math.ceil( (this._distance + (i * this._cellSize)) / this._cellSize );
                if( index < this._data.length || this.repeatForever )
                {
                    needList.push( index );
                }
            }

            for( var row in this._renderList )
            {
                if( !this._renderList[row] )
                {
                    cc.log( "[ScrollMapComponent] _renderList[" + row + "] is error!" );
                    continue;
                }

                isNeed = false;
                for( j = 0; j < needList.length; j++ )
                {
                    if( row == needList[j] )
                    {
                        isNeed = true;
                        needList.splice( j, 1 );
                        break;
                    }
                }
                var renderListTemp = this._renderList[row];
                if( !isNeed )
                {
                    outList.push( row );
                } else
                {
                    len = renderListTemp.length;
                    for( var k = 0; k < len; ++k )
                    {
                        var item = renderListTemp[k];
                        if( this._direction == Direction.HORIZONTAL )
                        {
                            item.setPositionX( item.originalPosition.x + (row * this._cellSize) - this._distance - this._cellSize );
                            item.setPositionY( item.originalPosition.y );
                        }
                        else
                        {
                            item.setPositionX( item.originalPosition.x );
                            item.setPositionY( item.originalPosition.y + (row * this._cellSize) - this._distance - this._cellSize );
                        }
                    }
                }
            }
            //clear sprites
            len = outList.length;
            if( len <= 0 )
            {
                return;
            }
            var temp = null;
            var tlen = 0;
            for( i = 0; i < len; i++ )
            {
                temp = this._renderList[outList[i]];
                for( j = 0, tlen = temp.length; j < tlen; j++ )
                {
                    var item = temp[j];
                    if( item && item.getParent() == this._container && this._container )
                    {
                        this.releaseSprite( item );
                        this._container.removeChild( item, false );
                    }
                }
                delete this._renderList[outList[i]];
                //add next row
                if( needList.length > 0 )
                {
                    var needAddRow = needList.shift();
                    this._renderList[needAddRow] = this.createRow( needAddRow );
                }
            }
        }
    },
    createRow: function( row )
    {
        if( row >= this._data.length )
        {
            if( this.repeatForever )
            {
                row = row % this._data.length;
            }
            else
            {
                cc.log( "row is out of the bound" );
                return null;
            }
        }
        var array = this._data[row];
        if( array == null || !(array instanceof Array) )
        {
            cc.log( "[ScrollMapComponent] row doesn't exist" );
            return null;
        }
        var temp = [];
        for( var j = 0; j < array.length; j++ )
        {
            var vo = array[j];
            var item = this.getSprite( vo.filename );
            if( item )
            {
                item.originalPosition = vo.position;
                item.setScaleX( vo.scale.x );
                item.setScaleY( vo.scale.y );
                item.setOpacity( vo.alpha * 255 );
                if( this._container )
                {
                    this._container.addChild( item, vo.depth );
                    temp.push( item );
                }
            }
            else
            {
                cc.log( "[ScrollMapComponent] sprite doesn't exist" );
            }
        }
        return temp;
    },
    _trashList: {},
    getSprite: function( filename )
    {
        if( this._trashList[filename] == null )
        {
            this._trashList[filename] = [];
        }
        if( this._trashList[filename].length > 0 )
        {
            return this._trashList[filename].shift();
        }
        else
        {
            var item = new MapItem();
            var spriteFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame( filename );
            if( spriteFrame )
            {
                item.initWithSpriteFrameName( filename );
            }
            else
            {
                item.init( filename );
            }
            item.fileName = filename;
            if( item != null )
            {
                item.setAnchorPoint( cc.p( 0.5, 0 ) );
            }
            item.retain();
            return item;
        }
    },
    releaseSprite: function( item )
    {
        this._trashList[item.fileName].push( item );
    }
} );

var MapItem = cc.Sprite.extend( {
    fileName: null,
    originalPosition: null,
    ctor: function()
    {
        this._super();
    }
} );