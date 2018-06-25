<template>
  <div class="container" >
    <v-text-field prepend-icon="search" @keyup.enter="serach" v-model="keyWords" solo clearable placeholder="搜索 例：IPhonex 香港"></v-text-field>
    <br>

    <p class="text-xs-right">
      <v-btn-toggle v-model="purchType">
        <v-btn  small color="red" class="white--text">
           时间
                     <v-icon>arrow_drop_down</v-icon>
            </v-btn>
        <v-btn small color="teal" class="white--text">金额
          <v-icon>arrow_drop_down</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-btn icon>
        <v-icon>filter_list</v-icon>
      </v-btn>
    </p>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex md3 xs12 v-for=" item in items" :key="item.id">
          <a @click="toDetail(item)">
          <v-card>
            <v-layout row>
              <v-flex xs6>
                <span>
                  <v-chip v-if="item.type=='0'"  small color="red" label class="white--text">
                   求购
                  </v-chip>
                  <v-chip  v-else small color="teal" label class="white--text">
                   求带
                  </v-chip>
                </span>
              </v-flex>
              <v-flex xs6>
                <span>
                  <v-chip small color="red" outline label class="white--text body-2">
                    <small class="caption">¥</small>{{item.price}}</v-chip>
                </span>
              </v-flex>
            </v-layout>

            <v-card-media v-if="item.detailImgURLs" class="white--text" height="200px" :src="item.detailImgURLs[0]">
            </v-card-media>
            <v-card-title>
              <div>
                <span class="grey--text">{{item.beginDate | formatDate('YYYY-MM-DD')}}至{{item.endDate | formatDate('YYYY-MM-DD')}}</span>
                <br>

                <div class="tags">
                  <v-chip  v-for="tag in item.tags" :key="tag" label small class="white--text" color="pink">{{tag}}</v-chip>
                </div>
                <div class="grey--text caption content">
                  {{item.content}}
                </div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-avatar size="20">
                <img :src="avatarRoot+item.createBy">
              </v-avatar>
              <v-spacer></v-spacer>
              <v-icon small>pin_drop</v-icon>
              <span class="caption grey--text">{{item.location}}</span>
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
export default {
    components:{
        Carousel,Slide
    },
     data () {
      return {
        purchType:0,
        keyWords:"",
        items:[],
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
      query(params){
      this.$http.get("/purch/list",params).then(res=>{
        if (res.data.Status){
          this.items = res.data.Data
        }
      })
      }
    }
    ,created(){
      this.query()
    }
}
</script>
<style scoped>
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
    height: 40px;
  overflow: scroll;
}
</style>
