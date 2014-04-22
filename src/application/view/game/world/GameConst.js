/**
 * Created by chenyonghua on 13-11-27.
 */
var GameConst = GameConst || {};
//config
GameConst.ORIGIN = cc.p( 5, 20 );
GameConst.CELL_SIZE = cc.p( 60, 60 );
GameConst.MAP_VELOCITY = 0.06;
GameConst.numCols = Math.ceil( VisibleRect.rect().width / GameConst.CELL_SIZE.x );
GameConst.numRows = Math.ceil( VisibleRect.rect().height / GameConst.CELL_SIZE.y )-2;

//component name
GameConst.world = "world";
GameConst.worldBus = "worldBus";
GameConst.distantView = "distantView";
GameConst.frontView = "frontView";
GameConst.scrollMap = "scrollMap";
GameConst.scrollControl = "scrollControl";
GameConst.gameView = "gameView";
GameConst.scene = "scene";
GameConst.armatureScene = "armatureScene";
GameConst.rowData = "rowData";
GameConst.gameOver = "gameOver";
GameConst.drawGrid = "drawGrid";
GameConst.levelInitialize = "levelInitialize";
GameConst.spatial = "spatial";
GameConst.render = "render";
GameConst.health = "health";
GameConst.deadStrategy = "deadStrategy";
GameConst.changeHealth = "changeHealth";
GameConst.collisionResponse = "collisionResponse";
GameConst.entityBus = "entityBus";
GameConst.rowSpatialManager = "rowSpatialManager";
GameConst.transform = "transform";
GameConst.touchCollect = "touchCollect";
GameConst.followerContainer = "followerContainer";
GameConst.follow = "follow";
GameConst.throwing = "throwing";
GameConst.animationSequencer = "animationSequencer";
GameConst.repeatSpawning = "repeatSpawning";
GameConst.boundCheck = "boundCheck";

//Entity Name
GameConst.PLAYER        = "player";
GameConst.FOLLOWER      = "follower";

GameConst.LANCE         = "lance";
GameConst.LANCER        = "lancer";

GameConst.ARROW        = "Arrow";
GameConst.ARCHER        = "Archer";

GameConst.HAMMER        = "hammer";
GameConst.HAMMERER      = "hammerer";

//ObjectType
GameConst.BATTLE_ITEM = "BATTLE_ITEM";
GameConst.ARMY = "ARMY";
GameConst.BULLET = "BULLET";

//skeleton action
GameConst.WALK = "walk";
GameConst.ATTACK_LANCE = "attack_1";
GameConst.ATTACK_HAMMER = "attack_2";
GameConst.ATTACK_ARROW = "attack_3";
GameConst.ATTACK_MAGIC = "attack_4";
GameConst.DIE = "die";


GameConst.ANI_LANCE = "lance";
GameConst.ANI_HAMMER = "hammer";
GameConst.ANI_ARROW = "arrow";


//MapData
GameConst.getDistantData = function()
{
    var winSize = cc.Director.getInstance().getWinSize();
    var data = [];
    for( var i = 0; i < 20; i++ )
    {
        var array = [];

        var vo = new BackgroundItemVO();
        var id = (Math.floor( Math.random() * 1000 )) % 2;
        vo.filename = eval( "s_distant_" + id );
        var scaleX = Math.random() * 1000 > 500 ? 1 : -1;
        vo.scale = cc.p( scaleX, 1 );
        vo.alpha = 0.5;
        vo.position = cc.p( 50 + Math.floor( Math.random() * 50 ), winSize.height - 76 );
        vo.depth = 10 - i;
        array.push( vo );

        var vo = new BackgroundItemVO();
        var id = (Math.floor( Math.random() * 1000 )) % 2;
        vo.filename = eval( "s_distant_" + id );
        var scaleX = Math.random() * 1000 > 500 ? 1 : -1;
        vo.scale = cc.p( scaleX, 1 );
        vo.position = cc.p( 0, winSize.height - 76 );
        vo.depth = 10 - i;
        array.push( vo );

        var vo = new BackgroundItemVO();
        vo.filename = s_cloud;
        vo.position = cc.p( Math.floor( Math.random() * 50 ), winSize.height - Math.floor( Math.random() * 70 ) );
        var scaleX = Math.random() * 1000 > 500 ? 1 : -1;
        vo.scale = cc.p( scaleX, 1 );
        vo.depth = 10 - i + 120;
        array.push( vo );

        data.push( array );
    }
    return data;
};
GameConst.getMapData = function()
{
    var data = [];
    for( var i = 0; i < 10; i++ )
    {
        var array = [];

        var vo = new BackgroundItemVO();
        var id = (Math.floor( Math.random() * 1000 )) % 3;
        vo.filename = eval( "s_ground_" + id );
        vo.position = cc.p( 0, 60 - Math.floor( Math.random() * 40 ) );
        vo.depth = 1000 - i;
        array.push( vo );
        data.push( array );
    }
    return data;
}
GameConst.getFrontData = function()
{
    var data = [];
    for( var i = 0; i < 10; i++ )
    {
        var array = [];
        var size = 0;
        var j = 0;
        while( size < 400 )
        {
            var vo = new BackgroundItemVO();
            var id = (Math.floor( Math.random() * 1000 )) % 13;
            vo.filename = eval( "s_front_ground_" + id );
            vo.position = cc.p( size, 0 - Math.floor( Math.random() * 50 ) );
            var scaleX = Math.random() * 1000 > 500 ? 1 : -1;
            vo.scale = cc.p( scaleX, 1 );
            vo.depth = 10000 - i + 120;
            array.push( vo );
            var sprite = cc.Sprite.createWithSpriteFrameName( vo.filename );
            size += sprite.getContentSize().width - Math.floor( Math.random() * 150 );
            j++;
        }
        data.push( array );
    }
    return data;
}