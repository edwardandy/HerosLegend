// Created by Luke on 13-9-5.
//
// To change the template use AppCode | Preferences | File Templates.
//



#ifndef __RowTransformComponent_H_
#define __RowTransformComponent_H_

#include <iostream>
#include "../time/TickedComponent.h"
#include "cocos2d.h"


USING_NS_CC;
NS_SF_BEGIN
		class RowDataComponent;

		class RowSpatialObjectComponent;

		class DisplayObjectRenderer;

		class RowTransformComponent : public smartfish::TickedComponent
		{
		public:
			RowTransformComponent( );

			virtual ~RowTransformComponent( );

			cocos2d::CCPoint getRenderPosition( );

			virtual void setRowOffset(float value)
			{
				m_rowOffset = value;
			};
			virtual float getRowOffset()
			{
				return m_rowOffset;
			};
			virtual void setColOffset(float value)
			{
				m_colOffset = value;
			};
			virtual float getColOffset()
			{
				return m_colOffset;
			};
		private:
			float m_rowOffset;
			float m_colOffset;
			RowDataComponent *rowData;
			RowSpatialObjectComponent *spatial;
			DisplayObjectRenderer *render;

			virtual void onAdd( );

			virtual void onRemove( );

			virtual void onTick( float deltaTime );

		protected:
			virtual void onStop( );

			virtual void onResume( );
		};

		NS_SF_END
#endif //__RowTransformComponent_H_
