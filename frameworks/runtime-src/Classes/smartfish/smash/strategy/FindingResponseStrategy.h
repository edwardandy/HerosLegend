//
// Created by Luke on 13-12-26.
//


#ifndef __FindingResponseStrategy_H_
#define __FindingResponseStrategy_H_

#include "Strategy.h"

NS_SF_BEGIN
		class FindingResponseStrategy : public Strategy
		{
		public:
			FindingResponseStrategy( );

			~FindingResponseStrategy( );

			void onFind( cocos2d::CCArray *collidingObjects );

			virtual void onTick( float dt );

			virtual bool shouldRemove( );
		};

		NS_SF_END

#endif //__FindingResponseStrategy_H_
