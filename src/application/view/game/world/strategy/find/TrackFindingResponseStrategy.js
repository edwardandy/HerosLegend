/**
 * Created by chenyonghua on 13-12-27.
 */
var TrackFindingResponseStrategy = DealFindingResponseStrategy.extend( {
    _seeking: null,
    ctor: function()
    {
        this._super();
    },
    onAdd: function()
    {
    },
    onRemove: function()
    {
        this._seeking = null;
    },
    onFind: function( collidingObjects )
    {
        if( collidingObjects.length <= 0 )
        {
            this._seeking = this.getOwner().lookupComponent( "seeking" );
            if( this._seeking )
            {
                this._seeking.stop();
            }
            return;
        }
        this._super( collidingObjects );
    },
    dealFinding: function( spatialComponent )
    {
        if( spatialComponent.getOwner() == null )
        {
            return false;
        }
        this._seeking = this.getOwner().lookupComponent( "seeking" );
        var healthComponent = spatialComponent.getOwner().lookupComponent( GameConst.health );
        if( healthComponent == null || healthComponent.isDead() )
        {
            if( this._seeking )
            {
                this._seeking.stop();
            }
            return false;
        }
        if( this._seeking )
        {
            this._seeking.seek( spatialComponent.getRenderCol(), spatialComponent.getRenderRow() );
        }
        else
        {
            cc.log( "this._seeking is null" );
        }
        return this._super();
    }
} );