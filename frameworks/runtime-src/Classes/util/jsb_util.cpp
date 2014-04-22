/****************************************************************************
 Copyright (c) 2013 cocos2d-x.org
 Copyright (c) 2013 James Chen
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

#include "jsb_util.h"
#include "cocos2d.h"
#include "cocos-ext.h"

#include "ToolSet.h"

#include "spidermonkey_specifics.h"
#include "ScriptingCore.h"
#include "cocos2d_specifics.hpp"

USING_NS_CC_EXT;

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
JSClass  *js_cocos2dx_ToolSet_class;
JSObject *js_cocos2dx_ToolSet_prototype;

static JSBool js_cocos2dx_extension_ToolSet_getFileContent(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	ToolSet* cobj = (ToolSet *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
    
	if (argc == 1)
    {
        const char* filename;
        
        JSString* jsFilename     = JS_ValueToString(cx, argv[0]);
        
        JSStringWrapper w1(jsFilename);
        
        filename = w1;
        
        std::string pContent = cobj->getFileContent( filename );
        jsval jsval_content  = c_string_to_jsval( cx, pContent.c_str() );
        
		JS_SET_RVAL(cx, vp, jsval_content);
        
		return JS_TRUE;
	}
    
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
    
	return JS_TRUE;
}

static JSBool js_cocos2dx_extension_ToolSet_saveFileContent(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	ToolSet* cobj = (ToolSet *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
    
	if (argc == 2)
    {
        const char* filename;
        JSString* jsFilename     = JS_ValueToString(cx, argv[0]);
        JSStringWrapper w1(jsFilename);
        filename = w1;
        
        const char* content;
        JSString* jsContent     = JS_ValueToString(cx, argv[1]);
        JSStringWrapper w2(jsContent);
        content = w2;
        
        bool result = cobj->saveFileContent( filename, content );
        
        jsval jsval_result  = int32_to_jsval( cx, result ? 1 : 0 );
        
		JS_SET_RVAL(cx, vp, jsval_result);
        
		return JS_TRUE;
	}
    
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
    
	return JS_TRUE;
}

static JSBool js_cocos2dx_extension_ToolSet_getTargetOS(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	ToolSet* cobj = (ToolSet *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
    
	if (argc == 0)
    {
        std::string targetOS = cobj->getTargetOS();
        
        jsval jsval_content  = c_string_to_jsval( cx, targetOS.c_str() );
        
		JS_SET_RVAL(cx, vp, jsval_content);
        
		return JS_TRUE;
	}
    
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
    
	return JS_TRUE;
}

JSBool js_cocos2dx_extension_ToolSet_enableStroke(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	ToolSet* cobj = (ToolSet *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
    
    if (argc == 3)
    {
        JSBool ok = JS_TRUE;
        CCNode* arg0;
        cocos2d::ccColor3B arg1;
        double arg2;

        js_proxy_t *arg0Proxy;
        JSObject *tmpObj = JSVAL_TO_OBJECT(argv[0]);
        arg0Proxy = jsb_get_js_proxy(tmpObj);
        arg0 = (cocos2d::CCNode*)(arg0Proxy ? arg0Proxy->ptr : NULL);
        
        ok &= jsval_to_cccolor3b(cx, argv[1], &arg1);
        ok &= JS_ValueToNumber(cx, argv[2], &arg2);
        JSB_PRECONDITION2(ok, cx, JS_FALSE, "Error processing arguments");
        ToolSet::getInstance()->enableStroke(arg0, arg1, arg2);
        JS_SET_RVAL(cx, vp, JSVAL_VOID);
        return JS_TRUE;
    }
    
    JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 2);
    return JS_FALSE;
}

static JSBool js_cocos2dx_extension_ToolSet_OpenLeaderboard(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	ToolSet* cobj = (ToolSet *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
    
	if (argc == 0)
    {
        bool result = cobj->openLeaderboard();
        
        jsval jsval_result  = int32_to_jsval( cx, result ? 1 : 0 );
        
		JS_SET_RVAL(cx, vp, jsval_result);
        
		return JS_TRUE;
	}
    
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
    
	return JS_TRUE;
}

static JSBool js_cocos2dx_extension_ToolSet_SendScore(JSContext *cx, uint32_t argc, jsval *vp)
{
    jsval *argv = JS_ARGV(cx, vp);
	JSObject *obj = JS_THIS_OBJECT(cx, vp);
	js_proxy_t *proxy = jsb_get_js_proxy(obj);
	ToolSet* cobj = (ToolSet *)(proxy ? proxy->ptr : NULL);
	JSB_PRECONDITION2( cobj, cx, JS_FALSE, "Invalid Native Object");
    
	if (argc == 1)
    {
        int score = JSVAL_TO_INT( argv[0] );
        
        bool result = cobj->sendScore( score );
        
        jsval jsval_result  = int32_to_jsval( cx, result ? 1 : 0 );
        
		JS_SET_RVAL(cx, vp, jsval_result);
        
		return JS_TRUE;
	}
    
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 1);
    
	return JS_TRUE;
}

static JSBool js_cocos2dx_extension_ToolSet_getInstance(JSContext *cx, uint32_t argc, jsval *vp)
{
	if (argc == 0)
    {
		ToolSet* ret = ToolSet::getInstance();
		jsval jsret;
		do {
            if (ret) {
                js_proxy_t *proxy = js_get_or_create_proxy<ToolSet>(cx, ret);
                jsret = OBJECT_TO_JSVAL(proxy->obj);
            } else {
                jsret = JSVAL_NULL;
            }
        } while (0);
		JS_SET_RVAL(cx, vp, jsret);
		return JS_TRUE;
	}
    
	JS_ReportError(cx, "wrong number of arguments: %d, was expecting %d", argc, 0);
    
	return JS_FALSE;
}


void js_cocos2dx_ToolSet_finalize(JSFreeOp *fop, JSObject *obj)
{
    CCLOGINFO("jsbindings: finalizing JS object %p (ToolSet)", obj);
}

static JSBool empty_constructor(JSContext *cx, uint32_t argc, jsval *vp) {
	return JS_FALSE;
}

void register_jsb_ToolSet(JSContext *cx, JSObject *global)
{    
    js_cocos2dx_ToolSet_class              = (JSClass *)calloc(1, sizeof(JSClass));
    js_cocos2dx_ToolSet_class->name        = "ToolSet";
    js_cocos2dx_ToolSet_class->addProperty = JS_PropertyStub;
    js_cocos2dx_ToolSet_class->delProperty = JS_PropertyStub;
    js_cocos2dx_ToolSet_class->getProperty = JS_PropertyStub;
    js_cocos2dx_ToolSet_class->setProperty = JS_StrictPropertyStub;
    js_cocos2dx_ToolSet_class->enumerate   = JS_EnumerateStub;
    js_cocos2dx_ToolSet_class->resolve     = JS_ResolveStub;
    js_cocos2dx_ToolSet_class->convert     = JS_ConvertStub;
    js_cocos2dx_ToolSet_class->finalize    = js_cocos2dx_ToolSet_finalize;
    js_cocos2dx_ToolSet_class->flags       = JSCLASS_HAS_RESERVED_SLOTS(2);
    
    static JSPropertySpec properties[] = {
		{0, 0, 0, JSOP_NULLWRAPPER, JSOP_NULLWRAPPER}
    };
    
    static JSFunctionSpec funcs[] = {
        JS_FN("getFileContent",js_cocos2dx_extension_ToolSet_getFileContent, 1, JSPROP_PERMANENT | JSPROP_ENUMERATE),
        JS_FN("saveFileContent", js_cocos2dx_extension_ToolSet_saveFileContent, 2, JSPROP_ENUMERATE | JSPROP_ENUMERATE ),
        JS_FN("getTargetOS", js_cocos2dx_extension_ToolSet_getTargetOS, 0, JSPROP_ENUMERATE | JSPROP_ENUMERATE ),
        JS_FN("enableStroke", js_cocos2dx_extension_ToolSet_enableStroke, 3, JSPROP_ENUMERATE | JSPROP_ENUMERATE ),

        JS_FS_END
    };
    
	static JSFunctionSpec st_funcs[] = {
		JS_FN("getInstance", js_cocos2dx_extension_ToolSet_getInstance, 0, JSPROP_PERMANENT | JSPROP_ENUMERATE),
		JS_FS_END
	};
    
    js_cocos2dx_ToolSet_prototype = JS_InitClass(
                                                             cx, global,
                                                             NULL,
                                                             js_cocos2dx_ToolSet_class,
                                                             empty_constructor, 0, // constructor
                                                             properties,
                                                             funcs,
                                                             NULL, // no static properties
                                                             st_funcs);
    
    // make the class enumerable in the registered namespace
    JSBool found;
    JS_SetPropertyAttributes(cx, global, "ToolSet", JSPROP_ENUMERATE | JSPROP_READONLY, &found);
    
    // add the proto and JSClass to the type->js info hash table
	TypeTest<ToolSet> t;
	js_type_class_t *p;
	uint32_t typeId = t.s_id();
	HASH_FIND_INT(_js_global_type_ht, &typeId, p);
	if (!p) {
		p = (js_type_class_t *)malloc(sizeof(js_type_class_t));
		p->type = typeId;
		p->jsclass = js_cocos2dx_ToolSet_class;
		p->proto = js_cocos2dx_ToolSet_prototype;
		p->parentProto = NULL;
		HASH_ADD_INT(_js_global_type_ht, type, p);
	}
}
