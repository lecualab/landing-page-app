import { validateAtLeastOneSelected as underTest } from './at-least-one-selected.validator';

describe('validateAtLeastOneSelected', () => {
  it('should return null when at least one value is selected', () => {
    const actual = underTest({ value: { a: false, b: true } } as any);

    expect(actual).toBeNull();
  });

  it('should return an error when no value is selected', () => {
    const actual = underTest({ value: { a: false, b: false } } as any);

    expect(actual).toEqual({ atLeastOneSelected: true });
  });
});
