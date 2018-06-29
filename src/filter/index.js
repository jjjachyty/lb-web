import Vue from 'vue'
import moment from 'moment'
moment.locale();
const rechargeType = { 0: "银行转账", 1: "微信", 2: "支付宝" }
Vue.filter('dict', function(value, key) {
    console.log("dict", key, value)
    switch (key) {
        case 'rechargeType':
            console.log("rechargeType", value, key)
            return rechargeType[value]
            break;

        default:
            break;
    }
})
Vue.filter('formatDate', function(value, key) {
    return moment(value).format(key);
})

Vue.filter('formatContent', function(value, key) {
    return value.substr(0, 100);
})