//  ProcessManager.h
//  Smash
//
//  Created by Luke on 13-3-17.
//
//

#ifndef __Smash__ProcessManager__
#define __Smash__ProcessManager__

#include <iostream>
#include <vector>
#include "cocos2d.h"
#include "../core/SmashMacros.h"

NS_SF_BEGIN
		struct ProcessObject
		{
			cocos2d::CCObject *listener;
			bool shouldRemove;
			float priority;
			std::vector<ProcessObject *> *vector;

			ProcessObject( )
			{
				shouldRemove = false;
			}

			~ProcessObject( )
			{
				vector = NULL;
				listener->release( );
				listener = NULL;
			}
		};

		class AnimatedComponent;

		class TickedComponent;

		class ProcessManager : public cocos2d::CCObject
		{
		public:
			ProcessManager( );

			virtual ~ProcessManager( );

			static ProcessManager *getInstance( );

			void set_timeScale( float value );

			float get_timeScale( );

			void initialize( );

			void destory( );

			void start( );

			void stop( );

			bool isTicking( );

			void addAnimatedObject( AnimatedComponent *object, float priority = 0.0 );

			void removeAnimatedObject( AnimatedComponent *object );

			void removeTickedObject( TickedComponent *object );

			void addTickedObject( TickedComponent *object, float priority = 0.0 );

			std::vector<ProcessObject * > animatedObjects;
			std::vector<ProcessObject * > tickedObjects;
		private:
			void addObject( CCObject *object, float priority, std::vector<ProcessObject * > &vector );

			void removeObject( void *object, std::vector<ProcessObject * > &vector );

			void advance( float deltaTime );

			static ProcessManager *mInstance;
			cocos2d::CCScheduler *m_pScheduler;

			void onFrame( float dt );

			void fireTick( );

			float virtualTime;
			float lastTime;
			float elapsed;

			bool needPurgeEmpty; //是否需要执行删除
			std::vector<ProcessObject * > needAddList;
			bool duringAdvance;
			bool started;
			/**
			 * If true, disables warnings about losing ticks.
			 */
			bool disableSlowWarning;

			/**
			 * The number of ticks that will happen every second.
			 */
			const int TICKS_PER_SECOND;
			/**
			 * The rate at which ticks are fired, in seconds.
			 */
			const float TICK_RATE;
			/**
			 * The rate at which ticks are fired, in seconds.
			 */
			const float TICK_RATE_MS;

			/**
			 * The maximum number of ticks that can be processed in a frame.
			 *
			 * <p>In some cases, a single frame can take an extremely long amount of
			 * time. If several ticks then need to be processed, a game can
			 * quickly get in a state where it has so many ticks to process
			 * it can never catch up. This is known as a death spiral.</p>
			 *
			 * <p>To prevent this we have a safety limit. Time is dropped so the
			 * system can catch up in extraordinary cases. If your game is just
			 * slow, then you will see that the ProcessManager can never catch up
			 * and you will constantly get the "too many ticks per frame" warning,
			 * if you have disableSlowWarning set to true.</p>
			 */
			const int MAX_TICKS_PER_FRAME;
		};

		NS_SF_END
#endif /* defined(__Smash__ProcessManager__) */
