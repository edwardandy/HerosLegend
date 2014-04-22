/**
 * Created by chenyonghua on 13-11-21.
 */
var Game = cc.Layer.extend( {
    rootGroup: null,
    worldBus: null,
    gameLayer: null,
    ctor: function()
    {
        this._super();

        //TODO 开始加载素材
        cc.SpriteFrameCache.getInstance().addSpriteFrames( s_mapitems_plist );
        cc.SpriteFrameCache.getInstance().addSpriteFrames( s_animation_plist );

        ccs.ArmatureDataManager.getInstance().addArmatureFileInfo( s_skeleton_png, s_skeleton_plist, s_skeleton_xml );

        this.initialize();
    },
    initialize: function()
    {
        AnimationDataCache.getInstance().addAnimationsWithFile( s_animation_json );
        this.gameLayer = new GameLayer();
        this.gameLayer.init( cc.c4b( 95, 224, 115, 225 ) );
        this.gameLayer.setContentSize( cc.Director.getInstance().getWinSize() );
        this.gameLayer.setAnchorPoint( cc.p( 0, 0 ) );
        this.gameLayer.ignoreAnchorPointForPosition( false );
        this.addChild( this.gameLayer );

        this.startGame();
    },
    clearGame: function()
    {
        if( this.rootGroup )
        {
            this.rootGroup.destory();
            //强制GC
            forceGC();
        }
        this.rootGroup = null;
        this.worldBus = null;

        sf.ProcessManager.getInstance().stop();
    },
    startGame: function( )
    {
        this.clearGame();
        this.rootGroup = sf.SmashGroup.create( "root" );
        this.rootGroup.retain();

        var world = EntityCreator.createWorld( this.gameLayer );
        this.worldBus = world.lookupComponent( GameConst.worldBus )
        this.worldBus.getSignal( EntitySignals.GAME_OVER ).add( this.gameOver, this );
        this.gameLayer.setSignalbus( this.worldBus );
        world.setOwningGroup( this.rootGroup );
        world.initialize();

//        var soldier = EntityCreator.createSoldier();
//        soldier.setOwningGroup( this.rootGroup );
//        soldier.initialize();

        sf.ProcessManager.getInstance().start();
    },
    pauseGame: function()
    {
        sf.ProcessManager.getInstance().stop();
    },
    continueGame: function()
    {
        sf.ProcessManager.getInstance().start();
    },
    gameOver: function( object )
    {
        sf.ProcessManager.getInstance().stop();
        this.worldBus.getSignal( EntitySignals.GAME_OVER ).remove( this.gameOver, this );
    }
} );
var GameLayer = cc.LayerColor.extend( {
    _signalBus: null,
    ctor: function()
    {
        this._super();

        var sky = cc.Sprite.create("gameres/sky.png");
        sky.ignoreAnchorPointForPosition(true);
        var winSize = cc.Director.getInstance().getWinSize();
        sky.setPositionY(winSize.height - sky.getContentSize().height);
        this.addChild(sky);

        var sprite = cc.Sprite.create("gameres/ground.png");
        sprite.ignoreAnchorPointForPosition(true);
        this.addChild(sprite);
    },
    setSignalbus: function( value )
    {
        this._signalBus = value;
        this.setTouchEnabled( true );
        this.setTouchMode( cc.TOUCH_ONE_BY_ONE );
    },
    onTouchBegan: function( touch, event )
    {
        if( !this.containsTouchLocation( touch ) )
        {
            return false;
        }
        return true;
    },
    onTouchMoved: function( touch, event )
    {
        if( this._signalBus )
        {
            this._signalBus.getSignal( EntitySignals.TOUCH_MOVED ).dispatch( touch );
        }
    },
    onTouchEnded: function( touch, event )
    {
    },
    onTouchCancelled: function( touch, event )
    {
    },
    containsTouchLocation: function( touch )
    {
        var touchLocation = touch.getLocation(); // Get the touch position
        touchLocation = this.getParent().convertToNodeSpace( touchLocation );
        var bBox = this.getBoundingBox();
        bBox.x = this.getPositionX();
        bBox.y = this.getPositionY();
        return cc.rectContainsPoint( bBox, touchLocation );
    }
} );
