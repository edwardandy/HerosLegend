//
// Created by Luke on 13-11-14.
//


#include "ThreadPool.h"
#include "Thread.h"

NS_SF_BEGIN
		ThreadPool::ThreadPool( int numThreads )
		{
			maxConnection = numThreads;
			s_TaskQueueMutex = new ThreadMutex( );
		}

		ThreadPool::~ThreadPool( )
		{

		}

		Thread *ThreadPool::createThread( )
		{
			Thread *thread = new Thread( this );
			threads.push_back( thread );
			return thread;
		}

		Thread *ThreadPool::searchThread( )
		{
			Thread *freeThread = NULL;
			for ( std::vector<Thread *>::iterator it = threads.begin( ); it < threads.end( ); ++it )
			{
				Thread *thread = *it;
				if ( thread->isIdle( ) )
				{
					freeThread = thread;
					break;
				}
			}
			if ( freeThread == NULL && threads.size( ) < maxConnection )
			{
				freeThread = createThread( );
			}
			return freeThread;
		}

		void ThreadPool::addTask( ThreadTask *task )
		{
			s_TaskQueueMutex->lock( );
			s_TaskQueue.push_back( task );
			s_TaskQueueMutex->unlock( );

			Thread *freeThread = searchThread( );
			if ( freeThread != NULL)
			{
				freeThread->wakeUp( );
			}
		}

		ThreadTask *ThreadPool::getTask( )
		{
			ThreadTask *task = NULL;
			s_TaskQueueMutex->lock( );
			if ( s_TaskQueue.size( ) > 0 )
			{
				for ( std::vector<ThreadTask * >::iterator it = s_TaskQueue.begin( ); it < s_TaskQueue.end( ); ++it )
				{
					ThreadTask* temp = *it;
					if ( temp->isRunning( ) == false )
					{
						task = *it;
						task->setRunning( true );
						break;
					}
				}
			}
			s_TaskQueueMutex->unlock( );
			return task;
		}

		ThreadTask *ThreadPool::finishTask( ThreadTask *task )
		{
			s_TaskQueueMutex->lock( );
			for ( std::vector<ThreadTask * >::iterator it = s_TaskQueue.begin( ); it < s_TaskQueue.end( ); ++it )
			{
				if ( task == *it )
				{
					s_TaskQueue.erase( it );
					break;
				}
			}
			s_TaskQueueMutex->unlock( );
			return task;
		}

		void ThreadPool::clearAllThread( )
		{
			for ( std::vector<Thread * >::iterator it = threads.begin( ); it < threads.end( ); ++it )
			{
				Thread* thread = *it;
				thread->stop( );
			}
			threads.clear( );
		}

		NS_SF_END