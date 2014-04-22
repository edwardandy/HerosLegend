/**
 * Created by chenyonghua on 13-12-15.
 */
var BoundCheckComponent = sf.TickedComponent.extend( {
    colOffsetLeft: 0,
    colOffsetRight: 0,
    rowOffsetTop: 0,
    rowOffsetBottom: 0,
    rowData: null,
    _ignore:false,
    ctor: function()
    {
        this._super();
        this.colOffsetLeft = 0;
        this.colOffsetRight = 0;
        this.rowOffsetTop = 0;
        this.rowOffsetBottom = 0;
    },
    setIgnore:function(value)
    {
        this._ignore = value;
    },
    onAdd: function()
    {
        this.rowData = this.getOwner().lookupComponentByEntity( GameConst.rowData, GameConst.world );
        this._super();
    },
    onRemove: function()
    {
        this.rowData = null;
        this._super();
    },
    onTick: function( dt )
    {
        this._super();
        if(this.rowData == null || this._ignore == true)
        {
            return;
        }
        var spatial = this.getOwner().lookupComponent( GameConst.spatial );
        if(spatial.getRenderCol() < -this.colOffsetLeft)
        {
            spatial.setRenderCol(-this.colOffsetLeft);
        }
        else if(spatial.getRenderCol() >= (this.rowData.getCols() - 1 + this.colOffsetRight))
        {
            spatial.setRenderCol(this.rowData.getCols() - 1 + this.colOffsetRight);
        }

        if(spatial.getRenderRow() < -this.rowOffsetTop)
        {
            spatial.setRenderRow(-this.rowOffsetTop);
        }
        else if(spatial.getRenderRow() >= (this.rowData.getRows() - 1 + this.rowOffsetBottom))
        {
            spatial.setRenderRow(this.rowData.getRows() - 1 + this.rowOffsetBottom);
        }
    }
} );