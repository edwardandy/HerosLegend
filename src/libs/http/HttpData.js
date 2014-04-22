/**
 * Created by chenyonghua on 13-11-8.
 */
HttpData = cc.Class.extend( {
    uniqueId: 0,                        //唯一标识
    path: "",                           //后端API调用路径
    target:null,                        // 调用callback的对象
    callback: null,                     // 调用后端成功的回调方法
    result: false,                      // 接口调用是否成功
    params:null,                        // 接口调用参数
    userData:null,                      // 需要附带的数据
    remoteData:null,                    // 服务端返回的数据
    errorMsg:"",                        // 错误信息
    errorCode:0,                        // 错误码
    ctor:function()
    {

    },
    reset:function()
    {
        this.uniqueId 		= -1;
        this.path 			= "";
        this.target 		= null;
        this.callback 		= null;
        this.result 	    = false;
        this.params 		= null;
        this.userData 		= null;
        this.remoteData 	= null;
        this.errorMsg 		= null;
        this.errorCode 		= -1;
    }
} );