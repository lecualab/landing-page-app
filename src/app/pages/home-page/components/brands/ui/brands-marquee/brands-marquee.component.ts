import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LinkComponent } from '@app/components/common/link';
import { BrandDto } from '../../data-access/brands/dtos';

@Component({
  selector: 'app-brands-marquee',
  imports: [NgOptimizedImage, NgTemplateOutlet, LinkComponent],
  template: `
    <div
      data-testid="brands-marquee"
      class="flex justify-center gap-x-9 overflow-hidden"
    >
      @for (i of [0, 1, 2, 3, 4]; track i) {
        <div
          class="marquee flex w-fit items-center gap-x-9 bg-scroll select-none"
        >
          @for (brand of $brands(); track brand.id) {
            <div
              class="relative flex h-25 w-62 items-center justify-center overflow-hidden rounded-md px-4 py-2 lg:h-25 lg:w-62"
            >
              <picture
                class="relative h-full w-full lg:grayscale lg:hover:grayscale-0"
              >
                @if (brand.websiteUrl) {
                  <app-link noStyle [href]="brand.websiteUrl">
                    <ng-container
                      *ngTemplateOutlet="brandImage; context: { brand }"
                    />
                  </app-link>
                } @else {
                  <ng-container
                    *ngTemplateOutlet="brandImage; context: { brand }"
                  />
                }
              </picture>
            </div>
          }
        </div>
      }
    </div>

    <ng-template #brandImage let-brand="brand">
      <img
        [ngSrc]="brand.imageUrl"
        [alt]="'Logo of a brand called ' + brand.name"
        fill
      />
    </ng-template>
  `,
  styles: `
    .marquee {
      animation: marquee 10s linear infinite;

      @media (min-width: 768px) {
        animation-duration: 20s;

        :host:hover & {
          animation-play-state: paused;
        }
      }
    }

    @keyframes marquee {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsMarqueeComponent {
  readonly $brands = input.required<readonly BrandDto[]>({
    alias: 'brands',
  });
}
