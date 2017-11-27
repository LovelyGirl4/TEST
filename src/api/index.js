// 只需要在浏览器中加载Polyfill类库，就能使用IE10等或者还没有提供对Promise支持的浏览器中使用Promise里规定的方法。
// 也就是说如果加载了Polyfill类库，就能在还不支持Promise的环境中，运行Promise里规定的方法。
import es6promise from 'es6-promise'
es6promise.polyfill()
import fetch from 'isomorphic-fetch'
import store from '../configureStore'

let API, AUTHED_API
if (process.argv.NODE_ENV === 'development') {
    API = 'http://api.autopartshub.com'
    AUTHED_API = 'http://api.autopartshub.com'
} else if (process.argv.NODE_ENV === 'production') {
    API = 'http://api.autopartshub.com'
    AUTHED_API = 'http://api.autopartshub.com'
} else {
    API = 'http://api.autopartshub.com'
    AUTHED_API = 'http://api.autopartshub.com'
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
    const access_token = store.getState().app.token
    return _fetch(AUTHED_API + url, {
        ...option,
        headers: {
            ...option.headers,
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
    }).then()
}


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
            client_id: 'admin',
            scope: ''
        })
    })
}
