/**
 * Created by chenyonghua on 14-3-9.
 */
var MultiSignalEntitySpawningComponent = sf.EntityComponent.extend( {
    _entityBus: null,
    _spawnCondition: null,

    _spawnDict: null,
    _callbacks: null,
    rowGenerator: null,
    colGenerator: null,
    ctor: function()
    {
        this._super();
        this._spawnDict = {};
        this._callbacks = {};
    },
    setSpawnCondition: function( value )
    {
        if( this._spawnCondition )
        {
            this._spawnCondition.release();
        }
        value.retain();
        if( this.getOwner() )
        {
            value.setOwner( this.getOwner() );
        }
        this._spawnCondition = value;
    },
    addSpawnData: function( signalDescriptor, entityId, quantity, spawnObject, spawnOffsetCol, spawnOffsetRow )
    {
        if( this._spawnDict[signalDescriptor.getId()] == null )
        {
            this._spawnDict[signalDescriptor.getId()] = [];
        }
        spawnOffsetCol = (spawnOffsetCol == undefined ? 0 : spawnOffsetCol);
        spawnOffsetRow = (spawnOffsetRow == undefined ? 0 : spawnOffsetRow);
        this._spawnDict[signalDescriptor.getId()].push( {"signalDesc": signalDescriptor, "entityId": entityId, "quantity": quantity, "spawnObject": spawnObject, "offsetCol": spawnOffsetCol, "offsetRow": spawnOffsetRow} );
    },
    onAdd: function()
    {
        this._entityBus = this.getOwner().lookupComponent( GameConst.entityBus );
        for( var key in this._spawnDict )
        {
            var object = this._spawnDict[key];
            if( object )
            {
                this._entityBus.getSignalById( key ).add( this.getHandlerFunction( key ), this );
            }
        }
        return;
        if( this._spawnCondition )
        {
            this._spawnCondition.setOwner( this.getOwner() );
        }
        this._super();
    },
    getHandlerFunction: function( id )
    {
        if( this._callbacks[id] == null )
        {
            this._callbacks[id] = function( params )
            {
                this.spawnEntity( id );
            }
        }
        return this._callbacks[id];
    },
    onRemove: function()
    {
        if( this._spawnCondition )
        {
            this._spawnCondition.release();
        }
        for( var key in this._spawnDict )
        {
            var object = this._spawnDict[key];
            if( object )
            {
                this._entityBus.getSignalById( key ).remove( this.getHandlerFunction( key ), this );
            }
        }
        this._super();
    },
    spawnEntity: function( id )
    {
        if( !this.canSpawn() )
        {
            return null;
        }
        if( id == undefined )
        {
            return;
        }
        var array = this._spawnDict[id];
        if( array )
        {
            var len = array.length;
            for( var i = 0; i < len;i++)
            {
                var object = array[i];
                var quantity = object.quantity;
                var isRandom = quantity > 1 ? true : false;
                while( quantity > 0 )
                {
                    if( isRandom )
                    {
                        if(this.colGenerator)
                        {
                            object.offsetCol = this.colGenerator.getNextValue();
                        }
                        if(this.rowGenerator)
                        {
                            object.offsetRow = this.rowGenerator.getNextValue();
                        }
                    }
                    EntityCreator.createEntityById( object.entityId, object.spawnObject, this.getOwner(), object.offsetCol, object.offsetRow );
                    this._entityBus.getSignal( EntitySignals.STARTING_SPAWN ).dispatch();
                    quantity--;
                }
            }
        }
    },
    canSpawn: function()
    {
        return null == this._spawnCondition || this._spawnCondition.isConditionalTrue();
    }
} )