<template>
    <v-app>
            <v-layout row>
                    <v-flex  md6 offset-md2>
                        <v-layout row wrap>
                    
                      <v-flex xs12>
                <v-select 
                :items="destinations" 
                v-model="purchaseData.destination" 
                placeholder="指定代购地" 
                item-text="name" 
                required
                :rules="[v => !!v || '不能为空']"
                no-data-text="没有目的地"
                item-value="name" 
                chips
                clearable=""
                 max-height="200"
                autocomplete>
                  <template slot="selection" slot-scope="data">
                    <v-chip :selected="data.selected" :key="JSON.stringify(data.item)" class="chip--select-multi" @input="data.parent.selectItem(data.item)">
                      <v-avatar>
                <img :src="'/static/country/'+data.item.id+'.png'">
              </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template slot="item" slot-scope="data">
                    <template v-if="data.item.divider || data.item.header">
                      <v-list-tile-content v-text="data.item.header"></v-list-tile-content>
                    </template>
                    
                    <template v-if="data.item.tags">
                      <v-list-tile-avatar>
                        <img :src="'/static/country/'+data.item.id+'.png'">
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                       <v-list-tile-title>
                        <v-chip label color="pink ligntn-5 white--text" small v-for="tag in data.item.tags">
                            {{tag}}
                        </v-chip>
                       </v-list-tile-title>
                      </v-list-tile-content>
                    </template>
                  </template>
                </v-select>
    </v-flex>
                <v-flex xs12 md12>
                    <v-text-field textarea label="描述说明" :rules="[v => !!v || '不能为空']" placeholder="特别说明"></v-text-field>
                </v-flex>
                <v-flex xs12 md12>
                    <v-card>
                        <v-card-title>商品清单 <v-spacer></v-spacer> <v-btn small icon @click="addProduct"><v-icon small>add</v-icon>新增</v-btn></v-card-title>
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <v-container>
                        <v-card v-for="pd in purchaseData.products">
                            <v-layout row wrap align-center justify-end>
                                <v-flex  xs4  md2 >
                                <croppa v-model="productsImages[index]" @new-image-drawn="handleNewImage(pd)" :initial-image="purchaseRoot+pd.images+'?'+Number(new Date())" :accept="'image/*'"  :width="100"  :file-size-limit="1024000"  placeholder="上传商品图片">
                                </croppa>
                                </v-flex>
                                <v-flex xs8 md10>
                                    <v-layout row wrap>
                                        <v-flex xs6 md3>
                                            <v-text-field  v-model="pd.name" :rules="[v => !!v || '不能为空']" label="名称" placeholder="商品名称"></v-text-field>
                                        </v-flex>

                                        <v-flex xs6 md3>
                                            <v-text-field  v-model.number="pd.quantity"  :rules="[v => !!v || '不能为空']" label="数量"></v-text-field>
                                        </v-flex>
                                        <v-flex xs6 md3>
                                            <v-text-field  label="参考单价" v-model="pd.price" placeholder="知道价格可填"></v-text-field>
                                        </v-flex>
                                        <v-flex xs6 md3>
                                            <v-text-field  label="参考渠道" v-model="pd.shopName" placeholder="意向购买渠道"></v-text-field>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-text-field textarea label="说明" v-model="pd.describe" placeholder="货号/型号/颜色等说明"></v-text-field>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card>
                                            </v-container>

                        </v-form>
                    </v-card>
                </v-flex>
                <v-flex xs12 class="text-xs-center" v-if="purchaseData.products.length>0">
                    <v-btn small outline color="primary">保存</v-btn>
                </v-flex>
                        </v-layout>
                    </v-flex>
            </v-layout>
           
           
  
    </v-app>
</template>
<script>
export default {
    data(){
        return{
            productsImages:[],
            valid:false,
            purchaseData:{products:[]},
            destinations:[{"id":"0000","header":"默认"},
 {"id":"hk","name":"全球","tags":[]}
,{"id":"0000","header":"中国"},
,{"id":"hk","name":"香港","tags":["IPhone"]}
,{"id":"mo","name":"澳门","tags":["IPhone"]}
,{"id":"tw","name":"台湾","tags":[]}
,{"id":"0000","header":"亚洲"}
,{"id":"sg","name":"新加坡","tags":[]}
,{"id":"jp","name":"日本","tags":[]}
,{"id":"kr","name":"韩国","tags":[]}
,{"id":"th","name":"泰国","tags":["RAY面膜"]}
,{"id":"0000","header":"欧洲"}
,{"id":"de","name":"德国","tags":[]}
,{"id":"gb","name":"英国","tags":["YSL"]}
,{"id":"fr","name":"法国","tags":[]}
,{"id":"0000","header":"北美洲"}
,{"id":"us","name":"美国","tags":[]}
,{"id":"0000","header":"大洋洲"}
,{"id":"au","name":"澳大利亚","tags":[]}

],
        }
    },methods:{
        addProduct(){
            this.purchaseData.products.push({name:"",quantity:0,price:0,images:"",shopName:"",describe:""})
        }
    }
}
</script>

<style>

img {
    max-width: 100%;
    max-height: 100%;
}
</style>
