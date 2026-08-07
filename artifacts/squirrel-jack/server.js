// Production static server for Squirrel Jack.
// Serves dist/public with correct cache headers:
//   - index.html           → Cache-Control: no-cache (browsers must revalidate)
//   - hashed assets (JS/CSS) → Cache-Control: public, max-age=1yr, immutable
// This prevents the green-screen that happens when browsers cache a stale
// index.html that references Vite chunk filenames that no longer exist.

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT;
if (!PORT) throw new Error("PORT env var is required");

const PUBLIC_DIR = path.resolve(__dirname, "dist/public");

const app = express();

// Long-term cache for everything (Vite hashes all asset filenames)
app.use(
  express.static(PUBLIC_DIR, {
    // Let express.static set its own ETag/Last-Modified headers,
    // but we override Cache-Control below for HTML.
    setHeaders(res, filePath) {
      if (filePath.endsWith(".html")) {
        // Always revalidate HTML so browsers pick up new chunk filenames
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
      } else {
        // Vite content-hashes all JS/CSS/image filenames → safe to cache forever
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    },
  })
);

// SPA fallback — any path that isn't a static file serves index.html
app.get("/{*path}", (_req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Squirrel Jack serving on port ${PORT}`);
});
