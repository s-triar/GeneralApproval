import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ForgetPasswordComponent } from './pages/auth/forget-password/forget-password.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GuestGuard } from './guards/guest.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {
    path: '',
    component: MainNavComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedGuard] },

      { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
      // { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
      { path: 'forget-password', component: ForgetPasswordComponent, canActivate: [GuestGuard] },
      { path: 'list', component: ListComponent, canActivate: [LoggedGuard] },
      { path: 'detail', component: DetailComponent, canActivate: [LoggedGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
