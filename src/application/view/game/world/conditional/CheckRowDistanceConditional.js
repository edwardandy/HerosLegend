/**
 * Created by chenyonghua on 13-12-21.
 */
var CheckRowDistanceConditional = sf.Conditional.extend( {
    _start: -1,
    _distance: 0,
    ctor: function()
    {
        this._super();
    },
    setDistance: function( value )
    {
        this._distance = value
    },
    isConditionalTrue: function()
    {
        if(this.getOwner())
        {
            var spatial = this.getOwner().lookupComponent( GameConst.spatial );
            if( this._start == -1 )
            {
                this._start = spatial.getRenderRow();
            }
            if( Math.abs(spatial.getRenderRow() - this._start) >= this._distance )
            {
                return true;
            }
        }
        return false;
    }
} );