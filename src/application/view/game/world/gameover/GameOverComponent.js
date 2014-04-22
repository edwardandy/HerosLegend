/**
 * Created by chenyonghua on 14-1-7.
 */
var GameOverComponent = RepeatingThinkingComponent.extend( {
    _signalBus: null,
    _coins: 0,
    _exp: 0,
    _killEnemies: 0,
    _distance: 0,
    _rescueSoldierCount: 0,
    _isGameOver: false,
    ctor: function()
    {
        this._super();
    },
    onAdd: function()
    {
        this._super();
        this._signalBus = this.getOwner().lookupComponent( GameConst.worldBus );
        if( this._signalBus )
        {
            this._signalBus.getSignal( EntitySignals.DEAD ).add( this.collectEnemy, this );
            this._signalBus.getSignal( EntitySignals.UPDATE_DISTANCE ).add( this.updateDistance, this );
            this._signalBus.getSignal( EntitySignals.COLLECT_RESCUE ).add( this.collectRescue, this );
        }
    },
    onRemove: function()
    {
        this._super();
        if( this._signalBus )
        {
            this._signalBus.getSignal( EntitySignals.DEAD ).remove( this.collectEnemy, this );
            this._signalBus.getSignal( EntitySignals.UPDATE_DISTANCE ).remove( this.updateDistance, this );
            this._signalBus.getSignal( EntitySignals.COLLECT_RESCUE ).remove( this.collectRescue, this );
        }
        this._signalBus = null;
    },
    collectEnemy: function( health )
    {
        var spatial = health.getOwner().lookupComponent( GameConst.spatial );
        if( spatial.getObjectType().overlap( GameConst.ENEMY ) || spatial.getObjectType().overlap( GameConst.BOSS ) )
        {
            this._killEnemies++;
//            cc.log("[GameOverComponent]_killEnemies:"+this._killEnemies);
        }
    },
    updateDistance: function( distance )
    {
        this._distance = distance;
    },
    collectRescue: function( entity )
    {
        this._rescueSoldierCount++;
    },
    addCoins: function( value )
    {
        this._coins += value;
    },
    addExp: function( value )
    {
        this._exp += value;
        cc.log("this._exp:"+this._exp);
    },
    onThink: function()
    {
        if( !this._isGameOver )
        {
            var object = {};
            object.coins = this._coins;
            object.exp = this._exp;
            object.soldierRescue = this._rescueSoldierCount;
            object.killEnemies = this._killEnemies;
            object.distance = this._distance;
            this._signalBus.getSignal( EntitySignals.UPDATE_STAT ).dispatch(object);

            this.checkGameOver();
            if( this._isGameOver )
            {
                this._signalBus.getSignal( EntitySignals.GAME_OVER ).dispatch(object);
            }
        }
    },
    checkGameOver: function()
    {
        var player = this.getOwner().getOwningGroup().lookup( GameConst.PLAYER );
        if( player != null )
        {
            var health = player.lookupComponent( GameConst.health );
            if( health.getHealth() <= 0 )
            {
                this._isGameOver = true;
            }
        }
        else
        {
            this._isGameOver = true;
        }
    }
} )