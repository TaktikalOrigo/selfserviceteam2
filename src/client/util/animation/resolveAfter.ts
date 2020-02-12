/**
 * In some cases you want a promise not to resolve/reject earlier than after x amount of
 * time to allow animations to finish.
 *
 * e.g. submit button often have loaders that have a 300ms loading icon transition in.
 * It looks really weird if the loading icon starts animating in and then jumps after 80ms.
 */
export function resolveAfter<T>(delayMs: number, promise: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => promise.then(resolve).catch(reject), delayMs);
  });
}
