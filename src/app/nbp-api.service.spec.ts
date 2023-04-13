import { TestBed } from '@angular/core/testing';

import { NbpApiService } from './nbp-api.service';

describe('NbpApiService', () => {
  let service: NbpApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NbpApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
