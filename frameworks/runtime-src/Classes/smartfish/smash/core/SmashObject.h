//
//  SmashObject.h
//  Smash
//
//  Created by Luke on 13-3-17.
//
//

#ifndef __Smash__SmashObject__
#define __Smash__SmashObject__

#include <iostream>
#include "SmashMacros.h"
#include <vector>

NS_SF_BEGIN

		class SmashSet;

		class SmashGroup;

		class SmashObject : public cocos2d::CCObject
		{
		public:
			SmashObject( );

			virtual bool initWithName( std::string name );

			virtual ~SmashObject( );

			std::string getName( );

			void setName( std::string value );

			std::string getAliasName( );

			void setAliasName( std::string value );

			SmashGroup *getOwningGroup( );

			void setOwningGroup( SmashGroup *group );

			virtual void initialize( );

			virtual void destory( );

		protected:
			std::string mName;
			std::string mAliasName;
			bool mActive;
			SmashGroup *mOwningGroup;
		};

		NS_SF_END
#endif /* defined(__Smash__SmashObject__) */
