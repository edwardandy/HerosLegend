// Created by Luke on 13-11-22.
//



#ifndef __CollisionResponseStrategy_H_
#define __CollisionResponseStrategy_H_

#include "Strategy.h"

NS_SF_BEGIN
		class CollisionResponseStrategy : public Strategy
		{
		public:
			CollisionResponseStrategy( );

			~CollisionResponseStrategy( );

			void onCollision( cocos2d::CCArray *collidingObjects );

			virtual void onTick( float dt );

			virtual bool shouldRemove( );
		};

		NS_SF_END

#endif //__CollisionResponseStrategy_H_
