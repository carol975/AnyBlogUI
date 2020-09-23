import { TestBed } from '@angular/core/testing';

import { NavbarEventService } from './navbar-event.service';

describe('NavbarEventService', () => {
  let service: NavbarEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
