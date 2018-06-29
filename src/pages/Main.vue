<template>
<v-app>
  <v-layout row>
    <v-flex offset-md2 md8>
  <v-container>
              <v-text-field
         solo
         class="search-txt"
          v-model="keywords"
         clearable
         prepend-icon="search"
         @blur="search"
         @keyup.enter="search"
         placeholder="请输入关键字">
      </v-text-field>    
   </v-container>
<br>
    <v-layout row wrap="">



      <v-flex xs12 md8>
        <List :articles="serchResults"></List>
      </v-flex>
      <v-flex md4>
      <Ads :textTop="130"></Ads>
      <Top></Top>
      </v-flex>

          <v-fab-transition>
      <v-btn
        color="red"
        
        dark
        fab
        fixed
        bottom
        right
        @click="toexparticle"
      >
        <v-icon>create</v-icon>
      </v-btn>
    </v-fab-transition>

    </v-layout>
    </v-flex>
  </v-layout>
  </v-app>

</template>
<script>
import List from '@/pages/List'
import Ads from '@/pages/Ads'
import Top from '@/pages/Top'

export default {
  components:{
    List,
    Ads,
    Top
  },
    data(){
        return{
            keywords:"",
            serchResults:[]
        }
    },methods:{
      search(){
         this.$http.get("/serchexparticles",{keywords:this.keywords}).then(res=>{
           this.serchResults = res.data.Data
         })
      },
      toexparticle(){
        if (this.$store.state.auth.token){
          this.$router.push("exparticle")
        }else{
                                this.$store.commit("INFO","登陆后才能曝光哦")

          this.$router.replace({
                            name: 'login',
                            query: { redirect: "/exparticle" }
          })
        }
      }
    },created(){
              this.$http.get("/articles",{}).then(res=>{
            if (res.data.Status){
            this.serchResults = res.data.Data
            }
        })
    }
}
</script>

<style scoped>
.ads{
  
    height: 300px;
}


  .search-txt{
      margin-left: 10%;
      height: 20px;
      width: 80%;
  }

</style>

