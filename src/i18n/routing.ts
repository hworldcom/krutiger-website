import { defaultLocale, isLocale, locales, type Locale } from "./config";

type PathParts = Readonly<{
  pathname: string;
  suffix: string;
}>;

function splitPath(path: string): PathParts {
  const suffixIndex = path.search(/[?#]/);
  const pathname = suffixIndex === -1 ? path : path.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? "" : path.slice(suffixIndex);

  if (pathname === "" || pathname === "/") {
    return { pathname: "/", suffix };
  }

  return {
    pathname: pathname.startsWith("/") ? pathname : `/${pathname}`,
    suffix,
  };
}

export function getPathLocale(path: string): Locale | undefined {
  const { pathname } = splitPath(path);
  const firstSegment = pathname.split("/")[1];

  return firstSegment && isLocale(firstSegment) ? firstSegment : undefined;
}

export function stripLocaleFromPath(path: string): string {
  const { pathname, suffix } = splitPath(path);
  const locale = getPathLocale(pathname);

  if (!locale) {
    return `${pathname}${suffix}`;
  }

  const pathWithoutLocale = pathname.slice(locale.length + 1) || "/";

  return `${pathWithoutLocale}${suffix}`;
}

export function getLocalizedPath(locale: Locale, path = "/"): string {
  const { pathname, suffix } = splitPath(stripLocaleFromPath(path));
  const localizedPath =
    pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  return `${localizedPath}${suffix}`;
}

export function replacePathLocale(path: string, locale: Locale): string {
  return getLocalizedPath(locale, path);
}

export function getLanguageAlternates(path = "/"): Record<string, string> {
  const languageAlternates = Object.fromEntries(
    locales.map((locale) => [locale, getLocalizedPath(locale, path)]),
  );

  return {
    ...languageAlternates,
    "x-default": getLocalizedPath(defaultLocale, path),
  };
}
