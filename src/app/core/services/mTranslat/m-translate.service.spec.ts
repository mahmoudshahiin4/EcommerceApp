import { TestBed } from '@angular/core/testing';

import { MTranslateService } from './m-translate.service';

describe('MTranslateService', () => {
  let service: MTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
