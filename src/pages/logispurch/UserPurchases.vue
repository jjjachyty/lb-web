<template>
    <v-app>

      <v-navigation-drawer clipped  app fixed  width="170">
      <v-list>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="active=item.id">
          <v-list-tile-action>
            <v-icon small :color="item.color">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>


           
    <!-- <v-tabs fixed-tabs grow>
         <v-toolbar fixed absolute app>
        <v-tab href="#ask">
            我发布的代购单
        </v-tab>
        <v-tab href="#provide">
            我提供的报价单
        </v-tab>
                <v-tab href="#provide">
            我提供的报价单
        </v-tab>
            </v-toolbar>
            
            <v-tab-item id="ask">
                <PurchaseList></PurchaseList>
            </v-tab-item>
            <v-tab-item id="provide">
                xxx
            </v-tab-item>
    </v-tabs> -->
     <v-layout>
         <v-flex xs12 md5 offset-md2>
              <div v-if="active == '1'">
                  <PurchaseNList></PurchaseNList>
              </div>
         </v-flex>
     </v-layout>


    </v-app>
</template>
<script>
import PurchaseNList from './PurchaseNList'
export default {
        components:{
            PurchaseNList
        },
        data(){
            return{
                active:1,
                      items: [{
          title: '求带',
          id: 1,
          icon: 'assignment_ind',
          color: 'primary'
        },
        {
          title: '代购',
          id: 2,
          icon: 'how_to_reg',
          color: 'primary'
        },
        {
          title: '行程',
          id: 4,
          icon: 'fa-key',
          color: 'primary'
        }
      ]
            }
        }
}
</script>
