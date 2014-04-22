// Created by Luke on 13-8-25.
//
// To change the template use AppCode | Preferences | File Templates.
//



#ifndef __RowSpatialObjectComponent_H_
#define __RowSpatialObjectComponent_H_

#include <iostream>
#include "../time/TickedComponent.h"

NS_SF_BEGIN
		class ObjectType;

		class RowSpatialManager;

		class RowSpatialObjectComponent : public smartfish::TickedComponent
		{
		public:
			RowSpatialObjectComponent( );

			virtual ~RowSpatialObjectComponent( );

			virtual void onAdd( );

			virtual void onRemove( );

			virtual int getRow( );

			virtual void setRow( int value );

			virtual void setCol( int value );

			virtual int getCol( );

			virtual void setRenderRow( float value );

			virtual float getRenderRow( );

			virtual void setRenderCol( float value );

			virtual float getRenderCol( );

			virtual ObjectType *getObjectType( );

			virtual void setObjectType( ObjectType *value );

			virtual void setVelX( float value );

			virtual void setVelY( float value );

			virtual float getVelX( );

			virtual float getVelY( );

			virtual int getMinCol( );

			virtual int getMaxCol( );

			virtual int getMinRow( );

			virtual int getMaxRow( );

			virtual cocos2d::CCRect getRect();

			virtual void setIsSyncPosition( bool value )
			{
				RowSpatialObjectComponent::m_IsSyncPosition = value;
			};

			virtual bool getIsSyncPosition( )
			{
				return  RowSpatialObjectComponent::m_IsSyncPosition;
			};

			double getWidth( ) const
			{
				return m_Width;
			};

			void setWidth( double m_Width )
			{
				RowSpatialObjectComponent::m_Width = m_Width;
			};

			double getHeight( ) const
			{
				return m_Height;
			};

			void setHeight( double m_Height )
			{
				RowSpatialObjectComponent::m_Height = m_Height;
			};

		private:
			bool m_IsSyncPosition;
			double m_Width;
			double m_Height;

			int m_nRow;
			int m_nCol;
			float m_fVelX;
			float m_fVelY;

			ObjectType *m_mObjecttype;

			float m_fRenderRow;
			float m_fRenderCol;

			RowSpatialManager *mRowSpatialManager;

			virtual void onTick( float deltaTime );

		protected:
			virtual void onStop( );

			virtual void onResume( );
		};

		NS_SF_END
#endif //__RowSpatialObjectComponent_H_
