// Created by Luke on 13-8-25.
//
// To change the template use AppCode | Preferences | File Templates.
//


#include "RowSpatialObjectComponent.h"
#include "RowSpatialManager.h"
#include "ObjectType.h"

NS_SF_BEGIN
		RowSpatialObjectComponent::RowSpatialObjectComponent( )
		{
			m_nRow = -1;
			m_nCol = -1;
			m_Width = 1.0;
			m_Height = 1.0;
			m_fRenderRow = 0.0;
			m_fRenderCol = 0.0;
			m_fVelX = 0;
			m_fVelY = 0;
			m_mObjecttype = NULL;
			mRowSpatialManager = NULL;
			m_IsSyncPosition = true;
		}

		RowSpatialObjectComponent::~RowSpatialObjectComponent( )
		{
//			CCLOG( "~RowSpatialObjectComponent");
			if ( m_mObjecttype )
			{
				m_mObjecttype->release( );
			}
		}

		void RowSpatialObjectComponent::onAdd( )
		{
			TickedComponent::onAdd( );
			mRowSpatialManager = RowSpatialManager::getInstance();
			mRowSpatialManager->fastRemove( this );
			mRowSpatialManager->addSpatialObject( this );
		}

		void RowSpatialObjectComponent::onRemove( )
		{
			if ( mRowSpatialManager )
			{
				mRowSpatialManager->removeSpatialObject( this );
			}
			TickedComponent::onRemove( );
		}


		void RowSpatialObjectComponent::onStop( )
		{
			if ( mRowSpatialManager )
			{
				mRowSpatialManager->removeSpatialObject( this );
			}
			TickedComponent::onStop( );
		}

		void RowSpatialObjectComponent::onResume( )
		{
			if ( mRowSpatialManager )
			{
				mRowSpatialManager->fastRemove( this );
				mRowSpatialManager->addSpatialObject( this );
			}
			TickedComponent::onResume( );
		}

		int RowSpatialObjectComponent::getRow( )
		{
			return m_nRow;
		}

		int RowSpatialObjectComponent::getCol( )
		{
			return m_nCol;
		}

		void RowSpatialObjectComponent::setRow( int value )
		{
			if ( value == m_nRow )
			{
				return;
			}
			if ( mRowSpatialManager != NULL )
			{
				mRowSpatialManager->fastRemove( this );
			}
			m_nRow = value;
			if ( mRowSpatialManager != NULL )
			{
				mRowSpatialManager->addSpatialObject( this );
			}
		}

		void RowSpatialObjectComponent::setCol( int value )
		{
			if ( value == m_nCol )
			{
				return;
			}
			if ( mRowSpatialManager != NULL )
			{
				mRowSpatialManager->fastRemove( this );
			}
			m_nCol = value;
			if ( mRowSpatialManager != NULL )
			{
				mRowSpatialManager->addSpatialObject( this );
			}
		}

		void RowSpatialObjectComponent::setRenderRow( float value )
		{
			m_fRenderRow = value;
			if ( this->getIsSyncPosition( ) )
			{
				setRow( int( m_fRenderRow ) );
			}
		}

		float RowSpatialObjectComponent::getRenderRow( )
		{
			return m_fRenderRow;
		}

		void RowSpatialObjectComponent::setRenderCol( float value )
		{
			m_fRenderCol = value;
			if ( this->getIsSyncPosition( ) )
			{
				setCol( int( m_fRenderCol ) );
			}
		}

		float RowSpatialObjectComponent::getRenderCol( )
		{
			return m_fRenderCol;
		}

		void RowSpatialObjectComponent::onTick( float deltaTime )
		{

			m_fRenderCol += float( m_fVelX );
			m_fRenderRow += float( m_fVelY );
			if ( this->getIsSyncPosition( ) )
			{
				setCol( int( m_fRenderCol ) );
				setRow( int( m_fRenderRow ) );
			}
		}

		ObjectType *RowSpatialObjectComponent::getObjectType( )
		{
			return m_mObjecttype;
		}

		void RowSpatialObjectComponent::setObjectType( ObjectType *value )
		{
			if ( value )
			{
				value->retain( );
			}
			m_mObjecttype = value;
		}

		float RowSpatialObjectComponent::getVelY( )
		{
			return m_fVelY;
		}

		void RowSpatialObjectComponent::setVelX( float value )
		{
			m_fVelX = value;
		}

		void RowSpatialObjectComponent::setVelY( float value )
		{
			m_fVelY = value;
		}

		float RowSpatialObjectComponent::getVelX( )
		{
			return m_fVelX;
		}

		int RowSpatialObjectComponent::getMinCol( )
		{
			return floor(m_fRenderCol - m_Width/2);
		}

		int RowSpatialObjectComponent::getMaxCol( )
		{
			return ceil( m_fRenderCol + m_Width/2 );
		}

		int RowSpatialObjectComponent::getMinRow( )
		{
			return m_nRow;
		}

		int RowSpatialObjectComponent::getMaxRow( )
		{
			return ceil( m_fRenderRow + m_Height );
		}

		cocos2d::CCRect RowSpatialObjectComponent::getRect( )
		{
			//因为render都是居中对齐的。
			cocos2d::CCRect rect = cocos2d::CCRectMake(m_fRenderCol + ( 1 - m_Width ) / 2, m_fRenderRow, m_Width , m_Height);
			return rect;
		}

		NS_SF_END
