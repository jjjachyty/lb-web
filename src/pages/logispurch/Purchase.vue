<template>
  <v-app>


      <v-layout row wrap>

        <v-flex md7 offset-md1 xs12>
          <v-card>
            <v-card-title>
              <v-layout row wrap>

                <v-flex xs8 md10>
                  <v-layout row>
                    <v-flex xs4 md1>
                      <v-avatar size="50">
                        <img :src="avatarRoot+item.createBy">
                      </v-avatar>


                    </v-flex>
                    <v-flex>
                      <span>{{item.creator}}</span>
                      <br>
                      <small class="grey--text">发布于{{item.createAt|formatDate('YYYY-MM-DD')}}</small>
                      <br>
                      <v-icon small>pin_drop</v-icon>
                      <span class="caption" v-if="item.address">{{item.address.province}} {{item.address.city}}</span>

                      <br>
                    </v-flex>

                  </v-layout>

                </v-flex>

                <v-flex xs3 md2>
                  <span>
                    <v-chip small color="red"  label class="white--text body-2">
                      <div v-if="amount>0"><small class="caption">¥</small>{{item.amount}}
                      </div>
                      <div v-else><small class="caption">求报价</small>
                      </div>
                      </v-chip>
                      <small class="red--text">{{item.state | dict('purchaseState')}}</small>
                  </span>

                </v-flex>
              </v-layout>
              <!-- <v-avatar><img :src="avatarRoot+item.createBy"></v-avatar> -->
            </v-card-title>
            <v-divider></v-divider>
            <!-- <v-card-media height="250">
              <carousel class="img-detail" :mouseDrag="true">
                <slide v-for="(img,index) in item.detailImgURLs" :key="index">

                  <img :src="img">

                </slide>
              </carousel>
            </v-card-media> -->

            <v-card-text class="grey--text content">
              <v-subheader>备注说明:</v-subheader>
              <v-container>{{item.content}}</v-container>
            </v-card-text>

            <v-card-text>
              <v-toolbar height="30" class="body-2 font-weight-medium">商品清单：</v-toolbar>
              <v-card >
                <div v-for="(pd,index) in item.products" :key="pd.id">
                  <v-card-title>
                    <span class="title red--text">{{index+1}}.</span>
                    <v-spacer></v-spacer>
                    <small class="red--text">¥{{pd.quantity * pd.price}}</small>
                  </v-card-title>
                  <v-layout row justify-center>

                    <v-flex md2 xs3 >
                           <div v-viewer="options" class="images clearfix">
                            <img :src="purchaseRoot+pd.images+'?'+Number(new Date())" :data-source="purchaseRoot+pd.images+'?'+Number(new Date())" class="image" >
                        </div>
                        <!-- <img :src="pd.images" height="100px" v-viewer> -->
                    
                    </v-flex>
                    <v-flex md10 xs10>
                      <v-layout row wrap class="caption">
                        <v-flex xs6 md4>名称:
                          <small class="font-weight-medium">{{pd.name}}</small>
                        </v-flex>
                        <v-flex xs6 md4>参考单价:
                          <small class="red--text">¥{{pd.price}}</small>
                        </v-flex>
                        <v-flex xs6 md4>数量:
                          <small class="font-weight-medium">{{pd.quantity}}</small>
                        </v-flex>
                        <!-- <v-flex xs6 md4>购买渠道:{{pd.shopName}}</v-flex> -->
                        <v-flex xs12>描述:
                          <small class="grey--text font-weight-medium">{{pd.describe}}</small>
                        </v-flex>
                      </v-layout>


                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                </div>
              </v-card>
          </v-card-text>

            <v-card-actions>
              <span>
                <v-chip small :color="item.type == 0?'red':'teal'" label class="white--text">
                  <v-icon small>pin_drop</v-icon>
                  <span class="caption">{{item.targetLocation}}</span>
                </v-chip>
              </span>
              <v-spacer></v-spacer>
              <v-btn small outline color="red" @click="dialog=true" v-if="purchaseFlag">代购报价</v-btn>

              <br>
            </v-card-actions>

          </v-card>
          <v-card>

          </v-card>
          <br>
          <!-- 报价单-->

          <v-card-title height="40" class="body-2 font-weight-medium">代购报价</v-card-title>
            <QuotationList :purchase="item"></QuotationList>

        </v-flex>
        <v-flex md4>
          <v-card>
            <v-card-title>
              他们在{{item.targetLocation}}
            </v-card-title>
            <v-card-text>
              <LocationUser v-if="item.targetLocation" :destination="item.targetLocation"></LocationUser>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
   
   <QuotationDialog @updateOrders="updateOrders" :quotationOrder="quotationOrder" :dialog="dialog" :type="false" :purchase="item" @closeDialog="closeDialog"></QuotationDialog>
    



  </v-app>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import { Carousel, Slide } from 'vue-carousel';
import QuotationList from './QuotationList'
import QuotationDialog from './QuotationDialog'
import LocationUser from './LocationUser'
import {Mixin} from '@/mixins'
  export default {
      components:{
          Carousel,
           Slide,
           QuotationList,
           QuotationDialog,
           LocationUser
      },
      mixins:[Mixin],
      data(){
          return {dialog:false,
          refuseFlag:false,
          timeDialog:false,
          opQuotationOrder:{},
              // avatarRoot:avatarRoot,
              item:{id:""},
              quotationOrders:[],
              quotationOrder:{
                products:[],
                charge:0,
              }
          }
      },
    methods:{
        getDetail(id){
            this.$http.get("/purchase",{id:this.$route.params.id}).then(res=>{
                if(res.data.Status){
                    this.item = res.data.Data
                    this.quotationOrder.products =JSON.parse( JSON.stringify(this.item.products))
                }
            }).catch(res=>{

            })
        },
        closeDialog(data){
          this.dialog = false
        },
        updateOrders(data,index){
          if (index){
          this.item.quotationOrders[index]= data
          }else{
          this.item.quotationOrders.push(data)

          }
        },
        purchase(quotation){
            console.log("purchase quotation",quotation)
        }
    },
    computed:{
      purchaseFlag:function(){
        var flag = true
         if(this.item.createBy == this.$store.state.User.user.id){
            flag = false
         }
         this.item.quotationOrders && this.item.quotationOrders.forEach(pd => {
           if (pd.createBy == this.$store.state.User.user.id){
             flag = false
           }
         });
         return flag
      }
      
    },
    created(){
            if (!this.$route.params.item){
                this.getDetail(this.$route.params.id)
            }else{
                this.item = this.$route.params.item
                this.quotationOrder.products =JSON.parse( JSON.stringify(this.item.products))
            }
    },
    watch:{

    }
}
</script>
<style scoped>
/* .img-detail{
    width: 100%;
    height: auto;
} */
.card__media img{
    height: 100px;
    width: 100px;
}
.quotation-content{
padding: 0 1% 0 6%;
}
.quotation-item{
  margin-bottom: 10px;
  /* box-shadow: 0px 0px 0px 0.1px grey !important */
}

.amount{
  float: right;
}
.image{
      max-width: 90%;
    max-height: 90%;
}
.content{
  word-wrap: break-word;
}
</style>
