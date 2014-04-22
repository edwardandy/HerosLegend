/**
 * Created by chenyonghua on 13-12-3.
 */
var TouchCollectComponent = sf.EntityComponent.extend( {
    _signalBus: null,
    _rowData: null,
    _health:null,
    ctor: function()
    {
        this._super();
    },
    onAdd: function()
    {
        this._signalBus = this.getOwner().lookupComponentByEntity( GameConst.worldBus, GameConst.world );
        this._rowData = this.getOwner().lookupComponentByEntity( GameConst.rowData, GameConst.world );
        this._health = this.getOwner().lookupComponent( GameConst.health );
        this._signalBus.getSignal( EntitySignals.TOUCH_MOVED ).add( this.onMoved, this, 1000 );
    },
    onRemove: function()
    {
        this._signalBus.getSignal( EntitySignals.TOUCH_MOVED ).remove( this.onMoved, this );
        this._signalBus = null;
        this._rowData = null;
    },
    onMoved: function( touch )
    {
        if(this._health.isDead())
        {
            return;
        }
        var render = this.getOwner().lookupComponent( GameConst.render );
        var spatial = this.getOwner().lookupComponent( GameConst.spatial );
        var orginalPosition = this._rowData.localToGlobal( cc.p( spatial.getRenderCol(), -spatial.getRenderRow() ) );

        var delta = touch.getDelta();
        var diff = cc.pAdd( delta, orginalPosition );

        var p = this._rowData.globalToLocal( diff );
        spatial.setRenderCol( p.x );
        spatial.setRenderRow( p.y );
    }
} );