# How to publish the Black Friday merch drafts

These merch listings are a **draft only**. They are not on production.

- Branch: `draft/bf-merch-2026` in https://github.com/kenyahewitt/deadpoolninjacombat-site
- Production host: GitHub Pages on `main` → https://deadpoolninjacombat.store
- Draft preview: https://bf-merch-2026-draft--deadpoolninjacombat.netlify.app
- Do **not** run `netlify deploy --prod`. Do **not** merge until you are ready.

## What was drafted

Promo line: **BLACK FRIDAY: Maximum Effort, Minimum Price — Nov 27–Dec 1.**

1. **"Maximum Effort" Starter Bundle** — $39.99 (compare-at $54.99), ~27% off. Tee + cap + sticker pack.
2. **"Ninja Combat" Training Pack** — $79.99 (compare-at $109.99). Hoodie + training/joggers + water bottle.
3. **"Chimichanga Gift Box"** — $49.99 (compare-at $69.99). Mystery tee, mug, keychain + sticker set, gift-wrapped.

Existing live digital packs (Trench Starter Kit $19, Trap Tape Script Pack $69, Faceless Shorts Raid $179) are unchanged on production until the Cyber Monday add-on is published.

## Cyber Monday add-on (draft, Nov 22 2026)

**Bot Risk Rules Pack** — digital download (PDF + copy-paste example config).

- Standalone list price on this draft: **$12**
- Alternative standalone price, noted on the card but not used: **$9**
- Recommended offer (on by default in the preview toggle): **free with any Black Friday bundle** instead of a discount. “Any bundle” in the draft means the three live digital packs and the three merch bundles.
- Files: `packs/bot-risk-rules-pack.pdf`, `packs/bot-risk-rules-pack.md`, `packs/bot-risk-rules.example.json`, `packs/build_pdf.py`, listing page `bot-risk-rules-pack.html`
- Visibility flag: `window.CM_PACK_PUBLISHED = false` in `index.html` and `bot-risk-rules-pack.html`. While this is false, the add-on stays hidden on deadpoolninjacombat.store and only renders on a Netlify draft preview (`*.netlify.app`).
- If published, the standalone listing is set to show Nov 30, 2026 12:00 AM ET through Dec 1, 2026 11:59 PM ET.
- The preview has a draft-only toggle so you can compare “$12 standalone” vs “$12, or free with any Black Friday bundle.” The toggle will not appear on the live store.
- Buy buttons stay disabled (“Draft — not for sale yet”).
- The PDF is generic starter rules. It has no wallet addresses, keys, or live paths. It is watermarked DRAFT.

Rebuild the PDF after copy edits with:

```
python3 packs/build_pdf.py
```

(Use a venv that has `reportlab` installed.)

## Visibility flag (merch)

In `index.html`, `window.BF_MERCH_PUBLISHED = false`.

While this is false, the merch banner and cards stay hidden on deadpoolninjacombat.store. They only render on a Netlify draft preview (`*.netlify.app`).

## Publish steps (Devon)

1. Confirm inventory actually exists for: tee, cap, sticker pack, hoodie, training/joggers, water bottle, mystery tee, mug, keychain, gift wrap. The source draft asked for this check first. No merch inventory was found in the store repo.
2. For the Bot Risk Rules Pack, pick the standalone price ($12 or $9) and whether it is free with any Black Friday bundle. Then decide checkout (the add-on and merch buttons are currently disabled “Draft — not for sale yet”; the live digital packs use a request link to X, and Game Vault checkout is still staged).
3. In `index.html` (and `bot-risk-rules-pack.html` for the add-on) on this branch, set `window.BF_MERCH_PUBLISHED = true` and/or `window.CM_PACK_PUBLISHED = true` for the parts you want live. Remove the DRAFT watermark from the PDF if you are selling it.
4. Merge `draft/bf-merch-2026` into `main`. GitHub Pages will publish to deadpoolninjacombat.store. After that, merch shows only during the window Nov 27, 2026 12:00 AM ET through Dec 1, 2026 11:59 PM ET, and the Cyber Monday pack shows Nov 30–Dec 1 unless you change those dates.
5. Do not attach the merch preview to the production domain and do not use `netlify deploy --prod`.

Artwork in the draft is original typographic/SVG shapes only (no official Marvel logos or character art).
