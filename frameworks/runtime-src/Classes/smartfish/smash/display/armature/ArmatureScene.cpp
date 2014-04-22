//
// Created by Luke on 14-2-19.
//

#include "ArmatureScene.h"
#include "ArmatureRenderer.h"

NS_SF_BEGIN
		ArmatureScene::ArmatureScene( )
		{
			m_BatchNodes = CCDictionary::create( );
			m_BatchNodes->retain( );

			m_BatchNodeZOrders = CCDictionary::create( );
			m_BatchNodeZOrders->retain( );
		}

		ArmatureScene::~ArmatureScene( )
		{
			CCDictElement *pElement = NULL;
			CCDICT_FOREACH(m_BatchNodes, pElement)
				{
					CCBatchNode *batchNode = dynamic_cast<CCBatchNode * >(pElement->getObject( ));
					batchNode->removeFromParentAndCleanup( true );
				}
			CC_SAFE_RELEASE(m_BatchNodes);
		}

		void ArmatureScene::setSceneView( CCNode *sceneView )
		{
			DisplayObjectScene::setSceneView( sceneView );
		}

		void ArmatureScene::add( DisplayObjectRenderer *renderer )
		{
			ArmatureRenderer *armatureRenderer = dynamic_cast<ArmatureRenderer *>(renderer);
			CCArmature *armature = dynamic_cast<CCArmature *>(armatureRenderer->getDisplayObject( ));
			if ( armature == NULL)
			{
				return;
			}
			CCBatchNode *batchNode = getBatchNode( armatureRenderer->getTextureFileName( ) );
			batchNode->addChild( armature );

			if ( !this->m_Children->containsObject( armatureRenderer ) )
			{
				this->m_Children->addObject( armatureRenderer );
			}
		}

		void ArmatureScene::remove( DisplayObjectRenderer *renderer )
		{
			ArmatureRenderer *armatureRenderer = dynamic_cast<ArmatureRenderer *>(renderer);
			if ( armatureRenderer )
			{
				if ( NULL != armatureRenderer->getDisplayObject( )->getParent( ) )
				{
					armatureRenderer->getDisplayObject( )->removeFromParentAndCleanup( false );
				}
				this->m_Children->removeObject( armatureRenderer, false );
			}
		}

		void ArmatureScene::onFrame( float deltaTime )
		{
			DisplayObjectScene::onFrame( deltaTime );
		}

		void ArmatureScene::setBatchNodeZOrder( std::string filename, int zOrder )
		{
			m_BatchNodeZOrders->setObject( CCInteger::create( zOrder ), filename );
		}

		CCBatchNode *ArmatureScene::getBatchNode( std::string fileName )
		{
			if(fileName == "")
			{
				fileName = "default";
			}
			if ( m_BatchNodes->objectForKey( fileName ) == NULL)
			{
				CCBatchNode *batchNode = CCBatchNode::create( );
				if ( m_BatchNodeZOrders->objectForKey( fileName ) != NULL)
				{
					CCInteger *integer = ( CCInteger * ) m_BatchNodeZOrders->objectForKey( fileName );
					this->m_Container->addChild( batchNode, integer->getValue( ) );
				}
				else
				{
					this->m_Container->addChild( batchNode );
				}
				m_BatchNodes->setObject( batchNode, fileName );
			}
			return dynamic_cast<CCBatchNode * >(m_BatchNodes->objectForKey( fileName ));
		}

		NS_SF_END
