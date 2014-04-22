/**
 * Created by chenyonghua on 13-10-30.
 */
//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// IsoSprite //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
IsoSprite = sf.IsoNode.extend( {
    fileName: "",
    pathNodes: null,
    index: 0,
    ctor: function()
    {
        cc.associateWithNative(this,sf.IsoNode);
        this._super();
        this.index = 0;
        this.pathNodes = null;
    },
    initialize: function( fileName )
    {
        this.fileName = fileName;
        if( this.fileName != null && this.fileName != undefined)
        {
            var sprite = cc.Sprite.createWithSpriteFrameName( this.fileName );
            sprite.retain();
            this.setContainer( sprite );
        }
    },
    renderLogic: function()
    {
        this._super();
    }
} );