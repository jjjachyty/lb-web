<template>
  <div class="" >





    <v-layout>
      <v-flex offset-md3 md5>
        <v-text-field  prepend-inner-icon="search" :clear-icon-cb="clear" @keyup.enter="serach" v-model="keyWords" solo clearable placeholder="搜索 例：IPhonex 香港"></v-text-field>
      </v-flex>
    </v-layout>

    <!-- <p class="text-xs-right">
       <v-btn-toggle v-model="purchType" >
        <v-btn  small :value="0" color="red" class="white--text" @click="sort">
           时间
                     <v-icon>arrow_drop_down</v-icon>
            </v-btn>
        <v-btn small color="teal" :value="1" class="white--text" @click="sort">金额
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
      </v-btn-toggle>
       <v-btn icon outline color="primary" @click="filter = !filter">
        <v-icon>filter_list</v-icon>
      </v-btn> 
    </p> -->
    <v-container grid-list-lg>
      <div class="text-xs-center">
      <small v-if="items.length < 1" class="grey--text">没有<small class="red--text">{{keyWords}}</small>有关的数据,建议更换搜索试试</small>
      </div>
      <v-layout row wrap>
        <v-flex md3 xs12 v-for=" item in items" :key="item.id">
          <a @click="toDetail(item)">
          <v-card>
            <v-layout row>
              <v-flex xs8 md10>
                <!-- <span>
                  <v-chip v-if="item.type=='0'"  small color="red" label class="white--text">
                   求购
                  </v-chip>
                  <v-chip  v-else small color="teal" label class="white--text">
                   代购
                  </v-chip>
                </span> -->
              </v-flex>
              <v-flex xs4 md5>
                  <v-chip small color="red"  label class="white--text body-2">
                    <div v-if="item.amount"><small class="caption" >预计¥</small>{{item.amount}}</div>
                    <small class="caption" v-else>求报价</small>
                    </v-chip>
              </v-flex>
            </v-layout>

            <v-card-media v-if="item.products" class="white--text" height="200px" :src="purchaseRoot+item.products[0].images+'?'+Number(new Date())">
            </v-card-media>
            <v-card-text>
              <div v-for="pd in item.products">

              </div>
            </v-card-text>
            <v-card-title class="grey--text">
                <div class="content">{{item.content}}</div>
            </v-card-title>

            <v-card-actions>
              <v-badge overlap>
              <v-avatar size="30">
                <img :src="avatarRoot+item.createBy">
              </v-avatar>
              <span slot="badge">实</span>
              </v-badge>
              <v-spacer></v-spacer>
              <v-icon small>pin_drop</v-icon>
              <span class="caption grey--text">{{item.destination}}</span>
            </v-card-actions>

          </v-card>
          </a>
        </v-flex>


      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
import {avatarRoot} from '@/config'
import {Mixin} from '@/mixins'
export default {
  mixins:[Mixin],
    components:{
        Carousel,Slide
    },
    metaInfo() { 
      return {
        title: this.title,
        meta:this.meta
      }
    },
     data () {
      return {
        title:"求代购列表",
        meta:[],
        purchType:0,
        keyWords:"",
        items:[],
        filter:false,
        filters:{},
        avatarRoot:avatarRoot
      }
    },
    methods:{
      toDetail(item){
          this.$router.push({ name: 'purchase',params:{"id":item.id,"item":item} })
      },
      serach(){
        this.query({'keyWords':this.keyWords})
      },
      clear(){
        this.keyWords=null
        this.query()
      },
      query(params){
      this.$http.get("/purchases",params).then(res=>{
        if (res.data.Status){
          this.items = res.data.Data
          var description = new Array()
          var keywords = new Array()
          this.items.forEach(element => {

             if(-1 == keywords.indexOf(element.destination)){
                keywords.push(element.destination)
              }

            element.products.forEach(pd=>{
              if (-1 ==description.indexOf(element.destination+'代购'+pd.name)){
                description.push(element.destination+'代购'+pd.name)
              }
              if(-1 == keywords.indexOf(pd.name)){
                keywords.push(pd.name)
              }
            })


          });
          this.meta.push({name:"keywords",content:keywords})
          this.meta.push({name:"description",description})
        }
      })
      }
    }
    ,created(){
      this.query()
    },mounted(){
      this.$store.dispatch("seo")
    }
}
</script>
<style scoped>
.serach{
  max-width: 500px;
  
}
.img-herder img{
    height: 150px;
    width: 100%;
}
.img-herder{
border-color: red;
display: flex;
justify-content: center;
flex-direction: column;
align-content: center;
}
.sort-btn{
}
.purch-type{
  margin-left:-20px 
}
.purch-price{
  float: right;
}
.tags{
  height: 40px;
  overflow: scroll;
}
.content{
    max-height: 20px;
    overflow:hidden;
    word-wrap: break-word;
    max-width: 100%;

}
</style>
