//
// Created by Luke on 13-11-17.
//


#include "ThreadTest.h"
#include "cocos2d.h"

ThreadTest::ThreadTest( )
{
	ThreadPool *pool = new ThreadPool( 4 );
	for ( int i = 0; i < 10; i++ )
	{
		if(i>=4)
		{
			sleep( 1 );
		}
		ThreadTaskTest *task = new ThreadTaskTest( i );
		pool->addTask( task );
	}
	sleep(5);
	pool->clearAllThread();
}

ThreadTest::~ThreadTest( )
{

}

ThreadTaskTest::ThreadTaskTest( int id )
{
	this->id = id;
}

ThreadTaskTest::~ThreadTaskTest( )
{

}

void ThreadTaskTest::run( )
{
//	for(int i =0 ;i<1;i++)
//	{
//		cocos2d::CCLog( "%d===== gogogo ==== " ,id);
//	}
	sleep( 2 );
}
