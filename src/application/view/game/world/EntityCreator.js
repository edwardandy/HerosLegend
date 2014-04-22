/**
 * Created by chenyonghua on 13-11-21.
 */
var EntityCreator = cc.Class.extend( {
    ctor: function()
    {

    }
} );

EntityCreator.generateID = 0;
EntityCreator.getNewID = function()
{
    return "_" + EntityCreator.generateID++;
}
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// 世界 ////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
EntityCreator.createWorld = function( gameLayer )
{
    var entity = sf.Entity.create( GameConst.world );
    entity.retain();

    var worldBus = new SignalBus();
    entity.addComponent( worldBus, GameConst.worldBus );

    //game view
    var gameView = new GameViewComponent();
    var gameViewLayer = cc.Layer.create();
    gameLayer.addChild( gameViewLayer, 1000, 0 );
    gameView.setView( gameViewLayer );
    entity.addComponent( gameView, GameConst.gameView );

    //scene
    var scene = new sf.SpriteBatchNodeScene();
    var layer = cc.Layer.create();
    gameLayer.addChild( layer, 1000, 1 );
    scene.setSceneView( layer );
    entity.addComponent( scene, GameConst.scene );

    //armature scene
    var layer = cc.Layer.create();
    gameLayer.addChild( layer, 1001, 0 );
    var scene = new sf.ArmatureScene();
    scene.setSceneView( layer );
    entity.addComponent( scene, GameConst.armatureScene );

    //远景
//    var distantViewLayer = cc.Layer.create();
    var frontViewLayer = cc.SpriteBatchNode.create( s_mapitems_png, 1000 );
    frontViewLayer.setAnchorPoint( cc.p( 0, 0 ) );
    gameLayer.addChild( frontViewLayer, 10000, 2 );

    var scrollMapView = cc.SpriteBatchNode.create( s_mapitems_png, 1000 );
    scrollMapView.setAnchorPoint( cc.p( 0, 0 ) );
    gameLayer.addChild( scrollMapView, 0, 2 );


    //远景
    var distantView = new ScrollMapComponent( scrollMapView, Direction.HORIZONTAL );
    distantView.setOffset( -400 );
    distantView.setCellSize( 130 );
    distantView.setData( GameConst.getDistantData() );
    distantView.setVelocity( GameConst.MAP_VELOCITY * 0.1 );
    entity.addComponent( distantView, GameConst.distantView );


    //近景
    var frontView = new ScrollMapComponent( frontViewLayer, Direction.HORIZONTAL );
    frontView.setOffset( -400 );
    frontView.setCellSize( 400 );
    frontView.setData( GameConst.getFrontData() );
    frontView.setVelocity( GameConst.MAP_VELOCITY * 0.9 );
    entity.addComponent( frontView, GameConst.frontView );

    //战斗场景
    var scrollmap = new ScrollMapComponent( scrollMapView, Direction.HORIZONTAL );
    scrollmap.setOffset( -400 );
    scrollmap.setCellSize( 400 );
    scrollmap.setData( GameConst.getMapData() );
    scrollmap.setVelocity( GameConst.MAP_VELOCITY * 0.4 );
    entity.addComponent( scrollmap, GameConst.scrollMap );

    var scrollControl = new ScrollControlComponent();
    entity.addComponent( scrollControl, GameConst.scrollControl );


    //rowData
    var rowData = new sf.RowDataComponent();
    rowData.setOrigin( GameConst.ORIGIN );
    rowData.setCellSize( GameConst.CELL_SIZE );
    rowData.setCols( GameConst.numCols );
    rowData.setRows( GameConst.numRows );
    entity.addComponent( rowData, GameConst.rowData );

    //rowSpatial
    var rowSpatialManager = sf.RowSpatialManager.getInstance();
    rowSpatialManager.setup( rowData.getRows(), rowData.getCols() );
    entity.addComponent( rowSpatialManager, GameConst.rowSpatialManager );

//    var gameOver = new GameOverComponent();
//    var timeGenerator = new SingleNumberGenerator();
//    timeGenerator.setValue( 0.16 );
//    gameOver.setCooldownTime( timeGenerator );
//    entity.addComponent( gameOver, GameConst.gameOver );

    var drawGrid = new DrawGridComponent( gameLayer )
    entity.addComponent( drawGrid, GameConst.drawGrid );

    var levelInitialize = new LevelInitializeComponent();
    var timeGenerator = new CyclingGenerator();
    timeGenerator.setArray( [0.1, 2, 4] );
    levelInitialize.setCooldownTime( timeGenerator );
    entity.addComponent( levelInitialize, GameConst.levelInitialize );

    return entity;
}

//创建主角
EntityCreator.createSoldier = function()
{
    var soldier = SoldierCreator.createPlayer( SoldierCreator.createLancer() );
    var spatial = soldier.lookupComponent( GameConst.spatial );
    spatial.setRenderRow( 5 );
    spatial.setRenderCol( 0 );
    return soldier;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// 实体基类 ////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
EntityCreator.createEntity = function( name )
{
    var entity = sf.Entity.create( name );
    entity.retain();

    var entityBus = new SignalBus();
    entity.addComponent( entityBus, GameConst.entityBus );

    var spatial = new SimpleRowSpatialComponent();
    entity.addComponent( spatial, GameConst.spatial );

    var transform = new sf.RowTransformComponent();
    transform.setColOffset( 0 );
    transform.setRowOffset( 0 );
    entity.addComponent( transform, GameConst.transform );

    return entity;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// create entity by id /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

EntityCreator.createEntityById = function( entityId, object, owner, spawnOffsetX, spawnOffsetY )
{
    var spatial_ref = owner.lookupComponent( GameConst.spatial );
    if( spatial_ref )
    {
        object.renderCol = spatial_ref.getRenderCol() + spawnOffsetX;
        object.renderRow = spatial_ref.getRenderRow() + spawnOffsetY;
    }
//    var scrollMap = owner.lookupComponentByEntity( GameConst.scrollMap, GameConst.world );

    var teamId = owner.getTeamId();

    var entity = null;
    //spawn entity
    switch( entityId )
    {
        case GameConst.LANCE:
            entity = WeaponCreator.createLance();
            var spatial = entity.lookupComponent( GameConst.spatial );
            //设置子弹速度与方向
            if( object.hasOwnProperty( "velX" ) )
            {
                spatial.setVelX( object.velX );
            }
            if( spatial_ref.getOwner().getTeamId() == -1 )
            {
                spatial.setVelX( spatial.getVelX() * (-1) );
            }
            break;
        case GameConst.ARROW:
            entity = WeaponCreator.createArrow();
            var spatial = entity.lookupComponent( GameConst.spatial );
            //设置子弹速度与方向
            if( object.hasOwnProperty( "velX" ) )
            {
                spatial.setVelX( object.velX );
            }
            if( spatial_ref.getOwner().getTeamId() == -1 )
            {
                spatial.setVelX( spatial.getVelX() * (-1) );
            }
            break;
        default:

    }

    if( entity != null )
    {
        var spatial = entity.lookupComponent( GameConst.spatial );
        if( spatial != null )
        {
            spatial.setRenderRow( object.renderRow );
            spatial.setRenderCol( object.renderCol );
        }
        entity.setOwningGroup( owner.getOwningGroup() );
        entity.setTeamId( teamId );
        entity.initialize();
    }
    return entity;
};
