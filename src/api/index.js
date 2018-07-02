import Qs from 'qs'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import * as types from '@/store/mutation-types.js'
import { apiRoot } from '@/config'
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = apiRoot;

// http request 拦截器
axios.interceptors.request.use(
    config => {
        console.log("config.url", config.url, config.url.indexOf("/user"))
        if (-1 != config.url.indexOf("/user") && "" == store.state.auth.token) { //用户操作 需要登陆
            return Promise.reject({ response: { status: 0 } });
        }
        if ("" != store.state.auth.token) {
            config.headers.Authorization = `Bearer ${store.state.auth.token}`;
            console.log("config.headers.Authorization", config.headers.Authorization)
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

//http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log("error.response--------", error.response)

        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.log(router)
                    if (router.currentRoute.name != "login") {


                        // 401 清除token信息并跳转到登录页面
                        store.commit(types.LOGOUT);
                        store.commit('INFO', "登陆状态已过期，请重新登陆")

                        router.replace({
                            name: 'login',
                            query: { redirect: router.currentRoute.fullPath }
                        })
                    } else {
                        store.commit('ERROR', "用户名或密码错误")
                    }
                    break
                case 400:
                    store.commit('ERROR', "表单数据错误,请检查表单数据")
                    break
                case 0:
                    store.commit("INFO", "请先登陆")
                    router.replace({
                        name: 'login',
                        query: { redirect: router.currentRoute.fullPath }
                    })
                    break
            }
        }
        // store.commit('ERROR', "系统错误,请稍后再试")
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error)
    });


export default {
    get(url, params) {
        console.log("get--params", params)
        return axios.get(url, {
            params: params
        })
    },
    post(url, params) {
        return axios.post(url, Qs.stringify(params, { arrayFormat: 'brackets' }))
    },
    postJson(url, params) {
        return axios.post(url, JSON.stringify(params))
    },
    putJson(url, params) {
        return axios.put(url, JSON.stringify(params))
    },
    put(url, params) {
        return axios.put(url, Qs.stringify(params, { arrayFormat: 'brackets' }))
    },
    delete(url, params) {
        console.log("delete-----", url, params)
        return axios.delete(url, {
            params: params
        })
    }
}