import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent {
  @Input() todos: Array<Todo> = [];

  @Output() addTodo = new EventEmitter<{
    id: number;
    content: string;
    completed: boolean;
  }>();

  constructor() {}
  todoContent: string = '';

  /* 添加待办事项 */
  emitAddTodo() {
    if (!this.todoContent) return; // 输入内容为空时不添加待办事项
    // 添加一个新的待办事项，其id自增
    const newTodo = {
      id: this.todos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1, // 在todos数组中找到最大的id
      content: this.todoContent,
      completed: false,
    };
    // 触发addTodo事件，并传递新的待办事项
    this.addTodo.emit(newTodo);
    // 将todoContent重置为空字符串
    this.todoContent = '';
  }
}
