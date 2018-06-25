/**
 * Created by Janly on 2017/2/8.
 */
import createPersistedState from "vuex-persistedstate";
import Vue from 'vue';
import Vuex from 'vuex';
/**cust modules */
import User from './modules/user'

import actions from './actions'
import * as getters from './getters'
import { state, mutations } from './mutations'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,

    modules: {
        /**cust modules */
        User

    },
    // strict: debug,
    plugins: [createPersistedState({
        reducer(state, paths) {
            // No need to use let as the reducer itself can be immutable which do not mean that the properties 
            // are not mutable (https://ponyfoo.com/articles/var-let-const)
            const reducer = Object.assign({}, state);
            // state which you don't want to persist.
            console.log("reducer-----\n\n", reducer)
            delete reducer.snackbar;
            delete reducer.apiRoot;
            delete reducer.articleRoot;
            return reducer;
        },
        filter(value) {
            console.log("value.payload", value)

            if ({ "REGISTER_SUCCESS": true, "LOGIN_SUCCESS": true, "LOGOUT": true, "GET_USER_PROFILE_SUCCESS": true, "REFRESH_USER": true }[value.type]) {
                console.log(true)

                return true
            } else {
                console.log(false)

                return false
            }
        }
    })]
})