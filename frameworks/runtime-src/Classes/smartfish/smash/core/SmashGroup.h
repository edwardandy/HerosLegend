//
//  SmashGroup.h
//  Smash
//
//  Created by Luke on 13-3-17.
//
//

#ifndef __Smash__SmashGroup__
#define __Smash__SmashGroup__

#include <iostream>
#include "SmashMacros.h"
#include "SmashObject.h"
#include "cocos2d.h"
NS_SF_BEGIN

		class SmashGroup : public SmashObject
		{
		public:
			SmashGroup( );

			static SmashGroup *create( std::string name );

			virtual ~SmashGroup( );

			void initialize( );

			void destory( );

			void noteAdd( SmashObject *object );

			void noteRemove( SmashObject *object );

			SmashObject *lookup( std::string name );

			cocos2d::CCArray *lookupEntities( std::string name );

			int size( );

			bool contains( SmashObject *object );

		protected:
			bool duringDestory;
			std::vector<SmashObject * > items;

		};

		NS_SF_END
#endif /* defined(__Smash__SmashGroup__) */
