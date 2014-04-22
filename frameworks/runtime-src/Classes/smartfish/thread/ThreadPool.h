// Created by Luke on 13-11-14.
//



#ifndef __ThreadPool_H_
#define __ThreadPool_H_

#include "smartfishMarcos.h"
#include "ThreadMutex.h"
#include "ThreadTask.h"
#include <vector>

NS_SF_BEGIN
		class Thread;
		class ThreadPool
		{
		public:
			ThreadPool(int numThreads);
			~ThreadPool();

			void addTask(ThreadTask* task);
		private:
			ThreadMutex* s_TaskQueueMutex;
			std::vector<ThreadTask* > s_TaskQueue;
			std::vector<Thread* > threads;
			int maxConnection;
		public:
			ThreadTask* getTask();
			ThreadTask* finishTask( ThreadTask *task );
			void clearAllThread();
		private:
			Thread* createThread();
			Thread* searchThread();
		};

		NS_SF_END
#endif //__ThreadPool_H_
