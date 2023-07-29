import { Component, OnInit } from '@angular/core';
import { UseTodosService } from './use-todos.service';
import { Todo } from './todo';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-to-do';
  filter = { label: '全部', value: 'all' };
  todos: Array<Todo> = []; // 完整数据
  filteredTodos: Array<Todo> = []; // 过滤后的数据
  constructor(private useTodosService: UseTodosService) {}

  sortTodos(eventData: { sourceIndex: number; targetIndex: number }) {
    // console.log(eventData);
    // console.log('排序');
    // this.useTodosService
    //   .sortTodos(eventData.sourceIndex, eventData.targetIndex)
    //   .subscribe({
    //     next: (todos: Todo[]) => {
    //       console.log(todos);
    //       this.todos = todos;
    //       this.filteredTodos = this.filterTodoList(this.filter);
    //     },
    //     error: (error) => {
    //       console.error('Error fetching todos:', error);
    //     },
    //   });
  }

  /* 初始化 */
  ngOnInit(): void {
    this.getTodoList();
  }

  /* 获取待办列表 */
  getTodoList(): void {
    this.useTodosService.fetchTodos().subscribe({
      next: (todos: Todo[]) => {
        this.todos = todos;
        this.filteredTodos = this.filterTodoList(this.filter);
      },
      error: (error) => {
        console.error('Error fetching todos:', error);
      },
    });
  }

  /* 添加待办事项 */
  addTodo(data: { id: number; content: string; completed: boolean }) {
    this.useTodosService
      .addTodo({
        userId: 1,
        id: data.id,
        title: data.content,
        completed: data.completed,
      })
      .subscribe({
        next: (res: Todo[]) => {
          this.todos = res;
          this.filteredTodos = this.filterTodoList(this.filter);
        },
        error: (error) => {
          console.error('Error adding todo:', error);
        },
      });
  }

  /* 删除待办事项 */
  deleteTodo(eventData: { event: Event; id: number }) {
    this.useTodosService.deleteTodo(eventData.id).subscribe({
      next: (res: Todo[]) => {
        this.todos = res;
        this.filteredTodos = this.filterTodoList(this.filter);
      },
      error: (error) => {
        console.error('Error deleting todo:', error);
      },
    });
  }

  /* 更新列表状态 */
  changeState(eventData: { event: Event; id: number }) {
    let data = this.todos.find((item) => {
      return item.id === eventData.id;
    });
    if (!data) {
      console.error('Todo not found for ID:', eventData.id);
      return; // Handle the case when data is not found
    }
    data!.completed = (eventData.event.target as HTMLInputElement).checked;
    this.useTodosService.changeState(eventData.id, data as Todo).subscribe({
      next: (res: Todo[]) => {
        this.todos = res;
        this.filteredTodos = this.filterTodoList(this.filter);
      },
      error: (error) => {
        console.error('Error updating todo state:', error);
      },
    });
  }

  /* 切换状态 */
  changeFilter(filter: { label: string; value: string }) {
    console.log('app:切换状态');
    this.filteredTodos = this.filterTodoList(filter);
    this.filter = filter;
  }

  /* 过滤数据 */
  filterTodoList(filter: any) {
    switch (filter.value) {
      case 'done':
        return this.todos.filter((todo) => todo.completed);
      case 'todo':
        return this.todos.filter((todo) => !todo.completed);
      default:
        return this.todos;
    }
  }
}
