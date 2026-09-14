import "server-only";

import type {
  AboutEditorialContent,
  FaqItem,
  HomepageEditorialContent,
  SiteEditorialContent,
} from "@/content/editorial";
import type { TeamMember } from "@/content/team";
import type { TrainingClass } from "@/content/training";
import type { Locale } from "@/i18n/config";
import type { MembershipPlan } from "@/lib/bsport/memberships";
import type { MonthlyPass } from "@/lib/bsport/passes";

import { getSanityImageProject } from "./client";
import { fetchSanityQuery } from "./fetch";
import { createSanityImageUrlFactory } from "./images";
import {
  ABOUT_PAGE_QUERY,
  COACHES_QUERY,
  FAQS_QUERY,
  HOMEPAGE_QUERY,
  MEMBERSHIP_CARDS_QUERY,
  MONTHLY_PASS_CARDS_QUERY,
  SITE_SETTINGS_QUERY,
  TRAINING_CLASSES_QUERY,
} from "./queries";
import {
  projectAboutPage,
  projectCoaches,
  projectFaqs,
  projectHomepage,
  projectMembershipCards,
  projectMonthlyPassCards,
  projectSiteSettings,
  projectTrainingClasses,
} from "./projections";
import type { SanityContentResult } from "./result";
import { resolveListProjection, toUnavailableContentResult } from "./state";

export async function getTrainingClassContent(
  locale: Locale,
): Promise<SanityContentResult<readonly TrainingClass[]>> {
  try {
    const documents = await fetchSanityQuery(TRAINING_CLASSES_QUERY, [
      "sanity:classType",
    ]);
    const imageUrl = createSanityImageUrlFactory(getSanityImageProject());

    return resolveListProjection(
      projectTrainingClasses(documents, locale, imageUrl),
    );
  } catch (error) {
    return toUnavailableContentResult(error);
  }
}

export async function getCoachContent(
  locale: Locale,
): Promise<SanityContentResult<readonly TeamMember[]>> {
  try {
    const documents = await fetchSanityQuery(COACHES_QUERY, ["sanity:coach"]);
    const imageUrl = createSanityImageUrlFactory(getSanityImageProject());

    return resolveListProjection(projectCoaches(documents, locale, imageUrl));
  } catch (error) {
    return toUnavailableContentResult(error);
  }
}

export async function getFaqContent(
  locale: Locale,
): Promise<SanityContentResult<readonly FaqItem[]>> {
  try {
    const documents = await fetchSanityQuery(FAQS_QUERY, ["sanity:faq"]);

    return resolveListProjection(projectFaqs(documents, locale));
  } catch (error) {
    return toUnavailableContentResult(error);
  }
}

export async function getMembershipCardContent(
  locale: Locale,
): Promise<SanityContentResult<readonly MembershipPlan[]>> {
  try {
    const documents = await fetchSanityQuery(MEMBERSHIP_CARDS_QUERY, [
      "sanity:membershipCard",
    ]);

    return resolveListProjection(projectMembershipCards(documents, locale));
  } catch (error) {
    return toUnavailableContentResult(error);
  }
}

export async function getMonthlyPassCardContent(
  locale: Locale,
): Promise<SanityContentResult<readonly MonthlyPass[]>> {
  try {
    const documents = await fetchSanityQuery(MONTHLY_PASS_CARDS_QUERY, [
      "sanity:monthlyPassCard",
    ]);

    return resolveListProjection(projectMonthlyPassCards(documents, locale));
  } catch (error) {
    return toUnavailableContentResult(error);
  }
}

export async function getHomepageContent(
  locale: Locale,
): Promise<SanityContentResult<HomepageEditorialContent>> {
  try {
    const document = await fetchSanityQuery(HOMEPAGE_QUERY, [
      "sanity:homepage",
    ]);

    if (!document) {
      return { status: "missing" };
    }

    const imageUrl = createSanityImageUrlFactory(getSanityImageProject());
    return projectHomepage(document, locale, imageUrl);
  } catch (error) {
    return toUnavailableContentResult(error);
  }
}

export async function getAboutPageContent(
  locale: Locale,
): Promise<SanityContentResult<AboutEditorialContent>> {
  try {
    const document = await fetchSanityQuery(ABOUT_PAGE_QUERY, [
      "sanity:aboutPage",
    ]);

    if (!document) {
      return { status: "missing" };
    }

    const imageUrl = createSanityImageUrlFactory(getSanityImageProject());
    return projectAboutPage(document, locale, imageUrl);
  } catch (error) {
    return toUnavailableContentResult(error);
  }
}

export async function getSiteSettingsContent(
  locale: Locale,
): Promise<SanityContentResult<SiteEditorialContent>> {
  try {
    const document = await fetchSanityQuery(SITE_SETTINGS_QUERY, [
      "sanity:siteSettings",
    ]);

    if (!document) {
      return { status: "missing" };
    }

    const imageUrl = createSanityImageUrlFactory(getSanityImageProject());
    return projectSiteSettings(document, locale, imageUrl);
  } catch (error) {
    return toUnavailableContentResult(error);
  }
}
