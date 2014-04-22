/**
 * Created by chenyonghua on 13-11-27.
 */
var SignalEntitySpawningComponent = sf.EntityComponent.extend( {
    _entityBus: null,
    _signalDescriptor: null,
    _spawnCondition: null,
    _spawnOffsetX: 0,
    _spawnOffsetY: 0,
    _entityId: null,
    _spawnObject: null,

    ctor: function()
    {
        this._super();
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
    setSpawnData: function( signalDescriptor, entityId, spawnObject, spawnOffsetX, spawnOffsetY )
    {
        this._signalDescriptor = signalDescriptor;
        this._entityId = entityId;
        this._spawnObject = spawnObject;
        this._spawnOffsetX = spawnOffsetX == undefined ? 0 : spawnOffsetX;
        this._spawnOffsetY = spawnOffsetY == undefined ? 0 : spawnOffsetY;
    },
    onAdd: function()
    {
        if( this._signalDescriptor )
        {
            this._entityBus = this.getOwner().lookupComponent( GameConst.entityBus );
            this._entityBus.getSignal( this._signalDescriptor ).add( this.spawnEntity, this );
        }
        if( this._spawnCondition )
        {
            this._spawnCondition.setOwner( this.getOwner() );
        }
        this._super();
    },
    onRemove: function()
    {
        if( this._spawnCondition )
        {
            this._spawnCondition.release();
        }
        if( this._signalDescriptor && this._entityBus )
        {
            this._entityBus.getSignal( this._signalDescriptor ).remove( this.spawnEntity, this );
        }
        this._super();
    },
    spawnEntity: function()
    {
        if( !this.canSpawn() )
        {
            return null;
        }
        var entity = null;
        if( this._entityId != null && this._spawnObject != null )
        {
            entity = EntityCreator.createEntityById( this._entityId, this._spawnObject, this.getOwner(), this._spawnOffsetX, this._spawnOffsetY );
            this._entityBus.getSignal( EntitySignals.STARTING_SPAWN ).dispatch();
        }
        return entity;
    },
    canSpawn: function()
    {
        return null == this._spawnCondition || this._spawnCondition.isConditionalTrue();
    }
} );