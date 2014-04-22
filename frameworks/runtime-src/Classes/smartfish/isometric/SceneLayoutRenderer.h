// Created by Luke on 13-11-1.
//



#ifndef __SceneLayoutRenderer_H_
#define __SceneLayoutRenderer_H_

#include "cocos2d.h"
#include "IsoNode.h"

USING_NS_CC;
class SceneLayoutRenderer : public CCObject
{
public:
	int depth;
	std::map<IsoNode * , int > visited;
	std::map<IsoNode*,std::vector<IsoNode*> > dependency;
//	std::map<IsoNode*,CCArray*> dependency;
public:
	SceneLayoutRenderer();
	~SceneLayoutRenderer();
	void sortWithTarget(CCArray* children,IsoNode* target);
	void sortChildren(CCArray* children);
	void place(IsoNode* node);
	int i;
};


#endif //__SceneLayoutRenderer_H_
