//
// Created by Luke on 13-12-26.
//

#include "FindingResponseComponent.h"
#include "RowSpatialManager.h"
#include "../strategy/FindingResponseStrategy.h"
#define MAX_TEAM_ID 100000
NS_SF_BEGIN
		FindingResponseComponent::FindingResponseComponent( )
		{
			m_IsConditionalTrue = true;
			m_Conditional = NULL;
			m_ObjectMask = NULL;
			m_Spatial   = NULL;
			m_TeamId    = MAX_TEAM_ID;
		}

		FindingResponseComponent::~FindingResponseComponent( )
		{
//			CCLOG( "~FindingResponseComponent" );
			if ( m_ObjectMask )
			{
				m_ObjectMask->release( );
			}
			if ( m_Conditional )
			{
				CC_SAFE_RELEASE(m_Conditional);
			}
			m_RowSpatialManager = NULL;
			m_Spatial           = NULL;
		}

		void FindingResponseComponent::setFindingRange( float left, float right, float front, float back )
		{
			m_OffsetLeft = left;
			m_OffsetRight = right;
			m_OffsetFront = front;
			m_OffsetBack = back;
		}

		void FindingResponseComponent::onAdd( )
		{
			StrategyContainingComponent::onAdd( );
			if ( m_Conditional )
			{
				m_Conditional->setOwner( this->getOwner( ) );
			}
			m_Spatial = dynamic_cast<RowSpatialObjectComponent * >(this->getOwner( )->lookupComponent( "spatial" ));
			m_RowSpatialManager = dynamic_cast<RowSpatialManager * >(this->getOwner( )->lookupComponentByEntity( "rowSpatialManager", "world" ));
		}

		void FindingResponseComponent::onRemove( )
		{
			StrategyContainingComponent::onRemove( );
		}


		void FindingResponseComponent::onStop( )
		{
			StrategyContainingComponent::onStop( );
		}

		void FindingResponseComponent::onResume( )
		{
			StrategyContainingComponent::onResume( );
		}

		void FindingResponseComponent::find( )
		{
			if ( m_Conditional != NULL && !m_Conditional->isConditionalTrue( ) )
			{
				return;
			}
			if ( !m_IsConditionalTrue ) return;

			if (!m_Spatial || !m_RowSpatialManager || !m_ObjectMask )
			{
				return;
			}
			//如果是敌方，前后面得互换一下。
			int searchTeamId = m_TeamId == MAX_TEAM_ID ? ( this->getOwner( )->getTeamId( ) * ( -1 ) ) : m_TeamId;
			CCArray *m_CollisionResults;
			if(this->getOwner( )->getTeamId( ) == -1)
			{
				m_CollisionResults = m_RowSpatialManager->querySpan( floor( m_Spatial->getRenderCol( ) - this->m_OffsetLeft ), ceil(m_Spatial->getRenderCol( ) + this->m_OffsetRight ), ceil(m_Spatial->getRenderRow( ) - this->m_OffsetFront ), floor(m_Spatial->getRenderRow( ) + this->m_OffsetBack ), m_ObjectMask ,NULL,searchTeamId);
			}
			else
			{
				m_CollisionResults = m_RowSpatialManager->querySpan( floor( m_Spatial->getRenderCol( ) - this->m_OffsetLeft ), ceil(m_Spatial->getRenderCol( ) + this->m_OffsetRight ), ceil(m_Spatial->getRenderRow( ) - this->m_OffsetBack ), floor(m_Spatial->getRenderRow( ) + this->m_OffsetFront ), m_ObjectMask ,NULL,searchTeamId);
			}

			if ( m_CollisionResults->count( ) > 0 )
			{
				cocos2d::CCObject *object;
				CCARRAY_FOREACH(this->getStrategies( ), object)
					{
						FindingResponseStrategy *strategy = ( FindingResponseStrategy * ) object;
						if ( strategy == NULL)
						{
							continue;
						}
						strategy->onFind( m_CollisionResults );
					}
			}
		}

		void FindingResponseComponent::onTick( float deltaTime )
		{
			find( );
			StrategyContainingComponent::onTick( deltaTime );
		}

		NS_SF_END