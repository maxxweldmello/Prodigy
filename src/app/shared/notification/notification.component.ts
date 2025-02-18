import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: `
    <div class="notification">
    <p>User logged in!</p>
    <button class="btn" (click)="closeNotification()">X</button>
    </div>
  `,
  styles: [
    `
      .notification {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        width: 200px;
        border: 1px solid black;
        padding: 0px;
        position: absolute;
        top: 80px;
        right: 10px;
        z-index: 999;
        border-radius: 5px;
      }
    `
  ]
})
export class NotificationComponent {

  constructor(private router: Router) {}

  closeNotification(): void {
    this.router.navigate([{ outlets: { notificationOutlet: null } }]);
  }


}
