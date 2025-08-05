// * /utils/formatStatDisplay.ts * //
export function formatStatDisplay(
  rawValue: number | undefined,
  isPercent: boolean,
  isNegative: boolean
): string {
  const value = typeof rawValue === 'number' && !isNaN(rawValue) ? rawValue : 0;
  const adjustedValue = isPercent ? value * 100 : value;
  const modifier = isNegative ? -1 : 1;
  const signedValue = adjustedValue * modifier;

  const formatted =
    Number.isInteger(signedValue) ? signedValue.toFixed(0) : signedValue.toFixed(2);

  const sign = modifier >= 0 ? '+' : '-';
  const suffix = isPercent ? '%' : '';

  return `${sign}${formatted}${suffix}`;
}
