import api from '../api'

import * as types from './mutation-types'
import qiniu from 'qiniu'
// actions

export default {
    async register({ commit }, user) {
        return new Promise((resolve, reject) => {
            api.post("/register", user).then(res => {
                commit(types.REGISTER_SUCCESS, res.data.Data)
                resolve(res)
            }).catch(res => {
                reject(res)
            })
        })
    },
    async sendRegisterSMS({ commit }, captcha) {
        return api.post("/register/sms", captcha)
    },
    async emailVaild({ commit }, emailVaild) {
        return api.post("/emailvalid", emailVaild)

    },
    async avatars({ commit }) {
        return api.get("/avatars", {})
    },
    async uploadImages({ commit }, { uploadToken, file, key }) {
        var that = this
        return new Promise((resolve, reject) => {
            var qiniuUpUrl = "http://upload-z2.qiniu.com/putb64/-1/key/"


            var pic = file.split(',')[1];

            var keys = new Buffer(escape(key)).toString('base64');
            var url = qiniuUpUrl + keys; //非华东空间需要根据注意事项 1 修改上传域名
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                console.log("图片上传返回信息----", xhr.responseText)

                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        console.log("uploadImages----", xhr.responseText)

                        resolve(JSON.parse(xhr.responseText))
                    } else {
                        that.$store.commit('ERROR', "头像上传失败，请稍后再试," + xhr.response)
                        reject(JSON.parse(xhr.responseText))
                    }
                }
            }
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/octet-stream;charset=utf-8");
            xhr.setRequestHeader("Authorization", "UpToken " + uploadToken);
            xhr.send(pic);



        })

    },
    async deleteImages({ commit, state }, { keys }) {
        var p = api.delete("/user/images", { bucket: "luobo-article", key: keys })
        return p
    }

}