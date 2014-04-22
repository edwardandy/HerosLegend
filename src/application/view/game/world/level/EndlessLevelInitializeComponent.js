/**
 * Created by chenyonghua on 14-1-3.
 */
var EndlessLevelInitializeComponent = sf.TickedComponent.extend( {
    _rowData: null,
    _scrollMap: null,
    _worldBus: null,
    _rowSpatialManager: null,

    _enemyMap: null,
    _buildingMap: null,
    _spoilsMap: null,
    _rescueMap: null,
    _bossQueue: null,

    _currentBossDesc: null, //当前出现的boss信息

    _currentWave: 0,
    _coolDownTime: 0,
    _spawnSpoilsWave: 4,
    _hardPerWave: 5,
    _hardPerRate: 1.1,

    //values need to be set.
    beginSpawnTime: 3,
    maxEnemyWaveInterval: 1,
    extraInterval: 0,
    difficultWaveRate: 0.05,
    totalDifficultValue: 3,
    flagWaveList: null, //array [5,10,15],需要增加难度的波数

    minSpawnRange: null, //ccpoint
    maxSpawnRange: null, //ccpoint

    _duringBossFighting: false,
    _bossCount: 0,

    ctor: function()
    {
        this._super();
        this._enemyMap = {};
        this._buildingMap = {};
        this._spoilsMap = {};
        this._rescueMap = {};
        this._bossQueue = [];
    },
    onAdd: function()
    {
        this._worldBus = this.getOwner().lookupComponent( GameConst.worldBus );
        this._rowData = this.getOwner().lookupComponentByEntity( GameConst.rowData, GameConst.world );
        this._scrollMap = this.getOwner().lookupComponentByEntity( GameConst.scrollMap, GameConst.world );
        this._rowSpatialManager = this.getOwner().lookupComponentByEntity( GameConst.rowSpatialManager, GameConst.world );
        if( this.minSpawnRange == null || this.maxSpawnRange == null )
        {
            cc.log( "[EndlessLevelInitializeComponent] minSpawnRange or maxSpawnRange is null" );
        }
    },
    onRemove: function()
    {
        this._super();
        this._worldBus = null;
        this.rowData = null;
    },
    onTick: function( dt )
    {
        this._super();

        this.beginSpawnTime -= dt;
        if( this.beginSpawnTime >= 0 )
        {
            return;
        }

        this._coolDownTime -= dt;
        if( this._coolDownTime <= 0 )
        {
            this.spawnEnemyWave();
        }

        if( this._duringBossFighting == false )
        {
            this.spawnBoss();
        }
        else
        {
            //check bosses alive
            this.checkBossStatus();
        }
    },
    checkBossStatus: function()
    {
        var bosses = this.getOwner().getOwningGroup().lookupEntities( GameConst.BOSS );
        if( bosses.length > 0 )
        {
            if( this._currentBossDesc != null && this._scrollMap.getDistance() >= this._currentBossDesc.thresholdDistance + this._currentBossDesc.offsetY )
            {
                if( this._worldBus )
                {
                    this._worldBus.getSignal( EntitySignals.STOP_SCROLL_MAP ).dispatch();
                }
                this._currentBossDesc = null;
            }
        }
        else
        {
            if( this._bossQueue.length <= 0 )
            {
                //gameOver
                if( this._worldBus )
                {
                    this._worldBus.getSignal( EntitySignals.GAME_OVER ).dispatch();
                }
            }
            else
            {
                if( this._worldBus )
                {
                    this._worldBus.getSignal( EntitySignals.RESUME_SCROLL_MAP ).dispatch();
                }
            }
            this._duringBossFighting = false;
        }

    },
    spawnEnemyWave: function()
    {
        this._coolDownTime = this.getNextCoolDownTime();
        this._currentWave++;

        //第一波必出一个营救兵。
        if( this._currentWave == 3 )
        {
            this.spawnSpoil( this._spawnSpoilsWave );
        }
        else
        {
            this.spawnSpoil( this._currentWave );
        }

        this.spawnBuilding( this._currentWave );

        var totalValue = (this.totalDifficultValue + this._currentWave * this.difficultWaveRate) + 1;

        //deal with the flag wave
        if( this._currentWave % this._hardPerWave == 0 )
        {
            totalValue = this._hardPerRate * totalValue;
        }
        //生成组合兵
        this.spawnGroup( totalValue );
    },
    spawnBoss: function()
    {
        if( this._bossQueue.length > 0 )
        {
            var thresholdDistance = this._bossQueue[0].thresholdDistance;
            var offsetY = this._bossQueue[0].offsetY;
            if( this._scrollMap.getDistance() >= thresholdDistance )
            {
                this._currentBossDesc = this._bossQueue.shift();
                var formation = this._currentBossDesc.formation;
                for( var i = 0, len = formation.length; i < len; i++ )
                {
                    var object = formation[i];
                    object.position.y = object.position.y + this._rowData.getRows();
                    var entityId = object.entityId;
                    var position = object.position;
                    if( position != null )
                    {
                        this._duringBossFighting = true;
                        var entity = this.spawnEntity( entityId, position );
                        entity.setAliasName( GameConst.BOSS );
                        entity.setOwningGroup( this.getOwner().getOwningGroup() );
                        entity.initialize();
                        this._bossCount++;
                        if( this._bossCount % 2 )
                        {
                            this.totalDifficultValue -= this._bossCount * 2;
                        }
                    }
                }
            }
        }
    },
    //生成组合兵
    spawnGroup: function( difficultValue )
    {
        var group = GameConst.FORMATION[Math.floor( Math.random() * GameConst.FORMATION.length )];
        var len = group.length;
        var startCol = -1;
        for( var i = 0; i < len; i++ )
        {
            if( group[i] instanceof Array )
            {
                var len2 = group[i].length;
                if( startCol == -1 )
                {
                    this.extraInterval += 0.05 * len;
                    startCol = Math.floor( Math.random() * (GameConst.numCols - len2 - 1 ) )
                }
                for( var j = 0; j < len2; j++ )
                {
                    if( group[i][j] == 1 )
                    {
                        var entityId = this.randomEntityId( this._currentWave );
                        var row = this._rowData.getRows() + i;
                        var col = startCol + j;
                        if( this.checkWalkable( col, 2 ) )
                        {
                            var entity = this.spawnEntity( entityId, cc.p( col, row ) );
                            entity.setOwningGroup( this.getOwner().getOwningGroup() );
                            entity.initialize();
                            difficultValue -= this._enemyMap[entityId].difficultValue;
                            if( difficultValue <= 0 )
                            {
                                return difficultValue;
                            }
                        }
                    }
                }
            }
            else
            {
                if( startCol == -1 )
                {
                    this.extraInterval += 0.05 * len;
                    startCol = Math.floor( Math.random() * (GameConst.numCols - len - 1 ) );
                }
                if( group[i] == 1 )
                {
                    var entityId = this.randomEntityId( this._currentWave );
                    var row = this._rowData.getRows();
                    var col = startCol + i;
                    if( this.checkWalkable( col, 2 ) )
                    {
                        var entity = this.spawnEntity( entityId, cc.p( col, row ) );
                        entity.setOwningGroup( this.getOwner().getOwningGroup() );
                        entity.initialize();
                        difficultValue -= this._enemyMap[entityId].difficultValue;
                        if( difficultValue <= 0 )
                        {
                            return difficultValue;
                        }
                    }
                }
            }
        }
        return difficultValue;
    },
    spawnSpoil: function( wave )
    {
        var position = null;
        if( wave % this._spawnSpoilsWave == 0 )
        {
            var entityId = this.randomSpoilsId( wave );
            position = this.getRandomPosition();
            if( position != null )
            {
                var entity = this.spawnEntity( entityId, position );
                entity.setOwningGroup( this.getOwner().getOwningGroup() );
                entity.initialize();
            }
        }
    },
    spawnBuilding: function( wave )
    {
        var spawnCount = Math.floor( Math.random() * 2 );
        while( spawnCount > 0 )
        {
            var entityId = this.randomBuildingId( wave );
            if( entityId )
            {
                var position = this.getRandomPosition();
                if( position != null )
                {
                    var entity = this.spawnEntity( entityId, position );
                    entity.setOwningGroup( this.getOwner().getOwningGroup() );
                    entity.initialize();
                }
            }
            spawnCount--;
        }
    },
    spawnEntity: function( entityId, position )
    {
        var entity = null;
        if( entityId == GameConst.PRISON_SOLDIER )
        {
            var spawnSoldierType = this.randomRescueSoldier( this._currentWave );
            cc.log( "[endless] spawnSoldierType:" + spawnSoldierType );
            entity = EntityCreator.createBattleItem( entityId, {"entityId": spawnSoldierType} );
        }
        else
        {
            entity = EntityCreator.createBattleItem( entityId );
        }
        if( entity == null )
        {
            return;
        }
        var spatial = entity.lookupComponent( GameConst.spatial );
        if( spatial != null )
        {
            if( spatial.getObjectType().overlap( GameConst.ENEMY ) )
            {
                var angleSpawning = entity.lookupComponent( "angleSpawning" );
                //随着战斗深入设置子弹间隔，是否需要这样设置？？？？
                angleSpawning.setSpawnInterval( Math.floor( 5 - this._currentWave * this.difficultWaveRate ) );
            }
            spatial.setRenderCol( position.x );
            spatial.setRenderRow( position.y );
            spatial.setVelY( spatial.getVelY() + (-1) * this._scrollMap.getVelocity() );
        }
        return entity;
    },
    getNextCoolDownTime: function()
    {
        var time = this.maxEnemyWaveInterval + this.extraInterval;
        this.extraInterval = 0;
        return time;
    },
    addEnemyId: function( entityId, difficultValue, randomWeight, thresholdWave )
    {
        this._enemyMap[entityId] = {"difficultValue": difficultValue, "weight": randomWeight, "wave": thresholdWave};
    },
    addBuildingId: function( entityId, randomWeight, thresholdWave )
    {
        this._buildingMap[entityId] = {"weight": randomWeight, "wave": thresholdWave};
    },
    addSpoilsId: function( entityId, randomWeight, thresholdDistance )
    {
        this._spoilsMap[entityId] = {"weight": randomWeight, "wave": thresholdDistance};
    },
    addRescueId: function( entityId, randomWeight, thresholdDistance )
    {
        this._rescueMap[entityId] = {"weight": randomWeight, "wave": thresholdDistance};
    },
    addLevelBoss: function( object )
    {
        this._bossQueue.push( object );
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////// 获取随机entity //////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    randomEntityId: function( wave )
    {
        var randomList = [];
        var o = null;
        for( var id in this._enemyMap )
        {
            o = this._enemyMap[id];
            if( parseInt( o.wave ) <= wave )
            {
                for( var i = 0, len = o.weight; i < len; i++ )
                {
                    randomList.push( id );
                }
            }
        }
        return randomList[Math.floor( Math.random() * randomList.length )];
    },
    randomSpoilsId: function( wave )
    {
        var randomList = [];
        var o = null;
        for( var id in this._spoilsMap )
        {
            o = this._spoilsMap[id];
            if( parseInt( o.wave ) <= wave )
            {
                for( var i = 0, len = o.weight; i < len; i++ )
                {
                    randomList.push( id );
                }
            }
        }
        return randomList[Math.floor( Math.random() * randomList.length )];
    },
    randomBuildingId: function( wave )
    {
        var randomList = [];
        var o = null;
        for( var id in this._buildingMap )
        {
            o = this._buildingMap[id];
            if( parseInt( o.wave ) <= wave )
            {
                for( var i = 0, len = o.weight; i < len; i++ )
                {
                    randomList.push( id );
                }
            }
        }
        if( randomList.length <= 0 )
        {
            return null;
        }
        return randomList[Math.floor( Math.random() * randomList.length )];
    },
    randomRescueSoldier: function( wave )
    {
        var randomList = [];
        var o = null;
        for( var id in this._rescueMap )
        {
            o = this._rescueMap[id];
            if( parseInt( o.wave ) <= wave )
            {
                for( var i = 0, len = o.weight; i < len; i++ )
                {
                    randomList.push( id );
                }
            }
        }
        return randomList[Math.floor( Math.random() * randomList.length )];
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////// 获取随机位置 //////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    rowPerWave: 4, //一波占据的空间是多少行
    getRandomPosition: function()
    {
        var row = Math.floor( Math.random() * this.rowPerWave ) + this._rowData.getRows();
        var col = Math.floor( Math.random() * this._rowData.getCols() );
        return cc.p( col, row );
    },
    checkWalkable: function( col, width )
    {
        var walkabed = true;
        var allSpatials = this._rowSpatialManager.getAllSpatials();

        for( var i = 0, len = allSpatials.length; i < len; i++ )
        {
            var spatial = allSpatials[i];
            if( spatial.getMinCol() <= col && spatial.getMaxCol() >= col && spatial.getObjectType().overlap( GameConst.STATIC_ITEM ) )
            {
                walkabed = false;
                break;
            }
        }
        return walkabed;
    }
} )