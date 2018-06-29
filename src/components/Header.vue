<template>
<v-container>

   <v-toolbar  clipped-left="" fixed="" translate="" app="">
    <v-toolbar-title align-with-title class="red--text logo" ><router-link to="/" class="deep-orange--text"><label class="sortname">4T</label><p class="fullname">For Travael</p></router-link></v-toolbar-title>
    <v-tabs class="toobar">
          <v-tabs-slider color="deep-orange"></v-tabs-slider>

     <v-tab  to="/" large flat=""><v-icon small>fa-sun</v-icon>爆料填坑</v-tab>    
      <v-tab    to="/logispurch" ><v-icon small>fa-shopping-cart</v-icon>物流代购</v-tab>
        <v-tab   disabled ><v-icon small>fa-exchange-alt</v-icon>转卖</v-tab>
        <v-tab   disabled ><v-icon small>fa-camera-retro</v-icon>旅拍</v-tab>

      </v-tabs>
      <v-spacer></v-spacer>  
    <div v-if="!user.id"  class="nologin">
    <v-btn flat  small to="/login" class="nologin-btn">
      登陆
    </v-btn>
    <v-btn flat small to="/register" class="nologin-btn">
      注册
    </v-btn>
</div>
<v-menu v-else offset-y class="menu">
        <v-toolbar-title slot="activator">
    <v-avatar  size="40"><img  :src="user.avatar+'?'+Number(new Date())"/></v-avatar>
</v-toolbar-title> 
   <v-list>
          <v-list-tile  to="/profile">
          <v-icon small color="grey">settings</v-icon>
          <v-list-tile-title>设置</v-list-tile-title>
        </v-list-tile>
        <v-list-tile  to="/burst">
                  <v-icon small color="grey">wb_incandescent</v-icon>        
          <v-list-tile-title>爆料</v-list-tile-title>
        </v-list-tile>

        <v-list-tile disabled  to="/logispurch">
        <v-icon small color="grey">add_shopping_cart</v-icon>
          <v-list-tile-title>代购</v-list-tile-title>
        </v-list-tile>

        <!-- <v-list-tile disabled to="/logispurch">
        <v-icon small color="grey">add_shopping_cart</v-icon>
          <v-list-tile-title>转卖</v-list-tile-title>
        </v-list-tile>

        <v-list-tile  disabled to="/logispurch">
        <v-icon small color="grey">add_shopping_cart</v-icon>
          <v-list-tile-title>旅拍</v-list-tile-title>
        </v-list-tile> -->

        <v-list-tile to="/msg">
        <v-badge >
      <v-icon small="">mail</v-icon>
      <span>消息</span>
            <span v-if="newMsg>0" overlap slot="badge">{{newMsg}}</span>

    </v-badge>

       
        </v-list-tile>
<v-divider></v-divider> 
         <v-list-tile @click="loginOut">
            <v-icon small color="grey">cancel</v-icon>
          <v-list-tile-title >退出</v-list-tile-title>
        </v-list-tile>

      </v-list>

</v-menu>

 </v-toolbar> 


<!--      
<v-tabs
      dark
      
      slider-color="white"
      class="tool-tabs"
     
    >
      <v-tab
        ripple
                class=" tab"
                to="/"
      >
      爆料填坑
      </v-tab>
      
            <v-tab
        ripple
        class=" tab"
        disabled
        to="logispurch"
      >
      物流代购
      </v-tab>
            <v-tab
        ripple
        class=" tab"
        disabled
        to="logispurch"
      >
      转卖
      </v-tab>
                <v-tab
        ripple
        class="tab"
        disabled
        to="logispurch"
      >
      旅拍
      </v-tab>

    </v-tabs>

      <v-spacer></v-spacer>
      
      <div v-if="user.id">

          <v-menu offset-y>
<v-toolbar-title slot="activator">
    <v-avatar  size="30"><img v-if="user.id" :src="$store.state.User.user.avatar"/></v-avatar>
               <v-icon color="white">arrow_drop_down</v-icon>
</v-toolbar-title>
      <v-list v-if="user.id">
          <v-list-tile  to="/profile">
          <v-icon small color="grey">settings</v-icon>
          <v-list-tile-title>设置</v-list-tile-title>
        </v-list-tile>
        <v-list-tile  to="/burst">
                  <v-icon small color="grey">wb_incandescent</v-icon>

        
          <v-list-tile-title>爆料</v-list-tile-title>
        </v-list-tile>
        <v-list-tile  to="/logispurch">
        <v-icon small color="grey">add_shopping_cart</v-icon>
          <v-list-tile-title>代购</v-list-tile-title>
        </v-list-tile>

        <v-list-tile>


        <v-badge >
      <v-icon small="">mail</v-icon>
      <span>消息</span>
            <span v-show="show" overlap slot="badge"></span>

    </v-badge>

       
        </v-list-tile>
<v-divider></v-divider> -->
        <!-- <v-list-tile @click="loginOut">
            <v-icon small color="grey">cancel</v-icon>
          <v-list-tile-title >退出</v-list-tile-title>
        </v-list-tile>

      </v-list>
    </v-menu>

        </div>
       <div v-else  class="nologin">
        <v-btn  flat small color="white" to="/login">登陆</v-btn>
        <v-btn class="nologin-btn" flat small color="white" to="/register">注册</v-btn>
        </>
  
-->
  <!-- </v-card> -->



</v-container>
</template>
<script>
import {mapGetters,mapState} from 'vuex'
import {avatarRoot} from '@/config'

export default {
    data(){
        return{
          url:avatarRoot,
            drawer:true,
            show:true,
            active:2,
            newMsg:0,
        }
    },
        computed:{
          ...mapState({
                user: state=> state.User.user
              
          }),
    },
    methods:{
        loginOut(){
            this.$store.commit('LOGOUT')
            this.$router.push("/")
        },
        home(){
            this.$router.push("/")
        },
    },
    created(){
      console.log("this.$store.state.auth.token && !this.$store.state.User.user.id",this.$store.state.auth.token && !this.$store.state.User.user.id)
                if (this.$store.state.auth.token && !this.$store.state.User.user.id){                 
              this.$store.dispatch("getUserInfo",{type:"profile"}).then(res=>{ //初始化用户基本信息
                if (res.data.Status){
                  this.user = res.data.Data
                                  this.$store.commit("GET_USER_PROFILE_SUCCESS",res.data.Data)
                                   
                }else{
                         this.$store.commit("ERROR",res.data.Error.Err)

                }
              })
                }
    },mounted () {
      if (this.$store.state.auth.token){
      this.$http.get("/user/msg/news",{}).then(res=>{
          if(res.data.Status){
            this.newMsg = res.data.Data
          }
      }).catch(res=>{
        this.$store.commit("ERROR",res.data)
      })
}
    },
}
</script>

<style scoped>
.nologin{
display: flex;
max-width: 60px;
    margin-right: 0px;
}
.btn{
  min-width: 20px;
}
/* .title{
    min-width: 60px;
}
.logo{
    width: 40px;
    height: 40px;
}
.nologin{
    display: flex;
    flex-direction: row;
    padding: 0;
    margin: 0;
}

*/
.nologin-btn{
    width: 20px;
}
.logo{
 text-align: center;
     width: 130px;
     margin-top: 10px;
    margin-left: 4px !important;
}
.menu{
width: 80px
}

.application .theme--light.toolbar, .theme--light .toolbar {
    background-color: #ffffff !important;
}
.sortname{
  font-size: 2em;
  font-family: monospace;
    font-weight: bold;
}
.fullname{
  margin-top: -20px;
  font-size: 6px
}
</style>
<style>
.tabs__item--active{
  color:#FF7043;
}
.tabs__item--active i{
  color:#FF7043 !important
}
/* .tabs__bar{
  background-color:transparent !important;
} */
</style>
