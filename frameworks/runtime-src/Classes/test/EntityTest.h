// Created by Luke on 13-12-2.
//



#ifndef __EntityTest_H_
#define __EntityTest_H_

#include "cocos2d.h"
#include "smartfish.h"
USING_NS_CC;
USING_NS_SF;
class EntityTest : public  CCObject
{
public:
	EntityTest();
	~EntityTest();
	void EntityDestoryTest();
	void EntityStopTest();
	void onTimer(float dt);
	void onTimerRemove(float dt);
private:
	CCArray* list;
	SmashGroup* group;
};


#endif //__EntityTest_H_
