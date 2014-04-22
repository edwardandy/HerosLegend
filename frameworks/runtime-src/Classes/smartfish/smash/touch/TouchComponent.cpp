//
// Created by Luke on 13-9-26.
//
// To change the template use AppCode | Preferences | File Templates.
//


#include "TouchComponent.h"

NS_SF_BEGIN

		TouchComponent::TouchComponent( )
		: _touchEnabled( true )
		, _touchPriority( 0 )
		, _touchMode( ONE_BY_ONE )
		, _swallowsTouches( true )
		{

		}

		TouchComponent::~TouchComponent( )
		{

		}

		void TouchComponent::onAdd( )
		{
			EntityComponent::onAdd( );

			// since events are propagated in reverse order
			if ( _touchEnabled )
			{
				this->registerWithTouchDispatcher( );
			}
		}

		void TouchComponent::onRemove( )
		{
			CCDirector *pDirector = CCDirector::sharedDirector( );
			if ( _touchEnabled )
			{
				pDirector->getTouchDispatcher( )->removeDelegate( this );
			}

			EntityComponent::onRemove( );
		}


		bool TouchComponent::ccTouchBegan( CCTouch *pTouch, CCEvent *pEvent )
		{
			return CCTouchDelegate::ccTouchBegan( pTouch, pEvent );
		}

		void TouchComponent::ccTouchMoved( CCTouch *pTouch, CCEvent *pEvent )
		{
			CCTouchDelegate::ccTouchMoved( pTouch, pEvent );
		}

		void TouchComponent::ccTouchEnded( CCTouch *pTouch, CCEvent *pEvent )
		{
			CCTouchDelegate::ccTouchEnded( pTouch, pEvent );
		}

		void TouchComponent::ccTouchCancelled( CCTouch *pTouch, CCEvent *pEvent )
		{
			CCTouchDelegate::ccTouchCancelled( pTouch, pEvent );
		}

		void TouchComponent::ccTouchesBegan( CCSet *pTouches, CCEvent *pEvent )
		{
			CCTouchDelegate::ccTouchesBegan( pTouches, pEvent );
		}

		void TouchComponent::ccTouchesMoved( CCSet *pTouches, CCEvent *pEvent )
		{
			CCTouchDelegate::ccTouchesMoved( pTouches, pEvent );
		}

		void TouchComponent::ccTouchesEnded( CCSet *pTouches, CCEvent *pEvent )
		{
			CCTouchDelegate::ccTouchesEnded( pTouches, pEvent );
		}

		void TouchComponent::ccTouchesCancelled( CCSet *pTouches, CCEvent *pEvent )
		{
			CCTouchDelegate::ccTouchesCancelled( pTouches, pEvent );
		}

		/// isTouchEnabled getter
		bool TouchComponent::isTouchEnabled( ) const
		{
			return _touchEnabled;
		}

		/// isTouchEnabled setter
		void TouchComponent::setTouchEnabled( bool enabled )
		{
			if ( _touchEnabled != enabled )
			{
				_touchEnabled = enabled;
				if ( enabled )
				{
					this->registerWithTouchDispatcher( );
				}
				else
				{
					// have problems?
					CCDirector::sharedDirector( )->getTouchDispatcher( )->removeDelegate( this );
				}
			}
		}

		void TouchComponent::setTouchMode( DispatchMode mode )
		{
			if ( _touchMode != mode )
			{
				_touchMode = mode;

				if ( _touchEnabled )
				{
					setTouchEnabled( false );
					setTouchEnabled( true );
				}
			}
		}

		void TouchComponent::setTouchPriority( int priority )
		{
			if ( _touchPriority != priority )
			{
				_touchPriority = priority;

				if ( _touchEnabled )
				{
					setTouchEnabled( false );
					setTouchEnabled( true );
				}
			}
		}

		void TouchComponent::setSwallowsTouches( bool swallowsTouches )
		{
			if ( _swallowsTouches != swallowsTouches )
			{
				_swallowsTouches = swallowsTouches;

				if ( _touchEnabled )
				{
					setTouchEnabled( false );
					setTouchEnabled( true );
				}
			}
		}


		int TouchComponent::getTouchPriority( )
		{
			return _touchPriority;
		}

		DispatchMode TouchComponent::getTouchMode( )
		{
			return _touchMode;
		}

		bool TouchComponent::isSwallowsTouches( )
		{
			return _swallowsTouches;
		}

		void TouchComponent::registerWithTouchDispatcher( )
		{
			CCTouchDispatcher *pDispatcher = CCDirector::sharedDirector( )->getTouchDispatcher( );

			if ( _touchMode == ALL_AT_ONCE )
			{
				pDispatcher->addStandardDelegate( this, 0 );
			} else
			{
				pDispatcher->addTargetedDelegate( this, _touchPriority, _swallowsTouches );
			}
		}

NS_SF_END