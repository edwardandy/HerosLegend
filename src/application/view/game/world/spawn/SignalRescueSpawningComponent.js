/**
 * Created by chenyonghua on 13-12-28.
 */
var SignalRescueSpawningComponent = SignalEntitySpawningComponent.extend( {
    ctor: function()
    {
        this._super();
    },
    onAdd:function()
    {
        this._super();
    },
    onRemove:function()
    {
        this._super();
    },
    spawnEntity: function()
    {
        var entity = this._super();
        if( entity != null )
        {
//            SoldierCreator.createFollower( entity );
        }
    }
} )