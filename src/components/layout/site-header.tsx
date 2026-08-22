"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from "react";

import {
  Button,
  ButtonLink,
  Container,
  Logo,
  VisuallyHidden,
} from "@/components/ui";
import { locales, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";
import { getLocalizedPath, replacePathLocale } from "@/i18n/routing";
import {
  getHeaderCtaHref,
  isNavigationPathActive,
} from "@/lib/header-navigation";
import {
  primaryNavigationRoutes,
  secondaryNavigationRoutes,
  type RouteId,
} from "@/lib/routes";

type HeaderLabels = Dictionary["shell"]["header"];
type LocaleLabels = Dictionary["locale"];

export type SiteHeaderProps = Readonly<{
  headerLabels: HeaderLabels;
  locale: Locale;
  localeLabels: LocaleLabels;
  routeLabels: Readonly<Record<RouteId, string>>;
}>;

type NavigationLinkProps = Readonly<{
  active: boolean;
  currentPageLabel: string;
  href: string;
  label: string;
  mobile?: boolean;
  onNavigate?: () => void;
}>;

type LanguageSwitcherProps = Readonly<{
  locale: Locale;
  labels: LocaleLabels;
  onNavigate?: () => void;
  pathname: string;
}>;

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });

  return () => window.removeEventListener("scroll", onStoreChange);
}

function getScrollSnapshot() {
  return window.scrollY > 16;
}

function getServerScrollSnapshot() {
  return false;
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M3 6h18M3 12h18M3 18h18"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="2"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path
        d="m5 5 14 14M19 5 5 19"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="2"
      />
    </svg>
  );
}

function LanguageFlag({ locale }: Readonly<{ locale: Locale }>) {
  if (locale === "de") {
    return (
      <svg
        aria-hidden="true"
        className="h-3 w-[1.125rem] shrink-0 ring-1 ring-current/20"
        viewBox="0 0 18 12"
      >
        <path d="M0 0h18v4H0z" fill="#000" />
        <path d="M0 4h18v4H0z" fill="#dd0000" />
        <path d="M0 8h18v4H0z" fill="#ffce00" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="h-3 w-[1.125rem] shrink-0 ring-1 ring-current/20"
      viewBox="0 0 18 12"
    >
      <path d="M0 0h18v12H0z" fill="#012169" />
      <path d="M0 0l18 12M18 0 0 12" stroke="#fff" strokeWidth="3" />
      <path d="M0 0l18 12M18 0 0 12" stroke="#c8102e" strokeWidth="1.25" />
      <path d="M9 0v12M0 6h18" stroke="#fff" strokeWidth="4" />
      <path d="M9 0v12M0 6h18" stroke="#c8102e" strokeWidth="2.25" />
    </svg>
  );
}

function NavigationLink({
  active,
  currentPageLabel,
  href,
  label,
  mobile = false,
  onNavigate,
}: NavigationLinkProps) {
  const desktopClasses = active
    ? "border-brand text-copy"
    : "border-transparent text-copy-muted hover:border-line hover:text-copy";
  const mobileClasses = active
    ? "border-brand bg-panel-raised text-copy"
    : "border-transparent text-copy-muted hover:bg-panel-raised hover:text-copy";

  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={
        mobile
          ? `flex min-h-12 items-center border-l-4 px-5 py-3 font-display text-2xl font-bold uppercase transition-colors ${mobileClasses}`
          : `flex min-h-11 items-center border-b-2 font-display text-base font-bold tracking-wide uppercase transition-colors ${desktopClasses}`
      }
      href={href}
      onClick={onNavigate}
    >
      {label}
      {active ? <VisuallyHidden> — {currentPageLabel}</VisuallyHidden> : null}
    </Link>
  );
}

function LanguageSwitcher({
  labels,
  locale,
  onNavigate,
  pathname,
}: LanguageSwitcherProps) {
  return (
    <nav aria-label={labels.navigationLabel}>
      <ul className="flex items-center gap-1">
        {locales.map((targetLocale) => {
          const isCurrent = targetLocale === locale;
          const accessibleLabel = isCurrent
            ? `${labels.currentLanguageLabel}: ${labels.currentLanguage}`
            : labels.switchTo[targetLocale];

          return (
            <li key={targetLocale}>
              <Link
                aria-current={isCurrent ? "page" : undefined}
                aria-label={accessibleLabel}
                className={`group inline-flex min-h-10 min-w-[4.5rem] items-center justify-center gap-2 rounded-control px-2 font-display transition-colors ${
                  isCurrent
                    ? "border-2 border-copy bg-copy font-extrabold text-canvas underline decoration-2 underline-offset-4"
                    : "border border-line font-bold text-copy-muted hover:border-copy hover:text-copy"
                }`}
                href={replacePathLocale(pathname, targetLocale)}
                hrefLang={targetLocale}
                lang={targetLocale}
                onClick={onNavigate}
              >
                <span
                  className={`transition-opacity duration-150 motion-reduce:transition-none ${
                    isCurrent
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                  data-language-flag={targetLocale}
                >
                  <LanguageFlag locale={targetLocale} />
                </span>
                {targetLocale.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function SiteHeader({
  headerLabels,
  locale,
  localeLabels,
  routeLabels,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const isScrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerScrollSnapshot,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousOverflowRef = useRef("");
  const homeHref = getLocalizedPath(locale);
  const trialClassHref = getHeaderCtaHref(locale);

  function restorePageScroll() {
    document.documentElement.style.overflow = previousOverflowRef.current;
  }

  function openMenu() {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) {
      return;
    }

    previousOverflowRef.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    dialog.showModal();
    setIsMenuOpen(true);
    closeButtonRef.current?.focus();
  }

  function closeMenu() {
    const dialog = dialogRef.current;

    if (dialog?.open) {
      dialog.close();
    }
  }

  function handleDialogClose() {
    restorePageScroll();
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  }

  function handleDialogClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      closeMenu();
    }
  }

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 80rem)");

    function closeAtDesktopWidth(event: MediaQueryListEvent) {
      if (event.matches) {
        closeMenu();
      }
    }

    desktopQuery.addEventListener("change", closeAtDesktopWidth);

    return () => {
      desktopQuery.removeEventListener("change", closeAtDesktopWidth);
      restorePageScroll();
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        isScrolled || isMenuOpen
          ? "border-line bg-canvas/95 shadow-header backdrop-blur"
          : "border-transparent bg-canvas"
      }`}
      data-menu-open={isMenuOpen ? "true" : "false"}
      data-scrolled={isScrolled ? "true" : "false"}
    >
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            aria-label={headerLabels.homeLinkLabel}
            className="shrink-0 rounded-control"
            href={homeHref}
          >
            <Logo decorative display="header" preload />
          </Link>

          <nav
            aria-label={headerLabels.primaryNavigationLabel}
            className="hidden self-stretch xl:block"
          >
            <ul className="flex h-full items-center gap-5">
              {primaryNavigationRoutes.map((route) => {
                const href = getLocalizedPath(locale, route.path);

                return (
                  <li className="flex h-full items-center" key={route.id}>
                    <NavigationLink
                      active={isNavigationPathActive(
                        pathname,
                        href,
                        route.id === "home",
                      )}
                      currentPageLabel={headerLabels.currentPage}
                      href={href}
                      label={routeLabels[route.id]}
                    />
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <LanguageSwitcher
              labels={localeLabels}
              locale={locale}
              pathname={pathname}
            />
            <ButtonLink href={trialClassHref} size="compact">
              {headerLabels.trialClassAction}
            </ButtonLink>
          </div>

          <div className="xl:hidden">
            <Button
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={openMenu}
              ref={menuButtonRef}
              size="compact"
              variant="ghost"
            >
              <MenuIcon />
              <VisuallyHidden>{headerLabels.openMenu}</VisuallyHidden>
            </Button>
          </div>
        </div>
      </Container>

      <dialog
        aria-labelledby="mobile-menu-title"
        className="mobile-menu-dialog"
        id="mobile-menu"
        onClick={handleDialogClick}
        onClose={handleDialogClose}
        ref={dialogRef}
      >
        <div className="flex h-full flex-col overflow-y-auto overscroll-contain bg-panel">
          <div className="flex h-20 shrink-0 items-center justify-between border-b border-line px-6">
            <p
              className="font-display text-2xl font-extrabold uppercase"
              id="mobile-menu-title"
            >
              {headerLabels.menuTitle}
            </p>
            <Button
              onClick={closeMenu}
              ref={closeButtonRef}
              size="compact"
              variant="ghost"
            >
              <CloseIcon />
              <VisuallyHidden>{headerLabels.closeMenu}</VisuallyHidden>
            </Button>
          </div>

          <div className="flex flex-1 flex-col px-6 py-8">
            <nav aria-label={headerLabels.primaryNavigationLabel}>
              <ul className="space-y-1">
                {primaryNavigationRoutes.map((route) => {
                  const href = getLocalizedPath(locale, route.path);

                  return (
                    <li key={route.id}>
                      <NavigationLink
                        active={isNavigationPathActive(
                          pathname,
                          href,
                          route.id === "home",
                        )}
                        currentPageLabel={headerLabels.currentPage}
                        href={href}
                        label={routeLabels[route.id]}
                        mobile
                        onNavigate={closeMenu}
                      />
                    </li>
                  );
                })}
              </ul>
            </nav>

            <nav
              aria-label={headerLabels.secondaryNavigationLabel}
              className="mt-8 border-t border-line pt-8"
            >
              <ul className="space-y-1">
                {secondaryNavigationRoutes.map((route) => {
                  const href = getLocalizedPath(locale, route.path);

                  return (
                    <li key={route.id}>
                      <NavigationLink
                        active={isNavigationPathActive(pathname, href)}
                        currentPageLabel={headerLabels.currentPage}
                        href={href}
                        label={routeLabels[route.id]}
                        mobile
                        onNavigate={closeMenu}
                      />
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-auto space-y-6 pt-10">
              <ButtonLink href={trialClassHref} stretch>
                {headerLabels.trialClassAction}
              </ButtonLink>
              <LanguageSwitcher
                labels={localeLabels}
                locale={locale}
                onNavigate={closeMenu}
                pathname={pathname}
              />
            </div>
          </div>
        </div>
      </dialog>
    </header>
  );
}
