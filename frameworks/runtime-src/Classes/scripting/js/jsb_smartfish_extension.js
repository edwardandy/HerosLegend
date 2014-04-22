/**
 * Created by chenyonghua on 13-11-2.
 */
var sf = sf || {};

sf.JSHttpRequest.extend = cc.Class.extend;
sf.IsoConfig.extend = cc.Class.extend;
sf.IsoPoint.extend = cc.Class.extend;
sf.IsoNode.extend = cc.Class.extend;
sf.SceneLayoutRenderer.extend = cc.Class.extend;

//
sf.ObjectType.extend = cc.Class.extend;
sf.Entity.extend = cc.Class.extend;
sf.SmashGroup.extend = cc.Class.extend;
sf.EntityComponent.extend = cc.Class.extend;

sf.TouchComponent.extend = cc.Class.extend;
sf.DisplayObjectRenderer.extend = cc.Class.extend;
sf.DisplayObjectScene.extend = cc.Class.extend;

sf.ProcessManager.extend = cc.Class.extend;
sf.AnimatedComponent.extend = cc.Class.extend;
sf.TickedComponent.extend = cc.Class.extend;
sf.ArmatureRenderer.extend = cc.Class.extend;

sf.RowSpatialManager.extend = cc.Class.extend;
sf.RowSpatialObjectComponent.extend = cc.Class.extend;
sf.RowDataComponent.extend = cc.Class.extend;
sf.RowTransformComponent.extend = cc.Class.extend;

sf.SpriteBatchNodeScene.extend = cc.Class.extend;
sf.SpriteBatchNodeRenderer.extend = cc.Class.extend;


sf.Conditional.extend       = cc.Class.extend;
sf.Strategy.extend       = cc.Class.extend;
sf.CollisionResponseStrategy.extend       = cc.Class.extend;
sf.StrategyContainingComponent.extend       = cc.Class.extend;
sf.CollisionResponseComponent.extend       = cc.Class.extend;
sf.FindingResponseComponent.extend         = cc.Class.extend;
sf.FindingResponseStrategy.extend         = cc.Class.extend;

sf.kHttpGet = 0;
sf.kHttpPost = 1;
sf.kHttpPut = 2;
sf.kHttpDelete = 3;

sf.makeIsoPoint = function( x, y, z )
{
    var p = new sf.IsoPoint();
    p.init( x, y, z );
    return p;
}
sf.ObjectType.create = function( args )
{
    var len = arguments.length;
    var objecttype = new sf.ObjectType();
    if(len > 0)
    {
        for( var i = 0; i < len; i++ )
        {
            if( arguments[i] )
            {
                objecttype.add( arguments[i] );
            }
        }
    }
    return objecttype;
}

