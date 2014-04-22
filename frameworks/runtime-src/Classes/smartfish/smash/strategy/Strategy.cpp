//
// Created by Luke on 13-11-23.
//


#include "Strategy.h"
#include "spidermonkey_specifics.h"
#include "ScriptingCore.h"
#include "../core/Entity.h"
NS_SF_BEGIN
		Strategy::Strategy( ):m_Owner(NULL)
		{
			CCScriptEngineProtocol *pEngine = CCScriptEngineManager::sharedManager( )->getScriptEngine( );
			m_eScriptType = pEngine != NULL ? pEngine->getScriptType( ) : kScriptTypeNone;
		}

		Strategy::~Strategy( )
		{
//			CCLOG("~Strategy");
			this->m_Owner = NULL;
		}

		void Strategy::onAdd( )
		{
			if ( m_eScriptType == kScriptTypeJavascript )
			{
				js_proxy_t *p = jsb_get_native_proxy( this );
				jsval retval;
				jsval dataVal = INT_TO_JSVAL( 1 );
				ScriptingCore::getInstance( )->executeFunctionWithOwner( OBJECT_TO_JSVAL( p->obj ), "onAdd", 1, &dataVal, &retval );
			}
		}

		void Strategy::onRemove( )
		{
			if ( m_eScriptType == kScriptTypeJavascript )
			{
				js_proxy_t *p = jsb_get_native_proxy( this );
				jsval retval;
				jsval dataVal = INT_TO_JSVAL( 1 );
				ScriptingCore::getInstance( )->executeFunctionWithOwner( OBJECT_TO_JSVAL( p->obj ), "onRemove", 1, &dataVal, &retval );
			}
		}

		void Strategy::onTick( float dt )
		{
			if ( m_eScriptType == kScriptTypeJavascript )
			{
				js_proxy_t *p = jsb_get_native_proxy( this );
				jsval retval;
				jsval dataVal = DOUBLE_TO_JSVAL( dt );
				ScriptingCore::getInstance( )->executeFunctionWithOwner( OBJECT_TO_JSVAL( p->obj ), "onTick", 1, &dataVal, &retval );
			}
		};

		void Strategy::setOwner( Entity *value )
		{
			this->m_Owner = value;
		}

		Entity *Strategy::getOwner( )
		{
			return this->m_Owner;
		}

		bool Strategy::shouldRemove( )
		{
			if ( m_eScriptType == kScriptTypeJavascript )
			{
				js_proxy_t *p = jsb_get_native_proxy( this );
				jsval retval;
				bool bRet = false;
				jsval dataVal = INT_TO_JSVAL( 1 );
				ScriptingCore::getInstance( )->executeFunctionWithOwner( OBJECT_TO_JSVAL( p->obj ), "shouldRemove", 1, &dataVal, &retval );
				if(JSVAL_IS_BOOLEAN(retval)) {
					bRet = JSVAL_TO_BOOLEAN(retval);
				}
				return bRet;
			}
			return false;
		}

		NS_SF_END
