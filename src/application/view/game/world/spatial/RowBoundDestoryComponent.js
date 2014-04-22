/**
 * Created by chenyonghua on 13-11-28.
 */
var RowBoundDestoryComponent = RepeatingThinkingComponent.extend( {
    colOffset: 0,
    rowOffset: 0,
    rowData: null,
    ctor: function()
    {
        this._super();
        this.rowOffset = 0;
    },
    onAdd: function()
    {
        this.rowData = this.getOwner().lookupComponentByEntity( GameConst.rowData, GameConst.world );
        this._super();
    },
    onRemove: function()
    {
        this._super();
        this.rowData = null;
    },
    onThink: function()
    {
        this._super();
        var spatial = this.getOwner().lookupComponent(GameConst.spatial);
        if(this.checkInBound(spatial.getRow(),spatial.getCol()) == false)
        {
            if(this.getOwner())
            {
                this.getOwner().destory();
            }
        }
    },
    checkInBound: function( row, col )
    {
        return !(col < 0 || (col >= (this.rowData.getCols() + this.colOffset)) || row < 0 || (row >= (this.rowData.getRows() + this.rowOffset)));
    }
} );