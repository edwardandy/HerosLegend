//
// Created by Luke on 13-12-20.
//

#include "SpriteBatchNodeRenderer.h"
#include "DisplayObjectScene.h"
NS_SF_BEGIN

		SpriteBatchNodeRenderer::SpriteBatchNodeRenderer( ):DisplayObjectRenderer()
		{
		}

		SpriteBatchNodeRenderer::~SpriteBatchNodeRenderer( )
		{
//			CCLOG("~SpriteBatchNodeRenderer");
		}

		void SpriteBatchNodeRenderer::setView( )
		{

		}

		void SpriteBatchNodeRenderer::setSprite( CCSprite *value )
		{
			if ( m_pContainer )
			{
				m_pContainer->removeAllChildren( );
				m_pContainer->removeFromParentAndCleanup( true );
				m_pContainer = NULL;
			}
			if(value == NULL)
			{
				CCAssert(false, "SpriteBatchNodeRenderer's displayobject must be CCSprite*");
			}
			this->m_pContainer = value;
			this->m_pContainer->retain( );
			if(_inScene)
			{
				removeFromScene( );
				addToScene( );
			}

			m_ScaleDirty = true;
			m_RotationDirty = true;
			m_ZOrderDirty = true;
			m_PositionDirty = true;
			m_SkewDirty = true;
		}

		void SpriteBatchNodeRenderer::onAdd( )
		{
			AnimatedComponent::onAdd( );
			mScene = dynamic_cast<DisplayObjectScene *>(this->getOwner( )->lookupComponentByEntity( "scene", "world" ));
			addToScene( );
		}

		void SpriteBatchNodeRenderer::addChild( CCNode *child, const char *name )
		{
			CCAssert(false, "SpriteBatchNodeRenderer can't add child");
		}

		void SpriteBatchNodeRenderer::addChild( CCNode *child, const char *name, int zOrder )
		{
			CCAssert(false, "SpriteBatchNodeRenderer can't add child");
		}

		void SpriteBatchNodeRenderer::removeChildByName( const char *name )
		{
			CCAssert(false, "SpriteBatchNodeRenderer can't remove child");
		}

		void SpriteBatchNodeRenderer::removeChild( CCNode *child )
		{
			CCAssert(false, "SpriteBatchNodeRenderer can't remove child");
		}

NS_SF_END