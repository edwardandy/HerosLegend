// Created by Luke on 13-11-19.
//



#ifndef __LoaderMaxTest_H_
#define __LoaderMaxTest_H_

#include "cocos2d.h"

USING_NS_CC;

class LoaderMaxTest : public CCObject
{
public:
	LoaderMaxTest();
	~LoaderMaxTest();
private:
	void onDownLoadFinish(cocos2d::CCNode *pTarget, void *data);
	void onHttpFinish(cocos2d::CCNode *pTarget, void *data);
};


#endif //__LoaderMaxTest_H_
