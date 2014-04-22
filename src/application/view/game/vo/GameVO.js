/**
 * Created by chenyonghua on 13-12-10.
 */
var BackgroundItemVO = cc.Class.extend( {
    filename: "",
    position: cc.p( 0, 0 ),
    scale:cc.p(1,1),
    alpha:1,
    depth: 0,
    ctor: function()
    {

    }
} );
var SoldierVO = cc.Class.extend( {
    weaponInfo: null,
    hat:null,                       //帽子
    health: 100,
    ctor: function()
    {

    }
} );