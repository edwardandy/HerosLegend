// Created by Luke on 13-8-29.
//
// To change the template use AppCode | Preferences | File Templates.
//


#include "ObjectType.h"

NS_SF_BEGIN
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////// ObjectType /////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		std::map<std::string, ObjectTypeNamespace *> ObjectType::m_mNamespaces;

		ObjectType::ObjectType( )
		{
			mBits = 0;
			mNamespace = ObjectType::getNamespace( "global", true );
		}

		ObjectType::~ObjectType( )
		{

		}


		ObjectType *ObjectType::createWithTypeName( std::string typeName )
		{
			ObjectType *objectType = new ObjectType( );
			objectType->add( typeName );
			return objectType;
		}

		ObjectType *ObjectType::createWithTypeName( std::string typeName, std::string typeName1 )
		{
			ObjectType *objectType = new ObjectType( );
			objectType->add( typeName );
			objectType->add( typeName1 );
			return objectType;
		}

		ObjectType *ObjectType::createWithTypeName( std::string typeName, std::string typeName1, std::string typeName2 )
		{
			ObjectType *objectType = new ObjectType( );
			objectType->add( typeName );
			objectType->add( typeName1 );
			objectType->add( typeName2 );
			return objectType;
		}

		cocos2d::CCArray *ObjectType::getTypeNames( )
		{
			cocos2d::CCArray *array = cocos2d::CCArray::create( );
			for ( int i = 0; i < mNamespace->typeCount; i++ )
			{
				if ( mBits & ( 1 << i ) )
				{
					cocos2d::CCString *string = cocos2d::CCString::create( mNamespace->getTypeName( 1 << i ) );
					array->addObject( string );
				}
			}
			return array;
		}

		bool ObjectType::match( std::string typeName )
		{
			if ( mNamespace->mTypeList.find( typeName ) != mNamespace->mTypeList.end( ) )
			{
				int t = mNamespace->mTypeList[ typeName ];
				return mBits == 1 << t;
			}
			return false;
		}

		bool ObjectType::overlap( std::string typeName )
		{
			if ( mNamespace->mTypeList.find( typeName ) != mNamespace->mTypeList.end( ) )
			{
				int t = mNamespace->mTypeList[ typeName ];
				return ( mBits & ( 1 << t ) ) != 0;
			}
			return false;
		}

		bool ObjectType::matches( ObjectType *other )
		{
			return mBits == other->getBits( );
		}

		bool ObjectType::overlaps( ObjectType *other )
		{
			if ( !other )
				return false;

			return ( mBits & other->getBits( ) ) != 0;
		}

		void ObjectType::add( std::string typeName )
		{
			mBits |= mNamespace->getType( typeName );
		}

		void ObjectType::remove( std::string typeName )
		{
			mBits &= ( 0xFFFFFFFF - mNamespace->getType( typeName ) );
		}

		int ObjectType::getBits( )
		{
			return mBits;
		}

		ObjectTypeNamespace *ObjectType::getNamespace( std::string name, bool createIfAbsent )
		{
			if ( createIfAbsent )
			{
				if ( m_mNamespaces.find( name ) == m_mNamespaces.end( ) )
				{
					m_mNamespaces[ name ] = new ObjectTypeNamespace( name );
				}

				return m_mNamespaces[ name ];
			}
			else
			{
				if ( m_mNamespaces.find( name ) != m_mNamespaces.end( ) )
				{
					return m_mNamespaces[ name ];
				}
				else
				{
					return NULL;
				}
			}
		}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// ObjectTypeNamespace ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		ObjectTypeNamespace::ObjectTypeNamespace( std::string name )
		{
			mName = name;
			typeCount = 0;
			mTypeList.clear( );
			mBitList.clear( );
		}

		ObjectTypeNamespace::~ObjectTypeNamespace( )
		{
			mTypeList.clear( );
			mBitList.clear( );
		}

		unsigned int ObjectTypeNamespace::getType( std::string typeName )
		{

			if ( mTypeList.find( typeName ) == mTypeList.end( ) )
			{
				if ( typeCount == 64 )
				{
					printf( "[ObjectTypeNamespace] Only 64 unique object types can be created." );
					return 0;
				}
				mTypeList[ typeName ] = typeCount;
				int index = 1 << typeCount;
				mBitList[ index ] = typeName;
				typeCount++;
			}

			return 1 << mTypeList[ typeName ];
		}

		std::string ObjectTypeNamespace::getTypeName( unsigned int number )
		{
			if ( mBitList.find( number ) != mBitList.end( ) )
			{
				return mBitList[ number ];
			}
			return "";
		}

		NS_SF_END