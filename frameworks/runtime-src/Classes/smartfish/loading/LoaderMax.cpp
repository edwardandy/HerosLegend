// Created by Luke on 13-11-18.
//


#include <vector>
#include <queue>
#include "LoaderMax.h"
#include "LoadingItem.h"

NS_SF_BEGIN
		static std::queue<HttpResponsePacket *> *s_responseQueue = NULL;
		LoaderMax *LoaderMax::INSTANCE = NULL;
		LoaderMax::LoaderMax( ):m_Http_Pool(NULL),m_Download_Pool(NULL),m_Response_Mutex(NULL)
		{
			s_asyncRequestCount = 0;
			m_timeout = 60;
			m_connectTimeout = 10;
		}

		LoaderMax::~LoaderMax( )
		{

		}
		LoaderMax *LoaderMax::getInstance( )
		{
			if ( INSTANCE == NULL)
			{
				INSTANCE = new LoaderMax( );
			}

			return INSTANCE;
		}
		bool LoaderMax::lazyInitHttpThreadPool( )
		{
			if(m_Http_Pool == NULL)
			{
				m_Http_Pool         = new ThreadPool(1);
			}
			if(m_Response_Mutex == NULL)
			{
				m_Response_Mutex    = new ThreadMutex();
				s_responseQueue     = new std::queue<HttpResponsePacket *>( );
			}
			return true;
		}

		bool LoaderMax::lazyInitDownloadThreadPool( )
		{
			if(m_Download_Pool == NULL)
			{
				m_Download_Pool     = new ThreadPool(2);
			}
			if(m_Response_Mutex == NULL)
			{
				m_Response_Mutex    = new ThreadMutex();
				s_responseQueue     = new std::queue<HttpResponsePacket *>( );
			}
			return true;
		}

		void LoaderMax::addGetTask( std::string &url, CCObject *pTarget, SEL_CallFuncND pSelector )
		{
			lazyInitHttpThreadPool();
			if ( 0 == s_asyncRequestCount )
			{
				CCDirector::sharedDirector( )->getScheduler( )->scheduleSelector( schedule_selector(LoaderMax::httpRequestCallback), this, 0, false );
			}

			++s_asyncRequestCount;

			if ( pTarget )
			{
				pTarget->retain( );
			}

			HttpRequestPacket *packet = new HttpRequestPacket( );
			packet->reqType = kHttpRequestGet;
			packet->url = url;
			packet->pTarget = pTarget;
			packet->pSelector = pSelector;
			LoadingItem* loadingItem = new LoadingItem(packet,this);
			m_Http_Pool->addTask( loadingItem );
		}

		void LoaderMax::addPostTask( std::string &url, std::string &postData, CCObject *pTarget, SEL_CallFuncND pSelector )
		{
			lazyInitHttpThreadPool();
			if ( 0 == s_asyncRequestCount )
			{
				CCDirector::sharedDirector( )->getScheduler( )->scheduleSelector( schedule_selector(LoaderMax::httpRequestCallback), this, 0, false );
			}

			++s_asyncRequestCount;

			if ( pTarget )
			{
				pTarget->retain( );
			}

			HttpRequestPacket *packet = new HttpRequestPacket( );
			packet->reqType = kHttpRequestPost;
			packet->url = url;
			packet->reqData = postData;
			packet->pTarget = pTarget;
			packet->pSelector = pSelector;
			LoadingItem* loadingItem = new LoadingItem(packet,this);
			m_Http_Pool->addTask( loadingItem );
		}

		void LoaderMax::addDownloadTask( std::vector<std::string> &urls, CCObject *pTarget, SEL_CallFuncND pSelector )
		{
			lazyInitDownloadThreadPool( );

			if ( 0 == s_asyncRequestCount )
			{
				CCDirector::sharedDirector( )->getScheduler( )->scheduleSelector( schedule_selector(LoaderMax::httpRequestCallback), this, 0, false );
			}

			++s_asyncRequestCount;

			if ( pTarget )
			{
				pTarget->retain( );
			}

			HttpRequestPacket *packet = new HttpRequestPacket( );
			packet->reqType = kHttpRequestDownloadFile;
			packet->files = urls;
			packet->pTarget = pTarget;
			packet->pSelector = pSelector;
			LoadingItem* loadingItem = new LoadingItem(packet,this);
			m_Download_Pool->addTask( loadingItem );
		}

		void LoaderMax::addResponsePacket( HttpResponsePacket *packet )
		{
			m_Response_Mutex->lock( );
			s_responseQueue->push( packet );
			m_Response_Mutex->unlock( );
		}

		void LoaderMax::httpRequestCallback( float delta )
		{
			std::queue<HttpResponsePacket *> *pQueue = s_responseQueue;

			m_Response_Mutex->lock( );
			if ( pQueue->empty( ) )
			{
				m_Response_Mutex->unlock( );
			} else
			{
				HttpResponsePacket *packet = pQueue->front( );
				pQueue->pop( );

				m_Response_Mutex->unlock( );

				--s_asyncRequestCount;
				if ( 0 == s_asyncRequestCount )
				{
					CCDirector::sharedDirector( )->getScheduler( )->unscheduleSelector( schedule_selector(LoaderMax::httpRequestCallback), this );
				}

				HttpRequestPacket *orgRequest = packet->request;
				CCObject *pTarget = orgRequest->pTarget;
				SEL_CallFuncND pSelector = orgRequest->pSelector;

				if ( pTarget && pSelector )
				{
					( pTarget ->* pSelector )( ( CCNode * ) this, packet );

					pTarget->release( );
				}

				delete orgRequest;
				delete packet;
			}
		}



NS_SF_END