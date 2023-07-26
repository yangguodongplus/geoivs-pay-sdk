// const qs = require('qs')
// const crypto = require('crypto')
// const axios = require('axios')

// // const nanoid = (size = 21) => {
// //     const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
// //     let id = ''
// //     let i = size
// //     while (i--) {
// //         id += urlAlphabet[(Math.random() * 64) | 0]   // `| 0` is more compact and faster than `Math.floor()`.
// //     }
// //     return id
// // }

// class PayClient {
//     constructor(ssoConfig) {
//         const publicKey = `-----BEGIN PUBLIC KEY-----\n${ssoConfig.publicKey}\n-----END PUBLIC KEY-----`
//         const privateKey = `-----BEGIN PRIVATE KEY-----\n${ssoConfig.privateKey}\n-----END PRIVATE KEY-----`
//         this.ssoPublicKey = crypto.createPublicKey(publicKey)
//         this.ssoPrivateKey = crypto.createPrivateKey(privateKey)
//         this.ssoAppKey = ssoConfig.appKey
//         this.ssoHost = ssoConfig.host
//     }

//     signAsMd5WithRSA(data) {
//         const sign = crypto.createSign('md5WithRSAEncryption');
//         sign.update(data);
//         sign.end();
//         return sign.sign(this.ssoPrivateKey).toString('base64')
//     }

//     verifyAsMd5WithRSA(data, sign) {
//         const verify = crypto.createVerify('md5WithRSAEncryption');
//         verify.update(data);
//         verify.end();
//         const result = verify.verify(this.ssoPublicKey, sign, 'base64')
//         return result
//     }

//     decryptAsRSA(data) {
//         const buf = Buffer.from(data, 'base64')
//         const result = crypto.privateDecrypt({
//             key: this.ssoPrivateKey,
//             padding: crypto.constants.RSA_PKCS1_PADDING,
//         }, buf)
//         return result.toString()
//     }

//     createLoginAuthUrl() {
//         const now = Date.now()
//         const id = nanoid(36)
//         const params = `timestamp=${now}&clientID=${id}`;
//         const encrypted = crypto.publicEncrypt({
//             key: this.ssoPublicKey,
//             padding: crypto.constants.RSA_PKCS1_PADDING,
//         }, Buffer.from(params)).toString('base64')

//         const query = `?appkey=${this.ssoAppKey}&auth=${encrypted}`;
//         const sign = this.signAsMd5WithRSA(query);
//         console.log('verifyAsMd5WithRSA', this.verifyAsMd5WithRSA(query, sign));

//         return {
//             ssoHost: this.ssoHost,
//             path: `/auth/login?appkey=${this.ssoAppKey}&auth=${encodeURIComponent(encrypted)}&signtext=${encodeURIComponent(sign)}`,
//         }
//     }

//     ssoLogin(auth, signtext, isProd = true) {
//         // 验签
//         const signStr = isProd ? `?auth=${auth}` : `?appkey=${this.ssoAppKey}&auth=${auth}` // prod: sso服务器签名信息中并不包括appKey
//         if (!this.verifyAsMd5WithRSA(signStr, signtext)) {
//             throw new Error(`invalid signature`)
//         }
//         // 解密
//         let query
//         try {
//             query = this.decryptAsRSA(auth)
//         } catch {
//             throw new Error(`invalid signature`)
//         }
//         const parsed = qs.parse(query)
//         console.log('parsed :>> ', parsed);
//         return {
//             session: parsed['session'],
//             unionId: parsed['id'],
//         }
//     }

//     async getTokenfromSession(session) {
//         try {
//             const res = await axios.get(this.ssoHost + `/auth/sessionToToken?sessionID=${session}`)
//             const data = res.data
//             if (data.Success) {
//                 return data.Data
//             } else {
//                 console.log(data.Message || 'token expired')
//             }
//         } catch (error) {
//             console.log(error);
//         }
//         return null
//     }

//     async userProfile(token) {
//         try {
//             const res = await axios.get(this.ssoHost + `/user/profile?token=${token}`)
//             const data = res.data
//             if (data.Success) {
//                 return data.Data
//             } else {
//                 console.log(data.Message || 'token expired')
//             }
//         } catch (error) {
//             console.log(error);
//         }
//         return null
//     }
// }

// module.exports = PayClient
