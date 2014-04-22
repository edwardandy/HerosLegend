/**
 * Created by chenyonghua on 13-12-19.
 */
var ThinkingComponent = sf.TickedComponent.extend({
    _timer:0,
    _timeGenerator:null,
    _pause:true,
    ctor:function()
    {
        this._super();
    },
    setTimeGenerator:function(value)
    {
        this._timeGenerator = value;
        this._timer = this._timeGenerator.getNextValue();
    },
    start:function()
    {
        this._pause = false;
    },
    stop:function()
    {
        this._pause = true;
    },
    reset:function()
    {
        this._timer = this._timeGenerator.getNextValue();
        this.start();
    },
    isRunning:function()
    {
        return this._pause;
    },
    onTick:function(dt)
    {
        if(this._pause)
        {
            return;
        }
        this._timer -= dt;
        if( this._timer <= 0 )
        {
            this._timer = this._timeGenerator.getNextValue();
            this.onThink();
        }
    },
    onThink:function()
    {

    }
});
