// Created by Luke on 13-11-22.
//



#ifndef __SFObject_H_
#define __SFObject_H_

#include "cocos2d.h"
#include "../smartfishMarcos.h"

NS_SF_BEGIN

//add retain/release for class which bind to js.

class SFObject : public cocos2d::CCObject
{
public:
	SFObject();
	~SFObject();

private:
	std::string m_Name;
public:
	std::string getName( )
	{
		return m_Name;
	}

	void setName( std::string value )
	{
		SFObject::m_Name = value;
	}
};
NS_SF_END


#endif //__SFObject_H_
