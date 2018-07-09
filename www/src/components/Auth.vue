<template>
  <div class="container-fluid d-flex justify-content-center">
  <div class="jumbotron ">
    <h1 class="logoFont">FoodyMcFoodFace</h1>
    <h5 class="logoFont">Hey! It looks like you're trying to do something that is not allowed without signing in. If you would like full access to all of the recipes and be able to save your favorite recipes so that you can view whenever you want! It's a simple process and wont take much time! </h5>
    <div v-if="!logister">

      <form @submit.prevent="login">
        <input type="text" placeholder="Email" v-model="log.email">
        <input type="password" v-model="log.password">
        <button type="submit">login</button>
      </form>
      <p @click="regLog">Don't have a username? Register here</p>
    </div>
   <div v-else>  

     <form @submit.prevent="userRegister" >
       <input type="text" placeholder="Email" v-model="newUser.email">
       <input type="text" placeholder="userName" v-model="newUser.userName">
       <input type="password" placeholder="password" v-model="newUser.password">
       <button type="submit">register</button>
      </form>
      <p @click="regLog">Already a user? Login Here!</p>
   </div>
   
   </div>
  </div>
</template>

<script>
  export default {
    name: 'auth',
    mounted(){
this.$store.dispatch('authenticate')
    },
    data() {
      return {
        logister: false,
        log:{
          email: '',
          password: '',
        },
        newUser:{
          userName: '',
          email: '',
          password: '',
        }

      }
    },
    computed: {
      currentUser(){
        return this.$store.state.user
      }
    },
    methods: {
      login(){
        this.$store.dispatch('login', this.log)
      },
      userRegister(){
        this.$store.dispatch('register', this.newUser)
        this.$store.dispatch('login', this.newUser)
      },
      regLog(){ //toggle between register and login
        this.logister = !this.logister
      }

    }
  }

</script>

<style scoped>
p{
        cursor: pointer;
        color: blue;
        text-decoration: underline;
    }
  html { 
  background: rgb(173, 201, 127); 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.jumbotron{
  text-align: center;
  background: #e5e8d8;
 margin-left: 5rem;
 margin-right: 5rem;
  margin-top: 5rem;
  margin-bottom: auto;
  
  
}
.container-fluid{
  background: rgb(173, 201, 127);
  background-size:cover;
  margin: 0px;
   height: 100%;
   width: 100%;
  
}

.logoFont{
  font-family: 'VT323', monospace;

}

</style>
