<template>
  <v-carousel hide-controls hide-delimiters class="ads">
      <a >
    <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i">
        <p class="white--text text-xs-center ads-text">{{item.text}}</p>
    </v-carousel-item>
    </a>
  </v-carousel>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          {
            src: '/static/login.png',
            text:'发表文章 每月最多点赞🉐️ ipad Garmin手表 月月送'
          },
        ]
      }
    }
  }
</script>
<style scoped>
.ads{
    height: 100px;
}
.ads-text{
    margin-top:50px;
}
</style>
