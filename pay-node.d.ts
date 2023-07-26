
declare class PayClient {
    constructor(parameters:string|null) ;
        public publicKey:string;
        public privateKey:string;
        public ssoLogin(auth:any,signtext:any,isProd:boolean):void;
}

export {PayClient}