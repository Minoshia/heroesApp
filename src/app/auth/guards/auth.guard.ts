
import { Injectable, inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanMatchFn, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

  const checkAuthStatus = (): boolean | Observable<boolean> => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.checkAuthentication()
      .pipe(
        tap( isAuthenticated => {
          if (!isAuthenticated){
            router.navigateByUrl('./auth/login');
          }
        })
      )
  }

  export const canActivateGuard: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {
  console.log('CanActivate');
  console.log({ route, state });

  return checkAuthStatus();
  };

  export const canMatchGuard: CanMatchFn = ( //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
  ) => {
  console.log('CanMatch');
  console.log({ route, segments });

  return checkAuthStatus();
  };

@Injectable({providedIn: 'root'})
export class AuthGuard {

  constructor() { }

}
