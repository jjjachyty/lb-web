<template>
    <div v-if="purchase">
                  <v-expansion-panel>
          <v-expansion-panel-content v-for="(qo,sq) in purchase.quotationOrders" :key="qo.id">
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
                     <v-flex md2 xs6>
                  <span v-bind:class="{'red--text':qo.state == '1','caption':true}"><v-icon :color="qo.state=='1'?'red':'grey'" small>timer</v-icon>{{qo.expiryTime |formatDate('HH:mm YYYY/MM/DD')}}前有效</span>
                  </v-flex>
                  <v-flex md2 xs6 class="text-xs-center text-md-center"><span v-bind:class="{'red--text':qo.state == '1','caption':true}">{{qo.expiryTime |formatDate('YYYY/MM/DD')}}发货</span></v-flex>

                <v-flex md1 xs6 class="text-xs-right text-md-left"><span class="title amount"><span v-bind:class="{'red--text':qo.state == '1','body-2':true}">¥{{qo.amount}}</span></span></v-flex>

                <v-flex v-if="qo.refuseReason" offset-xs1 xs12 class="red--text caption"><span>拒绝理由:{{qo.refuseReason}}</span></v-flex>
              </v-layout>
                
            </div>
          <v-card> 
            <v-card-text class="quotation-content">
                <v-card v-if="qo" v-for="(product,index) in qo.products" :key="product.id" class="quotation-item">
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
               <v-card-actions>
                 <div class="container text-xs-center"  v-if="qo.state == '1' && purchase.createBy == $store.state.User.user.id">
                 <v-btn  color="primary" @click="showRefuse(qo)">拒绝</v-btn>
                 
              <v-btn  color="secondary" @click="purchase(qo)">代购</v-btn>
              </div>
              <div v-if="(qo.buyByID == $store.state.User.user.id ) && qo.state == '0'" class="container text-xs-center" color="primary" @click="editQuotation(qo)">
                  <v-btn color="primary">修改</v-btn>
              </div>
              
               </v-card-actions>
          </v-card>
           </v-expansion-panel-content>
  </v-expansion-panel>

            <v-dialog v-model="refuseFlag" max-width="290">
      <v-card>
         <v-card-title><v-switch v-model="repeat" :label="`${repeat?'允许再次报价':'屏蔽该用户'}`"></v-switch></v-card-title>
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

   <QuotationDialog :quotationOrder="opQuotationOrder" :dialog="dialog" :type="'edit'" :purchase="purchase" @closeDialog="closeDialog"></QuotationDialog>

    </div>
</template>
<script>
import {Mixin} from '@/mixins'
import QuotationDialog from './QuotationDialog'

export default {
    props:['purchase'],
    components:{
        QuotationDialog
    },
    mixins:[Mixin],
    data(){
        return{
            repeat:true,
                refuseFlag:false,
                dialog:false,
                 opQuotationOrder:{},
        }
    },
    methods:{
        closeDialog(){
          this.dialog = false
        },
        editQuotation(quotation){
            this.opQuotationOrder = JSON.parse(JSON.stringify(quotation) )
             this.opQuotationOrder.expiryTime = null
             this.opQuotationOrder.deliveryTime = null
            this.dialog = true
        },showRefuse(quotation){ //显示拒绝订单对话框
        this.refuseFlag = true
          this.opQuotationOrder = quotation
          console.log("purchase quotation",quotation)
        },
        refuse(){ //拒绝该订单
              this.$http.post("/purch/refuse",{purchaseID:this.purchase.id,quotationID:this.opQuotationOrder.id,reason:this.reason}).then(res=>{
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
    }
}
</script>
