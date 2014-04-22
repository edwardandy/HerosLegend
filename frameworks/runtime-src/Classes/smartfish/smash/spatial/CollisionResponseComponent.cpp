//
// Created by Luke on 13-11-22.
//


#include "CollisionResponseComponent.h"
#include "RowSpatialManager.h"
#include "../strategy/CollisionResponseStrategy.h"
#define MAX_TEAM_ID 10000000
NS_SF_BEGIN
		CollisionResponseComponent::CollisionResponseComponent( )
		{
			m_Spatial = NULL;
			m_IsConditionalTrue = true;
			m_Conditional = NULL;
			m_ObjectMask = NULL;
			m_TeamId = MAX_TEAM_ID;
		}

		CollisionResponseComponent::~CollisionResponseComponent( )
		{
//			CCLOG( "~CollisionResponseComponent" );
			if ( m_ObjectMask )
			{
				m_ObjectMask->release( );
			}
			if ( m_Conditional )
			{
				CC_SAFE_RELEASE(m_Conditional);
			}
			m_Spatial = NULL;
			m_RowSpatialManager = NULL;
		}

		void CollisionResponseComponent::onAdd( )
		{
			StrategyContainingComponent::onAdd( );
			if ( m_Conditional )
			{
				m_Conditional->setOwner( this->getOwner( ) );
			}
			m_Spatial = dynamic_cast<RowSpatialObjectComponent * >(this->getOwner( )->lookupComponent( "spatial" ));
			m_RowSpatialManager = dynamic_cast<RowSpatialManager * >(this->getOwner( )->lookupComponentByEntity( "rowSpatialManager", "world" ));
		}

		void CollisionResponseComponent::onRemove( )
		{
			StrategyContainingComponent::onRemove( );
		}


		void CollisionResponseComponent::onStop( )
		{
			StrategyContainingComponent::onStop( );
		}

		void CollisionResponseComponent::onResume( )
		{
			StrategyContainingComponent::onResume( );
		}

		void CollisionResponseComponent::checkCollision( )
		{
			if ( m_Conditional != NULL && !m_Conditional->isConditionalTrue( ) )
			{
				return;
			}
			if ( !m_IsConditionalTrue ) return;

			if ( !m_Spatial || !m_RowSpatialManager || !m_ObjectMask )
			{
				return;
			}
			int searchTeamId = m_TeamId == MAX_TEAM_ID ? ( this->getOwner( )->getTeamId( ) * ( -1 ) ) : m_TeamId;
			CCArray *m_CollisionResults = m_RowSpatialManager->querySpan( m_Spatial->getMinCol( ), m_Spatial->getMaxCol( ), m_Spatial->getMinRow( ), m_Spatial->getMaxRow( ), m_ObjectMask, m_Spatial, searchTeamId );
			if ( m_CollisionResults->count( ) > 0 )
			{
				cocos2d::CCObject *object;
				CCARRAY_FOREACH(this->getStrategies( ), object)
					{
						CollisionResponseStrategy *strategy = ( CollisionResponseStrategy * ) object;
						if ( strategy == NULL)
						{
							continue;
						}
						strategy->onCollision( m_CollisionResults );
					}
			}
		}

		void CollisionResponseComponent::onTick( float deltaTime )
		{
			checkCollision( );
			StrategyContainingComponent::onTick( deltaTime );
		}

		NS_SF_END