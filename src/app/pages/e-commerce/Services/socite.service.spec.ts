import { TestBed } from '@angular/core/testing';

import { SociteService } from './socite.service';

describe('SociteService', () => {
  let service: SociteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SociteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
