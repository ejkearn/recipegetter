<template>
  <div class="container-fluid mt-5" id="background">
    <div class="row">
      <div class="col">
        <IngredientSearchResults></IngredientSearchResults>
      </div>
    </div>
  </div>
</template>

<script>
  import IngredientSearchResults from "./IngredientSearchResults"
  import GeneralSearchResults from "./GeneralSearchResults"
  export default {
    name: 'SearchResults',
    data() {
      return {

      }
    },
    components: {
      IngredientSearchResults,
      GeneralSearchResults
    },

    computed: {},
    methods: {}
  }

</script>

<style scoped>
  @media only screen and (min-device-width:415px) {

    #background {
      background-image: url("../assets/searchPage.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: fixed;
      color: white;
      height: 93.4vh
    }
  }
</style>