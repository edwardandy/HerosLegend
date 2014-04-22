// Created by Luke on 13-11-1.
//



#ifndef __IsoPoint_H_
#define __IsoPoint_H_

#include "cocos2d.h"

USING_NS_CC;

class IsoPoint : public CCObject
{
public:
	IsoPoint();
	~IsoPoint( );
	IsoPoint(float x,float y,float z);
	void init(float x,float y,float z);
	std::string toString();
public:
	float x;
	float y;
	float z;
public:
	float getX( ) const
	{
		return x;
	}

	float getY( ) const
	{
		return y;
	}

	float getZ( ) const
	{
		return z;
	}
};


#endif //__IsoPoint_H_
