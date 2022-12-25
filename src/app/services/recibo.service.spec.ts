import { TestBed } from '@angular/core/testing';

import { ReciboService } from './recibo.service';

describe('ReciboService', () => {
  let service: ReciboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReciboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
