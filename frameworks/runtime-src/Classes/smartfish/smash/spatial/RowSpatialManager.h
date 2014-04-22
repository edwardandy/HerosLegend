// Created by Luke on 13-8-25.
//
// To change the template use AppCode | Preferences | File Templates.
//



#ifndef __RowSpatialManager_H_
#define __RowSpatialManager_H_

#include <iostream>
#include "../core/EntityComponent.h"

NS_SF_BEGIN
		class RowSpatialObjectComponent;

		class ObjectType;

		class RowSpatialManager : public smartfish::EntityComponent
		{
		public:
			RowSpatialManager( );

			virtual ~RowSpatialManager( );

			static RowSpatialManager *getInstance( );

			void setup( int rows, int cols );

			void addSpatialObject( RowSpatialObjectComponent *value );

			void removeSpatialObject( RowSpatialObjectComponent *value );

			void fastRemove( RowSpatialObjectComponent *value );

			cocos2d::CCArray *querySpan( int minCol, int maxCol, int minRow, int maxRow, ObjectType *mask, RowSpatialObjectComponent *rectSpatial = NULL, int teamId = 0 );

			cocos2d::CCArray *queryAll( cocos2d::CCRect rect, ObjectType *mask = NULL);

			bool intersectsRect( const cocos2d::CCRect &rect, const cocos2d::CCRect &rect2 );

		public:
			cocos2d::CCArray *getAllSpatials( )
			{
				return mSpatials;
			}

		private:
			static RowSpatialManager *mInstance;
			std::vector<std::vector<RowSpatialObjectComponent *> > m_Pool;
			cocos2d::CCArray *mSpatials;

			int m_nRows;
			int m_nCols;
			int m_nSize;
			cocos2d::CCArray *needRemoveList;
		};

		NS_SF_END

#endif //__RowSpatialManager_H_
