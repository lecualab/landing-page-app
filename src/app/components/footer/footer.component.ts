import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventType, Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, map, startWith } from 'rxjs';
import { LinkComponent } from '../common/link';
import { SkeletonComponent } from '../common/skeleton';
import { ContentLayoutComponent } from '../content-layout';
import { SocialNetworkService } from './data-access/social-network';

@Component({
  selector: 'app-footer',
  imports: [
    LinkComponent,
    FaIconComponent,
    TranslatePipe,
    SkeletonComponent,
    ContentLayoutComponent,
  ],
  template: `
    <div class="bg-light-gray py-8">
      <app-content-layout>
        <div class="flex flex-col gap-y-10">
          <div class="flex flex-col gap-y-6">
            <app-link href="/" noStyle class="self-center">
              <h4 class="text-center text-3xl font-semibold text-dark-gray">
                {{ 'project.name' | translate }}
              </h4>
            </app-link>
            <div class="flex items-center justify-center gap-x-8">
              @defer (when socialNetworkService.$hasValue()) {
                @for (
                  socialNetwork of socialNetworkService.$socialNetworks();
                  track socialNetwork.name
                ) {
                  <app-link
                    data-testid="social-network-link"
                    [href]="socialNetwork.url"
                    noStyle
                  >
                    <fa-icon
                      [icon]="socialNetwork.icon"
                      size="lg"
                      class="text-dark-gray"
                    />
                  </app-link>
                }
              } @placeholder {
                <div class="w-40">
                  <app-skeleton height="sm" />
                </div>
              }
            </div>
          </div>
          @if (!$isInContactPage()) {
            <div class="flex flex-col items-center gap-y-6">
              <app-link href="/contact" icon="arrow_forward" class="w-fit">
                {{ 'footer.action' | translate }}
              </app-link>
            </div>
          }
          <div class="flex flex-col items-center gap-y-6">
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
              <p class="text-center text-sm text-gray">
                Made with ❤ by Pududev
              </p>
            </div>
          </div>
        </div>
      </app-content-layout>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly #router = inject(Router);
  protected readonly socialNetworkService = inject(SocialNetworkService);

  protected readonly year = new Date().getUTCFullYear();

  protected readonly $isInContactPage = toSignal(
    this.#router.events.pipe(
      filter((event) => event.type === EventType.NavigationEnd),
      map((event) => event.url),
      startWith(this.#router.url),
      map((url) => url === '/contact'),
    ),
  );
}
