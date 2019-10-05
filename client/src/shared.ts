export const GOTCHA_RESULT_QUERY_PARAM_NAME = 'gotchaResult';

const GOTCHA_RESULT_VALUES = ['lose', 'extra-try', 'gotcha-win', 'share'] as const;

export type GotchaResult = typeof GOTCHA_RESULT_VALUES[number];

export function isGotchaResult(str: string | null | undefined): str is GotchaResult {
  return str ? (GOTCHA_RESULT_VALUES as readonly string[]).includes(str) : false;
}
