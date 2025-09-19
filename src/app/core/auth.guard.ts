import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');

  if (token) return true; 
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};

// giriş varsa izin ver 
// yoksa login'e yönlendir geldiği sayfayı not et