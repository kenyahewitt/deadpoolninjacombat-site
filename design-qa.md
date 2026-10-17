# Design QA — Cinematic Combat Motion

## Source material

- Primary visual reference: `/Users/devonhewitt/Pictures/Photos Library.photoslibrary/originals/A/AE932038-E33B-4747-BC69-B3009756FC99.png`
- Action-effects reference: `/Users/devonhewitt/Pictures/Photos Library.photoslibrary/resources/derivatives/masters/C/CA8B3915-C17E-4301-8D5D-2B4B67D6FF8B_4_5005_c.jpeg`
- Motion reference: `/Users/devonhewitt/Downloads/copy_3D16C320-D961-4456-A0D3-CC6ECF7D564E.MOV`
- Finish reference: `/Users/devonhewitt/Downloads/IMG_0106.PNG`
- Implementation: `https://deadpoolninjacombat.store/`

## Verification matrix

| Surface | Viewport / state | Evidence | Result |
| --- | --- | --- | --- |
| Full fight composition | 1280 × 720, opening stance | Side-by-side comparison of the primary reference and implementation | Passed |
| Pyramid action-effects match | 1280 × 720, Rainbow Clan special vs Yellow Ninja | Exact action reference and live prototype captured together in `/private/tmp/dntc-pyramid-action-comparison.jpg` | Passed |
| Action fidelity | 1280 × 720, live combo/special state | Side-by-side comparison of MOV contact sheet and implementation | Passed |
| Tablet landscape | 844 × 390, opening stance | Touch controls, HUD, fighters, and arena all visible | Passed |
| Tablet action layout | 844 × 390, active fight | 844 px scroll width, 844 px viewport, touch actions visible, no horizontal overflow | Passed |
| Finish sequence | 1280 × 720, KO state | Fatality callout, knockdown, result overlay, rematch control | Passed |
| Functional controls | Desktop keyboard and touch UI | Live fight, tag state, special state, rematch, pause | Passed |
| Buffered named combo | 1280 × 720, `J → J → K` | `Shell Shock Rush`, three-hit counter, mastery banner, knockdown, and move readout captured in `/private/tmp/dntc-combat-combo.jpg` | Passed |
| Returning weapon | 1280 × 720, Rainbow Clan special | Transparent shield sprite visibly travels from 32% to 68%, deals an outbound hit, and resolves a recall hit; captured in `/private/tmp/dntc-returning-shield.jpg` | Passed |
| Move guide pause safety | 1280 × 720, active round | Move guide opens over a visible pause overlay and closing it resumes the round | Passed |
| Standard gamepad mapping | Pure input mapping check | Left stick/D-pad, block, light, heavy, special, tag, rage, moves, and pause bindings; held buttons do not retrigger actions | Passed |
| Updated tablet landscape | 844 × 390, opening fight | Eight touch actions present, 844 px viewport and scroll width, no horizontal overflow; captured in `/private/tmp/dntc-mobile-landscape.jpg` | Passed |
| Expanded roster | 1280 × 720, character select | Original four fighters remain intact; Allan and Master Auren add dedicated portraits, full-body animated sprite sheets, signatures, synergies, and themes | Passed |
| Easy CPU round | 1280 × 720, Allan vs Matrix Cap | Long opener, lighter CPU/hazard damage, lowest-rated CPU rivals, `Easy / 0.75× XP` badge | Passed |
| Medium CPU round | 1280 × 720, Master Auren special | Balanced profile, live saber-wave projectile, hit reaction, and `Medium / 1× XP` badge; captured in `/private/tmp/dntc-master-auren-combat.jpg` | Passed |
| Very Difficult CPU round | 1280 × 720, Allan under pressure | Highest-rated CPU team, faster reactions, real buffered combo chain, and `Very Difficult / 1.75× XP` badge; captured in `/private/tmp/dntc-very-difficult-round.jpg` | Passed |
| Updated move guide | 1280 × 720, rules dialog | Easy, Medium, Very Difficult, Allan, and Master Auren instructions all present; opening the guide during combat remains pause-safe | Passed |
| Six-fighter tablet landscape | 844 × 390, Easy round | Allan and the expanded HUD fit with eight touch controls and no horizontal overflow; captured in `/private/tmp/dntc-allan-auren-landscape.jpg` | Passed |
| Online roster compatibility | 1280 × 720, Online 1V1 lobby | All six fighters remain selectable and the CPU difficulty control is correctly hidden online | Passed |
| Ordi Nookie roster integration | 1280 × 720, character select | Seven fighter cards render; Ordi Nookie uses a dedicated square portrait and retains the supplied hat, glasses, pink hoodie, bear markings, and pixel-art identity | Passed |
| Ordi Nookie vs Rasta | 1280 × 720, Medium opening | Ordi Nookie fires two visible cyan/hot-pink eye beams at Rasta Super with the correct special pose and move readout; captured in `/private/tmp/dntc-ordi-vs-rasta-local.jpg` | Passed |
| Ordinal Overload combo | 1280 × 720, Easy round | `L → L → L` buffers three laser hits, resolves the fighter-only named finisher, awards +360 mastery, launches the rival, and preserves the triple-input tracker; captured in `/private/tmp/dntc-ordi-combo-local.jpg` | Passed |
| Ordi Nookie + Rasta team | 1280 × 720, character select | S-tier crossfire synergy and the original `Ordinal Reggae Beam` team theme resolve correctly | Passed |
| Short landscape HUD repair | 844 × 390, Ordi laser hit | Both health bars, centered timer, fighters, effects, eight touch buttons, Moves/audio/pause controls, and footer fit in exactly 844 × 390 with no horizontal or vertical overflow; captured in `/private/tmp/dntc-ordi-mobile-final-local.jpg` | Passed |

## Fidelity findings

- The neon green/magenta health bars, centered round timer, rage tracks, portraits, Matrix rain arena, and bottom control strip match the source composition.
- Fighters use the supplied illustrated raster pose sheets at full-body scale; arms, legs, shields, wings, and weapons visibly change between idle, step, light, heavy, special, block, hit, tag, knockdown, and victory states.
- Heavy and special attacks add forward body movement, hit recoil, knockback, camera impact, combo text, and the `Shocking blow!` callout.
- Pyramid Storm now opens by default with Rainbow Clan vs Yellow Ninja and matches the newest action reference with live rain, embers, corner fire, flying stone, radial weapon streaks, sparks, electric arcs, a localized collision flash, shockwave rings, hit-stop, launch recoil, and a floor-level `SHOCKING BLOW!` callout.
- The effects are rendered by the gameplay canvas and trigger from actual light, heavy, special, block, hazard, and knockout events instead of playing as a non-interactive overlay.
- The KO sequence holds the losing fighter on the ground, keeps the winner active, announces `Fatality!`, and then opens the result overlay.
- Tablet landscape retains full-body fighters and exposes large touch controls without horizontal overflow.
- Real project artwork is used throughout; no placeholder boxes, CSS-drawn fighters, or generated stand-ins were introduced.
- The new transparent shield and razor-hat sprites are real 512 × 512 raster game assets. They spin across the arena and return to their owner instead of appearing as placeholder geometry.
- Four command strings now resolve as named finishers. A two-slot input buffer preserves rapid inputs through attack recovery, while the live tracker teaches the sequence during play.
- Mastery XP, level, best combo, and finisher totals persist locally and give rematches a progression goal.
- The in-game move guide documents keyboard, standard controller, touch, tag, rage, returning weapons, online rooms, and every named combo. Opening it during a round pauses combat safely.
- Allan is an original human counter fighter with an orange/charcoal street-combat design, blue hand wraps, rapid strikes, and a seismic groundbreak special.
- Master Auren is an original cosmic energy-blade master with silver braids, violet robes, a cyan living-light blade, long-range saber pressure, and no visual dependency on an existing franchise character.
- CPU difficulty is now a real gameplay system rather than a label: opponent ratings, opening grace, reaction cadence, movement speed, guard/tag/rage logic, damage, hazard pressure, combo behavior, and mastery rewards scale together.
- The accepted concept and the updated implementation retain the same HUD hierarchy, centered timer, neon green/magenta palette, full-body fighter scale, layered arena effects, and bottom control placement. The requested roster and difficulty controls are deliberate additions below the main title area.
- Ordi Nookie preserves the supplied original pixel-art design and video personality across eight full-body states: guard-ready idle, walking step, straight jab, spinning heavy, twin laser vision, crossed-paw block, airborne recoil, and hat-tip victory.
- His special adds two code-driven traveling laser trails on top of the authored eye-beam sprite, plus a distinct high-frequency Web Audio layer, without replacing the existing special effects for any other fighter.
- `Ordinal Overload` is fighter-gated to Ordi Nookie, so the triple-special input does not rename or alter another character's move. His six possible teammate pairings all have authored synergy copy and original procedural music themes.

## Issue history

1. Initial implementation read too static compared with the reference video.
2. Enlarged fighter stage presence and reduced opening distance.
3. Added pose-specific strike timing, knockback, knockdown, victory, impact shake, combo callouts, and fatality timing.
4. Re-ran full-view, action, finish, and tablet comparisons.
5. No unresolved P0, P1, or P2 visual issues remain.
6. Compared the newest action reference and live 1280 × 720 special-hit state in a single combined image; fighter matchup, pyramid composition, health bars, central energy collision, debris, lightning, and callout all read correctly.
7. Reduced the global hit flash after capture review to keep fighter art crisp while preserving the bright local impact burst.
8. Extended the CPU opening grace period so players can move or strike before CPU pressure begins.
9. Added returning shield and razor-hat projectiles, four named combo finishers, input buffering, persistent mastery progression, and standard gamepad support.
10. Compared the accepted 1280 × 720 concept with the latest finisher capture and checked HUD alignment, fighter scale, health/rage hierarchy, stage depth, combo readability, and bottom control placement.
11. Re-tested the 844 × 390 landscape layout. The full combat viewport, both fighters, health HUD, round timer, and touch strip remain visible with no horizontal overflow.
12. Browser console check returned no warnings or errors. DOM reference, JavaScript syntax, transparent-asset, and pure gamepad-mapping checks passed.
13. Audited the live four-fighter build and found a single hard-coded CPU profile, deterministic opponent selection, hazard-driven difficulty spikes, and no progression scaling between rounds.
14. Preserved the four existing fighter records and added Allan plus Master Auren as self-contained roster entries with dedicated portrait and eight-pose combat art.
15. Added Easy, Medium, and Very Difficult profiles with visible explanations and in-fight reward badges. Easy selects lower-rated rivals; Very Difficult selects the strongest available rivals and can execute buffered named combos.
16. Re-tested new-fighter selection, synergy/theme lookup, Easy survival window, Medium special projectile, Very Difficult combo pressure, difficulty persistence, online lobby compatibility, move-guide copy, and the 844 × 390 landscape layout.
17. Latest browser pass found no console errors, no missing images, no horizontal overflow, and no unresolved P0, P1, or P2 issues.
18. Reviewed the supplied Ordi Nookie JPG and ten-second motion reference. Preserved the top hat, gold/blue glasses, gray-white bear face, pink hoodie, navy shorts, rounded proportions, relaxed walk, fist-up stance, and wave personality.
19. Generated and chroma-keyed a production 4 × 2 transparent sprite sheet, then created a matching square action portrait. Shortened the first generated laser effect so it stays inside the special-animation cell.
20. Added Ordi Nookie as the seventh fighter with Ordinal Laser Vision, Inscription Overdrive, the fighter-only Ordinal Overload combo, all six synergy/theme pairings, new move-guide copy, and a distinct laser sound layer.
21. Browser interaction verified Ordi Nookie's portrait load, seven-card roster, Medium matchup against Rasta Super, two live laser projectiles, S-tier Rasta team pairing, three-hit named combo, +360 mastery reward, and clean console.
22. The 844 × 390 pass exposed an existing short-landscape HUD crop and footer-control collision. Tightened the HUD rows and reserved footer space for touch controls; final dimensions are 844 × 390 with `scrollWidth` 844 and `scrollHeight` 390.

final result: passed
