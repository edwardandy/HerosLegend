//
// Created by Luke on 13-11-1.
//



#ifndef __IsoMath_H_
#define __IsoMath_H_
#include "cocos2d.h"
#include "IsoPoint.h"
USING_NS_CC;
class IsoMath : public cocos2d::CCObject
{
public:
	static const float Z_CORRECT;
	static CCPoint isoToScreen(IsoPoint* pos);
	static IsoPoint* screenToIso( CCPoint point );
};


#endif //__IsoMath_H_
