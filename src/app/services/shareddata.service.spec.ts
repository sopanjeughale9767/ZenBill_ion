import { TestBed } from '@angular/core/testing';

import { ShareddataService } from './shareddata.service';

describe('ShareddataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShareddataService = TestBed.get(ShareddataService);
    expect(service).toBeTruthy();
  });
});
