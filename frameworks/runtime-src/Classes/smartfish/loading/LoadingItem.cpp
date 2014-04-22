//
// Created by Luke on 13-11-18.
//


#include "LoadingItem.h"
#include <curl/curl.h>

NS_SF_BEGIN
		static char errorBuffer[CURL_ERROR_SIZE];

		typedef size_t (*write_callback)( void *ptr, size_t size, size_t nmemb, void *stream );

		//callback function used by libcurl for save file
		size_t writeFile( void *ptr, size_t size, size_t nmemb, void *stream )
		{
			int written = fwrite( ptr, size, nmemb, ( FILE * ) stream );

			return written;
		}

		//callback function used by libcurl for collect response data
		size_t writeData( void *ptr, size_t size, size_t nmemb, void *stream )
		{
			std::string *str = ( std::string * ) stream;

			size_t sizes = size * nmemb;
			str->append( ( char * ) ptr, sizes );

			return sizes;
		}

		//Configure curl's timeout property
		bool configureCURL( CURL *handle )
		{
			if ( !handle )
			{
				return false;
			}

			int32_t code;
			code = curl_easy_setopt( handle, CURLOPT_ERRORBUFFER, errorBuffer );
			if ( code != CURLE_OK )
			{
				return false;
			}
			code = curl_easy_setopt( handle, CURLOPT_TIMEOUT, smartfish::LoaderMax::getInstance( )->getDownloadTimeout( ) );
			if ( code != CURLE_OK )
			{
				return false;
			}
			code = curl_easy_setopt( handle, CURLOPT_CONNECTTIMEOUT, smartfish::LoaderMax::getInstance( )->getConnectTimeout( ) );
			if ( code != CURLE_OK )
			{
				return false;
			}

			return true;
		}

		//Process Get Request
		int processGetTask( HttpRequestPacket *task, write_callback callback, void *stream, int32_t *responseCode )
		{
			CURLcode code = CURL_LAST;
			CURL *curl = curl_easy_init( );

			do
			{
				if ( !configureCURL( curl ) )
				{
					break;
				}

				code = curl_easy_setopt( curl, CURLOPT_URL, task->url.c_str( ) );
				if ( code != CURLE_OK )
				{
					break;
				}
				code = curl_easy_setopt( curl, CURLOPT_WRITEFUNCTION, callback );
				if ( code != CURLE_OK )
				{
					break;
				}
				code = curl_easy_setopt( curl, CURLOPT_WRITEDATA, stream );
				if ( code != CURLE_OK )
				{
					break;
				}
				code = curl_easy_perform( curl );
				if ( code != CURLE_OK )
				{
					break;
				}

				code = curl_easy_getinfo( curl, CURLINFO_RESPONSE_CODE, responseCode );
				if ( code != CURLE_OK || *responseCode / 100 != 2 )
				{
					code = CURLE_HTTP_RETURNED_ERROR;
				}
			} while ( 0 );
			if ( curl )
			{
				curl_easy_cleanup( curl );
			}

			return ( code == CURLE_OK ? 0 : 1 );
		}

//Process POST Request
		int processPostTask( HttpRequestPacket *task, write_callback callback, void *stream, int32_t *responseCode )
		{
			CURLcode code = CURL_LAST;
			CURL *curl = curl_easy_init( );

			do
			{
				if ( !configureCURL( curl ) )
				{
					break;
				}

				code = curl_easy_setopt( curl, CURLOPT_URL, task->url.c_str( ) );
				if ( code != CURLE_OK )
				{
					break;
				}
				code = curl_easy_setopt( curl, CURLOPT_WRITEFUNCTION, callback );
				if ( code != CURLE_OK )
				{
					break;
				}
				code = curl_easy_setopt( curl, CURLOPT_WRITEDATA, stream );
				if ( code != CURLE_OK )
				{
					break;
				}
				code = curl_easy_setopt( curl, CURLOPT_POST, 1 );
				if ( code != CURLE_OK )
				{
					break;
				}
				code = curl_easy_setopt( curl, CURLOPT_POSTFIELDS, task->reqData.c_str( ) );
				if ( code != CURLE_OK )
				{
					break;
				}
				code = curl_easy_perform( curl );
				if ( code != CURLE_OK )
				{
					break;
				}

				code = curl_easy_getinfo( curl, CURLINFO_RESPONSE_CODE, responseCode );
				if ( code != CURLE_OK || *responseCode / 100 != 2 )
				{
					code = CURLE_HTTP_RETURNED_ERROR;
				}
			} while ( 0 );
			if ( curl )
			{
				curl_easy_cleanup( curl );
			}

			return ( code == CURLE_OK ? 0 : 1 );
		}

		//Process Download Request
		int processDownloadTask( HttpRequestPacket *task, write_callback callback, void *stream, int32_t *responseCode )
		{
			return processGetTask( task, callback, stream, responseCode );
		}


		LoadingItem::LoadingItem( HttpRequestPacket *packet ,LoaderMax* loaderMax)
		{
			this->m_Packet      = packet;
			this->m_LoaderMax   = loaderMax;
		}

		LoadingItem::~LoadingItem( )
		{
			this->m_Packet      = NULL;
			this->m_LoaderMax   = NULL;
		}

		void LoadingItem::run( )
		{
			//Create a response packet and assume it will successed
			HttpResponsePacket *responsePacket = new HttpResponsePacket( );
			responsePacket->request = m_Packet;
			responsePacket->succeed = true;

			//Process the request
			if ( m_Packet->reqType == kHttpRequestGet )
			{
				//Get Request
				int32_t ret = processGetTask( m_Packet, writeData, &responsePacket->responseData, &responsePacket->responseCode );
				if ( ret != 0 )
				{
					responsePacket->succeed = false;
					responsePacket->responseData = errorBuffer;
				}
			}
			else if ( m_Packet->reqType == kHttpRequestPost )
			{
				//Post Request
				int32_t ret = processPostTask( m_Packet, writeData, &responsePacket->responseData, &responsePacket->responseCode );
				if ( ret != 0 )
				{
					responsePacket->succeed = false;
					responsePacket->responseData = errorBuffer;
				}
			}
			else if ( m_Packet->reqType == kHttpRequestDownloadFile )
			{
				//Download File Request
				bool fullyDownloaded = true;
				std::vector<std::string>::iterator iter;
				std::string saveFileName;
				std::string needDownload;

				for ( iter = m_Packet->files.begin( ); iter != m_Packet->files.end( ); ++iter )
				{
					needDownload = *iter;
					std::string::size_type pos = needDownload.rfind( "/" );

					if ( pos != std::string::npos )
					{
						saveFileName = needDownload.substr( pos + 1 );
					} else
					{
						saveFileName = needDownload;
					}

					//If the download url is http://www.xxx.com/yyy.html
					//The saved file name must be yyy.html
					saveFileName = CCFileUtils::sharedFileUtils( )->getWritablePath( ) + saveFileName;
					FILE *handle = fopen( saveFileName.c_str( ), "w+" );
					if ( !handle )
					{
						fullyDownloaded = false;
						break;
					}
					m_Packet->url = needDownload;
					int32_t ret = processDownloadTask( m_Packet, writeFile, handle, &responsePacket->responseCode );
					if ( handle )
					{
						fclose( handle );
					}
					if ( ret != 0 )
					{
						fullyDownloaded = false;
						break;
					}
				}

				//Only consider download task successfully when all the files downloaded
				if ( !fullyDownloaded )
				{
					responsePacket->succeed = false;
					responsePacket->responseData = errorBuffer;
				}
			}
			this->m_LoaderMax->addResponsePacket( responsePacket );
		}

		NS_SF_END
