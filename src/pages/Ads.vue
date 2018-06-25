<template>
  <v-carousel hide-controls hide-delimiters class="ads">
    <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i">
      <small class="white--text"> 广告</small>
      <router-link :to="item.url">
        <p v-bind:style="{marginTop:textTop +'px'}" class="white--text text-xs-center ads-text" >{{item.text}}</p>
      </router-link>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
  export default {
      props: ['textTop'],
    data () {
      return {
        items: [
          {
            src: '/static/login.png',
            text:'发表曝光文章 每月最多👍 🉐️ Garmin 运动手表 月月曝 月月送',
            url:"/activity/1"
          }
        ]
      }
    }
  }
</script>
<style scoped>


</style>


