//
// Created by Luke on 13-11-14.
//




#ifndef __THREAD_H_
#define __THREAD_H_

#include "smartfishMarcos.h"
#include "ThreadTask.h"

NS_SF_BEGIN
		class ThreadPool;

		class Thread
		{
		public:
			enum Status
			{
				IDLE = 0,
				BLOCKED,
				RUNNING,
				STOPED,
			};

			Thread( ThreadPool *pool );

			~Thread( );

			void wakeUp( );

			void stop( );

			bool isIdle( );

			Thread::Status const &getStatus( ) const
			{
				return mStatus;
			}

		private:
			bool initialize( );

			static void* process(void*);

		private:
			int id;
			bool need_quit;
			ThreadPool *pool;
			Status mStatus;
			ThreadTask *task;

			pthread_t s_thread;
			pthread_mutex_t s_SleepMutex;
			pthread_cond_t s_SleepCondition;
		};

		NS_SF_END
#endif //__THREAD_H_
