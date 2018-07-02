import moment from 'moment'
import utf8 from 'utf8'
import { avatarRoot } from '@/config'

// 定义一个混入对象
export const Mixin = {
    data(){
        return {
            avatarRoot:avatarRoot,
            options:{
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
              }
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
        }
    }
}