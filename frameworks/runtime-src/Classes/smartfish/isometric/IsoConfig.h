//
// Created by Luke on 13-11-1.
//

#ifndef __IsoConfig_H_
#define __IsoConfig_H_

#include "cocos2d.h"
#include "IsoPoint.h"

USING_NS_CC;

class IsoConfig : public cocos2d::CCObject
{
public:
	IsoConfig( );

	~IsoConfig( );

	static int cellSize;
	static cocos2d::CCPoint gridSize;
	static cocos2d::CCPoint anchor;

	static void setCellSize( int value );

	static int getCellSize( );

	static void setGridSize( CCPoint value );

	static CCPoint getGridSize( );

	static void setAnchor( CCPoint value );

	static CCPoint getAnchor( );
};

#endif //__IsoConfig_H_
