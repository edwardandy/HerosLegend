//
// Created by Luke on 13-11-14.
//

#include <iostream>
#include "ThreadMutex.h"
#include "smartfishMarcos.h"

NS_SF_BEGIN
ThreadMutex::ThreadMutex() {
	if (pthread_mutex_init(&m_threadMutex,NULL)) {
		std::cout << "init ThreadMutex failed!" << std::endl;
	}
}
ThreadMutex::~ThreadMutex() {
	if (pthread_mutex_destroy(&m_threadMutex)){
		std::cout << "destroy ThreadMutex failed!" << std::endl;
	}
}

pthread_mutex_t* ThreadMutex::get_mutex() {
	return &m_threadMutex;
}
void ThreadMutex::lock() {
	if (pthread_mutex_lock(&m_threadMutex))
	{
		std::cout << "lock failed!" << std::endl;
	}
}
void ThreadMutex::unlock() {
	if (pthread_mutex_unlock(&m_threadMutex))
	{
		std::cout << "unlock failed!" << std::endl;
	}
}

		NS_SF_END