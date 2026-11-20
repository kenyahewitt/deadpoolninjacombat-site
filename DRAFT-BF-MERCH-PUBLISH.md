# How to publish the Black Friday merch drafts

These merch listings are a **draft only**. They are not on production.

- Branch: `draft/bf-merch-2026` in https://github.com/kenyahewitt/deadpoolninjacombat-site
- Production host: GitHub Pages on `main` → https://deadpoolninjacombat.store
- Do **not** run `netlify deploy --prod`. Do **not** merge until you are ready.

## What was drafted

Promo line: **BLACK FRIDAY: Maximum Effort, Minimum Price — Nov 27–Dec 1.**

1. **"Maximum Effort" Starter Bundle** — $39.99 (compare-at $54.99), ~27% off. Tee + cap + sticker pack.
2. **"Ninja Combat" Training Pack** — $79.99 (compare-at $109.99). Hoodie + training/joggers + water bottle.
3. **"Chimichanga Gift Box"** — $49.99 (compare-at $69.99). Mystery tee, mug, keychain + sticker set, gift-wrapped.

Existing live digital packs (Trench Starter Kit $19, Trap Tape Script Pack $69, Faceless Shorts Raid $179) are unchanged.

## Visibility flag

In `index.html`, `window.BF_MERCH_PUBLISHED = false`.

While this is false, the merch banner and cards stay hidden on deadpoolninjacombat.store. They only render on a Netlify draft preview (`*.netlify.app`).

## Publish steps (Devon)

1. Confirm inventory actually exists for: tee, cap, sticker pack, hoodie, training/joggers, water bottle, mystery tee, mug, keychain, gift wrap. The source draft asked for this check first. No merch inventory was found in the store repo.
2. Decide checkout (the buttons are currently disabled “Draft — not for sale yet”; the live digital packs use a request link to X, and Game Vault checkout is still staged).
3. In `index.html` on this branch, set `window.BF_MERCH_PUBLISHED = true`.
4. Merge `draft/bf-merch-2026` into `main`. GitHub Pages will publish to deadpoolninjacombat.store. After that, merch shows only during the window Nov 27, 2026 12:00 AM ET through Dec 1, 2026 11:59 PM ET.
5. Do not attach the merch preview to the production domain and do not use `netlify deploy --prod`.

Artwork in the draft is original typographic/SVG shapes only (no official Marvel logos or character art).
