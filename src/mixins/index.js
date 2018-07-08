import moment from 'moment'
import utf8 from 'utf8'
import { avatarRoot, purchaseRoot } from '@/config'
const locationID = {
        '全球': 'all',
        '香港': 'hk',
        '澳门': 'mo',
        '台湾': 'tw',
        "新加坡": 'sg',
        "日本": "jp",
        "韩国": "kr",
        "泰国": "th",
        "德国": "de",
        "英国": "gb",
        "法国": "fr",
        "美国": "us",
        "澳大利亚": "au"
    }
    // 定义一个混入对象
export const Mixin = {
    data() {
        return {
            avatarRoot: avatarRoot,
            purchaseRoot: purchaseRoot,
            options: {
                inline: false,
                button: true,
                navbar: false,
                title: false,
                toolbar: true,
                tooltip: true,
                movable: true,
                zoomable: true,
                rotatable: true,
                scalable: true,
                transition: true,
                fullscreen: true,
                keyboard: true,
                url: 'data-source'
            },
            destinations: [
                { header: '默认' },
                { id: 'all', name: '全球', tags: [] },
                { header: '中国' },
                { id: 'hk', name: '香港', tags: ['IPhone'] },
                { "id": "mo", "name": "澳门", "tags": ["IPhone"] },
                { "id": "tw", "name": "台湾", "tags": [] },
                { "id": "0000", "header": "亚洲" },
                { "id": "sg", "name": "新加坡", "tags": [] },
                { "id": "jp", "name": "日本", "tags": [] },
                { "id": "kr", "name": "韩国", "tags": [] },
                { "id": "th", "name": "泰国", "tags": ["RAY面膜"] },
                { "id": "0000", "header": "欧洲" },
                { "id": "de", "name": "德国", "tags": [] },
                { "id": "gb", "name": "英国", "tags": ["YSL"] },
                { "id": "fr", "name": "法国", "tags": [] },
                { "id": "0000", "header": "北美洲" },
                { "id": "us", "name": "美国", "tags": [] },
                { "id": "0000", "header": "大洋洲" },
                { "id": "au", "name": "澳大利亚", "tags": [] }

            ],
            currentDate: this.getCurrentStr()
        }
    },
    created: function() {

    },
    methods: {
        uuid: function(len, radix) {
            var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var uuid = [],
                i;
            radix = radix || chars.length;

            if (len) {
                // Compact form
                for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
            } else {
                // rfc4122, version 4 form
                var r;

                // rfc4122 requires these characters
                uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                uuid[14] = '4';

                // Fill in random data.  At i==19 set the high bits of clock sequence as
                // per rfc4122, sec. 4.1.5
                for (i = 0; i < 36; i++) {
                    if (!uuid[i]) {
                        r = 0 | Math.random() * 16;
                        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                    }
                }
            }

            return uuid.join('');
        },
        string2Date(src) {
            return moment(src, "YYYY-MM-DD").toDate()
        },
        formatDate(src, layout) {
            return moment(src).format(layout)
        },
        getCurrentStr() {
            return moment().format("YYYY-MM-DD")
        },
        encodeUtf8(text) {
            return utf8.decode(text)
        },
        locationID(name) {
            return locationID[name]
        }
    }
}