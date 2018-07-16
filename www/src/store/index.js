import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from "../router"
import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'


vue.use(Buefy)

vue.use(vuex)

vue.use(VCalendar, {
    firstDayOfWeek: 2,  // Monday
                    // ...other defaults
  });

var production = !window.location.host.includes('localhost');
var baseUrl = production ? '//foodiemcfoodface.herokuapp.com' : '//localhost:3000';
var foodApi = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes'

var genRecipeSearch = axios.create({
    headers: {
        "X-Mashape-Key" : "WUU1lLesMimshTMLlxjAtkQGQMk6p1JQPB5jsnLPJCHfNJbugE"
    },
    baseURL: foodApi + '/search?query=',
    timeout: 3000
})
var ingredientRecipeSearch = axios.create({
    headers: {
        "X-Mashape-Key" : "WUU1lLesMimshTMLlxjAtkQGQMk6p1JQPB5jsnLPJCHfNJbugE"
    },
    baseURL: foodApi + '/findByIngredients?fillIngredients=false&ingredients=',
    timeout: 3000
})
var recipeDetailsSearch = axios.create({
    headers: {
        "X-Mashape-Key" : "WUU1lLesMimshTMLlxjAtkQGQMk6p1JQPB5jsnLPJCHfNJbugE"
    },
    baseURL: foodApi,
    timeout: 3000
})
var api = axios.create({
    baseURL: baseUrl,
    timeout: 3000,
    withCredentials: true
})
var auth = axios.create({
    baseURL: baseUrl + "/auth",
    timeout: 3000,
    withCredentials: true
})

//suggested by darryl
// var ingredients =""
// var url = 'findbyingred'+ingredients+'limit=true'

export default new vuex.Store({
    state: {
        user: {},
        recipes: [],
        ingRecipes: [],
        recipe: {},
        groceryList: [],
        searchHistory: [],
        favorites: [],
        pantry: [],
        calItems:[],
        ActiveGroceryList:{}
    
    },
    mutations: {
        deleteUser (state){
            state.user = {}
        },
        setUser(state, user) {
            state.user = user
        },
        setRecipes(state, recipes) {
            console.log(recipes)
            state.recipes = recipes
        },
        setGroceryList(state, groceryList) {
            state.groceryList = groceryList
        },
        setActiveRecipe(state, recipe) {
            state.recipe = recipe
        },
        setPantry(state, pantry) {
            state.pantry = pantry
        },
        setIngRecipes(state, ingRecipes){
            console.log(ingRecipes)
            state.ingRecipes = ingRecipes
        },
        setFavorites(state, favorites){
            console.log(favorites)
            state.favorites = favorites
        },
        setCalItems(state, calitems){
            state.calItems = calitems
        },
        setActiveGroceryList(state, List){
            state.ActiveGroceryList = List
        }
        
    },

    actions: {

        getSearchIngredients({dispatch, commit}, query) {
            ingredientRecipeSearch.get(query + '&number=10'+ '&limitLicense=false' + '&ranking=1')
            .then(res=>{ 
                console.log(res)
                var ingRecipes = res.data.map(recipe => {
                    return {
                        title: recipe.title,
                        image: recipe.image,

                        spoonId: recipe.id
                    }
                })
                commit('setIngRecipes', ingRecipes)
            })
        },
        

        // RecipesGeneral({ dispatch, commit }, query) {
        //     genRecipeSearch.get(query)
        //         .then(res => {
        //             var foodList = res.data.results.map(recipe => {
        //                 return {
        //                     title: recipe.title,
        //                     image: recipe.image,
        //                     minutesReady: recipe.readyInMinutes,
        //                     sourceUrl: recipe.source.Url,
        //                     instructions: recipe.instructions,
        //                     ingredients: recipe.extendedIngredients,
        //                     spoonId: recipe.id
        //                 }
        //             })
        //         })
        // },
        getSearchResults({dispatch, commit}, query) {
            genRecipeSearch.get(query + '&number=6')
            .then(res=>{
                var recipes = res.data.results.map(recipe => {
                    return {
                        title: recipe.title,
                        image: recipe.image,
                        readyInMinutes: recipe.readyInMinutes,
                        // sourceUrl: recipe.sourceUrl,
                        // instructions: recipe.instructions,
                        // ingredients: recipe.extendedIngredients,
                        spoonId: recipe.id
                    }
                })
                console.log(res)
                commit('setRecipes', recipes)
                router.push({name: 'GeneralSearchResults'})
            })
            .catch(res => {
                console.log(res.data)
            })
        },
        setRecipeDetails({dispatch, commit, state}, id){
            recipeDetailsSearch.get(id + '/information')
            .then(recipeDeets =>{
                console.log(recipeDeets)
                var recipe = {}
                recipe.title = recipeDeets.data.title,
                recipe.image = recipeDeets.data.image,
                recipe.readyInMinutes = recipeDeets.data.readyInMinutes,
                recipe.sourceUrl = recipeDeets.data.sourceUrl,
                recipe.instructions = recipeDeets.data.instructions ,
                recipe.ingredients = recipeDeets.data.extendedIngredients,
                recipe.spoonId = recipeDeets.data.id
                commit('setActiveRecipe', recipe)
            })
            .catch(res => {
                console.log(res.data)
            })
        },
        getRecipeDetails({dispatch, commit}, id){
            recipeDetailsSearch.get(id + '/information')
            .then(res=>{
                console.log(res)
                var recipe = {}
                recipe.title = res.data.title,
                recipe.image = res.data.image,
                recipe.readyInMinutes = res.data.readyInMinutes,
                recipe.sourceUrl = res.data.sourceUrl,
                recipe.instructions = res.data.instructions ,
                recipe.ingredients = res.data.extendedIngredients,
                recipe.spoonId = res.data.id
                console.log(recipe)
                commit('setActiveRecipe', recipe)
            })
            .catch(res => {
                console.log(res.data)
            })
        },
    
        //AUTH STUFF
        login({ commit, dispatch }, loginCredentials) {
            auth.post('/login', loginCredentials)
                .then(res => {
                    console.log("successfully logged in!")
                    commit('setUser', res.data)
                    router.push({ name: 'Home' })
                })
                .catch(res => {
                    console.log(res.data)
                })
        },
        logout({ commit, dispatch }) {
            auth.delete('/logout')
                .then(res => {
                    console.log("Successfully logged out!")
                    commit('deleteUser')
                    //   router.push({name: 'Login'})
                })
                .catch(res => {
                    console.log(res.data)
                })
        },
        register({ commit, dispatch }, userData) {
            auth.post('/register', userData)
                .then(res => {
                    console.log("Registration Successful")
                    router.push({ name: 'Home' }) // I changed this to just change the component 
                })
                .catch(res => {
                    console.log(res.data)
                })
        },
        authenticate({ commit, dispatch }) {
            api.get('/authenticate')
                .then(res => {
                    commit('setUser', res.data)
                    // router.push({ name: 'Home' })
                })
                .catch(res => {
                    console.log(res.data)
                })
                .catch(res => {
                    console.log(res.data)
                })
        },
        postGrocery({ commit, dispatch }, foodItem) {
            api.post('/api/grocLists', foodItem)
                .then(res => {
                    dispatch("getGroceries")
                })
                .catch(res => {
                    alert("err")
                })
        },
        // getGroceries({ commit, dispatch }, user) {
        //     api.get('/myPantry/' + user)
        //         .then(res => {
        //             commit("setPantry", res.data)
        //         })
        // },
        addToFavorites({commit, dispatch, state}, recipe){
            api.post('/favorites', recipe)
            .then(res=>{
            commit ('setFavorites', res.data)
            })
            .catch(res => {
                console.log(res.data)
            })
        },
        getFavorites({commit, dispatch, state}){
            api.get('/favorites')
            .then(res=>{
                console.log(res)
                commit ('setFavorites', res.data.favorites)
            })
            .catch(res => {
                console.log(res.data)
            })
        },
        addToGroceryList({commit, dispatch, state}, groceryItems){
            api.put('/api/grocLists/'+state.ActiveGroceryList._id, groceryItems)
            .then(res=>{
            commit ('setGroceryList', res.data)
            })
            .catch(res => {
                console.log(res.data)
            })
        },
        addGroceryList({commit, dispatch, state}, newTitle){
            var newList = {title:newTitle,
            userId:state.user._id}
            api.post('/api/grocLists/', newList)
            .then(res=>{
                commit('setGroceryList', res.data)
            })
            .catch(res => {
                console.log(res.data)
            })
        },
        getGroceryList({commit,dispatch, state}){
            api.get('/api/grocLists/'+ state.user._id)
            .then(res=>{
                console.log(res)
                commit('setGroceryList',res.data)
            })
            .catch(res => {
                console.log(res.data)
            })
        },
        setActiveGroceryList({commit, dispatch}, groceryList){
            commit('setActiveGroceryList', groceryList)
            },
        // deleteFavorite({ commit, dispatch }) {
        //     api.delete('/favorites/:id')
        //         .then(res => {
        //             console.log("Successfully deleted favorite!")
        //             commit('deleteFavorite')
                    
        //         })
        // },
        deleteFavorite ({ commit, dispatch }, id) {
            api.delete('/favorites/'+ id)
            .then(res => {
              dispatch('getFavorites')
            })
            .catch(res => {
                console.log(res.data)
            })
          },
          deleteList ({ commit, dispatch }, id) {
            api.delete('/grocLists/'+ id)
            .then(res => {
              dispatch('getGroceryList')
            })
            .catch(res => {
                console.log(res.data)
            })
          },
                  // Calender Stuff +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        getCalItems({ commit, dispatch, state }, id) {
            api.get('/api/cal/' + id)
                .then(res => {
                    console.log(res)
                    commit('setCalItems', res.data)
                })
                .catch(res => {
                    // alert("err")
                })
        },
        addCalItem({ commit, dispatch,state }, newItem) {
            api.post('/api/cal/', newItem)
                .then(res => {
                    console.log(res)
                    dispatch('getCalItems', state.user._id)
                })
                .catch(res => {
                    alert("err")
                })
        },
        editCalItem({ commit, dispatch,state }, editItem) {
            api.put('/api/cal/' + editItem._id, editItem)
                .then(res => {
                    console.log(res)
                    dispatch('getCalItems', state.user._id)
                })
                .catch(res => {
                    alert("err")
                })
        },
        deleteCalItem({ commit, dispatch, state }, itemId) {
            api.delete('/api/cal/' + itemId)
                .then(res => {
                    console.log(res)
                    dispatch('getCalItems', state.user._id)
                })
                .catch(res => {
                    alert("err")
                })
        }
    }
})
