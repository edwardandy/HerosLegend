//
// Created by Luke on 13-11-1.
//


#include "IsoMath.h"

const float IsoMath::Z_CORRECT = cos( -3.1415926 / 6 ) * sqrt( 2 );

CCPoint IsoMath::isoToScreen( IsoPoint *pos )
{
	float screenX = pos->x - pos->y;
	float screenY = pos->z * Z_CORRECT + ( pos->x + pos->y ) * .5;
	return ccp(screenX, -screenY);
}

IsoPoint *IsoMath::screenToIso( CCPoint point )
{
	IsoPoint *isoPoint = new IsoPoint( );
	isoPoint->init( 0, 0, 0 );
	isoPoint->x = -( point.y - point.x / 2 );
	isoPoint->y = -( point.y + point.x / 2 );
	isoPoint->z = 0;
	return isoPoint;
}
