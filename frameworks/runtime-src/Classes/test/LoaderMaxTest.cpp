#include "smartfishMarcos.h"//
// Created by Luke on 13-11-19.
//


#include "LoaderMaxTest.h"
#include "LoaderMax.h"

USING_NS_SF;
LoaderMaxTest::LoaderMaxTest( )
{
	CCLog( "======= LoaderMaxTest =====" );
	CCFileUtils::sharedFileUtils( )->getWritablePath( );
	CCLog( "======= add visit WritablePath =====" );
	std::vector<std::string> urls;
	urls.push_back( "http://106.187.92.70/threekingdom_res/1002-2.png" );
	urls.push_back( "http://106.187.92.70/threekingdom_res/1003-2.png" );
	urls.push_back( "http://106.187.92.70/threekingdom_res/1004-2.png" );
	smartfish::LoaderMax::getInstance( )->addDownloadTask( urls, this, callfuncND_selector(LoaderMaxTest::onDownLoadFinish) );
	CCLog( "path:%s",CCFileUtils::sharedFileUtils( )->getWritablePath( ).c_str( ) );
}

LoaderMaxTest::~LoaderMaxTest( )
{

}

void LoaderMaxTest::onDownLoadFinish(cocos2d::CCNode *pTarget, void *data )
{
	CCLog( "=== onDownLoadFinish ====" );
	HttpResponsePacket *response = (HttpResponsePacket *)data;
	if (response->request->reqType == kHttpRequestDownloadFile) {
		if (response->succeed) {
			CCLog("Download Request Completed! Downloaded:");

			std::vector<std::string>::iterator iter;
			for (iter = response->request->files.begin(); iter != response->request->files.end(); ++iter) {
				std::string url = *iter;
				CCLog("%s", url.c_str());
				std::string filename;
				std::string::size_type pos = url.rfind( "/" );

				if ( pos != std::string::npos )
				{
					filename = url.substr( pos + 1 );
				} else
				{
					filename = url;
				}
				CCLog( "filename:%s",filename.c_str( ) );
//				std::string path = CCFileUtils::sharedFileUtils()->getWritablePath( ) + filename;
			}

		} else {
			CCLog("Download Error: %s", response->responseData.c_str());
		}
	}

}

void LoaderMaxTest::onHttpFinish(cocos2d::CCNode *pTarget, void *data )
{

}
