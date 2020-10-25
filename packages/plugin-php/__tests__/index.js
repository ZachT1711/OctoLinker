import { PHP_FUNC } from '@octolinker/helper-grammar-regex-collection';
import php from '../index';

describe('php', () => {
  const path = '/blob/path/dummy';

  it('resolves classes', () => {
    expect(php.resolve(path, ['FooBar'])).toEqual({
      registry: 'ping',
      target: 'https://www.php.net/manual/en/class.foobar.php',
    });
  });

  it('resolves functions', () => {
    expect(php.resolve(path, ['Foo_Bar'], {}, PHP_FUNC)).toEqual({
      registry: 'ping',
      target: 'https://www.php.net/manual/en/function.foo-bar.php',
    });
  });

  it('resolves laravel', () => {
    expect(
      php.resolve(path, [
        'Illuminate\\Contracts\\Container\\BindingResolutionException',
      ]),
    ).toEqual({
      registry: 'ping',
      target:
        'https://laravel.com/api/8.x/Illuminate/Contracts/Container/BindingResolutionException.html',
    });
  });

  it('does not try to resolve packages', () => {
    expect(php.resolve(path, ['Foo\\Bar\\Baz'])).toEqual([]);
  });
});
