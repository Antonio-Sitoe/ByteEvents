import { Routes } from '@angular/router';
import { Events } from '@/pages/admin/events/events';
import { Dashboard } from '@/pages/admin/dashboard/dashboard';
import { SignIn } from '@/pages/auth/sign-in/sign-in';
// import { SignIn } from './pages/auth/sign-in/sign-in';

export const routes: Routes = [
  {
    path: '',
    component: Events,
  },
  {
    path: 'sign-in',
    component: SignIn,
  },
  {
    path: 'dashboard/:id',
    component: Dashboard,
  },
];
