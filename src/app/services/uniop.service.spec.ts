import { TestBed } from '@angular/core/testing';

import { UniopService } from './uniop.service';

describe('UniopService', () => {
  let service: UniopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
