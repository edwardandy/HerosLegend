//
//  ToolSet.h
//  Transformers2
//
//  Created by Yan Xing on 13-11-12.
// We put some funtions which are not easily implemented in javascript here
//

#ifndef __SuperCommander__ToolSet__
#define __SuperCommander__ToolSet__

#include "cocos2d.h"

using namespace cocos2d;

namespace cocos2d
{
    namespace gui
    {
        class Widget;
        class Button;
        class ImageView;
        class Label;
        class LabelAtlas;
        class LoadingBar;
    }
}

class ToolSet : public CCObject
{
public:
    static ToolSet* getInstance();
    
private:
    ToolSet();
    virtual ~ToolSet();
    
public:
    std::string        getFileContent( std::string filename );
    bool               saveFileContent( std::string fullFileName, std::string content );
    std::string        getTargetOS();
    
    void               enableStroke( CCNode* pNode, const ccColor3B &strokeColor, int strokeSize );
    
    //Game Center方法
    bool               openLeaderboard();
    bool               sendScore( int score );
};

#endif /* defined(__Transformers2__ToolSet__) */
