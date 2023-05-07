import { TestBed } from '@angular/core/testing';

import { MalProfService } from './mal-prof.service';

describe('MalProfService', () => {
  let service: MalProfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MalProfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
