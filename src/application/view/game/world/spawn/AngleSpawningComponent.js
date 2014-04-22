/**
 * Created by chenyonghua on 13-12-22.
 */
var AngleSpawningComponent = SignalEntitySpawningComponent.extend( {
    mulriple: 1,
    _interval: 1,
    _cooldownTimer: 0,
    ctor: function()
    {
        this._super();
    },
    setSpawnInterval: function( value )
    {
        if( value <= 1 )
        {
            value = 1;
        }
        this._interval = value;
        this._cooldownTimer = value;
    },
    spawnEntity: function( spatialComponent, col, row )
    {
        var targetCol = 0;
        var targetRow = 0;
        if( spatialComponent != null )
        {
            targetCol = spatialComponent.getRenderCol();
            targetRow = spatialComponent.getRenderRow();
        }
        else
        {
            targetCol = col;
            targetRow = row;
        }

        this._cooldownTimer--;
        if( this._cooldownTimer <= 0 )
        {
            this._cooldownTimer = this._interval;
        }
        else
        {
            return;
        }

        var entity = this._super();
        if( entity == null )
        {
            return null;
        }
        var spatial = entity.lookupComponent( GameConst.spatial );

        var angle = cc.pToAngle( cc.p( targetCol - spatial.getRenderCol(), targetRow - spatial.getRenderRow() ) ) * 180 / Math.PI;
        //计算位置
        var thisRender = this.getOwner().lookupComponent(GameConst.render);
        if(thisRender instanceof SimpleArmatureRenderer)
        {
            var weapon = thisRender.getArmature().getBone("weapon" );
            if(weapon)
            {
                var point = cc.p(thisRender.getArmature().getPositionX() + thisRender.getBonePositionX("weapon") + 10,thisRender.getArmature().getPositionY() + thisRender.getBonePositionY("weapon") + 10);
                var rowData = this.getOwner().lookupComponentByEntity(GameConst.rowData,GameConst.world);
                point = rowData.globalToLocal(point);
                spatial.setRenderRow(point.y);
                spatial.setRenderCol(point.x);
            }
        }

        //计算速度
        var velX = Math.abs( spatial.getVelY() * this.mulriple ) * Math.cos( Math.PI * (angle / 180) );
        var velY = Math.abs( spatial.getVelY() * this.mulriple ) * Math.sin( Math.PI * (angle / 180) );
        spatial.setVelX( velX );
        spatial.setVelY( velY );
        var render = entity.lookupComponent( GameConst.render );
        render.getDisplayObject().setAnchorPoint( cc.p( 0.5, 0 ) );
        render.setRotation( -angle + 90 );
        return entity;
    }
} );