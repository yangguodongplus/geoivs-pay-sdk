declare class PayOption{
    constructor(host:string|null,port:string|null, appKey:string|null,secretKey:string|null,expireTime:number|null);
    public host:string;
    public port:string;
    public appKey:string;
    public secretKey:string;
    public expireTime:number;
    public accessToken:string;
}
declare class PayResult<T>{
    public Success:boolean;
    public Message:string;
    public Data?:T;
}
export {PayOption,PayResult}