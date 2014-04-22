// Created by Luke on 13-9-10.
//
// To change the template use AppCode | Preferences | File Templates.
//


#include "ArmatureRenderer.h"
#include "../DisplayObjectScene.h"

NS_SF_BEGIN
		ArmatureRenderer::ArmatureRenderer( ):DisplayObjectRenderer( )
		{
			m_pArmature = NULL;
			m_SpeedScale = 1;
		}

		ArmatureRenderer::~ArmatureRenderer( )
		{
			m_pArmature = NULL;
		}

		void ArmatureRenderer::onRemove( )
		{
			DisplayObjectRenderer::onRemove( );
		}

		void ArmatureRenderer::onAdd( )
		{
			AnimatedComponent::onAdd( );
			mScene = dynamic_cast<DisplayObjectScene *>(this->getOwner( )->lookupComponentByEntity( "armatureScene", "world" ));
			addToScene( );
		}

		bool ArmatureRenderer::init( const char *name, int zOrder )
		{
			if ( m_pArmature )
			{
				removeChild( m_pArmature );
				m_pArmature = NULL;
			}
			m_pArmature = cocos2d::extension::CCArmature::create( name );
//			m_pArmature->getAnimation( )->playWithIndex( 0 );
			m_pArmature->ignoreAnchorPointForPosition( false );
			m_pArmature->retain( );

			m_pArmatureAnimation = m_pArmature->getAnimation( );

			this->m_pContainer = m_pArmature;
			this->setZOrder( zOrder );

			if ( _inScene )
			{
				removeFromScene( );
				addToScene( );
			}

			m_ScaleDirty = true;
			m_RotationDirty = true;
			m_ZOrderDirty = true;
			m_PositionDirty = true;
			m_SkewDirty = true;
			return true;
		}

		void ArmatureRenderer::changeSkin( const char *boneName, const char *texture )
		{
//			cocos2d::CCDictElement *element;
//			CCDictionary *dict = m_pArmature->getBoneDic( );
//			CCDICT_FOREACH(dict, element)
//				{
//					CCBone *bone = ( CCBone * ) element->getObject();
//					if(bone)
//						CCLog( "bone:%s", bone->getName( ).c_str( ) );
//				}
			CCBone *bone = this->getArmature( )->getBone( boneName );
			if ( bone != NULL)
			{
				CCSkin* skin = CCSkin::createWithSpriteFrameName( texture );
				bone->addDisplay( skin, 0 );
			}
			else
			{
				CCLog( "[ArmatureRenderer] bone:%s is NULL", boneName );
				CCAssert(false, "bone is NULL");
			}
		}


		float ArmatureRenderer::getBonePositionX( const char *name )
		{
			CCBone* bone = m_pArmature->getBone( name );
			if(bone)
			{
				return bone->getWorldInfo( )->x;
			}
			return 0;
		}

		float ArmatureRenderer::getBonePositionY( const char *name )
		{
			CCBone* bone = m_pArmature->getBone( name );
			if(bone)
			{
				return bone->getWorldInfo( )->y;
			}
			return 0;
		}

		void ArmatureRenderer::setSpeedScale( float value )
		{
			m_SpeedScale = value;
			if ( m_pArmature )
			{
				m_pArmature->getAnimation( )->setSpeedScale( m_SpeedScale );
			}
		}

		std::string ArmatureRenderer::getAnimationName( )
		{
			return m_pArmature->getAnimation( )->getCurrentMovementID( );
		}


		int ArmatureRenderer::getTotalFrame( )
		{
			return m_pArmature->getAnimation( )->getRawDuration( );
		}

		int ArmatureRenderer::getCurrentFrame( )
		{
			return m_pArmature->getAnimation( )->getCurrentFrameIndex( );
		}

		bool ArmatureRenderer::isPlaying( )
		{
			return m_pArmatureAnimation->getIsPlaying( );
		}

		void ArmatureRenderer::onFrame( float deltaTime )
		{
			DisplayObjectRenderer::onFrame( deltaTime );
//			CCLOG("action:%s,totalFrame:%d,currentFrame:%d",m_pArmature->getAnimation( )->getCurrentMovementID( ).c_str( ),m_pArmature->getAnimation( )->getRawDuration( ),m_pArmature->getAnimation( )->getCurrentFrameIndex( ));
		}

		ArmatureRenderer *ArmatureRenderer::create( const char *name, int zOrder )
		{
			ArmatureRenderer *render = new ArmatureRenderer( );
			render->init( name, zOrder );
			return render;
		}

		void ArmatureRenderer::addChild( CCNode *child, const char *name )
		{
			CCAssert(false, "ArmatureRenderer can't add child");
		}

		void ArmatureRenderer::addChild( CCNode *child, const char *name, int zOrder )
		{
			CCAssert(false, "ArmatureRenderer can't add child");
		}

		void ArmatureRenderer::removeChildByName( const char *name )
		{
			CCAssert(false, "ArmatureRenderer can't remove child");
		}

		void ArmatureRenderer::removeChild( CCNode *child )
		{
			CCAssert(false, "ArmatureRenderer can't remove child");
		}

		NS_SF_END
