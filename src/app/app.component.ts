import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  darkTheme?: boolean;
  ngOnInit(): void {
    if (!localStorage.getItem('tameTheme'))
      localStorage.setItem('tameTheme', 'light');

    if (localStorage.getItem('tameTheme') === 'light') this.darkTheme = false;
    else this.darkTheme = true;
  }
}
