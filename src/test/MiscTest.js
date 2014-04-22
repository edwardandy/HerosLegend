/**
 * Created by chenyonghua on 13-11-29.
 */
var MiscTest = cc.Scene.extend( {
    rootGroup: null,
    gameLayer: null,
    ctor: function()
    {
        this._super();

        this.setup();
        for( var i = 0; i < 1; i++ )
        {
            this.mock();
        }
        for( var i = 0; i < 100; i++ )
        {
//            this.mockSpriteBatchEntity();
        }
    },
    setup: function()
    {
        //TODO 开始加载素材
        cc.SpriteFrameCache.getInstance().addSpriteFrames( s_mapitems_plist );
        cc.SpriteFrameCache.getInstance().addSpriteFrames( s_battle_plist );
        cc.SpriteFrameCache.getInstance().addSpriteFrames( s_death_plist );

        AnimationDataCache.getInstance().addAnimationsWithFile( s_battle_json );
        AnimationDataCache.getInstance().addAnimationsWithFile( s_death_json );

        ccs.ArmatureDataManager.getInstance().addArmatureFileInfo( s_self_png, s_self_plist, s_self_xml );
        ccs.ArmatureDataManager.getInstance().addArmatureFileInfo( s_enemy_png, s_enemy_plist, s_enemy_xml );

        this.gameLayer = new GameLayer();
        this.gameLayer.init( cc.c4b( 188, 200, 118, 225 ) );
        this.gameLayer.setContentSize( cc.Director.getInstance().getWinSize() );
        this.gameLayer.setAnchorPoint( cc.p( 0, 0 ) );
        this.gameLayer.ignoreAnchorPointForPosition( false );
        this.addChild( this.gameLayer );

        this.rootGroup = sf.SmashGroup.create( "root" );
        this.rootGroup.retain();

        var world = this.createWorld();
        world.setOwningGroup( this.rootGroup );
        world.initialize();
    },
    createWorld: function()
    {
        var entity = sf.Entity.create( GameConst.world );
        entity.retain();

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

        //armature scene
        var layer = cc.Layer.create();
        this.gameLayer.addChild( layer );
        var scene = new sf.ArmatureScene();
        scene.setSceneView( layer );
        entity.addComponent( scene, GameConst.armatureScene );


        var scene = new sf.SpriteBatchNodeScene();
        scene.setBatchNodeZOrder( s_battle_png, 1000 );
        scene.setBatchNodeZOrder( s_death_png, 0 );
//    var scene = new sf.DisplayObjectScene();
        var layer = cc.Layer.create();
        this.gameLayer.addChild( layer, 1000, 0 );
        scene.setSceneView( layer );
        entity.addComponent( scene, GameConst.scene );

        return entity;
    },
    mock: function()
    {
        var entity = sf.Entity.create( "test" );
        entity.retain();
        var spatial = new SimpleRowSpatialComponent();
        spatial.setRenderRow( Math.random() * 10 );
        spatial.setRenderCol( Math.random() * 10 );
        entity.addComponent( spatial, GameConst.spatial );

        var render = new SimpleArmatureRenderer();
        render.init( "SoldierSkeleton" );
        render.queue(["walk","attack","die"],0);
        render.changeSkin("weapon","MachineGun.png");
        render.changeSkin("head","Sniper.png");
        entity.addComponent( render, GameConst.render );

        var transform = new sf.RowTransformComponent();
        transform.setColOffset( 0 );
        transform.setRowOffset( 0 );
        entity.addComponent( transform, GameConst.transform );

        entity.setOwningGroup( this.rootGroup );
        entity.initialize();
    },
    mockSpriteBatchEntity:function()
    {
        var entity = sf.Entity.create( "test" );
        entity.retain();
        var spatial = new SimpleRowSpatialComponent();
        spatial.setRenderRow( Math.random() * 10 );
        spatial.setRenderCol( Math.random() * 10 );
        entity.addComponent( spatial, GameConst.spatial );

        var animation = new AnimationRenderer();
        animation.setFPS( 35 );
        animation.queue( GameConst.ANI_ROCKETEER, true );
        entity.addComponent( animation, GameConst.render );

        var transform = new sf.RowTransformComponent();
        transform.setColOffset( 0 );
        transform.setRowOffset( 0 );
        entity.addComponent( transform, GameConst.transform );

        entity.setOwningGroup( this.rootGroup );
        entity.initialize();

    }

} );