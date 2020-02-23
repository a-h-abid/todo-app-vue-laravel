<template>
  <ul class="text-left list-box">
    <li v-for="(todo,i) in todoList" v-bind:key="i">
      <button class="complete-item" @click="toggleComplete(i)">o</button>
      <button class="delete-item" @click="deleteTodo(i)">x</button>
      <span :class="{'strike-text': todo.completed}"> {{ todo.text }} </span>
    </li>
  </ul>
</template>

<script>
import TodoService from "../services/TodoService";

export default {
  props: {
    todoList: Array,
  },

  methods: {
    toggleComplete(index) {
      if (this.todoList[index]) {
        (new TodoService).toggleTodoCompleted(index)
          .then((data) => {
            console.log('resp data', data)
            this.$emit('todo-toggled', index);
          })
          .catch((e) => {
            console.error('err', e);
          });;
      }
    },

    deleteTodo(index) {
      if (this.todoList[index]) {
        (new TodoService).deleteTodo(index)
          .then((data) => {
            console.log('resp data', data)
            this.$emit('todo-deleted', index);
          })
          .catch((e) => {
            console.error('err', e);
          });
      }
    },
  }
}
</script>

<style scoped>
.list-box {
  list-style: none;
}
.complete-item {
  background-color: green;
  color: white;
  cursor: pointer;
}
.delete-item {
  background-color: red;
  color: white;
  cursor: pointer;
}
.strike-text {
  text-decoration: line-through;
}
</style>