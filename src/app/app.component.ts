import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer';
import { ToolbarComponent } from './components/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, FooterComponent],
  template: `
    <header>
      <app-toolbar />
    </header>
    <main>
      <router-outlet />
    </main>
    <footer>
      @defer {
        <app-footer />
      }
    </footer>
  `,
})
export class AppComponent {}
