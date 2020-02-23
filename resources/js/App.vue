<template>
  <div id="vue-app">
    <h1>Todo App</h1>
    <hr />

    <div class="container">
      <todo-input v-on:todo-added="addTodo"></todo-input>

      <hr />

      <todo-list :todoList="todoList"
        v-on:todo-toggled="toggleComplete"
        v-on:todo-deleted="deleteTodo"
      ></todo-list>
    </div>
  </div>
</template>

<script>
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoService from "./services/TodoService";

export default {
  name: 'App',
  components: {
    TodoInput,TodoList
  },
  data() {
    return {
      todoList: []
    };
  },
  mounted() {
    (new TodoService).getTodos()
      .then((resp) => {
        this.todoList = resp.data;
      })
      .catch((e) => {
        console.error('err', e);
      });
  },
  methods: {
    addTodo(e) {
      this.todoList.push({
        text: e.text,
        completed: false,
      });
    },

    toggleComplete(e) {
      if (this.todoList[e]) {
        this.todoList[e].completed = !this.todoList[e].completed;
      }
    },

    deleteTodo(e) {
      if (this.todoList[e]) {
        this.todoList.splice(e, 1);
      }
    },
  },
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  margin: 0 auto;
  width: 480px;
  background: #ddd;
  padding: 0.1rem 0.5rem;
  box-sizing: border-box;
}
.text-left {
  text-align: left;
}
</style>
