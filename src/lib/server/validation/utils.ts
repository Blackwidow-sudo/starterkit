/**
 * Sanitize a URL to ensure it is a local URL.
 */
export function localUrl(url: string, origin: string): string {
  const parsedUrl = new URL(url, origin)

  if (parsedUrl.origin === origin) {
    return parsedUrl.toString()
  }

  return new URL('/', origin).toString()
}