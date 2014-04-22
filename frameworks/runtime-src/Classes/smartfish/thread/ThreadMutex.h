//
// Created by Luke on 13-11-14.
//



#ifndef __ThreadMutex_H_
#define __ThreadMutex_H_

#include "smartfishMarcos.h"
#include <pthread.h>

NS_SF_BEGIN
class ThreadMutex
{
public:
	ThreadMutex( );

	virtual ~ThreadMutex( );

	virtual pthread_mutex_t *get_mutex( );

	virtual void lock( );

	virtual void unlock( );

private:
	pthread_mutex_t m_threadMutex;
};

		NS_SF_END

#endif //__ThreadMutex_H_
