//
//  EntityComponent.h
//  Smash
//
//  Created by Luke on 13-3-17.
//
//

#ifndef __Smash__SmashComponent__
#define __Smash__SmashComponent__

#include <iostream>
#include "SmashMacros.h"
#include "Entity.h"
#include <vector>

NS_SF_BEGIN

		class EntityComponent : public cocos2d::CCObject
		{
		public:
			EntityComponent( );

			virtual ~EntityComponent( );

			std::string getName( );

			void setName( std::string value );

			/**
			 * What Entity contains us, if any?
			 */
			virtual Entity *getOwner( );

			virtual void setOwner( Entity *value );

			void doAdd( );

			void doRemove( );

			virtual void doStop();

			virtual void doResume();

		private:
			bool mSafetyFlag;
			bool mSafetyStopFlag;
			std::string mName;
		protected:
			Entity *mOwner;
			cocos2d::ccScriptType m_eScriptType;         ///< type of script binding, lua or javascript
			/**
			 * Called when component is added to a Entity. Do component setup
			 * logic here.
			 */
			virtual void onAdd( );

			/**
			 * Called when component is removed frmo a Entity. Do component
			 * teardown logic here.
			 */
			virtual void onRemove( );


			virtual void onStop();

			virtual void onResume();


		};

		NS_SF_END
#endif /* defined(__Smash__SmashComponent__) */
