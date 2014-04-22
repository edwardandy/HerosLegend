// Created by Luke on 13-8-30.
//
// To change the template use AppCode | Preferences | File Templates.
//



#ifndef __StrategyContainingComponent_H_
#define __StrategyContainingComponent_H_

#include <iostream>
#include <vector>
#include "../time/TickedComponent.h"
#include "../core/SmashMacros.h"

NS_SF_BEGIN
		USING_NS_CC;
		class Strategy;
		class StrategyContainingComponent : public smartfish::TickedComponent
		{
		public:
			StrategyContainingComponent( );

			virtual ~StrategyContainingComponent( );

			virtual void onTick( float deltaTime );

			virtual void add( Strategy *strategy ,std::string name);
			virtual Strategy * getStrategy( std::string name);

			CCArray* getStrategies();
		protected:
			CCArray* m_vStrategies;
			virtual void updateTime( float dt );

		public:
			virtual void setOwner( Entity *value );

			virtual void onAdd( );

			virtual void onRemove( );

		protected:
			virtual void onStop( );

			virtual void onResume( );
		};

NS_SF_END

#endif //__StrategyContainingComponent_H_
