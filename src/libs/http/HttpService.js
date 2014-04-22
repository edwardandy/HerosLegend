/**
 * Created by chenyonghua on 13-11-8.
 */
HttpService = Actor.extend( {
    _id: 0,
    _hasApplied: false,
    _name: "HttpService",
    _params: null,
    _userData: null,
    _isModal: false,
    ctor: function( name )
    {
        this._hasApplied = false;
        this._name = name;
        this._super( this._name );
    },
    setParams: function( arr )
    {
        this._params = arr;
    },
    getParams: function()
    {
        return this._params;
    },
    setUserData: function( object )
    {
        this._userData = object;
    },
    getUserData: function()
    {
        return this._userData;
    },
    setModal: function( bool )
    {
        this._isModal = bool;
    },
    isModal: function()
    {
        return this._isModal;
    },
    getName: function()
    {
        return this._name;
    },
    setId: function( id )
    {
        this._id = id;
    },
    getId: function( id )
    {
        return this._id;
    },
    setApplied: function( bool )
    {
        this._hasApplied = bool;
    },
    hasApplied: function()
    {
        return this._hasApplied;
    },
    apply: function()
    {

    },
    send: function( params, userData, isModal )
    {
        this._isModal = isModal;
        this._userData = userData;
        this._params = params;
        HttpManager.getInstance().queue( this );
    },
    sendImmediate: function( params, userData, isModal )
    {
        this._isModal = isModal;
        this._userData = userData;
        this._params = params;
        HttpManager.getInstance().sendImmediate( this );
    },
    sendSingleHttp: function( params, userData, isModal )
    {
        this._isModal = isModal;
        this._userData = userData;
        this._params = params;
        HttpManager.getInstance().sendSingleHttp( this );
    },
    onQueued: function()
    {

    },
    success: function( object )
    {
        cc.log( "[HttpService] the success function should be overrided!" );
    },
    fault: function( object )
    {
        cc.log( "[HttpService] the fail function should be overrided!" );
    }
} )
;