import {
    timeout,
    baseUrl
} from "./config.js"

function request(options) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + options.url,
            method: options.method || 'get',
            timeout: timeout,
            data: options.data || {},
            success: function (res) {
                resolve(res.data)
            },
            fail: reject

        })
    })
}
export default request