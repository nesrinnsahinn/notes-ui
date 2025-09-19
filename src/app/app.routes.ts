import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';
import { authGuard } from './core/auth.guard'; 

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'notes', component: NotesComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
