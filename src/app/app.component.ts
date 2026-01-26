import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonModule, CardModule, ToastModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  count = 0;

  constructor(private messageService: MessageService) { }

  increment() {
    this.count++;
  }

  decrement() {
    if (this.count <= 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Count cannot go below 0',
      });
      return;
    }
    this.count--;
  }

  reset() {
    this.count = 0;
  }
}
