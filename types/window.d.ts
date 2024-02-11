declare namespace global {
  interface Window {
    turnstile: Record<string, unknown>
  }
}

// eslint-disable-next-line
window.turnstile = window.turnstile || {}
