import { Pipe, PipeTransform } from '@angular/core';
import { Base64Action } from './enums';

@Pipe({ name: 'base64' })
export class Base64Pipe implements PipeTransform {
  transform(value: string, action?: typeof Base64Action.DECODE): string;
  transform(value: unknown, action: typeof Base64Action.ENCODE): string;
  transform(
    value: unknown,
    action: Base64Action = Base64Action.DECODE,
  ): unknown {
    if (action === Base64Action.ENCODE) return btoa(String(value));

    if (typeof value !== 'string') return value;

    return atob(value);
  }
}
