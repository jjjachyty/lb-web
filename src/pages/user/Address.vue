<template>
    <v-app>
        <v-toolbar>
            <v-btn small outline color="primary" @click="add">新增</v-btn>
        </v-toolbar>
        <v-card>
            <v-radio-group v-model="row">
        <v-card-title v-for="(ads,indx) in user.address" :key="ads.id">
            
            <v-layout row wrap>
                <v-flex xs12>
                    <span class="body-2">{{ads.province}}{{ads.city}}{{ads.county}}{{ads.street}}</span>
                </v-flex>
                
                <v-flex xs12>
                    <v-layout row align-center justify-center >
                        <v-flex ><v-radio label="设为默认" small :value="indx"></v-radio></v-flex>
                        <v-flex xs4>
                        <v-btn small icon @click="edit(ads)" ><v-icon small color="primary">edit</v-icon>编辑</v-btn><v-btn small icon @click="remove" ><v-icon small color="warning">delete</v-icon>删除</v-btn>

                        </v-flex>
                    </v-layout>
                  
                </v-flex>
            </v-layout>
           
           
        </v-card-title>
            </v-radio-group>
        </v-card>
        <br>
        <v-card v-if="show">
                    <v-card-text>

    <v-layout wrap align-center>
      <v-flex xs4 sm6 md4 d-flex>

          <v-autocomplete
          v-model="addressData.province"
        :items="provinces"
        item-text="name"
        item-value="name"
        persistent-hint
        label="省"
        no-data-text="暂无"
      >
          </v-autocomplete>

      </v-flex>
             <v-flex xs4 sm6 md4 d-flex>
    

                <v-autocomplete
         :items="citys"
          required
          item-text="name"
          item-value="name"
          v-model="addressData.city"
          label="城市"
          persistent-hint
          no-data-text="暂无"

      >
          </v-autocomplete>

     </v-flex>
            <v-flex xs4 sm6 md4 d-flex>
        <v-autocomplete
          :items="countys"
          item-text="name"
          required
          item-value="name"
          persistent-hint
          v-model="addressData.county"
          label="地区"
          no-data-text="暂无"
        ></v-autocomplete>
      </v-flex>
            <v-flex xs12 sm6 md12 d-flex>
        <v-text-field  required label="详细地址" v-model="addressData.street"></v-text-field>
      </v-flex>
      <v-flex md12 xs12 sm6 d-flex>
            <v-btn outline color="secondary" @click="show = false">取消</v-btn> <v-btn outline color="primary" @click="save">确定</v-btn>
      </v-flex>
                   </v-layout>
                   </v-card-text>
        </v-card>
    </v-app>
</template>
<script>
import {provinces,citys,countys} from '@/assets/address.js'
export default {
    props:['user'],
    data(){
        return{
            row:0,
            show:false,
            addressData:{},
            
            provinces:provinces,
            // citys:citys,
            // countys:countys,
        }
    },
    computed:{
        citys:function(){
            var provinceCode = 0
            provinces.forEach(element => {
                if (element.name == this.addressData.province){
                    provinceCode = element.code
                }
            });
            var filterCitys = new Array()
            citys.forEach(element => {
                if (element.parentCode == provinceCode){
                    filterCitys.push(element)
                }
            });
            return filterCitys
        },
        countys:function(){
            var cityCode = 0
            var filtercountys = new Array()

            citys.forEach(element => {
                if (element.name == this.addressData.city){
                    cityCode = element.code
                }
            });
            countys.forEach(element => {
                if (element.parentCode == cityCode){
                    filtercountys.push(element)
                }
            });
            return filtercountys
        },
        
    },
    methods:{
        add(){
            this.show= true
        },
        edit(data){
            this.addressData = JSON.parse(JSON.stringify(data)) 
                        this.show = true

        },
        remove(){
            this.$http.delete("/user/address",this.addressData).then(res=>{
                    if(res.data.Status){
                        commit("SUCCESS","修改地址成功")
                    }
                })
        },
        save(data){
            if (this.addressData.id){
                this.$http.put("/user/address",this.addressData).then(res=>{
                    if(res.data.Status){
                        commit("SUCCESS","修改地址成功")
                    }
                })
            }else{
                this.$http.post("/user/address",this.addressData).then(res=>{
                    if(res.data.Status){
                        commit("SUCCESS","新增地址成功")
                    }
                })
            }
        }
    },created(){
 
    }
}
</script>
