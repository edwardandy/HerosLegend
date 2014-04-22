//
//  Entity.h
//  Smash
//
//  Created by Luke on 13-3-17.
//
//

#ifndef __Smash__SmashGameObject__
#define __Smash__SmashGameObject__

#include <iostream>
#include "SmashObject.h"
#include "SmashMacros.h"
#include <map>
#include "SmashGroup.h"

NS_SF_BEGIN
		class EntityComponent;

		class Entity : public smartfish::SmashObject
		{
		public:
			Entity( );

			virtual ~Entity( );

			static Entity *create( std::string name );

			/**
			 * Initialize the game object! This is done in a couple of stages.
			 *
			 * First, the SmashObject initialization is performed.
			 * Second, we look for any components in public vars on the Entity.
			 * This allows you to get at them by direct typed references instead of
			 * doing lookups. If we find any, we add them to the game object.
			 * Third, we turn off the deferring flag, so any components you've added
			 * via addComponent get initialized.
			 * Fourth, dependency injection is performed on ourselves and our components.
			 * Finally, we call applyBindings to make sure we have the latest data
			 * for any registered data bindings.
			 */
			virtual void initialize( );

			/**
			 * Removes any components on this game object, then does normal SmashObject
			 * destruction (ie, remove from any groups or sets).
			 */
			virtual void destory( );

			virtual void stop();

			virtual void resume();

			/**
			 * Add a component to the Entity. Subject to the deferring flag,
			 * the component will be initialized immediately.·
			 *
			 * If there is a public var on this Entity (ie, you've subclassed
			 * Entity) with the same name as the component has, it will be
			 * populated with a reference to the component. This way you can get
			 * typed access to components on your game objects.
			 */
			virtual void addComponent( EntityComponent *component, std::string name = "" );

			/**
			 * Remove a component from this game object.
			 */
			virtual void removeComponent( EntityComponent *component );

			virtual void removeComponentByName( std::string value );

			virtual void doInitialize( EntityComponent *component );

			/**
			 * Look up a component by name.
			 */
			EntityComponent *lookupComponent( std::string name );

			/**
			 * Look up a component by name from Entity.
			 */
			EntityComponent *lookupComponentByEntity( std::string name, std::string entityName );

			/**
			*
			* Look up a Entity by name from group
			*
			* */
			Entity *lookupEntityFromGroup( std::string name );

			/**
			 * Get a fresh Vector with references to all the components in this
			 * game object.
			 */
			std::vector<EntityComponent * > getAllComponents( );

			void setDeferring( bool value );

			bool getDeferring( );

		private:
			cocos2d::CCArray* needRemoveList;
			bool mDeferring;
			bool isDuringDeferring;
			bool isRunning;
			int teamId; //-1:opponent 1:self
			std::map<std::string, EntityComponent * > mComponents;
		public:
			int getTeamId( )
			{
				return teamId;
			}

			void setTeamId( int teamId )
			{
				Entity::teamId = teamId;
			}
		};

		NS_SF_END
#endif /* defined(__Smash__SmashGameObject__) */
