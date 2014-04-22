//  Smash.h
//  Smash
//
//  Created by Luke on 13-3-18.
//
//

#ifndef __Smash__Smash__
#define __Smash__Smash__

#include <iostream>
#include "core/SmashGroup.h"
#include "core/Entity.h"
#include "core/EntityComponent.h"
#include "core/SmashMacros.h"
#include "core/SmashObject.h"

#include "time/AnimatedComponent.h"
#include "time/TickedComponent.h"
#include "time/ProcessManager.h"
#include "display/DisplayObjectScene.h"
#include "display/DisplayObjectRenderer.h"
#include "display/SpriteBatchNodeRenderer.h"
#include "display/SpriteBatchNodeScene.h"
#include "display/armature/ArmatureRenderer.h"
#include "display/armature/ArmatureScene.h"
#include "spatial/RowSpatialManager.h"
#include "spatial/RowSpatialObjectComponent.h"
#include "spatial/RowDataComponent.h"
#include "spatial/RowTransformComponent.h"
#include "touch/TouchComponent.h"
#include "util/ObjectType.h"
#include "conditional/Conditional.h"
#include "strategy/Strategy.h"
#include "strategy/StrategyContainingComponent.h"
#include "strategy/CollisionResponseStrategy.h"
#include "spatial/CollisionResponseComponent.h"

#include "strategy/FindingResponseStrategy.h"
#include "spatial/FindingResponseComponent.h"

class Smash : CCObject
{
public:
	static smartfish::SmashGroup* getRootGroup();
private:
	static smartfish::SmashGroup* ROOT_GROUP;
};
#endif /* defined(__Smash__Smash__) */
