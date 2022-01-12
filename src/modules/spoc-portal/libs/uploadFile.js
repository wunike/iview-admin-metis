import valid, {
    errors,
    sys,
    sysUser,
    sysDict,
    sysAttachment,
    common
} from "./request";


let accessid = ''
let policyBase64 = ''
let signature = ''
let callbackbody = ''
let key = ''
let expire = 0
let host = ''
let g_object_name = ''
let now = Date.parse(new Date()) / 1000;

// 生成随机字符串
function random_string(len) {
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
// 获取用户上传原始文件名
function get_file_name(filename) {
    let pos = filename.lastIndexOf('.')
    let suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}
//  把随机生成的字符串拼接在原始上传文件名后面生成新的唯一文件名
function set_file_name(filename) {
    let suffix = get_file_name(filename)
    g_object_name = key + random_string(10) + suffix
    return ''
}

// 获取后端返回的签名信息，生成oss参数
function oss(filename = null, objectType, objectId, kind) {
    // 可以判断当前expire是否超过了当前时间， 如果超过了当前时间， 就重新取一下， 3 s 作为缓冲。
    now = Date.parse(new Date()) / 1000;
    if (expire < now + 3) {
        // 调用后端服务器接口获取签名信息，利用axios返回promise，可以链式调用

        return sys.uploadStsToken({
            objectType,
            objectId,
            kind
        }).then(res => {
            /* 返回的签名策略信息包含:
            {
              accessid: "LTAI*******UPPr", // 用户请求的accessid
              callback: "eyJjYWxs************H0ifQ==", // 回调
              dir: "test/file-dir/", // 上传文件的存储位置
              expire: "1557974779", // 上传策略Policy失效时间
              host: "http://xxxxxxxxx.com", // 上传文件服务器地址
              policy: "eyJleHBp***********6/EMG7U=" ,// 用户表单上传的策略（Policy)
              signature: "JumJy*****k6/EMG7U=" // 签名信息
            }
            */
            // policyBase64 = res['policy']
            // accessid = res['accessid']
            // signature = res['signature']
            // expire = parseInt(res['expire'])
            // callbackbody = res['callback']
            // host = res['host']
            // key = res['dir']

            if (filename != null) {
                set_file_name(filename)
            }
            // 返回表单上传需要的参数信息
            console.log(filename,set_file_name(filename))
            res.data.data.OSSDirPath+='/'+g_object_name;
            return res;
        })
    }
}

export {
    oss
}
