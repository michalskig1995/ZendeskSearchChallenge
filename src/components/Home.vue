<!------------------------------------------------------------------------------------------------
|   Title : Home.vue
|   
|   Author : Greg Michalski
|   
|   Purpose : The purpose of this vue is to display each group from the given jsons, all possible
|             attributes from that groups items, and the search results based on the selected
|             attributes.      
|                                                                  
-------------------------------------------------------------------------------------------------->
<template>
  <div class="hello">
    <h1>Search App Challenge {{selectedGroup}}</h1>
    <el-row class="row">
      <el-button v-for="group in Groups" :key="group.name" @click="selectedGroup = group.name" :type="selectedGroup == group.name ? 'primary' : ''">
        {{group.name}}
      </el-button>
    </el-row>
    <el-row class="row">
      <el-row class="row">
          Search For Empty Values
        <el-switch v-model="searchForEmptyValues">
        </el-switch>
      </el-row>
      <el-row class="row">
          Advanced Search
        <el-switch v-model="advancedSearch">
        </el-switch>
      </el-row>
    </el-row>
    <el-row v-if="advancedSearch" class="row" style="text-align: left;">
      <h4>Select attributes to search for</h4>
      <el-checkbox-group v-model="selectedAttributes">
        <el-checkbox v-for="attribute in Attributes" :key="attribute" :label="attribute" border style="margin: 10px;"></el-checkbox>
      </el-checkbox-group>
    </el-row>
    <el-row class="row">
      <el-row class="searchRow">
        <el-input :placeholder="advancedSearch ? 'Search on selected...' : 'Search all attributes...'" class="searchInput" v-model="searchString" :disabled="searchForEmptyValues"></el-input>
      </el-row>
      <h2>Results {{FilteredItems.length}}</h2>
      <el-row style="overflow: auto; height: 50vh; border-style: solid; border-radius: 5px;">
        <el-row v-for="(item, index) in FilteredItems" :key="item.toString() + index" style="margin-top: 15px;">
          <item-card :Title="selectedGroup + ' ' + (index + 1)" :Item="item"></item-card>
        </el-row>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import ItemCard from './Accessories/ItemCard.vue'

export default {
    name: 'Home',
    components:{
        ItemCard
    },
    data: function(){
        return{
            selectedGroup: '',
            selectedAttributes: [],
            searchString: '',
            searchForEmptyValues: false,
            advancedSearch: false
        }
    },
    //Called when the component is finished rendering, initializes the selected group to the stores first group in the group array.
    mounted: function(){
        if(this.Groups[0].name != undefined)
            this.selectedGroup = this.Groups[0].name
    },
    props:[

    ],
    computed:{
        //Returns an array of groups from the store.
        Groups: function(){
            return this.$store.state.Groups
        },
        //Returns an array of all possible attributes from all objects in a group.
        Attributes: function(){
            let attributes = []
            if(this.selectedGroup == '')
                return attributes
            let group = this.Groups.find(group => group.name == this.selectedGroup)
            if(group != undefined){
                for(var item in group.items){
                    for(var attribute in Object.keys(group.items[item])){
                        if(!attributes.includes(Object.keys(group.items[item])[attribute]))
                            attributes.push(Object.keys(group.items[item])[attribute])
                    }
                }
            }
            
            return attributes
        },
        //Returns an array of objects using the search string and selected attributes if advancedSearch is true.
        FilteredItems: function(){
            let group = this.Groups.find(group => group.name == this.selectedGroup)
            if(group != undefined){
                if(this.advancedSearch){
                    if(this.searchForEmptyValues){
                        return group.items.filter(item => Object.keys(item).some(attribute => this.selectedAttributes.includes(attribute) 
                        && (item[attribute] === '' || item[attribute] === undefined || item[attribute] === null)))
                    }
                    else{
                        return group.items.filter(item => Object.keys(item).some(attribute => this.selectedAttributes.includes(attribute.toString()) 
                        && (item[attribute] == null ? '' : item[attribute]).toString().includes(this.searchString)))
                    }
                }
                else{
                    if(this.searchForEmptyValues){
                        return group.items.filter(item => Object.keys(item).some(attribute => item[attribute] == null))
                    }
                    else{
                        return group.items.filter(item => Object.keys(item).some(attribute => (item[attribute] == null ? '' : item[attribute]).toString().includes(this.searchString)))
                    }
                }
            }
            return []
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row{
  margin-bottom: 30px;
}
.searchRow{
  display: flex;
  margin: auto;
  width: 50%;
  margin-bottom: 30px;
}
.searchInput{
  width: 50%; 
  margin: auto;
}
</style>
