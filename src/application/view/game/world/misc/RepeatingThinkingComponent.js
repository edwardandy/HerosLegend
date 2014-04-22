/**
 * Created by chenyonghua on 13-11-28.
 */
var RepeatingThinkingComponent = sf.TickedComponent.extend( {
    _timeGenerator: null,
    _timer: 0,
    _repeatTimes: -1,
    _repeatCount: -1,
    _isRunning: false,
    ctor: function()
    {
        this._super();
        this._isRunning = false;
        this._repeatCount = cc.REPEAT_FOREVER;
    },
    setCooldownTime: function( value )
    {
        this._timeGenerator = value;
        this._timer = this._timeGenerator.getNextValue();
        this._isRunning = true;
    },
    setRepeatTimes: function( value )
    {
        this._repeatCount = value;
    },
    onAdd: function()
    {

    },
    onRemove: function()
    {
        this._isRunning = false;
    },
    onTick: function( dt )
    {
        this._timer -= dt;
        if( !this._isRunning )
        {
            return;
        }
        if( this._timer <= 0 )
        {
            this._timer = this._timeGenerator != null ? this._timeGenerator.getNextValue() : 0;
            this.onThink();
            if( cc.REPEAT_FOREVER != this._repeatCount )
            {
//                cc.log("cc.REPEAT_FOREVER != this._repeatCount");
                this._repeatCount--;
                if( this._repeatCount <= 0 )
                {
                    this._isRunning = false;
                }
            }
        }
    },
    onThink: function()
    {

    }
} );