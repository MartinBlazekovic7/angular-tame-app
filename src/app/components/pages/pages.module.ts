import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ProfilePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SettingsPageComponent,
    SearchPageComponent,
  ],
  imports: [CommonModule],
  exports: [
    HomePageComponent,
    ProfilePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SettingsPageComponent,
    SearchPageComponent,
  ],
})
export class PagesModule {}