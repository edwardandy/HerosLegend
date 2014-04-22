//
// Created by Luke on 13-12-23.
//

#include "ProcessManagerTest.h"

ProcessManagerTest::ProcessManagerTest( )
{
	list = CCArray::create( );
	list->retain( );
	cocos2d::CCDirector::sharedDirector( )->getScheduler( )->scheduleSelector( schedule_selector(ProcessManagerTest::onTimer), this, 0.1, kCCRepeatForever,0 ,false );
	cocos2d::CCDirector::sharedDirector( )->getScheduler( )->scheduleSelector( schedule_selector(ProcessManagerTest::onRemoveHandler), this, 10, kCCRepeatForever,0 ,false );
}

ProcessManagerTest::~ProcessManagerTest( )
{

}

void ProcessManagerTest::onTimer( float dt )
{
	TickedComponent* tickedComponent = new TickedComponent();
	ProcessManager::getInstance( )->addTickedObject( tickedComponent, 0 );
	list->addObject( tickedComponent );
}

void ProcessManagerTest::onRemoveHandler( float dt )
{
	CCLOG("================");
	CCLOG("list.count:%d",list->count( ));
	CCLOG("size:%d",ProcessManager::getInstance( )->tickedObjects.size( ));
	CCObject* object;
	CCARRAY_FOREACH(list, object)
		{
			ProcessManager::getInstance( )->removeTickedObject( (TickedComponent*)object);
		}
	list->removeAllObjects( );
	CCLOG("list.count:%d",list->count( ));
	CCLOG("size:%d",ProcessManager::getInstance( )->tickedObjects.size( ));
}
