/**
 * Created by chenyonghua on 14-2-16.
 */
var WorldObserverComponent = sf.EntityComponent.extend({
    _worldBus:null,
    _spatial:null,
    _scrollMap:null,
    ctor:function()
    {
        this._super();
    },
    onAdd: function()
    {
        this._worldBus = this.getOwner().lookupComponentByEntity(GameConst.worldBus,GameConst.world);
        this._scrollMap = this.getOwner().lookupComponentByEntity(GameConst.scrollMap,GameConst.world);
        this._spatial = this.getOwner().lookupComponent(GameConst.spatial);
        if(this._worldBus)
        {
            this._worldBus.getSignal( EntitySignals.UPDATE_MAP_VELOCITY ).add(this.updateMapVelocity,this);
        }
    },
    onRemove: function()
    {
        if(this._worldBus)
        {
            this._worldBus.getSignal( EntitySignals.UPDATE_MAP_VELOCITY ).remove(this.updateMapVelocity,this);
        }
        this._worldBus = null;
        this._spatial  = null;
    },
    updateMapVelocity:function(divide)
    {
        this._spatial.setVelY(this._spatial.getVelY() - divide);
    }
})