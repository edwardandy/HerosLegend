//
// Created by Luke on 13-11-12.
//


#include "JSHttpRequestTest.h"
#include "LoaderMax.h"

void JSHttpRequestTest::onSuccess( bool result, std::string string )
{
	if ( result )
	{
		CCLog( "[JSHttpRequestTest] result:%s", string.c_str( ) );
	}
	else
	{
		CCLog( "[JSHttpRequestTest] error:%s", string.c_str( ) );
	}
}

JSHttpRequestTest::JSHttpRequestTest( )
{
//	JSHttpRequest *jsHttpRequest = new JSHttpRequest( );
//	jsHttpRequest->setTimeout( 3 );
//	jsHttpRequest->setResponseCallback( this, response_selector(JSHttpRequestTest::onSuccess) );
//	jsHttpRequest->call( "http://dev-flowershop2.shinezoneapp.com:1080/test.php", "params={request_a}", "I1001" );

	std::string url = "http://dev-flowershop2.shinezoneapp.com:1080/test.php";
	std::string params = "params={request_b}";
	smartfish::LoaderMax::getInstance( )->addPostTask( url, params, this, callfuncND_selector(JSHttpRequestTest::onDownLoaded) );
}

JSHttpRequestTest::~JSHttpRequestTest( )
{

}

void JSHttpRequestTest::onDownLoaded( CCObject *object, void *data )
{
	smartfish::HttpResponsePacket *response = (smartfish::HttpResponsePacket *)data;
	if(!response)
	{
		return;
	}
	CCLog( "================================ data:%s",response->responseData.c_str( ) );
}
