import { TestBed } from '@angular/core/testing';

import { ExamService } from './service-exam.service';

describe('ServiceExamService', () => {
  let service: ExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
