import {
    timeout,
    baseUrl
} from "./config.js"

function request(options) {
    wx.showLoading({
        title: '官人再等等...'
    })
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + options.url,
            method: options.method || 'get',
            timeout: timeout,
            data: options.data || {},
            success: function (res) {
                resolve(res.data)
            },
            fail: reject,
            complete: res => {
                wx.hideLoading()
            }

        })
    })
}
export default request