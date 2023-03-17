import { WindowsModule } from './components/windows/windows.module';
import { PagesModule } from './components/pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PagesModule,
    WindowsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
