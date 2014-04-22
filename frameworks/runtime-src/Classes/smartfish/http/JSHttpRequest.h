// Created by Luke on 13-11-12.
//



#ifndef __JSHttpRequest_H_
#define __JSHttpRequest_H_

#include "cocos2d.h"
#include "cocos-ext.h"
#include "../core/SFObject.h"

USING_NS_CC;
USING_NS_CC_EXT;

typedef void (CCObject::*SEL_RequestEventCallFunc)( bool result, std::string );

#define response_selector(_SELECTOR) (SEL_RequestEventCallFunc)(&_SELECTOR)
NS_SF_BEGIN
		class JSHttpRequest : public smartfish::SFObject
		{
		public:
			JSHttpRequest( );

			~JSHttpRequest( );

			void setRequestType( int value );

			void call( std::string url, std::string params, std::string tag );

			void onHttpData( CCHttpClient *client, CCHttpResponse *response );

			void setResponseCallback( CCObject *target, SEL_RequestEventCallFunc callbackFunc );

			void setTimeout( int seconds );

		private:
			SEL_RequestEventCallFunc mCallback;
			std::string mUrl;
			std::string mTag;
			CCObject *mTarget;
			std::string mParams;
			int retryTimes;
			CCHttpRequest *m_Request;
			int mRequestType;
		};

NS_SF_END


#endif //__JSHttpRequest_H_
