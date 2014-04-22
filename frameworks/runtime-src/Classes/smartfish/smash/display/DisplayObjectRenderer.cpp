// Created by Luke on 13-8-20.
//
// To change the template use AppCode | Preferences | File Templates.
//


#include "DisplayObjectRenderer.h"
#include "DisplayObjectScene.h"
#include "RowDataComponent.h"

USING_NS_CC;
NS_SF_BEGIN
		DisplayObjectRenderer::DisplayObjectRenderer( )
		{
			_inScene = false;
			m_bVisible = true;
			m_fScaleX = m_fScaleY = 1;
			m_fSkewX = m_fSkewY = 1;
			m_obPosition = CCPoint( 0, 0 );
			m_OffsetPosition = CCPoint( 0, 0 );
			m_fRotationX = m_fRotationY = 0;
			m_ZOrder = 0;
			m_Children.clear( );
			m_pContainer = NULL;

			m_ScaleDirty = false;
			m_RotationDirty = false;
			m_ZOrderDirty = false;
			m_PositionDirty = false;
			m_SkewDirty = false;
			setView( );
		}

		DisplayObjectRenderer::~DisplayObjectRenderer( )
		{
//			CCLOG("~DisplayObjectRenderer");
			mScene = NULL;
			_inScene = false;
			if ( m_pContainer )
			{
				m_pContainer->removeAllChildren( );
				CC_SAFE_RELEASE(m_pContainer);
			}
			m_Children.clear( );
		}

		void DisplayObjectRenderer::setView( )
		{
			m_pContainer = CCLayer::create( );
//			m_pContainer = CCLayerColor::create( ccc4( floor( rand( ) * 225 ), floor( rand( ) * 225 ), floor( rand( ) * 225 ), floor( rand( ) * 225 ) ) );
			m_pContainer->retain( );
			m_pContainer->setAnchorPoint( CCPoint( 0, 0 ) );
			m_pContainer->ignoreAnchorPointForPosition( false );
		}

		void DisplayObjectRenderer::removeChild( CCNode *child )
		{
			std::map<std::string, CCNode * >::iterator it = m_Children.begin( );
			for ( ; it != m_Children.end( ); )
			{
				if ( it->second == child )
				{
					m_Children.erase( it++ );
					m_pContainer->removeChild( child, true );
				}
				else
				{
					it++;
				}
			}
		}

		void DisplayObjectRenderer::removeChildByName( const char *name )
		{
			std::map<std::string, CCNode * >::iterator it = m_Children.find( name );
			if ( it != m_Children.end( ) )
			{
				CCNode *child = it->second;
				m_Children.erase( it );
				m_pContainer->removeChild( child, true );
			}
		}

		void DisplayObjectRenderer::addChild( CCNode *child, const char *name )
		{
			this->addChild( child, name, child->getZOrder( ) );
		}

		void DisplayObjectRenderer::addChild( CCNode *child, const char *name, int zOrder )
		{
			if ( !child )
			{
				return;
			}
			if ( m_Children.find( name ) != m_Children.end( ) )
			{
				CCAssert(false, "child's name is exists,pls set another name");
				return;
			}

			m_pContainer->addChild( child, zOrder );
			//TODO need to set the biggest rect in the children.
//			m_pContainer->setContentSize( child->getContentSize( ) );
			m_Children[ name ] = child;
		}

		CCNode *DisplayObjectRenderer::getChildByName( const char *name )
		{
			if ( m_Children.find( name ) != m_Children.end( ) )
			{
				return m_Children[ name ];
			}
			return NULL;
		}


		void DisplayObjectRenderer::onFrame( float deltaTime )
		{
			AnimatedComponent::onFrame( deltaTime );
			if ( m_pContainer == NULL)
			{
				return;
			}
			if ( m_ScaleDirty )
			{
				m_pContainer->setScaleX( m_fScaleX );
				m_pContainer->setScaleY( m_fScaleY );
				m_ScaleDirty = false;
			}
			if ( m_RotationDirty )
			{
				m_pContainer->setRotationX( m_fRotationX );
				m_pContainer->setRotationY( m_fRotationY );
				m_RotationDirty = false;
			}
			if ( m_PositionDirty )
			{
				m_pContainer->setPosition( m_obPosition + m_OffsetPosition );
				m_pContainer->setPosition( m_obPosition + m_OffsetPosition );
				m_PositionDirty = false;
			}
			if(m_SkewDirty)
			{
				m_pContainer->setSkewX( m_fSkewX );
				m_pContainer->setSkewY( m_fSkewY );
				m_SkewDirty = false;
			}
			if(m_ZOrderDirty)
			{
				if ( this->getDisplayObject( ) && this->getDisplayObject( )->getParent( ) )
				{
					this->getDisplayObject( )->getParent( )->reorderChild( this->getDisplayObject( ), this->m_ZOrder );
				}
				m_ZOrderDirty = false;
			}
		}

		void DisplayObjectRenderer::setPositionX( float value )
		{
			if ( m_obPosition.x != value )
			{
				m_obPosition.x = value;
				m_PositionDirty = true;
			}
		}

		void DisplayObjectRenderer::setPositionY( float value )
		{
			if ( m_obPosition.y != value )
			{
				m_obPosition.y = value;
				m_PositionDirty = true;
			}
		}

		void DisplayObjectRenderer::setPosition( const CCPoint &pos )
		{
			if ( pos.x != m_obPosition.x || pos.y != m_obPosition.y )
			{
				m_obPosition = pos;
				m_PositionDirty = true;
			}
		}

		void DisplayObjectRenderer::setOffsetPosition( const cocos2d::CCPoint &pos )
		{
			if ( pos.x != m_OffsetPosition.x || pos.y != m_OffsetPosition.y )
			{
				m_OffsetPosition.x = pos.x;
				m_OffsetPosition.y = pos.y;
				m_PositionDirty = true;
			}
		}

		const CCPoint &DisplayObjectRenderer::getPosition( )
		{
			return m_obPosition;
		}

		void DisplayObjectRenderer::setScaleX( float fScaleX )
		{
			m_fScaleX = fScaleX;
			m_ScaleDirty = true;
		}

		void DisplayObjectRenderer::setScaleY( float fScaleY )
		{
			m_fScaleY = fScaleY;
			m_ScaleDirty = true;
		}

		float DisplayObjectRenderer::getScaleX( )
		{
			return m_fScaleX;
		}

		float DisplayObjectRenderer::getScaleY( )
		{
			return m_fScaleY;
		}

		void DisplayObjectRenderer::setZOrder( int value )
		{
			this->m_ZOrder = value;
			m_ZOrderDirty = true;
		}

		int DisplayObjectRenderer::getZOrder( )
		{
			return this->m_ZOrder;
		}

		void DisplayObjectRenderer::setRotation( float fRotation )
		{
			if ( m_fRotationX != fRotation || m_fRotationY != fRotation )
			{
				m_fRotationX = m_fRotationY = fRotation;
				m_RotationDirty = true;
			}
		}

		void DisplayObjectRenderer::setRotationX( float fRotationX )
		{
			if ( m_fRotationX != fRotationX )
			{
				m_fRotationX = fRotationX;
				m_RotationDirty = true;
			}
		}

		void DisplayObjectRenderer::setRotationY( float fRotationY )
		{
			if ( m_fRotationY != fRotationY )
			{
				m_fRotationY = fRotationY;
				m_RotationDirty = true;
			}
		}

		void DisplayObjectRenderer::setSkewX( float sx )
		{
			if ( m_fSkewX != sx )
			{
				m_fSkewX = sx;
				m_SkewDirty = true;
			}
		}

		void DisplayObjectRenderer::setSkewY( float sy )
		{
			if ( m_fSkewY != sy )
			{
				m_fSkewY = sy;
				m_SkewDirty = true;
			}
		}

		float DisplayObjectRenderer::getSkewX( )
		{
			return m_fSkewX;
		}

		float DisplayObjectRenderer::getSkewY( )
		{
			return m_fSkewY;
		}

		bool DisplayObjectRenderer::isVisible( )
		{
			return m_bVisible;
		}

		float DisplayObjectRenderer::getRotation( )
		{
			CCAssert(m_fRotationX == m_fRotationY, "DisplayObjectRenderer#rotation. RotationX != RotationY. Don't know which one to return");
			return m_fRotationX;
		}

		float DisplayObjectRenderer::getRotationX( )
		{
			return m_fRotationX;
		}

		float DisplayObjectRenderer::getRotationY( )
		{
			return m_fRotationY;
		}

		void DisplayObjectRenderer::setScale( float value )
		{
			if ( m_fScaleX != value || m_fScaleY != value )
			{
				m_fScaleX = m_fScaleY = value;
				this->m_ScaleDirty = true;
			}
		}

		float DisplayObjectRenderer::getScale( )
		{
			CCAssert( m_fScaleX == m_fScaleY, "DisplayObjectRenderer#scale. ScaleX != ScaleY. Don't know which one to return");
			return m_fScaleX;
		}

		void DisplayObjectRenderer::setVisible( bool bVisible )
		{
			if ( m_bVisible != bVisible )
			{
				m_bVisible = bVisible;
				m_pContainer->setVisible( m_bVisible );
			}
		}

		void DisplayObjectRenderer::onAdd( )
		{
			AnimatedComponent::onAdd( );
			mScene = dynamic_cast<DisplayObjectScene *>(this->getOwner( )->lookupComponentByEntity( "scene", "world" ));
			addToScene( );
		}

		void DisplayObjectRenderer::onRemove( )
		{
			AnimatedComponent::onRemove( );
			removeFromScene( );
		}

		CCNode *DisplayObjectRenderer::getDisplayObject( )
		{
			return m_pContainer;
		}

		void DisplayObjectRenderer::addToScene( )
		{
			if ( mScene && m_pContainer && !_inScene )
			{
				m_pContainer->setPosition( -2000, -2000 );
				mScene->add( this );
				_inScene = true;
			}
		}

		void DisplayObjectRenderer::removeFromScene( )
		{
			if ( mScene && m_pContainer && _inScene )
			{
				mScene->remove( this );
				_inScene = false;
			}
		}

		NS_SF_END