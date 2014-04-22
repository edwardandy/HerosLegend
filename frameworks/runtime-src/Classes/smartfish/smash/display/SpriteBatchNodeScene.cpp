//
// Created by Luke on 13-12-20.
//

#include "SpriteBatchNodeScene.h"
#include "DisplayObjectRenderer.h"
#include "SpriteBatchNodeRenderer.h"

NS_SF_BEGIN
		SpriteBatchNodeScene::SpriteBatchNodeScene( )
		{
			m_BatchNodes = CCDictionary::create( );
			m_BatchNodes->retain( );

			m_BatchNodeZOrders = CCDictionary::create( );
			m_BatchNodeZOrders->retain( );
		}

		SpriteBatchNodeScene::~SpriteBatchNodeScene( )
		{
			//	CCLOG("~SpriteBatchNodeScene");
			CCDictElement *pElement = NULL;
			CCDICT_FOREACH(m_BatchNodes, pElement)
				{
					CCSpriteBatchNode *batchNode = dynamic_cast<CCSpriteBatchNode * >(pElement->getObject( ));
					batchNode->removeFromParentAndCleanup( true );
				}
			CC_SAFE_RELEASE(m_BatchNodes);
		}


		void SpriteBatchNodeScene::setSceneView( CCNode *sceneView )
		{
			DisplayObjectScene::setSceneView( sceneView );
		}

		void SpriteBatchNodeScene::onFrame( float deltaTime )
		{
			DisplayObjectScene::onFrame( deltaTime );
		}

		void SpriteBatchNodeScene::add( DisplayObjectRenderer *renderer )
		{
			SpriteBatchNodeRenderer *batchNodeRenderer = dynamic_cast<SpriteBatchNodeRenderer *>(renderer);
			CCSprite *sprite = dynamic_cast<CCSprite *>(batchNodeRenderer->getDisplayObject( ));
			if ( sprite == NULL)
			{
//				CCLog( "[SpriteBatchNodeScene] %s's renderer's displayObject must be CCSprite*",batchNodeRenderer->getOwner( )->getName( ).c_str( ));
				return;
			}
			CCSpriteBatchNode *batchNode = getSpriteBatchNode( batchNodeRenderer->getTextureFileName( ) );
			batchNode->addChild( sprite );

			if ( !this->m_Children->containsObject( batchNodeRenderer ) )
			{
				this->m_Children->addObject( batchNodeRenderer );
				batchNodeRenderer->retain( );
			}
		}

		void SpriteBatchNodeScene::remove( DisplayObjectRenderer *renderer )
		{
			SpriteBatchNodeRenderer *batchNodeRenderer = dynamic_cast<SpriteBatchNodeRenderer *>(renderer);
			if ( batchNodeRenderer )
			{
				if ( NULL != batchNodeRenderer->getDisplayObject( )->getParent( ) )
				{
					batchNodeRenderer->getDisplayObject( )->removeFromParentAndCleanup( false );
				}
				this->m_Children->removeObject( batchNodeRenderer, false );
			}
		}

		CCSpriteBatchNode *SpriteBatchNodeScene::getSpriteBatchNode( std::string fileName )
		{
			if ( m_BatchNodes->objectForKey( fileName ) == NULL)
			{
				CCLog( "fileName:%s", fileName.c_str( ) );
				CCSpriteBatchNode *batchNode = CCSpriteBatchNode::create( fileName.c_str( ), 300 );
				if ( m_BatchNodeZOrders->objectForKey( fileName ) != NULL)
				{
					CCInteger* integer = (CCInteger*)m_BatchNodeZOrders->objectForKey( fileName );
					this->m_Container->addChild( batchNode ,integer->getValue( ));
				}
				else
				{
					this->m_Container->addChild( batchNode );
				}
				m_BatchNodes->setObject( batchNode, fileName );
			}
			return dynamic_cast<CCSpriteBatchNode * >(m_BatchNodes->objectForKey( fileName ));
		}

		void SpriteBatchNodeScene::setBatchNodeZOrder( std::string filename, int zOrder )
		{
			m_BatchNodeZOrders->setObject( CCInteger::create( zOrder ), filename );
		}

		NS_SF_END