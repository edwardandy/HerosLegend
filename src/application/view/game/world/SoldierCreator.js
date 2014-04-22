/**
 * Created by chenyonghua on 14-3-20.
 */
var SoldierCreator = {};


///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// 主角 ////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
SoldierCreator.createPlayer = function( entity )
{
    entity.setAliasName( "player" );

    var health = entity.lookupComponent( GameConst.health );
    if( health )
    {
        health.setMaxHealth( 300 );
    }

    //touch
    var touchCollect = new TouchCollectComponent();
    entity.addComponent( touchCollect, GameConst.touchCollect );

    var spatial = entity.lookupComponent( GameConst.spatial );
    spatial.getObjectType().add( GameConst.PLAYER );

    //follower
    var followerContainer = new FollowerContainingComponent();
    followerContainer.maxCount = 8;
    followerContainer.colInterval = 0.8;
    followerContainer.rowInterval = 0.4;
    entity.addComponent( followerContainer, GameConst.followerContainer );

    entity.setTeamId( 1 );
    return entity;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// 副手 ////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
SoldierCreator.createFollower = function( entity )
{
    entity.setAliasName( GameConst.FOLLOWER );

    var health = entity.lookupComponent( GameConst.health );
    if( health )
    {
        health.setMaxHealth( 100 );
    }

    //follower
    var follow = new FollowComponent()
    entity.addComponent( follow, GameConst.follow );


    //通知gameOverComponent收集营救的兵。
    var worldBus = entity.lookupComponentByEntity( GameConst.worldBus, GameConst.world );
    if( worldBus )
    {
        worldBus.getSignal( EntitySignals.COLLECT_RESCUE ).dispatch( entity );
    }
    return entity;
}

SoldierCreator.createSoldier = function(type)
{
    var entity = EntityCreator.createEntity(type);
    var spatial = entity.lookupComponent( GameConst.spatial );
    spatial.setObjectType( sf.ObjectType.create( GameConst.BATTLE_ITEM, type, GameConst.ARMY ) );
    spatial.setWidth( 1 );
    spatial.setHeight( 1 );

    var transform = entity.lookupComponent(GameConst.transform);
    transform.setColOffset(0.5);

    var render = new SimpleArmatureRenderer();
    render.init( "SoldierSkeleton" );
    render.queue( "walk", 1 );
    entity.addComponent( render, GameConst.render );
    render.setSpeedScale( 0.5 );

    var animationSequencer = new AnimationSequencerComponent();
    animationSequencer.setDefaultAnimation( {"actions": [GameConst.WALK], "looping": 1} );
    entity.addComponent( animationSequencer, GameConst.animationSequencer );

    var health = new HealthComponent();
    health.setMaxHealth( 500 );
    var changeHealth = new ChangeHealthStrategy();
    health.add( changeHealth, GameConst.changeHealth );
    var deadStrategy = new DeadHealthStrategy();
    deadStrategy.setAnimation( GameConst.DIE );
    health.add( deadStrategy, GameConst.deadStrategy );
    entity.addComponent( health, GameConst.health );

    var boundCheck = new BoundCheckComponent();
    entity.addComponent( boundCheck, GameConst.boundCheck );

    return entity;
}

SoldierCreator.createLancer = function()
{
    var entity = SoldierCreator.createSoldier(GameConst.LANCER);

    var animationSequencer = entity.lookupComponent(GameConst.animationSequencer)
    animationSequencer.addAnimationWithSignal( EntitySignals.REPEATING_SPAWN, {"actions": [GameConst.ATTACK_LANCE, GameConst.WALK], "looping": 0} );
//    animationSequencer.addAnimationWithSignal( EntitySignals.STARTING_SPAWN, {"actions": [GameConst.ATTACK_LANCE, GameConst.WALK], "looping": 0} );

    var render = entity.lookupComponent("render");
    render.addFrameSignal(GameConst.ATTACK_LANCE,13,EntitySignals.FRAME_CALL);

    var signalSpawn = new SignalEntitySpawningComponent();
    signalSpawn.setSpawnData( EntitySignals.FRAME_CALL, GameConst.ARROW, {"velX": 0.2} );
    entity.addComponent( signalSpawn, "signalSpawn" );

    //spawn bullet
    var repeatSpawning = new RepeatingEntitySpawningComponent();
    entity.addComponent( repeatSpawning, GameConst.repeatSpawning );
    repeatSpawning.spawnOffsetX = -0.2;
    repeatSpawning.spawnOffsetY = 0.4;
    repeatSpawning.setSpawnData( GameConst.LANCE, {"velX": 0.15} );
    var timeGenerator = new RandomNumberRangeGenerator();
    timeGenerator.min = 8;
    timeGenerator.max = 11;
    repeatSpawning.setCooldownTime( timeGenerator );

    return entity;
}
SoldierCreator.createArcher = function()
{
    var entity = SoldierCreator.createSoldier(GameConst.ARCHER);

    var render = entity.lookupComponent( GameConst.render );
    render.changeSkin( "weapon", "part-bow.png" );

    var animationSequencer = entity.lookupComponent(GameConst.animationSequencer);
    animationSequencer.addAnimationWithSignal( EntitySignals.STARTING_SPAWN, {"actions": [GameConst.ATTACK_ARROW, GameConst.WALK], "looping": 0} );

    //spawn bullet
    var repeatSpawning = new RepeatingEntitySpawningComponent();
    entity.addComponent( repeatSpawning, GameConst.repeatSpawning);
    repeatSpawning.spawnOffsetX = 0.4;
    repeatSpawning.spawnOffsetY = 0.2;
    repeatSpawning.setSpawnData( GameConst.ARROW, {"velX": 0.2} );
    var timeGenerator = new RandomNumberRangeGenerator();
    timeGenerator.min = 2;
    timeGenerator.max = 3;
    repeatSpawning.setCooldownTime( timeGenerator );

    return entity;
}


SoldierCreator.createAnimal = function(type)
{
    var entity = EntityCreator.createEntity(type);
    var spatial = entity.lookupComponent( "spatial" );
    spatial.setObjectType( sf.ObjectType.create( GameConst.BATTLE_ITEM, type, GameConst.ARMY ) );
    spatial.setWidth( 1 );
    spatial.setHeight( 1 );

    var render = new SimpleArmatureRenderer();
    render.init( "ElephantSkeleton" );
    render.setScale(1.2);
    render.queue( GameConst.WALK, 1 );
    entity.addComponent( render, "render" );
    render.getArmatureAnimation().setSpeedScale( 0.5 );

    var transform = entity.lookupComponent(GameConst.transform);
    transform.setColOffset(0.5);


    var health = new HealthComponent();
    health.setMaxHealth( 500 );
    var changeHealth = new ChangeHealthStrategy();
    health.add( changeHealth, "changeHealth" );
    var deadStrategy = new DeadHealthStrategy();
    deadStrategy.setAnimation( GameConst.DIE );
    health.add( deadStrategy, "deadStrategy" );
    entity.addComponent( health, "health" );

    var boundCheck = new BoundCheckComponent();
    entity.addComponent( boundCheck, "boundCheck" );

    return entity;
}