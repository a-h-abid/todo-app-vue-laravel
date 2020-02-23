<template>
  <div>
    <input type="text" class="input-box" v-model="writeTodo" />
    <button type="button" class="button-post" @click="addTodo">Add</button>
  </div>
</template>

<script>
import TodoService from "../services/TodoService";

export default {
  data() {
    return {
      writeTodo: '',
    };
  },

  methods: {
    addTodo() {
      let text = this.writeTodo.trim();
      if (text == '') {
        return false;
      }

      (new TodoService).postTodo({text: text})
        .then((data) => {
          console.log('resp data', data)
          this.$emit('todo-added', {text});
          this.writeTodo = '';
        })
        .catch((e) => {
          console.error('err', e);
        });
    },
  },
}
</script>

<style scoped>
.input-box {
  box-sizing: border-box;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem;
}
.button-post {
  width: 100%;
  background: #4503fc;
  color: #fff;
  padding: 0.5rem 0;
}
</style>