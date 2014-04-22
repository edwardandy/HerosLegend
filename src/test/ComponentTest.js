/**
 * Created by chenyonghua on 14-2-25.
 */
var ComponentTest  = cc.Scene.extend( {
    rootGroup: null,
    gameLayer: null,
    ctor: function()
    {
        this._super();
        this.setup();
        this.test();
    },
    setup: function()
    {
        ccs.ArmatureDataManager.getInstance().addArmatureFileInfo( s_skeleton_png, s_skeleton_plist, s_self_xml );
        ccs.ArmatureDataManager.getInstance().addArmatureFileInfo( s_skeleton_png, s_skeleton_plist, s_enemy_xml );

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

        //scene
        var layer = cc.Layer.create();
        this.gameLayer.addChild( layer );
        var scene = new sf.ArmatureScene();
        scene.setSceneView( layer );
        entity.addComponent( scene, GameConst.scene );

        var drawGrid = new DrawGridComponent( this.gameLayer )
        entity.addComponent( drawGrid, "drawGrid" );

        return entity;
    },
    test:function()
    {

    }
});