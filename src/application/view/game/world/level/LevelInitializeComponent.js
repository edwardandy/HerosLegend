/**
 * Created by chenyonghua on 13-11-21.
 */
var LevelInitializeComponent = RepeatingThinkingComponent.extend( {
    rowData: null,
    scrollMap: null,
    ctor: function()
    {
        this._super();
    },
    onAdd: function()
    {
        this.rowData = this.getOwner().lookupComponentByEntity( GameConst.rowData, GameConst.world );
        this.scrollMap = this.getOwner().lookupComponentByEntity( GameConst.scrollMap, GameConst.world );

        this._super();


        var soldier = EntityCreator.createSoldier();
        soldier.setOwningGroup( this.getOwner().getOwningGroup() );
        soldier.initialize();

//        for( var j = 0; j < 2; j++ )
//        {
//            var soldier = SoldierCreator.createFollower( SoldierCreator.createLancer() );
//            soldier.setOwningGroup( this.getOwner().getOwningGroup() );
//            soldier.initialize();
//        }
    },
    onRemove: function()
    {
        this._super();
        this.rowData = null;
    },
    onThink: function()
    {
        this._super();
    }
} );