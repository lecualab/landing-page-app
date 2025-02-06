import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SkeletonComponent } from './components/common/skeleton';
import { FooterComponent } from './components/footer';
import { ToolbarComponent } from './components/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToolbarComponent, FooterComponent, SkeletonComponent],
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
      } @placeholder {
        <app-skeleton height="xl" />
      }
    </footer>
  `,
})
export class AppComponent {}
