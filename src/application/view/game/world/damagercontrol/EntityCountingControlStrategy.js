/**
 * Created by chenyonghua on 13-11-26.
 */
var EntityCountingControlStrategy = cc.Class.extend( {
    _maxToHit: 1,
    _hitCounter: 1,
    ctor: function()
    {

    },
    setMaxHit: function( numHits )
    {
        this._maxToHit = numHits;
        this._hitCounter = numHits;
    },
    getMaxHit: function()
    {
        return this._maxToHit;
    },
    getHitCounter: function()
    {
        return this._hitCounter;
    },
    onTick: function( dt )
    {

    },
    onHit: function( hitee )
    {
        this._hitCounter--;
    },
    /*RowSpatialObject*/
    canDamagerHit: function( potentialHitee )
    {
        return this._hitCounter > 0 && potentialHitee != null && potentialHitee.getOwner() != null;
    },
    isDamagerDead: function()
    {
        return this._hitCounter <= 0;
    },
    resetCount: function()
    {
        this._hitCounter = this._maxToHit;
    }
} );