// Created by Luke on 13-11-17.
//

#ifndef __ThreadTest_H_
#define __ThreadTest_H_

#include "smartfishMarcos.h"
#include "ThreadPool.h"

USING_NS_SF;

class ThreadTest
{
public:
	ThreadTest();
	~ThreadTest();
private:

};

class ThreadTaskTest : public ThreadTask
{
public:
	ThreadTaskTest(int id);
	~ThreadTaskTest();
	void run();
private:
};

#endif //__ThreadTest_H_
