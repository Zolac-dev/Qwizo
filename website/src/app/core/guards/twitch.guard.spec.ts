import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { twitchGuard } from './twitch.guard';

describe('twitchGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => twitchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
