// Created by Luke on 13-8-20.
//
// To change the template use AppCode | Preferences | File Templates.
//



#ifndef __IDisplayObjectRenderer_H_
#define __IDisplayObjectRenderer_H_

#include <iostream>
#include <map>
#include "cocos2d.h"
#include "cocos-ext.h"
#include "../core/SmashMacros.h"
#include "../time/AnimatedComponent.h"

USING_NS_CC;
NS_SF_BEGIN
		class DisplayObjectScene;

		class DisplayObjectRenderer : public smartfish::AnimatedComponent
		{
		public:
			DisplayObjectRenderer( );

			virtual ~DisplayObjectRenderer( );

			virtual void setView( );

			virtual void setZOrder( int value );

			virtual int getZOrder( );

			virtual void setPositionX( float value );

			virtual void setPositionY( float value );

			virtual const CCPoint &getPosition( );

			virtual void setScaleX( float fScaleX );

			virtual void setScaleY( float fScaleY );

			virtual float getScaleX( );

			virtual float getScaleY( );

			virtual void setPosition( const cocos2d::CCPoint &pos );

			virtual void setOffsetPosition( const cocos2d::CCPoint &pos );

			virtual void setRotation( float fRotation );

			virtual void setRotationX( float fRotationX );

			virtual void setRotationY( float fRotationY );

			virtual void setSkewX( float sx );

			virtual void setSkewY( float sy );

			virtual float getSkewX( );

			virtual float getSkewY( );

			virtual bool isVisible( );

			virtual float getRotation( );

			virtual float getRotationX( );

			virtual float getRotationY( );

			virtual void setScale( float value );

			virtual float getScale( );

			virtual void setVisible( bool bVisible );

			virtual void addChild( CCNode *child, const char *name );

			virtual void addChild( CCNode *child, const char *name, int zOrder );

			virtual void removeChild( CCNode *child );

			virtual void removeChildByName( const char *name );

			virtual CCNode *getDisplayObject( );

			virtual void onFrame( float deltaTime );

			virtual void onAdd( );

			virtual void onRemove( );

			virtual CCNode *getChildByName( const char *name );

		protected:
			CCNode *m_pContainer;
			std::map<std::string, CCNode *> m_Children;
			DisplayObjectScene *mScene;
			bool _inScene;
		protected:
			float m_fRotationX;                 ///< rotation angle on x-axis
			float m_fRotationY;                 ///< rotation angle on y-axis

			float m_fScaleX;                    ///< scaling factor on x-axis
			float m_fScaleY;                    ///< scaling factor on y-axis

			int m_ZOrder;

			cocos2d::CCPoint m_obPosition;               ///< position of the node

			cocos2d::CCPoint m_OffsetPosition;               ///< position of the node

			float m_fSkewX;                     ///< skew angle on x-axis
			float m_fSkewY;                     ///< skew angle on y-axis

			bool m_RotationDirty;
			bool m_ScaleDirty;
			bool m_ZOrderDirty;
			bool m_PositionDirty;
			bool m_SkewDirty;

			bool m_bVisible;

			virtual void addToScene();
			virtual void removeFromScene();

		};

		NS_SF_END
#endif //__IDisplayObjectRenderer_H_
