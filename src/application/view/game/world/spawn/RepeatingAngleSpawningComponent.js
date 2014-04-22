/**
 * Created by chenyonghua on 14-1-4.
 */
var RepeatingAngleSpawningComponent = RepeatingEntitySpawningComponent.extend( {
    _angles: null,
    ctor: function()
    {
        this._super();
        this._angles = [];
    },
    setSpawnData: function( entityId, object )
    {
        cc.log( "[AngleSpawningComponent] you need to use add" )
    },
    addSpawnData: function( angle, entityId, spawnObject, spawnOffsetX, spawnOffsetY )
    {
        var object = {};
        object.angle = angle;
        object.entityId = entityId;
        object.spawnObject = spawnObject || {};
        object.spawnOffsetX = spawnOffsetX == undefined ? 0 : spawnOffsetX;
        object.spawnOffsetY = spawnOffsetY == undefined ? 0 : spawnOffsetY;
        this._angles.push( object );
    },
    onThink: function()
    {
        if( this.canSpawn() == false )
        {
            return;
        }
        var healthComponent = this.getOwner().lookupComponent( GameConst.health );
        if( healthComponent == null || !healthComponent.isDead() )
        {
            for( var i = 0, len = this._angles.length; i < len; i++ )
            {
                var object = this._angles[i];
                if( object.entityId != null && object.spawnObject != null )
                {
                    var entity = EntityCreator.createEntityById( object.entityId, object.spawnObject, this.getOwner(), object.spawnOffsetX, object.spawnOffsetY );
                    var spatial = entity.lookupComponent( GameConst.spatial );
                    var velX = Math.abs( spatial.getVelY() ) * Math.cos( Math.PI * (object.angle / 180) );
                    var velY = Math.abs( spatial.getVelY() ) * Math.sin( Math.PI * (object.angle/ 180) );
                    spatial.setVelX( velX );
                    spatial.setVelY( velY );

                    var render = entity.lookupComponent( GameConst.render );
                    render.getDisplayObject().setAnchorPoint( cc.p( 0.5, 0 ) );
                    render.setRotation( -(object.angle - 90) );
                }
            }
        }
    }
} );