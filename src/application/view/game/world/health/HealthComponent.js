/**
 * Created by chenyonghua on 13-11-25.
 */
var HealthComponent = sf.StrategyContainingComponent.extend( {
    maxHealth: 100,
    _health: 100,
    _lastDamageOriginator: null,
    damageModifier: null,
    _isDead: false,
    _entityBus: null,
    _worldBus: null,
    ctor: function()
    {
        this._super();
        this.damageModifier = {};
        this._isDead = false;
    },
    onAdd: function()
    {
        this._health = this.maxHealth;
        this._entityBus = this.getOwner().lookupComponent( GameConst.entityBus );
        this._worldBus = this.getOwner().lookupComponentByEntity(GameConst.worldBus,GameConst.world);
    },
    onRemove: function()
    {
        this.damageModifier = null;
        this._entityBus = null;
    },
    setMaxHealth: function( value )
    {
        this.maxHealth = value;
        this._health = this.maxHealth;
    },
    getMaxHealth:function()
    {
        return this.maxHealth;
    },
    setHealth: function( value )
    {
        if( value < 0 )
            value = 0;
        if( value > this.maxHealth )
            value = this.maxHealth;
        this._health = value;
        if( this._health <= 0 )
        {
            this._isDead = true;
            if( this._entityBus )
            {
                this._entityBus.getSignal( EntitySignals.DEAD ).dispatch( this );
                this._worldBus.getSignal( EntitySignals.DEAD ).dispatch( this );
            }
        }
        if( this._entityBus )
        {
            this._entityBus.getSignal( EntitySignals.HEALTH_CHANGE ).dispatch( this );
        }
    },
    getHealth: function()
    {
        return this._health;
    },
    modify: function( amount, modifyType, originator )
    {
        this._lastDamageOriginator = originator;

        // Allow modification of damage based on type.
        if( modifyType && this.damageModifier.hasOwnProperty( modifyType ) )
        {
            //Logger.print(this, "Damage modified by entry for type '" + damageType + "' factor of " + DamageModifier[damageType]);
            amount *= this.damageModifier[modifyType];
        }

        this.setHealth( this._health + amount );

        this.notifyStrategies( amount, modifyType, originator );

        // If you wanted to do clever things with the last guy to hurt you,
        // you might want to keep this value set. But since it can have GC
        // implications and also lead to stale data we clear it.
        this._lastDamageOriginator = null;
    },
    notifyStrategies: function( amount, modifyType, originator )
    {
        var strategies = this.getStrategies();
        var len = strategies.length;
        for( var i = 0; i < len; i++ )
        {
            var strategy = strategies[i];
            if( strategy == null )
            {
                continue;
            }
            strategy.onHealthChange( amount, modifyType, originator );
        }
    },
    isDead: function()
    {
        return this._isDead;
    }
} );