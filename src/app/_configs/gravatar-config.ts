import {FALLBACK, GravatarConfig} from 'ngx-gravatar';

export const gravatarConfig: GravatarConfig = {
  fallback: FALLBACK.robohash,
  preferGravatar: false,
  size: 100,
  borderWidth: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  borderColor: 'rgba(0, 0, 0, 0.1)',
  hasBorder: true
};
