// * /utils/formatStatDisplay.ts * //
export function formatStatDisplay(
  rawValue: number | undefined,
  isPercent: boolean,
  isNegative: boolean
): string {
  const value = typeof rawValue === 'number' && !isNaN(rawValue) ? rawValue : 0;
  const displayValue = isPercent ? value * 100 : value;
  const prefix = isNegative && displayValue > 0 ? '-' : displayValue > 0 ? '+' : '';
  return `${prefix}${displayValue.toFixed(2)}${isPercent ? '%' : ''}`;
}
