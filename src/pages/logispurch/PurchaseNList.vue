<template>
    <v-app>
        <br>
        <!-- <v-content> -->
        <v-card v-for="p in purchases" :key="p.id" :to="/purchase/+p.id">
        <br>
           <v-layout row>
               <v-flex md2 xs3>
                   <v-card-media height="100">
                       <img :src="p.products[0].images">
                   </v-card-media>
               </v-flex>
               <v-flex xs9 md11>
                   <v-layout row wrap>
                       <v-flex xs12 md8>
                           单号:<span class="body-2">{{p.id}}</span>
                       </v-flex>


                       <v-flex xs6 md2>
                          <p class="title red--text">¥{{p.amount}}</p>
                       </v-flex>
                        <v-flex class="caption red--text font-weight-bold" xs6 md1>
                           {{p.state | dict('purchaseState')}}
                       </v-flex>
                        <v-flex xs6>
                          <p class="caption grey--text">查看 {{p.views}}</p>
                        </v-flex>
                        <v-flex xs6>
                          <p class="caption  grey--text">报价 5</p>
                        </v-flex>
                         <v-flex >
                          <p class="caption  grey--text">发布于{{p.createAt | formatDate('YYYY-MM-DD HH:mm')}}</p>
                       </v-flex>
                   </v-layout>
               </v-flex>
           </v-layout>
           <v-divider></v-divider>
           <v-card-actions >
               <v-spacer></v-spacer>
               <v-btn color="primary" small outline>编辑</v-btn>
               <v-btn color="warning" small outline>删除</v-btn>
           </v-card-actions>
        </v-card>
        <p>加载更多</p>
        <!-- </v-content> -->

             <v-fab-transition>
      <v-btn
        v-model="fab"
        dark
        fab
        fixed
        color="red"
        bottom
        small
        right
        @click="addPurchase"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

    </v-app>
</template>
<script>
export default {
    data(){return{
        purchases:[]
    }},
    methods:{
        addPurchase(){
            this.$router.push("/user/purchase")
        }
    },
    created(){
        this.$http.get('/user/purchases',{}).then(res=>{
            if(res.data.Status){
                            this.purchases = res.data.Data

            }
        })
    }
}
</script>
