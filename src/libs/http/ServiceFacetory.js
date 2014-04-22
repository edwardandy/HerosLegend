/**
 * Created by chenyonghua on 13-11-7.
 */
ServiceFacetory = cc.Class.extend( {
    _handlerMap: null,
    idIterator: 0,
    _context: null,
    ctor: function()
    {
        this._handlerMap = {};
        this.idIterator = 0;
    },
    setContext: function( value )
    {
        this._context = value;
    },
    //isBind 是指遇到这个http，是否需要单独发送
    registerService: function( key, type, isBind )
    {
        if( this._handlerMap[key] != null )
        {
            throw new Error( "[registerService] Overridding existing handler for service id:" + key );
        }
        this._handlerMap[key] = {"clazz": type, "isBind": isBind};
    },
    unRegisterService: function( id, type )
    {
        if( this._handlerMap[id] != null )
        {
            delete this._handlerMap[id];
        }
    },
    verifyService: function( key )
    {
        if( !(key in this._handlerMap) )
        {
            throw new Error( "not existing service id:" + key );
        }

        if( this._handlerMap[key].isBind == true )
        {
            return true;
        }
        else
        {
            return false;
        }
    },
    getEmptyService: function( key )
    {
        if( !(key in this._handlerMap) )
        {
            return null;
        }

        try
        {
            var clazz = this._handlerMap[key].clazz;
            var service = new clazz();
            service.setContext( this._context );
            service.id = this.idIterator++;
        }
        catch( err )
        {
            cc.log( "error msg:" + err );
            return null;
        }
        return service;
    }
} );
ServiceFacetory.INSTANCE = null;
ServiceFacetory.getInstance = function()
{
    if( ServiceFacetory.INSTANCE == null )
    {
        ServiceFacetory.INSTANCE = new ServiceFacetory();
    }
    return ServiceFacetory.INSTANCE;
}