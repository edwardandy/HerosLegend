// Created by Luke on 13-8-29.
//
// To change the template use AppCode | Preferences | File Templates.
//



#ifndef __ObjectType_H_
#define __ObjectType_H_

#include <iostream>
#include <vector>
#include <map>
#include <string>
#include "../core/SmashMacros.h"
NS_SF_BEGIN
		class ObjectTypeNamespace
		{
		public:
			ObjectTypeNamespace( std::string name );

			~ObjectTypeNamespace( );

			unsigned int getType( std::string typeName );

			std::string getTypeName( unsigned int number );

		public:
			std::string mName;
			std::map<std::string, int> mTypeList;
			std::map<int, std::string> mBitList;
			unsigned int typeCount;
		};

		class ObjectType : public cocos2d::CCObject
		{
		public:
			ObjectType( );

			~ObjectType( );

			static ObjectType *createWithTypeName( std::string typeName );

			static ObjectType *createWithTypeName( std::string typeName, std::string typeName1 );

			static ObjectType *createWithTypeName( std::string typeName, std::string typeName1, std::string typeName2 );

			cocos2d::CCArray* getTypeNames( );

			bool match( std::string typeName );

			bool overlap( std::string typeName );

			bool matches( ObjectType *other );

			bool overlaps( ObjectType *other );

			void add( std::string typeName );

			void remove( std::string typeName );

			int getBits( );

		private:
			static std::map<std::string, ObjectTypeNamespace *> m_mNamespaces;

			static ObjectTypeNamespace *getNamespace( std::string name, bool createIfAbsent = true );

			int mBits;
			ObjectTypeNamespace *mNamespace;
		};

NS_SF_END

#endif //__ObjectType_H_
