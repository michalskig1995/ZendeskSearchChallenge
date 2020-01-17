<!------------------------------------------------------------------------------------------------
|   Title : Home.vue
|   
|   Author : Greg Michalski
|   
|   Purpose : The purpose of this vue is to display all attributes in a given item and their 
|             values in an element ui card. 
|                                                                  
-------------------------------------------------------------------------------------------------->
<template>
  <div class="hello" style="width: 80%; margin: auto;">
    <el-card class="box-card" shadow="always" id="configCard">
        <div slot="header" class="clearfix">
            <span>{{Title}}</span>
        </div>
        <div v-for="attribute in Object.keys(Item)" :key="'ItemCard' + attribute">
            <div style="display: flex; width: 100%;">
                <div style="width: 30%; text-align: left;">
                    <b>{{attribute}}</b>
                </div> 
                <div v-if="Array.isArray(Item[attribute])" style="display: flex;">
                    <div v-for="arrayItem in Item[attribute]" :key="'array' + arrayItem" class="arrayItem">{{arrayItem}}</div>
                </div>
                <div v-else class="item">{{Item[attribute]}}</div>
            </div>
            <hr>
        </div>
    </el-card>
  </div>
</template>

<script>

export default {
    name: 'ItemCard',
    data: function(){
        return{
            
        }
    },
    props:[
        'Title',
        'Item'
    ],
    computed:{
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item{
    width: 70%; 
    text-align: left;
}
.arrayItem{
    width: 70%; 
    text-align: left; 
    margin-right: 5%;
}
</style>
