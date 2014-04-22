/**
 * Created by chenyonghua on 14-3-7.
 */
var SoundComponent = sf.EntityComponent.extend( {
    _audioEngine: null,
    _soundURL: null,
    _soundDict: null,
    _entityBus: null,
    _callbacks: null,
    ctor: function()
    {
        this._audioEngine = cc.AudioEngine.getInstance();
        this._super();
        this._soundDict = {};
        this._callbacks = {};
    },
    addSignalSound: function( signalDesc, sound )
    {
        if( this._soundDict[signalDesc.getId()] == null )
        {
            this._soundDict[signalDesc.getId()] = [];
        }
        this._soundDict[signalDesc.getId()].push( sound );
    },
    onAdd: function()
    {
        this._entityBus = this.getOwner().lookupComponent( GameConst.entityBus );
        for( var key in this._soundDict )
        {
            var signal = this._entityBus.getSignalById( key );
            signal.add( this.getHandlerFunction( key ), this );
        }
    },
    onRemove: function()
    {
        for( var key in this._soundDict )
        {
            this._entityBus.getSignalById( key ).remove( this.getHandlerFunction( key ), this );
        }
        this._soundDict = null;
        this._entityBus = null;
    },
    getHandlerFunction: function( id )
    {
        if( this._callbacks[id] == null )
        {
            this._callbacks[id] = function()
            {
                this.playEffect( id );
            }
        }
        return this._callbacks[id];
    },
    playEffect: function( signalId )
    {
        var soundList = this._soundDict[signalId];
        if( soundList && soundList.length > 0 )
        {
            this._audioEngine.playEffect( soundList[Math.floor( Math.random() * soundList.length )] );
        }
    }
} )