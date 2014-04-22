//
// Created by Luke on 13-11-23.
//



#ifndef __Strategy_H_
#define __Strategy_H_

#include <iostream>
#include "../../core/SFObject.h"
#include "../core/Entity.h"

NS_SF_BEGIN
		USING_NS_SF;

		class Strategy : public SFObject
		{
		public:
			Strategy( );

			virtual ~Strategy( );

			virtual void onTick( float dt );

			virtual bool shouldRemove( );

			virtual void setOwner( Entity *value );

			virtual Entity *getOwner( );

			virtual void onAdd( );

			virtual void onRemove( );

		protected:
			Entity *m_Owner;
			cocos2d::ccScriptType m_eScriptType;
		};

		NS_SF_END


#endif //__Strategy_H_
