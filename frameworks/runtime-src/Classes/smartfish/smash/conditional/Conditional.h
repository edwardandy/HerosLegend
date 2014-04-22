//
// Created by Luke on 13-11-22.
//



#ifndef __Conditional_H_
#define __Conditional_H_

#include "../../core/SFObject.h"
#include "../core/Entity.h"
NS_SF_BEGIN
		class Conditional : public smartfish::SFObject
		{
		public:
			Conditional( );

			~Conditional( );

			virtual void setOwner( Entity *value );

			virtual Entity *getOwner( );

			bool isConditionalTrue( );
		protected:
			Entity* m_Owner;
		};

		NS_SF_END

#endif //__Conditional_H_
