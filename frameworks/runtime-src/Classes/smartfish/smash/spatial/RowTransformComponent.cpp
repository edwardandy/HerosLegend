// Created by Luke on 13-9-5.
//
// To change the template use AppCode | Preferences | File Templates.
//


#include "RowTransformComponent.h"
#include "RowDataComponent.h"
#include "RowSpatialObjectComponent.h"
#include "../display/DisplayObjectRenderer.h"

NS_SF_BEGIN
		RowTransformComponent::RowTransformComponent( )
		{
			rowData = NULL;
			spatial = NULL;
			render = NULL;
			m_colOffset = 0;
			m_rowOffset = 0;
			updatePriority = 0;
		}

		RowTransformComponent::~RowTransformComponent( )
		{
			rowData = NULL;
			spatial = NULL;
			render = NULL;
		}

		CCPoint RowTransformComponent::getRenderPosition( )
		{
			CCPoint point;
//			CCLOG("spatial->getRenderCol( ):%f",spatial->getRenderCol( ));
			if(rowData != NULL)
			{
				point = rowData->localToGlobal( CCPoint( spatial->getRenderCol( ) + m_colOffset, -( spatial->getRenderRow( ) + m_rowOffset ) ) );
			}
			return point;
		}

		void RowTransformComponent::onAdd( )
		{
			TickedComponent::onAdd( );
			rowData = dynamic_cast<RowDataComponent *>(this->getOwner( )->lookupComponentByEntity( "rowData", "world" ));

			spatial = dynamic_cast<RowSpatialObjectComponent *>(this->getOwner( )->lookupComponent( "spatial" ));
			render = dynamic_cast<DisplayObjectRenderer *>(this->getOwner( )->lookupComponent( "render" ));
			onTick(0.016);
		}

		void RowTransformComponent::onRemove( )
		{
			rowData = NULL;
			spatial = NULL;
			render = NULL;
			TickedComponent::onRemove( );
		}


		void RowTransformComponent::onStop( )
		{
			TickedComponent::onStop( );
		}

		void RowTransformComponent::onResume( )
		{
			TickedComponent::onResume( );
		}

		void RowTransformComponent::onTick( float deltaTime )
		{
			TickedComponent::onTick( deltaTime );
			if ( render )
			{
				render->setPosition( getRenderPosition( ) );
			}
		}


		NS_SF_END