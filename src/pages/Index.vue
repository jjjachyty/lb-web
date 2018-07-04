<template>
<v-app>
    <Header></Header>
    <div class="main">

  <router-view></router-view>
</div>
</v-app>
</template>
<script>
import Header from '@/components/Header'
export default {
    components:{
Header
    }
}
</script>
<style>
.main{
    margin-top: 90px;
}
</style>
