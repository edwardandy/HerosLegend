//  AnimatedComponent.cpp
//  Smash
//
//  Created by Luke on 13-3-20.
//
//

#include "AnimatedComponent.h"
#include "ProcessManager.h"
#include "spidermonkey_specifics.h"
#include "ScriptingCore.h"

NS_SF_BEGIN
		AnimatedComponent::AnimatedComponent( ):EntityComponent()
		{
			updatePriority = 0;
			registerForUpdates = false;
		}

		AnimatedComponent::~AnimatedComponent( )
		{

		}

		void AnimatedComponent::set_registerForUpdates( bool value )
		{
			registerForUpdates = value;
			if ( registerForUpdates )
			{
				ProcessManager::getInstance( )->addAnimatedObject( this, updatePriority );
			}
			else
			{
				ProcessManager::getInstance( )->removeAnimatedObject( this );
			}
		}

		bool AnimatedComponent::isRegister( )
		{
			return registerForUpdates;
		}

		void AnimatedComponent::onFrame( float deltaTime )
		{
			if (m_eScriptType == kScriptTypeJavascript)
			{
				js_proxy_t * p = jsb_get_native_proxy(this);
				jsval retval;
				jsval dataVal = DOUBLE_TO_JSVAL(deltaTime);
				ScriptingCore::getInstance()->executeFunctionWithOwner(OBJECT_TO_JSVAL(p->obj), "onFrame", 1, &dataVal, &retval);
			}
		}

		void AnimatedComponent::onAdd( )
		{
			EntityComponent::onAdd( );
			// This causes the component to be registerd if it isn't already.
			set_registerForUpdates(true);
		}

		void AnimatedComponent::onRemove( )
		{
			// Make sure we are unregistered.
			EntityComponent::onRemove( );
			if(isRegister())
			{
				set_registerForUpdates( false );
			}
		}

		void AnimatedComponent::onStop( )
		{
			if(isRegister())
			{
				set_registerForUpdates( false );
			}
			EntityComponent::onStop( );
		}

		void AnimatedComponent::onResume( )
		{
			set_registerForUpdates( true );
			EntityComponent::onResume( );
		}

		NS_SF_END