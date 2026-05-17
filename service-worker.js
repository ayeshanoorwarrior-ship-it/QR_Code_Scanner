self.addEventListener("install", () => {
  console.log("Service worker installed");
});

self.addEventListener("fetch", () => {
  // basic version, no offline cache yet
});