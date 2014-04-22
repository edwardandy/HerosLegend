// Created by Luke on 13-9-4.
//
// To change the template use AppCode | Preferences | File Templates.
//


#include "RowDataComponent.h"

USING_NS_CC;
NS_SF_BEGIN
		RowDataComponent::RowDataComponent( ):m_pOrigin(ccp(0,0)),m_pCellSize(ccp(10,10)),m_nNumRows(10),m_nNumCols(10)
		{

		}

		RowDataComponent::~RowDataComponent( )
		{

		}

		cocos2d::CCPoint RowDataComponent::getCellSize( )
		{
			return m_pCellSize;
		}

		void RowDataComponent::setCellSize( cocos2d::CCPoint value )
		{
			m_pCellSize = value;
		}

		void RowDataComponent::setOrigin( cocos2d::CCPoint value )
		{
			m_pOrigin = value;
		}

		cocos2d::CCPoint RowDataComponent::getOrigin( )
		{
			return m_pOrigin;
		}

		void RowDataComponent::setRows( int value )
		{
			m_nNumRows = value;
		}

		int RowDataComponent::getRows( )
		{
			return m_nNumRows;
		}

		void RowDataComponent::setCols( int value )
		{
			m_nNumCols = value;
		}

		int RowDataComponent::getCols( )
		{
			return m_nNumCols;
		}

		cocos2d::CCPoint RowDataComponent::localToGlobal( cocos2d::CCPoint srcPoint )
		{
			cocos2d::CCPoint point;
			point.x = m_pOrigin.x + ( srcPoint.x * m_pCellSize.x );
			point.y = m_pOrigin.y - ( srcPoint.y * m_pCellSize.y );
			return point;
		}

		cocos2d::CCPoint RowDataComponent::globalToLocal( cocos2d::CCPoint srcPoint )
		{
			cocos2d::CCPoint point;
			point.x = ( srcPoint.x - m_pOrigin.x ) / m_pCellSize.x;
			point.y = ( srcPoint.y - m_pOrigin.y ) / m_pCellSize.y;
			return point;
		}

NS_SF_END