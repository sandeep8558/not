import { CanMatch, Route, UrlSegment } from '@angular/router';

export class authGuard implements CanMatch {
  constructor() {}

  canMatch(route: Route, segments: UrlSegment[]): boolean {
    return false;
  }

}


