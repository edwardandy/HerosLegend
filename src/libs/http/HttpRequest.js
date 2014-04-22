/**
 * Created by chenyonghua on 13-11-8.
 */
HttpRequest = cc.Class.extend( {
    timeouts: 5,
    _postFormat:0,
    httpData: null,
    _httpRequest:null,
    ctor: function()
    {
    },
    setPostFormat:function(value)
    {
        this._postFormat = value;
    },
    setData: function( httpData )
    {
        this.httpData = httpData;
    },
    setTimeOuts: function( seconds )
    {
        this.timeouts = seconds;
    },
    call: function()
    {
        cc.log("this.timeouts:"+this.timeouts);
        cc.log("this.httpData.uniqueId:"+this.httpData.uniqueId);
        cc.log("this.httpData.path:"+this.httpData.path);
        cc.log("this.httpData.params:"+JSON.stringify( this.httpData.params ));
        this._httpRequest = new sf.JSHttpRequest();
        this._httpRequest.retain();
        this._httpRequest.setTimeout( this.timeouts );

        this._httpRequest.setResponseCallback( this.onHttpDataResponse, this );

        if(this._postFormat == 0)
        {
            this._httpRequest.call( this.httpData.path, "params=" + JSON.stringify( this.httpData.params ), this.httpData.uniqueId);
        }
        else if(this._postFormat == 1)
        {
            this._httpRequest.call( this.httpData.path, this.formatString( this.httpData.params ), this.httpData.uniqueId);
        }
    },
    formatString:function(object)
    {
        var urlString = "";
        for(var key in object)
        {
            urlString += key + "=" + object[key];
            urlString += "&";
        }
        cc.log("urlString:"+urlString);
        return urlString;
    },
    onHttpDataResponse: function( result, data )
    {
        if( result )
        {
            var remoteData;
            try
            {
                remoteData = JSON.parse( data );
            }
            catch( e )
            {
                cc.log( "JSON.decode 出错！" );
            }
            if( remoteData )
            {
                this.httpData.errorCode = remoteData.code;
                if( this.httpData.errorCode == 0 || this.httpData.errorCode == undefined)
                {
                    this.httpData.result = true;
                    this.httpData.remoteData = remoteData;
                }
                else
                {
                    this.httpData.remoteData = null;
                    this.httpData.errorMsg = remoteData.msg;
                }
            }
            else
            {
                this.httpData.result = false;
                this.httpData.errorMsg = "";
            }
        }
        else
        {
            this.httpData.result = false;
            this.httpData.errorMsg = "NetError";
        }
        if (this.httpData.callback != null)
        {
            this.httpData.callback.apply(this.httpData.target,[this.httpData]);
        }
        this.complete();
    },
    complete: function()
    {
        this._httpRequest.release();
        this._httpRequest = null;
        HttpManager.getInstance().callNextHttpRequest();
        this.httpData = null;
    }
} );