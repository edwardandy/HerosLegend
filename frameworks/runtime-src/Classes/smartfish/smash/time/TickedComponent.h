//  TickedComponent.h
//  Smash
//
//  Created by Luke on 13-3-20.
//
//

#ifndef __Smash__TickedComponent__
#define __Smash__TickedComponent__

#include <iostream>
#include "../core/EntityComponent.h"

NS_SF_BEGIN
		class TickedComponent : public EntityComponent {
		public:
			TickedComponent( );

			virtual ~TickedComponent( );

			virtual void onTick( float deltaTime );

			bool isRegister( );

			void set_registerForUpdates( bool value );

			virtual void onAdd( );

			virtual void onRemove( );

			/**
			 * The update priority for this component. Higher numbered priorities have
			 * onInterpolateTick and onTick called before lower priorities.
			 */
			float updatePriority;
		protected:
			bool registerForUpdates;
			virtual void onStop( );

			virtual void onResume( );
		};

NS_SF_END
#endif /* defined(__Smash__TickedComponent__) */
