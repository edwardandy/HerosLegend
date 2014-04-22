//
// Created by Luke on 13-12-26.
//


#ifndef __FindingResponseComponent_H_
#define __FindingResponseComponent_H_

#include "../strategy/StrategyContainingComponent.h"
#include "RowSpatialObjectComponent.h"
#include "../conditional/Conditional.h"
#include "../util/ObjectType.h"
NS_SF_BEGIN
		class FindingResponseComponent : public smartfish::StrategyContainingComponent
		{
		public:
			FindingResponseComponent( );

			virtual ~FindingResponseComponent( );

			virtual void onAdd( );

			virtual void onRemove( );

			virtual void onTick( float deltaTime );

			ObjectType *getObjectMask( )
			{
				return m_ObjectMask;
			}

			void setObjectMask( ObjectType *value )
			{
				value->retain( );
				FindingResponseComponent::m_ObjectMask = value;
			}

			Conditional *getConditional( )
			{
				return m_Conditional;
			}

			void setConditional( Conditional *m_Conditional )
			{
				if(m_Conditional)
				{
					CC_SAFE_RELEASE(m_Conditional);
				}
				m_Conditional->retain( );
				FindingResponseComponent::m_Conditional->setOwner( this->getOwner( ) );
				FindingResponseComponent::m_Conditional = m_Conditional;
			}
			int getTeamId( )
			{
				return m_TeamId;
			}
			void setTeamId( int value )
			{
				FindingResponseComponent::m_TeamId = value;
			}
			void setFindingRange( float left,float right, float front,float back );
		private:
			void find( );
		private:
			RowSpatialObjectComponent* m_Spatial;
			RowSpatialManager* m_RowSpatialManager;
			ObjectType* m_ObjectMask;
			Conditional* m_Conditional;
			CCRect m_Rect;
			bool m_IsConditionalTrue;

			float m_OffsetFront;
			float m_OffsetLeft;
			float m_OffsetRight;
			float m_OffsetBack;
			int m_TeamId;
		protected:
			virtual void onStop( );

			virtual void onResume( );
		};

		NS_SF_END


#endif //__FindingResponseComponent_H_
