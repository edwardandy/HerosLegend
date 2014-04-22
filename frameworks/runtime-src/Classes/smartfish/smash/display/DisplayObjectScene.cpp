// Created by Luke on 13-8-20.
//
// To change the template use AppCode | Preferences | File Templates.
//


#include "DisplayObjectScene.h"
#include "DisplayObjectRenderer.h"
#include "VisibleRect.h"
#include "cocos2d.h"
#include "../time/AnimatedComponent.h"

USING_NS_CC;
NS_SF_BEGIN
		DisplayObjectScene::DisplayObjectScene( )
		{
			m_Children = CCArray::create( );
			m_Children->retain( );
		}

		DisplayObjectScene::~DisplayObjectScene( )
		{
			if ( m_Container )
			{
				if ( m_Container->getParent( ) != NULL)
				{
					m_Container->removeFromParentAndCleanup( true );
				}
			}
		}

		void DisplayObjectScene::onFrame( float deltaTime )
		{
			AnimatedComponent::onFrame( deltaTime );
			reorderChildren( );
		}

		void DisplayObjectScene::reorderChildren( )
		{
			int len = m_Children->count( );
			CCObject *pChild = NULL;
			CCARRAY_FOREACH(m_Children, pChild)
				{
					DisplayObjectRenderer *renderer = ( DisplayObjectRenderer * ) pChild;
					int i = 0;
					int zIndex = len;
					while ( i < len )
					{
						DisplayObjectRenderer *that = ( DisplayObjectRenderer * ) m_Children->objectAtIndex( i );
						if ( renderer->getPosition( ).y > that->getPosition( ).y )
						{
							zIndex--;
						}
						i++;
					}
					renderer->setZOrder( zIndex );
				}
		}

		void DisplayObjectScene::setSceneView( CCNode *sceneView )
		{
			m_Container = sceneView;
			m_Container->retain( );
		}

		CCNode *DisplayObjectScene::getSceneView( )
		{
			return m_Container;
		}

		void DisplayObjectScene::add( DisplayObjectRenderer *renderer )
		{
			if ( m_Container )
			{
				m_Children->addObject( renderer );
				renderer->retain( );
				m_Container->addChild( renderer->getDisplayObject( ), 1 );
			}
		}

		void DisplayObjectScene::remove( DisplayObjectRenderer *renderer )
		{
			if ( m_Container && renderer && renderer->getDisplayObject( )->getParent( ) == m_Container )
			{
				m_Children->removeObject( renderer, false );
				m_Container->removeChild( renderer->getDisplayObject( ), false );
			}
		}

		void DisplayObjectScene::onAdd( )
		{
			AnimatedComponent::onAdd( );
		}

		void DisplayObjectScene::onRemove( )
		{
			if ( m_Container )
			{
				m_Container->removeAllChildrenWithCleanup( false );
			}
			AnimatedComponent::onRemove( );
		}


		void DisplayObjectScene::onStop( )
		{
			AnimatedComponent::onStop( );
		}

		void DisplayObjectScene::onResume( )
		{
			AnimatedComponent::onResume( );
		}

		NS_SF_END