import { slugify } from '../';

describe('slugify tests', () => {
  const mock = {
    name: 'Hola Mundo con caracteres extraños, múy ëxtráñōs',
    slug: 'hola-mundo-con-caracteres-extranos-muy-extranos',
  };

  test('should slugify works as expected', () => {
    const slug = slugify(mock.name);

    expect(slug).toBe(mock.slug);
  });
});
