import { Injectable, inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanMatchFn, Route, UrlSegment } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        if (isAuthenticated){
          router.navigateByUrl('./');
        }
      }),
      map( isAuthenticated => !isAuthenticated)
    )
}

export const canActivatePublicGuard: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot
) => {
console.log('canActivatePublicGuard');
console.log({ route, state });

return checkAuthStatus();
};

export const canMatchPublicGuard: CanMatchFn = ( //Tipado CanMatchFN
route: Route,
segments: UrlSegment[]
) => {
console.log('canMatchPublicGuard');
console.log({ route, segments });

return checkAuthStatus();
};

@Injectable({providedIn: 'root'})
export class PublicGuard {

  constructor() { }

}
