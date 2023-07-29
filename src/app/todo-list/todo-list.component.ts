import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ViewChildren,
  ElementRef,
  AfterViewInit,
  QueryList,
} from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements AfterViewInit {
  @Input() todos: Array<Todo> = [];

  @Output() changeStateEvent = new EventEmitter<{ event: Event; id: number }>();
  @Output() deleteTodoEvent = new EventEmitter<{
    event: Event;
    id: number;
  }>();
  @Output() sortTodosEvent = new EventEmitter<{
    sourceIndex: number;
    targetIndex: number;
  }>();

  @ViewChild('todoList', { static: false }) todoListRef!: ElementRef;
  // 使用 @ViewChildren 获取具有 .todo-item 类名的元素
  @ViewChildren('todoItems', { read: ElementRef })
  todoItemsRef!: QueryList<ElementRef>;

  // 获取TODO列表容器元素
  todoContainer = this.todoListRef as ElementRef;
  // 变量用于存储拖拽源元素
  dragSrcElement: HTMLElement | null = null;

  // 生命周期
  ngAfterViewInit() {
    // 使用 changes 属性监听查询结果的变化
    // 遍历 _results 属性中的元素引用
    this.todoItemsRef.changes.subscribe((items: QueryList<ElementRef>) => {
      items.forEach((item) => {
        item.nativeElement.addEventListener(
          'dragstart',
          this.handleDragStart.bind(this),
          false
        );
        item.nativeElement.addEventListener(
          'dragover',
          this.handleDragOver.bind(this),
          false
        );
        item.nativeElement.addEventListener(
          'dragenter',
          this.handleDragEnter.bind(this),
          false
        );
        item.nativeElement.addEventListener(
          'dragleave',
          this.handleDragLeave.bind(this),
          false
        );
        item.nativeElement.addEventListener(
          'drop',
          this.handleDrop.bind(this),
          false
        );
        item.nativeElement.addEventListener(
          'dragend',
          this.handleDragEnd.bind(this),
          false
        );
      });
    });
  }

  // 处理拖拽开始事件的函数
  handleDragStart(event: DragEvent) {
    console.log('拖拽开始');
    this.dragSrcElement = event.target as HTMLElement;
    // 设置在拖拽期间传输的数据
    event.dataTransfer!.effectAllowed = 'move';
    event.dataTransfer!.setData('text/html', this.dragSrcElement.innerHTML);
    // 添加一个类来表示元素正在被拖拽
    this.dragSrcElement.classList.add('dragging');
  }

  // 处理拖拽过程中的事件
  handleDragOver(event: DragEvent) {
    console.log('拖拽过程中');
    if (event.preventDefault) {
      event.preventDefault(); // 阻止默认行为以允许放置操作
    }
    // 设置dropEffect为'move'，表示可以进行有效的放置操作
    event.dataTransfer!.dropEffect = 'move';
    return false;
  }

  // 处理元素被拖拽进入放置区域的事件
  handleDragEnter() {
    // 添加一个类来表示元素正在被拖拽进入放置区域
    console.log('元素正在被拖拽进入放置区域');
    this.dragSrcElement!.classList.add('over');
  }

  // 处理元素被拖拽离开放置区域的事件
  handleDragLeave() {
    // 当被拖拽的元素离开放置区域时，移除'over'类
    console.log('被拖拽的元素离开放置区域');
    this.dragSrcElement!.classList.remove('over');
  }

  handleDrop(event: DragEvent) {
    console.log('放置事件');
    event.preventDefault(); // Prevent the default behavior to allow dropping

    if (this.dragSrcElement !== null) {
      // Get the IDs of the source and target elements
      const sourceId = this.dragSrcElement.id;
      const targetId = (event.currentTarget as HTMLElement).id;

      // Find the todos corresponding to the source and target IDs
      const sourceTodo = this.todos.find(
        (todo) => todo.id.toString() === sourceId
      );
      const targetTodo = this.todos.find(
        (todo) => todo.id.toString() === targetId
      );

      // Swap the todos only if both source and target todos are found
      if (sourceTodo && targetTodo) {
        // Swap the positions in the array
        const sourceIndex = this.todos.indexOf(sourceTodo);
        const targetIndex = this.todos.indexOf(targetTodo);
        [this.todos[sourceIndex], this.todos[targetIndex]] = [
          this.todos[targetIndex],
          this.todos[sourceIndex],
        ];

        // Emit an event to notify about the change in the order of todos
        this.sortTodosEvent.emit({
          sourceIndex: sourceIndex,
          targetIndex: targetIndex,
        });
      }
    }
  }

  // 处理放置事件的函数
  // handleDrop(event: DragEvent) {
  //   console.log('放置事件');
  //   if (event.stopPropagation) {
  //     event.stopPropagation(); // 阻止一些浏览器的重定向行为
  //   }

  //   if (this.dragSrcElement !== null) {
  //     // 获取拖拽源和目标元素的索引
  //     const sourceIndex = this.todos.findIndex(
  //       (todo) => todo.id.toString() === this.dragSrcElement!.id
  //     );
  //     const targetIndex = this.todos.findIndex(
  //       (todo) => todo.id.toString() === (event.currentTarget as HTMLElement).id
  //     );
  //     console.log(sourceIndex, targetIndex);
  //     if (
  //       sourceIndex !== -1 &&
  //       targetIndex !== -1 &&
  //       sourceIndex !== targetIndex
  //     ) {
  //       this.sortTodosEvent.emit({
  //         sourceIndex: sourceIndex,
  //         targetIndex: targetIndex,
  //       });
  //     }
  //   }

  //   return false;
  // }

  // 处理拖拽结束事件的函数
  handleDragEnd() {
    console.log('拖拽结束');
    // 拖拽结束时，移除'over'和'dragging'类
    this.dragSrcElement!.classList.remove('over');
    this.dragSrcElement!.classList.remove('dragging');
  }

  // 通知父组件更新状态
  emitChangeState(eventData: { event: Event; id: number }) {
    this.changeStateEvent.emit(eventData);
  }

  // 通知父组件删除待办事项
  emitDeleteTodo(eventData: { event: Event; id: number }) {
    this.deleteTodoEvent.emit(eventData);
  }
}
