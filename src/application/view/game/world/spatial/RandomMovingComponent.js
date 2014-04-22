/**
 * Created by chenyonghua on 14-2-21.
 */
var RandomMovingComponent = sf.EntityComponent.extend({
    rowGenerator:null,
    colGenerator:null,
    velocity:0.5,
    _targetCol:0,
    _targetRow:0,

    _spatial:null,
    _seeking:null,
    _signalBus:null,
    ctor:function()
    {
        this._super();
    },
    onAdd:function()
    {
        this._spatial = this.getOwner().lookupComponent(GameConst.spatial);
        this._signalBus = this.getOwner().lookupComponent( GameConst.entityBus );
        this._seeking = this.getOwner().lookupComponent("seeking");
        this.moveTo();
        this._signalBus.getSignal( EntitySignals.ARRIVE ).add(this.moveTo,this);
    },
    onRemove:function()
    {
        this._spatial = null;
        this._seeking = null;
        this._signalBus.getSignal( EntitySignals.ARRIVE ).remove(this.moveTo,this);
    },
    moveTo:function()
    {
        if(this._seeking)
        {
            this._seeking.seek(this.colGenerator.getNextValue(),this.rowGenerator.getNextValue());
        }
    }
})