// regex 确定上传类型是不是image
// export const rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i
export const rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i

const  dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], {type: mime})
}
// 读取，压缩图片，TODO readFile(file, ratio, fileSizeLimit, quality)
const readFile = (file) => {
    let fileSize = file.size
    let fileType = file.type
    return new Promise((resolve, reject) => {
        if (fileSize <= 209715) {
            resolve(file)
        } else if (rFilter.test(fileType)) {
            // 如果是图片，就压缩处理
            let reader = new FileReader()
            reader.onload = (e) => {
                let myImage = new Image()
                myImage.src = e.target.result
                myImage.onload = () => {
                    var width = myImage.width
                    var height = myImage.height
                    var ratio
                    if ((ratio = width * height / 1000000) > 1) {
                        ratio = Math.sqrt(ratio)
                        width /= ratio
                        height /= ratio
                    } else {
                        ratio = 1
                    }
                    let canvas = document.createElement('canvas')
                    canvas.width = width
                    canvas.height = height
                    let ctx = canvas.getContext('2d')
                    ctx.drawImage(myImage, 0, 0, width, height)
                    // toBlob(function(){}, type, quality)
                    // canvas.toBlob(function(blob) {
                    //     resolve(blob);
                    // }, 'image/jpeg', 0.6);
                    const baseData = canvas.toDataURL('image/jpeg', 0.6)
                    const blobData = dataURLtoBlob(baseData)
                    resolve(blobData)
                }
            }
            reader.readAsDataURL(file)
        } else {
            resolve(file)
        }
    })
}

export const s3FormData = (uploadConfig, picture, GUID) => {
    if (picture.originFileObj) {
        return readFile(picture.originFileObj).then(blob => {
            let formData = new FormData()
            formData.append('key', `${uploadConfig.dir}/${GUID}${picture.name}`)
            formData.append('acl', 'public-read')
            formData.append('Content-Type', 'image/')
            formData.append('X-Amz-Credential', uploadConfig.policy.conditions[4]['x-amz-credential'])
            formData.append('X-Amz-Algorithm', uploadConfig.policy.conditions[5]['x-amz-algorithm'])
            formData.append('X-Amz-Date', uploadConfig.policy.conditions[6]['x-amz-date'])
            formData.append('Policy', uploadConfig.string_to_sign)
            formData.append('X-Amz-Signature', uploadConfig.signature)
            formData.append('file', blob)
            return formData
        })
    }
    return readFile(picture).then(blob => {
        let formData = new FormData()
        formData.append('key', `${uploadConfig.dir}/${GUID}${picture.name}`)
        formData.append('acl', 'public-read')
        formData.append('Content-Type', 'image/')
        formData.append('X-Amz-Credential', uploadConfig.policy.conditions[4]['x-amz-credential'])
        formData.append('X-Amz-Algorithm', uploadConfig.policy.conditions[5]['x-amz-algorithm'])
        formData.append('X-Amz-Date', uploadConfig.policy.conditions[6]['x-amz-date'])
        formData.append('Policy', uploadConfig.string_to_sign)
        formData.append('X-Amz-Signature', uploadConfig.signature)
        formData.append('file', blob)
        return formData
    })
}

// 生成一段随机数
export const guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

// 从缓存中取到token，login时已经将token存到缓存
export const getToken = () => {
    let token = window.localStorage.getItem('token')
    if (token) {
        const { exp } = JSON.parse(atob(token.split('.')[1]))
        // +new Date():将当前时间换成毫秒，exp*1000: token失效时间戳
        if (+new Date() > exp * 1000) {
            window.localStorage.removeItem('stoken')
            return null
        }
        return token
    }
    return null
}
