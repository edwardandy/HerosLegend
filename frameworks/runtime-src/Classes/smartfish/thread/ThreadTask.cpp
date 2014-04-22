// Created by Luke on 13-11-15.
//
#include "smartfishMarcos.h"
#include "ThreadTask.h"

NS_SF_BEGIN
		ThreadTask::ThreadTask( )
		{
			b_Running = false;
		}

		ThreadTask::~ThreadTask( )
		{

		}

		bool ThreadTask::isRunning( )
		{
			return b_Running;
		}
		void ThreadTask::setRunning( bool value )
		{
			b_Running = value;
		}

NS_SF_END