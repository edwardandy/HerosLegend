/**
 * Created by chenyonghua on 14-2-14.
 */
var ScrollControlComponent = sf.EntityComponent.extend( {
    _worldBus: null,
    _scrollMap:null,
    _velocity:0,
    ctor: function()
    {
        this._super();
    },
    onAdd: function()
    {
        this._super();
        this._worldBus = this.getOwner().lookupComponent( GameConst.worldBus );
        if(this._worldBus)
        {
            this._worldBus.getSignal( EntitySignals.STOP_SCROLL_MAP ).add( this.stopScroll, this );
            this._worldBus.getSignal( EntitySignals.RESUME_SCROLL_MAP ).add( this.resumeScroll, this );
        }

        this._scrollMap = this.getOwner().lookupComponent(GameConst.scrollMap);
    },
    onRemove: function()
    {
        if(this._worldBus)
        {
            this._worldBus.getSignal( EntitySignals.STOP_SCROLL_MAP ).remove( this.stopScroll, this );
            this._worldBus.getSignal( EntitySignals.RESUME_SCROLL_MAP ).remove( this.resumeScroll, this );
        }
        this._worldBus = null;
        this._scrollMap = null;
        this._super();
    },
    stopScroll: function()
    {
        if(this._scrollMap.isRunning())
        {
            this._velocity = this._scrollMap.getVelocity();
            this._scrollMap.setVelocity(0);
            this._scrollMap.stop();
        }
    },
    resumeScroll: function()
    {
        if(!this._scrollMap.isRunning())
        {
            this._scrollMap.setVelocity(this._velocity);
            this._scrollMap.resume();
        }
    }
} )
