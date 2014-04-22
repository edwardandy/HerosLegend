//
//  SmashGroup.cpp
//  Smash
//
//  Created by Luke on 13-3-17.
//
//

#include "SmashGroup.h"
#include "Smash.h"

NS_SF_BEGIN
		SmashGroup::SmashGroup( ):SmashObject( )
		{
			duringDestory = false;
		}

		smartfish::SmashGroup *SmashGroup::create( std::string name )
		{
			SmashGroup *group = new SmashGroup( );
			if ( group->initWithName( name ) )
			{
				group->autorelease( );
				group->initialize( );
			}
			return group;
		}

		SmashGroup::~SmashGroup( )
		{
			for ( std::vector<SmashObject * >::iterator iter = items.begin( ); iter != items.end( ); )
			{
				if ( *iter )
				{
					SmashObject *p = *iter;
					iter = items.erase( iter );
					delete p;
				}
				else
				{
					iter++;
				}
			}
			items.clear( );
		}

		void SmashGroup::initialize( )
		{
			if ( getOwningGroup( ) == NULL)
			{
				setOwningGroup( Smash::getRootGroup() );
			}
			SmashObject::initialize( );
		}

		void SmashGroup::destory( )
		{
			duringDestory = true;
//			CCLog( "items.count:%d",items.size( ) );
			for ( std::vector<SmashObject *>::iterator it = items.begin( ); it != items.end( ); ++it )
			{
				SmashObject *smashObject = *it;
				if ( smashObject)
				{
//					CCLog( "smashObject's name:%s",smashObject->getName( ).c_str( ) );
					smashObject->destory( );
				}
				else{
					CCLOG("smashObject is null");
				}
			}
			items.clear( );
			SmashObject::destory( );
		}

		void SmashGroup::noteRemove( smartfish::SmashObject *object )
		{
			for ( std::vector<SmashObject * >::iterator iter = items.begin( ); iter != items.end( ); /*++iter*/)
			{
				if ( object == *iter && !duringDestory)
				{
					iter = items.erase( iter );
				}
				else
				{
					iter++;
				}
			}
		}

		void SmashGroup::noteAdd( smartfish::SmashObject *object )
		{
			if(!duringDestory)
			{
				items.push_back( object );
			}
		}

		int SmashGroup::size( )
		{
			return items.size( );
		}

		/**
		 * Does this SmashGroup directly contain the specified object?
		 */
		bool SmashGroup::contains( smartfish::SmashObject *object )
		{
			return ( object->getOwningGroup( ) == this );
		}

		smartfish::SmashObject *SmashGroup::lookup( std::string name )
		{
			for ( std::vector<smartfish::SmashObject * >::iterator iter = items.begin( ); iter != items.end( ); ++iter )
			{
				smartfish::SmashObject *object = *iter;
				if ( name.compare( object->getName( ) ) == 0  || name.compare( object->getAliasName( ) ) == 0)
				{
					return *iter;
				}
			}
			printf( "lookup failed! Entity by the name: %s does not exist\n",name.c_str( ) );
			return NULL;
		}


		CCArray *SmashGroup::lookupEntities( std::string name )
		{
			CCArray* array = CCArray::create( );
			for ( std::vector<smartfish::SmashObject * >::iterator iter = items.begin( ); iter != items.end( ); ++iter )
			{
				smartfish::SmashObject *object = *iter;
				if ( name.compare( object->getName( ) ) == 0  || name.compare( object->getAliasName( ) ) == 0)
				{
					array->addObject( object );
				}
			}
			return array;
		}

		NS_SF_END
