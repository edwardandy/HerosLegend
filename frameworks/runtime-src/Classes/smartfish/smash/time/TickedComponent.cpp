//  TickedComponent.cpp
//  Smash
//
//  Created by Luke on 13-3-20.
//
//

#include "TickedComponent.h"
#include "ProcessManager.h"
#include "spidermonkey_specifics.h"
#include "ScriptingCore.h"

NS_SF_BEGIN

		TickedComponent::TickedComponent( ):EntityComponent()
		{
			updatePriority = 0;
			registerForUpdates = false;
		}

		TickedComponent::~TickedComponent( )
		{
		}

		void TickedComponent::set_registerForUpdates( bool value )
		{
			registerForUpdates = value;
			if ( registerForUpdates )
			{
				ProcessManager::getInstance( )->addTickedObject( this, updatePriority );
			}
			else
			{
				ProcessManager::getInstance( )->removeTickedObject( this );
			}
		}

		bool TickedComponent::isRegister( )
		{
			return registerForUpdates;
		}

		void TickedComponent::onTick( float deltaTime )
		{
			if ( m_eScriptType == kScriptTypeJavascript )
			{
				js_proxy_t *p = jsb_get_native_proxy( this );
				jsval retval;
				jsval dataVal = DOUBLE_TO_JSVAL( deltaTime );
				ScriptingCore::getInstance( )->executeFunctionWithOwner( OBJECT_TO_JSVAL( p->obj ), "onTick", 1, &dataVal, &retval );
			}
		}

		void TickedComponent::onAdd( )
		{
			// This causes the component to be registerd if it isn't already.
//			CCLog( "[TickedComponent] add name:%s",this->getName( ).c_str( ) );
			if(!isRegister())
			{
				set_registerForUpdates( true );
			}
			EntityComponent::onAdd( );
		}

		void TickedComponent::onRemove( )
		{
			// Make sure we are unregistered.
			EntityComponent::onRemove( );
			if(isRegister())
			{
//				CCLog( "[TickedComponent] remove name:%s",this->getName( ).c_str( ) );
				set_registerForUpdates( false );
			}
		}

		void TickedComponent::onStop( )
		{
			if(isRegister())
			{
				set_registerForUpdates( false );
			}
			EntityComponent::onStop( );
		}

		void TickedComponent::onResume( )
		{
			if(!isRegister())
			{
				set_registerForUpdates( true );
			}
			EntityComponent::onResume( );
		}

		NS_SF_END