import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UseTodosService {
  private apiUrl = 'http://localhost:3000/locations'; // 将此处替换为你的API端点的URL
  private todosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(
    []
  );
  todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  // sortTodos(sourceIndex: number, targetIndex: number): void {}

  /* 获取待办列表 */
  fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  /* 添加待办事项 */
  addTodo(todo: Todo): Observable<Todo[]> {
    return this.http
      .post<Todo>(this.apiUrl, todo)
      .pipe(switchMap(() => this.fetchTodos()));
  }

  /* 删除待办事项 */
  deleteTodo(todoId: number): Observable<Todo[]> {
    const url = `${this.apiUrl}/${todoId}`;
    return this.http
      .delete<Todo[]>(url)
      .pipe(switchMap(() => this.fetchTodos()));
  }

  /* 更新列表状态 */
  changeState(todoId: number, updatedTodo: Todo): Observable<Todo[]> {
    const url = `${this.apiUrl}/${todoId}`;
    return this.http
      .put<Todo>(url, updatedTodo)
      .pipe(switchMap(() => this.fetchTodos()));
  }

  constructor(private http: HttpClient) {
    this.fetchTodos().subscribe((todos: Todo[]) => {
      this.todosSubject.next(todos);
    });
  }
}
