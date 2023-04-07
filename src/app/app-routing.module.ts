import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { SearchPageComponent } from './components/pages/search-page/search-page.component';
import { SettingsPageComponent } from './components/pages/settings-page/settings-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './security/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomePageComponent, canActivate: [LoggedInGuard] },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'profile/:username',
    component: ProfilePageComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    canActivate: [LoggedInGuard],
  },
  {
    path: 'search',
    component: SearchPageComponent,
    canActivate: [LoggedInGuard],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
