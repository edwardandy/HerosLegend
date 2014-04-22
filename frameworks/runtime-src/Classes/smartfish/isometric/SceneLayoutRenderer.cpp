//
// Created by Luke on 13-11-1.
//


#include "SceneLayoutRenderer.h"
#include "Utils.h"
SceneLayoutRenderer::SceneLayoutRenderer( )
{
	this->visited.clear( );
	this->dependency.clear( );
}

SceneLayoutRenderer::~SceneLayoutRenderer( )
{
	cocos2d::CCLog( " ==== ~SceneLayoutRenderer ===== " );
}

void SceneLayoutRenderer::sortWithTarget( CCArray *children, IsoNode *target )
{
	IsoNode *objA = target;
	IsoNode *objB;
	float rightA;
	float frontA;
	float topA;

	CCArray *behind = CCArray::create( );
	behind->retain( );
	rightA = objA->_isoX + objA->_width;
	frontA = objA->_isoY + objA->_length;
	topA = objA->_isoZ + objA->_height;
	CCObject *pElement;
	CCARRAY_FOREACH(children, pElement)
		{
			objB = dynamic_cast<IsoNode *>(pElement);
			if ( ( objB != objA ) && ( objB->_isoX < rightA ) && ( objB->_isoY < frontA ) && ( objB->_isoZ < topA ) )
			{
				behind->addObject( objB );
			}
		}
	int maxDepth = 0;
	CCARRAY_FOREACH(behind, pElement)
		{
			objA = dynamic_cast<IsoNode *>(pElement);
			maxDepth = MAX( objA->getDepth( ), maxDepth );
		}
	maxDepth++;
	int originalDepth = target->getDepth( );
	int plusVlaue = originalDepth > maxDepth ? 1 : -1;
	int minOne = MIN(originalDepth, maxDepth);
	int maxOne = MAX(originalDepth, maxDepth);
	CCARRAY_FOREACH(children, pElement)
		{
			objA = dynamic_cast<IsoNode *>(pElement);
			if ( objA->getDepth( ) >= minOne && objA->getDepth( ) <= maxOne )
			{
				objA->setDepth( objA->getDepth( ) + plusVlaue );
			}
		}
	target->setDepth( maxDepth );
}

void SceneLayoutRenderer::sortChildren( CCArray *children )
{
	this->dependency.clear( );

	IsoNode *objA;
	IsoNode *objB;
	float rightA;
	float frontA;
	float topA;

	CCObject *pElement;
	int startTime = Utils::getTimer();
	CCARRAY_FOREACH(children, pElement)
		{
			objA = (IsoNode *)(pElement);
			std::vector<IsoNode* > behind;
			rightA = objA->_isoX + objA->_width;
			frontA = objA->_isoY + objA->_length;
			topA = objA->_isoZ + objA->_height;
			CCObject *pElement2;
			CCARRAY_FOREACH(children, pElement2)
				{
					objB = (IsoNode *)(pElement2);
					if ( ( objA != objB ) && ( objB->_isoX < rightA ) && ( objB->_isoY < frontA ) && ( objB->_isoZ < topA ) )
					{
						behind.push_back( objB );
					}
				}
			this->dependency[objA] = behind;

		}
	cocos2d::CCLog( "[c++]phase 1 cost %d",(Utils::getTimer() - startTime) );
	startTime = Utils::getTimer();
	this->depth = 0;
	IsoNode *node;
	i = 0;
	CCARRAY_FOREACH(children, pElement)
		{
			node = (IsoNode *)pElement;
			if ( this->visited.find( node ) == this->visited.end( ) )
			{
				this->place( node );
			}
		}
	cocos2d::CCLog( "[c++]phase 2 cost %d",(Utils::getTimer() - startTime) );
	this->visited.clear( );
}

void SceneLayoutRenderer::place( IsoNode *child )
{
	this->visited[ child ] = 1;
	std::vector<IsoNode*> list = this->dependency[child];
	IsoNode *node;
	for(std::vector<IsoNode*>::iterator it = list.begin( );it < list.end( ) ;it++)
		{
			node = *it;
			if ( this->visited.find( node) == this->visited.end( ) )
			{
				this->place( node );
			}
		}

	if ( this->depth != child->getDepth( ) )
	{
		child->setDepth( this->depth );
	}
	++this->depth;
}
