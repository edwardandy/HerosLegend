//
// Created by Luke on 13-11-22.
//


#include "CollisionResponseStrategy.h"
#include "spidermonkey_specifics.h"
#include "ScriptingCore.h"

NS_SF_BEGIN
		CollisionResponseStrategy::CollisionResponseStrategy( ):Strategy()
		{

		}

		CollisionResponseStrategy::~CollisionResponseStrategy( )
		{

		}

		void CollisionResponseStrategy::onCollision( cocos2d::CCArray *collidingObjects )
		{
			if (m_eScriptType == kScriptTypeJavascript)
			{
				js_proxy_t * p = jsb_get_native_proxy(this);
				jsval retval;
				JSContext* cx = ScriptingCore::getInstance()->getGlobalContext();
				jsval dataVal = ccarray_to_jsval(cx,collidingObjects);
				ScriptingCore::getInstance()->executeFunctionWithOwner(OBJECT_TO_JSVAL(p->obj), "onCollision", 1, &dataVal, &retval);
			}
		}

		void CollisionResponseStrategy::onTick( float dt )
		{
			Strategy::onTick( dt );
		}

		bool CollisionResponseStrategy::shouldRemove( )
		{
			return Strategy::shouldRemove( );
		}

		NS_SF_END