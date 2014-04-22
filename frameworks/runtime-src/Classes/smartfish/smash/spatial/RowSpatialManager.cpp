// Created by Luke on 13-8-25.
//
// To change the template use AppCode | Preferences | File Templates.
//


#include <assert.h>
#include "RowSpatialManager.h"
#include "RowSpatialObjectComponent.h"
#include "../util/ObjectType.h"
#include <algorithm>

NS_SF_BEGIN
		RowSpatialManager *RowSpatialManager::mInstance = NULL;

		RowSpatialManager::RowSpatialManager( )
		{
			m_Pool.clear( );
			mSpatials = cocos2d::CCArray::create( );
			mSpatials->retain( );
			needRemoveList = NULL;
		}

		RowSpatialManager::~RowSpatialManager( )
		{
			mSpatials->removeAllObjects( );
			CCLOG("============================================ ~RowSpatialManager ============");
		}

		RowSpatialManager *RowSpatialManager::getInstance( )
		{
			if ( mInstance == NULL)
			{
				mInstance = new RowSpatialManager( );
			}

			return mInstance;
		}

		void RowSpatialManager::addSpatialObject( RowSpatialObjectComponent *value )
		{
			if ( value->getRow( ) < m_nRows && value->getCol( ) < m_nCols && value->getRow( ) >= 0 && value->getCol( ) >= 0 )
			{
				int index = value->getRow( ) * m_nCols + value->getCol( );
				if ( m_Pool.size( ) < index )
				{
					printf( "[RowSpatialManager] m_Pool index is out of range" );
					assert(false);
				}
				if ( std::find( m_Pool.at( index ).begin( ), m_Pool.at( index ).end( ), value ) == m_Pool.at( index ).end( ) )
				{
					m_Pool.at( index ).push_back( value );
					mSpatials->addObject( value );
				}
			}
//			else
//			{
//				printf( "[RowSpatialManager] index is out of range row:%d,col:%d", value->getRow( ), value->getCol( ) );
//				assert(value->getRow( ) >= 0 && value->getCol( ) >= 0);
//			}
		}

		void RowSpatialManager::fastRemove( RowSpatialObjectComponent *value )
		{
			int index = value->getRow( ) * m_nCols + value->getCol( );
			if ( m_Pool.size( ) > index )
			{
				std::vector<RowSpatialObjectComponent *>::iterator it = std::find( m_Pool.at( index ).begin( ), m_Pool.at( index ).end( ), value );

				if ( it != m_Pool.at( index ).end( ) )
				{
					m_Pool.at( index ).erase( it );
					mSpatials->removeObject( value, false );
				}
			}
		}

		void RowSpatialManager::removeSpatialObject( RowSpatialObjectComponent *value )
		{
			if ( needRemoveList == NULL)
			{
				needRemoveList = cocos2d::CCArray::create( );
				needRemoveList->retain( );
				needRemoveList->removeAllObjects( );
			}
			if ( needRemoveList->containsObject( value ) == false )
			{
				needRemoveList->addObject( value );
			}
		}

		void RowSpatialManager::setup( int rows, int cols )
		{
			m_nRows = rows;
			m_nCols = cols;
			m_nSize = m_nRows * m_nCols;
			std::vector<RowSpatialObjectComponent *> vector;
			for ( int j = 0; j < m_nSize; j++ )
			{
				m_Pool.push_back( vector );
			}
		}

		cocos2d::CCArray *RowSpatialManager::querySpan( int minCol, int maxCol, int minRow, int maxRow, ObjectType *mask, RowSpatialObjectComponent *rectSpatial, int teamId )
		{
			//out of the bound
			cocos2d::CCArray *results = cocos2d::CCArray::create( );
			if ( minCol >= m_nCols || minRow >= m_nRows )
			{
				return results;
			}

			if ( rectSpatial != NULL)
			{
				//如果碰撞的对象不为空，则把碰撞的区域拉大一格。
				minCol -= 1;
				maxCol += 1;

				minRow -= 1;
				maxRow += 1;
			}

			minCol = std::max( minCol, 0 );
			maxCol = std::min( maxCol, m_nCols );
			minRow = std::max( minRow, 0 );
			maxRow = std::min( maxRow, m_nRows );

//			CCLOG("minCol:%d", minCol);
//			CCLOG("maxCol:%d", maxCol);
//			CCLOG("minRow:%d", minRow);
//			CCLOG("maxRow:%d", maxRow);

			for ( int i = minRow; i < maxRow; i++ )
			{
				for ( int j = minCol; j < maxCol; j++ )
				{
					int index = i * m_nCols + j;
					for ( std::vector<RowSpatialObjectComponent *>::iterator iterator = m_Pool.at( index ).begin( ); iterator != m_Pool.at( index ).end( ); ++iterator )
					{
						RowSpatialObjectComponent *spatialObjectComponent = *iterator;
						if ( spatialObjectComponent && spatialObjectComponent->getOwner( ) && ( teamId == 0 || spatialObjectComponent->getOwner( )->getTeamId( ) == teamId ) )
						{
							if ( needRemoveList == NULL || ( needRemoveList != NULL && needRemoveList->containsObject( spatialObjectComponent ) == false ) )
							{
								if ( mask == NULL || ( mask != NULL && spatialObjectComponent->getObjectType( )->overlaps( mask ) ) )
								{
//									CCLOG("minCol:%d,maxCol:%d,minRow:%d,maxRow:%d,",minCol,maxCol,minRow,maxRow);
									if ( rectSpatial == NULL || ( rectSpatial != NULL && rectSpatial->getRect( ).intersectsRect( spatialObjectComponent->getRect( ) ) ) )
									{
										results->addObject( spatialObjectComponent );
									}
								}
							}
						}
					}
				}
			}
			if ( needRemoveList != NULL && needRemoveList->count( ) > 0 )
			{
				CCObject *pObject;
				CCARRAY_FOREACH(needRemoveList, pObject)
					{
						RowSpatialObjectComponent *spatial = ( RowSpatialObjectComponent * ) pObject;
						if ( spatial )
						{
							fastRemove( spatial );
							results->removeObject( spatial, false );
						}
					}
				needRemoveList->removeAllObjects( );
			}
			return results;
		}

		cocos2d::CCArray *RowSpatialManager::queryAll( cocos2d::CCRect rect, ObjectType *mask )
		{
			cocos2d::CCArray *results = cocos2d::CCArray::create( );
			CCObject *pObject;
			CCARRAY_FOREACH(mSpatials, pObject)
				{
					RowSpatialObjectComponent *spatial = ( RowSpatialObjectComponent * ) pObject;
					if ( spatial )
					{
						if ( ( mask == NULL || ( mask != NULL && spatial->getObjectType( )->overlaps( mask ) ) ) )
						{
							if ( intersectsRect( rect,spatial->getRect( ) ) )
							{
//								CCLOG("[rect] x:%f,y:%f,width:%f,height:%f", rect.origin.x, rect.origin.y, rect.size.width, rect.size.height);
//								CCLOG("[spatial->getRect( )] x:%f,y:%f,width:%f,height:%f", spatial->getRect( ).origin.x, spatial->getRect( ).origin.y, spatial->getRect( ).size.width, spatial->getRect( ).size.height);
//								CCLOG("=============================");
								results->addObject( spatial );
							}
						}
					}
				}
			if ( needRemoveList != NULL && needRemoveList->count( ) > 0 )
			{
				pObject;
				CCARRAY_FOREACH(needRemoveList, pObject)
					{
						RowSpatialObjectComponent *spatial = ( RowSpatialObjectComponent * ) pObject;
						if ( spatial )
						{
							fastRemove( spatial );
							results->removeObject( spatial, false );
						}
					}
				needRemoveList->removeAllObjects( );
			}
			return results;
		}

		bool RowSpatialManager::intersectsRect( const cocos2d::CCRect &rect, const cocos2d::CCRect &rect2 )
		{
			return !( rect2.getMaxX( ) <= rect.getMinX( ) ||
					rect.getMaxX( ) <= rect2.getMinX( ) ||
					rect2.getMaxY( ) <= rect.getMinY( ) ||
					rect.getMaxY( ) <= rect2.getMinY( ) );
		}

		NS_SF_END
