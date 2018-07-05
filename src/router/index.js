import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Indexs from '@/pages/Index'
import Main from '@/pages/Main'

import Login from '@/pages/Login'
import Register from '@/pages/Register'
import ForgotPasswd from '@/pages/ForgotPasswd'

import Article from '@/pages/article/Article'
import Profile from '@/pages/user/Profile'
import EmailValid from '@/pages/user/EmailValid'
import ModifyPasswd from '@/pages/user/ModifyPasswd'
import Activity1 from '@/pages/ads/Activity1'


import ExposureArticle from '@/pages/article/ExposureArticle'
import UserArticle from '@/pages/article/UserArticle'
import UserMessage from '@/pages/user/Message'



import Text1 from '@/pages/Text1'
import Text2 from '@/pages/Text2'


import LogisPurch from '@/pages/logispurch/Main'
import Purchase from '@/pages/logispurch/Purchase'
import UserPurchases from '@/pages/logispurch/UserPurchases'
import UserPurchase from '@/pages/logispurch/UserPurchase'


Vue.use(Router)

export default new Router({
    // mode: 'history',
    routes: [{
        path: '/',
        component: Indexs,
        children: [{
            path: '',
            name: 'Main',
            component: Main,
        }, {
            path: '/article/:id',
            name: 'article',
            component: Article
        }, {
            path: '/user/article/:id',
            name: 'userarticle',
            component: Article
        }, {
            path: '/profile',
            name: 'profile',
            beforeEnter: (to, from, next) => {
                console.log(store.state.token)
                if (!store.state.auth.token) {
                    next({ path: '/login' })
                } else {
                    next()
                }


            },
            component: Profile
        }, {
            path: '/exparticle',
            name: 'exparticle',
            component: ExposureArticle,
            beforeEnter: (to, from, next) => {
                console.log(store.state.token)
                if (!store.state.auth.token) {
                    next({ path: '/login' })
                } else {
                    next()
                }


            },
        }, {
            path: '/burst',
            name: 'burst',
            component: UserArticle
        }, {
            path: '/purchase/:id',
            name: 'purchase',
            component: Purchase

        }, {
            path: '/Text2',
            name: 'Text2',
            component: Text2

        }, {
            path: '/msg',
            name: 'msg',
            component: UserMessage

        }, {
            path: '/logispurch',
            name: 'logispurch',
            component: LogisPurch

        },{
            path: '/user/purchases',
            name: 'userpurchases',
            component: UserPurchases
        },,{
            path: '/user/purchase',
            name: 'userpurchase',
            component: UserPurchase
        },
        
    ]

    }, {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: (to, from, next) => {
            if (store.state.auth.token) {
                next({ path: '/' })
            } else {
                next()
            }


        },
    }, {
        path: '/register',
        name: 'register',
        component: Register
    }, {
        path: '/emailvalid/:id/:code',
        name: 'emailvalid',
        component: EmailValid
    }, {
        path: '/forgot',
        name: 'forgot',
        component: ForgotPasswd
    }, {
        path: '/modifypasswd',
        name: 'modifypasswd',
        component: ModifyPasswd
    }, {
        path: '/activity/1',
        name: 'activity1',
        component: Activity1
    }, {
        path: "*",
        redirect: "/"
    }]
})