//  Smash.cpp
//  Smash
//
//  Created by Luke on 13-3-18.
//
//

#include "Smash.h"

smartfish::SmashGroup *Smash::ROOT_GROUP = NULL;

smartfish::SmashGroup *Smash::getRootGroup( )
{
	if(ROOT_GROUP == NULL)
	{
		ROOT_GROUP = new smartfish::SmashGroup();
		ROOT_GROUP->setName( "defautlRootGroup" );
	}
	return ROOT_GROUP;
}
