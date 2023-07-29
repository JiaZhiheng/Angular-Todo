import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css'],
})
export class TodoListItemComponent {
  @Input() todoItem: Todo;
  @Output() changeStateEvent = new EventEmitter<{ event: Event; id: number }>();
  @Output() deleteTodoEvent = new EventEmitter<{
    event: Event;
    id: number;
  }>();

  // 通知父组件更新状态
  emitChangeState(event: Event, id: number): void {
    this.changeStateEvent.emit({ event, id });
  }

  // 通知父组件删除待办事项
  emitDeleteTodo(event: Event, id: number): void {
    this.deleteTodoEvent.emit({ event, id });
  }

  constructor() {
    this.todoItem = {} as Todo;
  }
}
