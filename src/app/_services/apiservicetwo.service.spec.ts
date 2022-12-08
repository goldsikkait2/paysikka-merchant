import { TestBed } from '@angular/core/testing';

import { ApiservicetwoService } from './apiservicetwo.service';

describe('ApiservicetwoService', () => {
  let service: ApiservicetwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiservicetwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
