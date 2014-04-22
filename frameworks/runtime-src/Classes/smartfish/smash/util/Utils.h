// Created by Luke on 13-11-3.
//



#ifndef __Utils_H_
#define __Utils_H_

#include "cocos2d.h"

USING_NS_CC;

class Utils
{
public:
	static long getTimer()
	{
		struct cc_timeval tv;
		CCTime::gettimeofdayCocos2d(&tv, NULL);
		return tv.tv_sec * 1000 + tv.tv_usec / 1000;
	}
};


#endif //__Utils_H_
