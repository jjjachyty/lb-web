<template>
<v-app>
  <v-layout row justify-center>
    <v-flex offset-md2 md9 xs12>
  <v-layout row="">
    <v-flex md5 offset-xs2 xs8>
              <v-text-field
         solo
          v-model="keywords"
         clearable
          
         prepend-inner-icon="search"
         @blur="search"
         @keyup.enter="search"
         placeholder="请输入查询关键字">
      </v-text-field> 
    </v-flex>   
   </v-layout>

    <v-layout row wrap="">
      <v-flex xs12 md8>
        <List :articles="serchResults"></List>
      </v-flex>
      <v-flex md4>
      <Ads></Ads>
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



</style>

