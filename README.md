# Zero localised static build

This repository contains a self hosted static build of the interactive Zero experience.

All runtime visual, font, audio, video, model, texture, decoder and UI assets are served from this repository. The original source host is not used at runtime.

The waitlist flow still uses its existing Supabase backend. Explicit navigation links to the main Zero website also remain external by design.

Run `node scripts/verify-local-assets.mjs` to verify local asset completeness and runtime isolation.
