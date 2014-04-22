//
// Created by Luke on 13-11-1.
//


#include "IsoConfig.h"

int IsoConfig::cellSize = 20;
cocos2d::CCPoint IsoConfig::gridSize = ccp(40,40);
cocos2d::CCPoint IsoConfig::anchor = ccp(0.5,0);

IsoConfig::IsoConfig( )
{

}

IsoConfig::~IsoConfig( )
{
	cocos2d::CCLog( " ==== ~IsoPoint ===== " );
}

void IsoConfig::setCellSize( int value )
{
	IsoConfig::cellSize = value;
}

void IsoConfig::setGridSize( CCPoint value )
{
	IsoConfig::gridSize = value;
}

void IsoConfig::setAnchor( CCPoint value )
{
	IsoConfig::anchor = value;
}

int IsoConfig::getCellSize( )
{
	return IsoConfig::cellSize;;
}

CCPoint IsoConfig::getGridSize( )
{
	return IsoConfig::gridSize;
}

CCPoint IsoConfig::getAnchor( )
{
	return IsoConfig::anchor;
}
