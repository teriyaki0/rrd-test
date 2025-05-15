export function getContinueCombination(missingIndex: number): number[] {
  if (missingIndex === -1) return [1, 1, 1];
  return [0, 0, 0].map((_, index) => (index === missingIndex ? 1 : 0));
}
