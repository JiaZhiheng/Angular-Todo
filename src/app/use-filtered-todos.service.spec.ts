import { TestBed } from '@angular/core/testing';

import { UseFilteredTodosService } from './use-filtered-todos.service';

describe('UseFilteredTodosService', () => {
  let service: UseFilteredTodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseFilteredTodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
