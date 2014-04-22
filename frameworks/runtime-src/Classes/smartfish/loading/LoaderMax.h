// Created by Luke on 13-11-18.
//



#ifndef __LoaderMax_H_
#define __LoaderMax_H_

#include "cocos2d.h"
#include "smartfishMarcos.h"
#include "ThreadPool.h"

USING_NS_CC;

NS_SF_BEGIN
		//Http request type
		typedef enum
		{
			kHttpRequestGet,
			kHttpRequestPost,
			kHttpRequestDownloadFile,
		} HttpRequestType;

		//Request structure
		typedef struct
		{
			HttpRequestType reqType;
			std::string url;
			std::string reqData;
			std::vector<std::string> files;
			std::string reqName;
			CCObject *pTarget;
			SEL_CallFuncND pSelector;
		} HttpRequestPacket;

		//Response structure
		typedef struct
		{
			HttpRequestPacket *request;
			std::string responseData;
			int32_t responseCode;
			bool succeed;
		} HttpResponsePacket;

		class LoaderMax : public CCObject
		{
		public:
			LoaderMax( );

			~LoaderMax( );

			static LoaderMax *INSTANCE;

			static LoaderMax *getInstance( );

			/**
			 * Add a get request to task queue
			 * @param url url want to get
			 * @param pTarget  callback target
			 * @param pSelector callback selector
			 * @return NULL
			 */
			void addGetTask( std::string &url, CCObject *pTarget, SEL_CallFuncND pSelector );

			/**
			 * Add a get request to task queue
			 * @param url the post destination url
			 * @param postData data want to post
			 * @param pTarget  callback target
			 * @param pSelector callback selector
			 * @return NULL
			 */
			void addPostTask( std::string &url, std::string &postData, CCObject *pTarget, SEL_CallFuncND pSelector );

			/**
			 * Add a get request to task queue
			 * @param url urls want to download
			 * @param pTarget  callback target
			 * @param pSelector callback selector
			 * @return NULL
			 */
			void addDownloadTask( std::vector<std::string> &urls, CCObject *pTarget, SEL_CallFuncND pSelector );

			void addResponsePacket(HttpResponsePacket* packet);
		private:
			int32_t m_connectTimeout;
			int32_t m_timeout;
			int32_t s_asyncRequestCount;
			ThreadPool *m_Http_Pool;
			ThreadPool *m_Download_Pool;
			ThreadMutex *m_Response_Mutex;

			void httpRequestCallback( float delta );

			bool lazyInitHttpThreadPool( );

			bool lazyInitDownloadThreadPool( );

		public:
			int32_t getConnectTimeout( ) const
			{
				return m_connectTimeout;
			}

			void setConnectTimeout( int32_t m_connectTimeout )
			{
				LoaderMax::m_connectTimeout = m_connectTimeout;
			}

			int32_t getDownloadTimeout( ) const
			{
				return m_timeout;
			}

			void setDownloadTimeout( int32_t m_timeout )
			{
				LoaderMax::m_timeout = m_timeout;
			}


		};

		NS_SF_END
#endif //__LoaderMax_H_
