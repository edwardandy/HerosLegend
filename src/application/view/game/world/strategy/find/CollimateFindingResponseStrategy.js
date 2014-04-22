/**
 * Created by chenyonghua on 14-2-27.
 */
var CollimateFindingResponseStrategy = DealFindingResponseStrategy.extend( {
    _drawNode: null,
    _gameView:null,
    _rowData:null,
    _spatial:null,
    _rowTransform:null,
    ctor: function()
    {
        this._super();
    },
    dealFinding: function( spatialComponent )
    {
        this.drawLine(spatialComponent);
        return this._super();
    },
    onAdd:function()
    {
        this._gameView = this.getOwner().lookupComponentByEntity(GameConst.gameView,GameConst.world);
        this._rowData = this.getOwner().lookupComponentByEntity( GameConst.rowData, GameConst.world );
        this._spatial = this.getOwner().lookupComponent(GameConst.spatial);
        this._rowTransform = this.getOwner().lookupComponent(GameConst.transform);
        if( this._drawNode == null )
        {
            this._drawNode = cc.DrawNode.create();
            this._drawNode.retain();
            this._drawNode.setPosition( this._rowData.getOrigin() );
            this._gameView.getView().addChild( this._drawNode );
        }
    },
    onRemove:function()
    {
        if( this._drawNode != null )
        {
            this._drawNode.removeFromParent(true);
        }
    },
    drawLine:function(spatialComponent)
    {

        this._drawNode.clear();
        var startP = this._rowTransform.getRenderPosition();
        var target = spatialComponent.getOwner().lookupComponent(GameConst.transform).getRenderPosition();
        this._drawNode.drawSegment( startP,target, 3, cc.c4f(225, 0, 0, 1) );
    }
} )