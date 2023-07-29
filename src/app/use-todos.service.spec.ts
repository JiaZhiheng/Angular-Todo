import { TestBed } from '@angular/core/testing';

import { UseTodosService } from './use-todos.service';

describe('UseTodosService', () => {
  let service: UseTodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseTodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
