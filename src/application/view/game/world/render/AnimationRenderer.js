/**
 * Created by chenyonghua on 13-12-16.
 */
var AnimationRenderer = sf.SpriteBatchNodeRenderer.extend( {
    _fps: 30,
    _currentFrame: 0,
    _isLooping: true,
    _animationName: null,
    _spriteFrames: null,
    _sprite: null,
    _isRunning: false,
    _curFrameTime: 0,
    _entityBus: null,
    _signalDict: null,
    _animationQueue: null,
    ctor: function()
    {
        this._super();
        this._spriteFrames = null;
        this._signalDict = {};
        this._sprite = null;
        this._animationQueue = [];
    },
    onAdd: function()
    {
        this._super();
        this._isRunning = true;
        this._entityBus = this.getOwner().lookupComponent( GameConst.entityBus );
    },
    onRemove: function()
    {
        this._isRunning = false;
        this._sprite = null;
        this._entityBus = null;
        this._super();
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
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////  animation control  ////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setFPS: function( value )
    {
        this._fps = value;
    },
    getFPS: function()
    {
        return this._fps;
    },
    getAnimationName: function()
    {
        return this._animationName;
    },
    clearQueue: function()
    {
        this._isLooping = false;
        this._animationName = null;
        this._spriteFrames = null;
        this._currentFrame = 0;
        this._animationQueue.length = 0;
    },
    queue: function( name, islooping )
    {
        this.clearQueue();
        this._animationQueue.push( {"animationName": name, "looping": islooping} );
    },
    startNextAnim: function()
    {
        if( this._animationQueue.length == 0 )
        {
            this._isRunning = false;
            return;
        }
        var object = this._animationQueue.shift();
        var looping = object.looping;
        if(this._animationQueue.length == 0)
        {
            looping = true;
        }
        this.playAnimation( object.animationName, looping );
        this.gotoAndPlay( 0 );
    },
    playAnimation: function( name, looping )
    {
        this._animationName = name;
        this._isLooping = looping == undefined ? true : looping;
        var animationData = AnimationDataCache.getInstance().getAnimation( this._animationName );
        this.setTextureFileName( animationData.textureFileName );
        if( animationData == null )
        {
            cc.log( "animationData " + name + " doesn't exist" );
            this._isRunning = false;
            return;
        }
        this._spriteFrames = animationData.spriteFrames;
        if( this._spriteFrames != null && this._spriteFrames.length > 0 )
        {
            var spriteFrame = this._spriteFrames[0];
            this._sprite = cc.Sprite.createWithSpriteFrame( spriteFrame );
            this._sprite.setAnchorPoint( cc.p( 0.5, 0 ) );
            this.setSprite( this._sprite );
            var pointX = GameConst.CELL_SIZE.x / 2 - spriteFrame.getOriginalSize().width / 2;
            var pointY = 0;
            this.setOffsetPosition( cc.p( pointX, pointY ) );
        }
        else
        {
            cc.log( "this._spriteFrames error" );
        }
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////  frame control  ////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getCurrentFrame: function()
    {
        return this._currentFrame;
    },
    getTotalFrame: function()
    {
        if( this._spriteFrames != null )
        {
            return this._spriteFrames.length;
        }
        return 1;
    },
    play: function()
    {
        this._isRunning = true;
    },
    stop: function()
    {
        this._isRunning = false;
    },
    gotoAndStop: function( frame )
    {
        this._isRunning = false;
        if( frame >= 0 && frame < this.totalFrames )
        {
            this._currentFrame = frame;
        }
        this.updateFrame()
    },
    gotoAndPlay: function( frame )
    {
        if( frame >= 0 && frame < this.totalFrames )
        {
            this._currentFrame = frame;
        }
        this._isRunning = true;
    },
    onFrame: function( dt )
    {
        this._curFrameTime -= dt;
        if( !this._isRunning )
        {
            return;
        }
        if( null == this._animationName )
        {
            this.startNextAnim();
        }
        while( this._curFrameTime <= 0.0001 ) //TODO: should this be proportional to frame length (1 / fps)?
        {
            this._curFrameTime += 1 / this._fps;
            this.updateFrame();
        }
    },
    updateFrame: function()
    {
        if( this._sprite != null && this._spriteFrames && this._spriteFrames[this._currentFrame] )
        {
            this._sprite.setDisplayFrame( this._spriteFrames[this._currentFrame] );
        }
        if( this._entityBus )
        {
            this._entityBus.getSignal( EntitySignals.ENTER_FRAME ).dispatch( this._currentFrame );
            if( this._signalDict[this._animationName] && this._signalDict[this._animationName][this._currentFrame] != null )
            {
                this._entityBus.getSignal( this._signalDict[this._animationName][this._currentFrame].signal ).dispatch();
                if( this._signalDict[this._animationName][this._currentFrame].once == true )
                {
                    this.removeFrameSignal( this._animationName, this._currentFrame );
                }
            }
        }
        this._currentFrame++;
        if( this._currentFrame >= this.getTotalFrame() - 1 )
        {
            if( this._entityBus )
            {
                this._entityBus.getSignal( EntitySignals.ANIMATION_COMPLETE ).dispatch( this );
            }
            if( this._isLooping )
            {
                this._currentFrame = 0;
            }
            else
            {
                this.startNextAnim();
            }
        }
    }
} );