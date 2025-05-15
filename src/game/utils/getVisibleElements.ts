export function getVisibleElements<T>(reel: T[], centerIndex: number): T[] {
  return [reel[(centerIndex - 1 + reel.length) % reel.length], reel[centerIndex], reel[(centerIndex + 1) % reel.length]];
}
