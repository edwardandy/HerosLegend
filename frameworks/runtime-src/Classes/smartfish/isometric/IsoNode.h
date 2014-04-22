// Created by Luke on 13-11-1.
//



#ifndef ___H_
#define ___H_

#include "IsoConfig.h"

USING_NS_CC;

class Generator : public CCObject
{
public:
	static int getNewID( );

private:
	static int mId;
};

class IsoNode : public CCObject
{
public:
	IsoNode( );

	virtual ~IsoNode( );

public:
	virtual CCNode *getContainer( );

	virtual void setContainer( CCNode *_container );

	virtual void setSize( int width, int length, int height );

	virtual IsoPoint *getIsoPosition( );

	virtual void setIsoPosition( IsoPoint *_isoPosition );

	virtual float getIsoX( );

	virtual void setIsoX( float value );

	virtual float getIsoY( );

	virtual void setIsoY( float value );

	virtual float getIsoZ( );

	virtual void setIsoZ( float value );

	virtual cocos2d::CCPoint &getScreenPosition( );

	virtual int getDepth( );

	virtual void setDepth( int value );

	virtual int getWidth( );

	virtual void setWidth( int value );

	virtual float getHeight( );

	virtual void setHeight( int value );

	virtual int getLength( );

	virtual void setLength( int value );

	virtual int getType( );

	virtual void setType( int value );

	virtual bool isWalkable( );

	virtual void setWalkable( bool value );

	virtual cocos2d::CCPoint &getAnchorPoint( );

	virtual void setAnchorPoint( cocos2d::CCPoint value );

	virtual IsoPoint *getOffsetIsoPosition( );

	virtual void setOffsetIsoPosition( IsoPoint *value );

	virtual void renderLogic( );

	virtual void onAdded( );

	virtual void onRemoved( );

	int id;
	float _isoX;
	float _isoY;
	float _isoZ;
	int _width;
	int _height;
	int _length;
private:
	CCNode *_container;
	IsoPoint *_isoPosition;
	CCPoint _screenPosition;
	int _depth;
	int _type;
	bool _walkable;
	CCPoint _anchorPoint;
	IsoPoint *_offsetIsoPosition;
	bool _isIsoPositionDirty;
	bool _isAnchorPointDirty;
	bool _isDepthDirty;
	bool _isAdded;
};


#endif //___H_
