<template>
  <div class="favorites">
    <h1 class="mt-5 h1">My favorites</h1>
        <div class="card-columns">
            <div v-for="fav in favorites">
              <div class="card col-6">
                <img class="card-img-top" :src="fav.image">
                <router-link :to="{name: 'RecipeDetails', params:{spoonId: fav.spoonId}}">
                  <h1 class="card-title titles">{{fav.title}}</h1>
                </router-link>
                <button @click="deleteFavorite(fav._id)">Delete</button>
              </div>
            </div>
          </div>
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