const STORAGE_KEY = "wpq_device_id";

/**
 * Returns a stable per-browser identifier, creating one on first use.
 * Stored in localStorage, so it survives reloads but disappears if the
 * person clears their browser's site data or uses a different browser/device.
 * Not a true device fingerprint \u2014 there's no way for a website to get one \u2014
 * this is just a random token this browser will keep showing us.
 */
export function getOrCreateDeviceId(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing) return existing;

    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `dev-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    window.localStorage.setItem(STORAGE_KEY, id);
    return id;
  } catch {
    // localStorage unavailable (private browsing lockdown, etc.) \u2014 fall back
    // to no device id; that submission just won't be de-duplicated.
    return null;
  }
}
