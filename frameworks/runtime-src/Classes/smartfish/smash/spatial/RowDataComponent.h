// Created by Luke on 13-9-4.
//
// To change the template use AppCode | Preferences | File Templates.
//



#ifndef __RowDataComponent_H_
#define __RowDataComponent_H_

#include <iostream>
#include "../core/EntityComponent.h"
#include "cocos2d.h"

USING_NS_CC;
NS_SF_BEGIN
		class RowDataComponent : public smartfish::EntityComponent
		{
		public:
			RowDataComponent( );

			virtual ~RowDataComponent( );

			void setOrigin( cocos2d::CCPoint value );

			cocos2d::CCPoint getOrigin( );

			void setCellSize( cocos2d::CCPoint value );

			cocos2d::CCPoint getCellSize( );

			void setRows( int value );

			int getRows( );

			void setCols( int value );

			int getCols( );

			cocos2d::CCPoint localToGlobal( cocos2d::CCPoint srcPoint );

			cocos2d::CCPoint globalToLocal( cocos2d::CCPoint srcPoint );

		private:
			cocos2d::CCPoint m_pOrigin;
			cocos2d::CCPoint m_pCellSize;

			int m_nNumRows;
			int m_nNumCols;
		};

NS_SF_END


#endif //__RowDataComponent_H_
