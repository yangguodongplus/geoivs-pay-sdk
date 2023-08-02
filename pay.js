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
            let Port = "";
            let AppKey = "";
            let SecretKey = "";
            let expireTime = 86400;
            this.option = new PayOption(Host, Port, AppKey, SecretKey, expireTime);
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
        let port = this.option.port ? `:${this.option.port}` : '';
        const url = `http://${this.option.host}${port}/api/auth/AccessToken?${queryParams}`;
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
        await this.auth().then(res => {
            if (res.Success && res.Data) {
                this.option.accessToken = res.Data.AccessToken;
            }
        });;

        if (!this.option.accessToken) {
            let result = {
                Success: false,
                Message: "授权失败"
            };
            return new Promise((resolve, reject) => { resolve(JSON.parse(result)) });
        }
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
        await this.auth().then(res => {
            if (res.Success && res.Data) {
                this.option.accessToken = res.Data.AccessToken;
            }
        });;

        if (!this.option.accessToken) {
            let result = {
                Success: false,
                Message: "授权失败"
            };
            return new Promise((resolve, reject) => { resolve(JSON.parse(result)) });
        }
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

    // async notifyHandler() {
    //     const context = this.httpContextAccessor.HttpContext;

    //     // let param=
    //     let port = this.option.port ? `:${this.option.port}` : '';
    //     const url = `http://${this.option.host}${port}/api/pay/notify${queryParams}`;
    //     // const url = `${this.ApiHost}${context.Request.Path.Value.replace('payment', 'pay')}`;
    //     const headers = {
    //         APPKEY: this.AppKey,
    //         SECRETKEY: this.SecretKey,
    //         ACCESSTOKEN: this.AccessToken,
    //     };

    //     const requestOptions = {
    //         method: context.Request.Method,
    //         headers: headers,
    //     };

    //     // Body
    //     if (context.Request.ContentType.includes('application/x-www-form-urlencoded')) {
    //         const formData = new URLSearchParams();
    //         context.Request.Form.forEach((entry) => {
    //             formData.append(entry.key, entry.value.toString());
    //         });
    //         requestOptions.body = formData;
    //     } else if (context.Request.ContentType.includes('application/json')) {
    //         const requestBody = await new StreamReader(context.Request.Body, Encoding.UTF8).ReadToEndAsync();
    //         if (requestBody) {
    //             requestOptions.body = JSON.parse(requestBody);
    //         }
    //     }




    //     // const response = await fetch(url, requestOptions);
    //     // const responseData = await response.json();
    //     // const apiResult = new ApiResult();
    //     // Object.assign(apiResult, responseData);

    //     return apiResult;
    // }

}
module.exports = { Pay, PayOption, PayResult };