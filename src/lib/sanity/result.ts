export type ContentIssue = Readonly<{
  code: "invalid" | "missingTranslation";
  path: string;
  message: string;
}>;

export type ProjectionResult<T> =
  | Readonly<{ status: "ready"; value: T }>
  | Readonly<{
      status: "missingTranslation" | "invalid";
      issues: readonly ContentIssue[];
    }>;

export type SanityContentResult<T> =
  | Readonly<{ status: "ready"; value: T }>
  | Readonly<{ status: "missing" }>
  | Readonly<{
      status: "missingTranslation" | "invalid";
      issues: readonly ContentIssue[];
    }>
  | Readonly<{
      status: "unavailable";
      reason: "configuration" | "request";
    }>;
