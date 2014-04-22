// Created by Luke on 13-11-12.
//


#include "JSHttpRequest.h"

USING_NS_CC_EXT;
NS_SF_BEGIN
		JSHttpRequest::JSHttpRequest( ):retryTimes( 3 ), mParams( "" ), mTarget( NULL ), mUrl( "" ), mCallback( NULL ), mRequestType( CCHttpRequest::kHttpPost )
		{
		}

		JSHttpRequest::~JSHttpRequest( )
		{
			CCLOG("~JSHttpRequest");
			CC_SAFE_RELEASE(this->mTarget);
			mCallback = NULL;
		}

		void JSHttpRequest::setRequestType( int value )
		{
			mRequestType = value;
		}

		void JSHttpRequest::setTimeout( int seconds )
		{
			CCHttpClient::getInstance( )->setTimeoutForRead( seconds );
		}

		void JSHttpRequest::setResponseCallback( CCObject *target, SEL_RequestEventCallFunc callbackFunc )
		{
			if ( target && target != this->mTarget )
			{
				CC_SAFE_RELEASE(this->mTarget);
				CC_SAFE_RETAIN(target);
				this->mTarget = target;

			}
			this->mCallback = callbackFunc;
		}

		void JSHttpRequest::call( std::string url, std::string params, std::string tag )
		{
			this->mUrl = url;
			this->mParams = params;
			this->mTag = tag;

			m_Request = new CCHttpRequest( );
			m_Request->setUrl( url.c_str( ) );
			m_Request->setRequestType( ( CCHttpRequest::HttpRequestType ) mRequestType );
			// write the post data
			m_Request->setRequestData( params.c_str( ), strlen( params.c_str( ) ) );
			m_Request->setResponseCallback( this, httpresponse_selector(JSHttpRequest::onHttpData) );
			m_Request->setTag( tag.c_str( ) );
			CCHttpClient::getInstance( )->send( m_Request );
			CCLog( "[JSHttpRequest] send:%s", params.c_str( ) );
			m_Request->release( );
		}

		void JSHttpRequest::onHttpData( CCHttpClient *client, CCHttpResponse *response )
		{
			int statusCode = response->getResponseCode( );
			char statusString[1024] = { 0 };

			sprintf( statusString, "HTTP StatusCode: %d, tag = %s", statusCode, response->getHttpRequest( )->getTag( ) );
			CCLog( "[JSHttpRequest] response: %s", statusString );
			if ( !response->isSucceed( ) )
			{
				retryTimes--;
				if ( retryTimes > 0 )
				{
					call( this->mUrl, this->mParams, this->mTag );
					return;
				}
				if ( this->mTarget && this->mCallback )
				{
					( this->mTarget ->* this->mCallback )( false, statusString );
				}
			}
			else
			{
				// dump data
				std::vector<char> *buffer = response->getResponseData( );
				std::string data( buffer->begin( ), buffer->end( ) );

				CCLog( "[JSHttpRequest] data = %s", data.c_str( ) );
				if ( this->mTarget && this->mCallback )
				{
					( this->mTarget ->* this->mCallback )( true, data );
				}
			}
		}

NS_SF_END