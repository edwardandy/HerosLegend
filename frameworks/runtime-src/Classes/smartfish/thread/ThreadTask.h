//
// Created by Luke on 13-11-15.
//



#include "smartfishMarcos.h"

#ifndef __ThreadTask_H_
#define __ThreadTask_H_
NS_SF_BEGIN
		class ThreadTask
		{
		public:
			int id;

			ThreadTask( );

			virtual ~ThreadTask( );

		protected:
//			int priority;
			bool b_Running;
		public:
			virtual bool isRunning( );

			virtual void setRunning( bool value );

			virtual void run( ) = 0;
		};

		NS_SF_END
#endif //__ThreadTask_H_
