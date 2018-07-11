<template>
    <div class="groceryList">
      <div><br><br><br><br><br><br>      
        <form @submit.prevent="addGroceryList">
          <input type="text" v-model="newTitle">
        <button type="submit">Create New</button>
        </form>
        <button @click="getGroceryList">Get</button>
        
      </div>   
      <div v-for="list in GroceryList">
        <h1 class="h2">
          {{list.title}}
        </h1>
        <button @click="setActiveGroceryList(list)">Add to this list</button>
        <button @click="deleteList(list._id)">Delete</button>
      </div> 
      <h2 class="h4">{{activeGroceryList.title}}</h2>
      <ul>
        <li v-for="item in activeGroceryList.items" class="alert alert-dark">
          {{item}}
        </li>
  
      </ul>
  
    </div>
  </template>

<script>
  export default {
    name: 'GroceryList',
    data() {      
      return {
        newTitle: ""
      }
    },
    mounted() {
      this.$store.dispatch("getGroceryList")
    },
    computed: {
      GroceryList() {
        return this.$store.state.groceryList
      },
      ActiveGroceryList() {
        return this.$store.state.ActiveGroceryList
      }
    },
    methods: {
      setActiveGroceryList(list){
      
        this.$store.dispatch("setActiveGroceryList", list)
      },
      addGroceryList(){
        this.$store.dispatch("addGroceryList", this.newTitle)
      },
      getGroceryList(){
        this.$store.dispatch("getGroceryList")
      },
      deleteList(id){
        this.$store.dispatch('deleteList',id)
      }
    }
  }

</script>

<style scoped>


</style>
