/**
 * Created by chenyonghua on 13-11-7.
 */
HttpManager = cc.Class.extend( {
    pendingRemotes: null,
    httpQueue: null,
    _showModal: null,
    _hideModal: null,
    _showError: null,
    _path: "",
    _isRunning: false,
    requestTimeouts: 5,
    _maxConnections: 8,
    _httpUniqueIdCnt: 0,
    _modalCount: 0,
    _interval: 5,
    ctor: function()
    {
        this._isRunning = false;
        this.pendingRemotes = [];
        this.httpQueue = new HttpQueue();
    },
    setMaxConnections: function( value )
    {
        this._maxConnections = value;
    },
    getMaxConnections: function()
    {
        return this._maxConnections;
    },
    setModalCount: function( value )
    {
        this._modalCount = value;
        if( this._modalCount > 0 )
        {
            if( this._showModal != null )
            {
                this._showModal.apply();
            }
        }
        else
        {
            if( this._hideModal != null )
            {
                this._hideModal.apply();
            }
        }
    },
    getModalCount: function()
    {
        return this._modalCount;
    },
    initialize: function( apiPath, showFun, hideFun, showErrorFun )
    {
        this._showModal = showFun;
        this._hideModal = hideFun;
        this._showError = showErrorFun;
        this._path = apiPath;
    },
    setPackInterval: function( value )
    {
        if( this._isRunning )
        {
            cc.Director.getInstance().getScheduler().unscheduleCallbackForTarget( this, this.processPendingServices );
        }
        this._interval = value;
        this.checkTimer();
    },
    checkTimer: function()
    {
        if( this.pendingRemotes.length > 0 )
        {
            if( !this._isRunning )
            {
                this._isRunning = true;
                cc.Director.getInstance().getScheduler().scheduleCallbackForTarget( this, this.processPendingServices, this._interval, cc.REPEAT_FOREVER, 0, false );
            }
        }
        else
        {
            if( this._isRunning )
            {
                this._isRunning = false;
                cc.Director.getInstance().getScheduler().unscheduleCallbackForTarget( this, this.processPendingServices );
            }
        }
    },
    processPendingServices: function()
    {
        cc.log( "[processPendingServices] processing length:" + this.pendingRemotes.length );
        if( this.pendingRemotes.length > 0 )
        {
            var vec = this.pendingRemotes.concat();
            this.pendingRemotes.length = 0;

            var paramsTemp = [];
            var userDatas = [];
            var service;
            for( var i = 0, len = vec.length; i < len; i++ )
            {
                service = vec[i];
                if( service.hasApplied() )
                {
                    continue;
                }
                service.apply();
                service.setApplied(true);
                var unBind = ServiceFacetory.getInstance().verifyService( service.getName() );
                if( unBind )
                {
                    //先发送前面一部分
                    if( paramsTemp.length > 0 )
                    {
                        this.splitGroup( paramsTemp, userDatas );
                        paramsTemp.length = 0;
                        userDatas.length = 0;
                    }
                    //再把当前的发出去
                    this.createHttpRequest( [[service.getName(), service.getParams()]], [service] );
                }
                else
                {
                    paramsTemp.push( [service.getName(), service.getParams()] );
                    userDatas.push( service );
                }
            }

            //整个循环收集的request发出去
            if( paramsTemp.length > 0 )
            {
                this.splitGroup( paramsTemp, userDatas );
                paramsTemp.length = 0;
                userDatas.length = 0;
            }
        }
        this.checkTimer();
    },
    setRequestTimeouts: function( seconds )
    {
        this.requestTimeouts = seconds;
    },
    createHttpRequest: function( params, userDatas )
    {
        var httpData                    = new HttpData();
        httpData.reset();
        httpData.uniqueId               = this.generateUniqueId();
        httpData.path                   = this._path;
        httpData.target                 = this;
        httpData.callback               = this.onDataReceived;
        httpData.params                 = params.concat();
        httpData.userData               = userDatas.concat();

        var http                        = new HttpRequest();
        http.setTimeOuts( this.requestTimeouts );
        http.setData( httpData );
        this.addHttpRequest( http );
    },
    splitGroup: function( params, userDatas )
    {
        while( params.length > 0 )
        {
            var paramsGroup = params.splice( 0, this._maxConnections );
            var userDatasGroup = userDatas.splice( 0, this._maxConnections );
            this.createHttpRequest( paramsGroup, userDatasGroup );
        }
    },
    queue: function( service )
    {
        this.pendingRemotes.push( service );
        service.onQueued();
        if( service.isModal )
        {
            this.setModalCount( this._modalCount + 1 );
        }
        this.checkTimer();
    },
    sendImmediate:function(service)
    {
        if( service.isModal )
        {
            this.setModalCount( this._modalCount + 1 );
        }
        this.createHttpRequest( [[service.getName(), service.getParams()]], [service] );
    },
    sendSingleHttp:function(service)
    {
        if( service.isModal )
        {
            this.setModalCount( this._modalCount + 1 );
        }

        var httpData                    = new HttpData();
        httpData.reset();
        httpData.uniqueId               = this.generateUniqueId();
        httpData.path                   = this._path;
        httpData.target                 = this;
        httpData.callback               = this.onSingleHttpReceived;
        httpData.params                 = service.getParams();
        httpData.userData               = service;

        var http                        = new HttpRequest();
        http.setPostFormat(1);
        http.setTimeOuts( this.requestTimeouts );
        http.setData( httpData );
        http.call();
    },
    addHttpRequest: function( httpRequest )
    {
        this.httpQueue.push( httpRequest );
    },
    callNextHttpRequest: function()
    {
        this.httpQueue.next();
    },
    generateUniqueId: function()
    {
        return this._httpUniqueIdCnt++;
    },
    onSingleHttpReceived:function(data)
    {
        var remoteData  = data.remoteData;
        var service     = data.userData;
        if( data.result )
        {
            if( service.isModal )
            {
                this.setModalCount( --this._modalCount );
            }
            service.success( remoteData );
        }
        else
        {
            if( service.isModal )
            {
                this.setModalCount( --this._modalCount );
            }
            service.fault( remoteData );
        }
    },
    /**
     * data {HttpData}
     */
    onDataReceived: function( data )
    {
        var params = data.params;
        var userDatas = data.userData;

        var i;
        var len = params.length;
        var service;
        if( data.result )
        {
            var remoteData = data.remoteData;
            for( i = 0; i < len; i++ )
            {
                service = userDatas[i];
                if( service.isModal )
                {
                    this.setModalCount( --this._modalCount );
                }
                service.success( remoteData[i] );
            }
        }
        else
        {
            for( i = 0; i < len; i++ )
            {
                service = userDatas[i];
                if( service.isModal )
                {
                    this.setModalCount( --this._modalCount );
                }
                service.fault( data.remoteData );
            }
        }
    },
    clearService: function()
    {
        this.pendingRemotes.length = 0;
        this.checkTimer();
    },
    setContext:function(value)
    {
        ServiceFacetory.getInstance().setContext(value);
    },
    registerService: function( key, type, isBind )
    {
        ServiceFacetory.getInstance().registerService( key, type, isBind );
    },
    unRegisterService: function( id )
    {
        ServiceFacetory.getInstance().unRegisterService( id );
    },
    getEmptyService: function( id )
    {
        return ServiceFacetory.getInstance().getEmptyService( id );
    }
} );
HttpManager.INSTANCE = null;
HttpManager.getInstance = function()
{
    if( HttpManager.INSTANCE == null )
    {
        HttpManager.INSTANCE = new HttpManager();
    }
    return HttpManager.INSTANCE;
}