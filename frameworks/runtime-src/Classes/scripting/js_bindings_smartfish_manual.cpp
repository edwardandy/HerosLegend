//
// Created by Luke on 13-11-3.
//


#include "js_bindings_smartfish_manual.h"
#include "ScriptingCore.h"
#include "jsb_smartfish_extension_auto.hpp"
#include "cocos2d_specifics.hpp"
#include "JSHttpRequest.h"
#include "DisplayObjectRenderer.h"
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// JSHttpRequestWrapper /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

class JSHttpRequestWrapper : public JSCallbackWrapper
{
public:
	JSHttpRequestWrapper( );

	virtual ~JSHttpRequestWrapper( );

	virtual void setJSCallbackThis( jsval jsThisObj );

	virtual void responseCallbackFunc( bool result, std::string data );

private:
	bool m_bNeedUnroot;
};

JSHttpRequestWrapper::JSHttpRequestWrapper( )
: m_bNeedUnroot( false )
{

}

JSHttpRequestWrapper::~JSHttpRequestWrapper( )
{
	CCLog( "~JSHttpRequestWrapper m_bNeedUnroot:%d",m_bNeedUnroot );
	if ( m_bNeedUnroot )
	{
		JSObject *thisObj = JSVAL_TO_OBJECT( jsThisObj );
		JSContext *cx = ScriptingCore::getInstance( )->getGlobalContext( );
		JS_RemoveObjectRoot( cx, &thisObj );
	}
}

void JSHttpRequestWrapper::setJSCallbackThis( jsval jsThisObj )
{
	JSCallbackWrapper::setJSCallbackThis(jsThisObj);
	JSObject *thisObj = JSVAL_TO_OBJECT(jsThisObj);
	js_proxy *p = jsb_get_js_proxy(thisObj);
	if (!p)
	{
		JSContext *cx = ScriptingCore::getInstance()->getGlobalContext();
		//TODO 此处添加这段代码会引起GC CRASH
//		JS_AddObjectRoot(cx, &thisObj);
		m_bNeedUnroot = true;
	}
}

void JSHttpRequestWrapper::responseCallbackFunc( bool result, std::string data )
{
	JSContext *cx = ScriptingCore::getInstance( )->getGlobalContext( );
	JSObject *thisObj = JSVAL_IS_VOID( jsThisObj ) ? NULL : JSVAL_TO_OBJECT( jsThisObj );
	jsval retval;
	if ( jsCallback != JSVAL_VOID )
	{
		jsval params = c_string_to_jsval( cx, data.c_str( ) );
		jsval isSuccess = BOOLEAN_TO_JSVAL( result ? JS_TRUE : JS_FALSE);
		jsval valArr[2];
		valArr[ 0 ] = isSuccess;
		valArr[ 1 ] = params;

		JS_AddValueRoot( cx, valArr );
		JS_CallFunctionValue( cx, thisObj, jsCallback, 2, valArr, &retval );
		JS_RemoveValueRoot( cx, valArr );
	}
}

static JSBool js_JSHttpRequest_setResponseCallbackFunc( JSContext *cx, uint32_t argc, jsval *vp )
{
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy( obj );
	smartfish::JSHttpRequest *cobj = ( smartfish::JSHttpRequest * ) ( proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");

	if ( argc == 2 )
	{
		jsval *argv = JS_ARGV(cx, vp);

		JSHttpRequestWrapper *tmpObj = new JSHttpRequestWrapper( );
		tmpObj->setJSCallbackFunc( argv[ 0 ] );
		tmpObj->setJSCallbackThis( argv[ 1 ] );
		cobj->setResponseCallback( tmpObj, response_selector(JSHttpRequestWrapper::responseCallbackFunc) );
		tmpObj->release();
		return JS_TRUE;
	}
	JS_ReportError( cx, "Invalid number of arguments" );
	return JS_FALSE;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////// retain && release ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

JSBool js_ccobject_retain( JSContext *cx, uint32_t argc, jsval *vp )
{
	JSObject *thisObj = JS_THIS_OBJECT(cx, vp);
	if ( thisObj )
	{
		js_proxy_t *proxy = jsb_get_js_proxy( thisObj );
		if ( proxy )
		{
			( ( CCObject * ) proxy->ptr )->retain( );
			return JS_TRUE;
		}
	}
	JS_ReportError( cx, "Invalid Native Object." );
	return JS_FALSE;
}

JSBool js_ccobject_release( JSContext *cx, uint32_t argc, jsval *vp )
{
	JSObject *thisObj = JS_THIS_OBJECT(cx, vp);
	if ( thisObj )
	{
		js_proxy_t *proxy = jsb_get_js_proxy( thisObj );
		if ( proxy )
		{
			( ( CCObject * ) proxy->ptr )->release( );
			return JS_TRUE;
		}
	}
	JS_ReportError( cx, "Invalid Native Object." );
	return JS_FALSE;
}

JSBool js_smartfish_DisplayObjectRenderer_setPosition(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	JSBool ok = JS_TRUE;
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	smartfish::DisplayObjectRenderer* cobj = (smartfish::DisplayObjectRenderer *)(proxy ? proxy->ptr : NULL);
	TEST_NATIVE_OBJECT(cx, cobj)

	if (argc == 1) {
		cocos2d::CCPoint arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->setPosition(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	} if (argc == 2) {
		double x;
		ok &= JS_ValueToNumber(cx, argv[0], &x );
		double y;
		ok &= JS_ValueToNumber(cx, argv[1], &y );

		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->setPosition(CCPoint(x,y));
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return JS_FALSE;
}

JSBool js_smartfish_DisplayObjectRenderer_setOffsetPosition(JSContext *cx, uint32_t argc, jsval *vp)
{
	jsval *argv = JS_ARGV(cx, vp);
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	JSBool ok = JS_TRUE;
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	smartfish::DisplayObjectRenderer* cobj = (smartfish::DisplayObjectRenderer *)(proxy ? proxy->ptr : NULL);
	TEST_NATIVE_OBJECT(cx, cobj)

	if (argc == 1) {
		cocos2d::CCPoint arg0;
		ok &= jsval_to_ccpoint(cx, argv[0], &arg0);
		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->setOffsetPosition(arg0);
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	} if (argc == 2) {
		double x;
		ok &= JS_ValueToNumber(cx, argv[0], &x );
		double y;
		ok &= JS_ValueToNumber(cx, argv[1], &y );

		JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
		cobj->setOffsetPosition(CCPoint(x,y));
		JS_SET_RVAL(cx, vp, JSVAL_VOID);
		return JS_TRUE;
	}
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
	return JS_FALSE;
}

JSBool js_smartfish_doNothing( JSContext *cx, uint32_t argc, jsval *vp ) {
	return JS_TRUE;
}

void register_smartfish_js_extensions( JSContext *cx, JSObject *global )
{
	// first, try to get the ns
	jsval nsval;
	JSObject *ns;
	JS_GetProperty( cx, global, "iso", &nsval );
	if ( nsval == JSVAL_VOID )
	{
		ns = JS_NewObject( cx, NULL, NULL, NULL );
		nsval = OBJECT_TO_JSVAL( ns );
		JS_SetProperty( cx, global, "iso", &nsval );
	} else
	{
		JS_ValueToObject( cx, nsval, &ns );
	}

	//smartfish
	JS_DefineFunction( cx, jsb_SFObject_prototype, "retain", js_ccobject_retain, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_SFObject_prototype, "release", js_ccobject_release, 0, JSPROP_READONLY | JSPROP_PERMANENT);

	//isometric
	JS_DefineFunction( cx, jsb_IsoNode_prototype, "retain", js_ccobject_retain, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_IsoNode_prototype, "release", js_ccobject_release, 0, JSPROP_READONLY | JSPROP_PERMANENT);

	JS_DefineFunction( cx, jsb_SceneLayoutRenderer_prototype, "retain", js_ccobject_retain, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_SceneLayoutRenderer_prototype, "release", js_ccobject_release, 0, JSPROP_READONLY | JSPROP_PERMANENT);

	JS_DefineFunction( cx, jsb_IsoPoint_prototype, "retain", js_ccobject_retain, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_IsoPoint_prototype, "release", js_ccobject_release, 0, JSPROP_READONLY | JSPROP_PERMANENT);

	JS_DefineFunction( cx, jsb_IsoMath_prototype, "retain", js_ccobject_retain, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_IsoMath_prototype, "release", js_ccobject_release, 0, JSPROP_READONLY | JSPROP_PERMANENT);

	JS_DefineFunction( cx, jsb_IsoConfig_prototype, "retain", js_ccobject_retain, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_IsoConfig_prototype, "release", js_ccobject_release, 0, JSPROP_READONLY | JSPROP_PERMANENT);

	//smash
	//this function is protected in C/C++,so we need to do nothing.
	JS_DefineFunction( cx, jsb_EntityComponent_prototype, "onAdd", js_smartfish_doNothing, 1, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_EntityComponent_prototype, "onRemove", js_smartfish_doNothing, 1, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_EntityComponent_prototype, "onStop", js_smartfish_doNothing, 1, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_EntityComponent_prototype, "onResume", js_smartfish_doNothing, 1, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_CollisionResponseStrategy_prototype, "onCollision", js_smartfish_doNothing, 1, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_FindingResponseStrategy_prototype, "onFind", js_smartfish_doNothing, 1, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_AnimatedComponent_prototype, "onFrame", js_smartfish_doNothing, 1, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_TickedComponent_prototype, "onTick", js_smartfish_doNothing, 1, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_Strategy_prototype, "onTick", js_smartfish_doNothing, 1, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_Strategy_prototype, "onAdd", js_smartfish_doNothing, 1, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_Strategy_prototype, "onRemove", js_smartfish_doNothing, 1, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_Strategy_prototype, "shouldRemove", js_smartfish_doNothing, 1, JSPROP_ENUMERATE  | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_Conditional_prototype, "isConditionalTrue", js_smartfish_doNothing, 1, JSPROP_ENUMERATE  | JSPROP_PERMANENT);

	JS_DefineFunction( cx, jsb_SmashObject_prototype, "retain", js_ccobject_retain, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_SmashObject_prototype, "release", js_ccobject_release, 0, JSPROP_READONLY | JSPROP_PERMANENT);

	JS_DefineFunction( cx, jsb_ObjectType_prototype, "retain", js_ccobject_retain, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_ObjectType_prototype, "release", js_ccobject_release, 0, JSPROP_READONLY | JSPROP_PERMANENT);

	JS_DefineFunction( cx, jsb_EntityComponent_prototype, "retain", js_ccobject_retain, 0, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction( cx, jsb_EntityComponent_prototype, "release", js_ccobject_release, 0, JSPROP_READONLY | JSPROP_PERMANENT);

	JS_DefineFunction(cx, jsb_DisplayObjectRenderer_prototype, "setPosition", js_smartfish_DisplayObjectRenderer_setPosition, 1, JSPROP_READONLY | JSPROP_PERMANENT);
	JS_DefineFunction(cx, jsb_DisplayObjectRenderer_prototype, "setOffsetPosition", js_smartfish_DisplayObjectRenderer_setOffsetPosition, 1, JSPROP_READONLY | JSPROP_PERMANENT);

	//http
	JS_DefineFunction( cx, jsb_JSHttpRequest_prototype, "setResponseCallback", js_JSHttpRequest_setResponseCallbackFunc, 2, JSPROP_READONLY | JSPROP_PERMANENT);
}