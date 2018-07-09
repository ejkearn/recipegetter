<template>
  <div class="favorites">
    <h1>My favorites</h1>
    <ul>
      <br><br><br><br><br><br><br>
      <li v-for="fav in favorites">
        <router-link :to="{name: 'RecipeDetails', params:{spoonId: fav.spoonId}}">{{fav.title}}</router-link>
        <button @click="deleteFavorite(fav._id)">Delete</button>
        </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'favorites',
    data() {
      return {
        
      }
    },
    mounted() {
      this.$store.dispatch("getFavorites")
      
    },
    computed: {
      favorites() {
        return this.$store.state.favorites
      }

    },
    methods: {
      deleteFavorite(id) {
        this.$store.dispatch('deleteFavorite',id)
      }
    }
  }

</script>

<style scoped>
  ul {
    list-style: none
  }

  .favorites {
    text-align: center
  }
</style>