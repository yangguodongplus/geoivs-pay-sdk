import { PayOption, PayResult } from 'geovis-pay/pay-options'
declare class Pay {
	public option: PayOption;
	constructor(option: PayOption | null);
	public async auth(): Promise<PayResult<AccessTokenResponse>>;
	public async charge(param: ChargeParamater<T>): Promise<PayResult<T>>;
	public async chargeNotify(param: ChargeNotifyParamter): Promise<PayResult<T>>;
}
declare class AccessTokenResponse {
	public AccessToken: string;
	public ExpireTime: Date;
}
declare class ChargeNotifyParamter {
	constructor(){}
	public Channel: number;
	public Platform: number;
	public OutTradeNo: string;
	public TradeNo: string;
	//public Body: string;
}
declare class ChargeNotifyData
{
	public OutTradeNo: string;
	public TradeNo: string;
	public TotalAmount: number;
}
declare class ChargeParamater<T> {
	public Channel: number;
	public Platform: number;
	public Order: T;
}
declare class ApplepayOrder {
	public ReceiptData: string;
}
declare class AlipayOrder {
	public Amount: number;
	public OutTradeNo: string;
	public Subject: string;
	public Body: string;
}
declare class WechatOrder {
	public Amount: number;
	public OutTradeNo: string;
	public Subject: string;
	public Body: string;

	//public Currency: string;
	public Attach: string;
	public ProductId: string;
	public SpbillCreateIp: string;
	public SceneInfo: SceneInfo;//H5支付 SceneInfo必填
	public Payer: Payer;//JSPay Payer必填
}
declare class SceneInfo {
	public PayerClientIP: string;
	public H5Info: H5Info;
}
declare class H5Info {
	public Type: string;
}
declare class Payer {
	public OpenId: string;
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
export { Pay, TradeType, Pay_Channel,PayPlatform, PayOption, ChargeParamater, ChargeNotifyParamter, ChargeNotifyData,PayResult }
