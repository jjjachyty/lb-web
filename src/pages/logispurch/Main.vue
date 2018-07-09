<template>
    <v-app>
        
    

        <!-- <v-tabs grow height="70" fixed-tabs  icons-and-text centered>
            <v-tabs-slider color="deep-orange"></v-tabs-slider>
            <v-tab href="#purch"><small class="tab-tips" >直接找人代购</small><v-icon>shopping_cart</v-icon>代购</v-tab>
            <v-tab disabled href="#logis"><small class="tab-tips" >自己购买找人带回</small><v-icon>public</v-icon>物流</v-tab>

                    <v-tab-item id="logis">
                        <v-container>
物流
                        </v-container>

        </v-tab-item>
                <v-tab-item id="purch"> -->
                    <v-layout>
                        <v-flex md8 offset-md2><List></List></v-flex>
                       
                    </v-layout>
        <!-- </v-tab-item>
        </v-tabs> -->
         

          
    </v-app>
</template>
<script>
import List from './List'
export default {
    components:{
        List
    }
}
</script>
<style scoped>
.tab-tips{
    font-size: 1px;
}
</style>
