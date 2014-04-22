//
//  SmashObject.cpp
//  Smash
//
//  Created by Luke on 13-3-17.
//
//

#include <assert.h>
#include "SmashObject.h"
#include "SmashGroup.h"

NS_SF_BEGIN
		SmashObject::SmashObject( )
		{

			mOwningGroup = NULL;
			mName = "SmashObject";
		}

		SmashObject::~SmashObject( )
		{
//			CCLOG("~SmashObject");
			mOwningGroup = NULL;
		}

		bool SmashObject::initWithName( std::string name )
		{
			setName( name );
			return true;
		}

		/**
		 * Called to initialize the SmashObject. The SmashObject must be in a SmashGroup
		 * before calling this (ie, set owningGroup).
		 */
		void SmashObject::initialize( )
		{
			if ( mOwningGroup == NULL)
			{
				printf( "Can't initialize a SmashObject without an owning SmashGroup!" );
				assert( false );
			}
			mActive = true;
		}

		/**
		 * Called to destroy the SmashObject: remove it from sets and groups, and do
		 * other end of life cleanup.
		 */
		void SmashObject::destory( )
		{
			// Remove from owning group.
			if ( NULL != mOwningGroup )
			{
				mOwningGroup->noteRemove( this );
				mOwningGroup = NULL;
			}
			mActive = false;
			this->autorelease( );
		}


		void SmashObject::setName( std::string value )
		{
			if ( mActive && mOwningGroup )
			{
				printf( "Cannot change SmashObject name after initialize() is called and while in a SmashGroup.\n" );
				assert(false);
			}
			mName = value;
		}

		/**
		 * Name of the SmashObject. Used for dynamic lookups and debugging.
		 */
		std::string SmashObject::getName( )
		{
			return mName;
		}


		std::string SmashObject::getAliasName( )
		{
			return mAliasName;
		}

		void SmashObject::setAliasName( std::string value )
		{
			mAliasName = value;
		}

/**
		 * The SmashGroup that contains us. All SmashObjects must be in a SmashGroup,
		 * and the owningGroup has to be set before calling initialize().
		 */
		void SmashObject::setOwningGroup( SmashGroup *group )
		{
			if ( !group )
			{
				printf( "A SmashObject must always be in a SmashGroup." );
				assert(false);
			}
			if ( mOwningGroup )
			{
				mOwningGroup->noteRemove( this );
			}
			mOwningGroup = group;
			mOwningGroup->noteAdd( this );

		}

		SmashGroup *SmashObject::getOwningGroup( )
		{
			return mOwningGroup;
		}

		NS_SF_END
