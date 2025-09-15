import { Routes } from '@angular/router';
import { Events } from '@/pages/admin/events/events';
import { Dashboard } from '@/pages/admin/dashboard/dashboard';
import { SignIn } from '@/pages/auth/sign-in/sign-in';
import { ParticipantSignIn } from '@/pages/participant/sign-in/sign-in';
import { Confirm } from './pages/participant/confirm/confirm';
import { AuthGuard } from '@/core/http/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: SignIn,
  },
  {
    path: 'sign-in',
    component: ParticipantSignIn,
  },
  {
    path: 'events',
    component: Events,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/:id',
    component: Dashboard,
    canActivate: [AuthGuard],
  },
  {
    path: 'confirm/:id',
    component: Confirm,
  },
];
