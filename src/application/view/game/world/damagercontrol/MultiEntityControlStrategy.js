/**
 * Created by chenyonghua on 13-12-28.
 */
var MultiEntityControlStrategy = cc.Class.extend( {
    _hitList: null,
    _repeatCount: null,
    _lastTime: null,
    _timeGenerator: null,
    ctor: function()
    {
        this._hitList = [];
    },
    onTick: function( dt )
    {
        if( this._timeGenerator != null )
        {
            this._lastTime -= dt;
        }
    },
    setExpireTime: function( value )
    {
        this._timeGenerator = value;
        this._lastTime = this._timeGenerator.getNextValue();
    },
    setRepeatCount: function( value )
    {
        this._repeatCount = value;
    },
    onHit: function( hitee )
    {
        this._hitList.push( hitee );
    },
    shouldRemove: function()
    {
        return false;
    },
    /*RowSpatialObject*/
    canDamagerHit: function( potentialHitee )
    {
        return this._hitList.indexOf( potentialHitee ) < 0 && potentialHitee != null && potentialHitee.getOwner() != null;
    },
    isDamagerDead: function()
    {
        if( (this._repeatCount != null && this._repeatCount <= 0 ) || (this._timeGenerator != null && this._lastTime < 0) )
        {
            return true;
        }
        return false;
    },
    onComplete: function()
    {
        if( this._repeatCount != null )
        {
            this._repeatCount--;
        }
    }
} )