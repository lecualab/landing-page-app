import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-copyright',
  imports: [TranslatePipe],
  template: `
    <div data-testid="copyright" class="flex flex-col items-center gap-y-6">
      <div class="h-0.5 w-full max-w-2xl bg-gray"></div>
      <div class="flex flex-col gap-y-4">
        <div>
          <p class="text-center text-sm text-gray">
            &copy; {{ year }} {{ 'project.name' | translate }}
          </p>
          <p class="text-center text-sm text-gray">
            {{ 'footer.allRightsReserved' | translate }}
          </p>
        </div>
        <p class="text-center text-sm text-gray">Made with ❤ by Pududev</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyrightComponent {
  protected readonly year = new Date().getUTCFullYear();
}
