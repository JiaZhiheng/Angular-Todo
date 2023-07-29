import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.css'],
})
export class TodoFilterComponent {
  constructor() {}

  @Input() selected = '';
  @Output() changeFilter = new EventEmitter<{
    label: string;
    value: string;
  }>();

  filters: { label: string; value: string }[] = [
    { label: '全部', value: 'all' },
    { label: '已完成', value: 'done' },
    { label: '未完成', value: 'todo' },
  ];

  useFilteredTodos(filter: { label: string; value: string }) {
    this.selected = filter.value;
    this.changeFilter.emit(filter);
  }
}
