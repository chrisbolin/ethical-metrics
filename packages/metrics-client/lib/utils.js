export function idle(timeout = 0) {
  return new Promise(resolve => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(resolve, { timeout });
    } else {
      setTimeout(resolve, timeout);
    }
  });
}
