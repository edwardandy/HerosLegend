//
// Created by Luke on 13-11-2.
//


#include "IsometricTest.h"
#include "Utils.h"

IsometricTest::IsometricTest( )
{
	STLcontainer* stl = new STLcontainer();
	SceneLayoutRendererTest *sceneLayoutRendererTest = new SceneLayoutRendererTest( );
}

SceneLayoutRendererTest::SceneLayoutRendererTest( )
{
	CCArray *children = CCArray::create( );
	for ( int i = 0; i < 50; i++ )
	{
		for ( int j = 49; j >= 0; j-- )
		{
			IsoNode* node = new IsoNode();
			CCSprite* sprite = new CCSprite();
			sprite->retain();
			node->setContainer( sprite );
			node->setSize( 1, 1, 1 );
			node->setIsoPosition( new IsoPoint(i,j,0) );
			children->addObject( node );
		}
	}

	IsoNode *objA;
	IsoNode *objB;
	float rightA;
	float frontA;
	float topA;

	CCObject *pElement;
	CCDictionary* dependency = CCDictionary::create( );
	int startTime = Utils::getTimer();
	CCARRAY_FOREACH(children, pElement)
		{
			objA = dynamic_cast<IsoNode *>(pElement);
			CCArray *behind = CCArray::create( );
			behind->retain( );
			rightA = objA->_isoX + objA->_width;
			frontA = objA->_isoY + objA->_length;
			topA = objA->_isoZ + objA->_height;
			CCObject *pElement2;
			CCARRAY_FOREACH(children, pElement2)
				{
					objB = (IsoNode *)(pElement2);
					if ( ( objA != objB ) && ( objB->_isoX < rightA ) && ( objB->_isoY < frontA ) && ( objB->_isoZ < topA ) )
					{
						behind->addObject( objB );
					}
				}
			dependency->setObject( behind, objA->id );
		}
	cocos2d::CCLog( "just loop cost %d",(Utils::getTimer() - startTime) );


	startTime = Utils::getTimer();
	SceneLayoutRenderer* layout = new SceneLayoutRenderer();
	layout->sortChildren( children );
	cocos2d::CCLog( "sortChildren cost %d",(Utils::getTimer() - startTime) );

	IsoNode* last = dynamic_cast<IsoNode*>(children->objectAtIndex( 99 ));
	last->setIsoPosition( new IsoPoint(0,0,0) );
	startTime = Utils::getTimer();
	layout->sortWithTarget( children, last);
	cocos2d::CCLog( "sortWithTarget cost %d",(Utils::getTimer() - startTime) );


	last = dynamic_cast<IsoNode*>(children->objectAtIndex( 98 ));
	last->setIsoPosition( new IsoPoint(0,0,0) );
	startTime = Utils::getTimer();
	layout->sortWithTarget( children, last);
	cocos2d::CCLog( "sortWithTarget cost %d",(Utils::getTimer() - startTime) );

	last = dynamic_cast<IsoNode*>(children->objectAtIndex( 97 ));
	last->setIsoPosition( new IsoPoint(0,0,0) );
	startTime = Utils::getTimer();
	layout->sortWithTarget( children, last);
	cocos2d::CCLog( "sortWithTarget cost %d",(Utils::getTimer() - startTime) );

	last = dynamic_cast<IsoNode*>(children->objectAtIndex( 96 ));
	last->setIsoPosition( new IsoPoint(1,4,0) );
	startTime = Utils::getTimer();
	layout->sortWithTarget( children, last);
	cocos2d::CCLog( "sortWithTarget cost %d",(Utils::getTimer() - startTime) );

	last = dynamic_cast<IsoNode*>(children->objectAtIndex( 95 ));
	last->setIsoPosition( new IsoPoint(2,1,0) );
	startTime = Utils::getTimer();
	layout->sortWithTarget( children, last);
	cocos2d::CCLog( "sortWithTarget cost %d",(Utils::getTimer() - startTime) );

	last = dynamic_cast<IsoNode*>(children->objectAtIndex( 94 ));
	last->setIsoPosition( new IsoPoint(1,1,0) );
	startTime = Utils::getTimer();
	layout->sortWithTarget( children, last);
	cocos2d::CCLog( "sortWithTarget cost %d",(Utils::getTimer() - startTime) );

	for(int i=0;i<100;i++ )
	{
		IsoNode* node = dynamic_cast<IsoNode*>(children->objectAtIndex(i));
		cocos2d::CCLog( "id:%d,[x:%f,y:%f] depth:%d",node->id,node->getIsoX( ),node->getIsoY( ),node->getDepth( ) );
	}

}

STLcontainer::STLcontainer( )
{

}
