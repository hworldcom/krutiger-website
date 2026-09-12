const bsportOfferEndpoint = "https://api.production.bsport.io/book/v1/offer/";
const berlinTimeZone = "Europe/Berlin";
const upcomingSearchWindowDays = 120;

type Fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

type BsportOffer = Readonly<{
  activityName: string;
  dateStart: string;
  durationMinutes: number;
  id: number;
  levelId: number | null;
}>;

export type NextAvailableClasses = Readonly<{
  classes: readonly BsportOffer[];
  date: string;
}>;

type GetNextAvailableClassesOptions = Readonly<{
  companyId: number;
  fetcher?: Fetcher;
  now?: Date;
  signal?: AbortSignal;
}>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseOffer(value: unknown): BsportOffer | null {
  if (!isRecord(value)) {
    return null;
  }

  const {
    activity_name,
    custom_level,
    date_start,
    duration_minute,
    id,
    level,
  } = value;

  if (
    typeof activity_name !== "string" ||
    typeof date_start !== "string" ||
    typeof duration_minute !== "number" ||
    !Number.isFinite(duration_minute) ||
    typeof id !== "number" ||
    !Number.isFinite(new Date(date_start).getTime())
  ) {
    return null;
  }

  return {
    activityName: activity_name,
    dateStart: date_start,
    durationMinutes: duration_minute,
    id,
    levelId:
      typeof custom_level === "number"
        ? custom_level
        : typeof level === "number"
          ? level
          : null,
  };
}

function parseOffers(payload: unknown) {
  if (!isRecord(payload) || !Array.isArray(payload.results)) {
    throw new Error("The bsport offers response is invalid.");
  }

  return payload.results
    .map(parseOffer)
    .filter((offer): offer is BsportOffer => offer !== null)
    .sort(
      (first, second) =>
        new Date(first.dateStart).getTime() -
        new Date(second.dateStart).getTime(),
    );
}

function getBerlinCalendarDate(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: berlinTimeZone,
    year: "numeric",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function addCalendarDays(calendarDate: string, days: number) {
  const [year, month, day] = calendarDate.split("-").map(Number);
  const shiftedDate = new Date(Date.UTC(year, month - 1, day + days));

  return shiftedDate.toISOString().slice(0, 10);
}

function createOffersUrl(
  companyId: number,
  minDate: string,
  maxDate: string,
  pageSize: number,
) {
  const url = new URL(bsportOfferEndpoint);

  url.search = new URLSearchParams({
    available: "true",
    company: String(companyId),
    max_date: maxDate,
    min_date: minDate,
    only_future_strict: "false",
    page: "1",
    page_size: String(pageSize),
    with_booking_window: "true",
    with_tags: "true",
  }).toString();

  return url;
}

async function requestOffers(fetcher: Fetcher, url: URL, signal?: AbortSignal) {
  const response = await fetcher(url, { signal });

  if (!response.ok) {
    throw new Error(`The bsport offers request failed (${response.status}).`);
  }

  return parseOffers((await response.json()) as unknown);
}

export async function getNextAvailableClasses({
  companyId,
  fetcher = fetch,
  now = new Date(),
  signal,
}: GetNextAvailableClassesOptions): Promise<NextAvailableClasses | null> {
  const today = getBerlinCalendarDate(now);
  const tomorrow = addCalendarDays(today, 1);
  const searchEnd = addCalendarDays(today, upcomingSearchWindowDays);
  const firstUpcomingOffer = await requestOffers(
    fetcher,
    createOffersUrl(companyId, tomorrow, searchEnd, 1),
    signal,
  );

  if (!firstUpcomingOffer[0]) {
    return null;
  }

  const nextDate = firstUpcomingOffer[0].dateStart.slice(0, 10);
  const classes = await requestOffers(
    fetcher,
    createOffersUrl(companyId, nextDate, nextDate, 100),
    signal,
  );
  const classesOnNextDate = classes.filter((offer) =>
    offer.dateStart.startsWith(nextDate),
  );

  if (classesOnNextDate.length === 0) {
    return null;
  }

  return {
    classes: classesOnNextDate,
    date: nextDate,
  };
}

export function formatBsportClassTime(offer: BsportOffer, locale: string) {
  const start = new Date(offer.dateStart);
  const end = new Date(start.getTime() + offer.durationMinutes * 60 * 1_000);
  const formatter = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    timeZone: berlinTimeZone,
  });

  return `${formatter.format(start)} – ${formatter.format(end)}`;
}

export function formatBsportClassDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    timeZone: berlinTimeZone,
    weekday: "long",
  }).format(new Date(`${date}T12:00:00+02:00`));
}
