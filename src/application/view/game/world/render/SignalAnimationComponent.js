/**
 * Created by chenyonghua on 14-3-8.
 */
var SignalAnimationComponent = sf.EntityComponent.extend( {
    _signalBus:null,
    _signalDescriptor:null,
    _spatial:null,
    ctor:function()
    {
        this._super();
    },
    setSignalDescriptor:function(signalDesc)
    {
        this._signalDescriptor = signalDesc;
    },
    onAdd:function()
    {
        this._signalBus = this.getOwner().lookupComponent( GameConst.entityBus );
        this._spatial = this.getOwner().lookupComponent( GameConst.spatial );
        this._signalBus.getSignal( this._signalDescriptor ).add(this.onSignal,this);
    },
    onRemove:function()
    {
        this._signalBus.getSignal( this._signalDescriptor ).remove(this.onSignal,this);
        this._signalBus = null;
    },
    onSignal:function(thisSpatial)
    {
        if(!thisSpatial)
        {
            return;
        }
        var targetCol = thisSpatial.getRenderCol();
        var targetRow = thisSpatial.getRenderRow();
        var angle = cc.pToAngle( cc.p( targetCol - this._spatial.getRenderCol(), targetRow - this._spatial.getRenderRow() ) ) * 180 / Math.PI;
        var tagId = 10 - Math.ceil(Math.abs(angle) / 20);
        var render = this.getOwner().lookupComponent(GameConst.render);
        var isPlaying = render.isPlaying();
        render.queue( "tag"+tagId, 1 );
        if(!isPlaying)
        {
            render.getArmatureAnimation().stop();
        }
    }
})