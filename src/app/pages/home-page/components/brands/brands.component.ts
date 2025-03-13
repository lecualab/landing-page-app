import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SkeletonComponent } from '@app/components/common/skeleton';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxTranslateCutPipe } from 'ngx-translate-cut';
import { BrandsService } from './data-access/brands';
import { BrandsMarqueeComponent } from './ui/brands-marquee';

@Component({
  selector: 'app-brands',
  imports: [
    BrandsMarqueeComponent,
    SkeletonComponent,
    TranslatePipe,
    NgxTranslateCutPipe,
  ],
  template: `
    <section
      data-testid="brands"
      class="mt-16 mb-10 flex flex-col gap-y-4 lg:gap-y-8"
    >
      <h3 class="mb-6 text-center text-2xl font-semibold text-pretty">
        {{ 'home.brands.title' | translate | translateCut: 0 }}
        <span class="font-bold text-accent">
          {{ 'home.brands.title' | translate | translateCut: 1 }}
        </span>
      </h3>

      @if (!brandsService.$isLoading()) {
        <app-brands-marquee [brands]="brandsService.$brands()" />
      } @else {
        <app-skeleton height="lg" />
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsComponent {
  protected readonly brandsService = inject(BrandsService);
}
