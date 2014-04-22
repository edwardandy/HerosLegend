//
// Created by Luke on 13-12-26.
//

#include "FindingResponseStrategy.h"
#include "spidermonkey_specifics.h"
#include "ScriptingCore.h"

NS_SF_BEGIN
		FindingResponseStrategy::FindingResponseStrategy( ):Strategy()
		{

		}

		FindingResponseStrategy::~FindingResponseStrategy( )
		{

		}

		void FindingResponseStrategy::onFind( cocos2d::CCArray *collidingObjects )
		{
			if (m_eScriptType == kScriptTypeJavascript)
			{
				js_proxy_t * p = jsb_get_native_proxy(this);
				jsval retval;
				JSContext* cx = ScriptingCore::getInstance()->getGlobalContext();
				jsval dataVal = ccarray_to_jsval(cx,collidingObjects);
				ScriptingCore::getInstance()->executeFunctionWithOwner(OBJECT_TO_JSVAL(p->obj), "onFind", 1, &dataVal, &retval);
			}
		}

		void FindingResponseStrategy::onTick( float dt )
		{
			Strategy::onTick( dt );
		}

		bool FindingResponseStrategy::shouldRemove( )
		{
			return Strategy::shouldRemove( );
		}

		NS_SF_END