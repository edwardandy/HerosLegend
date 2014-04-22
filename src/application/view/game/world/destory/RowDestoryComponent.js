/**
 * Created by chenyonghua on 13-12-18.
 */
var RowDestoryComponent = DestoryingComponent.extend( {
    bottomOffsetRow: 0,
    topOffsetRow: 0,
    leftOffsetCol: 0,
    rightOffsetCol: 0,
    _objectMask: null,
    ctor: function()
    {
        this._super();
    },
    onAdd: function()
    {
        this._super();
    },
    onRemove: function()
    {
        this._super();
        if(this._objectMask != null)
        {
            this._objectMask.release();
        }
    },
    setObjectMask:function(objectType)
    {
        this._objectMask = objectType;
        this._objectMask.retain();
    },
    getObjectMask:function()
    {
        return this._objectMask;
    },
    destory: function( spatial )
    {
        if( !(spatial instanceof SimpleRowSpatialComponent))
        {
            spatial = this.getOwner().lookupComponent( GameConst.spatial );
        }
        var spatialManager = this.getOwner().lookupComponentByEntity( GameConst.rowSpatialManager, GameConst.world );
        if( spatial && this._objectMask && spatialManager )
        {
            var foundArray = spatialManager.querySpan(
                spatial.getMinCol() - this.leftOffsetCol,
                spatial.getMaxCol() + this.rightOffsetCol,
                spatial.getMinRow() - this.bottomOffsetRow,
                spatial.getMaxRow() + this.topOffsetRow,
                this._objectMask,
                spatial
            );
            var len = foundArray.length;
            if( len > 0 )
            {
                for( var i = 0; i < len; i++ )
                {
                    var targetSpatial = foundArray[i];
                    var healthComponent = targetSpatial.getOwner().lookupComponent(GameConst.health);
                    if(healthComponent == null || !healthComponent.isDead())
                    {
                        this._super( foundArray[i] );
                    }
                    if(healthComponent == null)
                    {
                        cc.log("typeNames:"+targetSpatial.getObjectType().getTypeNames());
                        cc.log("[RowDestoryComponent] "+targetSpatial.getOwner().getName()+"'s healthComponent is null");
                    }
                }
            }
        }
    }
} );