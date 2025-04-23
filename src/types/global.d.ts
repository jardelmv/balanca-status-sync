
// This file adds the global property to the Window interface
interface Window {
  global: typeof globalThis;
}

// Make sure global is defined for Node.js environments
declare var global: typeof globalThis;
