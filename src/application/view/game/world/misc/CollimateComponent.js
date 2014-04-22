/**
 * Created by chenyonghua on 14-2-27.
 */
var CollimateComponent = ThinkingComponent.extend( {
    _drawNode: null,
    _gameView: null,
    _rowData: null,
    _spatial: null,
    _entityBus: null,
    _rowTransform: null,

    _signalDescriptor: null,
    _targetRow: -1,
    _targetCol: -1,
    ctor: function()
    {
        this._super();
    },
    setSignalDescriptor: function( value )
    {
        this._signalDescriptor = value;
    },
    onAdd: function()
    {
        this._super();
        this._gameView = this.getOwner().lookupComponentByEntity( GameConst.gameView, GameConst.world );
        this._rowData = this.getOwner().lookupComponentByEntity( GameConst.rowData, GameConst.world );
        this._spatial = this.getOwner().lookupComponent( GameConst.spatial );
        this._rowTransform = this.getOwner().lookupComponent( GameConst.transform );

        if( this._signalDescriptor )
        {
            this._entityBus = this.getOwner().lookupComponent( GameConst.entityBus );
            this._entityBus.getSignal( this._signalDescriptor ).add( this.onSignal, this );
        }

        if( this._drawNode == null )
        {
            this._drawNode = cc.DrawNode.create();
            this._drawNode.setPosition( this._rowData.getOrigin() );
            this._gameView.getView().addChild( this._drawNode );
        }
        this.stop();
    },
    onRemove: function()
    {
        this._super();
        if( this._drawNode != null && this._drawNode.getParent())
        {
            this._drawNode.removeFromParent( true );
        }
        if( this._signalDescriptor && this._entityBus )
        {
            this._entityBus.getSignal( this._signalDescriptor ).remove( this.onSignal, this );
        }
    },
    onSignal: function( spatialComponent )
    {
        if( this.isRunning() )
        {
            return;
        }
        this._targetCol = spatialComponent.getRenderCol();
        this._targetRow = spatialComponent.getRenderRow();
    },
    drawLine: function()
    {
        this._drawNode.clear();
        if( this._targetCol != -1 && this._targetRow != -1 )
        {
            var startP = this._rowTransform.getRenderPosition();
            var target = this._rowData.localToGlobal( cc.p( this._targetCol,this._targetRow ));
            this._drawNode.drawSegment( startP, target, 1, cc.c4b( 255, 0, 0, 1 ) );
            this.reset();
        }
        else
        {
            this.stop();
        }
    },
    onTick: function()
    {
        this._super();
        this.drawLine();
    },
    onThink: function()
    {
        this.stop();
        if( this._entityBus )
        {
            this._entityBus.getSignal( EntitySignals.STARTING_SHOOT ).dispatch( null, this._targetCol, this._targetRow );
        }
    }
} )