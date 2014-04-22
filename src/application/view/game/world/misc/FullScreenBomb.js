/**
 * Created by chenyonghua on 14-3-17.
 */
var FullScreenBomb = RepeatingThinkingComponent.extend( {
    _row: 0,
    _scrollMap: null,
    ctor: function()
    {
        this._super();
    },
    onAdd: function()
    {
        this._super();
        this._scrollMap = this.getOwner().lookupComponentByEntity( GameConst.scrollMap, GameConst.world );
    },
    onThink: function()
    {
        for( var i = 0; i < GameConst.numCols; i++ )
        {
            if( i % 3 == 0 )
            {
                EntityCreator.createEntityById(GameConst.AIRSTRIKEEXPLOSION,{},this.getOwner(),1+i,this._row);
            }
        }
        this._row += 2;
        if( this._row >= GameConst.numRows )
        {
            this.getOwner().destory();
        }
    }
} );