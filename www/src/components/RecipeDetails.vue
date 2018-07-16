<template>
  <div class=" card RecipeDetails container-fluid background mt-5">
    <div class="row mt-5">
      <div class="col-3"></div>
      <div class="card text-white bg-warning mb-3 col-6">
        <h1>{{activeRecipe.title}}</h1>
        <img class="card-img-top" :src="activeRecipe.image">
        
        <div v-if="currentUser._id">
      <button class="btn btn-success" @click="addToFavorites">Favorite</button>
      <!-- <button class="btn btn-success" @click="addToFavorites" disabled v-if="currentUser.favorites.includes(activeRecipe._id)">Favorite</button> -->
      <form @submit.prevent="addCalItem">
        <input type="date" v-model="dates">
        <button class="btn btn-info" type="submit">add to cal</button>
      </form>
      </div>
        <h1 class="titles">Instructions</h1>
        <div class="card text-white bg-success mb-3">{{activeRecipe.instructions}}</div>
        <h3 class="titles">Ingredients</h3>
        <div class="card text-white bg-success mb-3" v-for="item in activeRecipe.ingredients">
          <button class="btn" @click="addToGroceryList(item)" v-if="activeGroceryList._id">Add To Grocery List</button>{{item.amount}} {{item.unit}} {{item.name}}
        </div>
      </div>
      <div class="col-3"></div>
    </div>
  </div>

</template>


<script>
  import router from '../router'
  export default {
    name: 'RecipeDetails',
    props: ['GeneralSearchResults'],
    components: {},
    mounted() {
      // console.log(this.$route.params.spoonId)
      this.$store.dispatch('getRecipeDetails', this.$route.params.spoonId)
      this.newItem.UserId = this.currentUser._id
    },
     
    data() {
      return {

        dates: new Date(),
        newItem: {
          description: 'New todo',
          isComplete: false,
          UserId: ''
        }
      }
    },
    computed: {
      activeRecipe() {
        return this.$store.state.recipe
      },
      currentUser() {
        return this.$store.state.user
      },
      activeGroceryList(){
        return this.$store.state.ActiveGroceryList
      }
    },
    methods: {
      addCalItem() {
        var dateArr = this.dates.split("-")
        this.newItem.dates = new Date(Number(dateArr[0]), Number(dateArr[1])-1, Number(dateArr[2]))
        this.newItem.description = this.activeRecipe.title
        console.log(dateArr)
        this.$store.dispatch('addCalItem', this.newItem)
        alert("Added to Calendar")
      },
      addToFavorites() {
        this.$store.dispatch('addToFavorites', this.activeRecipe)
        alert("Added to Favorites")
      },
      addToGroceryList(item){
        if(!this.activeGroceryList._id){
          return console.log("error you must select a grocery list")
        }
        this.$store.dispatch('addToGroceryList',item)
      }
    }

  }

</script>


<style scoped>
  .background {
    background-image: url("../assets/favorites.jpg");
    background-size: cover;
    /* background-repeat: repeat; */
    background-attachment: fixed;
    display: block;
    color: white;
    height: 100%
  }

  .titles {
    font-weight: bold;
    font-size: 2em;
  }
</style>