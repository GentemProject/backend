import SlugifyLibrary from 'slugify';

export function slugify(string?: string) {
  return SlugifyLibrary(string || '', { lower: true, strict: true });
}
