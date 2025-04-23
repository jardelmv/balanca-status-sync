
// This file adds the global property to the Window interface
interface Window {
  global: Window;
}

// For Node.js environments
declare var global: Window;
