import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then(m => m.LoginModule),
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./views/signup/signup.module').then(m => m.SignupModule),
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // useHash: true,
    // scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
