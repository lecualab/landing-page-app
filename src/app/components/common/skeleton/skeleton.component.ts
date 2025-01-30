import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';
import {
  NgxSkeletonLoaderComponent,
  NgxSkeletonLoaderConfigTheme,
} from 'ngx-skeleton-loader';
import {
  SkeletonAnimation,
  SkeletonAppearence,
  SkeletonHeight,
  SkeletonHeightValue,
} from './enums';

@Component({
  selector: 'app-skeleton',
  imports: [NgxSkeletonLoaderComponent],
  template: `
    <ngx-skeleton-loader
      data-testid="skeleton"
      [count]="$actualCount()"
      [appearance]="$appearence()"
      [animation]="$animation()"
      [theme]="$skeletonTheme()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  readonly $count = input<number, number>(1, {
    alias: 'count',
    transform: (value) => {
      const count = numberAttribute(value);
      return count > 0 ? count : 1;
    },
  });

  readonly $appearence = input<SkeletonAppearence>(SkeletonAppearence.LINE, {
    alias: 'appearence',
  });

  readonly $animation = input<SkeletonAnimation>(SkeletonAnimation.PULSE, {
    alias: 'animation',
  });

  readonly $height = input<SkeletonHeightValue, SkeletonHeight>(
    SkeletonHeightValue[SkeletonHeight.MD],
    {
      alias: 'height',
      transform: (height) => SkeletonHeightValue[height],
    },
  );

  protected readonly $actualCount = computed(() => {
    if (this.$height() === SkeletonHeightValue[SkeletonHeight.FULL]) return 1;

    return this.$count();
  });

  protected readonly $skeletonTheme = computed<NgxSkeletonLoaderConfigTheme>(
    () => ({
      height: this.$height(),
    }),
  );
}
