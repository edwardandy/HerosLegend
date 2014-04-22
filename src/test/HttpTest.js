/**
 * Created by chenyonghua on 13-11-8.
 */
//HttpManager.getInstance().registerService("I0001",HttpService,false);
//
//var service = HttpManager.getInstance().getEmptyService("I0001");
//service.setName("abc");
//cc.log(typeof(service));
//cc.log("service.name:"+service.getName());

//var request = new HttpRequest();
//var httpData = new HttpData();
//httpData.path			= "http://dev-flowershop2.shinezoneapp.com:1080/test.php";
////httpData.callback 		= this.onDataReceived;
//httpData.params			= {"a":120,"b":"string"};
//httpData.userData		= null;
//request.setData(httpData);
//request.call();

var HttpTest = cc.Class.extend( {
    name:null,
    ctor: function()
    {
//        this.name = "luke";
//        var httpRequest = new sf.JSHttpRequest();
//        httpRequest.setTimeout(5);
//        httpRequest.setResponseCallback( this.onResponse, this );
//        httpRequest.call( "http://dev-flowershop2.shinezoneapp.com:1080/test.php", "params={abcdefg}", "I1001" );

        HttpManager.getInstance().initialize("http://dev-flowershop2.shinezoneapp.com:1080/test.php",null,null,null);
        HttpManager.getInstance().setPackInterval(2);
        HttpManager.getInstance().setMaxConnections(3);
        HttpManager.getInstance().registerService(GameStartService.NAME,GameStartService,false);

        var service = HttpManager.getInstance().getEmptyService(GameStartService.NAME);
        service.send(["luke","test1"],null,true);

        service = HttpManager.getInstance().getEmptyService(GameStartService.NAME);
        service.send(["luke","test2"],null,true);

        service = HttpManager.getInstance().getEmptyService(GameStartService.NAME);
        service.send(["luke","test3"],null,true);

        service = HttpManager.getInstance().getEmptyService(GameStartService.NAME);
        service.send(["luke","test4"],null,true);

        service = HttpManager.getInstance().getEmptyService(GameStartService.NAME);
        service.send(["luke","test5"],null,true);
    },
    onResponse: function( result, data )
    {
        cc.log("this.name:"+this.name);
        cc.log( "result:" + result );
        cc.log( "data:" + data );
    }
} );
