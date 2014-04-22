//
//  ToolSet.cpp
//  Transformers2
//
//  Created by Yan Xing on 13-11-12.
//
//

#include "ToolSet.h"
#include "CocoStudio/GUI/System/CocosGUI.h"

using namespace cocos2d::gui;
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
static ToolSet *s_pToolSet = NULL; // pointer to singleton

// HttpClient implementation
ToolSet* ToolSet::getInstance()
{
    if (s_pToolSet == NULL)
    {
        s_pToolSet = new ToolSet();
    }

    return s_pToolSet;
}

////////////////////////////////////////////////////////////////////////////////////////
ToolSet::ToolSet()
{

}

////////////////////////////////////////////////////////////////////////////////////////
ToolSet::~ToolSet()
{

}

////////////////////////////////////////////////////////////////////////////////////////
std::string ToolSet::getFileContent( std::string filename )
{
    unsigned long size = 0;

    char * pContentString = (char*)CCFileUtils::sharedFileUtils()->getFileData( filename.c_str(), "r", &size );

    if ( pContentString == NULL )
    {
        return "";
    }

    char * pTmpString = new char[size+1];

    memset( pTmpString, 0, size+1 );

    memcpy( pTmpString, pContentString, size );

    std::string result(pTmpString);

    CC_SAFE_DELETE_ARRAY(pContentString);
    CC_SAFE_DELETE_ARRAY(pTmpString);

    return result;
}

////////////////////////////////////////////////////////////////////////////////////////
bool ToolSet::saveFileContent( std::string fullFileName, std::string content )
{
    FILE* fp = 0;
#if defined(_MSC_VER) && (_MSC_VER >= 1400 ) && (CC_TARGET_PLATFORM != CC_PLATFORM_MARMALADE)
    errno_t err = fopen_s(&fp, filename, "w" );
    if ( fp && !err )
    {
#else
    fp = fopen( fullFileName.c_str(), "w" );
    if ( fp )
    {
#endif
        fwrite( content.c_str(), content.length(), 1, fp );
        fclose( fp );
        
        return true;
    }
    else
    {
        fclose( fp );
        
        return false;
    }
}

//////////////////////////////////////////////////////////////////////////////////////
std::string ToolSet::getTargetOS()
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    return "android";
#else
    return "ios";
#endif
}

////////////////////////////////////////////////////////////////////////////////////////
void ToolSet::enableStroke( CCNode* pNode, const ccColor3B &strokeColor, int strokeSize )
{
    CCLabelTTF* pLabelTTF = dynamic_cast<CCLabelTTF*>(pNode);
    if ( pLabelTTF != NULL )
    {
        pLabelTTF->enableStroke( strokeColor, strokeSize );
    }
    
    return;
}

////////////////////////////////////////////////////////////////////////////////////////
bool ToolSet::openLeaderboard()
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
    return true;
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    return true;
#endif
    
}

////////////////////////////////////////////////////////////////////////////////////////
bool ToolSet::sendScore( int score )
{
#if (CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID)
     return true;
#elif (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
     return true;
#endif
}
