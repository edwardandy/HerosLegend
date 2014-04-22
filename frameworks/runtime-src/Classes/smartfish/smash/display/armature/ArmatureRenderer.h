// Created by Luke on 13-9-10.
//
// To change the template use AppCode | Preferences | File Templates.
//



#ifndef __ArmatureRenderer_H_
#define __ArmatureRenderer_H_

#include <iostream>
#include "../DisplayObjectRenderer.h"
#include "CocoStudio/Armature/CCArmature.h"
#include "../../core/SmashMacros.h"

USING_NS_CC_EXT;
USING_NS_CC;
NS_SF_BEGIN
		class ArmatureRenderer : public DisplayObjectRenderer
		{
		public:
			ArmatureRenderer( );

			virtual ~ArmatureRenderer( );

			virtual void onRemove( );

			virtual void onAdd( );

			static ArmatureRenderer *create( const char *name, int zOrder = 0 );

			virtual bool init( const char *name, int zOrder = 0 );

			virtual void changeSkin( const char *name, const char *texture );

			virtual float getBonePositionX( const char *name );

			virtual float getBonePositionY( const char *name );

			//! A weak reference to the CCArmature
			CC_SYNTHESIZE_READONLY(CCArmature *, m_pArmature, Armature);
			CC_SYNTHESIZE_READONLY(CCArmatureAnimation *, m_pArmatureAnimation, ArmatureAnimation);


			virtual void setSpeedScale( float value );

			virtual std::string getAnimationName( );

			virtual int getTotalFrame( );

			virtual int getCurrentFrame( );

			virtual bool isPlaying( );


			//=========== override ==========================
			virtual void addChild( CCNode *child, const char *name );

			virtual void addChild( CCNode *child, const char *name, int zOrder );

			virtual void removeChild( CCNode *child );

			virtual void removeChildByName( const char *name );

			std::string &getTextureFileName( )
			{
				return m_TextureFileName;
			}

			void setTextureFileName( std::string &m_TextureFileName )
			{
				ArmatureRenderer::m_TextureFileName = m_TextureFileName;
			}

		private:
			std::string m_TextureFileName;
			float m_SpeedScale;
		public:
			virtual void onFrame( float deltaTime );
		};

		NS_SF_END

#endif //__ArmatureRenderer_H_
