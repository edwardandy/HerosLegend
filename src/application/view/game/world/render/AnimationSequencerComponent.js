/**
 * Created by chenyonghua on 14-1-7.
 */
var AnimationSequencerComponent = sf.EntityComponent.extend( {
    _signalMap: null,
    _renderer: null,
    _signalBus: null,
    _defaultAnimation: null,
    _callbacks:null,
    ctor: function()
    {
        this._super();
        this._signalMap = {};
        this._callbacks = {};
    },
    setDefaultAnimation: function( animationObject )
    {
        this._defaultAnimation = animationObject;
    },
    //[{"id":"move1", "looping":false},{"id":"idle", "looping":true}]
    addAnimationWithSignal: function( signaldesc, animationObject )
    {
        this._signalMap[signaldesc.getId()] = {"signalDesc": signaldesc, "animationObject": animationObject};
    },
    onAdd: function()
    {
        this._renderer = this.getOwner().lookupComponent( GameConst.render );
        this._signalBus = this.getOwner().lookupComponent( GameConst.entityBus );
        for( var key in this._signalMap )
        {
            var object = this._signalMap[key];
            this._signalBus.getSignal( object.signalDesc ).add( this.getHandlerFunction( key ), this );
        }
        if( null != this._defaultAnimation )
        {
            this.parseAnimString( this._defaultAnimation );
        }

    },
    getHandlerFunction: function( id )
    {
        if(this._callbacks[id] == null)
        {
            this._callbacks[id] = function( params ){ this.handleSignal( id );}
        }
        return this._callbacks[id];
    },
    handleSignal: function( signalId )
    {
        if( signalId in this._signalMap )
        {
            this.parseAnimString( this._signalMap[signalId].animationObject );
        }
    },
    onRemove: function()
    {
        for( var key in this._signalMap )
        {
            var object = this._signalMap[key];
            this._signalBus.getSignal( object.signalDesc ).remove( this.getHandlerFunction( key ), this );
        }
        this._signalMap = null;
        this._signalBus = null;
        this._renderer = null;
    },
    parseAnimString: function( animationObject )
    {
        if( this._renderer == null || this._renderer.getOwner() == null)
        {
            cc.log( "[AnimationSequencerComponent] _renderer is null" );
            return;
        }
        var health = this._renderer.getOwner().lookupComponent(GameConst.health);
        if(health && health.getHealth() <= 0)
        {
            return;
        }
        try
        {
            var actions = [];
            var looping = false;
            if( "actions" in animationObject )
            {
                actions = animationObject["actions"];
            }
            if( "looping" in animationObject )
            {
                looping = animationObject["looping"];
            }
//            cc.log(actions instanceof Array);
//            cc.log(actions);
//            cc.log("[AnimationSequencerComponent] actions:"+actions)
            this._renderer.queue( actions.concat(), looping );
        }
        catch( e )
        {
            cc.log( "[AnimationSequencerComponent] parseAnimString error" );
        }
    }
} )