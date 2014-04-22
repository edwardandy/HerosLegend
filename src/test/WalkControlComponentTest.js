/**
 * Created by chenyonghua on 14-2-25.
 */
var WalkControlComponentTest = ComponentTest.extend( {
    ctor: function()
    {
        this._super();
    },
    setup: function()
    {
        this._super();
    },
    createWorld: function()
    {
        return this._super();
    },
    createBlock: function( col )
    {
        var entity = sf.Entity.create( "test" );
        entity.retain();
        var spatial = new SimpleRowSpatialComponent();
        spatial.setRenderRow( 5 );
        spatial.setRenderCol( col );
        spatial.setObjectType( sf.ObjectType.create( GameConst.STATIC_ITEM ) );
        entity.addComponent( spatial, GameConst.spatial );

        var render = new SimpleArmatureRenderer();
        render.init( "SoldierSkeleton" );
        render.setSpeedScale( 0.7 );
        render.getArmatureAnimation().playWithNames( ["walk"] );
        entity.addComponent( render, GameConst.render );

        var boundCheck = new RowBoundDestoryComponent();
        boundCheck.rowOffset = 5;
        var timeGenerator = new SingleNumberGenerator();
        timeGenerator.setValue( 0.1 );
        boundCheck.setCooldownTime( timeGenerator );
        entity.addComponent( boundCheck, "rowBoundCheck" );

        var transform = new sf.RowTransformComponent();
        transform.setColOffset( 0 );
        transform.setRowOffset( 0 );
        entity.addComponent( transform, GameConst.transform );

        entity.setOwningGroup( this.rootGroup );
        entity.initialize();
        return entity;
    },
    createEntity: function()
    {
        var entity = sf.Entity.create( "test" );
        entity.retain();
        var spatial = new SimpleRowSpatialComponent();
        spatial.setRenderRow( 7 );
        spatial.setRenderCol( 5 );
        spatial.setVelY( -0.03 );
        spatial.setObjectType( sf.ObjectType.create( GameConst.BATTLE_ITEM ) );
        entity.addComponent( spatial, GameConst.spatial );

        var walk = new WalkControlComponent();
        entity.addComponent( walk, "walk" );

        var render = new SimpleArmatureRenderer();
        render.init( "SoldierSkeleton" );
        render.setSpeedScale( 0.7 );
        render.getArmatureAnimation().playWithNames( ["walk"] );
        entity.addComponent( render, GameConst.render );

        var transform = new sf.RowTransformComponent();
        transform.setColOffset( 0 );
        transform.setRowOffset( 0 );
        entity.addComponent( transform, GameConst.transform );

        entity.setOwningGroup( this.rootGroup );
        entity.initialize();
    },
    test: function()
    {
        for( var i = 0; i < GameConst.numCols; i++ )
        {
            if(i != 50 && i!=70)
            {
                var entity = this.createBlock( i );
            }
//            if( i == 7 )
//            {
//                var spatial = entity.lookupComponent( GameConst.spatial );
//                spatial.setVelY( -0.03 );
//            }
        }
        this.createEntity();
    }
} )