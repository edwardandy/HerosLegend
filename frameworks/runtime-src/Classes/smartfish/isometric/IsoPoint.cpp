//
// Created by Luke on 13-11-1.
//


#include "IsoPoint.h"

IsoPoint::IsoPoint( )
{
	this->x = 0;
	this->y = 0;
	this->z = 0;
}

IsoPoint::IsoPoint( float x, float y, float z )
{
	this->x = x;
	this->y = y;
	this->z = z;
}

void IsoPoint::init( float x, float y, float z )
{
	this->x = x;
	this->y = y;
	this->z = z;
}

std::string IsoPoint::toString( )
{
	return CCString::createWithFormat( "x:%f,y:%f,z:%f", this->x, this->y, this->z )->getCString( );
}

IsoPoint::~IsoPoint( )
{
//	cocos2d::CCLog( " ==== ~IsoPoint ===== " );
}
