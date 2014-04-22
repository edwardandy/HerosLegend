// Created by Luke on 13-9-26.
//
// To change the template use AppCode | Preferences | File Templates.
//



#ifndef __TouchComponment_H_
#define __TouchComponment_H_

#include <iostream>
#include "../Smash.h"
/** how the touches are dispathced */
enum DispatchMode {
	/** All at once */
	ALL_AT_ONCE = 0,
	/** one by one */
	ONE_BY_ONE,
};

NS_SF_BEGIN
		class TouchComponent : public smartfish::EntityComponent, public CCTouchDelegate
		{
		public:
			TouchComponent( );

			~TouchComponent( );

			virtual void onAdd( );

			virtual void onRemove( );

			virtual bool ccTouchBegan( CCTouch *pTouch, CCEvent *pEvent );

			virtual void ccTouchMoved( CCTouch *pTouch, CCEvent *pEvent );

			virtual void ccTouchEnded( CCTouch *pTouch, CCEvent *pEvent );

			virtual void ccTouchCancelled( CCTouch *pTouch, CCEvent *pEvent );

			virtual void ccTouchesBegan( CCSet *pTouches, CCEvent *pEvent );

			virtual void ccTouchesMoved( CCSet *pTouches, CCEvent *pEvent );

			virtual void ccTouchesEnded( CCSet *pTouches, CCEvent *pEvent );

			virtual void ccTouchesCancelled( CCSet *pTouches, CCEvent *pEvent );

			/** If isTouchEnabled, this method is called onEnter. Override it to change the
			way Layer receives touch events.
			( Default: TouchDispatcher::sharedDispatcher()->addStandardDelegate(this,0); )
			Example:
			void Layer::registerWithTouchDispatcher()
			{
			TouchDispatcher::sharedDispatcher()->addTargetedDelegate(this,INT_MIN+1,true);
			}
			@since v0.8.0
			*/
			virtual void registerWithTouchDispatcher( void );

			/** whether or not it will receive CCTouch events.
			You can enable / disable touch events with this property.
			Only the touches of this node will be affected. This "method" is not propagated to it's children.
			@since v0.8.1
			*/
			virtual bool isTouchEnabled( ) const;

			virtual void setTouchEnabled( bool value );

			virtual void setTouchMode( DispatchMode mode );

			virtual DispatchMode getTouchMode( );

			/** priority of the touch events. Default is 0 */
			virtual void setTouchPriority( int priority );

			virtual int getTouchPriority( );

			/** swallowsTouches of the touch events. Default is true */
			virtual void setSwallowsTouches( bool swallowsTouches );

			virtual bool isSwallowsTouches( );

		protected:
			bool _touchEnabled;
		private:
			int _touchPriority;
			DispatchMode _touchMode;
			bool _swallowsTouches;
		};

NS_SF_END

#endif //__TouchComponment_H_
