import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventType, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { filter, map, startWith } from 'rxjs';
import { LinkComponent } from '../common/link';
import { SkeletonComponent } from '../common/skeleton';
import { ContentLayoutComponent } from '../content-layout';
import { SocialNetworkService } from './data-access/social-network';
import { CopyrightComponent } from './ui/copyright';
import { SocialNetworksComponent } from './ui/social-networks';

@Component({
  selector: 'app-footer',
  imports: [
    LinkComponent,
    TranslatePipe,
    SocialNetworksComponent,
    CopyrightComponent,
    SkeletonComponent,
    ContentLayoutComponent,
  ],
  template: `
    <div class="mt-14 bg-light-gray py-8">
      <app-content-layout>
        <div class="flex flex-col gap-y-10">
          <div class="flex flex-col gap-y-6">
            <app-link href="/" noStyle class="self-center">
              <h4 class="text-center text-3xl font-semibold text-dark-gray">
                {{ 'project.name' | translate }}
              </h4>
            </app-link>
            @if (!socialNetworkService.$isLoading()) {
              <app-social-networks
                [socialNetworks]="socialNetworkService.$socialNetworks()"
              />
            } @else {
              <div class="w-40">
                <app-skeleton height="sm" />
              </div>
            }
          </div>
          @if (!$isInContactPage()) {
            <div class="flex flex-col items-center gap-y-6">
              <app-link
                href="/contact"
                icon="arrow_forward"
                color="secondary"
                class="w-full sm:w-80"
              >
                {{ 'footer.action' | translate }}
              </app-link>
            </div>
          }
          <app-copyright />
        </div>
      </app-content-layout>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly #router = inject(Router);
  protected readonly socialNetworkService = inject(SocialNetworkService);

  protected readonly $isInContactPage = toSignal(
    this.#router.events.pipe(
      filter((event) => event.type === EventType.NavigationEnd),
      map((event) => event.url),
      startWith(this.#router.url),
      map((url) => url === '/contact'),
    ),
  );
}
