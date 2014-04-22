// Created by Luke on 13-12-2.
//


#include "EntityTest.h"

USING_NS_SF;

EntityTest::EntityTest( )
{
	group = new SmashGroup();
	list    = CCArray::create( );
	list->retain( );
	EntityStopTest();
//	Entity *entity = Entity::create( "world" );
//
//	RowSpatialManager *rowSpatialManager = RowSpatialManager::getInstance( );
//	rowSpatialManager->setup( 10, 10 );
//	for ( int i = 0; i < 10; i++ )
//	{
//		for ( int j = 0; j < 10; j++ )
//		{
//			RowSpatialObjectComponent *rowSpatialObjectComponent = new RowSpatialObjectComponent( );
//			rowSpatialObjectComponent->setOwner( entity );
//			rowSpatialObjectComponent->setRenderCol( i );
//			rowSpatialObjectComponent->setRenderRow( j );
//			rowSpatialObjectComponent->setRenderRow( j );
//			rowSpatialManager->addSpatialObject( rowSpatialObjectComponent );
//		}
//	}
//	entity->retain( );
}

EntityTest::~EntityTest( )
{

}

void EntityTest::EntityDestoryTest( )
{

}

void EntityTest::EntityStopTest( )
{
	cocos2d::CCDirector::sharedDirector( )->getScheduler( )->scheduleSelector( schedule_selector(EntityTest::onTimer), this, 0.1, kCCRepeatForever,0 ,false );
	cocos2d::CCDirector::sharedDirector( )->getScheduler( )->scheduleSelector( schedule_selector(EntityTest::onTimerRemove), this, 5, kCCRepeatForever,0 ,false );
}

void EntityTest::onTimer( float dt )
{
	Entity* entity = new Entity();
	TickedComponent* tickedComponent = new TickedComponent();
	entity->addComponent( tickedComponent, "tick" );
	entity->setOwningGroup( group );
	entity->initialize( );

	list->addObject( entity );
}

void EntityTest::onTimerRemove( float dt )
{
	CCLOG("================");
	CCLOG("list.count:%d",list->count( ));
	CCLOG("size:%d",ProcessManager::getInstance( )->tickedObjects.size( ));
	CCObject* object;
	CCARRAY_FOREACH(list, object)
		{
			Entity* entity = (Entity*)object;
			entity->destory( );
		}
	list->removeAllObjects( );
	CCLOG("list.count:%d",list->count( ));
	CCLOG("size:%d",ProcessManager::getInstance( )->tickedObjects.size( ));
}
