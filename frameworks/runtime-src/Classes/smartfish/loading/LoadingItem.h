// Created by Luke on 13-11-18.
//



#ifndef __LOADINGITEM_H_
#define __LOADINGITEM_H_

#include "smartfishMarcos.h"
#include "ThreadTask.h"
#include "LoaderMax.h"
NS_SF_BEGIN
		USING_NS_SF;

		class LoadingItem : public ThreadTask
		{
		public:
			LoadingItem( HttpRequestPacket *packet, LoaderMax *loaderMax );

			virtual ~LoadingItem( );

			virtual void run( );

		protected:
			HttpRequestPacket *m_Packet;
			LoaderMax *m_LoaderMax;
		};

NS_SF_END

#endif //__LOADINGITEM_H_
