/**
 * Created by chenyonghua on 13-12-5.
 */
var SimpleArmatureRenderer = sf.ArmatureRenderer.extend( {
    _entityBus: null,
    _signalDict: null,

    _movementList:null,
    _speedScale:1,
    _looping:false,
    ctor: function()
    {
        this._super();
        this._signalDict = {};
    },
    onAdd: function()
    {
        this._super();
        this._entityBus = this.getOwner().lookupComponent( GameConst.entityBus );
    },
    onRemove: function()
    {
        this._entityBus = null;
        this._super();
    },
    setSpeedScale:function(value)
    {
        this._speedScale = value;
    },
    addFrameSignal: function( actionName, frame, signalDesc, once )
    {
        if( this._signalDict[actionName] == null )
        {
            this._signalDict[actionName] = {};
        }
        this._signalDict[actionName][frame] = {"signal": signalDesc, "once": once};
    },
    removeFrameSignal: function( actionName, frame )
    {
        if( this._signalDict[actionName] && this._signalDict[actionName][frame] != null )
        {
            delete this._signalDict[actionName][frame];
        }
    },
    queue: function( actions, isLooping )
    {
//        cc.log("actions:"+actions);
        this._movementList = [];
        if( !(actions instanceof Array) )
        {
            this._movementList.push( actions );
        }
        else
        {
            this._movementList = actions;
        }
        this._looping = isLooping;
        this.getArmatureAnimation().playWithNames( this._movementList, 0, this._looping );
        this.getArmatureAnimation().setSpeedScale(this._speedScale);
        this.getArmatureAnimation().setMovementEventCallFunc( this.onMovementCall, this );
    },
    onMovementCall: function( armature, movementType, movementID )
    {
        if(ccs.MovementEventType.complete != movementType)
        {
            return;
        }
        if(!this._looping)
        {
            if(this._movementList.length == 1)
            {
                this._looping = 1;
            }
            if(this._movementList.length > 1)
            {
                this._movementList.shift();
            }
            this.getArmatureAnimation().playWithNames( this._movementList, 0, this._looping );
        }
        if(this._entityBus)
        {
            this._entityBus.getSignal( EntitySignals.ANIMATION_COMPLETE ).dispatch( this );
        }
    },
    lastFrame:0,
    onFrame:function()
    {
        if( this._entityBus )
        {
            this._entityBus.getSignal( EntitySignals.ENTER_FRAME ).dispatch( this.getCurrentFrame() );
            if( this._signalDict[this.getAnimationName()] )
            {
                var object = this._signalDict[this.getAnimationName()];
                for(var frame in object)
                {
                    if(this.getCurrentFrame() >= frame && frame > this.lastFrame)
                    {
                        this._entityBus.getSignal( object[frame].signal ).dispatch();
                        if( object[frame].once == true )
                        {
                            this.removeFrameSignal( this.getAnimationName(), frame );
                        }
                    }
                }
            }
        }
        this.lastFrame = this.getCurrentFrame();
    }
} );