<template>
    <v-app>
        <v-container>

               <v-navigation-drawer app  clipped width="170">
                   <v-divider></v-divider>
      <v-list>
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
    <v-layout>
        <v-flex xs12 md6 offset-md2>
            <v-tabs-slider color="red"></v-tabs-slider>
            <v-tabs grow>
            <v-tab>待付款</v-tab>
            <v-tab>待购买</v-tab>
            <v-tab>待发货</v-tab>
            <v-tab>待评价</v-tab>
            <v-tab>售后/维权</v-tab>
        </v-tabs>
        </v-flex>
    </v-layout>

        </v-container>
    </v-app>
</template>
<script>
export default {
    data(){
        return{
        items: [{
          title: '代购',
          id: 1,
          icon: 'assignment_ind',
          color: 'primary'
        },
        {
          title: '转卖',
          id: 2,
          icon: 'how_to_reg',
          color: 'primary'
        },
        {
          title: '旅拍',
          id: 3,
          icon: 'fa-key',
          color: 'primary'
        }
      ]
        }
    }
}
</script>
