/**
 * @module smartfish
 */
var sf = sf || {};

/**
 * @class SmashObject
 */
sf.SmashObject = {

/**
 * @method setName
 * @param {std::string}
 */
setName : function () {},

/**
 * @method destory
 */
destory : function () {},

/**
 * @method getName
 * @return A value converted from C/C++ "std::string"
 */
getName : function () {},

/**
 * @method getOwningGroup
 * @return A value converted from C/C++ "smartfish::SmashGroup*"
 */
getOwningGroup : function () {},

/**
 * @method setAliasName
 * @param {std::string}
 */
setAliasName : function () {},

/**
 * @method initWithName
 * @return A value converted from C/C++ "bool"
 * @param {std::string}
 */
initWithName : function () {},

/**
 * @method getAliasName
 * @return A value converted from C/C++ "std::string"
 */
getAliasName : function () {},

/**
 * @method initialize
 */
initialize : function () {},

/**
 * @method setOwningGroup
 * @param {smartfish::SmashGroup*}
 */
setOwningGroup : function () {},

/**
 * @method SmashObject
 * @constructor
 */
SmashObject : function () {},

};

/**
 * @class SmashGroup
 */
sf.SmashGroup = {

/**
 * @method destory
 */
destory : function () {},

/**
 * @method contains
 * @return A value converted from C/C++ "bool"
 * @param {smartfish::SmashObject*}
 */
contains : function () {},

/**
 * @method lookupEntities
 * @return A value converted from C/C++ "cocos2d::CCArray*"
 * @param {std::string}
 */
lookupEntities : function () {},

/**
 * @method lookup
 * @return A value converted from C/C++ "smartfish::SmashObject*"
 * @param {std::string}
 */
lookup : function () {},

/**
 * @method initialize
 */
initialize : function () {},

/**
 * @method size
 * @return A value converted from C/C++ "int"
 */
size : function () {},

/**
 * @method create
 * @return A value converted from C/C++ "smartfish::SmashGroup*"
 * @param {std::string}
 */
create : function () {},

/**
 * @method SmashGroup
 * @constructor
 */
SmashGroup : function () {},

};

/**
 * @class Entity
 */
sf.Entity = {

/**
 * @method lookupEntityFromGroup
 * @return A value converted from C/C++ "smartfish::Entity*"
 * @param {std::string}
 */
lookupEntityFromGroup : function () {},

/**
 * @method removeComponent
 * @param {smartfish::EntityComponent*}
 */
removeComponent : function () {},

/**
 * @method getDeferring
 * @return A value converted from C/C++ "bool"
 */
getDeferring : function () {},

/**
 * @method getTeamId
 * @return A value converted from C/C++ "int"
 */
getTeamId : function () {},

/**
 * @method addComponent
 * @param {smartfish::EntityComponent*}
 * @param {std::string}
 */
addComponent : function () {},

/**
 * @method destory
 */
destory : function () {},

/**
 * @method doInitialize
 * @param {smartfish::EntityComponent*}
 */
doInitialize : function () {},

/**
 * @method resume
 */
resume : function () {},

/**
 * @method stop
 */
stop : function () {},

/**
 * @method lookupComponentByEntity
 * @return A value converted from C/C++ "smartfish::EntityComponent*"
 * @param {std::string}
 * @param {std::string}
 */
lookupComponentByEntity : function () {},

/**
 * @method setDeferring
 * @param {bool}
 */
setDeferring : function () {},

/**
 * @method lookupComponent
 * @return A value converted from C/C++ "smartfish::EntityComponent*"
 * @param {std::string}
 */
lookupComponent : function () {},

/**
 * @method removeComponentByName
 * @param {std::string}
 */
removeComponentByName : function () {},

/**
 * @method initialize
 */
initialize : function () {},

/**
 * @method setTeamId
 * @param {int}
 */
setTeamId : function () {},

/**
 * @method create
 * @return A value converted from C/C++ "smartfish::Entity*"
 * @param {std::string}
 */
create : function () {},

/**
 * @method Entity
 * @constructor
 */
Entity : function () {},

};

/**
 * @class EntityComponent
 */
sf.EntityComponent = {

/**
 * @method setName
 * @param {std::string}
 */
setName : function () {},

/**
 * @method getName
 * @return A value converted from C/C++ "std::string"
 */
getName : function () {},

/**
 * @method getOwner
 * @return A value converted from C/C++ "smartfish::Entity*"
 */
getOwner : function () {},

/**
 * @method setOwner
 * @param {smartfish::Entity*}
 */
setOwner : function () {},

/**
 * @method EntityComponent
 * @constructor
 */
EntityComponent : function () {},

};

/**
 * @class AnimatedComponent
 */
sf.AnimatedComponent = {

/**
 * @method set_registerForUpdates
 * @param {bool}
 */
set_registerForUpdates : function () {},

/**
 * @method isRegister
 * @return A value converted from C/C++ "bool"
 */
isRegister : function () {},

/**
 * @method AnimatedComponent
 * @constructor
 */
AnimatedComponent : function () {},

};

/**
 * @class TickedComponent
 */
sf.TickedComponent = {

/**
 * @method set_registerForUpdates
 * @param {bool}
 */
set_registerForUpdates : function () {},

/**
 * @method isRegister
 * @return A value converted from C/C++ "bool"
 */
isRegister : function () {},

/**
 * @method TickedComponent
 * @constructor
 */
TickedComponent : function () {},

};

/**
 * @class ProcessManager
 */
sf.ProcessManager = {

/**
 * @method isTicking
 * @return A value converted from C/C++ "bool"
 */
isTicking : function () {},

/**
 * @method removeTickedObject
 * @param {smartfish::TickedComponent*}
 */
removeTickedObject : function () {},

/**
 * @method destory
 */
destory : function () {},

/**
 * @method stop
 */
stop : function () {},

/**
 * @method removeAnimatedObject
 * @param {smartfish::AnimatedComponent*}
 */
removeAnimatedObject : function () {},

/**
 * @method set_timeScale
 * @param {float}
 */
set_timeScale : function () {},

/**
 * @method start
 */
start : function () {},

/**
 * @method addTickedObject
 * @param {smartfish::TickedComponent*}
 * @param {float}
 */
addTickedObject : function () {},

/**
 * @method initialize
 */
initialize : function () {},

/**
 * @method get_timeScale
 * @return A value converted from C/C++ "float"
 */
get_timeScale : function () {},

/**
 * @method addAnimatedObject
 * @param {smartfish::AnimatedComponent*}
 * @param {float}
 */
addAnimatedObject : function () {},

/**
 * @method getInstance
 * @return A value converted from C/C++ "smartfish::ProcessManager*"
 */
getInstance : function () {},

/**
 * @method ProcessManager
 * @constructor
 */
ProcessManager : function () {},

};

/**
 * @class DisplayObjectScene
 */
sf.DisplayObjectScene = {

/**
 * @method getSceneView
 * @return A value converted from C/C++ "cocos2d::CCNode*"
 */
getSceneView : function () {},

/**
 * @method remove
 * @param {smartfish::DisplayObjectRenderer*}
 */
remove : function () {},

/**
 * @method add
 * @param {smartfish::DisplayObjectRenderer*}
 */
add : function () {},

/**
 * @method setSceneView
 * @param {cocos2d::CCNode*}
 */
setSceneView : function () {},

/**
 * @method DisplayObjectScene
 * @constructor
 */
DisplayObjectScene : function () {},

};

/**
 * @class DisplayObjectRenderer
 */
sf.DisplayObjectRenderer = {

/**
 * @method setRotationX
 * @param {float}
 */
setRotationX : function () {},

/**
 * @method getRotationX
 * @return A value converted from C/C++ "float"
 */
getRotationX : function () {},

/**
 * @method getRotationY
 * @return A value converted from C/C++ "float"
 */
getRotationY : function () {},

/**
 * @method setRotationY
 * @param {float}
 */
setRotationY : function () {},

/**
 * @method getRotation
 * @return A value converted from C/C++ "float"
 */
getRotation : function () {},

/**
 * @method getScale
 * @return A value converted from C/C++ "float"
 */
getScale : function () {},

/**
 * @method getDisplayObject
 * @return A value converted from C/C++ "cocos2d::CCNode*"
 */
getDisplayObject : function () {},

/**
 * @method getScaleY
 * @return A value converted from C/C++ "float"
 */
getScaleY : function () {},

/**
 * @method getScaleX
 * @return A value converted from C/C++ "float"
 */
getScaleX : function () {},

/**
 * @method removeChildByName
 * @param {const char*}
 */
removeChildByName : function () {},

/**
 * @method getSkewX
 * @return A value converted from C/C++ "float"
 */
getSkewX : function () {},

/**
 * @method getSkewY
 * @return A value converted from C/C++ "float"
 */
getSkewY : function () {},

/**
 * @method setRotation
 * @param {float}
 */
setRotation : function () {},

/**
 * @method setZOrder
 * @param {int}
 */
setZOrder : function () {},

/**
 * @method setScaleY
 * @param {float}
 */
setScaleY : function () {},

/**
 * @method setScaleX
 * @param {float}
 */
setScaleX : function () {},

/**
 * @method setScale
 * @param {float}
 */
setScale : function () {},

/**
 * @method setView
 */
setView : function () {},

/**
 * @method getPosition
 * @return A value converted from C/C++ "cocos2d::CCPoint"
 */
getPosition : function () {},

/**
 * @method getChildByName
 * @return A value converted from C/C++ "cocos2d::CCNode*"
 * @param {const char*}
 */
getChildByName : function () {},

/**
 * @method setPositionY
 * @param {float}
 */
setPositionY : function () {},

/**
 * @method setPositionX
 * @param {float}
 */
setPositionX : function () {},

/**
 * @method getZOrder
 * @return A value converted from C/C++ "int"
 */
getZOrder : function () {},

/**
 * @method removeChild
 * @param {cocos2d::CCNode*}
 */
removeChild : function () {},

/**
 * @method isVisible
 * @return A value converted from C/C++ "bool"
 */
isVisible : function () {},

/**
 * @method setSkewX
 * @param {float}
 */
setSkewX : function () {},

/**
 * @method setSkewY
 * @param {float}
 */
setSkewY : function () {},

/**
 * @method setVisible
 * @param {bool}
 */
setVisible : function () {},

/**
 * @method DisplayObjectRenderer
 * @constructor
 */
DisplayObjectRenderer : function () {},

};

/**
 * @class SpriteBatchNodeRenderer
 */
sf.SpriteBatchNodeRenderer = {

/**
 * @method setTextureFileName
 * @param {std::string}
 */
setTextureFileName : function () {},

/**
 * @method setSprite
 * @param {cocos2d::CCSprite*}
 */
setSprite : function () {},

/**
 * @method removeChildByName
 * @param {const char*}
 */
removeChildByName : function () {},

/**
 * @method removeChild
 * @param {cocos2d::CCNode*}
 */
removeChild : function () {},

/**
 * @method getTextureFileName
 * @return A value converted from C/C++ "std::string"
 */
getTextureFileName : function () {},

/**
 * @method setView
 */
setView : function () {},

/**
 * @method SpriteBatchNodeRenderer
 * @constructor
 */
SpriteBatchNodeRenderer : function () {},

};

/**
 * @class SpriteBatchNodeScene
 */
sf.SpriteBatchNodeScene = {

/**
 * @method setBatchNodeZOrder
 * @param {std::string}
 * @param {int}
 */
setBatchNodeZOrder : function () {},

/**
 * @method remove
 * @param {smartfish::DisplayObjectRenderer*}
 */
remove : function () {},

/**
 * @method add
 * @param {smartfish::DisplayObjectRenderer*}
 */
add : function () {},

/**
 * @method setSceneView
 * @param {cocos2d::CCNode*}
 */
setSceneView : function () {},

/**
 * @method SpriteBatchNodeScene
 * @constructor
 */
SpriteBatchNodeScene : function () {},

};

/**
 * @class ArmatureRenderer
 */
sf.ArmatureRenderer = {

/**
 * @method getTextureFileName
 * @return A value converted from C/C++ "std::string"
 */
getTextureFileName : function () {},

/**
 * @method getCurrentFrame
 * @return A value converted from C/C++ "int"
 */
getCurrentFrame : function () {},

/**
 * @method getAnimationName
 * @return A value converted from C/C++ "std::string"
 */
getAnimationName : function () {},

/**
 * @method getTotalFrame
 * @return A value converted from C/C++ "int"
 */
getTotalFrame : function () {},

/**
 * @method getArmatureAnimation
 * @return A value converted from C/C++ "cocos2d::extension::CCArmatureAnimation*"
 */
getArmatureAnimation : function () {},

/**
 * @method setSpeedScale
 * @param {float}
 */
setSpeedScale : function () {},

/**
 * @method removeChildByName
 * @param {const char*}
 */
removeChildByName : function () {},

/**
 * @method getArmature
 * @return A value converted from C/C++ "cocos2d::extension::CCArmature*"
 */
getArmature : function () {},

/**
 * @method changeSkin
 * @param {const char*}
 * @param {const char*}
 */
changeSkin : function () {},

/**
 * @method init
 * @return A value converted from C/C++ "bool"
 * @param {const char*}
 * @param {int}
 */
init : function () {},

/**
 * @method getBonePositionY
 * @return A value converted from C/C++ "float"
 * @param {const char*}
 */
getBonePositionY : function () {},

/**
 * @method getBonePositionX
 * @return A value converted from C/C++ "float"
 * @param {const char*}
 */
getBonePositionX : function () {},

/**
 * @method setTextureFileName
 * @param {std::string}
 */
setTextureFileName : function () {},

/**
 * @method removeChild
 * @param {cocos2d::CCNode*}
 */
removeChild : function () {},

/**
 * @method isPlaying
 * @return A value converted from C/C++ "bool"
 */
isPlaying : function () {},

/**
 * @method create
 * @return A value converted from C/C++ "smartfish::ArmatureRenderer*"
 * @param {const char*}
 * @param {int}
 */
create : function () {},

/**
 * @method ArmatureRenderer
 * @constructor
 */
ArmatureRenderer : function () {},

};

/**
 * @class ArmatureScene
 */
sf.ArmatureScene = {

/**
 * @method setBatchNodeZOrder
 * @param {std::string}
 * @param {int}
 */
setBatchNodeZOrder : function () {},

/**
 * @method remove
 * @param {smartfish::DisplayObjectRenderer*}
 */
remove : function () {},

/**
 * @method add
 * @param {smartfish::DisplayObjectRenderer*}
 */
add : function () {},

/**
 * @method setSceneView
 * @param {cocos2d::CCNode*}
 */
setSceneView : function () {},

/**
 * @method ArmatureScene
 * @constructor
 */
ArmatureScene : function () {},

};

/**
 * @class RowSpatialManager
 */
sf.RowSpatialManager = {

/**
 * @method fastRemove
 * @param {smartfish::RowSpatialObjectComponent*}
 */
fastRemove : function () {},

/**
 * @method removeSpatialObject
 * @param {smartfish::RowSpatialObjectComponent*}
 */
removeSpatialObject : function () {},

/**
 * @method setup
 * @param {int}
 * @param {int}
 */
setup : function () {},

/**
 * @method querySpan
 * @return A value converted from C/C++ "cocos2d::CCArray*"
 * @param {int}
 * @param {int}
 * @param {int}
 * @param {int}
 * @param {smartfish::ObjectType*}
 * @param {smartfish::RowSpatialObjectComponent*}
 * @param {int}
 */
querySpan : function () {},

/**
 * @method addSpatialObject
 * @param {smartfish::RowSpatialObjectComponent*}
 */
addSpatialObject : function () {},

/**
 * @method intersectsRect
 * @return A value converted from C/C++ "bool"
 * @param {cocos2d::CCRect}
 * @param {cocos2d::CCRect}
 */
intersectsRect : function () {},

/**
 * @method getAllSpatials
 * @return A value converted from C/C++ "cocos2d::CCArray*"
 */
getAllSpatials : function () {},

/**
 * @method queryAll
 * @return A value converted from C/C++ "cocos2d::CCArray*"
 * @param {cocos2d::CCRect}
 * @param {smartfish::ObjectType*}
 */
queryAll : function () {},

/**
 * @method getInstance
 * @return A value converted from C/C++ "smartfish::RowSpatialManager*"
 */
getInstance : function () {},

/**
 * @method RowSpatialManager
 * @constructor
 */
RowSpatialManager : function () {},

};

/**
 * @class RowSpatialObjectComponent
 */
sf.RowSpatialObjectComponent = {

/**
 * @method getRenderCol
 * @return A value converted from C/C++ "float"
 */
getRenderCol : function () {},

/**
 * @method getMinCol
 * @return A value converted from C/C++ "int"
 */
getMinCol : function () {},

/**
 * @method setRenderRow
 * @param {float}
 */
setRenderRow : function () {},

/**
 * @method getVelX
 * @return A value converted from C/C++ "float"
 */
getVelX : function () {},

/**
 * @method getVelY
 * @return A value converted from C/C++ "float"
 */
getVelY : function () {},

/**
 * @method setWidth
 * @param {double}
 */
setWidth : function () {},

/**
 * @method getRect
 * @return A value converted from C/C++ "cocos2d::CCRect"
 */
getRect : function () {},

/**
 * @method getHeight
 * @return A value converted from C/C++ "double"
 */
getHeight : function () {},

/**
 * @method getIsSyncPosition
 * @return A value converted from C/C++ "bool"
 */
getIsSyncPosition : function () {},

/**
 * @method getRow
 * @return A value converted from C/C++ "int"
 */
getRow : function () {},

/**
 * @method setObjectType
 * @param {smartfish::ObjectType*}
 */
setObjectType : function () {},

/**
 * @method getObjectType
 * @return A value converted from C/C++ "smartfish::ObjectType*"
 */
getObjectType : function () {},

/**
 * @method getRenderRow
 * @return A value converted from C/C++ "float"
 */
getRenderRow : function () {},

/**
 * @method getMaxCol
 * @return A value converted from C/C++ "int"
 */
getMaxCol : function () {},

/**
 * @method setVelX
 * @param {float}
 */
setVelX : function () {},

/**
 * @method setVelY
 * @param {float}
 */
setVelY : function () {},

/**
 * @method setCol
 * @param {int}
 */
setCol : function () {},

/**
 * @method getMaxRow
 * @return A value converted from C/C++ "int"
 */
getMaxRow : function () {},

/**
 * @method setHeight
 * @param {double}
 */
setHeight : function () {},

/**
 * @method setIsSyncPosition
 * @param {bool}
 */
setIsSyncPosition : function () {},

/**
 * @method getMinRow
 * @return A value converted from C/C++ "int"
 */
getMinRow : function () {},

/**
 * @method getCol
 * @return A value converted from C/C++ "int"
 */
getCol : function () {},

/**
 * @method getWidth
 * @return A value converted from C/C++ "double"
 */
getWidth : function () {},

/**
 * @method setRenderCol
 * @param {float}
 */
setRenderCol : function () {},

/**
 * @method setRow
 * @param {int}
 */
setRow : function () {},

/**
 * @method RowSpatialObjectComponent
 * @constructor
 */
RowSpatialObjectComponent : function () {},

};

/**
 * @class RowDataComponent
 */
sf.RowDataComponent = {

/**
 * @method getCellSize
 * @return A value converted from C/C++ "cocos2d::CCPoint"
 */
getCellSize : function () {},

/**
 * @method setRows
 * @param {int}
 */
setRows : function () {},

/**
 * @method getRows
 * @return A value converted from C/C++ "int"
 */
getRows : function () {},

/**
 * @method getCols
 * @return A value converted from C/C++ "int"
 */
getCols : function () {},

/**
 * @method getOrigin
 * @return A value converted from C/C++ "cocos2d::CCPoint"
 */
getOrigin : function () {},

/**
 * @method setCellSize
 * @param {cocos2d::CCPoint}
 */
setCellSize : function () {},

/**
 * @method setCols
 * @param {int}
 */
setCols : function () {},

/**
 * @method setOrigin
 * @param {cocos2d::CCPoint}
 */
setOrigin : function () {},

/**
 * @method globalToLocal
 * @return A value converted from C/C++ "cocos2d::CCPoint"
 * @param {cocos2d::CCPoint}
 */
globalToLocal : function () {},

/**
 * @method localToGlobal
 * @return A value converted from C/C++ "cocos2d::CCPoint"
 * @param {cocos2d::CCPoint}
 */
localToGlobal : function () {},

/**
 * @method RowDataComponent
 * @constructor
 */
RowDataComponent : function () {},

};

/**
 * @class RowTransformComponent
 */
sf.RowTransformComponent = {

/**
 * @method getRenderPosition
 * @return A value converted from C/C++ "cocos2d::CCPoint"
 */
getRenderPosition : function () {},

/**
 * @method getRowOffset
 * @return A value converted from C/C++ "float"
 */
getRowOffset : function () {},

/**
 * @method setColOffset
 * @param {float}
 */
setColOffset : function () {},

/**
 * @method setRowOffset
 * @param {float}
 */
setRowOffset : function () {},

/**
 * @method getColOffset
 * @return A value converted from C/C++ "float"
 */
getColOffset : function () {},

/**
 * @method RowTransformComponent
 * @constructor
 */
RowTransformComponent : function () {},

};

/**
 * @class TouchComponent
 */
sf.TouchComponent = {

/**
 * @method getTouchMode
 * @return A value converted from C/C++ "DispatchMode"
 */
getTouchMode : function () {},

/**
 * @method setTouchMode
 * @param {DispatchMode}
 */
setTouchMode : function () {},

/**
 * @method ccTouchBegan
 * @return A value converted from C/C++ "bool"
 * @param {cocos2d::CCTouch*}
 * @param {cocos2d::CCEvent*}
 */
ccTouchBegan : function () {},

/**
 * @method ccTouchesCancelled
 * @param {cocos2d::CCSet*}
 * @param {cocos2d::CCEvent*}
 */
ccTouchesCancelled : function () {},

/**
 * @method ccTouchesEnded
 * @param {cocos2d::CCSet*}
 * @param {cocos2d::CCEvent*}
 */
ccTouchesEnded : function () {},

/**
 * @method ccTouchCancelled
 * @param {cocos2d::CCTouch*}
 * @param {cocos2d::CCEvent*}
 */
ccTouchCancelled : function () {},

/**
 * @method ccTouchEnded
 * @param {cocos2d::CCTouch*}
 * @param {cocos2d::CCEvent*}
 */
ccTouchEnded : function () {},

/**
 * @method isTouchEnabled
 * @return A value converted from C/C++ "bool"
 */
isTouchEnabled : function () {},

/**
 * @method setSwallowsTouches
 * @param {bool}
 */
setSwallowsTouches : function () {},

/**
 * @method ccTouchesBegan
 * @param {cocos2d::CCSet*}
 * @param {cocos2d::CCEvent*}
 */
ccTouchesBegan : function () {},

/**
 * @method ccTouchesMoved
 * @param {cocos2d::CCSet*}
 * @param {cocos2d::CCEvent*}
 */
ccTouchesMoved : function () {},

/**
 * @method ccTouchMoved
 * @param {cocos2d::CCTouch*}
 * @param {cocos2d::CCEvent*}
 */
ccTouchMoved : function () {},

/**
 * @method getTouchPriority
 * @return A value converted from C/C++ "int"
 */
getTouchPriority : function () {},

/**
 * @method isSwallowsTouches
 * @return A value converted from C/C++ "bool"
 */
isSwallowsTouches : function () {},

/**
 * @method setTouchEnabled
 * @param {bool}
 */
setTouchEnabled : function () {},

/**
 * @method registerWithTouchDispatcher
 */
registerWithTouchDispatcher : function () {},

/**
 * @method setTouchPriority
 * @param {int}
 */
setTouchPriority : function () {},

/**
 * @method TouchComponent
 * @constructor
 */
TouchComponent : function () {},

};

/**
 * @class ObjectType
 */
sf.ObjectType = {

/**
 * @method getTypeNames
 * @return A value converted from C/C++ "cocos2d::CCArray*"
 */
getTypeNames : function () {},

/**
 * @method overlaps
 * @return A value converted from C/C++ "bool"
 * @param {smartfish::ObjectType*}
 */
overlaps : function () {},

/**
 * @method getBits
 * @return A value converted from C/C++ "int"
 */
getBits : function () {},

/**
 * @method matches
 * @return A value converted from C/C++ "bool"
 * @param {smartfish::ObjectType*}
 */
matches : function () {},

/**
 * @method overlap
 * @return A value converted from C/C++ "bool"
 * @param {std::string}
 */
overlap : function () {},

/**
 * @method add
 * @param {std::string}
 */
add : function () {},

/**
 * @method remove
 * @param {std::string}
 */
remove : function () {},

/**
 * @method match
 * @return A value converted from C/C++ "bool"
 * @param {std::string}
 */
match : function () {},

/**
 * @method ObjectType
 * @constructor
 */
ObjectType : function () {},

};

/**
 * @class SFObject
 */
sf.SFObject = {

/**
 * @method getName
 * @return A value converted from C/C++ "std::string"
 */
getName : function () {},

/**
 * @method setName
 * @param {std::string}
 */
setName : function () {},

/**
 * @method SFObject
 * @constructor
 */
SFObject : function () {},

};

/**
 * @class Conditional
 */
sf.Conditional = {

/**
 * @method getOwner
 * @return A value converted from C/C++ "smartfish::Entity*"
 */
getOwner : function () {},

/**
 * @method setOwner
 * @param {smartfish::Entity*}
 */
setOwner : function () {},

/**
 * @method Conditional
 * @constructor
 */
Conditional : function () {},

};

/**
 * @class Strategy
 */
sf.Strategy = {

/**
 * @method getOwner
 * @return A value converted from C/C++ "smartfish::Entity*"
 */
getOwner : function () {},

/**
 * @method setOwner
 * @param {smartfish::Entity*}
 */
setOwner : function () {},

/**
 * @method Strategy
 * @constructor
 */
Strategy : function () {},

};

/**
 * @class StrategyContainingComponent
 */
sf.StrategyContainingComponent = {

/**
 * @method getStrategy
 * @return A value converted from C/C++ "smartfish::Strategy*"
 * @param {std::string}
 */
getStrategy : function () {},

/**
 * @method getStrategies
 * @return A value converted from C/C++ "cocos2d::CCArray*"
 */
getStrategies : function () {},

/**
 * @method add
 * @param {smartfish::Strategy*}
 * @param {std::string}
 */
add : function () {},

/**
 * @method setOwner
 * @param {smartfish::Entity*}
 */
setOwner : function () {},

/**
 * @method StrategyContainingComponent
 * @constructor
 */
StrategyContainingComponent : function () {},

};

/**
 * @class CollisionResponseStrategy
 */
sf.CollisionResponseStrategy = {

/**
 * @method shouldRemove
 * @return A value converted from C/C++ "bool"
 */
shouldRemove : function () {},

/**
 * @method CollisionResponseStrategy
 * @constructor
 */
CollisionResponseStrategy : function () {},

};

/**
 * @class CollisionResponseComponent
 */
sf.CollisionResponseComponent = {

/**
 * @method setRowSpatialManager
 * @param {smartfish::RowSpatialManager*}
 */
setRowSpatialManager : function () {},

/**
 * @method setObjectMask
 * @param {smartfish::ObjectType*}
 */
setObjectMask : function () {},

/**
 * @method setConditional
 * @param {smartfish::Conditional*}
 */
setConditional : function () {},

/**
 * @method setTeamId
 * @param {int}
 */
setTeamId : function () {},

/**
 * @method getTeamId
 * @return A value converted from C/C++ "int"
 */
getTeamId : function () {},

/**
 * @method getSpatial
 * @return A value converted from C/C++ "smartfish::RowSpatialObjectComponent*"
 */
getSpatial : function () {},

/**
 * @method getObjectMask
 * @return A value converted from C/C++ "smartfish::ObjectType*"
 */
getObjectMask : function () {},

/**
 * @method getRowSpatialManager
 * @return A value converted from C/C++ "smartfish::RowSpatialManager*"
 */
getRowSpatialManager : function () {},

/**
 * @method setSpatial
 * @param {smartfish::RowSpatialObjectComponent*}
 */
setSpatial : function () {},

/**
 * @method getConditional
 * @return A value converted from C/C++ "smartfish::Conditional*"
 */
getConditional : function () {},

/**
 * @method CollisionResponseComponent
 * @constructor
 */
CollisionResponseComponent : function () {},

};

/**
 * @class FindingResponseStrategy
 */
sf.FindingResponseStrategy = {

/**
 * @method shouldRemove
 * @return A value converted from C/C++ "bool"
 */
shouldRemove : function () {},

/**
 * @method FindingResponseStrategy
 * @constructor
 */
FindingResponseStrategy : function () {},

};

/**
 * @class FindingResponseComponent
 */
sf.FindingResponseComponent = {

/**
 * @method setFindingRange
 * @param {float}
 * @param {float}
 * @param {float}
 * @param {float}
 */
setFindingRange : function () {},

/**
 * @method setObjectMask
 * @param {smartfish::ObjectType*}
 */
setObjectMask : function () {},

/**
 * @method setConditional
 * @param {smartfish::Conditional*}
 */
setConditional : function () {},

/**
 * @method getTeamId
 * @return A value converted from C/C++ "int"
 */
getTeamId : function () {},

/**
 * @method getObjectMask
 * @return A value converted from C/C++ "smartfish::ObjectType*"
 */
getObjectMask : function () {},

/**
 * @method getConditional
 * @return A value converted from C/C++ "smartfish::Conditional*"
 */
getConditional : function () {},

/**
 * @method setTeamId
 * @param {int}
 */
setTeamId : function () {},

/**
 * @method FindingResponseComponent
 * @constructor
 */
FindingResponseComponent : function () {},

};

/**
 * @class IsoPoint
 */
sf.IsoPoint = {

/**
 * @method getZ
 * @return A value converted from C/C++ "float"
 */
getZ : function () {},

/**
 * @method getX
 * @return A value converted from C/C++ "float"
 */
getX : function () {},

/**
 * @method getY
 * @return A value converted from C/C++ "float"
 */
getY : function () {},

/**
 * @method init
 * @param {float}
 * @param {float}
 * @param {float}
 */
init : function () {},

/**
 * @method toString
 * @return A value converted from C/C++ "std::string"
 */
toString : function () {},

};

/**
 * @class IsoConfig
 */
sf.IsoConfig = {

/**
 * @method getCellSize
 * @return A value converted from C/C++ "int"
 */
getCellSize : function () {},

/**
 * @method setGridSize
 * @param {cocos2d::CCPoint}
 */
setGridSize : function () {},

/**
 * @method setCellSize
 * @param {int}
 */
setCellSize : function () {},

/**
 * @method getGridSize
 * @return A value converted from C/C++ "cocos2d::CCPoint"
 */
getGridSize : function () {},

/**
 * @method setAnchor
 * @param {cocos2d::CCPoint}
 */
setAnchor : function () {},

/**
 * @method getAnchor
 * @return A value converted from C/C++ "cocos2d::CCPoint"
 */
getAnchor : function () {},

/**
 * @method IsoConfig
 * @constructor
 */
IsoConfig : function () {},

};

/**
 * @class IsoMath
 */
sf.IsoMath = {

/**
 * @method screenToIso
 * @return A value converted from C/C++ "IsoPoint*"
 * @param {cocos2d::CCPoint}
 */
screenToIso : function () {},

/**
 * @method isoToScreen
 * @return A value converted from C/C++ "cocos2d::CCPoint"
 * @param {IsoPoint*}
 */
isoToScreen : function () {},

};

/**
 * @class IsoNode
 */
sf.IsoNode = {

/**
 * @method setContainer
 * @param {cocos2d::CCNode*}
 */
setContainer : function () {},

/**
 * @method getDepth
 * @return A value converted from C/C++ "int"
 */
getDepth : function () {},

/**
 * @method setAnchorPoint
 * @param {cocos2d::CCPoint}
 */
setAnchorPoint : function () {},

/**
 * @method getIsoZ
 * @return A value converted from C/C++ "float"
 */
getIsoZ : function () {},

/**
 * @method getIsoX
 * @return A value converted from C/C++ "float"
 */
getIsoX : function () {},

/**
 * @method getIsoY
 * @return A value converted from C/C++ "float"
 */
getIsoY : function () {},

/**
 * @method getWidth
 * @return A value converted from C/C++ "int"
 */
getWidth : function () {},

/**
 * @method setIsoZ
 * @param {float}
 */
setIsoZ : function () {},

/**
 * @method setIsoX
 * @param {float}
 */
setIsoX : function () {},

/**
 * @method setIsoY
 * @param {float}
 */
setIsoY : function () {},

/**
 * @method setWidth
 * @param {int}
 */
setWidth : function () {},

/**
 * @method setType
 * @param {int}
 */
setType : function () {},

/**
 * @method getOffsetIsoPosition
 * @return A value converted from C/C++ "IsoPoint*"
 */
getOffsetIsoPosition : function () {},

/**
 * @method getLength
 * @return A value converted from C/C++ "int"
 */
getLength : function () {},

/**
 * @method getHeight
 * @return A value converted from C/C++ "float"
 */
getHeight : function () {},

/**
 * @method getContainer
 * @return A value converted from C/C++ "cocos2d::CCNode*"
 */
getContainer : function () {},

/**
 * @method isWalkable
 * @return A value converted from C/C++ "bool"
 */
isWalkable : function () {},

/**
 * @method setOffsetIsoPosition
 * @param {IsoPoint*}
 */
setOffsetIsoPosition : function () {},

/**
 * @method getIsoPosition
 * @return A value converted from C/C++ "IsoPoint*"
 */
getIsoPosition : function () {},

/**
 * @method getType
 * @return A value converted from C/C++ "int"
 */
getType : function () {},

/**
 * @method setIsoPosition
 * @param {IsoPoint*}
 */
setIsoPosition : function () {},

/**
 * @method renderLogic
 */
renderLogic : function () {},

/**
 * @method setLength
 * @param {int}
 */
setLength : function () {},

/**
 * @method setDepth
 * @param {int}
 */
setDepth : function () {},

/**
 * @method setHeight
 * @param {int}
 */
setHeight : function () {},

/**
 * @method setWalkable
 * @param {bool}
 */
setWalkable : function () {},

/**
 * @method getScreenPosition
 * @return A value converted from C/C++ "cocos2d::CCPoint"
 */
getScreenPosition : function () {},

/**
 * @method getAnchorPoint
 * @return A value converted from C/C++ "cocos2d::CCPoint"
 */
getAnchorPoint : function () {},

/**
 * @method setSize
 * @param {int}
 * @param {int}
 * @param {int}
 */
setSize : function () {},

/**
 * @method IsoNode
 * @constructor
 */
IsoNode : function () {},

};

/**
 * @class SceneLayoutRenderer
 */
sf.SceneLayoutRenderer = {

/**
 * @method sortWithTarget
 * @param {cocos2d::CCArray*}
 * @param {IsoNode*}
 */
sortWithTarget : function () {},

/**
 * @method place
 * @param {IsoNode*}
 */
place : function () {},

/**
 * @method sortChildren
 * @param {cocos2d::CCArray*}
 */
sortChildren : function () {},

/**
 * @method SceneLayoutRenderer
 * @constructor
 */
SceneLayoutRenderer : function () {},

};

/**
 * @class JSHttpRequest
 */
sf.JSHttpRequest = {

/**
 * @method setTimeout
 * @param {int}
 */
setTimeout : function () {},

/**
 * @method call
 * @param {std::string}
 * @param {std::string}
 * @param {std::string}
 */
call : function () {},

/**
 * @method setRequestType
 * @param {int}
 */
setRequestType : function () {},

/**
 * @method JSHttpRequest
 * @constructor
 */
JSHttpRequest : function () {},

};
