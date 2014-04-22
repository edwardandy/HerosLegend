/**
 * Created by chenyonghua on 14-2-17.
 */
var WalkControlComponent = sf.TickedComponent.extend( {
    offsetRow: 2,
    _lastCol: -1,
    _lastRow: -1,
    _spatial: null,
    _rowSpatialManager: null,
    _lastVelX: -1,
    _lastVelY: -1,
    _duringAvoid: false,
    _waiting: false,
    ctor: function()
    {
        this._super();
    },
    onAdd: function()
    {
        this._spatial = this.getOwner().lookupComponent( GameConst.spatial );
        this._lastVelY = this._spatial.getVelY();
        this._lastVelX = this._spatial.getVelX();
        this._rowSpatialManager = this.getOwner().lookupComponentByEntity( GameConst.rowSpatialManager, GameConst.world );
    },
    onRemove: function()
    {

    },
    onTick: function( dt )
    {
        var rect = this._spatial.getRect();
        var mask = sf.ObjectType.create( GameConst.STATIC_ITEM );
        var targetX = this.findDestination( rect, mask );
        if(targetX == -1)
        {
            this._spatial.setVelX( 0 );
            this._spatial.setVelY( 0 );
            return;
        }
        if( Math.abs(rect.x - targetX) <= 0.1  )
        {
            this._spatial.setVelY( this._lastVelY );
            this._spatial.setVelX( this._lastVelX );
        }
        else
        {
            var velX = this._lastVelX != 0 ? this._lastVelX : this._lastVelY;
            if( (targetX - rect.x) > 0 )
            {
                velX = Math.abs( velX );
            }
            else
            {
                velX = Math.abs( velX ) * (-1);
            }
            this._spatial.setVelX( velX );
            this._spatial.setVelY( 0 );
        }
    },
    findDestination: function( rect, mask )
    {
        var foundArray = this._rowSpatialManager.queryAll( rect, mask );
        var len = foundArray.length;
        if( len == 0 )
        {
            return rect.x;
        }
        var targetX = -1;
        var findLeft = this.findLeft( rect, mask );
        var findRight = this.findRight( rect, mask );
        if( findLeft != -1 && findRight != -1 )
        {
            if( Math.abs( findLeft - rect.x ) <= Math.abs( findRight - rect.x ) )
            {
                targetX = findLeft;
            }
            else
            {
                targetX = findRight;
            }
        }
        else
        {
            if( findLeft != -1 )
            {
                targetX = findLeft;
            }
            else if( findRight != -1 )
            {
                targetX = findRight;
            }
        }
        return targetX;
    },
    findLeft: function( rect, mask )
    {
        for( var i = 0; i < rect.x ; i++ )
        {
            var temp = cc.rect( 0, rect.y, rect.width, rect.height );
            var foundArray = this._rowSpatialManager.queryAll( temp, mask );
            var len = foundArray.length;
            if( len == 0 )
            {
                return temp.x;
            }
        }
        return -1;
    },
    findRight: function( rect, mask )
    {
        for( var i = Math.floor(rect.x); i < GameConst.numCols; i++ )
        {
            var temp = cc.rect( i, rect.y, rect.width, rect.height );
            var foundArray = this._rowSpatialManager.queryAll( temp, mask );
            var len = foundArray.length;
            if( len == 0 )
            {
                return temp.x;
            }
        }
        return -1;
    }
} )