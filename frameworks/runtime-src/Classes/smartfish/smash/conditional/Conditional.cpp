//
// Created by Luke on 13-11-22.
//


#include "Conditional.h"
#include "spidermonkey_specifics.h"
#include "ScriptingCore.h"
#include "../core/Entity.h"

NS_SF_BEGIN
		Conditional::Conditional( )
		{

		}

		Conditional::~Conditional( )
		{
//			CCLOG("~Conditional");
		}

		void Conditional::setOwner( Entity *value )
		{
			this->m_Owner = value;
		}

		Entity *Conditional::getOwner( )
		{
			return this->m_Owner;
		}

		bool Conditional::isConditionalTrue( )
		{
			CCScriptEngineProtocol *pEngine = CCScriptEngineManager::sharedManager( )->getScriptEngine( );
			cocos2d::ccScriptType m_eScriptType = pEngine != NULL ? pEngine->getScriptType( ) : kScriptTypeNone;
			if ( m_eScriptType == kScriptTypeJavascript )
			{
				js_proxy_t *p = jsb_get_native_proxy( this );
				jsval retval;
				bool bRet = false;
				jsval dataVal = INT_TO_JSVAL( 1 );
				ScriptingCore::getInstance( )->executeFunctionWithOwner( OBJECT_TO_JSVAL( p->obj ), "isConditionalTrue", 1, &dataVal, &retval );
				if(JSVAL_IS_BOOLEAN(retval)) {
					bRet = JSVAL_TO_BOOLEAN(retval);
				}
				return bRet;
			}
			return false;
		}

NS_SF_END
