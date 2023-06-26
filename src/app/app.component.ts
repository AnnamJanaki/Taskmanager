import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor() {
    window.addEventListener('blur', () => {
      document.title = 'come back to me :(';
    });
    window.addEventListener('focus', () => {
      document.title = 'Taskmanager';
    });
  }
}
