<template>
  <div class="text-center">
    
<div class="mt-5 pt-5 row">
  <div class="col">
    <v-calendar :attributes='attributes'>
      <!--=========DAY POPOVER HEADER SLOT=========-->
      <div slot='day-popover-header' slot-scope='{ day }' class='popover-header'>
        {{ getPopoverHeaderLabel(day) }}
      </div>
      <!--===============TODO ROW SLOT==============-->
      <div slot='todo-row' slot-scope='{ customData }' class='todo-row'>

        <!--Todo content-->
        <div class='todo-content'>
          <!--Show textbox when editing todo-->
          <input class='todo-input' v-if='customData.id === editId' v-model='customData.description' @keyup.enter='editId = 0' v-focus-select
          />
          <!--Show status/description when not editing-->
          <span v-else>
            <!--Completed checkbox-->
            <input type='checkbox' v-model='customData.isComplete' />
            <!--Description-->
            <span :class='[
                "todo-description",
                { "complete": customData.isComplete }]' @click='toggleTodoComplete(customData)'>
              {{ customData.description }}
            </span>
          </span>
        </div>
        <!--Edit/Done buttons-->
        <a @click.prevent='toggleTodoEdit(customData)'>
          <!--Edit button-->
          <b-icon v-if='editId !== customData.id' icon='pencil' type='is-info' size='is-small'>
          </b-icon>
          <!--Done button-->
          <b-icon v-else icon='check' type='is-success' size='is-small'>
          </b-icon>
        </a>
        <!--Delete button-->
        <a @click.prevent='deleteTodo(customData)' v-if='!editId || editId !== customData.id' class='delete-todo'>
          <b-icon icon='delete' type='is-danger' size='is-small'>
          </b-icon>
        </a>
      </div>
      <!--================ADD TODO ROW SLOT===============-->
      <div slot='add-todo' slot-scope='{ day }' class='add-todo'>
        <!-- <a @click='addTodo(day)'>
          + Add Todo
        </a> -->
      </div>
    </v-calendar>
  </div>
  <div class="col">
    <!-- add tp calendar -->
    
    <form @submit.prevent="addCalItem">
        <input type="date" v-model="newDate">
        <input type="text" v-model="CalItem">
        <button class="btn btn-info" type="submit">add to cal</button>
      </form>
  </div>
  </div>
    
  </div>
</template>

<script>
  const color = '#ff8080';
  // var todos = this.calItems
  const todos = [
 
  ];

  export default {
    mounted() {
      this.getCalItems(),
      this.newItem.UserId = this.currentUser._id
    },
    data() {
      return {
        CalItem: '',
        newDate: new Date(),
        incId: todos.length,
        editId: 0,
        todos,
        calUpdate: false,
        newItem: {
          description: 'New todo',
          isComplete: false,
          UserId: ''
        }
      };
    },
    computed: {
      calItems() {
        return this.$store.state.calItems
      },
      currentUser() {
        return this.$store.state.user
      },
      attributes() {
        return [
          // Today attribute
          {
            contentStyle: {
              fontWeight: '700',
              color: '#66b3cc',
            },
            dates: new Date(),
          },
          // Todo attributes
          ...this.todos.map(todo => ({
            key: todo.id,
            dates: todo.dates,
            customData: todo,
            order: todo.id,
            dot: {
              backgroundColor: color,
              opacity: todo.isComplete ? 0.3 : 1,
            },
            popover: {
              slot: 'todo-row', // Matches slot from above
              visibility: 'focus',
            }
          })),
          // 'Add Todo' attribute
          {
            contentHoverStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
            },
            dates: {}, // All dates
            popover: {
              slot: 'add-todo',
              visibility: 'focus',
              hideIndicator: true,
            }
          }
        ];

      }
    },
    watch: {
      calItems: function () {
        this.$store.state.calItems.forEach(item => {
          //edit date befor push
          item.dates = new Date(item.dates)
          // todos.push(item)
        });
        this.todos = this.calItems
      },
      currentUser: function(){
        this.getCalItems()
      }
    },
    methods: {
      getCalItems() {
        this.$store.dispatch('getCalItems',this.currentUser._id)
        console.log(todos)
      },
      addCalItem(newItem){
        this.$store.dispatch('addCalItem', newItem)
      },
      toggleTodoComplete(todo) {
        todo.isComplete = !todo.isComplete;
        this.$store.dispatch('editCalItem', todo)
      },
      toggleTodoEdit(todo) {
        this.editId = (this.editId === todo.id) ? 0 : todo.id;
        this.$store.dispatch('editCalItem', todo)
      },
      deleteTodo(todo) {
        this.todos = this.todos.filter(t => t !== todo);
        this.$store.dispatch('deleteCalItem', todo._id)
      },
      getPopoverHeaderLabel(day) {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return day.date.toLocaleDateString(window.navigator.userLanguage || window.navigator.language, options);
      },
      addTodo(day) {
        this.editId = ++this.incId;
        var newTodo = {
          id: this.editId,
          description: 'New todo',
          isComplete: false,
          dates: day.date,
          UserId: this.currentUser._id
      }
        this.addCalItem(newTodo)
        
        this.todos.push(newTodo);
      },
      addCalItem() {
        var dateArr = this.newDate.split("-")
        this.newItem.dates = new Date(Number(dateArr[0]), Number(dateArr[1])-1, Number(dateArr[2]))
        this.newItem.description = this.CalItem
        console.log(dateArr)
        this.$store.dispatch('addCalItem', this.newItem)
        alert("Added to Calendar")
      },
    },
    directives: {
      focusSelect: {
        inserted(el) {
          el.focus();
          el.select();
        }
      }
    }
  };
</script>

<style scoped>
  .popover-header {
    text-align: center;
    padding-bottom: 3px;
    border-bottom: 1px solid #dadada;
    margin: 0 0 3px 0;
    opacity: 0.7;
  }

  .todo-row {
    display: flex;
    flex-wrap: none;
    width: 100%;
  }

  .todo-content {
    flex-grow: 1;
    flex-basis: 0;
    margin-right: 10px;
    min-width: 80px;
  }

  .todo-input {
    width: 100%;
    min-width: 200px;
  }

  .todo-description {
    cursor: pointer;
    transition: all 0.1s ease-in-out;
    margin-left: 3px;
  }

  .todo-description:hover {
    opacity: 0.5;
  }

  .todo-description.complete {
    text-decoration: line-through;
  }

  .add-todo {
    font-size: 0.8rem;
    text-align: center;
    width: 100%;
  }

  .delete-todo {
    margin-left: 3px;
  }
</style>