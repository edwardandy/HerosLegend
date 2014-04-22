/**
 * Created by chenyonghua on 13-11-28.
 */
var RepeatingEntitySpawningComponent = RepeatingThinkingComponent.extend( {
    _spawnObject: null,
    _entityId: null,
    _spawnCondition: null,
    spawnOffsetX: 0,
    spawnOffsetY: 0,
    _entityBus:null,
    ctor: function()
    {
        this._super();
    },
    setSpawnData: function( entityId, object )
    {
        this._entityId = entityId;
        this._spawnObject = object || {};
    },
    setSpawnCondition: function( value )
    {
        if(this._spawnCondition)
        {
            this._spawnCondition.release();
        }
        value.retain();
        if(this.getOwner())
        {
            value.setOwner(this.getOwner());
        }
        this._spawnCondition = value;
    },
    onAdd:function()
    {
        this._entityBus = this.getOwner().lookupComponent( GameConst.entityBus );
        if(this._spawnCondition)
        {
            this._spawnCondition.setOwner(this.getOwner());
        }
        this._super();
    },
    onRemove: function()
    {
        if(this._spawnCondition)
        {
            this._spawnCondition.release();
        }
        this._super();
    },
    onThink: function()
    {
        this._super();
        if(this.canSpawn() == false)
        {
            return;
        }
        var healthComponent = this.getOwner().lookupComponent(GameConst.health);
        if(healthComponent == null || !healthComponent.isDead())
        {
            if( this._entityId != null && this._spawnObject != null )
            {
                EntityCreator.createEntityById( this._entityId, this._spawnObject, this.getOwner(), this.spawnOffsetX, this.spawnOffsetY );
                if(this._entityBus)
                {
                    this._entityBus.getSignal( EntitySignals.STARTING_SPAWN ).dispatch();
                    this._entityBus.getSignal( EntitySignals.REPEATING_SPAWN ).dispatch();
                }
            }
        }
    },
    canSpawn: function()
    {
        return null == this._spawnCondition || this._spawnCondition.isConditionalTrue();
    }
} );