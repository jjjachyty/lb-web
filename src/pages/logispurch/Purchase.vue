<template>
  <v-app>

    <v-container grid-list-xs>
      <v-layout row wrap>

        <v-flex md6 offset-md1 xs12>
          <v-card>
            <v-card-title>
              <v-layout row wrap>

                <v-flex xs8 md10>
                  <v-layout row>
                    <v-flex xs2 md2>
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

                    <v-flex md2 xs2>
                      <a :href="pd.images">
                        <img :src="pd.images" height="100px"></img>
                      </a>
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
              <v-btn small outline color="red" @click="dialog=true">代购</v-btn>

              <br>
            </v-card-actions>

          </v-card>
          <v-card>

          </v-card>
        </v-flex>
        <v-flex md5>
          <v-card>
            <v-card-title>
              <span>其他 澳门 代购</span>
            </v-card-title>
            <v-card-text>

            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">报价单</span>
          <v-spacer></v-spacer>
          <span>
            <span class="red--text header">报¥{{orderAmount}}</span>
            <br>
            <span class="teal--text caption">预¥{{item.amount}}</span>
          </span>
          <span class="red--text caption">赚¥{{orderAmount-item.amount}}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-card v-if="quotationOrder" v-for="(product,index) in item.products" :key="product.id">
            <v-layout row wrap align-center>
              <v-flex xs1 md1>
                <span class="title red--text">{{index+1}}.</span>
              </v-flex>
              <v-flex md1>
                名称:
              </v-flex>
              <v-flex xs5 md4>
                <span class="grey--text caption">{{product.name}}</span>
              </v-flex>
              <v-flex xs2 md1>
                数量:
              </v-flex>
              <v-flex xs2 md5>
                <span class="grey--text caption">{{product.quantity}}</span>
              </v-flex>
              <v-flex xs2 md1 offset-xs1>渠道:</v-flex>
              <v-flex xs8 md4>
                <v-text-field type="number" placeholder="购买店名称" v-model="quotationOrder.shopName" clearable></v-text-field>
              </v-flex>
              <v-flex xs2 md1 offset-xs1>报价:</v-flex>
              <v-flex xs8 md4>
                <v-text-field prefix="¥" single-line type="number" :placeholder="product.price+''" v-model="quotationOrder.products[index].price"
                  clearable></v-text-field>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-card>

          <v-layout>
            <v-flex xs12 md5>
              <v-card>
                <v-layout row wrap align-center>
                  <v-flex>
                    <v-text-field min="0" prepend-icon="money" v-model="quotationOrder.charge" type="number" label="代购费(包邮):" clearable placeholder="包邮代购费"></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-dialog ref="dialog" v-model="timeDialog" :return-value.sync="quotationOrder.expiryTime" persistent lazy
                      full-width width="290px">

                      <v-text-field slot="activator" v-model="quotationOrder.expiryTime" label="失效时间:" prepend-icon="access_time" readonly></v-text-field>
                      <v-time-picker v-model="quotationOrder.expiryTime" actions>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="timeDialog = false">取消</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(quotationOrder.expiryTime)">确定</v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>

          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">取消</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" flat @click.native="dialog = false">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
import { avatarRoot } from '@/config'
  export default {
      components:{
          Carousel,
           Slide
      },
      data(){
          return {dialog:true,
          timeDialog:false,
              avatarRoot:avatarRoot,
              item:{},
              //  orderAmount:0,
              quotationOrder:{
                products:[],
                charge:null
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
        }
    },
    computed:{
      orderAmount: function () {
        var amount  = 0.0
        for (const key in this.quotationOrder.products) {
          if (this.quotationOrder.products.hasOwnProperty(key)) {
           amount += Number(this.quotationOrder.products[key].price) 
            
          }
        }
        
      return  Number(this.quotationOrder.charge)+Number(amount)
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

</style>
