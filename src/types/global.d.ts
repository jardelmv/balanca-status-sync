
// This file adds the global property to the Window interface
interface Window {
  global: typeof globalThis;
}

// Make sure global is defined for all environments
declare var global: typeof globalThis;

// Ensure these types are recognized in all environments
interface Global {
  global: typeof globalThis;
}
