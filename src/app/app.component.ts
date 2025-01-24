import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './components/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent],
  template: `
    <header>
      <app-toolbar />
    </header>
    <main>
      <router-outlet />
    </main>
  `,
})
export class AppComponent {}
