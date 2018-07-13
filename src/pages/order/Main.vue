<template>
    <v-app>
        <v-container>

               <v-navigation-drawer app  clipped width="170">
                   <v-divider></v-divider>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" @click="active=item.id">
          <v-list-tile-action>
            <v-icon small :color="item.color">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
     <v-layout>
        <v-flex xs12 md6 offset-md2>
            <v-card>
            <v-tabs grow v-model="identity" @click="identity=3">
      <v-tabs-slider color="deep-orange" v-model="orderState"></v-tabs-slider>
            <v-tab @click="identity = 0" ><v-icon small>add_shopping_cart</v-icon>我买的</v-tab>
            <v-tab @click="identity = 1" ><v-icon small>shopping_cart</v-icon>我卖的</v-tab>
        </v-tabs>
        </v-card>
        <v-divider></v-divider>
                       <v-tabs grow>
      <v-tabs-slider color="deep-orange" v-model="orderState"></v-tabs-slider>
            <v-tab @click="orderState = 0">待付款</v-tab>
            <v-tab @click="orderState = 1">待购买</v-tab>
            <v-tab @click="orderState = 2">待发货</v-tab>
            <v-tab @click="orderState = 3">待评价</v-tab>
            <v-tab @click="orderState = 4">售后/维权</v-tab>
            <v-tab-item>
                <br>
                <v-card v-for="(order,index) in orders" :key="order.id">
                    <v-layout row wrap>
                        <v-flex xs12>
                           <div style="width:100%"><v-avatar size="30"><img :src="avatarRoot+order.sellBy"></v-avatar> <v-spacer></v-spacer> <small class="caption red--text font-weight-black">{{order.state | dict('orderState')}}</small></div> 
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs2>
                            <v-card-media height="100">
                                <img v-for="pd in order.products" :src="purchaseRoot+pd.images" :key="pd.id">
                            </v-card-media>
                        </v-flex>
                        <v-flex>
                            <v-layout>
                                <v-flex><v-card-title>{{order.id}}</v-card-title></v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                        
                </v-card>
            </v-tab-item>
        </v-tabs>

        </v-flex>
    </v-layout>


        </v-container>
    </v-app>
</template>
<script>
import {Mixin} from '@/mixins'
import Purchase from './Purchase'
export default {
    components:{
        Purchase
    },
    mixins:[Mixin],
    data(){
        return{
            tab:null,
            identity:0,
            orderState:0,
            orders:[],
            active:1,
        items: [{
          title: '代购',
          id: 1,
          icon: 'assignment_ind',
          color: 'primary'
        },
        {
          title: '转卖',
          id: 2,
          icon: 'how_to_reg',
          color: 'primary'
        },
        {
          title: '旅拍',
          id: 3,
          icon: 'fa-key',
          color: 'primary'
        }
      ]
        }
    },
    created(){
        console.log(this.active)
        switch(this.active){
            case 1:// 代购
            
            this.$http.get("/user/orders",{type:this.active,identity:this.identity,state:this.orderState}).then(res=>{
                if(res.data.Status){
                    this.orders = res.data.Data
                }
            })

            break;
        }
    }
}
</script>
