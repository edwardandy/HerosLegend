//
// Created by Luke on 13-11-14.
//


#include <pthread.h>
#include "Thread.h"
#include "ThreadPool.h"

NS_SF_BEGIN
		static int generateId = 0;
		Thread::Thread( ThreadPool* pool )
		{
			this->mStatus   = Thread::IDLE;
			need_quit       = false;
			this->pool = pool;
			initialize( );
		}

		Thread::~Thread( )
		{
			stop( );
			this->pool = NULL;
		}

		bool Thread::initialize( )
		{
			id = generateId++;
			pthread_mutex_init( &s_SleepMutex, NULL );
			pthread_cond_init( &s_SleepCondition, NULL );
			pthread_create( &s_thread, NULL, process, (void*)this );
			pthread_detach( s_thread );
			return true;
		}

		void* Thread::process( void* param )
		{
			Thread *thread = (Thread *)param;
			while ( true )
			{
				if (thread->need_quit )
				{
					break;
				}
				thread->task = thread->pool->getTask( );
				if ( thread->task == NULL)
				{
					thread->mStatus = Thread::BLOCKED;
					pthread_cond_wait( &(thread->s_SleepCondition), &(thread->s_SleepMutex) );
					continue;
				}
				thread->mStatus = Thread::RUNNING;
//				CCLOG("thread: %d,task:%d",thread->id,thread->task->id);
				thread->task->run( );
				thread->pool->finishTask( thread->task );
				thread->task = NULL;
			}

			if ( thread->need_quit )
			{
				thread->mStatus     = Thread::STOPED;
				thread->need_quit   = false;
				pthread_mutex_destroy( &(thread->s_SleepMutex) );
				pthread_cond_destroy( &(thread->s_SleepCondition) );
				pthread_exit( NULL );
			}
			return NULL;
		}

		void Thread::wakeUp( )
		{
			if ( this->mStatus == Thread::STOPED )
			{
				initialize( );
			}
			if ( this->mStatus == Thread::BLOCKED )
			{
				pthread_cond_signal( &s_SleepCondition );
			}
		}

		void Thread::stop( )
		{
			need_quit = true;
			if ( this->mStatus == Thread::BLOCKED )
			{
				wakeUp( );
			}
		}

		bool Thread::isIdle( )
		{
			return this->mStatus != Thread::RUNNING;
		}

		NS_SF_END
