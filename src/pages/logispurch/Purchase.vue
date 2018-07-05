<template>
  <v-app>


      <v-layout row wrap>

        <v-flex md7 offset-md1 xs12>
          <v-card>
            <v-card-title>
              <v-layout row wrap>

                <v-flex xs8 md10>
                  <v-layout row>
                    <v-flex xs4 md2>
                      <v-avatar size="50">
                        <img :src="avatarRoot+item.createBy">
                      </v-avatar>


                    </v-flex>
                    <v-flex>
                      <span>{{item.creator}}</span>
                      <br>
                      <small class="grey--text">发布于{{item.updateAt|formatDate('YYYY-MM-DD')}}</small>
                      <br>
                      <v-icon small>pin_drop</v-icon>
                      <span class="caption">{{item.address}}</span>

                      <br>
                    </v-flex>

                  </v-layout>

                </v-flex>

                <v-flex xs3 md2>
                  <span>
                    <v-chip small color="red" outline label class="white--text body-2">
                      <small class="caption">¥</small>{{item.amount}}</v-chip>
                      <small class="red--text">{{item.state | dict('purchaseState')}}</small>
                  </span>

                </v-flex>
              </v-layout>
              <!-- <v-avatar><img :src="avatarRoot+item.createBy"></v-avatar> -->
            </v-card-title>
            <!-- <v-card-media height="250">
              <carousel class="img-detail" :mouseDrag="true">
                <slide v-for="(img,index) in item.detailImgURLs" :key="index">

                  <img :src="img">

                </slide>
              </carousel>
            </v-card-media> -->

            <v-card-text class="grey--text">
              {{item.content}}
            </v-card-text>

            <v-card-text>
              <v-subheader>商品清单：</v-subheader>
              <v-card>
                <div v-for="(pd,index) in item.products" :key="pd.id">
                  <v-card-title>
                    <span class="title red--text">{{index+1}}.</span>
                    <v-spacer></v-spacer>
                    <small class="red--text">¥{{pd.quantity * pd.price}}</small>
                  </v-card-title>
                  <v-layout>

                    <v-flex md2 xs3 >
                           <div v-viewer="options" class="images clearfix">
                            <img :src="pd.images" :data-source="pd.images" class="image" height="100px">
                        </div>
                        <!-- <img :src="pd.images" height="100px" v-viewer> -->
                    
                    </v-flex>
                    <v-flex md10 xs10>
                      <v-layout row wrap class="caption">
                        <v-flex xs6 md4>名称:
                          <small class="grey--text">{{pd.name}}</small>
                        </v-flex>
                        <v-flex xs6 md4>参考单价:
                          <small class="red--text">¥{{pd.price}}</small>
                        </v-flex>
                        <v-flex xs6 md4>数量:
                          <small class="grey--text">{{pd.quantity}}</small>
                        </v-flex>
                        <!-- <v-flex xs6 md4>购买渠道:{{pd.shopName}}</v-flex> -->
                        <v-flex xs12>描述:
                          <small class="grey--text">{{pd.describe}}</small>
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
                  <span class="caption">{{item.location}}</span>
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
          <v-subheader>报价单</v-subheader>
            <QuotationList :purchase="item"></QuotationList>
        </v-flex>
        <v-flex md4>
          <v-card>
            <v-card-title>
              <span>其他 澳门 代购</span>
            </v-card-title>
            <v-card-text>

            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
   
   <QuotationDialog :quotationOrder="quotationOrder" :dialog="dialog" :type="'add'" :purchase="item" @closeDialog="closeDialog"></QuotationDialog>
    



  </v-app>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import { Carousel, Slide } from 'vue-carousel';
import QuotationList from './QuotationList'
import QuotationDialog from './QuotationDialog'
import {Mixin} from '@/mixins'
  export default {
      components:{
          Carousel,
           Slide,
           QuotationList,
           QuotationDialog
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
            this.$http.get("/purch/get",{id:this.$route.params.id}).then(res=>{
                if(res.data.Status){
                    this.item = res.data.Data
                    this.quotationOrder.products =JSON.parse( JSON.stringify(this.item.products))
                }
            }).catch(res=>{

            })
        },
        closeDialog(){
          this.dialog = false
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
           if (pd.buyByID == this.$store.state.User.user.id){
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
            }
    },
    watch:{

    }
}
</script>
<style>
.img-detail{
    width: 100%;
    height: auto;
}
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
</style>
