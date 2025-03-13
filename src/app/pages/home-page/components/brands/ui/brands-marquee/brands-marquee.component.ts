import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BrandDto } from '../../data-access/brands/dtos';

@Component({
  selector: 'app-brands-marquee',
  imports: [NgOptimizedImage, NgTemplateOutlet],
  template: `
    <div
      data-testid="brands-marquee"
      class="flex justify-center gap-x-9 overflow-hidden"
    >
      @for (i of [0, 1, 2, 3, 4]; track i) {
        <ng-container *ngTemplateOutlet="brands" />
      }
    </div>

    <ng-template #brands>
      <div class="marquee flex w-fit items-center gap-x-9 bg-scroll">
        @for (brand of $brands(); track brand.id) {
          <div
            class="relative flex h-25 w-62 items-center justify-center overflow-hidden rounded-md px-4 py-2 lg:h-25 lg:w-62"
          >
            <picture class="relative h-full w-full grayscale hover:grayscale-0">
              <img [ngSrc]="brand.imageUrl" [alt]="brand.name + ' logo'" fill />
            </picture>
          </div>
        }
      </div>
    </ng-template>
  `,
  styles: `
    .marquee {
      animation: marquee 10s linear infinite normal;

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
