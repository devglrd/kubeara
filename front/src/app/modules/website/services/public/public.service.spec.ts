import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';

import {PublicService} from './public.service';

describe('[WebsiteModule] PublicService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [PublicService, HttpClient]
  }));

  it('should be created', () => {
    const service: PublicService = TestBed.get(PublicService);
    expect(service).toBeTruthy();
  });
});
