## geovis sso 介绍
 ```
Geovis统一登录,可自动检测SSO登录状态，并实现账号同步登录和同步注销

```
## install
```
npm install geovis-sso

```
 ## geovis sso 介绍
```
//--在使用之前都需要申请相关的Appkey以及公私钥信息(保管好各自的公私钥)
//SSO.ts 提供浏览器端自动检测sso授权信息并登录
//提供应用级别的统一登录授权回调和注销回调以及数据加密验签等功能
eg:自动检测SSO登录状态并授权登录当前应用
//SSOOption 需要传入ssoHost,appkey,公钥,私钥信息
//sso配置
let host="https://sso.geoppt.com";
let appKey="";
let PUBLIC_KEY="";
let PRIVATE_KEY="";
let publishKey=`-----BEGIN PUBLIC KEY-----\n${PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
let privateKey=`-----BEGIN PRIVATE KEY-----\n${PRIVATE_KEY}\n-----END PRIVATE KEY-----`;
let ssoOption=new SSOOption(host,appKey,publishKey,privateKey);
//初始化sso
this._sso=new SSO(ssoOption);
//开始检测sso
this._sso.auth();//开始检测sso登录状态
//授权回调
this._sso.on('auth',async (authResult:SSOResult<string>)=>{
    if(authResult.Success){
        let ssoAccessToken=authResult.Data??"";
        if(!ssoAccessToken){
            console.log('token无效');
            //这里走各自应用的授权逻辑
            return;
        }
        var userProfileResult=await this._sso.userProfile(ssoAccessToken);
        if(userProfileResult.Success){
            用户信息:userProfileResult.Data
        }
        else{
            console.log('用户信息获取失败');
        }
    }
    else{
        console.log('sso检测授权失败:'+authResult.Message);
        //这里走各自应用的授权逻辑
    }
});
//授权回调(加密)
this._sso.on('crypted_auth',async (authResult:SSOResult<CryptedAuthInfo>)=>{
    if(authResult.Success){
        //authResult.Data.auth //密文
        //authResult.Data.signtext //签名信息
    }
    else{
        console.log('sso检测授权失败:'+authResult.Message);
    }
});
//sso登录成功回调
this._sso.on('login',()=>{

});
//sso登出回调成功
this._sso.on('logout',()=>{
    
});

```

```统一授权登录中心
eg:统一授权登录中心
//生成授权url并可以通过state携带参数，并通过该url跳转到统一登录中心
var ssoAuthUrl=this._sso.toAuthenticationUrl()+"&state=customParams";
...跳转 ssoAuthUrl

```
```
eg:单点登录SSO
//生成授权url并可以通过state携带参数
//
token:当前应用token
this._sso.login('token');
```
```
eg:单点登出SSO
this._sso.logout();
```

```
如果在nodejs(nestjs)下使用,请导入sso-node.ts

```