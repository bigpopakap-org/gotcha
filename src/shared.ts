export const GOTCHA_RESULT_QUERY_PARAM_NAME = 'gotchaResult';

const GOTCHA_RESULT_VALUES = ['lose', 'extra-spin', 'gotcha-win', 'share'] as const;
export type GotchaResult = typeof GOTCHA_RESULT_VALUES[number];
export function isGotchaResult(str: string | null | undefined): str is GotchaResult {
  // @ts-ignore
  return str && GOTCHA_RESULT_VALUES.includes(str);
}
