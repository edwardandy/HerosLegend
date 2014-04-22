// Created by Luke on 13-11-29.
//


#include "MiscTest.h"

USING_NS_CC;
USING_NS_CC_EXT;

MiscTest::MiscTest( )
{
	createScene( );

	armatureTest( );
//	schedulerTest();
//	processManagerTest();
//	clippingNodeTest();
}

MiscTest::~MiscTest( )
{

}

void MiscTest::createScene( )
{
	m_Layer = new CCLayer( );
	m_Layer->retain( );
	CCScene *scene = new CCScene( );
	scene->retain( );
	scene->addChild( m_Layer );
	CCDirector::sharedDirector( )->pushScene( scene );
}

void MiscTest::armatureTest( )
{
//	CCArmatureDataManager::sharedArmatureDataManager( )->addArmatureFileInfo( "soldier.png", "soldier.plist", "skeleton.xml" );
//	CCArmatureDataManager::sharedArmatureDataManager( )->addArmatureFileInfo( "gameres/self.pvr.ccz", "gameres/self.plist", "gameres/self.xml" );
	CCArmatureDataManager::sharedArmatureDataManager( )->addArmatureFileInfo( "gameres/skeleton.png", "gameres/skeleton.plist", "gameres/skeleton.xml" );

	CCBatchNode *batchNode = CCBatchNode::create( );
	m_Layer->addChild( batchNode );

	int i = 0;
//	while(i<1)
//	{
	cocos2d::extension::CCArmature *m_pArmature = cocos2d::extension::CCArmature::create( "SoldierSkeleton" );
//		m_pArmature->setScale( 1.5 );
//		m_pArmature->getAnimation( )->playWithIndex( 0, 0, 0, 1 );
	std::vector<std::string> vector;
	vector.push_back( "walk" );
//	vector.push_back( "attack_1" );
//	vector.push_back( "attack_2" );
//	vector.push_back( "attack_3" );
//	vector.push_back( "attack_4" );
//	vector.push_back( "die" );
	m_pArmature->getAnimation( )->playWithNames( vector, 0 );
	m_pArmature->setScale( 1 );
	m_pArmature->getAnimation( )->setSpeedScale( 0.5 );
	m_pArmature->setPosition( ccp( 200 + 50 * int( i / 15 ), 200 + ( i % 15 ) * 50) );
	m_pArmature->setAnchorPoint( ccp( 0.5, 0 ) );
	m_pArmature->ignoreAnchorPointForPosition( false );

//	CCBone *bone = m_pArmature->getBone( "weapon" );
//	if ( bone != NULL)
//	{
//		CCSkin *skin = CCSkin::createWithSpriteFrameName( "part-bow.png" );
//		bone->addDisplay( skin, 0 );
//	}

	CCBone *foot = m_pArmature->getBone( "foot" );
	if ( foot )
	{
		foot->getChildArmature( )->getAnimation( )->playWithIndex( 0, 0, 0, 1 );
//		foot->getChildArmature( )->getAnimation( )->playWithIndex( 1, 0, 0, 1 );
		foot->getChildArmature( )->getAnimation( )->setSpeedScale( 0.5 );
	}

	m_Layer->addChild( m_pArmature );
//		i++;
//	}


//	CCBone* weapon = m_pArmature->getBone( "weapon" );
//	CCPoint point  = ccp(weapon->getWorldInfo( )->x, weapon->getWorldInfo( )->y);
//	CCLog( "[node] x:%f,y:%f",point.x,point.y );
//
//	point = weapon->getParent( )->convertToWorldSpace( point );
//	CCLog( "[world] x:%f,y:%f",point.x,point.y );

}

void MiscTest::schedulerTest( )
{
	CCDirector::sharedDirector( )->getScheduler( )->scheduleSelector( schedule_selector(MiscTest::onTimer), this, 1 / 60, kCCRepeatForever, 0.0f, false );
}

void MiscTest::onTimer( float dt )
{
	cocos2d::CCLog( "[MiscTest] dt:%f", dt );
}

void MiscTest::processManagerTest( )
{
	smartfish::ProcessManager::getInstance( )->start( );
}


void MiscTest::clippingNodeTest( )
{
	CCLayerColor *layerColor_1 = CCLayerColor::create( ccc4( 100, 225, 225, 225 ), 200, 200 );
	CCLayerColor *layerColor_2 = CCLayerColor::create( ccc4( 300, 0, 225, 225 ), 300, 300 );
	layerColor_1->setPosition( ccp(200, 200) );
	layerColor_2->setPosition( ccp(200, 200) );
	CCClippingNode *clippingNode = CCClippingNode::create( );
	clippingNode->setStencil( layerColor_1 );
	clippingNode->addChild( layerColor_2 );
	m_Layer->addChild( clippingNode );
}
