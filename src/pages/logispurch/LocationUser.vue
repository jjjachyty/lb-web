<template>
    <v-app>
        <v-card v-for="item in items">
            <v-card-title><v-avatar size="30">
                        <img :src="avatarRoot+item.createBy">
                      </v-avatar><v-spacer></v-spacer>
            <small>{{item.startDate|formatDate('YYYY-MM-DD')}} 至 {{item.endDate|formatDate('YYYY-MM-DD')}}</small><small></small>
            </v-avatar><v-spacer></v-spacer>
            <v-btn small outline color="pink">求代购</v-btn>
            </v-card-title>
        
        </v-card>
    </v-app>
</template>
<script>
import {Mixin} from '@/mixins'
export default {
    mixins:[Mixin],
    props:['destination','products'],
    data(){
        return{
            items:[]
        }
    },mounted(){
    this.$http.get('/destination',{destination:this.destination}).then(res=>{
            if(res.data.Status){
                            this.items = res.data.Data

            }
        })
    }
}
</script>
