class PayOption{
    constructor(host,appKey,secretKey,expireTime){
        this.host =host;
        this.appKey =appKey;
        this.secretKey =secretKey;
        this.expireTime =expireTime;
    }
}
class PayResult{
    constructor(){
        this.Success=false;
        this.Message="";
        this.Data=null;
    }
}
module.exports = {
    PayOption,
    PayResult
  };
// export {PayOption,PayResult}