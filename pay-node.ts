// import { ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
// import * as qs from 'qs'
// import * as crypto from 'crypto'

// type PayResult<T> = {
//     Success: boolean,
//     Data: T
//     Message?: string
// }

// type TokenResult = PayResult<string>

// export type UserProfile = {
//     id: string
//     account: string
//     nickName: string
//     avatarUrl: string
//     phone: string
// }

// type UserProfileResult = PayResult<UserProfile>

// export class PayClient {
//     private readonly payPublicKey: crypto.KeyObject;
//     private readonly payPrivateKey: crypto.KeyObject;
//     private readonly payAppKey: string
//     private readonly payHost: string

//     private readonly MaxDecryptSize: number

//     constructor(
//         payConfig: {
//             publicKey: string,
//             privateKey: string,
//             appKey: string,
//             host: string,
//         }
//     ) {
//         const publicKey = `-----BEGIN PUBLIC KEY-----\n${payConfig.publicKey}\n-----END PUBLIC KEY-----`
//         const privateKey = `-----BEGIN PRIVATE KEY-----\n${payConfig.privateKey}\n-----END PRIVATE KEY-----`
//         this.payPublicKey = crypto.createPublicKey(publicKey)
//         this.payPrivateKey = crypto.createPrivateKey(privateKey)

//         this.payAppKey = payConfig.appKey
//         this.payHost = payConfig.host

//         this.MaxDecryptSize = this.payPrivateKey.asymmetricKeyDetails!.modulusLength! / 8

//     }
// }
