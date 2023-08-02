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
declare enum Pay_Channel {
	Alipay = 1,
	Wechatpay = 2,
	// Unionpay=3,
	// Adyenpay=4,
	// Paypal=5,
	// Worldpay=6,
	// Joinpay=7,
	//Applepay=8
}
declare enum PayPlatform {
	Web = 1,
	Wap = 2,
	AppPay = 3,
	ScanPay = 4,
	BarcodePay = 5,
	JSPay = 6
}
export {PayOption,PayResult,Pay_Channel,PayPlatform}