const { PayOption, PayResult } = require('./pay-options');
const http = require('http');
const querystring = require('querystring');

class Pay {
    constructor(option) {
        if (option) {
            this.option = option;
        }
        else {
            let Host = "https://pay.geovisearth.com";
            let Port = "https://pay.geovisearth.com";
            let AppKey = "";
            let SecretKey = "";
            let expireTime = 86400;
            this.option = new PayOption(Host,Port, AppKey, SecretKey, expireTime);
        }
        this._frame = null;
    }
    async auth() {
        const params = {
            appKey: this.option.appKey,
            secretKey: this.option.secretKey,
            expireTime: this.option.expireTime
        };
        const queryParams = querystring.stringify(params);
        const url = `${this.option.host}/api/auth/AccessToken?${queryParams}`;
        return new Promise((resolve, reject) => {
            http.get(url, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });
                response.on('end', () => {
                    resolve(JSON.parse(data));
                });
            }).on('error', (error) => {
                console.error(error);
            });
        });
    }
    async charge(param) {
        //const url = this.PayHost + '/api/pay/charge';
        // 发起POST请求
        const postData = JSON.stringify(param);
        const options = {
            hostname: this.option.host,
            port: this.option.port,
            path: '/api/pay/charge',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
                'APPKEY': this.option.appKey,
                'ACCESSTOKEN': this.option.accessToken,
            }
        };
        return new Promise((resolve, reject) => {
            const request = http.request(options, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });

                response.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });

            request.on('error', (error) => {
                console.error(error);
            });

            request.write(postData);
            request.end();
        });

    }

    async chargeNotify(param) {
        //const url = this.PayHost + '/api/pay/charge';
        // 发起POST请求
        const postData = JSON.stringify(param);
        const options = {
            hostname: this.option.host,
            port: this.option.port,
            path: '/api/pay/chargenotify',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
                'APPKEY': this.option.appKey,
                'ACCESSTOKEN': this.option.accessToken,
            }
        };
        return new Promise((resolve, reject) => {
            const request = http.request(options, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });

                response.on('end', () => {
                    resolve(JSON.parse(data));
                });
            });

            request.on('error', (error) => {
                console.error(error);
            });

            request.write(postData);
            request.end();
        });

    }
}
module.exports = { Pay, PayOption, PayResult };