import { Injectable, SimpleChanges } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class UseFilteredTodosService {
  constructor() {}
  useFilteredTodos(filter: string, todos: Array<Todo>) {
    switch (filter) {
      case 'done':
        return todos.filter((todo: Todo) => todo.completed);
      case 'todo':
        return todos.filter((todo: Todo) => !todo.completed);
      default:
        return todos;
    }
  }
}
