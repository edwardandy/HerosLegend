//
// Created by Luke on 13-12-23.
//


#ifndef __ProcessManagerTest_H_
#define __ProcessManagerTest_H_

#include "cocos2d.h"
#include "smartfish.h"
USING_NS_CC;
class ProcessManagerTest : public cocos2d::CCObject
{
public:
	ProcessManagerTest();
	~ProcessManagerTest();
private:
	void onTimer(float dt);
	void onRemoveHandler(float dt);
	CCArray* list;
};


#endif //__ProcessManagerTest_H_
