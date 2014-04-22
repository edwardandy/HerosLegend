/**
 * Created by chenyonghua on 13-12-15.
 */
var FollowerContainingComponent = sf.TickedComponent.extend( {
    colInterval: 1,
    rowInterval: 1,
    maxCount: 1,
    _followList: null,
    _spatial: null,
    _scrollMap: null,
    _entityBus: null,
    ctor: function()
    {
        this._super();
    },
    onAdd: function()
    {
        this._followList = [];
        this._entityBus = this.getOwner().lookupComponent( GameConst.entityBus );
        this._spatial = this.getOwner().lookupComponent( GameConst.spatial );
        this._scrollMap = this.getOwner().lookupComponentByEntity( GameConst.scrollMap, GameConst.world );
    },
    onRemove: function()
    {
        this._followList = [];
    },
    addFollower: function( spatial )
    {
        if( this.checkAddFollower() )
        {
            spatial.getOwner().setTeamId(1);
            this._followList.push( spatial );
            if(this._entityBus)
            {
                this._entityBus.getSignal(EntitySignals.ADD_FOLLOWER ).dispatch();
            }
        }
    },
    removeFollower: function( spatial )
    {
        var index = this._followList.indexOf( spatial )
        if( index >= 0 )
        {
            this._followList.splice( index, 1 );
        }
    },
    checkAddFollower: function()
    {
        return this._followList.length < this.maxCount;
    },
    onTick: function( dt )
    {
        var len = this._followList.length;
        for( var i = len - 1; i >= 0; i-- )
        {
            var spatial = this._followList[i];
            var healthComponent = spatial.getOwner().lookupComponent( GameConst.health );
            if( healthComponent.isDead() )
            {
                this._followList.splice( i, 1 );
                continue;
            }
            else
            {
                var previousSpatial = null;
                if(i < 2)
                {
                    previousSpatial = this._spatial;
                }
                else
                {
                    previousSpatial = this._followList[i-2];
                }
                var targetCol = previousSpatial.getRenderCol() - this.colInterval;
                var targetRow = previousSpatial.getRenderRow() + ( i % 2 == 0 ? -1 : 1 ) * this.rowInterval;
//                var targetRow = parentSpatial.getRenderRow() - (Math.floor( i / 2 ) + 1) * this.rowInterval;
//                var targetCol = parentSpatial.getRenderCol() + ( i % 2 == 0 ? -1 : 1 ) * (Math.floor( i / 2 ) + 1) * this.colInterval;

                spatial.setRenderRow( spatial.getRenderRow() + (targetRow - spatial.getRenderRow())*0.1 );
                spatial.setRenderCol( spatial.getRenderCol() + (targetCol - spatial.getRenderCol())*0.1 );
            }
        }
    }
} );

var FollowComponent = sf.EntityComponent.extend( {
    _followerContainer: null,
    ctor: function()
    {
        this._super();
    },
    onAdd: function()
    {
        if( this.getOwner().lookupEntityFromGroup( GameConst.PLAYER ) != null )
        {
            this._followerContainer = this.getOwner().lookupComponentByEntity( GameConst.followerContainer, GameConst.PLAYER );
            if( this._followerContainer == null )
            {
                cc.log( "[FollowComponent] _followerContainer is null" )
                return;
            }
            var spatial = this.getOwner().lookupComponent( GameConst.spatial );
            if( !this._followerContainer.checkAddFollower() )
            {
                spatial.getOwner().removeComponentByName("boundCheck");

                var rowBoundDestory = new RowBoundDestoryComponent();
                var timeGenerator = new SingleNumberGenerator();
                timeGenerator.setValue( 0.5 );
                rowBoundDestory.setCooldownTime( timeGenerator );
                this.getOwner().addComponent( rowBoundDestory, "rowBoundDestory" );
                var scrollMap = this.getOwner().lookupComponentByEntity( GameConst.scrollMap, GameConst.world );
                spatial.setVelY( scrollMap.getVelocity() + 0.1 );
            }
            else
            {
                this._followerContainer.addFollower( spatial );
            }
        }
    },
    onRemove: function()
    {
        if( this.getOwner().lookupEntityFromGroup( GameConst.PLAYER ) != null )
        {
            this._followerContainer = this.getOwner().lookupComponentByEntity( GameConst.followerContainer, GameConst.PLAYER );
            var spatial = this.getOwner().lookupComponent( GameConst.spatial );
            if( this._followerContainer && spatial )
            {
                this._followerContainer.removeFollower( spatial );
            }
        }
    }
} );