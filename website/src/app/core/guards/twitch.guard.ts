import { CanActivateFn } from '@angular/router';
import { inject } from "@angular/core";
import { TwitchService } from '../services/twitch.service';

export const twitchGuard: CanActivateFn = (route, state) => {
  let twService : TwitchService = inject(TwitchService)
  return twService.connected;
};
