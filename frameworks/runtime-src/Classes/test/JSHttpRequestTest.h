//
// Created by Luke on 13-11-12.
//



#ifndef __JSHttpRequestTest_H_
#define __JSHttpRequestTest_H_

#include "JSHttpRequest.h"

class JSHttpRequestTest : public CCObject
{
public:
	JSHttpRequestTest();
	~JSHttpRequestTest();
	void onSuccess(bool result, std::string string);
	void onDownLoaded( CCObject *object, void *data );
};


#endif //__JSHttpRequestTest_H_
