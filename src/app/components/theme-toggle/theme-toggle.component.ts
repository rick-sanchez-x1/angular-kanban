import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button
      pButton
      [icon]="themeService.isDarkMode() ? 'pi pi-sun' : 'pi pi-moon'"
      class="p-button-rounded p-button-text"
      (click)="themeService.toggleTheme()"
      [pTooltip]="
        themeService.isDarkMode()
          ? 'Switch to Light Mode'
          : 'Switch to Dark Mode'
      "
      tooltipPosition="bottom"
    ></button>
  `,
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}
}
