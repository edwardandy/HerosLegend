/**
 * Created by chenyonghua on 13-12-17.
 */
var AnimationData = cc.Class.extend( {
    name: null,
    textureFileName: null,
    spriteFrames: null,
    totalFrames: 1,
    ctor: function()
    {
        this.spriteFrames = [];
    }
} );

var AnimationDataCache = cc.Class.extend( {
    _animationCache: null,
    ctor: function()
    {
        this._animationCache = {};
    },
    getAnimation: function( name )
    {
        if( name && this._animationCache[name] != null)
        {
            return this._animationCache[name];
        }
        return null;
    },
    addAnimationsWithFile:function(jsonfile)
    {
        var object = JSON.parse(cc.FileUtils.getInstance().getStringFromFile(jsonfile));
        for(var key in object)
        {
            var animationData = new AnimationData();
            animationData.name = key;
            animationData.textureFileName = object[key]["texture"];
            animationData.totalFrames = object[key]["totalFrames"];
            for(var index in object[key].spriteFrames)
            {
                var spriteFrame = cc.SpriteFrameCache.getInstance().getSpriteFrame( object[key].spriteFrames[index] );
                animationData.spriteFrames.push( spriteFrame );
            }
            if( this._animationCache[key] == null )
            {
                this._animationCache[key] = {};
            }
            this._animationCache[key] = animationData;
        }
    }


} );
AnimationDataCache.INSTANCE = null;
AnimationDataCache.getInstance = function()
{
    if( AnimationDataCache.INSTANCE == null )
    {
        AnimationDataCache.INSTANCE = new AnimationDataCache();
    }
    return AnimationDataCache.INSTANCE;
}
