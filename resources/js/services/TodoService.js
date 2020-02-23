import HttpClient from "../utils/HttpClient";

class TodoService {

  constructor() {
    this.http = new HttpClient;
  }

  getTodos() {
    return this.http.get('/api/todos');
  }

  postTodo(data = {}) {
    return this.http.post('/api/todos', data);
  }

  toggleTodoCompleted(id) {
    return this.http.patch('/api/todos/'+id);
  }

  deleteTodo(id) {
    return this.http.delete('/api/todos/'+id);
  }
}

export default TodoService;
