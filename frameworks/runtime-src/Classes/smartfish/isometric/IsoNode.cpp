//
// Created by Luke on 13-11-1.
//


#include "IsoNode.h"
#include "IsoMath.h"

IsoNode::IsoNode( )
{
	this->_container = NULL;
	this->_walkable = true;
	this->_isoPosition = new IsoPoint();
	this->_isoPosition->retain( );
	this->_anchorPoint = ccp( 0, 0 );
	this->_isoX = 0;
	this->_isoY = 0;
	this->_isoZ = 0;
	this->_screenPosition = ccp( 0, 0 );
	this->_offsetIsoPosition = new IsoPoint();
	this->_offsetIsoPosition->retain( );
	this->_isIsoPositionDirty = false;
	this->_isDepthDirty = false;
	this->_isAnchorPointDirty = false;
	this->_type = -1;
	this->_isAdded = false;
	this->id = Generator::getNewID( );
}

void IsoNode::setSize( int width, int length, int height )
{
	this->_width = width;
	this->_height = height;
	this->_length = length;
}

IsoNode::~IsoNode( )
{
	cocos2d::CCLog( "================ IsoNode release ===========id:%d",this->id );
}
void IsoNode::renderLogic( )
{
	if ( NULL == this->_container )
	{
		return;
	}
	if ( this->_isIsoPositionDirty )
	{
		IsoPoint* p = new IsoPoint();
		p->init( this->_isoPosition->x * IsoConfig::cellSize + this->_offsetIsoPosition->x * IsoConfig::cellSize,
				this->_isoPosition->y * IsoConfig::cellSize + this->_offsetIsoPosition->y * IsoConfig::cellSize,
				this->_isoPosition->z * IsoConfig::cellSize + this->_offsetIsoPosition->z * IsoConfig::cellSize
				);
		this->_screenPosition = IsoMath::isoToScreen( p );

		this->_isoX = this->_isoPosition->x * IsoConfig::cellSize;
		this->_isoY = this->_isoPosition->y * IsoConfig::cellSize;
		this->_isoZ = this->_isoPosition->z * IsoConfig::cellSize;
//		cocos2d::CCLog( "this->_isoX:%d",this->_isoX);
//		cocos2d::CCLog( "this->_isoY:%d",this->_isoY);
//		cocos2d::CCLog( "this->_isoZ:%d",this->_isoZ);
		this->_container->setPosition( ccp( this->_screenPosition.x, this->_screenPosition.y ) );
		this->_isIsoPositionDirty = false;
	}
	if ( this->_isAnchorPointDirty )
	{
		this->_container->setAnchorPoint( this->_anchorPoint );
		this->_isAnchorPointDirty = false;
	}
	if ( this->_isDepthDirty )
	{
		if ( this->_container->getZOrder( ) != this->_depth )
		{
			this->_container->setZOrder( this->_depth );
//                this->getContainer().getParent().reorderChild(this,this->_depth);
		}
		this->_isDepthDirty = false;
	}
}

void IsoNode::onAdded( )
{
	this->_isAdded = true;
}

void IsoNode::onRemoved( )
{
	this->_isAdded = false;
}

CCNode *IsoNode::getContainer( )
{
	return _container;
}

void IsoNode::setContainer( CCNode *value )
{
	this->_container = value;
	this->_container->retain( );
	this->renderLogic( );
}

IsoPoint *IsoNode::getIsoPosition( )
{
	return _isoPosition;
}

void IsoNode::setIsoPosition( IsoPoint *value )
{
	this->_isoPosition->x = value->x;
	this->_isoPosition->y = value->y;
	this->_isoPosition->z = value->z;
	this->_isIsoPositionDirty = true;
	this->renderLogic( );
}

float IsoNode::getIsoX( )
{
	return this->_isoPosition->x;
}

void IsoNode::setIsoX( float value )
{
	this->_isoPosition->x = value;
	this->_isIsoPositionDirty = true;
	this->renderLogic( );
}

float IsoNode::getIsoY( )
{
	return this->_isoPosition->y;
}

void IsoNode::setIsoY( float value )
{
	this->_isoPosition->y = value;
	this->_isIsoPositionDirty = true;
	this->renderLogic( );
}

float IsoNode::getIsoZ( )
{
	return this->_isoPosition->z;
}

void IsoNode::setIsoZ( float value )
{
	this->_isoPosition->z = value;
	this->_isIsoPositionDirty = true;
	this->renderLogic( );
}

cocos2d::CCPoint &IsoNode::getScreenPosition( )
{
	return _screenPosition;
}

int IsoNode::getDepth( )
{
	return _depth;
}

void IsoNode::setDepth( int value )
{
	this->_depth = value;
	this->_isDepthDirty = true;
}

int IsoNode::getWidth( )
{
	return _width;
}

void IsoNode::setWidth( int value )
{
	this->_width = value;
}

float IsoNode::getHeight( )
{
	return _height;
}

void IsoNode::setHeight( int value )
{
	this->_height = value;
}

int IsoNode::getLength( )
{
	return _length;
}

void IsoNode::setLength( int value )
{
	this->_length = value;
}

int IsoNode::getType( )
{
	return _type;
}

void IsoNode::setType( int value )
{
	this->_type = value;
}

bool IsoNode::isWalkable( )
{
	return _walkable;
}

void IsoNode::setWalkable( bool value )
{
	this->_walkable = value;
}

cocos2d::CCPoint &IsoNode::getAnchorPoint( )
{
	return _anchorPoint;
}

void IsoNode::setAnchorPoint( cocos2d::CCPoint value )
{
	if ( this->_anchorPoint.x != value.x || this->_anchorPoint.y != value.y )
	{
		this->_anchorPoint = value;
		this->_isAnchorPointDirty = true;
		this->renderLogic( );
	}
}

IsoPoint *IsoNode::getOffsetIsoPosition( )
{
	return _offsetIsoPosition;
}

void IsoNode::setOffsetIsoPosition( IsoPoint *value )
{
	this->_offsetIsoPosition->x = value->x;
	this->_offsetIsoPosition->y = value->y;
	this->_isIsoPositionDirty = true;
	this->renderLogic( );
}

//////////////////////////////////////////////////////////////////
////////////////////////////// Generator /////////////////////////
//////////////////////////////////////////////////////////////////
int Generator::mId = 0;

int Generator::getNewID( )
{
	return mId++;
}

