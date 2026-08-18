import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Assets } from './assets/assets';
import { Login } from './login/login';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'dashboard',
    component: Dashboard
  },

  {
    path: 'assets',
    component: Assets
  }

];