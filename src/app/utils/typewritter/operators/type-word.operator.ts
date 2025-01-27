import { interval, map, take } from 'rxjs';

export type TypeWordOpts = Readonly<{
  word: string;
  speed: number;
  backward?: boolean;
}>;

export const typeWord = ({ word, speed, backward }: TypeWordOpts) =>
  interval(speed).pipe(
    map((i) =>
      backward
        ? word.substring(0, word.length - i - 1)
        : word.substring(0, i + 1),
    ),
    take(word.length),
  );
