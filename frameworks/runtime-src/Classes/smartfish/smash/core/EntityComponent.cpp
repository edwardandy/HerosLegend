//
//  EntityComponent.cpp
//  Smash
//
//  Created by Luke on 13-3-17.
//
//

#include "EntityComponent.h"
#include "Smash.h"
#include "spidermonkey_specifics.h"
#include "ScriptingCore.h"

NS_SF_BEGIN
		EntityComponent::EntityComponent( )
		{
			mOwner = NULL;
			mName = "";
			mSafetyFlag = false;
			mSafetyStopFlag = false;
			CCScriptEngineProtocol *pEngine = CCScriptEngineManager::sharedManager( )->getScriptEngine( );
			m_eScriptType = pEngine != NULL ? pEngine->getScriptType( ) : kScriptTypeNone;
		}

		EntityComponent::~EntityComponent( )
		{
//			CCLOG("~EntityComponent:%s",mName.c_str( ));
			mOwner = NULL;
			mName = "";
			mSafetyFlag = false;
			mSafetyStopFlag = false;
		}

		std::string EntityComponent::getName( )
		{
			return mName;
		}

		void EntityComponent::setName( std::string value )
		{
			if ( mOwner != NULL)
			{
				CCAssert("false", "Already added to Entity, can't change name of EntityComponent.");
			}
			mName = value;
//			CCLOG("[EntityComponent] name:%s",mName.c_str( ));
		}

		Entity *EntityComponent::getOwner( )
		{
			return mOwner;
		}

		void EntityComponent::setOwner( smartfish::Entity *value )
		{
			mOwner = value;
		}

		void EntityComponent::doAdd( )
		{
			mSafetyFlag = false;
			onAdd( );
			if ( mSafetyFlag == false )
			{
				printf( "You forget to call super.onAdd() in an onAdd override." );
				assert(false);
			}
		}

		void EntityComponent::doRemove( )
		{
			mSafetyFlag = false;
			onRemove( );
			if ( mSafetyFlag == false )
			{
				printf( "You forget to call super.onRemove() in an onRemove handler." );
				assert(false);
			}
		}

		void EntityComponent::onAdd( )
		{
			mSafetyFlag = true;
			if ( m_eScriptType == kScriptTypeJavascript )
			{
				js_proxy_t *p = jsb_get_native_proxy( this );
				jsval retval;
				jsval dataVal = INT_TO_JSVAL( 1 );
				ScriptingCore::getInstance( )->executeFunctionWithOwner( OBJECT_TO_JSVAL( p->obj ), "onAdd", 1, &dataVal, &retval );
			}
		}

		void EntityComponent::onRemove( )
		{
			mSafetyFlag = true;
			if ( m_eScriptType == kScriptTypeJavascript )
			{
				js_proxy_t *p = jsb_get_native_proxy( this );
				jsval retval;
				jsval dataVal = INT_TO_JSVAL( 1 );
				ScriptingCore::getInstance( )->executeFunctionWithOwner( OBJECT_TO_JSVAL( p->obj ), "onRemove", 1, &dataVal, &retval );
			}
		}

		void EntityComponent::doStop( )
		{
			mSafetyStopFlag = false;
			onStop( );
			if ( mSafetyStopFlag == false )
			{
				printf( "You forget to call super.onStop() in an onStop handler." );
				assert(false);
			}
		}

		void EntityComponent::doResume( )
		{
			mSafetyStopFlag = false;
			onResume( );
			if ( mSafetyStopFlag == false )
			{
				printf( "You forget to call super.onResume() in an onResume handler." );
				assert(false);
			}
		}

		void EntityComponent::onStop( )
		{
			mSafetyStopFlag = true;
			if ( m_eScriptType == kScriptTypeJavascript )
			{
				js_proxy_t *p = jsb_get_native_proxy( this );
				jsval retval;
				jsval dataVal = INT_TO_JSVAL( 1 );
				ScriptingCore::getInstance( )->executeFunctionWithOwner( OBJECT_TO_JSVAL( p->obj ), "onStop", 1, &dataVal, &retval );
			}
		}

		void EntityComponent::onResume( )
		{
			mSafetyStopFlag = true;
			if ( m_eScriptType == kScriptTypeJavascript )
			{
				js_proxy_t *p = jsb_get_native_proxy( this );
				jsval retval;
				jsval dataVal = INT_TO_JSVAL( 1 );
				ScriptingCore::getInstance( )->executeFunctionWithOwner( OBJECT_TO_JSVAL( p->obj ), "onResume", 1, &dataVal, &retval );
			}
		}

		NS_SF_END