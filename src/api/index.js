// 只需要在浏览器中加载Polyfill类库，就能使用IE10等或者还没有提供对Promise支持的浏览器中使用Promise里规定的方法。
// 也就是说如果加载了Polyfill类库，就能在还不支持Promise的环境中，运行Promise里规定的方法。
import es6promise from 'es6-promise'
es6promise.polyfill()
import fetch from 'isomorphic-fetch'
import store from '../configureStore'

let API, API_CLIENT_ID
if (process.argv.NODE_ENV === 'development') {
    API = 'http://api.test.autopartshub.com'
    API_CLIENT_ID = 'd2ViOnNlY3JldA=='
} else if (process.argv.NODE_ENV === 'production') {
    API = 'http://api.test.autopartshub.com'
    API_CLIENT_ID = 'd2ViOnNlY3JldA=='
} else {
    API = 'http://api.test.autopartshub.com'
    API_CLIENT_ID = 'd2ViOnNlY3JldA=='
}
// encodeURIComponent()函数作用：可把字符串作为URI 组件进行编码。其返回值URIstring 的副本，其中的某些字符将被十六进制的转义序列进行替换。
const serialize = obj => Object.keys(obj).map(key => key + '=' + encodeURIComponent(obj[key])).join('&')
const _fetch = (url, option) => {
    return fetch(API + url, option).then(res => {
        if (res.status > 199 && res.status < 300) {
            return res.json()
        } else {
            throw res
        }
    })
}
const _fetchJson = (url, option = {}) => {
    return _fetch(url, {
        headers: {
            ...option.headers,
            'Content-Type': 'application/json'
        }
    })
}
const _authedFetch = (url, option = {}) => {
    // token: 1.从store里取 2.从缓存里取
    const access_token = store().getState().app.token
    // const access_token = window.localStorage.getItem('token')
    return _fetch(url, {
        ...option,
        headers: {
            ...option.headers,
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
    }).then()
}

// 登录获得token
export const fetchLogin = (username, password) => {
    return _fetch('/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: serialize({
            username,
            password,
            grant_type: 'password',
            client_id: 'app',
            client_secret: '',
            scope: ''
        })
    })
}
export const getUploadConfig = (resource, id, type) => {
    return _authedFetch(`/api/s3-upload/config?resource=${resource}&id=${id}&type=${type}`, {method: 'GET'})
}
