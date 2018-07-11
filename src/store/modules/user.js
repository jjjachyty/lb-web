import * as types from '../mutation-types'
import api from '@/api'
import { avatarRoot } from '@/config'
const state = {
    user: { id: "", anNickName: "", nickName: "", avatar: "", msgs: [] }
}
const getters = {
        checkOutUser: state => state.user
    }
    // actions
const actions = {
    async idCardOCR({ dispatch, rootState, commit }, cardImag) {
        return api.post("/user/scanidcard", cardImag)
    },
    async identification({ dispatch, rootState, commit }, idCard) {
        return api.post("/user/valididcard", idCard)
    },
    async getUserInfo({ dispatch, rootState, commit }, params) {
        return api.get("/user/info", params)
    },
    async getMessage({ dispatch, sate, commit }, params) {
        api.get("/user/msg", {}).then(res => {
            if (res.data.Status) {
                commit("USER_MESSAGE", res.data.Data)
                    // state.user.msgs = res.data.Data
                    // console.log("getMessage", res.data.Data, state.user.msgs)

            }
        }).catch(res => {
            commit("ERROR", res.data.Error.Err)
        })
    },
    loginOut({ rootState, commit }, loginUser) {
        api.post(loginUser, (auth) => {
            console.log("退出登录----", auth, rootState)
                // commit(types.LOGOUT_SUCCESS, { rootState, auth })
            router.push({ path: "/" })
        }, () => {

            // commit(types.LOGOUT_FAILED)
        })
    },
    updateUser({}, user) {
        return api.put("/user/info", user)
    },
    newRecharge({}, recharge) {
        return api.post("/user/recharge", recharge)
    },
    phoneLogin({}, params) {
        return api.post("/phonelogin", params)

    }
}

// mutations
const mutations = {
    //登录成功
    [types.GET_USER_PROFILE_SUCCESS](state, data) {
        console.log("GET_USER_PROFILE_SUCCESS state", data)
        state.user.nickName = data.nickName,
            state.user.anNickName = data.anNickName
        state.user.id = data.id
        state.user.idCardValid = data.idCardValid
        state.user.avatar = data.avatar + '?' + Number(new Date())
    },
    //登录成功
    [types.REFRESH_USER](state, user) {
        console.log("avatarBaseUrl", user)
        state.user.avatar = avatarRoot + "/" + state.user.id
        state.user.nickName = user.nickName
        state.user.anNickName = user.anNickName

    },
    [types.ID_CARD_VALID](state) {
        state.user.idCardValid = true
    },
    [types.USER_MESSAGE](state, data) {
        state.user.msgs = data
    },
}


export default {
    actions,
    mutations,
    getters,
    state
}