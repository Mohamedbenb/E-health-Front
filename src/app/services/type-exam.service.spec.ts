import { TestBed } from '@angular/core/testing';

import { TypeExamService } from './type-exam.service';

describe('TypeExamService', () => {
  let service: TypeExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
