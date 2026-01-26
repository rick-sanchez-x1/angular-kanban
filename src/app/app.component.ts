import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  count = 0;

  constructor(private messageService: MessageService) {}

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
