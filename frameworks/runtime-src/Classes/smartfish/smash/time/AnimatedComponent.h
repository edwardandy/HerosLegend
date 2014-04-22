//  AnimatedComponent.h
//  Smash
//
//  Created by Luke on 13-3-20.
//
//

#ifndef __Smash__AnimatedComponent__
#define __Smash__AnimatedComponent__

#include <iostream>
#include "../core/SmashMacros.h"
#include "../core/EntityComponent.h"

NS_SF_BEGIN
		class AnimatedComponent : public EntityComponent {
		public:
			AnimatedComponent( );

			virtual ~AnimatedComponent( );

			bool isRegister( );

			void set_registerForUpdates( bool value );

			virtual void onFrame( float deltaTime );

			virtual void onAdd( );

			virtual void onRemove( );

			/**
			 * The update priority for this component. Higher numbered priorities have
			 * onInterpolateTick and onTick called before lower priorities.
			 */
			float updatePriority;
		private:
			bool registerForUpdates;
		protected:
			virtual void onStop( );

			virtual void onResume( );
		};

NS_SF_END
#endif /* defined(__Smash__AnimatedComponent__) */
