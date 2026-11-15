# Agent guide

## Adding an icon

1. Add `icons/<name>.png`: 400x400 px, RGBA, transparent background. File name lowercase, with spaces, dots and slashes replaced by `_` (e.g. `claude_code.png`).
2. Add a row to the table of the matching section in `README.md` (copy an existing row; the URL must point to `refs/heads/main/icons/<name>.png`).
3. Do not touch `src/` — the web generator reads `README.md` from `main`.

There are no tests or lint for icons (CI only publishes the site). Verify with `file icons/<name>.png` (must report `400 x 400, 8-bit/color RGBA`) and by looking at the image.

## Where to get logos

- Prefer the vendor's official brand assets.
- AI tools: `https://unpkg.com/@lobehub/icons-static-png@latest/light/<name>[-color].png` (640 px, transparent) — resize to 400 px, e.g. with Pillow: `Image.open(src).convert("RGBA").resize((400, 400), Image.LANCZOS).save(dst, optimize=True)`.

## Git

- Branch from `origin/HEAD` (`main`); a local clone may sit on a Renovate branch.
- One PR per issue, with `Closes #<n>` in the description.
