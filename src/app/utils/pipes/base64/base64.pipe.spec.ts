import { Base64Pipe } from './base64.pipe';

describe('Base64Pipe', () => {
  let underTest: Base64Pipe;

  beforeEach(() => {
    underTest = new Base64Pipe();
  });

  describe('when encoding', () => {
    it('should return provided value transformed into base64', () => {
      const actual = underTest.transform('expected', 'encode');

      expect(actual).toBe('ZXhwZWN0ZWQ=');
    });
  });

  describe('when decoding', () => {
    it('should return provided value transformed from base64', () => {
      const actual = underTest.transform('ZXhwZWN0ZWQ=', 'decode');

      expect(actual).toBe('expected');
    });

    describe('when value is not a string', () => {
      it('should return the value as is', () => {
        const expected = 123;

        const actual = underTest.transform(expected as any, 'decode');

        expect(actual).toBe(expected as any);
      });
    });
  });
});
