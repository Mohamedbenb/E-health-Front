import { TestBed } from '@angular/core/testing';

import { ExamensComplementairesService } from './examens-complementaires.service';

describe('ExamensComplementairesService', () => {
  let service: ExamensComplementairesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamensComplementairesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
