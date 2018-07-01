<template>
  <v-app>


      <v-layout row wrap>

        <v-flex md7 offset-md1 xs12>
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
                      <small>{{item.state | dict('purchaseState')}}</small>
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

                    <v-flex md2 xs2 >
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
              <v-btn small outline color="red" @click="dialog=true">代购报价</v-btn>

              <br>
            </v-card-actions>

          </v-card>
          <v-card>

          </v-card>
          <br>
          <!-- 报价单-->
          <v-subheader>报价单</v-subheader>
          <v-expansion-panel>
          <v-expansion-panel-content v-for="(qo,sq) in item.quotationOrders" :key="qo.id">
            <div slot="header" v-bind:class="{'grey--text':qo.state == '0'}">
              <v-layout row wrap>

                                <v-flex md1 xs2>
                <v-avatar size="40"><img :src="avatarRoot+qo.buyByID"></v-avatar>
                
                  </v-flex>

           


                <v-flex md6 xs4>
                  <v-layout row wrap>
                    <v-flex md12 xs12 >{{qo.buyByName}}</v-flex>
                     <v-flex md4 xs12>
                       <v-icon small>pin_drop</v-icon><small class="caption grey--text">重庆</small>
                       <!-- /<small class="caption grey--text">3单</small> -->
                     </v-flex>
                  </v-layout>

                </v-flex>
                     <v-flex md3 xs6>
                  <span v-bind:class="{'red--text':qo.state == '1','caption':true}"><v-icon :color="qo.state=='1'?'red':'grey'" small>timer</v-icon>{{qo.expiryTime |formatDate('HH:mm YYYY/MM/DD')}}前有效</span>
                  </v-flex>
                <v-flex md1 xs12 class="text-xs-right text-md-left"><span class="title amount"><span v-bind:class="{'red--text':qo.state == '1','body-2':true}">¥{{qo.amount}}</span></span></v-flex>


              </v-layout>
               
            </div>
          <v-card> 
            <v-card-text class="quotation-content">
                <v-card v-if="quotationOrder" v-for="(product,index) in qo.products" :key="product.id" class="quotation-item">
            <v-layout row wrap align-center v-bind:class="{'grey--text':qo.state == '0'}">
              <v-flex xs1 md1>
                <span class="body-1">({{index+1}}).</span>
              </v-flex>
              <v-flex md2 xs3>
                 <div v-viewer="options" class="images clearfix">
                            <img :src="product.images" :data-source="product.images" class="image" height="100px">
                        </div>
              </v-flex>
              <v-flex xs8>
                <v-layout row wrap>
                  <v-flex md3 xs6>
                名称:<span class="caption">{{product.name}}</span>
              </v-flex>
              <v-flex xs6 md2>
                数量:<span class=" caption">{{product.quantity}}</span>
              </v-flex>
              <v-flex xs6 md2 >渠道:{{product.shopName}}</v-flex>
             
              <v-flex xs6 md2>报价:<span  v-bind:class="{'red--text':qo.state == '1'}">¥{{product.price}}</span></v-flex>
                </v-layout>
              </v-flex>
              
              
            </v-layout>
            <v-divider></v-divider>
          </v-card>
            </v-card-text>
            <v-divider></v-divider>
               <v-card-actions v-if="qo.state == '1'">
                 <div class="container text-xs-center" >
                 <v-btn  color="primary" @click="showRefuse(qo)">拒绝</v-btn>
                 
              <v-btn  color="secondary" @click="purchase(qo)">代购</v-btn>
              </div>
               </v-card-actions>
          </v-card>
           </v-expansion-panel-content>
  </v-expansion-panel>
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
              <!-- <v-flex xs2 md1 offset-xs1>渠道:</v-flex> -->
              <v-flex xs8 md4 offset-xs1>
                <v-text-field  placeholder="购买店名称" prepend-icon="shop" label="渠道" v-model="product.shopName" clearable></v-text-field>
              </v-flex>
              <!-- <v-flex xs2 md1 offset-xs1>报价:</v-flex> -->
              <v-flex xs8 md4 offset-xs1>
                <v-text-field prefix="¥" label="报价" prepend-icon="money"  :placeholder="product.price+''" v-model.number="quotationOrder.products[index].price"
                  clearable></v-text-field>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-card>
<br>
          <v-layout>
            <v-flex xs12 >
              <v-card>
                <v-layout row wrap align-center>
                  <v-flex xs12>
                    <v-text-field min="0" prepend-icon="money" v-model.number="quotationOrder.charge" type="number" label="代购费(包邮):" clearable placeholder="包邮代购费"></v-text-field>
                  </v-flex>
                  <v-flex>
                    <v-dialog ref="dialog" v-model="timeDialog" :return-value.sync="quotationOrder.expiryTime" persistent lazy
                      full-width width="290px">

                      <v-text-field slot="activator" v-model="quotationOrder.expiryTime" placeholder="报价截止时间" label="截止时间"  prepend-icon="access_time" readonly></v-text-field>
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
          <v-btn color="primary darken-1" flat @click.native="saveQuotation">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

          <v-dialog v-model="refuseFlag" max-width="290">
      <v-card>

        <v-card-text>
          <v-text-field v-model="reason" textarea label="理由" placeholder="价格高？渠道非正品？时间太长？"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="refuseFlag = false">取消</v-btn>
          <v-btn color="green darken-1" flat="flat" @click.native="refuse">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import { Carousel, Slide } from 'vue-carousel';
import { avatarRoot } from '@/config'
  export default {
      components:{
          Carousel,
           Slide
      },
      data(){
          return {dialog:true,
          refuseFlag:false,
          timeDialog:false,
          reason:"",
          opQuotationOrder:{},
              avatarRoot:avatarRoot,
              item:{id:""},
              quotationOrders:[],
              quotationOrder:{
                products:[],
                charge:0,
              },
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
        saveQuotation(){
          this.quotationOrder.purchaseID = this.item.id
          this.$http.postJson("/purch/quotation",this.quotationOrder).then(res=>{
            if (res.data.Status){
              console.log("保存报价单",res.data)
              this.item.quotationOrders.push(this.quotationOrder)
               this.dialog = false
            }else{
              this.$store.commit("ERROR",res.data.Error.Err)
            }
          }).catch(res=>{

          })

         
        },
        purchase(quotation){
            console.log("purchase quotation",quotation)
        },showRefuse(quotation){ //显示拒绝订单对话框
        this.refuseFlag = true
          this.opQuotationOrder = quotation
          console.log("purchase quotation",quotation)
        },
        refuse(){ //拒绝该订单
              this.$http.post("/purch/refuse",{purchaseID:this.item.id,quotationID:this.opQuotationOrder.id,reason:this.reason}).then(res=>{
                if (res.data.Status){
                  this.refuseFlag = false
                  this.$store.commit("SUCCESS","拒绝该报价成功,重新进入报价中")
                }else{
                   this.$store.commit("ERROR",res.data.Error.Err)
                }
              }).catch(res=>{
                this.$store.commit("ERROR",res.data)
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
.quotation-content{
padding: 0 1% 0 6%;
}
.quotation-item{
  margin-bottom: 10px;
  box-shadow: 0px 0px 0px 0.1px grey !important
}
.amount{
  float: right;
}
</style>
