#ifndef __smartfish_h__
#define __smartfish_h__

#include "jsapi.h"
#include "jsfriendapi.h"


extern JSClass  *jsb_SmashObject_class;
extern JSObject *jsb_SmashObject_prototype;

JSBool js_smartfish_SmashObject_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_SmashObject_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_SmashObject(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_SmashObject_setName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashObject_destory(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashObject_getName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashObject_getOwningGroup(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashObject_setAliasName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashObject_initWithName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashObject_getAliasName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashObject_initialize(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashObject_setOwningGroup(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashObject_SmashObject(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_SmashGroup_class;
extern JSObject *jsb_SmashGroup_prototype;

JSBool js_smartfish_SmashGroup_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_SmashGroup_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_SmashGroup(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_SmashGroup_destory(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashGroup_contains(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashGroup_lookupEntities(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashGroup_lookup(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashGroup_initialize(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashGroup_size(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashGroup_create(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SmashGroup_SmashGroup(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_Entity_class;
extern JSObject *jsb_Entity_prototype;

JSBool js_smartfish_Entity_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_Entity_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_Entity(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_Entity_lookupEntityFromGroup(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_removeComponent(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_getDeferring(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_getTeamId(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_addComponent(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_destory(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_doInitialize(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_resume(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_stop(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_lookupComponentByEntity(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_setDeferring(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_lookupComponent(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_removeComponentByName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_initialize(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_setTeamId(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_create(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Entity_Entity(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_EntityComponent_class;
extern JSObject *jsb_EntityComponent_prototype;

JSBool js_smartfish_EntityComponent_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_EntityComponent_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_EntityComponent(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_EntityComponent_setName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_EntityComponent_getName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_EntityComponent_getOwner(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_EntityComponent_setOwner(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_EntityComponent_EntityComponent(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_AnimatedComponent_class;
extern JSObject *jsb_AnimatedComponent_prototype;

JSBool js_smartfish_AnimatedComponent_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_AnimatedComponent_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_AnimatedComponent(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_AnimatedComponent_set_registerForUpdates(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_AnimatedComponent_isRegister(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_AnimatedComponent_AnimatedComponent(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_TickedComponent_class;
extern JSObject *jsb_TickedComponent_prototype;

JSBool js_smartfish_TickedComponent_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_TickedComponent_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_TickedComponent(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_TickedComponent_set_registerForUpdates(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TickedComponent_isRegister(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TickedComponent_TickedComponent(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_ProcessManager_class;
extern JSObject *jsb_ProcessManager_prototype;

JSBool js_smartfish_ProcessManager_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_ProcessManager_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_ProcessManager(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_ProcessManager_isTicking(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ProcessManager_removeTickedObject(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ProcessManager_destory(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ProcessManager_stop(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ProcessManager_removeAnimatedObject(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ProcessManager_set_timeScale(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ProcessManager_start(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ProcessManager_addTickedObject(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ProcessManager_initialize(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ProcessManager_get_timeScale(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ProcessManager_addAnimatedObject(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ProcessManager_getInstance(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ProcessManager_ProcessManager(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_DisplayObjectScene_class;
extern JSObject *jsb_DisplayObjectScene_prototype;

JSBool js_smartfish_DisplayObjectScene_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_DisplayObjectScene_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_DisplayObjectScene(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_DisplayObjectScene_getSceneView(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectScene_remove(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectScene_add(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectScene_setSceneView(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectScene_DisplayObjectScene(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_DisplayObjectRenderer_class;
extern JSObject *jsb_DisplayObjectRenderer_prototype;

JSBool js_smartfish_DisplayObjectRenderer_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_DisplayObjectRenderer_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_DisplayObjectRenderer(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_DisplayObjectRenderer_addChild(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_setRotationX(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_getRotationX(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_getRotationY(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_setRotationY(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_getRotation(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_getScale(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_getDisplayObject(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_getScaleY(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_getScaleX(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_removeChildByName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_getSkewX(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_getSkewY(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_setRotation(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_setZOrder(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_setScaleY(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_setScaleX(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_setScale(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_setView(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_getPosition(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_getChildByName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_setPositionY(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_setPositionX(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_getZOrder(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_removeChild(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_isVisible(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_setSkewX(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_setSkewY(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_setVisible(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_DisplayObjectRenderer_DisplayObjectRenderer(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_SpriteBatchNodeRenderer_class;
extern JSObject *jsb_SpriteBatchNodeRenderer_prototype;

JSBool js_smartfish_SpriteBatchNodeRenderer_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_SpriteBatchNodeRenderer_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_SpriteBatchNodeRenderer(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_SpriteBatchNodeRenderer_setTextureFileName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SpriteBatchNodeRenderer_addChild(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SpriteBatchNodeRenderer_setSprite(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SpriteBatchNodeRenderer_removeChildByName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SpriteBatchNodeRenderer_removeChild(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SpriteBatchNodeRenderer_getTextureFileName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SpriteBatchNodeRenderer_setView(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SpriteBatchNodeRenderer_SpriteBatchNodeRenderer(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_SpriteBatchNodeScene_class;
extern JSObject *jsb_SpriteBatchNodeScene_prototype;

JSBool js_smartfish_SpriteBatchNodeScene_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_SpriteBatchNodeScene_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_SpriteBatchNodeScene(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_SpriteBatchNodeScene_setBatchNodeZOrder(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SpriteBatchNodeScene_remove(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SpriteBatchNodeScene_add(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SpriteBatchNodeScene_setSceneView(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SpriteBatchNodeScene_SpriteBatchNodeScene(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_ArmatureRenderer_class;
extern JSObject *jsb_ArmatureRenderer_prototype;

JSBool js_smartfish_ArmatureRenderer_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_ArmatureRenderer_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_ArmatureRenderer(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_ArmatureRenderer_getTextureFileName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_getCurrentFrame(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_getAnimationName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_addChild(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_getTotalFrame(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_getArmatureAnimation(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_setSpeedScale(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_removeChildByName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_getArmature(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_changeSkin(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_init(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_getBonePositionY(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_getBonePositionX(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_setTextureFileName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_removeChild(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_isPlaying(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_create(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureRenderer_ArmatureRenderer(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_ArmatureScene_class;
extern JSObject *jsb_ArmatureScene_prototype;

JSBool js_smartfish_ArmatureScene_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_ArmatureScene_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_ArmatureScene(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_ArmatureScene_setBatchNodeZOrder(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureScene_remove(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureScene_add(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureScene_setSceneView(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ArmatureScene_ArmatureScene(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_RowSpatialManager_class;
extern JSObject *jsb_RowSpatialManager_prototype;

JSBool js_smartfish_RowSpatialManager_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_RowSpatialManager_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_RowSpatialManager(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_RowSpatialManager_fastRemove(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialManager_removeSpatialObject(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialManager_setup(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialManager_querySpan(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialManager_addSpatialObject(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialManager_intersectsRect(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialManager_getAllSpatials(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialManager_queryAll(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialManager_getInstance(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialManager_RowSpatialManager(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_RowSpatialObjectComponent_class;
extern JSObject *jsb_RowSpatialObjectComponent_prototype;

JSBool js_smartfish_RowSpatialObjectComponent_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_RowSpatialObjectComponent_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_RowSpatialObjectComponent(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_RowSpatialObjectComponent_getRenderCol(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_getMinCol(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_setRenderRow(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_getVelX(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_getVelY(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_setWidth(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_getRect(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_getHeight(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_getIsSyncPosition(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_getRow(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_setObjectType(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_getObjectType(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_getRenderRow(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_getMaxCol(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_setVelX(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_setVelY(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_setCol(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_getMaxRow(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_setHeight(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_setIsSyncPosition(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_getMinRow(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_getCol(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_getWidth(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_setRenderCol(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_setRow(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowSpatialObjectComponent_RowSpatialObjectComponent(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_RowDataComponent_class;
extern JSObject *jsb_RowDataComponent_prototype;

JSBool js_smartfish_RowDataComponent_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_RowDataComponent_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_RowDataComponent(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_RowDataComponent_getCellSize(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowDataComponent_setRows(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowDataComponent_getRows(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowDataComponent_getCols(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowDataComponent_getOrigin(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowDataComponent_setCellSize(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowDataComponent_setCols(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowDataComponent_setOrigin(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowDataComponent_globalToLocal(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowDataComponent_localToGlobal(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowDataComponent_RowDataComponent(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_RowTransformComponent_class;
extern JSObject *jsb_RowTransformComponent_prototype;

JSBool js_smartfish_RowTransformComponent_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_RowTransformComponent_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_RowTransformComponent(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_RowTransformComponent_getRenderPosition(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowTransformComponent_getRowOffset(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowTransformComponent_setColOffset(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowTransformComponent_setRowOffset(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowTransformComponent_getColOffset(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_RowTransformComponent_RowTransformComponent(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_TouchComponent_class;
extern JSObject *jsb_TouchComponent_prototype;

JSBool js_smartfish_TouchComponent_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_TouchComponent_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_TouchComponent(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_TouchComponent_getTouchMode(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_setTouchMode(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_ccTouchBegan(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_ccTouchesCancelled(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_ccTouchesEnded(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_ccTouchCancelled(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_ccTouchEnded(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_isTouchEnabled(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_setSwallowsTouches(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_ccTouchesBegan(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_ccTouchesMoved(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_ccTouchMoved(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_getTouchPriority(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_isSwallowsTouches(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_setTouchEnabled(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_registerWithTouchDispatcher(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_setTouchPriority(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_TouchComponent_TouchComponent(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_ObjectType_class;
extern JSObject *jsb_ObjectType_prototype;

JSBool js_smartfish_ObjectType_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_ObjectType_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_ObjectType(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_ObjectType_getTypeNames(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ObjectType_overlaps(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ObjectType_getBits(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ObjectType_matches(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ObjectType_overlap(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ObjectType_add(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ObjectType_remove(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ObjectType_match(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ObjectType_createWithTypeName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_ObjectType_ObjectType(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_SFObject_class;
extern JSObject *jsb_SFObject_prototype;

JSBool js_smartfish_SFObject_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_SFObject_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_SFObject(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_SFObject_getName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SFObject_setName(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SFObject_SFObject(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_Conditional_class;
extern JSObject *jsb_Conditional_prototype;

JSBool js_smartfish_Conditional_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_Conditional_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_Conditional(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_Conditional_getOwner(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Conditional_setOwner(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Conditional_Conditional(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_Strategy_class;
extern JSObject *jsb_Strategy_prototype;

JSBool js_smartfish_Strategy_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_Strategy_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_Strategy(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_Strategy_getOwner(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Strategy_setOwner(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_Strategy_Strategy(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_StrategyContainingComponent_class;
extern JSObject *jsb_StrategyContainingComponent_prototype;

JSBool js_smartfish_StrategyContainingComponent_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_StrategyContainingComponent_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_StrategyContainingComponent(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_StrategyContainingComponent_getStrategy(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_StrategyContainingComponent_getStrategies(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_StrategyContainingComponent_add(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_StrategyContainingComponent_setOwner(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_StrategyContainingComponent_StrategyContainingComponent(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_CollisionResponseStrategy_class;
extern JSObject *jsb_CollisionResponseStrategy_prototype;

JSBool js_smartfish_CollisionResponseStrategy_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_CollisionResponseStrategy_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_CollisionResponseStrategy(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_CollisionResponseStrategy_shouldRemove(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_CollisionResponseStrategy_CollisionResponseStrategy(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_CollisionResponseComponent_class;
extern JSObject *jsb_CollisionResponseComponent_prototype;

JSBool js_smartfish_CollisionResponseComponent_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_CollisionResponseComponent_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_CollisionResponseComponent(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_CollisionResponseComponent_setRowSpatialManager(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_CollisionResponseComponent_setObjectMask(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_CollisionResponseComponent_setConditional(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_CollisionResponseComponent_setTeamId(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_CollisionResponseComponent_getTeamId(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_CollisionResponseComponent_getSpatial(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_CollisionResponseComponent_getObjectMask(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_CollisionResponseComponent_getRowSpatialManager(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_CollisionResponseComponent_setSpatial(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_CollisionResponseComponent_getConditional(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_CollisionResponseComponent_CollisionResponseComponent(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_FindingResponseStrategy_class;
extern JSObject *jsb_FindingResponseStrategy_prototype;

JSBool js_smartfish_FindingResponseStrategy_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_FindingResponseStrategy_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_FindingResponseStrategy(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_FindingResponseStrategy_shouldRemove(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_FindingResponseStrategy_FindingResponseStrategy(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_FindingResponseComponent_class;
extern JSObject *jsb_FindingResponseComponent_prototype;

JSBool js_smartfish_FindingResponseComponent_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_FindingResponseComponent_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_FindingResponseComponent(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_FindingResponseComponent_setFindingRange(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_FindingResponseComponent_setObjectMask(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_FindingResponseComponent_setConditional(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_FindingResponseComponent_getTeamId(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_FindingResponseComponent_getObjectMask(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_FindingResponseComponent_getConditional(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_FindingResponseComponent_setTeamId(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_FindingResponseComponent_FindingResponseComponent(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_IsoPoint_class;
extern JSObject *jsb_IsoPoint_prototype;

JSBool js_smartfish_IsoPoint_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_IsoPoint_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_IsoPoint(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_IsoPoint_getZ(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoPoint_getX(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoPoint_getY(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoPoint_init(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoPoint_toString(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoPoint_IsoPoint(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_IsoConfig_class;
extern JSObject *jsb_IsoConfig_prototype;

JSBool js_smartfish_IsoConfig_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_IsoConfig_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_IsoConfig(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_IsoConfig_getCellSize(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoConfig_setGridSize(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoConfig_setCellSize(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoConfig_getGridSize(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoConfig_setAnchor(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoConfig_getAnchor(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoConfig_IsoConfig(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_IsoMath_class;
extern JSObject *jsb_IsoMath_prototype;

JSBool js_smartfish_IsoMath_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_IsoMath_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_IsoMath(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_IsoMath_screenToIso(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoMath_isoToScreen(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_IsoNode_class;
extern JSObject *jsb_IsoNode_prototype;

JSBool js_smartfish_IsoNode_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_IsoNode_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_IsoNode(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_IsoNode_setContainer(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_getDepth(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_setAnchorPoint(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_getIsoZ(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_getIsoX(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_getIsoY(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_getWidth(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_setIsoZ(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_setIsoX(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_setIsoY(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_setWidth(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_setType(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_getOffsetIsoPosition(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_getLength(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_getHeight(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_getContainer(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_isWalkable(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_setOffsetIsoPosition(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_getIsoPosition(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_getType(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_setIsoPosition(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_renderLogic(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_setLength(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_setDepth(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_setHeight(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_setWalkable(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_getScreenPosition(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_getAnchorPoint(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_setSize(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_IsoNode_IsoNode(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_SceneLayoutRenderer_class;
extern JSObject *jsb_SceneLayoutRenderer_prototype;

JSBool js_smartfish_SceneLayoutRenderer_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_SceneLayoutRenderer_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_SceneLayoutRenderer(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_SceneLayoutRenderer_sortWithTarget(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SceneLayoutRenderer_place(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SceneLayoutRenderer_sortChildren(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_SceneLayoutRenderer_SceneLayoutRenderer(JSContext *cx, uint32_t argc, jsval *vp);

extern JSClass  *jsb_JSHttpRequest_class;
extern JSObject *jsb_JSHttpRequest_prototype;

JSBool js_smartfish_JSHttpRequest_constructor(JSContext *cx, uint32_t argc, jsval *vp);
void js_smartfish_JSHttpRequest_finalize(JSContext *cx, JSObject *obj);
void js_register_smartfish_JSHttpRequest(JSContext *cx, JSObject *global);
void register_all_smartfish(JSContext* cx, JSObject* obj);
JSBool js_smartfish_JSHttpRequest_setTimeout(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_JSHttpRequest_call(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_JSHttpRequest_setRequestType(JSContext *cx, uint32_t argc, jsval *vp);
JSBool js_smartfish_JSHttpRequest_JSHttpRequest(JSContext *cx, uint32_t argc, jsval *vp);
#endif

