"use strict";

const combatMotionStylesheet = document.createElement("link");
combatMotionStylesheet.rel = "stylesheet";
combatMotionStylesheet.href = "combat-motion.css?v=20261016-full-action-1";
document.head.append(combatMotionStylesheet);

const FIGHTERS = [
  {
    id: "matrix",
    name: "Matrix Cap",
    title: "The Digital Guardian",
    identity: "Low chip / utility & mix-up",
    rating: 1,
    color: "#49ff12",
    image: "assets/characters/matrix-cap.jpeg",
    sprite: "assets/sprites/matrix-sheet.png",
    spriteRatio: 1,
    rageBonus: 2.5,
    weapon: { kind: "shield", name: "Ricochet Shield", asset: "assets/weapons/shield-projectile.png" },
    signature: { name: "Ricochet Shield", damage: 12, chip: 3.5, color: "#49ff12" },
  },
  {
    id: "rasta",
    name: "Rasta Super",
    title: "The Winged Reggae Powerhouse",
    identity: "Medium chip / balanced pressure",
    rating: 3,
    color: "#ffd400",
    image: "assets/characters/rasta-super.jpeg",
    sprite: "assets/sprites/rasta-sheet.png",
    spriteRatio: 1,
    rageBonus: 1.8,
    weapon: { kind: "beam", name: "Solar Heat Beam" },
    signature: { name: "Heat Vision", damage: 14, chip: 4.5, color: "#ff3b24" },
  },
  {
    id: "rainbow",
    name: "Rainbow Clan",
    title: "The Multicolor Hulk",
    identity: "High chip / mid-range bully",
    rating: 4,
    color: "#ff008e",
    image: "assets/characters/rainbow-clan.jpeg",
    sprite: "assets/sprites/rainbow-sheet.png",
    spriteRatio: 1,
    rageBonus: 1,
    weapon: { kind: "shield", name: "Prism Shield Return", asset: "assets/weapons/shield-projectile.png" },
    signature: { name: "Prism Shield Return", damage: 17, chip: 5, color: "#20dcff" },
  },
  {
    id: "yellow",
    name: "Yellow Ninja",
    title: "The Lightning Blade",
    identity: "Oppressive chip / clone pressure",
    rating: 4,
    color: "#20dcff",
    image: "assets/characters/yellow-ninja.jpeg",
    sprite: "assets/sprites/yellow-sheet.png",
    spriteRatio: 1,
    rageBonus: 1,
    weapon: { kind: "hat", name: "Razor Hat Cyclone", asset: "assets/weapons/razor-hat-projectile.png" },
    signature: { name: "Razor Hat Cyclone", damage: 14, chip: 4, color: "#ffd400" },
  },
  {
    id: "allan",
    name: "Allan",
    title: "The Human Champion",
    identity: "Fast hands / counter specialist",
    rating: 2,
    color: "#ff6a00",
    image: "assets/characters/allan-portrait.png",
    sprite: "assets/sprites/allan-sheet.png",
    spriteRatio: 1,
    rageBonus: 2.1,
    weapon: { kind: "beam", name: "Seismic Knuckle Wave" },
    signature: { name: "Human Spirit Groundbreak", damage: 13, chip: 3.2, color: "#ff6a00" },
  },
  {
    id: "auren",
    name: "Master Auren",
    title: "The Jedi Master",
    identity: "Saber reach / cosmic control",
    rating: 5,
    color: "#9b7cff",
    image: "assets/characters/master-auren-portrait.png",
    sprite: "assets/sprites/master-auren-sheet-v3.png",
    spriteRatio: 1,
    rageBonus: 1.4,
    weapon: { kind: "beam", name: "Living Light Saber Wave" },
    signature: { name: "Living Light Saber Wave", damage: 15.5, chip: 4.2, color: "#20dcff" },
  },
  {
    id: "ordi",
    name: "Ordi Nookie",
    title: "The Ordinal Powerhouse",
    identity: "Laser vision / pixel combo pressure",
    rating: 4,
    color: "#ff62c7",
    image: "assets/characters/ordi-nookie-portrait.png",
    sprite: "assets/sprites/ordi-nookie-sheet.png",
    spriteRatio: 1,
    rageBonus: 2.2,
    rageName: "Inscription Overdrive",
    weapon: { kind: "beam", name: "Ordinal Laser Vision", beamStyle: "ordinal" },
    signature: { name: "Ordinal Laser Vision", damage: 15, chip: 4.6, color: "#ff62c7" },
  },
  {
    id: "mutant",
    name: "Ordi Mutant",
    title: "The Gold Ape Mutant",
    identity: "Midas armor / water-mutation shockwaves",
    rating: 5,
    color: "#f7bb2c",
    image: "assets/characters/ordi-mutant-portrait.png",
    sprite: "assets/sprites/ordi-mutant-sheet.png",
    spriteRatio: 1,
    rageBonus: 2.6,
    rageName: "Midas Mutation",
    weapon: { kind: "beam", name: "Midas Mutation Wave", beamStyle: "midas" },
    signature: { name: "Midas Mutation Wave", damage: 16, chip: 4.8, color: "#f7bb2c" },
  },
  {
    id: "duck",
    name: "Gold Armor Ugly Duck",
    title: "The Tactical Gold Duck",
    identity: "Armored rush / golden sonic-smoke pressure",
    rating: 4,
    color: "#d9b247",
    image: "assets/characters/gold-armor-ugly-duck-portrait.png",
    sprite: "assets/sprites/gold-armor-ugly-duck-sheet.png",
    spriteRatio: 1.5,
    rageBonus: 2.3,
    rageName: "Golden Quack Overdrive",
    weapon: { kind: "beam", name: "Golden Sonic Barrage", beamStyle: "duck" },
    signature: { name: "Golden Sonic Barrage", damage: 14.5, chip: 4.4, color: "#d9b247" },
  },
];

function walletAnimationChassis(tokenId) {
  const numeric = Number.parseInt(String(tokenId), 10);
  const index = Number.isFinite(numeric) ? Math.abs(numeric) % FIGHTERS.length : 0;
  return FIGHTERS[index] || FIGHTERS[0];
}

// A verified DNTC selected in the marketplace becomes a local combat skin. It keeps
// the game-balanced Guardian move kit while presenting the holder's own token name/art.
// Ownership is verified in marketplace.html before this record is written.
try {
  const activeWalletFighter = JSON.parse(localStorage.getItem("dntcActiveWalletFighterRecord") || "null");
  const fallbackWalletFighter = JSON.parse(localStorage.getItem("dntcWalletFighter") || "null");
  const storedWalletFighters = JSON.parse(localStorage.getItem("dntcWalletFighters") || "null");
  const savedWalletFighters = Array.isArray(storedWalletFighters) ? storedWalletFighters : (fallbackWalletFighter ? [fallbackWalletFighter] : []);
  const walletFighters = activeWalletFighter
    ? [activeWalletFighter, ...savedWalletFighters.filter((fighter) => String(fighter?.tokenId) !== String(activeWalletFighter.tokenId))]
    : savedWalletFighters;
  walletFighters.slice(0, 20).forEach((savedWalletFighter) => {
    if (!savedWalletFighter?.tokenId || savedWalletFighter?.collection?.toLowerCase() !== "0x59652e80e0103303fcf40911fb41eff022eadee2") return;
    const chassis = walletAnimationChassis(savedWalletFighter.tokenId);
    FIGHTERS.push({
      id: `wallet-dntc-${savedWalletFighter.tokenId}`,
      name: savedWalletFighter.name || `DNTC Fighter #${savedWalletFighter.tokenId}`,
      title: `Wallet fighter · token #${savedWalletFighter.tokenId}`,
      identity: "Holder skin / balanced guardian move kit",
      rating: 4,
      color: "#efff00",
      image: savedWalletFighter.image || "assets/characters/matrix-cap.jpeg",
      sprite: chassis.sprite,
      spriteRatio: chassis.spriteRatio,
      walletArt: savedWalletFighter.image || "assets/characters/matrix-cap.jpeg",
      animationChassis: chassis.id,
      walletSkin: true,
      rageBonus: 2.1,
      rageName: "Holder Overdrive",
      weapon: { kind: "shield", name: "NFT Guardian Shield", asset: "assets/weapons/shield-projectile.png" },
      signature: { name: "Holder Overdrive", damage: 14, chip: 4, color: "#efff00" },
    });
  });
} catch {
  // A malformed browser-only wallet record simply leaves the normal roster intact.
}

function teamWireFormat(team) {
  return team.map((index) => {
    const fighter = FIGHTERS[index];
    return fighter && { id: fighter.id, name: fighter.name, image: fighter.image };
  }).filter(Boolean);
}

function registerWireFighter(entry) {
  if (!entry?.id || typeof entry.id !== "string") return -1;
  const knownIndex = FIGHTERS.findIndex((fighter) => fighter.id === entry.id);
  if (knownIndex >= 0) return knownIndex;
  if (!entry.id.startsWith("wallet-dntc-")) return -1;
  const tokenId = entry.id.replace("wallet-dntc-", "");
  const chassis = walletAnimationChassis(tokenId);
  // Remote holder fighters use the same balanced, deterministic move kit on both clients.
  FIGHTERS.push({
    id: entry.id,
    name: String(entry.name || "DNTC Wallet Fighter").slice(0, 46),
    title: "Remote wallet fighter",
    identity: "Holder skin / balanced guardian move kit",
    rating: 4,
    color: "#efff00",
    image: typeof entry.image === "string" ? entry.image : "assets/characters/matrix-cap.jpeg",
    sprite: chassis.sprite,
    spriteRatio: chassis.spriteRatio,
    walletArt: typeof entry.image === "string" ? entry.image : "assets/characters/matrix-cap.jpeg",
    animationChassis: chassis.id,
    walletSkin: true,
    rageBonus: 2.1,
    rageName: "Holder Overdrive",
    weapon: { kind: "shield", name: "NFT Guardian Shield", asset: "assets/weapons/shield-projectile.png" },
    signature: { name: "Holder Overdrive", damage: 14, chip: 4, color: "#efff00" },
  });
  return FIGHTERS.length - 1;
}

function teamFromWireFormat(entries) {
  if (!Array.isArray(entries) || entries.length !== 2) return [];
  const team = entries.map(registerWireFighter);
  return validTeam(team) ? team : [];
}

const STAGES = [
  {
    id: "matrix",
    short: "Matrix",
    name: "Matrix Code Rain",
    image: "assets/stages/jpeg/matrix-code-rain.jpg",
    accent: "#49ff12",
    hazards: [
      { name: "Cascading Code Streams", damage: 3, chip: 0, effect: "stun", target: "both" },
      { name: "Glitch Blocks", damage: 18, chip: 5, effect: "knockdown" },
      { name: "Agent Silhouette Punch", damage: 11, chip: 0, effect: "stun" },
      { name: "Control Reversal Glitch", damage: 0, chip: 0, effect: "reverse" },
    ],
  },
  {
    id: "void",
    short: "Void",
    name: "Orange Void",
    image: "assets/stages/jpeg/orange-void.jpg",
    accent: "#ff6a00",
    hazards: [
      { name: "Energy Orb Explosion", damage: 14, chip: 4.5, effect: "knockdown" },
      { name: "Gravity Well", damage: 0, chip: 0, effect: "pull", target: "both" },
      { name: "Color Flash Blind", damage: 0, chip: 0, effect: "blind" },
      { name: "Void Rift Teleport", damage: 0, chip: 0, effect: "switch", target: "both" },
    ],
  },
  {
    id: "pyramid",
    short: "Pyramid",
    name: "Pyramid Storm",
    image: "assets/stages/jpeg/pyramid-storm.jpg",
    accent: "#7867ff",
    hazards: [
      { name: "Lightning Strike", damage: 22, chip: 7, effect: "launch" },
      { name: "UFO Tractor Beam", damage: 9, chip: 0, effect: "stun" },
      { name: "Collapsing Pyramid Stone", damage: 16, chip: 0, effect: "knockdown" },
      { name: "Erupting Fire Pit", damage: 15, chip: 4, effect: "burn" },
      { name: "Sandstorm Gust", damage: 0, chip: 0, effect: "push", target: "both" },
    ],
  },
  {
    id: "trench",
    short: "Trench",
    name: "Trench Town Yard",
    image: "assets/stages/jpeg/trench-town-yard.jpg",
    accent: "#20dcff",
    hazards: [
      { name: "Bass Speaker Pulse", damage: 8, chip: 3, effect: "pull", target: "both" },
      { name: "Throwable Yard Debris", damage: 10, chip: 3, effect: "knockdown" },
      { name: "Slippery Wet Ground", damage: 0, chip: 0, effect: "push", target: "both" },
      { name: "Neon Sign Collapse", damage: 15, chip: 0, effect: "knockdown" },
      { name: "Crowd Bottle Toss", damage: 4, chip: 0, effect: "stun" },
    ],
  },
  {
    id: "bitcoin",
    short: "Bitcoin",
    name: "Bitcoin Inscription Realm",
    image: "assets/stages/jpeg/bitcoin-inscription-realm.jpg",
    accent: "#ffad16",
    hazards: [
      { name: "Sliding Inscription Tablet", damage: 17, chip: 5.5, effect: "knockdown" },
      { name: "Hash Surge Wave", damage: 0, chip: 0, effect: "meter", target: "both" },
      { name: "Rune Activation Circle", damage: 9, chip: 0, effect: "stun" },
      { name: "Falling Satoshis", damage: 15, chip: 4.5, effect: "stun" },
      { name: "Inscription Fracture", damage: 12, chip: 0, effect: "launch", target: "both" },
    ],
  },
  {
    id: "boulevard",
    short: "Boulevard",
    name: "Neon Boulevard",
    image: "assets/stages/jpeg/neon-boulevard.jpg",
    accent: "#ff4cc8",
    hazards: [
      { name: "Turbo Lane Shockwave", damage: 12, chip: 3, effect: "push", target: "both" },
      { name: "Streetlight Surge", damage: 9, chip: 0, effect: "stun" },
      { name: "Neon Sign Burst", damage: 16, chip: 4, effect: "knockdown" },
      { name: "Metro Wind Tunnel", damage: 0, chip: 0, effect: "pull", target: "both" },
    ],
  },
];

const STREET_CONTRACTS = Object.freeze([
  { id: "brawler", label: "Street contract: land 6 clean hits", goal: 6, reward: 240, stat: "hits" },
  { id: "showstopper", label: "Street contract: land 2 specials", goal: 2, reward: 300, stat: "specials" },
  { id: "runner", label: "Street contract: collect 2 drops", goal: 2, reward: 260, stat: "pickups" },
]);

const STREET_RIDES = Object.freeze([
  { name: "Matrix Interceptor", speed: 8, grip: 7, armor: 6, nitro: 8 },
  { name: "Rasta Thunder Coupe", speed: 7, grip: 8, armor: 7, nitro: 7 },
  { name: "Rainbow Neon Roadster", speed: 9, grip: 7, armor: 5, nitro: 9 },
  { name: "Yellow Blade Racer", speed: 9, grip: 9, armor: 4, nitro: 8 },
  { name: "Allan Rally Runner", speed: 7, grip: 9, armor: 7, nitro: 6 },
  { name: "Auren Star Cruiser", speed: 8, grip: 8, armor: 6, nitro: 9 },
  { name: "Nookie Goldline", speed: 8, grip: 6, armor: 8, nitro: 8 },
  { name: "Midas Apex", speed: 7, grip: 6, armor: 10, nitro: 6 },
  { name: "Duck Drift Unit", speed: 6, grip: 10, armor: 9, nitro: 7 },
]);
const RACE_RADIO = Object.freeze([
  "Radio: green light. No brakes.",
  "Radio: rival closing in — hold the line.",
  "Radio: nitro is live. Make it count.",
  "Radio: last stretch — own the night.",
  "Radio: traffic ahead. Pick a lane or take their ride.",
  "Radio: checkpoint is hot. Keep moving.",
]);
let raceTrafficId = 0;

const SYNERGIES = {
  "matrix-rasta": ["A-Tier", "Utility creates openings; Rasta converts them into heavy damage."],
  "rainbow-yellow": ["S-Tier", "The strongest chip team: beam pressure layered with clone ambiguity."],
  "matrix-yellow": ["A-Tier", "Teleport and clone pressure make defense difficult to read."],
  "rainbow-rasta": ["B-Tier", "Beam control and flight pressure cover every approach."],
  "matrix-rainbow": ["B-Tier", "Zoning and phase mix-ups give this team two clean ranges."],
  "rasta-yellow": ["C-Tier", "Explosive damage, but both fighters prefer the point position."],
  "allan-matrix": ["A-Tier", "Allan's fast counters convert Matrix utility into clean human-powered pressure."],
  "allan-rasta": ["B-Tier", "Street speed and aerial power create a balanced front-and-back attack."],
  "allan-rainbow": ["A-Tier", "Rainbow absorbs attention while Allan punishes every unsafe swing."],
  "allan-yellow": ["A-Tier", "Human fundamentals steady Yellow Ninja's explosive blade pressure."],
  "allan-auren": ["S-Tier", "Courage and cosmic discipline combine fast counters with total screen control."],
  "auren-matrix": ["S-Tier", "Digital shields and living-light saber reach lock down both combat ranges."],
  "auren-rasta": ["A-Tier", "Air control and saber waves force rivals into punishing crossfire."],
  "auren-rainbow": ["S-Tier", "Heavy prism pressure gives Master Auren room to control the entire arena."],
  "auren-yellow": ["S-Tier", "Twin blade masters overwhelm guards with disciplined alternating pressure."],
  "allan-ordi": ["A-Tier", "Allan's fast counters hold rivals still for Ordi Nookie's twin laser pressure."],
  "auren-ordi": ["S-Tier", "Cosmic discipline and ordinal power create relentless full-screen control."],
  "matrix-ordi": ["A-Tier", "Matrix utility opens safe lanes for Ordi Nookie's laser vision."],
  "ordi-rasta": ["S-Tier", "Twin eye beams and aerial pressure turn every tag into a blazing crossfire."],
  "ordi-rainbow": ["S-Tier", "Rainbow's heavy pressure protects Ordi Nookie while his lasers control the screen."],
  "ordi-yellow": ["A-Tier", "Pixel power and lightning speed overwhelm guards from two different ranges."],
  "mutant-ordi": ["S-Tier", "Midas shockwaves trap rivals inside Ordi Nookie's twin laser lanes."],
  "duck-ordi": ["A-Tier", "Golden sonic pressure gives Ordi Nookie a clean laser-confirm route."],
  "duck-mutant": ["S-Tier", "Gold armor and mutation force form an unstoppable close-range wall."],
  "matrix-mutant": ["A-Tier", "Matrix utility creates the perfect opening for a Midas mutation slam."],
  "mutant-rasta": ["A-Tier", "Water mutation and skyfire beam control cover every escape route."],
  "mutant-rainbow": ["S-Tier", "Prism pressure makes the gold ape's shockwaves nearly impossible to avoid."],
  "mutant-yellow": ["A-Tier", "Lightning speed turns Midas mutation knockdowns into dangerous resets."],
  "allan-mutant": ["A-Tier", "Allan's counters hold the line while Ordi Mutant tears through guards."],
  "auren-mutant": ["S-Tier", "Cosmic blade control funnels rivals into devastating golden shockwaves."],
  "duck-matrix": ["A-Tier", "Digital mix-ups give the tactical duck surprise sonic-burst angles."],
  "duck-rasta": ["B-Tier", "Armored pressure below and skyfire above make a tough defensive shell."],
  "duck-rainbow": ["A-Tier", "The duck's sonic burst locks guards down for Rainbow's heavy offense."],
  "duck-yellow": ["A-Tier", "Sonic armor pressure and lightning blade speed make relentless tag pressure."],
  "allan-duck": ["B-Tier", "Human counterplay and tactical armor give this team reliable defense."],
  "auren-duck": ["A-Tier", "Saber discipline and armored sonic waves punish every reckless approach."],
};

const TEAM_THEMES = {
  "matrix-rasta": { name: "Digital Guardians", bpm: 108, root: 40, scale: [0, 3, 5, 7, 10], bass: [0, 0, 3, 4], melody: [0, 2, 4, 2, 3, 1, 4, 2], wave: "square" },
  "rainbow-yellow": { name: "Chromatic Storm", bpm: 124, root: 42, scale: [0, 2, 3, 7, 9], bass: [0, 3, 4, 2], melody: [4, 3, 1, 2, 4, 2, 3, 0], wave: "sawtooth" },
  "matrix-yellow": { name: "Neon Shadow Protocol", bpm: 118, root: 38, scale: [0, 2, 5, 7, 10], bass: [0, 2, 0, 4], melody: [0, 3, 2, 4, 1, 3, 4, 2], wave: "square" },
  "rainbow-rasta": { name: "Skyfire Spectrum", bpm: 112, root: 41, scale: [0, 3, 5, 8, 10], bass: [0, 0, 4, 3], melody: [2, 4, 3, 1, 2, 3, 4, 1], wave: "triangle" },
  "matrix-rainbow": { name: "Glitch Prism", bpm: 116, root: 39, scale: [0, 1, 5, 7, 10], bass: [0, 2, 4, 1], melody: [0, 4, 2, 3, 1, 4, 3, 2], wave: "square" },
  "rasta-yellow": { name: "Thunder Yard", bpm: 104, root: 43, scale: [0, 2, 5, 7, 9], bass: [0, 3, 0, 4], melody: [0, 2, 3, 4, 2, 1, 3, 2], wave: "triangle" },
  "allan-matrix": { name: "Human Override", bpm: 114, root: 39, scale: [0, 2, 5, 7, 9], bass: [0, 2, 0, 3], melody: [0, 2, 4, 3, 1, 3, 4, 2], wave: "square" },
  "allan-rasta": { name: "Street Skyfire", bpm: 110, root: 42, scale: [0, 3, 5, 7, 10], bass: [0, 3, 0, 4], melody: [1, 3, 4, 2, 0, 2, 4, 3], wave: "triangle" },
  "allan-rainbow": { name: "Prism Uprising", bpm: 122, root: 40, scale: [0, 2, 3, 7, 9], bass: [0, 4, 2, 3], melody: [0, 4, 2, 3, 4, 1, 3, 2], wave: "sawtooth" },
  "allan-yellow": { name: "Mortal Lightning", bpm: 120, root: 41, scale: [0, 2, 5, 7, 10], bass: [0, 2, 4, 0], melody: [3, 1, 4, 2, 0, 3, 4, 1], wave: "square" },
  "allan-auren": { name: "Courage and Light", bpm: 116, root: 38, scale: [0, 2, 5, 7, 9], bass: [0, 0, 3, 4], melody: [0, 2, 4, 3, 2, 1, 3, 4], wave: "triangle" },
  "auren-matrix": { name: "Cosmic Protocol", bpm: 112, root: 37, scale: [0, 3, 5, 7, 10], bass: [0, 2, 0, 4], melody: [4, 2, 3, 1, 4, 0, 3, 2], wave: "square" },
  "auren-rasta": { name: "Living Sky", bpm: 108, root: 40, scale: [0, 2, 5, 8, 10], bass: [0, 3, 4, 0], melody: [2, 4, 3, 1, 0, 3, 4, 2], wave: "triangle" },
  "auren-rainbow": { name: "Infinite Spectrum", bpm: 118, root: 39, scale: [0, 2, 3, 7, 10], bass: [0, 4, 3, 1], melody: [4, 3, 2, 0, 3, 1, 4, 2], wave: "sawtooth" },
  "auren-yellow": { name: "Twin Saber Tempest", bpm: 126, root: 41, scale: [0, 1, 5, 7, 10], bass: [0, 3, 4, 2], melody: [4, 2, 3, 4, 1, 3, 0, 2], wave: "square" },
  "allan-ordi": { name: "Human Inscription", bpm: 116, root: 40, scale: [0, 2, 5, 7, 10], bass: [0, 2, 4, 1], melody: [0, 3, 4, 2, 1, 4, 3, 2], wave: "square" },
  "auren-ordi": { name: "Cosmic Ordinal", bpm: 114, root: 38, scale: [0, 3, 5, 7, 10], bass: [0, 0, 4, 3], melody: [4, 2, 0, 3, 1, 4, 2, 3], wave: "triangle" },
  "matrix-ordi": { name: "Pink Pixel Protocol", bpm: 122, root: 39, scale: [0, 2, 5, 7, 9], bass: [0, 4, 2, 0], melody: [0, 4, 3, 1, 2, 4, 1, 3], wave: "square" },
  "ordi-rasta": { name: "Ordinal Reggae Beam", bpm: 112, root: 42, scale: [0, 3, 5, 7, 10], bass: [0, 0, 3, 4], melody: [2, 4, 3, 1, 0, 3, 4, 2], wave: "triangle" },
  "ordi-rainbow": { name: "Pixel Prism Pressure", bpm: 124, root: 41, scale: [0, 2, 3, 7, 9], bass: [0, 4, 3, 2], melody: [4, 2, 3, 0, 4, 1, 3, 2], wave: "sawtooth" },
  "ordi-yellow": { name: "Inscription Lightning", bpm: 126, root: 40, scale: [0, 1, 5, 7, 10], bass: [0, 3, 4, 1], melody: [3, 4, 2, 0, 4, 1, 3, 2], wave: "square" },
  "mutant-ordi": { name: "Midas Inscription", bpm: 118, root: 37, scale: [0, 3, 5, 7, 10], bass: [0, 2, 4, 1], melody: [4, 2, 0, 3, 1, 4, 3, 2], wave: "sawtooth" },
  "duck-ordi": { name: "Golden Pixel Barrage", bpm: 122, root: 40, scale: [0, 2, 5, 7, 9], bass: [0, 4, 2, 3], melody: [0, 3, 4, 1, 2, 4, 3, 1], wave: "square" },
  "duck-mutant": { name: "Gold Armor Collision", bpm: 114, root: 38, scale: [0, 2, 5, 8, 10], bass: [0, 0, 4, 3], melody: [2, 4, 3, 1, 0, 3, 4, 2], wave: "triangle" },
  "matrix-mutant": { name: "Midas Protocol", bpm: 116, root: 39, scale: [0, 2, 5, 7, 9], bass: [0, 2, 0, 4], melody: [0, 2, 4, 3, 1, 4, 2, 3], wave: "square" },
  "mutant-rasta": { name: "Gold Tide Skyfire", bpm: 110, root: 42, scale: [0, 3, 5, 7, 10], bass: [0, 3, 4, 0], melody: [2, 4, 1, 3, 0, 4, 2, 3], wave: "triangle" },
  "mutant-rainbow": { name: "Prismatic Midas", bpm: 124, root: 41, scale: [0, 2, 3, 7, 9], bass: [0, 4, 3, 2], melody: [4, 2, 3, 0, 4, 1, 3, 2], wave: "sawtooth" },
  "mutant-yellow": { name: "Gold Lightning Mutation", bpm: 126, root: 40, scale: [0, 1, 5, 7, 10], bass: [0, 3, 4, 1], melody: [3, 4, 2, 0, 4, 1, 3, 2], wave: "square" },
  "allan-mutant": { name: "Human Midas Uprising", bpm: 114, root: 39, scale: [0, 2, 5, 7, 9], bass: [0, 2, 4, 1], melody: [0, 3, 4, 2, 1, 4, 3, 2], wave: "square" },
  "auren-mutant": { name: "Golden Cosmic Tide", bpm: 112, root: 37, scale: [0, 3, 5, 7, 10], bass: [0, 0, 4, 3], melody: [4, 2, 0, 3, 1, 4, 2, 3], wave: "triangle" },
  "duck-matrix": { name: "Tactical Data Quack", bpm: 116, root: 38, scale: [0, 2, 5, 7, 9], bass: [0, 2, 0, 3], melody: [0, 2, 4, 3, 1, 3, 4, 2], wave: "square" },
  "duck-rasta": { name: "Gold Yard Smoke", bpm: 108, root: 42, scale: [0, 3, 5, 7, 10], bass: [0, 3, 0, 4], melody: [1, 3, 4, 2, 0, 2, 4, 3], wave: "triangle" },
  "duck-rainbow": { name: "Prism Quack Pressure", bpm: 122, root: 40, scale: [0, 2, 3, 7, 9], bass: [0, 4, 2, 3], melody: [0, 4, 2, 3, 4, 1, 3, 2], wave: "sawtooth" },
  "duck-yellow": { name: "Golden Lightning Guard", bpm: 120, root: 41, scale: [0, 2, 5, 7, 10], bass: [0, 2, 4, 0], melody: [3, 1, 4, 2, 0, 3, 4, 1], wave: "square" },
  "allan-duck": { name: "Human Tactical Gold", bpm: 112, root: 39, scale: [0, 2, 5, 7, 9], bass: [0, 0, 3, 4], melody: [0, 2, 4, 3, 2, 1, 3, 4], wave: "triangle" },
  "auren-duck": { name: "Cosmic Quack Guard", bpm: 118, root: 39, scale: [0, 2, 3, 7, 10], bass: [0, 4, 3, 1], melody: [4, 3, 2, 0, 3, 1, 4, 2], wave: "sawtooth" },
};

const STAGE_MIXES = {
  matrix: { name: "Matrix Mix", bpm: 6, tone: 0 },
  void: { name: "Void Mix", bpm: -5, tone: -2 },
  pyramid: { name: "Storm Mix", bpm: 8, tone: 2 },
  trench: { name: "Yard Mix", bpm: -3, tone: 0 },
  bitcoin: { name: "Inscription Mix", bpm: 4, tone: 4 },
};

const COMBO_MOVES = Object.freeze([
  { sequence: ["light", "light", "heavy"], name: "Shell Shock Rush", bonus: 5, power: "medium", xp: 180 },
  { sequence: ["light", "heavy", "special"], name: "Weapon Storm", bonus: 8, power: "hard", xp: 300 },
  { sequence: ["heavy", "light", "heavy"], name: "Razor Cyclone", bonus: 7, power: "hard", xp: 260 },
  { sequence: ["light", "light", "special"], name: "Ricochet Breaker", bonus: 6, power: "hard", xp: 240 },
  { sequence: ["heavy", "special", "light"], name: "Wanted Level Breaker", bonus: 9, power: "hard", xp: 340, color: "#62efff" },
  { fighter: "ordi", sequence: ["special", "special", "special"], name: "Ordinal Overload", bonus: 10, power: "hard", xp: 360, color: "#ff62c7" },
  { fighter: "mutant", sequence: ["special", "special", "special"], name: "Midas Mutation Cataclysm", bonus: 12, power: "hard", xp: 400, color: "#f7bb2c" },
  { fighter: "duck", sequence: ["special", "special", "special"], name: "Golden Sonic Lockdown", bonus: 11, power: "hard", xp: 380, color: "#d9b247" },
]);

const DIFFICULTY_STORAGE_KEY = "dntc-cpu-difficulty-v1";
const DIFFICULTIES = Object.freeze({
  easy: Object.freeze({
    id: "easy",
    name: "Easy",
    color: "#49ff12",
    description: "Long opening window, slower reactions, lighter enemy damage, and 0.75× mastery rewards.",
    openingGrace: 5200,
    thinkEvery: .32,
    moveSpeed: 11,
    approachChance: .52,
    guardChance: .018,
    tagChance: .016,
    rageChance: .026,
    idleCooldown: 520,
    cooldownScale: 1.48,
    cpuDamage: .72,
    playerDamage: 1.14,
    hazardDamage: .58,
    hazardOpening: 13000,
    hazardDelay: [12600, 17200],
    rewardMultiplier: .75,
    comboChance: 0,
    closeThresholds: [.34, .5, .57],
    midThresholds: [.18, .26],
    farSpecialChance: .045,
  }),
  medium: Object.freeze({
    id: "medium",
    name: "Medium",
    color: "#ffd400",
    description: "Balanced reactions, full damage, and standard mastery rewards.",
    openingGrace: 3300,
    thinkEvery: .16,
    moveSpeed: 16,
    approachChance: .72,
    guardChance: .075,
    tagChance: .035,
    rageChance: .08,
    idleCooldown: 260,
    cooldownScale: 1,
    cpuDamage: 1,
    playerDamage: 1,
    hazardDamage: 1,
    hazardOpening: 7500,
    hazardDelay: [7600, 11800],
    rewardMultiplier: 1,
    comboChance: 0,
    closeThresholds: [.38, .68, .82],
    midThresholds: [.34, .5],
    farSpecialChance: .18,
  }),
  "very-hard": Object.freeze({
    id: "very-hard",
    name: "Very Difficult",
    color: "#ff008e",
    description: "Fast reactions, stronger damage, smart guards, combo chains, and 1.75× mastery rewards.",
    openingGrace: 1800,
    thinkEvery: .09,
    moveSpeed: 22,
    approachChance: .94,
    guardChance: .17,
    tagChance: .085,
    rageChance: .16,
    idleCooldown: 110,
    cooldownScale: .76,
    cpuDamage: 1.2,
    playerDamage: .94,
    hazardDamage: 1.16,
    hazardOpening: 5000,
    hazardDelay: [5200, 7600],
    rewardMultiplier: 1.75,
    comboChance: .42,
    closeThresholds: [.47, .76, .94],
    midThresholds: [.42, .72],
    farSpecialChance: .38,
  }),
});

const ACTION_LABELS = Object.freeze({ light: "PUNCH", heavy: "KICK / BLADE", special: "WEAPON" });

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const now = () => performance.now();

function loadDifficulty() {
  try {
    const saved = localStorage.getItem(DIFFICULTY_STORAGE_KEY);
    return DIFFICULTIES[saved] ? saved : "medium";
  } catch {
    return "medium";
  }
}

function activeDifficulty() {
  return DIFFICULTIES[state?.difficulty] || DIFFICULTIES.medium;
}

const els = {
  universeShell: $(".universe-shell"),
  selectScreen: $("#selectScreen"),
  battleScreen: $("#battleScreen"),
  raceScreen: $("#raceScreen"),
  raceGarage: $("#raceGarage"),
  raceShell: $("#raceShell"),
  fighterGrid: $("#fighterGrid"),
  selectionCount: $("#selectionCount"),
  playerTeamPreview: $("#playerTeamPreview"),
  cpuTeamPreview: $("#cpuTeamPreview"),
  synergyNote: $("#synergyNote"),
  stagePreview: $("#stagePreview"),
  stageName: $("#stageName"),
  stageHazard: $("#stageHazard"),
  stageTabs: $("#stageTabs"),
  fightButton: $("#fightButton"),
  raceButton: $("#raceButton"),
  difficultySelector: $("#difficultySelector"),
  difficultyButtons: $$('[data-difficulty]'),
  difficultyTitle: $("#difficultyTitle"),
  difficultyDescription: $("#difficultyDescription"),
  arena: $("#arena"),
  arenaStageTitle: $("#arenaStageTitle"),
  difficultyBadge: $("#difficultyBadge"),
  playerFighter: $("#playerFighter"),
  cpuFighter: $("#cpuFighter"),
  playerFighterSprite: $("#playerFighterSprite"),
  cpuFighterSprite: $("#cpuFighterSprite"),
  playerPortrait: $("#playerPortrait"),
  cpuPortrait: $("#cpuPortrait"),
  playerTagPortrait: $("#playerTagPortrait"),
  cpuTagPortrait: $("#cpuTagPortrait"),
  playerName: $("#playerName"),
  cpuName: $("#cpuName"),
  playerHealth: $("#playerHealth"),
  cpuHealth: $("#cpuHealth"),
  playerHealthText: $("#playerHealthText"),
  cpuHealthText: $("#cpuHealthText"),
  playerRage: $("#playerRage"),
  cpuRage: $("#cpuRage"),
  roundTimer: $("#roundTimer"),
  announcer: $("#announcer"),
  combatCallout: $("#combatCallout"),
  hazardAlert: $("#hazardAlert"),
  comboCounter: $("#comboCounter"),
  comboBanner: $("#comboBanner"),
  comboTracker: $("#comboTracker"),
  streetHeat: $("#streetHeat"),
  streetContract: $("#streetContract"),
  streetDrops: $("#streetDrops"),
  effectsLayer: $("#effectsLayer"),
  combatFxCanvas: $("#combatFxCanvas"),
  moveReadout: $("#moveReadout"),
  pauseButton: $("#pauseButton"),
  movesButton: $("#movesButton"),
  controllerStatus: $("#controllerStatus"),
  playerTagButton: $("#playerTagButton"),
  pauseOverlay: $("#pauseOverlay"),
  resultOverlay: $("#resultOverlay"),
  resultLabel: $("#resultLabel"),
  resultTitle: $("#resultTitle"),
  resultDetail: $("#resultDetail"),
  resumeButton: $("#resumeButton"),
  quitButton: $("#quitButton"),
  rematchButton: $("#rematchButton"),
  newTeamsButton: $("#newTeamsButton"),
  helpDialog: $("#helpDialog"),
  helpButton: $("#helpButton"),
  closeHelpButton: $("#closeHelpButton"),
  themeName: $("#themeName"),
  previewThemeButton: $("#previewThemeButton"),
  musicVolume: $("#musicVolume"),
  sfxVolume: $("#sfxVolume"),
  musicVolumeOutput: $("#musicVolumeOutput"),
  sfxVolumeOutput: $("#sfxVolumeOutput"),
  audioToggles: $$('[data-audio-toggle]'),
  audioStateLabels: $$('[data-audio-state]'),
  audioMiniLabels: $$('[data-audio-mini]'),
  modeButtons: $$('[data-game-mode]'),
  onlineLobby: $("#onlineLobby"),
  playerNameInput: $("#playerNameInput"),
  hostRoomButton: $("#hostRoomButton"),
  joinRoomButton: $("#joinRoomButton"),
  roomCodeInput: $("#roomCodeInput"),
  roomStatus: $("#roomStatus"),
  roomStatusText: $("#roomStatusText"),
  copyRoomButton: $("#copyRoomButton"),
  localTeamLabel: $("#localTeamLabel"),
  remoteTeamLabel: $("#remoteTeamLabel"),
  profileName: $("#profileName"),
  highScore: $("#highScore"),
  recordSummary: $("#recordSummary"),
  leftPlayerLabel: $("#leftPlayerLabel"),
  rightPlayerLabel: $("#rightPlayerLabel"),
  racePlayerName: $("#racePlayerName"),
  raceCpuName: $("#raceCpuName"),
  raceTimer: $("#raceTimer"),
  raceRadio: $("#raceRadio"),
  racePlayerProgress: $("#racePlayerProgress"),
  raceCpuProgress: $("#raceCpuProgress"),
  racePlayerCar: $("#racePlayerCar"),
  raceRunner: $("#raceRunner"),
  raceRunnerSprite: $("#raceRunnerSprite"),
  raceCpuCar: $("#raceCpuCar"),
  racePlayerRide: $("#racePlayerRide"),
  raceCpuRide: $("#raceCpuRide"),
  racePrompt: $("#racePrompt"),
  quitRaceButton: $("#quitRaceButton"),
  raceTrack: $("#raceTrack"),
  raceTraffic: $("#raceTraffic"),
  raceCheckpoint: $("#raceCheckpoint"),
  checkpointGate: $("#checkpointGate"),
  raceSpeed: $("#raceSpeed"),
  raceArmor: $("#raceArmor"),
  raceHeat: $("#raceHeat"),
  raceScore: $("#raceScore"),
  raceNitro: $("#raceNitro"),
  garageRideRail: $("#garageRideRail"),
  garageSelectedCar: $("#garageSelectedCar"),
  garageRideName: $("#garageRideName"),
  garageStats: $("#garageStats"),
  garageStartButton: $("#garageStartButton"),
  garageFreeDriveButton: $("#garageFreeDriveButton"),
  garageWantedButton: $("#garageWantedButton"),
  garageBackButton: $("#garageBackButton"),
  wantedMission: $("#wantedMission"),
  wantedObjective: $("#wantedObjective"),
  wantedStars: $("#wantedStars"),
  wantedChapter: $("#wantedChapter"),
  jailbreakMeter: $("#jailbreakMeter"),
  jailbreakOverlay: $("#jailbreakOverlay"),
  jailbreakButton: $("#jailbreakButton"),
  jailCopy: $("#jailCopy"),
  jailTimer: $("#jailTimer"),
  jailTimerBar: $("#jailTimerBar"),
};

const state = {
  selected: (() => {
    try {
      const requestedTokenId = new URLSearchParams(window.location.search).get("walletFighter");
      const activeTokenId = requestedTokenId || localStorage.getItem("dntcActiveWalletFighter");
      const walletIndex = FIGHTERS.findIndex((fighter) => fighter.id === `wallet-dntc-${activeTokenId}`);
      if (walletIndex >= 0) return [walletIndex, walletIndex === 0 ? 1 : 0];
    } catch { /* Use the default team when browser storage is unavailable. */ }
    return [2, 0];
  })(),
  stageIndex: 2,
  player: null,
  cpu: null,
  inBattle: false,
  running: false,
  paused: false,
  finished: false,
  seconds: 99,
  lastFrame: 0,
  aiClock: 0,
  hazardNext: 0,
  hazardPending: false,
  hitStopUntil: 0,
  matchScore: 0,
  helpPausedBattle: false,
  matchMode: "cpu",
  difficulty: loadDifficulty(),
  matchId: 0,
  reverseUntil: 0,
  dashUntil: 0,
  dashCooldownUntil: 0,
  race: { active: false, finished: false, garage: false, mode: "circuit", rideIndex: 2, seconds: 90, player: 0, cpu: 0, nitro: 72, cpuNitro: 35, nextRadioAt: 0, speed: 0, x: 50, armor: 100, score: 0, heat: 0, traffic: [], nextTrafficAt: 0, checkpoint: 1, wantedStage: 0, jailed: false, jailSeconds: 8, jailbreak: 0, escapedJail: false, onFoot: false, footY: 72, footMoving: false, keys: { throttle: false, brake: false, left: false, right: false, sprint: false } },
  street: { heat: 0, contract: null, drops: [], nextDropAt: 0 },
  keys: { left: false, right: false, block: false },
  gamepad: {
    index: null,
    connected: false,
    buttons: [],
    left: false,
    right: false,
    block: false,
  },
  online: {
    peer: null,
    connection: null,
    role: null,
    roomCode: "",
    connected: false,
    localReady: false,
    remoteReady: false,
    remoteName: "Rival",
    remoteSelected: [],
    remoteStats: null,
    remoteKeys: { left: false, right: false, block: false },
    snapshotClock: 0,
  },
};

const cinematicFx = {
  canvas: els.combatFxCanvas,
  ctx: null,
  width: 0,
  height: 0,
  dpr: 1,
  stageId: "pyramid",
  lastTime: 0,
  rain: [],
  embers: [],
  debris: [],
  particles: [],
  shockwaves: [],
  arcs: [],
  flashes: [],

  ensureSize() {
    if (!this.canvas) return false;
    const rect = this.canvas.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (width !== this.width || height !== this.height || dpr !== this.dpr) {
      this.width = width;
      this.height = height;
      this.dpr = dpr;
      this.canvas.width = Math.round(width * dpr);
      this.canvas.height = Math.round(height * dpr);
      this.ctx = this.canvas.getContext("2d");
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.seedAtmosphere();
    }
    return Boolean(this.ctx);
  },

  seedAtmosphere() {
    if (!this.width || !this.height) return;
    const pyramid = this.stageId === "pyramid";
    this.rain = Array.from({ length: pyramid ? 82 : 34 }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      length: (pyramid ? 18 : 10) + Math.random() * (pyramid ? 28 : 18),
      speed: (pyramid ? 430 : 250) + Math.random() * 420,
      alpha: .1 + Math.random() * .3,
    }));
    this.embers = Array.from({ length: pyramid ? 34 : 10 }, () => this.makeAmbientEmber(true));
    this.debris = Array.from({ length: pyramid ? 20 : 6 }, () => this.makeAmbientDebris(true));
  },

  makeAmbientEmber(randomY = false) {
    const fromLeft = Math.random() > .5;
    return {
      x: fromLeft ? Math.random() * this.width * .16 : this.width * (.84 + Math.random() * .16),
      y: randomY ? this.height * (.58 + Math.random() * .42) : this.height + 8,
      vx: (Math.random() - .5) * 24,
      vy: -(34 + Math.random() * 82),
      size: 1 + Math.random() * 3.4,
      alpha: .32 + Math.random() * .64,
    };
  },

  makeAmbientDebris(randomY = false) {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height * .78 : -16,
      vx: -32 + Math.random() * 58,
      vy: 38 + Math.random() * 74,
      size: 2 + Math.random() * 8,
      spin: Math.random() * Math.PI,
      spinSpeed: (Math.random() - .5) * 4,
      alpha: .18 + Math.random() * .34,
    };
  },

  setStage(stage) {
    this.stageId = stage.id;
    this.particles.length = 0;
    this.shockwaves.length = 0;
    this.arcs.length = 0;
    this.flashes.length = 0;
    this.ensureSize();
    this.seedAtmosphere();
  },

  burst(xPercent, yPercent, power = "light", color = "#ffd400") {
    if (!this.ensureSize()) return;
    const x = this.width * clamp(xPercent, 0, 100) / 100;
    const y = this.height * clamp(yPercent, 0, 100) / 100;
    const strength = power === "hard" ? 3 : power === "medium" ? 2 : 1;
    const count = 16 + strength * 18;
    const colors = power === "hard"
      ? ["#ffffff", "#7ff8ff", "#9875ff", "#ffd400", color]
      : ["#ffffff", color, power === "medium" ? "#ff8a19" : "#ffd400"];

    for (let index = 0; index < count; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (80 + Math.random() * 250) * (0.72 + strength * .28);
      const life = .22 + Math.random() * (.28 + strength * .09);
      this.particles.push({
        kind: index < count * .42 ? "streak" : index < count * .74 ? "spark" : "stone",
        x,
        y,
        px: x,
        py: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (index % 4 === 0 ? 85 : 0),
        gravity: index < count * .74 ? 170 : 520,
        size: 1.2 + Math.random() * (strength * 3.4),
        life,
        maxLife: life,
        color: colors[index % colors.length],
        rotation: angle,
        spin: (Math.random() - .5) * 12,
      });
    }

    this.shockwaves.push({ x, y, age: 0, life: .28 + strength * .08, radius: 18, color });
    if (strength >= 2) this.shockwaves.push({ x, y, age: -.06, life: .4, radius: 8, color: "#8ff7ff" });
    if (strength === 3) {
      for (let index = 0; index < 5; index += 1) {
        this.arcs.push({
          x,
          y,
          angle: Math.random() * Math.PI * 2,
          reach: this.width * (.09 + Math.random() * .13),
          age: -index * .025,
          life: .24 + Math.random() * .18,
        });
      }
      this.flashes.push({ age: 0, life: .16, color: "#fff7d1", alpha: .2 });
    }
  },

  lightning(xPercent = 50, power = "hard") {
    this.burst(xPercent, 48, power, "#8c69ff");
    if (!this.ensureSize()) return;
    const x = this.width * xPercent / 100;
    this.arcs.push({ x, y: this.height * .52, angle: -Math.PI / 2, reach: this.height * .58, age: 0, life: .34 });
  },

  drawAtmosphere(ctx, dt) {
    const pyramid = this.stageId === "pyramid";
    ctx.save();
    ctx.lineCap = "round";
    this.rain.forEach((drop) => {
      drop.x -= drop.speed * dt * .18;
      drop.y += drop.speed * dt;
      if (drop.y > this.height + drop.length || drop.x < -drop.length) {
        drop.x = Math.random() * this.width * 1.12;
        drop.y = -drop.length;
      }
      ctx.globalAlpha = drop.alpha * (pyramid ? 1 : .48);
      ctx.strokeStyle = pyramid ? "#b9c8ff" : "#55ff80";
      ctx.lineWidth = pyramid ? 1.15 : .8;
      ctx.beginPath();
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x - drop.length * .22, drop.y + drop.length);
      ctx.stroke();
    });

    this.embers.forEach((ember, index) => {
      ember.x += ember.vx * dt;
      ember.y += ember.vy * dt;
      ember.alpha -= dt * .1;
      if (ember.y < this.height * .48 || ember.alpha <= .04) this.embers[index] = this.makeAmbientEmber(false);
      ctx.globalAlpha = ember.alpha * (pyramid ? 1 : .32);
      ctx.fillStyle = index % 3 ? "#ff7017" : "#ffe05d";
      ctx.shadowColor = "#ff3600";
      ctx.shadowBlur = pyramid ? 8 : 3;
      ctx.beginPath();
      ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.shadowBlur = 0;

    this.debris.forEach((piece, index) => {
      piece.x += piece.vx * dt;
      piece.y += piece.vy * dt;
      piece.spin += piece.spinSpeed * dt;
      if (piece.y > this.height + 18 || piece.x < -20 || piece.x > this.width + 20) this.debris[index] = this.makeAmbientDebris(false);
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate(piece.spin);
      ctx.globalAlpha = piece.alpha * (pyramid ? 1 : .3);
      ctx.fillStyle = index % 4 === 0 ? "#9a7861" : "#211d24";
      ctx.fillRect(-piece.size / 2, -piece.size / 3, piece.size, piece.size * .66);
      ctx.restore();
    });
    ctx.restore();
  },

  drawBursts(ctx, dt) {
    this.flashes = this.flashes.filter((flash) => {
      flash.age += dt;
      if (flash.age >= flash.life) return false;
      ctx.save();
      ctx.globalAlpha = flash.alpha * (1 - flash.age / flash.life);
      ctx.fillStyle = flash.color;
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.restore();
      return true;
    });

    this.shockwaves = this.shockwaves.filter((wave) => {
      wave.age += dt;
      if (wave.age < 0) return true;
      if (wave.age >= wave.life) return false;
      const progress = wave.age / wave.life;
      ctx.save();
      ctx.globalAlpha = (1 - progress) * .95;
      ctx.strokeStyle = wave.color;
      ctx.shadowColor = wave.color;
      ctx.shadowBlur = 20;
      ctx.lineWidth = Math.max(1, 7 * (1 - progress));
      ctx.beginPath();
      ctx.arc(wave.x, wave.y, wave.radius + progress * this.width * .115, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      return true;
    });

    this.arcs = this.arcs.filter((arc) => {
      arc.age += dt;
      if (arc.age < 0) return true;
      if (arc.age >= arc.life) return false;
      const endX = arc.x + Math.cos(arc.angle) * arc.reach;
      const endY = arc.y + Math.sin(arc.angle) * arc.reach;
      ctx.save();
      ctx.globalAlpha = .35 + (1 - arc.age / arc.life) * .65;
      ctx.strokeStyle = Math.floor(arc.age * 70) % 2 ? "#ffffff" : "#8d7cff";
      ctx.shadowColor = "#765dff";
      ctx.shadowBlur = 18;
      ctx.lineWidth = 1.5 + (1 - arc.age / arc.life) * 2.4;
      ctx.beginPath();
      ctx.moveTo(arc.x, arc.y);
      const segments = 7;
      for (let index = 1; index < segments; index += 1) {
        const progress = index / segments;
        const bend = (Math.random() - .5) * (16 + arc.reach * .05);
        ctx.lineTo(arc.x + (endX - arc.x) * progress + bend, arc.y + (endY - arc.y) * progress - bend * .45);
      }
      ctx.lineTo(endX, endY);
      ctx.stroke();
      ctx.restore();
      return true;
    });

    this.particles = this.particles.filter((particle) => {
      particle.life -= dt;
      if (particle.life <= 0) return false;
      particle.px = particle.x;
      particle.py = particle.y;
      particle.vy += particle.gravity * dt;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.rotation += particle.spin * dt;
      const alpha = Math.min(1, particle.life / particle.maxLife * 1.6);
      ctx.save();
      ctx.globalAlpha = alpha;
      if (particle.kind === "streak") {
        ctx.strokeStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 8;
        ctx.lineWidth = particle.size;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x - particle.vx * .05, particle.y - particle.vy * .05);
        ctx.stroke();
      } else if (particle.kind === "spark") {
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        ctx.fillStyle = particle.color === "#ffffff" ? "#5c4d43" : "#1c1820";
        ctx.fillRect(-particle.size, -particle.size * .55, particle.size * 2, particle.size * 1.1);
      }
      ctx.restore();
      return true;
    });
  },

  frame(time) {
    if (!this.ensureSize()) return;
    const dt = Math.min(.05, this.lastTime ? (time - this.lastTime) / 1000 : .016);
    this.lastTime = time;
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (!state.inBattle) return;
    this.drawAtmosphere(this.ctx, dt);
    this.drawBursts(this.ctx, dt);
  },
};

const PROFILE_STORAGE_KEY = "dntc-fighter-profile-v1";

function loadProfile() {
  const fallback = { name: "Player One", wins: 0, losses: 0, kos: 0, streak: 0, bestStreak: 0, bestCombo: 0, masteryXp: 0, totalFinishers: 0, highScore: 0 };
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY) || "null");
    if (!saved) return fallback;
    return {
      ...fallback,
      ...saved,
      name: String(saved.name || fallback.name).slice(0, 16),
    };
  } catch {
    return fallback;
  }
}

const profile = loadProfile();

function calculateHighScore() {
  return profile.wins * 1000 + profile.kos * 350 + profile.bestStreak * 500 + profile.bestCombo * 250 + Math.floor(profile.masteryXp / 5);
}

function masteryLevel() {
  return 1 + Math.floor((profile.masteryXp || 0) / 2500);
}

function saveProfile() {
  profile.highScore = Math.max(profile.highScore || 0, calculateHighScore());
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // The match remains playable if storage is unavailable.
  }
}

function renderProfile(syncInput = true) {
  const score = Math.max(profile.highScore || 0, calculateHighScore());
  if (syncInput) els.playerNameInput.value = profile.name;
  els.profileName.textContent = profile.name;
  els.highScore.textContent = String(score).padStart(6, "0");
  els.recordSummary.textContent = `LV ${masteryLevel()} / ${profile.wins} wins / best combo ${profile.bestCombo}`;
}

function recordMatch(won, knockout) {
  if (won) {
    profile.wins += 1;
    profile.streak += 1;
    if (knockout) profile.kos += 1;
    profile.bestStreak = Math.max(profile.bestStreak, profile.streak);
  } else {
    profile.losses += 1;
    profile.streak = 0;
  }
  saveProfile();
  renderProfile();
}

function fighterCardMarkup(fighter, index) {
  const rating = Array.from({ length: 5 }, (_, i) => `<i class="${i < fighter.rating ? "on" : ""}"></i>`).join("");
  return `
    <button class="fighter-card" type="button" data-fighter="${index}" style="--fighter-color:${fighter.color}">
      <span class="selection-order"></span>
      <img src="${fighter.image}" alt="${fighter.name}" />
      <span class="fighter-card-copy">
        <small>${fighter.title}</small>
        <strong>${fighter.name}</strong>
        <span>${fighter.identity}</span>
        <span class="chip-rating" aria-label="Chip rating ${fighter.rating} out of 5">${rating}</span>
      </span>
    </button>`;
}

function initializeSelection() {
  els.fighterGrid.innerHTML = FIGHTERS.map(fighterCardMarkup).join("");
  els.stageTabs.innerHTML = STAGES.map((stage, index) => (
    `<button class="stage-tab" type="button" data-stage="${index}" aria-label="Select ${stage.name}">${stage.short}</button>`
  )).join("");

  els.fighterGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-fighter]");
    if (!card) return;
    const index = Number(card.dataset.fighter);
    const selectedAt = state.selected.indexOf(index);
    if (selectedAt >= 0) {
      if (state.selected.length > 1) state.selected.splice(selectedAt, 1);
    } else if (state.selected.length < 2) {
      state.selected.push(index);
    } else {
      state.selected.shift();
      state.selected.push(index);
    }
    playSfx("select");
    notifySelectionChanged();
    renderSelection();
  });

  els.stageTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-stage]");
    if (!button) return;
    if (state.matchMode === "online" && state.online.role === "guest") return;
    state.stageIndex = Number(button.dataset.stage);
    playSfx("select");
    if (state.matchMode === "online") sendOnline({ type: "stage", stageIndex: state.stageIndex });
    renderSelection();
  });

  renderSelection();
}

function teamKey(team) {
  return team.map((index) => FIGHTERS[index].id).sort().join("-");
}

function buildCpuTeam(playerTeam) {
  const difficulty = activeDifficulty();
  const candidates = FIGHTERS
    .map((fighter, index) => ({ fighter, index }))
    .filter(({ index }) => !playerTeam.includes(index));

  candidates.sort((left, right) => {
    if (difficulty.id === "easy") return left.fighter.rating - right.fighter.rating || left.index - right.index;
    if (difficulty.id === "very-hard") return right.fighter.rating - left.fighter.rating || right.index - left.index;
    return Math.abs(left.fighter.rating - 3) - Math.abs(right.fighter.rating - 3) || right.fighter.rating - left.fighter.rating;
  });
  return candidates.slice(0, 2).map(({ index }) => index);
}

function renderDifficulty() {
  const difficulty = activeDifficulty();
  const isCpu = state.matchMode === "cpu";
  els.difficultySelector.hidden = !isCpu;
  els.difficultyTitle.textContent = difficulty.name;
  els.difficultyTitle.style.color = difficulty.color;
  els.difficultyDescription.textContent = difficulty.description;
  els.difficultyButtons.forEach((button) => {
    const selected = button.dataset.difficulty === difficulty.id;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function setDifficulty(difficultyId) {
  if (state.inBattle || state.matchMode !== "cpu" || !DIFFICULTIES[difficultyId]) return;
  state.difficulty = difficultyId;
  try { localStorage.setItem(DIFFICULTY_STORAGE_KEY, difficultyId); } catch { /* Selection remains active for this session. */ }
  playSfx("select");
  renderSelection();
}

function renderSelection() {
  $$(".fighter-card", els.fighterGrid).forEach((card) => {
    const index = Number(card.dataset.fighter);
    const order = state.selected.indexOf(index);
    card.classList.toggle("is-selected", order >= 0);
    card.setAttribute("aria-pressed", String(order >= 0));
    $(".selection-order", card).textContent = order >= 0 ? order + 1 : "";
  });

  const isCpuDuel = state.matchMode === "cpu";
  const playerPreviewTeam = isCpuDuel ? state.selected.slice(0, 1) : state.selected;
  const cpuTeam = state.selected.length === 2 ? state.selected.slice(1, 2) : [];
  const remoteTeam = state.matchMode === "online" ? state.online.remoteSelected : cpuTeam;
  els.selectionCount.textContent = `${state.selected.length} / 2 locked`;
  els.playerTeamPreview.innerHTML = playerPreviewTeam.map((index) => `<img src="${FIGHTERS[index].image}" alt="${FIGHTERS[index].name}" />`).join("");
  els.cpuTeamPreview.innerHTML = remoteTeam.length
    ? remoteTeam.map((index) => `<img src="${FIGHTERS[index].image}" alt="${FIGHTERS[index].name}" />`).join("")
    : '<span class="team-placeholder">?</span><span class="team-placeholder">?</span>';
  els.localTeamLabel.textContent = state.matchMode === "online" ? `${profile.name} team` : "Player 1";
  els.remoteTeamLabel.textContent = state.matchMode === "online" ? `${state.online.remoteName} team` : `${activeDifficulty().name} CPU / Player 2`;

  const synergy = SYNERGIES[teamKey(state.selected)];
  els.synergyNote.innerHTML = synergy
    ? `<strong>${synergy[0]} synergy.</strong> ${synergy[1]}`
    : isCpuDuel && state.selected.length === 2
      ? `${FIGHTERS[state.selected[0]].name} fights ${FIGHTERS[state.selected[1]].name}.`
      : "Choose a second fighter to lock the matchup.";

  const stage = STAGES[state.stageIndex];
  els.stagePreview.style.backgroundImage = `url("${stage.image}")`;
  els.stageName.textContent = stage.name;
  els.stageHazard.textContent = `${stage.hazards.length} hazards online`;
  $$(".stage-tab", els.stageTabs).forEach((button) => {
    const selected = Number(button.dataset.stage) === state.stageIndex;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
    button.disabled = state.matchMode === "online" && state.online.role === "guest";
  });
  const fightLabel = $("span", els.fightButton);
  const fightHint = $("small", els.fightButton);
  if (state.matchMode === "cpu") {
    fightLabel.textContent = `Enter ${activeDifficulty().name} round`;
    fightHint.textContent = "Space";
    els.fightButton.disabled = state.selected.length !== 2;
  } else if (!state.online.connected) {
    fightLabel.textContent = "Connect to a rival";
    fightHint.textContent = "Online";
    els.fightButton.disabled = true;
  } else if (state.online.role === "guest") {
    fightLabel.textContent = state.online.localReady ? "Waiting for host" : "Ready to fight";
    fightHint.textContent = state.online.localReady ? "Ready" : "Enter";
    els.fightButton.disabled = state.online.localReady || state.selected.length !== 2;
  } else {
    fightLabel.textContent = state.online.remoteReady ? "Start online fight" : "Waiting for rival";
    fightHint.textContent = state.online.remoteReady ? "Enter" : "Not ready";
    els.fightButton.disabled = !state.online.remoteReady || state.online.remoteSelected.length !== 2 || state.selected.length !== 2;
  }
  els.raceButton.hidden = state.matchMode !== "cpu";
  els.raceButton.disabled = state.selected.length !== 2;
  renderDifficulty();
  updateAudioCard();
}

function createSide(team, x) {
  return {
    team,
    active: 0,
    health: [100, 100],
    rage: 0,
    rageUntil: 0,
    x,
    blocking: false,
    stunnedUntil: 0,
    attackUntil: 0,
    attackPose: "light",
    walkUntil: 0,
    hitUntil: 0,
    knockdownUntil: 0,
    taggingUntil: 0,
    cooldownUntil: 0,
    tagCooldownUntil: 0,
    combo: 0,
    bestCombo: 0,
    comboInputs: [],
    comboInputAt: 0,
    bufferedAction: "",
    bufferedNext: "",
    bufferUntil: 0,
    namedFinishers: 0,
    lastHitAt: 0,
    chipWindowStart: 0,
    chipWindowDamage: 0,
    blindUntil: 0,
    finishPose: "",
  };
}

function startMatch(options = {}) {
  const onlineMatch = options.online === true;
  const selectedMatchup = !onlineMatch && !options.playerTeam && !options.cpuTeam;
  const playerTeam = options.playerTeam || (selectedMatchup ? state.selected.slice(0, 1) : [...state.selected]);
  if (selectedMatchup && state.selected.length !== 2) return;
  if (!selectedMatchup && playerTeam.length !== 2) return;
  unlockAudio("battle");
  const difficulty = activeDifficulty();
  const cpuTeam = options.cpuTeam || (selectedMatchup ? state.selected.slice(1, 2) : buildCpuTeam(playerTeam));
  const narrowArena = window.matchMedia("(max-width: 680px)").matches;
  state.matchId += 1;
  state.player = createSide(playerTeam, narrowArena ? 34 : 32);
  state.cpu = createSide(cpuTeam, narrowArena ? 66 : 68);
  if (state.stageIndex === 2 && playerTeam.includes(2) && cpuTeam.includes(3)) {
    state.player.active = playerTeam.indexOf(2);
    state.cpu.active = cpuTeam.indexOf(3);
  }
  state.matchMode = onlineMatch ? "online" : "cpu";
  if (!onlineMatch) state.cpu.cooldownUntil = now() + difficulty.openingGrace;
  state.seconds = 150;
  state.inBattle = true;
  state.running = false;
  state.paused = false;
  state.finished = false;
  state.hazardPending = false;
  state.hitStopUntil = 0;
  state.matchScore = 0;
  state.helpPausedBattle = false;
  state.hazardNext = now() + (onlineMatch ? DIFFICULTIES.medium.hazardOpening : difficulty.hazardOpening);
  state.aiClock = 0;
  state.reverseUntil = 0;
  state.dashUntil = 0;
  state.dashCooldownUntil = 0;
  state.street = {
    heat: 0,
    contract: { ...STREET_CONTRACTS[Math.floor(Math.random() * STREET_CONTRACTS.length)], progress: 0, complete: false },
    drops: [],
    nextDropAt: now() + 3400,
  };
  state.lastFrame = now();
  state.keys = { left: false, right: false, block: false };
  state.online.remoteKeys = { left: false, right: false, block: false };
  state.online.snapshotClock = 0;
  if (onlineMatch) {
    const hostName = state.online.role === "host" ? profile.name : state.online.remoteName;
    const guestName = state.online.role === "guest" ? profile.name : state.online.remoteName;
    els.leftPlayerLabel.textContent = `${hostName} / Host`;
    els.rightPlayerLabel.textContent = `${guestName} / Guest`;
  } else {
    els.leftPlayerLabel.textContent = "Player 1";
    els.rightPlayerLabel.textContent = `${difficulty.name} CPU`;
  }

  const stage = STAGES[state.stageIndex];
  els.selectScreen.hidden = true;
  els.universeShell.hidden = true;
  els.raceScreen.hidden = true;
  els.battleScreen.hidden = false;
  els.pauseOverlay.hidden = true;
  els.resultOverlay.hidden = true;
  els.arena.style.backgroundImage = `url("${stage.image}")`;
  els.arena.style.setProperty("--stage-accent", stage.accent);
  els.arena.dataset.stage = stage.id;
  els.arenaStageTitle.textContent = `${stage.name} / Hazards active`;
  els.difficultyBadge.textContent = onlineMatch ? "Online rival" : `${difficulty.name} / ${difficulty.rewardMultiplier}× XP`;
  els.difficultyBadge.style.setProperty("--difficulty-color", onlineMatch ? "#20dcff" : difficulty.color);
  cinematicFx.setStage(stage);
  els.hazardAlert.classList.remove("is-visible");
  els.combatCallout.classList.remove("is-visible");
  els.comboCounter.classList.remove("is-visible");
  els.comboBanner.classList.remove("is-visible");
  els.comboTracker.classList.remove("is-visible");
  els.comboTracker.textContent = "";
  els.streetDrops.replaceChildren();
  renderStreetUtility();
  els.moveReadout.textContent = "Systems online";
  startTheme("battle", true);
  renderBattle(true);
  announce("Ready");
  const matchId = state.matchId;
  window.setTimeout(() => {
    if (state.matchId !== matchId || !state.inBattle) return;
    announce("Fight!");
    state.running = true;
    state.lastFrame = now();
  }, 900);
}

function rideSpritePosition(fighterIndex) {
  return { x: [0, 50, 100][fighterIndex % 3], y: [0, 50, 100][Math.floor(fighterIndex / 3)] };
}

function setRaceRide(car, fighterIndex) {
  const position = rideSpritePosition(fighterIndex);
  car.style.setProperty("--car-x", `${position.x}%`);
  car.style.setProperty("--car-y", `${position.y}%`);
}

function renderGarage() {
  const race = state.race;
  const ride = STREET_RIDES[race.rideIndex];
  setRaceRide(els.garageSelectedCar, race.rideIndex);
  els.garageRideName.textContent = ride.name;
  els.garageStats.innerHTML = ["speed", "grip", "armor", "nitro"].map((stat) => `<div><span>${stat}</span><i><b style="width:${ride[stat] * 10}%"></b></i><strong>${ride[stat]}</strong></div>`).join("");
  els.garageRideRail.innerHTML = STREET_RIDES.map((option, index) => {
    const position = rideSpritePosition(index);
    return `<button type="button" data-ride="${index}" class="${index === race.rideIndex ? "is-selected" : ""}" aria-pressed="${index === race.rideIndex}" aria-label="Select ${option.name}"><i style="--car-x:${position.x}%;--car-y:${position.y}%"></i><span>${option.name}</span></button>`;
  }).join("");
  $$('[data-ride]', els.garageRideRail).forEach((button) => button.addEventListener("click", () => {
    race.rideIndex = Number(button.dataset.ride);
    playSfx("select");
    renderGarage();
  }));
}

function openRaceGarage() {
  if (state.matchMode !== "cpu" || state.selected.length !== 2) return;
  state.race.garage = true;
  state.race.active = false;
  state.race.finished = false;
  state.race.rideIndex = Number.isInteger(state.race.rideIndex) ? state.race.rideIndex : state.selected[0];
  els.selectScreen.hidden = true;
  els.universeShell.hidden = true;
  els.battleScreen.hidden = true;
  els.raceScreen.hidden = true;
  els.raceGarage.hidden = false;
  renderGarage();
  unlockAudio("select");
  startTheme("select", true);
}

function renderRaceTraffic() {
  const liveIds = new Set(state.race.traffic.map((traffic) => String(traffic.id)));
  $$('[data-traffic]', els.raceTraffic).forEach((node) => { if (!liveIds.has(node.dataset.traffic)) node.remove(); });
  state.race.traffic.forEach((traffic) => {
    let node = $(`[data-traffic="${traffic.id}"]`, els.raceTraffic);
    if (!node) {
      node = document.createElement("div");
      node.className = "traffic-car";
      node.dataset.traffic = String(traffic.id);
      node.innerHTML = "<i></i><span>E · hijack ride</span>";
      setRaceRide(node, traffic.rideIndex);
      els.raceTraffic.append(node);
    }
    node.style.left = `${traffic.x}%`;
    node.style.top = `${traffic.y}%`;
    node.style.setProperty("--traffic-scale", String(0.35 + Math.max(0, traffic.y) / 115));
    node.classList.toggle("is-hijackable", traffic.hijackable);
  });
}

function renderRace() {
  const race = state.race;
  const wanted = race.mode === "wanted";
  els.raceTimer.textContent = String(Math.max(0, Math.ceil(race.seconds))).padStart(2, "0");
  els.racePlayerProgress.style.width = `${Math.min(100, race.player)}%`;
  els.raceCpuProgress.style.width = `${Math.min(100, race.cpu)}%`;
  els.racePlayerCar.style.left = `${race.x}%`;
  els.racePlayerCar.hidden = Boolean(race.onFoot);
  els.raceRunner.hidden = !race.onFoot;
  els.raceRunner.style.left = `${race.x}%`;
  els.raceRunner.style.top = `${race.footY || 72}%`;
  els.raceRunnerSprite.dataset.pose = race.footMoving ? (Math.floor(now() / 130) % 2 ? "step" : "idle") : "idle";
  els.racePlayerCar.style.setProperty("--steer", race.keys.left ? "-7deg" : race.keys.right ? "7deg" : "0deg");
  els.raceTrack.style.setProperty("--road-motion", `${race.worldOffset || 0}px`);
  els.raceSpeed.textContent = String(Math.round(race.speed)).padStart(3, "0");
  els.raceArmor.textContent = String(Math.max(0, Math.round(race.armor)));
  const stars = Math.min(5, Math.ceil(race.heat / 20));
  els.raceHeat.textContent = `${"★".repeat(stars)}${"☆".repeat(Math.max(0, 5 - stars))}`;
  els.raceScore.textContent = String(Math.round(race.score)).padStart(5, "0");
  els.raceNitro.style.width = `${Math.max(0, Math.min(100, race.nitro))}%`;
  els.raceCheckpoint.textContent = race.mode === "free"
    ? `District ${String(race.district).padStart(2, "0")} / free drive`
    : wanted ? `Wanted chapter ${Math.min(5, race.wantedStage + 1)} / 05` : `${String(race.checkpoint).padStart(2, "0")} / 03 checkpoint`;
  els.wantedMission.hidden = !wanted;
  if (wanted) {
    els.wantedObjective.textContent = race.objective || "Leave the tint stop";
    els.wantedStars.textContent = `${"★".repeat(stars)}${"☆".repeat(Math.max(0, 5 - stars))}`;
    els.wantedChapter.textContent = race.chapter || "Chapter 1 · Ocean Drive";
    els.jailbreakMeter.style.width = `${Math.max(0, Math.min(100, race.jailbreak || 0))}%`;
  }
  els.jailbreakOverlay.hidden = !race.jailed;
  if (race.jailed) {
    els.jailTimer.textContent = race.jailSeconds.toFixed(1).padStart(4, "0");
    els.jailTimerBar.style.width = `${Math.max(0, race.jailSeconds / 8 * 100)}%`;
    els.jailbreakButton.textContent = `Break lock · ${Math.min(5, race.jailTaps || 0)} / 5`;
  }
  els.racePrompt.textContent = race.message || (race.onFoot
    ? "ON FOOT · WASD move · hold Shift to sprint · E enter flashing ride"
    : `W throttle · A/D steer · S brake · Q nitro ${Math.round(race.nitro)}% · E exit ride`);
  const nextCheckpoint = race.checkpoint * 33;
  els.checkpointGate.classList.toggle("is-visible", nextCheckpoint - race.player < 8 && nextCheckpoint - race.player > -1);
  renderRaceTraffic();
}

function startRace(options = {}) {
  if (state.matchMode !== "cpu" || state.selected.length !== 2) return;
  unlockAudio("battle");
  const [playerIndex, cpuIndex] = state.selected;
  const player = FIGHTERS[playerIndex];
  const cpu = FIGHTERS[cpuIndex];
  state.matchId += 1;
  state.inBattle = false;
  state.running = false;
  state.paused = false;
  state.finished = false;
  const rideIndex = state.race.rideIndex;
  const wantedStory = options.wantedStory === true || (options.wantedStory == null && state.race.mode === "wanted");
  const freeDrive = !wantedStory && (options.freeDrive === true || (options.freeDrive == null && state.race.mode === "free"));
  const mode = wantedStory ? "wanted" : freeDrive ? "free" : "circuit";
  state.race = { active: true, finished: false, garage: false, mode, rideIndex, seconds: wantedStory ? 150 : freeDrive ? 180 : 90, player: 0, cpu: 0, nitro: wantedStory ? 84 : 72, cpuNitro: 40, nextRadioAt: now() + 5200, speed: 0, x: 50, armor: 100, score: 0, heat: wantedStory ? 12 : 0, traffic: [], nextTrafficAt: now() + 900, checkpoint: 1, district: 1, worldOffset: 0, wantedStage: 0, objective: wantedStory ? "Leave the tint stop" : "", chapter: wantedStory ? "Chapter 1 · Ocean Drive" : "", jailed: false, jailSeconds: 8, jailTaps: 0, jailbreak: 0, escapedJail: false, stallAtFive: 0, onFoot: false, footY: 72, footMoving: false, message: wantedStory ? "The lights are on. Accelerate and clear Ocean Drive." : freeDrive ? "Free drive: drive, exit on foot, and take any flashing ride" : "", messageUntil: (wantedStory || freeDrive) ? now() + 3200 : 0, keys: { throttle: false, brake: false, left: false, right: false, sprint: false } };
  els.selectScreen.hidden = true;
  els.universeShell.hidden = true;
  els.battleScreen.hidden = true;
  els.raceGarage.hidden = true;
  els.raceScreen.hidden = false;
  els.resultOverlay.hidden = true;
  els.racePlayerName.textContent = player.name;
  els.raceCpuName.textContent = wantedStory ? "Five-Star Pursuit" : freeDrive ? "Neon City" : cpu.name;
  els.racePlayerRide.textContent = STREET_RIDES[rideIndex].name;
  els.raceCpuRide.textContent = wantedStory ? "Roadblocks · aerial search · interceptors" : freeDrive ? "Free-roam traffic" : STREET_RIDES[cpuIndex].name;
  els.raceRadio.textContent = wantedStory ? "Dispatch: dark-blue ride leaving Ocean Drive. Units converge." : "Radio: night run is live — own the streets.";
  setRaceRide(els.racePlayerCar, rideIndex);
  els.raceRunnerSprite.style.backgroundImage = `url("${player.sprite}")`;
  setRaceRide(els.raceCpuCar, cpuIndex);
  els.raceCpuCar.hidden = freeDrive || wantedStory;
  els.raceTraffic.replaceChildren();
  renderRace();
  startTheme("battle", true);
  playSfx("ready");
  window.setTimeout(() => { if (state.race.active) playSfx("fight"); }, 450);
}

function raceAction(action) {
  const race = state.race;
  if (!race.active || race.finished || race.jailed) return;
  if (action === "accelerate") {
    if (race.onFoot) return;
    race.speed = Math.min(165, race.speed + 14);
    playSfx("light", { volume: 0.35 });
  } else if (action === "nitro") {
    if (race.onFoot) {
      race.message = "Nitro is available after you enter a ride";
      race.messageUntil = now() + 1500;
      renderRace();
      return;
    }
    if (race.nitro < 15) {
      race.message = "Nitro recharging";
      race.messageUntil = now() + 1100;
      playSfx("guard");
      renderRace();
      return;
    }
    race.nitro -= 15;
    race.speed = Math.min(190, race.speed + 38);
    els.racePlayerCar.classList.add("is-boosting");
    window.setTimeout(() => els.racePlayerCar.classList.remove("is-boosting"), 280);
    playSfx("special");
  } else if (action === "hijack") {
    if (!race.onFoot) {
      if (race.speed > 55) {
        race.message = "Brake below 55 MPH before exiting";
        race.messageUntil = now() + 1600;
        playSfx("guard");
        renderRace();
        return;
      }
      race.onFoot = true;
      race.speed = 0;
      race.footY = 72;
      race.message = "On foot: move beside a flashing car, truck, or bike and press E";
      race.messageUntil = now() + 2600;
      race.score += 100;
      playSfx("tag");
      renderRace();
      return;
    }
    const target = race.traffic.filter((traffic) => traffic.hijackable).sort((a, b) => Math.abs(a.x - race.x) - Math.abs(b.x - race.x))[0];
    if (!target) {
      race.message = "Get beside a flashing NPC ride to hijack it";
      race.messageUntil = now() + 1600;
      playSfx("guard");
    } else {
      race.onFoot = false;
      race.rideIndex = target.rideIndex;
      race.traffic = race.traffic.filter((traffic) => traffic !== target);
      race.speed *= 0.72;
      race.armor = Math.min(100, race.armor + 18);
      race.heat = Math.min(100, race.heat + 24);
      race.score += 750;
      race.message = `Ride entered: ${STREET_RIDES[race.rideIndex].name}`;
      race.messageUntil = now() + 2200;
      els.racePlayerRide.textContent = STREET_RIDES[race.rideIndex].name;
      setRaceRide(els.racePlayerCar, race.rideIndex);
      playSfx("rage");
    }
  }
  renderRace();
}

function sendToJail(reason = "Vehicle disabled. Coast City patrol has you boxed in.") {
  const race = state.race;
  if (race.mode !== "wanted" || race.jailed || race.finished) return;
  race.jailed = true;
  race.speed = 0;
  race.keys = { throttle: false, brake: false, left: false, right: false, sprint: false };
  race.jailSeconds = 8;
  race.jailTaps = 0;
  race.objective = "Break the arcade lock";
  race.chapter = "Detention event · no real-world instructions";
  els.jailCopy.textContent = `${reason} Break the digital lock before transfer—this is a fictional five-tap arcade event.`;
  playSfx("defeat");
  renderRace();
  window.setTimeout(() => els.jailbreakButton.focus(), 30);
}

function attemptJailbreak() {
  const race = state.race;
  if (!race.active || !race.jailed) return;
  race.jailTaps = Math.min(5, (race.jailTaps || 0) + 1);
  race.jailbreak = race.jailTaps * 20;
  playSfx(race.jailTaps === 5 ? "rage" : "select", { volume: 0.55 });
  if (race.jailTaps >= 5) {
    race.jailed = false;
    race.escapedJail = true;
    race.armor = 42;
    race.heat = 100;
    race.nitro = Math.max(race.nitro, 58);
    race.player = Math.max(race.player, 74);
    race.wantedStage = 4;
    race.objective = "Reach the safehouse";
    race.chapter = "Final chapter · No respawn";
    race.message = "Lock broken. One last run to the safehouse.";
    race.messageUntil = now() + 3200;
    els.raceRadio.textContent = "Dispatch: suspect mobile again. Safehouse corridor closing.";
  }
  renderRace();
}

function updateWantedStory(delta, time) {
  const race = state.race;
  if (race.mode !== "wanted") return;
  const prior = race.wantedStage;
  if (race.player >= 85) race.wantedStage = 4;
  else if (race.player >= 65) race.wantedStage = 3;
  else if (race.player >= 38) race.wantedStage = 2;
  else if (race.player >= 14) race.wantedStage = 1;
  const stages = [
    ["Leave the tint stop", "Chapter 1 · Ocean Drive", 18],
    ["Break the I-95 cordon", "Chapter 2 · Northbound", 42],
    ["Survive the aerial search", "Chapter 3 · Neon overpass", 64],
    ["Escape the interceptor units", "Chapter 4 · North Coast", 86],
    ["Reach the safehouse", "Final chapter · No respawn", 100],
  ];
  const [objective, chapter, minimumHeat] = stages[race.wantedStage];
  race.objective = objective;
  race.chapter = chapter;
  race.heat = Math.max(race.heat, minimumHeat);
  if (race.wantedStage !== prior) {
    race.score += 1000 + race.wantedStage * 350;
    race.message = objective;
    race.messageUntil = time + 2200;
    els.raceRadio.textContent = [
      "Dispatch: units joining the pursuit. Keep the route contained.",
      "Radio: northbound corridor active. Interceptors moving in.",
      "Aviation: visual acquired over the neon overpass.",
      "Dispatch: five-star response. Safehouse routes are closing.",
    ][Math.max(0, race.wantedStage - 1)] || "Dispatch: pursuit continues.";
    playSfx("ready");
  }
  if (!race.onFoot && race.heat >= 100 && race.speed < 6) race.stallAtFive += delta;
  else race.stallAtFive = Math.max(0, race.stallAtFive - delta * 2);
  if (!race.escapedJail && race.stallAtFive > 3.8) sendToJail("Five-star units surrounded the stopped vehicle.");
}

function spawnRaceTraffic() {
  const race = state.race;
  const lanes = [22, 38, 62, 78];
  let lane = lanes[Math.floor(Math.random() * lanes.length)];
  if (race.traffic.some((traffic) => traffic.y < 18 && Math.abs(traffic.x - lane) < 4)) lane = lanes[(lanes.indexOf(lane) + 1) % lanes.length];
  race.traffic.push({ id: ++raceTrafficId, x: lane, y: -20, pace: 10 + Math.random() * 15, rideIndex: Math.floor(Math.random() * STREET_RIDES.length), hijackable: false, hit: false });
  race.nextTrafficAt = now() + Math.max(520, 1700 - race.speed * 6);
}

function endRace(winner) {
  const race = state.race;
  if (race.finished) return;
  race.active = false;
  race.finished = true;
  state.finished = true;
  const won = winner === "player";
  const xp = won ? 420 : 110;
  profile.masteryXp += xp;
  if (won) profile.wins += 1;
  profile.highScore = Math.max(profile.highScore || 0, Math.round(race.player * 100 + race.nitro * 5));
  saveProfile();
  renderProfile();
  playSfx(won ? "victory" : "defeat");
  window.setTimeout(() => {
    const freeDrive = race.mode === "free";
    const wanted = race.mode === "wanted";
    els.resultLabel.textContent = wanted ? "Coast City: Wanted / Story complete" : freeDrive ? "Neon City / Free Drive" : "Street Circuit / Neon Night Run";
    els.resultTitle.textContent = wanted ? won ? "Safehouse Reached" : "Transfer Complete" : freeDrive ? "City Run Complete" : won ? "Race Victory" : "Rival Escaped";
    els.resultTitle.style.color = won ? "var(--green)" : "var(--magenta)";
    els.resultDetail.textContent = wanted
      ? won
        ? `You cleared the five-star pursuit${race.escapedJail ? ", broke the arcade lock," : ""} and reached the safehouse. +${xp} mastery XP.`
        : `The Coast City run ended at ${Math.round(race.player)}% with ${Math.round(race.score)} street score. +${xp} mastery XP.`
      : freeDrive
      ? `Free drive complete with ${Math.round(race.score)} street score and ${Math.ceil(race.heat / 20)} heat stars. +${xp} mastery XP.`
      : won
      ? `You owned the night run. +${xp} mastery XP and a new street score.`
      : `Your rival reached the finish first. +${xp} mastery XP for the run.`;
    $("span", els.rematchButton).textContent = wanted ? "Replay story" : freeDrive ? "Free drive again" : "Race again";
    els.rematchButton.disabled = false;
    els.resultOverlay.hidden = false;
    els.rematchButton.focus();
  }, 600);
}

function updateRace(delta, time) {
  const race = state.race;
  if (!race.active || race.finished) return;
  if (race.jailed) {
    race.jailSeconds = Math.max(0, race.jailSeconds - delta);
    if (race.jailSeconds <= 0) {
      race.jailed = false;
      endRace("cpu");
    } else renderRace();
    return;
  }
  const ride = STREET_RIDES[race.rideIndex];
  race.seconds = Math.max(0, race.seconds - delta);
  const throttle = race.keys.throttle || Boolean(state.gamepad.buttons[0]);
  const brake = race.keys.brake || Boolean(state.gamepad.buttons[2]);
  const topSpeed = 105 + ride.speed * 6;
  const steer = (race.keys.right || state.gamepad.right ? 1 : 0) - (race.keys.left || state.gamepad.left ? 1 : 0);
  if (race.onFoot) {
    const sprintMultiplier = race.keys.sprint ? 1.72 : 1;
    race.speed = 0;
    race.footMoving = Boolean(throttle || brake || steer);
    race.x = clamp(race.x + steer * delta * 28 * sprintMultiplier, 10, 90);
    race.footY = clamp(race.footY + ((brake ? 1 : 0) - (throttle ? 1 : 0)) * delta * 18 * sprintMultiplier, 48, 86);
    els.raceRunner.classList.toggle("is-sprinting", race.footMoving && race.keys.sprint);
    els.raceRunner.classList.toggle("face-left", steer < 0);
  } else {
    race.footMoving = false;
    els.raceRunner.classList.remove("is-sprinting", "face-left");
    if (throttle) race.speed = Math.min(topSpeed, race.speed + delta * (25 + ride.speed * 2.8));
    else race.speed = Math.max(0, race.speed - delta * 11);
    if (brake) race.speed = Math.max(0, race.speed - delta * 70);
    race.x = clamp(race.x + steer * delta * (20 + ride.grip * 1.6) * (0.3 + race.speed / Math.max(1, topSpeed)), 13, 87);
    race.player = Math.min(100, race.player + delta * race.speed / 68);
    race.worldOffset = (race.worldOffset + delta * race.speed * 2.4) % 1000;
    race.score += delta * race.speed * 0.72;
    race.nitro = Math.min(100, race.nitro + delta * (1.1 + (Math.abs(steer) && race.speed > 70 ? 3.2 : 0)));
  }
  if (race.mode === "circuit") race.cpu = Math.min(100, race.cpu + delta * (1.28 + activeDifficulty().aiDamageMultiplier * 0.18));
  if (race.cpuNitro >= 22 && Math.random() < delta * 0.12) {
    race.cpuNitro -= 22;
    race.cpu = Math.min(100, race.cpu + 6.5);
    els.raceCpuCar.classList.add("is-boosting");
    window.setTimeout(() => els.raceCpuCar.classList.remove("is-boosting"), 280);
  } else race.cpuNitro = Math.min(100, race.cpuNitro + delta * 2.5);
  if (time >= race.nextTrafficAt) spawnRaceTraffic();
  race.traffic.forEach((traffic) => {
    traffic.y += delta * (18 + race.speed * 0.38 - traffic.pace * 0.3);
    traffic.hijackable = race.onFoot && Math.abs(traffic.y - race.footY) < 14 && Math.abs(traffic.x - race.x) < 14;
    if (!race.onFoot && !traffic.hit && traffic.y > 66 && traffic.y < 88 && Math.abs(traffic.x - race.x) < 8) {
      traffic.hit = true;
      race.armor -= Math.max(5, 16 - ride.armor);
      race.speed *= 0.42;
      race.score = Math.max(0, race.score - 180);
      race.message = "Collision! Steer clear or hijack the ride";
      race.messageUntil = time + 1500;
      els.raceShell.classList.add("is-crashing");
      window.setTimeout(() => els.raceShell.classList.remove("is-crashing"), 260);
      playSfx("hit");
    }
  });
  race.traffic = race.traffic.filter((traffic) => traffic.y < 112 && !traffic.hit);
  race.checkpoint = Math.min(3, Math.floor(race.player / 33.34) + 1);
  updateWantedStory(delta, time);
  if (race.mode === "free" && race.player >= 100) {
    race.player = 0;
    race.district += 1;
    race.score += 1400;
    race.message = `District ${race.district} unlocked · keep the city run alive`;
    race.messageUntil = time + 2400;
  }
  if (race.message && time >= race.messageUntil) race.message = "";
  if (time >= race.nextRadioAt) {
    const wantedRadio = [
      "Dispatch: maintain distance. Fictional interceptors are moving in.",
      "Radio: shoulder route blocked. Watch the civilian traffic.",
      "Aviation: target crossing the neon grid toward North Coast.",
      "Driver: stars do not reset on the highway. Keep moving.",
    ];
    els.raceRadio.textContent = (race.mode === "wanted" ? wantedRadio : RACE_RADIO)[Math.floor(Math.random() * 4)];
    race.nextRadioAt = time + 6500;
  }
  if (race.armor <= 0 && race.mode === "wanted" && !race.escapedJail) sendToJail();
  else if (race.armor <= 0) endRace("cpu");
  else if (race.mode === "wanted" && race.player >= 100) endRace("player");
  else if (race.mode === "wanted" && race.seconds <= 0) endRace("cpu");
  else if (race.mode === "free" && race.seconds <= 0) endRace("player");
  else if (race.mode === "circuit" && (race.player >= 100 || race.cpu >= 100 || race.seconds <= 0)) endRace(race.player >= race.cpu ? "player" : "cpu");
  else renderRace();
}

function renderStreetUtility() {
  const street = state.street;
  if (!street?.contract) return;
  const stars = Math.max(0, Math.min(5, Math.ceil(street.heat / 20)));
  els.streetHeat.textContent = `${"★".repeat(stars)}${"☆".repeat(5 - stars)}`;
  const contract = street.contract;
  els.streetContract.textContent = contract.complete
    ? `Contract cleared +${contract.reward} XP`
    : `${contract.label} / ${contract.progress}/${contract.goal}`;
}

function progressStreetContract(stat, amount = 1) {
  const contract = state.street?.contract;
  if (!contract || contract.complete || contract.stat !== stat) return;
  contract.progress = Math.min(contract.goal, contract.progress + amount);
  if (contract.progress >= contract.goal) {
    contract.complete = true;
    state.matchScore += contract.reward;
    state.player.rage = clamp(state.player.rage + 28, 0, 100);
    showCombatCallout("Street contract cleared!", "combo");
    playSfx("combo", { sideKey: "player" });
    cinematicFx.burst(state.player.x, 52, "hard", "#ffd400");
  }
  renderStreetUtility();
}

function spawnStreetDrop(time) {
  if (state.matchMode !== "cpu" || state.street.drops.length >= 2 || time < state.street.nextDropAt) return;
  const choices = [
    { id: "rage", icon: "⚡", color: "#ff4cc8", label: "Neon charge", reward: () => { state.player.rage = clamp(state.player.rage + 24, 0, 100); } },
    { id: "armor", icon: "◆", color: "#20dcff", label: "Armor cache", reward: () => { state.player.health[state.player.active] = clamp(state.player.health[state.player.active] + 7, 0, 100); } },
    { id: "cash", icon: "$", color: "#ffd400", label: "Street score", reward: () => { state.matchScore += 130; } },
  ];
  const drop = { ...choices[Math.floor(Math.random() * choices.length)], x: 18 + Math.random() * 64, expiresAt: time + 7600 };
  const element = document.createElement("span");
  element.className = "street-drop";
  element.textContent = drop.icon;
  element.style.setProperty("--drop-x", `${drop.x}%`);
  element.style.setProperty("--drop-color", drop.color);
  els.streetDrops.append(element);
  drop.element = element;
  state.street.drops.push(drop);
  state.street.nextDropAt = time + 6200 + Math.random() * 2800;
}

function updateStreetDrops(time) {
  if (state.matchMode !== "cpu") return;
  spawnStreetDrop(time);
  state.street.drops = state.street.drops.filter((drop) => {
    if (time >= drop.expiresAt) { drop.element.remove(); return false; }
    if (Math.abs(state.player.x - drop.x) > 6) return true;
    drop.reward();
    drop.element.remove();
    progressStreetContract("pickups");
    setMoveReadout(drop.label, "player");
    showCombatCallout(`${drop.label}!`, "shock");
    playSfx("confirm", { sideKey: "player" });
    cinematicFx.burst(drop.x, 66, "medium", drop.color);
    return false;
  });
}

function dash(sideKey) {
  const side = state[sideKey];
  const time = now();
  if (!side || sideKey !== "player" || !canAct(side) || time < state.dashCooldownUntil) return;
  const direction = side.x <= state.cpu.x ? 1 : -1;
  side.x = clamp(side.x + direction * 13, 7, 93);
  side.walkUntil = time + 240;
  side.cooldownUntil = time + 360;
  state.dashUntil = time + 220;
  state.dashCooldownUntil = time + 1100;
  state.street.heat = clamp(state.street.heat + 5, 0, 100);
  renderStreetUtility();
  setMoveReadout("Neon street dash", sideKey);
  playSfx("step", { sideKey });
  cinematicFx.burst(side.x, 68, "light", "#20dcff");
}

function activeFighter(side) {
  return FIGHTERS[side.team[side.active]];
}

function teammateIndex(side) {
  return side.active === 0 ? 1 : 0;
}

function hasTeammate(side) {
  return side.team.length > 1;
}

function announce(text, tone = "default") {
  els.announcer.textContent = text;
  els.announcer.dataset.tone = tone;
  els.announcer.classList.remove("is-visible");
  void els.announcer.offsetWidth;
  els.announcer.classList.add("is-visible");
  const cue = text.toLowerCase();
  if (cue === "ready") playSfx("ready");
  else if (cue === "fight!") playSfx("fight");
  else if (cue === "victory") playSfx("victory");
  else if (cue === "defeat") playSfx("defeat");
  else if (cue.includes("fatality")) playSfx("fatality");
  else if (cue.includes("rage")) playSfx("rage");
  else if (cue.includes("tag")) playSfx("tag");
  if (state.matchMode === "online" && state.online.role === "host" && state.inBattle && !["ready", "fight!", "victory", "defeat"].includes(cue)) {
    sendOnline({ type: "announce", text });
  }
}

function setMoveReadout(name, sideKey = "player") {
  const fighter = activeFighter(state[sideKey]);
  els.moveReadout.textContent = `${fighter.name} / ${name}`;
}

function isRaging(side) {
  return side.rageUntil > now();
}

function scaleCombatDamage(amount, attackerKey) {
  if (state.matchMode !== "cpu") return amount;
  const difficulty = activeDifficulty();
  return amount * (attackerKey === "cpu" ? difficulty.cpuDamage : difficulty.playerDamage);
}

function canAct(side) {
  const time = now();
  return state.running && !state.paused && !state.finished && time > side.stunnedUntil && time > side.knockdownUntil && time > side.attackUntil && time > side.taggingUntil && time > side.cooldownUntil;
}

function moveSide(sideKey, amount) {
  const side = state[sideKey];
  if (!canAct(side) || side.blocking) return;
  const opponent = state[sideKey === "player" ? "cpu" : "player"];
  const nextX = clamp(side.x + amount, 7, 93);
  side.x = side.x < opponent.x
    ? Math.min(nextX, opponent.x - 8)
    : Math.max(nextX, opponent.x + 8);
  side.walkUntil = now() + 170;
  if (sideKey === "player" && now() - audio.lastStepAt > 250) {
    audio.lastStepAt = now();
    playSfx("step", { sideKey });
  }
}

function queueBufferedAttack(sideKey, type) {
  const side = state[sideKey];
  const time = now();
  const canBuffer = sideKey === "player"
    || state.matchMode === "online"
    || (sideKey === "cpu" && activeDifficulty().comboChance > 0);
  const actionLocked = time < side.attackUntil || time < side.cooldownUntil;
  if (!canBuffer || !state.running || state.paused || state.finished || !actionLocked) return false;
  if (!side.bufferedAction) side.bufferedAction = type;
  else side.bufferedNext = type;
  side.bufferUntil = Math.max(side.attackUntil, side.cooldownUntil) + 360;
  if (sideKey === "player") {
    els.comboTracker.textContent = `${ACTION_LABELS[type]} buffered`;
    els.comboTracker.classList.add("is-visible", "is-buffered");
  }
  return true;
}

function renderComboTracker(sideKey, inputs) {
  if (sideKey !== "player") return;
  els.comboTracker.classList.remove("is-buffered");
  els.comboTracker.innerHTML = inputs.map((input) => `<b>${ACTION_LABELS[input]}</b>`).join("<i>+</i>");
  els.comboTracker.classList.toggle("is-visible", inputs.length > 0);
}

function registerComboHit(sideKey, type, time) {
  const side = state[sideKey];
  if (time - side.comboInputAt > 1450) side.comboInputs = [];
  side.comboInputAt = time;
  side.comboInputs.push(type);
  side.comboInputs = side.comboInputs.slice(-3);
  renderComboTracker(sideKey, side.comboInputs);
  const fighterId = activeFighter(side).id;
  const matches = (comboMove) => comboMove.sequence.every((input, index) => side.comboInputs[index] === input);
  const namedMove = COMBO_MOVES.find((comboMove) => comboMove.fighter === fighterId && matches(comboMove))
    || COMBO_MOVES.find((comboMove) => !comboMove.fighter && matches(comboMove));
  if (namedMove) side.comboInputs = [];
  return namedMove || null;
}

function showNamedCombo(sideKey, comboMove, impactX) {
  const side = state[sideKey];
  side.namedFinishers += 1;
  if (sideKey === "player") {
    state.matchScore += comboMove.xp;
    els.comboBanner.innerHTML = `<strong>${comboMove.name}</strong><span>+${comboMove.xp} mastery</span>`;
    els.comboBanner.classList.remove("is-visible");
    void els.comboBanner.offsetWidth;
    els.comboBanner.classList.add("is-visible");
    window.setTimeout(() => els.comboBanner.classList.remove("is-visible"), 1250);
  }
  setMoveReadout(comboMove.name, sideKey);
  playSfx("combo", { sideKey });
  cinematicFx.burst(impactX, 56, comboMove.power, comboMove.color || "#20dcff");
  triggerArenaImpact(comboMove.power);
}

function processBufferedAttack(sideKey) {
  const side = state[sideKey];
  if (!side?.bufferedAction) return;
  const time = now();
  if (time > side.bufferUntil) {
    side.bufferedAction = "";
    side.bufferedNext = "";
    if (sideKey === "player") els.comboTracker.classList.remove("is-buffered");
    return;
  }
  if (!canAct(side)) return;
  const action = side.bufferedAction;
  side.bufferedAction = side.bufferedNext;
  side.bufferedNext = "";
  attack(sideKey, action);
}

function attack(sideKey, type) {
  const side = state[sideKey];
  if (!side || !["light", "heavy", "special"].includes(type)) return;
  if (!canAct(side)) {
    queueBufferedAttack(sideKey, type);
    return;
  }

  const fighter = activeFighter(side);
  const bladeHeavy = fighter.weapon?.name?.toLowerCase().includes("saber") || fighter.title?.toLowerCase().includes("blade");
  const specs = {
    light: { name: "Quick Punch", damage: 4, chip: .6, range: 17, duration: 280, cooldown: 320, hitDelay: 65, color: fighter.color, knockback: 1.2, knockdown: 0 },
    heavy: { name: bladeHeavy ? "Blade Heavy" : "Power Kick", damage: 7.5, chip: 1.1, range: 24, duration: 430, cooldown: 500, hitDelay: 115, color: "#ffd400", knockback: 4.2, knockdown: 520 },
    special: { ...fighter.signature, range: 100, duration: 680, cooldown: 880, hitDelay: fighter.weapon.kind === "beam" ? 130 : 335, knockback: 7.5, knockdown: 760 },
  };
  const move = specs[type];
  const time = now();
  const matchId = state.matchId;
  side.blocking = false;
  side.attackPose = type;
  side.attackUntil = time + move.duration;
  const cooldownScale = sideKey === "cpu" && state.matchMode === "cpu" ? activeDifficulty().cooldownScale : 1;
  side.cooldownUntil = time + move.cooldown * cooldownScale;
  setMoveReadout(move.name, sideKey);
  playSfx(type, { sideKey, fighterId: fighter.id });
  broadcastCombatEvent(type, sideKey);

  if (type === "special") createProjectile(sideKey, move.color, fighter.weapon);
  createAttackAfterimage(sideKey, type, fighter);
  window.setTimeout(() => {
    if (state.matchId !== matchId || !state.inBattle || state.finished) return;
    resolveAttackHit(sideKey, type, move, fighter);
  }, move.hitDelay);
  if (type === "special" && fighter.weapon.asset) {
    window.setTimeout(() => {
      if (state.matchId !== matchId || !state.inBattle || state.finished) return;
      resolveWeaponRecall(sideKey, fighter.weapon);
    }, 560);
  }
}

function createAttackAfterimage(sideKey, type, fighter) {
  const fighterEl = sideKey === "player" ? els.playerFighter : els.cpuFighter;
  if (!fighterEl || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const trail = document.createElement("span");
  trail.className = `fighter-afterimage afterimage-${type}`;
  trail.style.backgroundImage = `url("${fighter.sprite}")`;
  trail.style.backgroundPosition = type === "light" ? "66.667% 0" : type === "heavy" ? "100% 0" : "0 100%";
  fighterEl.append(trail);
  window.setTimeout(() => trail.remove(), type === "special" ? 520 : 360);
}

function resolveWeaponRecall(sideKey, weapon) {
  const side = state[sideKey];
  const defenderKey = sideKey === "player" ? "cpu" : "player";
  const defender = state[defenderKey];
  if (!side || !defender || now() < defender.taggingUntil) return;
  const blocking = defender.blocking && now() > defender.stunnedUntil;
  const damage = scaleCombatDamage(blocking ? .45 : 2.4, sideKey);
  const impactX = (side.x + defender.x) / 2;
  if (!blocking) {
    side.combo = now() - side.lastHitAt < 1050 ? side.combo + 1 : 1;
    side.bestCombo = Math.max(side.bestCombo, side.combo);
    side.lastHitAt = now();
    defender.stunnedUntil = Math.max(defender.stunnedUntil, now() + 150);
    showCombo(sideKey, side.combo);
    if (sideKey === "player") state.matchScore += 70 + side.combo * 12;
  }
  setMoveReadout(`${weapon.name} recall`, sideKey);
  applyDamage(defenderKey, damage, { blocking, source: `${weapon.name} Recall`, attackerKey: sideKey, impactX, impactPower: "light" });
}

function resolveAttackHit(sideKey, type, move, fighter) {
  const side = state[sideKey];
  const defenderKey = sideKey === "player" ? "cpu" : "player";
  const defender = state[defenderKey];
  const time = now();
  const distance = Math.abs(side.x - defender.x);
  const connects = distance <= move.range && time > defender.taggingUntil;
  if (!connects) {
    side.comboInputs = [];
    renderComboTracker(sideKey, []);
    if (sideKey === "player") els.moveReadout.textContent += " / WHIFF";
    return;
  }

  const blocking = defender.blocking && time > defender.stunnedUntil;
  const namedCombo = blocking ? null : registerComboHit(sideKey, type, time);
  let damage = blocking ? move.chip : move.damage + (namedCombo?.bonus || 0);
  if (!blocking) damage *= 1 + Math.min(side.combo, 5) * .04;
  if (blocking && type === "special" && isRaging(side)) damage += fighter.rageBonus;
  damage = scaleCombatDamage(damage, sideKey);

  if (blocking) {
    side.comboInputs = [];
    renderComboTracker(sideKey, []);
    const inCorner = defender.x < 12 || defender.x > 88;
    if (inCorner) damage *= .5;
    if (time - defender.chipWindowStart > 950) {
      defender.chipWindowStart = time;
      defender.chipWindowDamage = 0;
    }
    const room = Math.max(0, 12 - defender.chipWindowDamage);
    damage = Math.min(damage, room);
    defender.chipWindowDamage += damage;
  }

  const impactX = (side.x + defender.x) / 2;
  if (!blocking) {
    const direction = side.x <= defender.x ? 1 : -1;
    const finisherBoost = namedCombo ? 1.35 : 1;
    side.x = clamp(side.x + direction * (type === "light" ? 1.5 : type === "heavy" ? 3.4 : 5.2), 7, 93);
    defender.x = clamp(defender.x + direction * move.knockback * finisherBoost, 7, 93);
    if (move.knockdown || namedCombo) {
      const knockdownTime = Math.max(move.knockdown || 0, namedCombo ? 620 : 0);
      defender.knockdownUntil = Math.max(defender.knockdownUntil, time + knockdownTime);
      defender.stunnedUntil = Math.max(defender.stunnedUntil, time + knockdownTime + 130);
    }
  }

  side.combo = !blocking && time - side.lastHitAt < 1050 ? side.combo + 1 : blocking ? 0 : 1;
  side.bestCombo = Math.max(side.bestCombo, side.combo);
  side.lastHitAt = time;
  if (sideKey === "player" && !blocking) state.matchScore += Math.round(damage * 12 + side.combo * 18);
  if (sideKey === "player" && !blocking) {
    state.street.heat = clamp(state.street.heat + (type === "special" ? 14 : type === "heavy" ? 9 : 5), 0, 100);
    progressStreetContract(type === "special" ? "specials" : "hits");
    renderStreetUtility();
  }
  if (namedCombo) showNamedCombo(sideKey, namedCombo, impactX);
  applyDamage(defenderKey, damage, { blocking, source: namedCombo?.name || move.name, attackerKey: sideKey, impactX, impactPower: namedCombo ? "special" : type });
  side.rage = clamp(side.rage + damage * 1.7 + (blocking ? 1 : 3), 0, 100);
  defender.rage = clamp(defender.rage + damage * 3 + (blocking ? 1.5 : 4), 0, 100);

  if (!blocking) {
    defender.stunnedUntil = Math.max(defender.stunnedUntil, time + (type === "heavy" ? 360 : type === "special" ? 430 : 220));
    showCombo(sideKey, side.combo);
    if (!state.finished && side.combo === 3 && !namedCombo) playSfx("combo", { sideKey });
    if (move.knockdown || namedCombo) {
      const soundMatchId = state.matchId;
      window.setTimeout(() => {
        if (state.matchId === soundMatchId && state.inBattle) playSfx("knockdown", { sideKey: defenderKey });
      }, type === "special" ? 250 : 190);
    }
    if (!state.finished && namedCombo) showCombatCallout(`${namedCombo.name}!`, "combo");
    else if (!state.finished && type === "special") showCombatCallout("Shocking blow!", "shock");
    else if (!state.finished && side.combo >= 3) showCombatCallout(`${side.combo} hit combo!`, "combo");
    triggerArenaImpact(namedCombo ? namedCombo.power : type === "special" ? "hard" : type === "heavy" ? "medium" : "light");
  } else {
    showCombo(sideKey, 0);
  }
}

function showCombatCallout(text, tone = "combo") {
  els.combatCallout.textContent = text;
  els.combatCallout.dataset.tone = tone;
  els.combatCallout.classList.remove("is-visible");
  void els.combatCallout.offsetWidth;
  els.combatCallout.classList.add("is-visible");
}

function triggerArenaImpact(power = "light") {
  els.arena.dataset.impact = power;
  els.arena.classList.remove("is-impacting");
  void els.arena.offsetWidth;
  els.arena.classList.add("is-impacting");
  state.hitStopUntil = Math.max(state.hitStopUntil, now() + (power === "hard" ? 105 : power === "medium" ? 62 : 32));
  window.setTimeout(() => els.arena.classList.remove("is-impacting"), power === "hard" ? 430 : 260);
}

function applyDamage(sideKey, amount, details = {}) {
  const side = state[sideKey];
  if (!side || amount <= 0) return;
  side.health[side.active] = clamp(side.health[side.active] - amount, 0, 100);
  side.hitUntil = now() + 290;
  const power = details.impactPower === "special" ? "hard" : details.impactPower === "heavy" ? "medium" : "light";
  const impactX = Number.isFinite(details.impactX) ? details.impactX : side.x;
  const impactColor = details.blocking ? "#20dcff" : power === "hard" ? "#9b7cff" : "#ffd400";
  createImpact(impactX, impactColor, power);
  cinematicFx.burst(impactX, details.blocking ? 55 : 59, power, impactColor);
  playSfx(details.blocking ? "block" : "impact", { sideKey });
  broadcastCombatEvent(details.blocking ? "block" : "impact", sideKey);
  renderBattle();
  checkKnockout(sideKey);
}

function checkKnockout(sideKey) {
  const side = state[sideKey];
  if (side.health[side.active] > 0) return;
  if (!hasTeammate(side)) {
    endMatch(sideKey === "cpu" ? "player" : "cpu", "KO");
    return;
  }
  const backup = teammateIndex(side);
  if (side.health[backup] > 0) {
    announce("Forced tag");
    side.active = backup;
    side.taggingUntil = now() + 650;
    side.stunnedUntil = now() + 760;
    side.knockdownUntil = now() + 460;
    side.blocking = false;
    side.comboInputs = [];
    side.bufferedAction = "";
    side.bufferedNext = "";
    renderBattle(true);
  } else {
    endMatch(sideKey === "cpu" ? "player" : "cpu", "KO");
  }
}

function showCombo(sideKey, combo) {
  if (combo < 2) {
    els.comboCounter.classList.remove("is-visible");
    return;
  }
  els.comboCounter.style.left = sideKey === "cpu" ? "5%" : "auto";
  els.comboCounter.style.right = sideKey === "player" ? "5%" : "auto";
  els.comboCounter.style.textAlign = sideKey === "player" ? "right" : "left";
  els.comboCounter.textContent = `${combo} hit combo!`;
  els.comboCounter.classList.add("is-visible");
}

function tag(sideKey) {
  const side = state[sideKey];
  if (!hasTeammate(side)) return;
  const backup = teammateIndex(side);
  const time = now();
  if (!canAct(side) || side.health[backup] <= 0 || time < side.tagCooldownUntil) return;
  side.active = backup;
  side.tagCooldownUntil = time + 3500;
  side.taggingUntil = time + 520;
  side.cooldownUntil = time + 600;
  side.blocking = false;
  side.combo = 0;
  side.comboInputs = [];
  side.bufferedAction = "";
  side.bufferedNext = "";
  renderComboTracker(sideKey, []);
  announce("Tag!");
  setMoveReadout("Tag switch", sideKey);
  renderBattle(true);
}

function activateRage(sideKey) {
  const side = state[sideKey];
  if (!canAct(side) || side.rage < 100 || isRaging(side)) return;
  side.rage = 0;
  side.rageUntil = now() + 8000;
  side.cooldownUntil = now() + 500;
  const fighter = activeFighter(side);
  announce(`${fighter.name} ${fighter.rageName || "rage"}`);
  setMoveReadout(`${fighter.rageName || "Rage"} +${fighter.rageBonus.toFixed(1)}% chip`, sideKey);
  renderBattle();
}

function createImpact(x, color, power = "light") {
  const spark = document.createElement("span");
  spark.className = "hit-spark";
  spark.dataset.power = power;
  spark.style.left = `${x}%`;
  spark.style.top = `${58 + Math.random() * 14}%`;
  spark.style.borderColor = color;
  els.effectsLayer.append(spark);
  window.setTimeout(() => spark.remove(), 450);
}

function createProjectile(sideKey, color, weapon) {
  const attacker = state[sideKey];
  const defender = state[sideKey === "player" ? "cpu" : "player"];
  if (weapon?.asset) {
    const projectile = document.createElement("span");
    projectile.className = `weapon-projectile weapon-${weapon.kind}`;
    projectile.setAttribute("role", "img");
    projectile.setAttribute("aria-label", weapon.name);
    projectile.style.setProperty("--from", `${attacker.x}%`);
    projectile.style.setProperty("--to", `${defender.x}%`);
    projectile.style.setProperty("--weapon-top", `${weapon.kind === "hat" ? 48 : 54}%`);
    projectile.style.setProperty("--weapon-image", `url("${weapon.asset}")`);
    projectile.style.setProperty("--travel-direction", attacker.x <= defender.x ? "1" : "-1");
    els.effectsLayer.append(projectile);
    window.setTimeout(() => projectile.remove(), 780);
    return;
  }
  if (weapon?.beamStyle === "ordinal") {
    [
      { color: "#20dcff", top: 47.5, className: "ordinal-laser-cyan" },
      { color: "#ff62c7", top: 49.1, className: "ordinal-laser-pink" },
    ].forEach((laser) => {
      const beam = document.createElement("span");
      beam.className = `projectile projectile-ordinal ${laser.className}`;
      beam.setAttribute("aria-hidden", "true");
      beam.style.setProperty("--from", `${attacker.x}%`);
      beam.style.setProperty("--to", `${defender.x}%`);
      beam.style.setProperty("--top", `${laser.top}%`);
      beam.style.setProperty("--projectile-color", laser.color);
      els.effectsLayer.append(beam);
      window.setTimeout(() => beam.remove(), 440);
    });
    return;
  }
  if (weapon?.beamStyle === "midas" || weapon?.beamStyle === "duck") {
    const isMidas = weapon.beamStyle === "midas";
    const bursts = isMidas
      ? [{ color: "#fff4b0", top: 49.5 }, { color: "#f7bb2c", top: 52.5 }, { color: "#43dfff", top: 55.5 }]
      : [{ color: "#fff4c9", top: 51 }, { color: "#d9b247", top: 54 }];
    bursts.forEach((burst, index) => {
      const beam = document.createElement("span");
      beam.className = `projectile projectile-${weapon.beamStyle}`;
      beam.setAttribute("aria-hidden", "true");
      beam.style.setProperty("--from", `${attacker.x}%`);
      beam.style.setProperty("--to", `${defender.x}%`);
      beam.style.setProperty("--top", `${burst.top}%`);
      beam.style.setProperty("--projectile-color", burst.color);
      beam.style.setProperty("--burst-delay", `${index * 36}ms`);
      els.effectsLayer.append(beam);
      window.setTimeout(() => beam.remove(), 520);
    });
    return;
  }
  const beam = document.createElement("span");
  beam.className = "projectile";
  beam.style.setProperty("--from", `${attacker.x}%`);
  beam.style.setProperty("--to", `${defender.x}%`);
  beam.style.setProperty("--top", `${58 + Math.random() * 10}%`);
  beam.style.setProperty("--projectile-color", color);
  els.effectsLayer.append(beam);
  window.setTimeout(() => beam.remove(), 360);
}

function createHazardFlash(color) {
  const flash = document.createElement("span");
  flash.className = "hazard-flash";
  flash.style.background = color;
  els.effectsLayer.append(flash);
  window.setTimeout(() => flash.remove(), 460);
}

function queueHazard() {
  if (state.hazardPending || !state.running || state.finished) return;
  state.hazardPending = true;
  const stage = STAGES[state.stageIndex];
  const hazard = stage.hazards[Math.floor(Math.random() * stage.hazards.length)];
  const matchId = state.matchId;
  els.hazardAlert.textContent = `Warning / ${hazard.name}`;
  els.hazardAlert.style.borderColor = stage.accent;
  els.hazardAlert.style.color = stage.accent;
  els.hazardAlert.classList.add("is-visible");
  playSfx("hazardWarning");
  broadcastCombatEvent("hazardWarning");
  window.setTimeout(() => {
    if (state.matchId !== matchId || !state.inBattle || state.finished) return;
    resolveHazard(hazard, stage.accent);
    els.hazardAlert.classList.remove("is-visible");
    state.hazardPending = false;
    const difficulty = state.matchMode === "cpu" ? activeDifficulty() : DIFFICULTIES.medium;
    const [minimumDelay, maximumDelay] = difficulty.hazardDelay;
    state.hazardNext = now() + minimumDelay + Math.random() * (maximumDelay - minimumDelay);
  }, 1450);
}

function resolveHazard(hazard, accent) {
  createHazardFlash(`color-mix(in srgb, ${accent} 32%, transparent)`);
  playSfx("hazardImpact");
  broadcastCombatEvent("hazardImpact");
  if (hazard.name === "Lightning Strike") cinematicFx.lightning(50, "hard");
  else cinematicFx.burst(50, 54, hazard.damage >= 15 ? "hard" : "medium", accent);
  setMoveReadout(hazard.name, "player");
  const targetKeys = hazard.target === "both" ? ["player", "cpu"] : [Math.random() > 0.5 ? "player" : "cpu"];

  targetKeys.forEach((sideKey) => {
    const side = state[sideKey];
    if (hazard.damage > 0) {
      const blocking = side.blocking;
      const inCorner = side.x < 12 || side.x > 88;
      let amount = blocking && hazard.chip > 0 ? hazard.chip * (inCorner ? 0.5 : 1) : hazard.damage;
      if (state.matchMode === "cpu" && sideKey === "player") amount *= activeDifficulty().hazardDamage;
      applyDamage(sideKey, amount, { blocking, source: hazard.name });
    }

    const time = now();
    if (hazard.effect === "stun") side.stunnedUntil = Math.max(side.stunnedUntil, time + 800);
    if (hazard.effect === "knockdown" || hazard.effect === "launch") {
      side.knockdownUntil = Math.max(side.knockdownUntil, time + 820);
      side.stunnedUntil = Math.max(side.stunnedUntil, time + 1050);
      triggerArenaImpact("hard");
    }
    if (hazard.effect === "burn") {
      const matchId = state.matchId;
      window.setTimeout(() => {
        if (state.matchId === matchId && state.running) applyDamage(sideKey, 2, { source: "Burn" });
      }, 720);
    }
    if (hazard.effect === "blind") side.blindUntil = time + 1200;
    if (hazard.effect === "meter") side.rage = clamp(side.rage - 18, 0, 100);
    if (hazard.effect === "reverse" && sideKey === "player") state.reverseUntil = time + 2000;
  });

  if (hazard.effect === "pull") {
    state.player.x = Math.min(46, state.player.x + 12);
    state.cpu.x = Math.max(54, state.cpu.x - 12);
  }
  if (hazard.effect === "push") {
    state.player.x = clamp(state.player.x - 10, 7, 93);
    state.cpu.x = clamp(state.cpu.x + 10, 7, 93);
  }
  if (hazard.effect === "switch") {
    const oldPlayerX = state.player.x;
    state.player.x = state.cpu.x;
    state.cpu.x = oldPlayerX;
  }
  if (hazard.effect === "reverse") announce("Controls reversed");
  renderBattle();
}

function performAiAttack(type, difficulty) {
  attack("cpu", type);
  if (type === "special" || difficulty.comboChance <= 0 || Math.random() >= difficulty.comboChance) return;
  const matchId = state.matchId;
  const followups = ["light", "heavy"];
  followups.forEach((action, index) => {
    window.setTimeout(() => {
      if (state.matchId === matchId && state.inBattle && state.running && !state.finished) attack("cpu", action);
    }, 72 + index * 66);
  });
}

function updateAI(delta, time) {
  const cpu = state.cpu;
  const difficulty = activeDifficulty();
  if (!canAct(cpu)) return;
  if (hasTeammate(cpu) && cpu.health[cpu.active] < 28 && cpu.health[teammateIndex(cpu)] > cpu.health[cpu.active] + 12 && Math.random() < difficulty.tagChance) {
    tag("cpu");
    return;
  }
  if (cpu.rage >= 100 && Math.random() < difficulty.rageChance) {
    activateRage("cpu");
    return;
  }

  const distance = Math.abs(cpu.x - state.player.x);
  if (time < state.player.attackUntil && Math.random() < difficulty.guardChance) {
    if (!cpu.blocking) playSfx("guard", { sideKey: "cpu" });
    cpu.blocking = true;
    const guardWindow = difficulty.id === "very-hard" ? 520 : difficulty.id === "easy" ? 260 : 360;
    cpu.cooldownUntil = time + guardWindow;
    window.setTimeout(() => { if (state.cpu === cpu) cpu.blocking = false; }, guardWindow + 60);
    return;
  }

  cpu.blocking = false;
  if (distance > 19 && Math.random() < difficulty.approachChance) {
    const direction = cpu.x > state.player.x ? -1 : 1;
    cpu.x = clamp(cpu.x + direction * difficulty.moveSpeed * delta, 7, 93);
    cpu.walkUntil = time + 210;
  }

  if (time > cpu.cooldownUntil) {
    const roll = Math.random();
    if (distance < 16) {
      if (roll < difficulty.closeThresholds[0]) performAiAttack("light", difficulty);
      else if (roll < difficulty.closeThresholds[1]) performAiAttack("heavy", difficulty);
      else if (roll < difficulty.closeThresholds[2]) performAiAttack("special", difficulty);
      else cpu.cooldownUntil = time + difficulty.idleCooldown;
    } else if (distance < 30) {
      if (roll < difficulty.midThresholds[0]) performAiAttack("heavy", difficulty);
      else if (roll < difficulty.midThresholds[1]) performAiAttack("special", difficulty);
      else cpu.cooldownUntil = time + difficulty.idleCooldown;
    } else if (roll < difficulty.farSpecialChance) {
      performAiAttack("special", difficulty);
    } else {
      cpu.cooldownUntil = time + difficulty.idleCooldown;
    }
  }
}

function update(delta, time) {
  if (!state.inBattle || !state.running || state.paused || state.finished) return;
  if (time < state.hitStopUntil) {
    renderBattle();
    return;
  }
  if (state.matchMode === "online" && state.online.role === "guest") return;
  processBufferedAttack("player");
  processBufferedAttack("cpu");
  state.seconds = Math.max(0, state.seconds - delta);
  if (state.seconds <= 0) {
    const playerTotal = state.player.health.reduce((sum, hp) => sum + hp, 0);
    const cpuTotal = state.cpu.health.reduce((sum, hp) => sum + hp, 0);
    endMatch(playerTotal >= cpuTotal ? "player" : "cpu", "Time");
    return;
  }

  const reverse = time < state.reverseUntil ? -1 : 1;
  const playerLeft = state.keys.left || state.gamepad.left;
  const playerRight = state.keys.right || state.gamepad.right;
  const playerBlock = state.keys.block || state.gamepad.block;
  state.player.blocking = playerBlock && time > state.player.stunnedUntil && time > state.player.attackUntil;
  if (playerLeft) moveSide("player", -25 * delta * reverse);
  if (playerRight) moveSide("player", 25 * delta * reverse);
  updateStreetDrops(time);

  if (state.matchMode === "online" && state.online.role === "host") {
    const remoteKeys = state.online.remoteKeys;
    state.cpu.blocking = remoteKeys.block && time > state.cpu.stunnedUntil && time > state.cpu.attackUntil;
    if (remoteKeys.left) moveSide("cpu", -25 * delta);
    if (remoteKeys.right) moveSide("cpu", 25 * delta);
    state.online.snapshotClock += delta;
    if (state.online.snapshotClock >= 0.05) {
      state.online.snapshotClock = 0;
      sendCombatSnapshot();
    }
  } else {
    state.aiClock += delta;
    if (state.aiClock > activeDifficulty().thinkEvery) {
      updateAI(state.aiClock, time);
      state.aiClock = 0;
    }
  }

  if (time >= state.hazardNext) queueHazard();
  renderBattle();
}

function renderSide(sideKey, force = false) {
  const side = state[sideKey];
  const fighter = activeFighter(side);
  const backup = hasTeammate(side) ? FIGHTERS[side.team[teammateIndex(side)]] : null;
  const isPlayer = sideKey === "player";
  const fighterEl = isPlayer ? els.playerFighter : els.cpuFighter;
  const spriteEl = isPlayer ? els.playerFighterSprite : els.cpuFighterSprite;
  const portraitEl = isPlayer ? els.playerPortrait : els.cpuPortrait;
  const tagPortraitEl = isPlayer ? els.playerTagPortrait : els.cpuTagPortrait;
  const nameEl = isPlayer ? els.playerName : els.cpuName;
  const healthEl = isPlayer ? els.playerHealth : els.cpuHealth;
  const healthTextEl = isPlayer ? els.playerHealthText : els.cpuHealthText;
  const rageEl = isPlayer ? els.playerRage : els.cpuRage;

  const time = now();
  const opponent = state[isPlayer ? "cpu" : "player"];
  fighterEl.style.setProperty("--x", `${side.x}%`);
  fighterEl.style.setProperty("--sprite-ratio", String(fighter.spriteRatio));
  fighterEl.classList.toggle("is-facing-left", side.x > opponent.x);
  fighterEl.classList.toggle("is-blocking", side.blocking);
  fighterEl.classList.toggle("is-attacking", time < side.attackUntil);
  fighterEl.classList.toggle("is-hit", time < side.hitUntil);
  fighterEl.classList.toggle("is-knocked-down", time < side.knockdownUntil || side.finishPose === "down");
  fighterEl.classList.toggle("is-victorious", side.finishPose === "victory");
  fighterEl.classList.toggle("is-tagging", time < side.taggingUntil);
  fighterEl.classList.toggle("is-stunned", time < side.stunnedUntil);
  fighterEl.classList.toggle("is-raging", isRaging(side));
  fighterEl.classList.toggle("is-dashing", sideKey === "player" && time < state.dashUntil);
  fighterEl.style.setProperty("--dash-direction", side.x <= opponent.x ? "1" : "-1");
  fighterEl.style.opacity = time < side.blindUntil ? "0.24" : "1";

  let pose;
  if (side.finishPose === "down") pose = "hit";
  else if (side.finishPose === "victory") pose = "tag";
  else if (time < side.taggingUntil) pose = "tag";
  else if (time < side.knockdownUntil || time < side.hitUntil || time < side.stunnedUntil) pose = "hit";
  else if (side.blocking) pose = "block";
  else if (time < side.attackUntil) pose = side.attackPose;
  else if (time < side.walkUntil) pose = Math.floor(time / 115) % 2 ? "step" : "idle";
  else pose = Math.floor((time + (isPlayer ? 0 : 390)) / 780) % 2 ? "step" : "idle";

  spriteEl.dataset.pose = pose;
  fighterEl.dataset.pose = pose;

  if (force || spriteEl.dataset.fighter !== fighter.id) {
    spriteEl.style.backgroundImage = `url("${fighter.sprite}")`;
    spriteEl.classList.toggle("is-wallet-skin", fighter.walletSkin === true);
    if (fighter.walletSkin) {
      spriteEl.style.setProperty("--wallet-art", `url("${fighter.walletArt || fighter.image}")`);
      spriteEl.style.setProperty("--wallet-mask", `url("${fighter.sprite}")`);
    } else {
      spriteEl.style.removeProperty("--wallet-art");
      spriteEl.style.removeProperty("--wallet-mask");
    }
    spriteEl.setAttribute("aria-label", `${fighter.name}, ${pose} pose`);
    spriteEl.dataset.fighter = fighter.id;
    portraitEl.src = fighter.image;
    portraitEl.alt = fighter.name;
    tagPortraitEl.parentElement.hidden = !backup;
    if (backup) {
      tagPortraitEl.src = backup.image;
      tagPortraitEl.alt = backup.name;
    }
    nameEl.textContent = fighter.name;
  } else {
    spriteEl.setAttribute("aria-label", `${fighter.name}, ${pose} pose`);
  }

  const hp = side.health[side.active];
  healthEl.style.width = `${hp}%`;
  healthTextEl.textContent = `${Math.ceil(hp)}%`;
  rageEl.style.width = `${isRaging(side) ? ((side.rageUntil - now()) / 8000) * 100 : side.rage}%`;
}

function renderBattle(force = false) {
  if (!state.player || !state.cpu) return;
  renderSide("player", force);
  renderSide("cpu", force);
  els.roundTimer.textContent = String(Math.max(0, Math.ceil(state.seconds))).padStart(2, "0");
}

function endMatch(winner, reason, options = {}) {
  if (state.finished) return;
  state.finished = true;
  state.running = false;
  const loserKey = winner === "player" ? "cpu" : "player";
  const winnerSide = state[winner];
  const loserSide = state[loserKey];
  loserSide.finishPose = "down";
  loserSide.blocking = false;
  loserSide.knockdownUntil = Number.POSITIVE_INFINITY;
  winnerSide.finishPose = "victory";
  winnerSide.blocking = false;
  renderBattle(true);
  const localWon = state.matchMode === "online" && state.online.role === "guest" ? winner === "cpu" : winner === "player";
  duckMusic(0.12);
  if (reason === "KO") {
    announce("K.T.O.!", "fatality");
    triggerArenaImpact("hard");
    cinematicFx.burst(loserSide.x, 63, "hard", "#ff281e");
  } else {
    announce(localWon ? "Victory" : "Defeat", localWon ? "victory" : "defeat");
  }
  const playerTotal = Math.round(state.player.health.reduce((sum, hp) => sum + hp, 0));
  const cpuTotal = Math.round(state.cpu.health.reduce((sum, hp) => sum + hp, 0));
  const localTotal = state.matchMode === "online" && state.online.role === "guest" ? cpuTotal : playerTotal;
  const rivalTotal = state.matchMode === "online" && state.online.role === "guest" ? playerTotal : cpuTotal;
  const localSide = state.matchMode === "online" && state.online.role === "guest" ? state.cpu : state.player;
  const rawMastery = Math.max(state.matchScore, state.matchMode === "online" && state.online.role === "guest" ? Math.round((200 - rivalTotal) * 6 + localSide.combo * 35) : 0);
  const rewardMultiplier = state.matchMode === "cpu" ? activeDifficulty().rewardMultiplier : 1;
  const earnedMastery = Math.round(rawMastery * rewardMultiplier);
  profile.masteryXp += earnedMastery;
  profile.bestCombo = Math.max(profile.bestCombo || 0, localSide.bestCombo || localSide.combo || 0);
  profile.totalFinishers += localSide.namedFinishers || 0;
  recordMatch(localWon, reason === "KO");
  if (state.matchMode === "online" && state.online.role === "host" && !options.remote) {
    sendOnline({ type: "matchEnd", winner, reason });
  }
  const matchId = state.matchId;
  window.setTimeout(() => {
    if (state.matchId !== matchId) return;
    const resultMode = state.matchMode === "cpu" ? activeDifficulty().name : "Online rival";
    els.resultLabel.textContent = `${reason} / ${STAGES[state.stageIndex].name} / ${resultMode}`;
    els.resultTitle.textContent = reason === "KO"
      ? (localWon ? "K.T.O. Victory" : "K.T.O. Defeat")
      : (localWon ? "Victory" : "Defeat");
    els.resultTitle.style.color = localWon ? "var(--green)" : "var(--magenta)";
    els.resultDetail.textContent = `Final team health: ${localTotal}% to ${rivalTotal}%. +${earnedMastery} mastery XP${rewardMultiplier !== 1 ? ` (${rewardMultiplier}× round bonus)` : ""} / Level ${masteryLevel()}. ${localWon ? "Your tag team held the arena." : "Your rival broke your guard."}`;
    $("span", els.rematchButton).textContent = state.matchMode === "online" && state.online.role === "guest" ? "Waiting for host" : "Run it back";
    els.rematchButton.disabled = state.matchMode === "online" && state.online.role === "guest";
    els.resultOverlay.hidden = false;
    (els.rematchButton.disabled ? els.newTeamsButton : els.rematchButton).focus();
  }, reason === "KO" ? 1900 : 1050);
}

function setPaused(paused) {
  if (!state.inBattle || state.finished) return;
  state.paused = paused;
  state.keys = { left: false, right: false, block: false };
  els.pauseOverlay.hidden = !paused;
  duckMusic(paused ? 0.1 : 1);
  playSfx(paused ? "pause" : "resume");
  if (state.matchMode === "online" && state.online.role === "host") sendOnline({ type: "pause", paused });
  if (paused) els.resumeButton.focus();
  else state.lastFrame = now();
}

function returnToSelect(options = {}) {
  if (state.matchMode === "online" && state.online.connected && !options.remote) sendOnline({ type: "returnSelect" });
  state.matchId += 1;
  state.inBattle = false;
  state.running = false;
  state.paused = false;
  state.finished = false;
  state.race.active = false;
  state.race.finished = false;
  state.race.garage = false;
  state.hitStopUntil = 0;
  els.pauseOverlay.hidden = true;
  els.resultOverlay.hidden = true;
  els.battleScreen.hidden = true;
  els.raceScreen.hidden = true;
  els.raceGarage.hidden = true;
  els.selectScreen.hidden = false;
  els.universeShell.hidden = false;
  state.online.localReady = false;
  state.online.remoteReady = false;
  if (state.matchMode === "online" && state.online.connected) sendOnline({ type: "ready", ready: false });
  renderSelection();
  startTheme("select", true);
  els.fightButton.focus();
}

function validTeam(team) {
  return Array.isArray(team)
    && team.length === 2
    && new Set(team).size === 2
    && team.every((index) => Number.isInteger(index) && index >= 0 && index < FIGHTERS.length);
}

function setRoomStatus(message, status = "idle") {
  els.roomStatusText.textContent = message;
  els.roomStatus.classList.toggle("is-working", status === "working");
  els.roomStatus.classList.toggle("is-connected", status === "connected");
  els.roomStatus.classList.toggle("is-error", status === "error");
}

function roomPeerId(code) {
  return `mutant-zero-${code.toLowerCase()}`;
}

function generateRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const random = new Uint32Array(6);
  crypto.getRandomValues(random);
  return [...random].map((value) => alphabet[value % alphabet.length]).join("");
}

function publicProfile() {
  return {
    wins: profile.wins,
    kos: profile.kos,
    bestStreak: profile.bestStreak,
    highScore: Math.max(profile.highScore || 0, calculateHighScore()),
  };
}

function sendOnline(message) {
  const connection = state.online.connection;
  if (!connection?.open) return false;
  try {
    connection.send(message);
    return true;
  } catch {
    return false;
  }
}

function sendHello() {
  sendOnline({
    type: "hello",
    name: profile.name,
    team: teamWireFormat(state.selected),
    stats: publicProfile(),
  });
}

function resetOnlineTransport({ notify = true } = {}) {
  if (notify) sendOnline({ type: "leave" });
  try { state.online.connection?.close(); } catch { /* Already closed. */ }
  try { state.online.peer?.destroy(); } catch { /* Already destroyed. */ }
  state.online.peer = null;
  state.online.connection = null;
  state.online.role = null;
  state.online.roomCode = "";
  state.online.connected = false;
  state.online.localReady = false;
  state.online.remoteReady = false;
  state.online.remoteName = "Rival";
  state.online.remoteSelected = [];
  state.online.remoteStats = null;
  state.online.remoteKeys = { left: false, right: false, block: false };
  els.copyRoomButton.hidden = true;
}

function handleConnectionClosed() {
  state.online.connected = false;
  state.online.connection = null;
  state.online.remoteReady = false;
  state.online.remoteSelected = [];
  if (state.online.role === "host" && state.online.peer && !state.online.peer.destroyed) {
    setRoomStatus(`Rival left. Room ${state.online.roomCode} is still open.`, "working");
  } else {
    setRoomStatus("Connection closed. Join or host another room.", "error");
  }
  renderSelection();
  if (state.inBattle && state.matchMode === "online") {
    announce("Rival disconnected");
    window.setTimeout(() => returnToSelect({ remote: true }), 1000);
  }
}

function attachConnection(connection) {
  if (state.online.connection?.open && state.online.connection !== connection) {
    connection.close();
    return;
  }
  state.online.connection = connection;
  connection.on("open", () => {
    state.online.connected = true;
    state.online.localReady = false;
    state.online.remoteReady = false;
    setRoomStatus(`Connected to rival / room ${state.online.roomCode}`, "connected");
    sendHello();
    if (state.online.role === "host") sendOnline({ type: "stage", stageIndex: state.stageIndex });
    renderSelection();
    playSfx("confirm");
  });
  connection.on("data", handleOnlineMessage);
  connection.on("close", handleConnectionClosed);
  connection.on("error", () => setRoomStatus("The rival connection failed. Try a new room.", "error"));
}

function attachPeerEvents(peer) {
  peer.on("error", (error) => {
    const message = error?.type === "peer-unavailable"
      ? "Room not found. Check the code and try again."
      : error?.type === "unavailable-id"
        ? "That room code is already in use. Host a new room."
        : "Online service could not connect. Check your network.";
    setRoomStatus(message, "error");
  });
  peer.on("disconnected", () => {
    if (!state.online.connected) setRoomStatus("Signaling disconnected. Reconnecting…", "working");
    try { if (!peer.destroyed) peer.reconnect(); } catch { /* A new room can still be created. */ }
  });
}

function hostOnlineRoom() {
  if (!window.Peer) {
    setRoomStatus("Online library did not load. Refresh and check the network.", "error");
    return;
  }
  resetOnlineTransport();
  state.matchMode = "online";
  state.online.role = "host";
  state.online.roomCode = generateRoomCode();
  setRoomStatus("Opening secure room…", "working");
  const peer = new window.Peer(roomPeerId(state.online.roomCode), { debug: 0 });
  state.online.peer = peer;
  attachPeerEvents(peer);
  peer.on("open", () => {
    setRoomStatus(`Room ${state.online.roomCode} ready. Share the code.`, "working");
    els.copyRoomButton.hidden = false;
    els.copyRoomButton.textContent = state.online.roomCode;
  });
  peer.on("connection", attachConnection);
  renderSelection();
}

function joinOnlineRoom() {
  if (!window.Peer) {
    setRoomStatus("Online library did not load. Refresh and check the network.", "error");
    return;
  }
  const code = els.roomCodeInput.value.toUpperCase().replace(/[^A-Z2-9]/g, "").slice(0, 6);
  els.roomCodeInput.value = code;
  if (code.length !== 6) {
    setRoomStatus("Enter the six-character room code.", "error");
    return;
  }
  resetOnlineTransport();
  state.matchMode = "online";
  state.online.role = "guest";
  state.online.roomCode = code;
  setRoomStatus(`Connecting to room ${code}…`, "working");
  const peer = new window.Peer(undefined, { debug: 0 });
  state.online.peer = peer;
  attachPeerEvents(peer);
  peer.on("open", () => {
    const connection = peer.connect(roomPeerId(code), { serialization: "json", reliable: false });
    attachConnection(connection);
  });
  renderSelection();
}

function setGameMode(mode) {
  if (state.inBattle || !["cpu", "online"].includes(mode)) return;
  if (mode === "cpu" && state.matchMode === "online") resetOnlineTransport();
  state.matchMode = mode;
  els.onlineLobby.hidden = mode !== "online";
  els.modeButtons.forEach((button) => {
    const selected = button.dataset.gameMode === mode;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  setRoomStatus(mode === "online" ? "Host a room or enter a code." : "CPU exhibition ready.");
  renderSelection();
  playSfx("select");
}

function notifySelectionChanged() {
  if (state.matchMode !== "online" || !state.online.connected) return;
  state.online.localReady = false;
  sendOnline({ type: "selection", team: teamWireFormat(state.selected) });
  sendOnline({ type: "ready", ready: false });
}

function startOnlineFight(forceRematch = false) {
  if (!state.online.connected || !validTeam(state.selected)) return;
  if (state.online.role === "guest") {
    state.online.localReady = true;
    sendOnline({ type: "selection", team: teamWireFormat(state.selected) });
    sendOnline({ type: "ready", ready: true });
    renderSelection();
    playSfx("confirm");
    return;
  }
  if (!validTeam(state.online.remoteSelected) || (!state.online.remoteReady && !forceRematch)) return;
  const match = {
    type: "start",
    stageIndex: state.stageIndex,
    hostTeam: teamWireFormat(state.selected),
    guestTeam: teamWireFormat(state.online.remoteSelected),
  };
  sendOnline(match);
  state.online.localReady = false;
  state.online.remoteReady = false;
  startMatch({ online: true, playerTeam: state.selected, cpuTeam: state.online.remoteSelected });
}

function requestPause(paused) {
  if (state.matchMode !== "online") {
    setPaused(paused);
  } else if (state.online.role === "host") {
    setPaused(paused);
  } else {
    sendOnline({ type: "pauseRequest", paused });
  }
}

function performPlayerAction(action) {
  if (state.matchMode === "online" && state.online.role === "guest") {
    sendOnline({ type: "action", action });
    return;
  }
  if (action === "tag") tag("player");
  else if (action === "rage") activateRage("player");
  else if (action === "dash") dash("player");
  else attack("player", action);
}

function setPlayerKey(key, active) {
  if (state.matchMode === "online" && state.online.role === "guest") {
    state.keys[key] = active;
    sendMergedOnlineKeys();
    return;
  }
  state.keys[key] = active;
}

function broadcastCombatEvent(name, sideKey) {
  if (state.matchMode === "online" && state.online.role === "host" && state.inBattle) {
    sendOnline({ type: "combatEvent", name, sideKey });
  }
}

function sideSnapshot(side, time) {
  const remaining = (deadline) => Math.max(0, deadline - time);
  return {
    team: [...side.team],
    active: side.active,
    health: [...side.health],
    rage: side.rage,
    x: side.x,
    blocking: side.blocking,
    attackPose: side.attackPose,
    combo: side.combo,
    bestCombo: side.bestCombo,
    rageRemaining: remaining(side.rageUntil),
    stunnedRemaining: remaining(side.stunnedUntil),
    attackRemaining: remaining(side.attackUntil),
    walkRemaining: remaining(side.walkUntil),
    hitRemaining: remaining(side.hitUntil),
    knockdownRemaining: remaining(side.knockdownUntil),
    taggingRemaining: remaining(side.taggingUntil),
    cooldownRemaining: remaining(side.cooldownUntil),
    tagCooldownRemaining: remaining(side.tagCooldownUntil),
    blindRemaining: remaining(side.blindUntil),
  };
}

function sendCombatSnapshot() {
  if (state.matchMode !== "online" || state.online.role !== "host" || !state.online.connected) return;
  const time = now();
  sendOnline({
    type: "snapshot",
    seconds: state.seconds,
    running: state.running,
    player: sideSnapshot(state.player, time),
    cpu: sideSnapshot(state.cpu, time),
    moveReadout: els.moveReadout.textContent,
    hazardText: els.hazardAlert.textContent,
    hazardVisible: els.hazardAlert.classList.contains("is-visible"),
    comboText: els.comboCounter.textContent,
    comboVisible: els.comboCounter.classList.contains("is-visible"),
    comboBannerText: els.comboBanner.textContent,
    comboBannerVisible: els.comboBanner.classList.contains("is-visible"),
  });
}

function applySideSnapshot(side, snapshot) {
  const time = now();
  side.team = [...snapshot.team];
  side.active = snapshot.active;
  side.health = [...snapshot.health];
  side.rage = snapshot.rage;
  side.x = snapshot.x;
  side.blocking = snapshot.blocking;
  side.attackPose = snapshot.attackPose;
  side.combo = snapshot.combo;
  side.bestCombo = snapshot.bestCombo || side.bestCombo || 0;
  side.rageUntil = time + snapshot.rageRemaining;
  side.stunnedUntil = time + snapshot.stunnedRemaining;
  side.attackUntil = time + snapshot.attackRemaining;
  side.walkUntil = time + snapshot.walkRemaining;
  side.hitUntil = time + snapshot.hitRemaining;
  side.knockdownUntil = time + (snapshot.knockdownRemaining || 0);
  side.taggingUntil = time + snapshot.taggingRemaining;
  side.cooldownUntil = time + snapshot.cooldownRemaining;
  side.tagCooldownUntil = time + snapshot.tagCooldownRemaining;
  side.blindUntil = time + snapshot.blindRemaining;
}

function applyCombatSnapshot(snapshot) {
  if (!state.inBattle || state.online.role !== "guest" || !state.player || !state.cpu) return;
  state.seconds = snapshot.seconds;
  state.running = snapshot.running;
  applySideSnapshot(state.player, snapshot.player);
  applySideSnapshot(state.cpu, snapshot.cpu);
  els.moveReadout.textContent = snapshot.moveReadout;
  els.hazardAlert.textContent = snapshot.hazardText;
  els.hazardAlert.classList.toggle("is-visible", snapshot.hazardVisible);
  els.comboCounter.textContent = snapshot.comboText;
  els.comboCounter.classList.toggle("is-visible", snapshot.comboVisible);
  els.comboBanner.textContent = snapshot.comboBannerText || "";
  els.comboBanner.classList.toggle("is-visible", snapshot.comboBannerVisible === true);
  renderBattle();
}

function handleOnlineMessage(message) {
  if (!message || typeof message !== "object") return;
  if (message.type === "hello") {
    state.online.remoteName = String(message.name || "Rival").slice(0, 16);
    state.online.remoteSelected = teamFromWireFormat(message.team);
    state.online.remoteStats = message.stats || null;
    const rivalScore = Math.max(0, Number(state.online.remoteStats?.highScore) || 0);
    setRoomStatus(`Connected to ${state.online.remoteName} / high score ${String(rivalScore).padStart(6, "0")}`, "connected");
    if (state.online.role === "host") sendOnline({ type: "stage", stageIndex: state.stageIndex });
    renderSelection();
  } else if (message.type === "selection") {
    state.online.remoteSelected = teamFromWireFormat(message.team);
    state.online.remoteReady = false;
    renderSelection();
  } else if (message.type === "ready") {
    state.online.remoteReady = message.ready === true;
    renderSelection();
  } else if (message.type === "stage" && state.online.role === "guest") {
    state.stageIndex = clamp(Number(message.stageIndex) || 0, 0, STAGES.length - 1);
    renderSelection();
  } else if (message.type === "start" && state.online.role === "guest") {
    const hostTeam = teamFromWireFormat(message.hostTeam);
    const guestTeam = teamFromWireFormat(message.guestTeam);
    if (!validTeam(hostTeam) || !validTeam(guestTeam)) return;
    state.stageIndex = clamp(Number(message.stageIndex) || 0, 0, STAGES.length - 1);
    state.online.localReady = false;
    state.online.remoteReady = false;
    startMatch({ online: true, playerTeam: guestTeam, cpuTeam: hostTeam });
  } else if (message.type === "keys" && state.online.role === "host") {
    const beganBlocking = message.keys?.block === true && !state.online.remoteKeys.block;
    state.online.remoteKeys = {
      left: message.keys?.left === true,
      right: message.keys?.right === true,
      block: message.keys?.block === true,
    };
    if (beganBlocking) {
      playSfx("guard", { sideKey: "cpu" });
      broadcastCombatEvent("guard", "cpu");
    }
  } else if (message.type === "action" && state.online.role === "host" && state.inBattle) {
    if (message.action === "tag") tag("cpu");
    else if (message.action === "rage") activateRage("cpu");
    else if (["light", "heavy", "special"].includes(message.action)) attack("cpu", message.action);
  } else if (message.type === "snapshot" && state.online.role === "guest") {
    applyCombatSnapshot(message);
  } else if (message.type === "combatEvent" && state.online.role === "guest") {
    playSfx(message.name, { sideKey: message.sideKey });
    if (message.name === "special" && state[message.sideKey]) {
      const fighter = activeFighter(state[message.sideKey]);
      createProjectile(message.sideKey, fighter.signature.color, fighter.weapon);
    }
  } else if (message.type === "announce" && state.online.role === "guest") {
    announce(String(message.text || ""));
  } else if (message.type === "pauseRequest" && state.online.role === "host") {
    setPaused(message.paused === true);
  } else if (message.type === "pause" && state.online.role === "guest") {
    const paused = message.paused === true;
    state.paused = paused;
    state.keys = { left: false, right: false, block: false };
    els.pauseOverlay.hidden = !paused;
    duckMusic(paused ? 0.1 : 1);
    playSfx(paused ? "pause" : "resume");
  } else if (message.type === "matchEnd" && state.online.role === "guest") {
    endMatch(message.winner, message.reason, { remote: true });
  } else if (message.type === "returnSelect") {
    returnToSelect({ remote: true });
  } else if (message.type === "leave") {
    handleConnectionClosed();
  }
}

function bindOnlineControls() {
  renderProfile();
  els.modeButtons.forEach((button) => button.addEventListener("click", () => setGameMode(button.dataset.gameMode)));
  els.playerNameInput.addEventListener("input", () => {
    profile.name = els.playerNameInput.value.trim().replace(/[^a-zA-Z0-9 _-]/g, "").slice(0, 16) || "Player One";
    saveProfile();
    renderProfile(false);
    sendHello();
    renderSelection();
  });
  els.roomCodeInput.addEventListener("input", () => {
    els.roomCodeInput.value = els.roomCodeInput.value.toUpperCase().replace(/[^A-Z2-9]/g, "").slice(0, 6);
  });
  els.hostRoomButton.addEventListener("click", hostOnlineRoom);
  els.joinRoomButton.addEventListener("click", joinOnlineRoom);
  els.copyRoomButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(state.online.roomCode);
      setRoomStatus(`Copied ${state.online.roomCode}. Send it to your rival.`, "connected");
    } catch {
      els.roomCodeInput.value = state.online.roomCode;
      els.roomCodeInput.select();
      setRoomStatus("Room code selected. Copy it and send it to your rival.", "working");
    }
  });
}

const AUDIO_STORAGE_KEY = "dntc-audio-v2";

const REFERENCE_SFX = Object.freeze({
  light: "assets/audio/reference-light.mp3",
  heavy: "assets/audio/reference-heavy.mp3",
  special: "assets/audio/reference-special.mp3",
  impact: "assets/audio/reference-impact.mp3",
  block: "assets/audio/reference-block.mp3",
  combo: "assets/audio/reference-combo.mp3",
  knockdown: "assets/audio/reference-knockdown.mp3",
  fatality: "assets/audio/reference-fatality.mp3",
});

const REFERENCE_SFX_PLAYBACK = Object.freeze({
  light: { sample: "light", gain: 0.92, rate: 1.06, duck: 0.82, duckMs: 120 },
  heavy: { sample: "heavy", gain: 1.2, rate: 0.96, duck: 0.62, duckMs: 310 },
  special: { sample: "special", gain: 1.14, rate: 1, duck: 0.48, duckMs: 520 },
  impact: { sample: "impact", gain: 1.3, rate: 0.98, duck: 0.7, duckMs: 190 },
  block: { sample: "block", gain: 1, rate: 1.04, duck: 0.74, duckMs: 170 },
  combo: { sample: "combo", gain: 1.1, rate: 1, duck: 0.5, duckMs: 620 },
  knockdown: { sample: "knockdown", gain: 1.3, rate: 0.94, duck: 0.54, duckMs: 430 },
  hazardImpact: { sample: "knockdown", gain: 1.2, rate: 0.88, duck: 0.48, duckMs: 520 },
  fatality: { sample: "fatality", gain: 1.35, rate: 1, duck: 0.2, duckMs: 1750 },
});

function loadAudioSettings() {
  const defaults = { enabled: true, music: 0.38, sfx: 0.76 };
  try {
    const saved = JSON.parse(localStorage.getItem(AUDIO_STORAGE_KEY) || "null");
    if (!saved) return defaults;
    const music = Number(saved.music);
    const sfx = Number(saved.sfx);
    return {
      enabled: saved.enabled !== false,
      music: Number.isFinite(music) ? clamp(music, 0, 1) : defaults.music,
      sfx: Number.isFinite(sfx) ? clamp(sfx, 0, 1) : defaults.sfx,
    };
  } catch {
    return defaults;
  }
}

const audio = {
  settings: loadAudioSettings(),
  context: null,
  masterGain: null,
  musicGain: null,
  sfxGain: null,
  compressor: null,
  noiseBuffer: null,
  sampleBuffers: new Map(),
  sampleLoadPromise: null,
  sampleFailures: 0,
  referencePlayCount: 0,
  duckRestoreTimer: null,
  musicTimer: null,
  nextNoteAt: 0,
  musicStep: 0,
  signature: "",
  mode: "select",
  duck: 1,
  unlocked: false,
  available: true,
  currentThemeName: "",
  lastSfx: "",
  sfxCount: 0,
  lastStepAt: 0,
};

function saveAudioSettings() {
  try {
    localStorage.setItem(AUDIO_STORAGE_KEY, JSON.stringify(audio.settings));
  } catch {
    // Private browsing may block storage; the current-session mix still works.
  }
}

function selectedTheme() {
  return TEAM_THEMES[teamKey(state.selected)] || TEAM_THEMES["matrix-rasta"];
}

function selectedStageMix() {
  return STAGE_MIXES[STAGES[state.stageIndex].id] || STAGE_MIXES.matrix;
}

function themeSignature(mode = audio.mode) {
  return `${teamKey(state.selected)}:${STAGES[state.stageIndex].id}:${mode}`;
}

function syncAudioUi() {
  const enabled = audio.settings.enabled && audio.available;
  els.audioToggles.forEach((button) => {
    button.classList.toggle("is-muted", !enabled);
    button.setAttribute("aria-pressed", String(enabled));
    button.setAttribute("aria-label", enabled ? "Mute game audio" : "Turn on game audio");
  });
  els.audioStateLabels.forEach((label) => { label.textContent = enabled ? "Sound on" : "Sound off"; });
  els.audioMiniLabels.forEach((label) => { label.textContent = enabled ? "On" : "Off"; });
  els.musicVolume.value = String(Math.round(audio.settings.music * 100));
  els.sfxVolume.value = String(Math.round(audio.settings.sfx * 100));
  els.musicVolumeOutput.textContent = els.musicVolume.value;
  els.sfxVolumeOutput.textContent = els.sfxVolume.value;
  els.previewThemeButton.disabled = !audio.available;
}

function updateAudioCard() {
  const theme = selectedTheme();
  const mix = selectedStageMix();
  els.themeName.textContent = `${theme.name} / ${mix.name}`;
  syncAudioUi();
  if (audio.musicTimer && audio.mode === "select" && audio.signature !== themeSignature("select")) {
    startTheme("select", true);
  }
}

function ensureAudio() {
  if (audio.context || !audio.available) return audio.context;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) throw new Error("Web Audio is not supported");
    const context = new AudioContextClass();
    const masterGain = context.createGain();
    const musicGain = context.createGain();
    const sfxGain = context.createGain();
    const compressor = context.createDynamicsCompressor();

    compressor.threshold.value = -18;
    compressor.knee.value = 16;
    compressor.ratio.value = 5;
    compressor.attack.value = 0.004;
    compressor.release.value = 0.2;
    musicGain.connect(masterGain);
    sfxGain.connect(masterGain);
    masterGain.connect(compressor).connect(context.destination);

    audio.context = context;
    audio.masterGain = masterGain;
    audio.musicGain = musicGain;
    audio.sfxGain = sfxGain;
    audio.compressor = compressor;
    applyAudioLevels(true);
    void preloadReferenceSfx();
    return context;
  } catch {
    audio.available = false;
    audio.settings.enabled = false;
    syncAudioUi();
    return null;
  }
}

function applyAudioLevels(immediate = false) {
  if (!audio.context) return;
  const time = audio.context.currentTime;
  const enabled = audio.settings.enabled ? 1 : 0;
  const musicLevel = Math.pow(audio.settings.music, 1.35) * audio.duck;
  const sfxLevel = Math.pow(audio.settings.sfx, 1.18);
  [audio.masterGain.gain, audio.musicGain.gain, audio.sfxGain.gain].forEach((param) => param.cancelScheduledValues(time));
  if (immediate) {
    audio.masterGain.gain.setValueAtTime(enabled, time);
    audio.musicGain.gain.setValueAtTime(musicLevel, time);
    audio.sfxGain.gain.setValueAtTime(sfxLevel, time);
  } else {
    audio.masterGain.gain.setTargetAtTime(enabled, time, 0.025);
    audio.musicGain.gain.setTargetAtTime(musicLevel, time, 0.08);
    audio.sfxGain.gain.setTargetAtTime(sfxLevel, time, 0.03);
  }
}

async function unlockAudio(mode = state.inBattle ? "battle" : "select") {
  const context = ensureAudio();
  if (!context) return false;
  try {
    if (context.state === "suspended") await context.resume();
    audio.unlocked = context.state === "running";
    if (audio.settings.enabled && !audio.musicTimer) startTheme(mode);
    return audio.unlocked;
  } catch {
    return false;
  }
}

function createNoiseBuffer() {
  if (audio.noiseBuffer || !audio.context) return audio.noiseBuffer;
  const length = Math.floor(audio.context.sampleRate * 0.5);
  const buffer = audio.context.createBuffer(1, length, audio.context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
  audio.noiseBuffer = buffer;
  return buffer;
}

function connectWithPan(source, gain, destination, pan = 0) {
  if (typeof audio.context.createStereoPanner === "function") {
    const panner = audio.context.createStereoPanner();
    panner.pan.value = clamp(pan, -1, 1);
    source.connect(gain).connect(panner).connect(destination);
  } else {
    source.connect(gain).connect(destination);
  }
}

function preloadReferenceSfx() {
  if (!audio.context) return Promise.resolve();
  if (audio.sampleLoadPromise) return audio.sampleLoadPromise;
  audio.sampleLoadPromise = Promise.all(Object.entries(REFERENCE_SFX).map(async ([name, url]) => {
    try {
      const response = await fetch(url, { cache: "force-cache" });
      if (!response.ok) throw new Error(`SFX request failed: ${response.status}`);
      const encoded = await response.arrayBuffer();
      const decoded = await audio.context.decodeAudioData(encoded.slice(0));
      audio.sampleBuffers.set(name, decoded);
    } catch {
      audio.sampleFailures += 1;
    }
  })).then(() => undefined);
  return audio.sampleLoadPromise;
}

function scheduleReferenceSample(sampleName, { at, gain = 0.5, rate = 1, pan = 0 } = {}) {
  if (!audio.context || !audio.sfxGain) return false;
  const buffer = audio.sampleBuffers.get(sampleName);
  if (!buffer) {
    void preloadReferenceSfx();
    return false;
  }
  const source = audio.context.createBufferSource();
  const envelope = audio.context.createGain();
  const start = Math.max(audio.context.currentTime, at || audio.context.currentTime);
  source.buffer = buffer;
  source.playbackRate.value = clamp(rate, 0.72, 1.28);
  envelope.gain.setValueAtTime(0.0001, start);
  envelope.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), start + 0.006);
  envelope.gain.setValueAtTime(Math.max(0.0002, gain), start + Math.max(0.008, buffer.duration / source.playbackRate.value - 0.035));
  envelope.gain.exponentialRampToValueAtTime(0.0001, start + buffer.duration / source.playbackRate.value);
  connectWithPan(source, envelope, audio.sfxGain, pan);
  source.start(start);
  audio.referencePlayCount += 1;
  return true;
}

function pulseMusicDuck(level, durationMs) {
  if (!audio.context || audio.mode !== "battle") return;
  if (audio.duckRestoreTimer) window.clearTimeout(audio.duckRestoreTimer);
  audio.duck = Math.min(audio.duck, clamp(level, 0.12, 1));
  applyAudioLevels();
  audio.duckRestoreTimer = window.setTimeout(() => {
    audio.duckRestoreTimer = null;
    audio.duck = state.paused ? 0.1 : 1;
    applyAudioLevels();
  }, durationMs);
}

function scheduleTone(destination, { frequency, endFrequency = frequency, at, duration = 0.12, gain = 0.08, type = "square", filter = 9000, pan = 0 }) {
  if (!audio.context || !destination) return;
  const oscillator = audio.context.createOscillator();
  const filterNode = audio.context.createBiquadFilter();
  const envelope = audio.context.createGain();
  const start = Math.max(audio.context.currentTime, at);
  const end = start + duration;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(Math.max(20, frequency), start);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(20, endFrequency), end);
  filterNode.type = "lowpass";
  filterNode.frequency.value = filter;
  envelope.gain.setValueAtTime(0.0001, start);
  envelope.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), start + Math.min(0.012, duration * 0.2));
  envelope.gain.exponentialRampToValueAtTime(0.0001, end);
  oscillator.connect(filterNode);
  connectWithPan(filterNode, envelope, destination, pan);
  oscillator.start(start);
  oscillator.stop(end + 0.025);
}

function scheduleNoise(destination, { at, duration = 0.1, gain = 0.08, filter = 2600, filterType = "bandpass", pan = 0 }) {
  if (!audio.context || !destination) return;
  const source = audio.context.createBufferSource();
  const filterNode = audio.context.createBiquadFilter();
  const envelope = audio.context.createGain();
  const start = Math.max(audio.context.currentTime, at);
  const end = start + duration;
  source.buffer = createNoiseBuffer();
  filterNode.type = filterType;
  filterNode.frequency.value = filter;
  filterNode.Q.value = 0.8;
  envelope.gain.setValueAtTime(Math.max(0.0002, gain), start);
  envelope.gain.exponentialRampToValueAtTime(0.0001, end);
  source.connect(filterNode);
  connectWithPan(filterNode, envelope, destination, pan);
  source.start(start);
  source.stop(end + 0.02);
}

function midiFrequency(note) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

function scheduleKick(destination, at, gain = 0.12) {
  scheduleTone(destination, { frequency: 145, endFrequency: 42, at, duration: 0.18, gain, type: "sine", filter: 800 });
}

function scheduleMusicStep(theme, mix, mode, at, step, stepLength) {
  const beat = step % 16;
  const root = theme.root + mix.tone;
  const intensity = mode === "battle" ? 1 : 0.62;

  if (beat % 4 === 0) {
    const bassIndex = theme.bass[Math.floor(beat / 4) % theme.bass.length];
    scheduleTone(audio.musicGain, {
      frequency: midiFrequency(root + theme.scale[bassIndex]),
      endFrequency: midiFrequency(root + theme.scale[bassIndex]) * 0.985,
      at,
      duration: stepLength * 3.1,
      gain: 0.105 * intensity,
      type: "triangle",
      filter: 820,
    });
  }

  if (beat % 2 === 0) {
    const melodyIndex = theme.melody[Math.floor(beat / 2) % theme.melody.length];
    const octave = mode === "battle" && (beat === 6 || beat === 14) ? 24 : 12;
    scheduleTone(audio.musicGain, {
      frequency: midiFrequency(root + octave + theme.scale[melodyIndex]),
      at: at + stepLength * 0.08,
      duration: stepLength * (mode === "battle" ? 1.25 : 0.82),
      gain: 0.043 * intensity,
      type: theme.wave,
      filter: mode === "battle" ? 3100 : 2200,
      pan: beat % 4 === 0 ? -0.18 : 0.18,
    });
  }

  if (beat === 0 || beat === 8) {
    [0, 2, 4].forEach((scaleIndex, chordIndex) => {
      scheduleTone(audio.musicGain, {
        frequency: midiFrequency(root + 12 + theme.scale[scaleIndex]),
        at: at + chordIndex * 0.008,
        duration: stepLength * 6.4,
        gain: 0.014 * intensity,
        type: "sawtooth",
        filter: 1150,
        pan: (chordIndex - 1) * 0.25,
      });
    });
  }

  if (beat === 0 || beat === 8 || (mode === "battle" && beat === 6)) scheduleKick(audio.musicGain, at, 0.09 * intensity);
  if (beat === 4 || beat === 12) scheduleNoise(audio.musicGain, { at, duration: 0.11, gain: 0.055 * intensity, filter: 1500, filterType: "bandpass" });
  if (beat % 2 === 1 && (mode === "battle" || beat % 4 === 3)) scheduleNoise(audio.musicGain, { at, duration: 0.035, gain: 0.021 * intensity, filter: 6500, filterType: "highpass", pan: beat % 4 === 1 ? -0.22 : 0.22 });
}

function scheduleMusic() {
  if (!audio.context || !audio.musicTimer || !audio.settings.enabled) return;
  const theme = selectedTheme();
  const mix = selectedStageMix();
  const bpm = theme.bpm + mix.bpm;
  const stepLength = 60 / bpm / 4;
  while (audio.nextNoteAt < audio.context.currentTime + 0.14) {
    scheduleMusicStep(theme, mix, audio.mode, audio.nextNoteAt, audio.musicStep, stepLength);
    audio.nextNoteAt += stepLength;
    audio.musicStep = (audio.musicStep + 1) % 256;
  }
}

function startTheme(mode = "select", force = false) {
  if (!audio.settings.enabled) return;
  const context = ensureAudio();
  if (!context) return;
  const signature = themeSignature(mode);
  if (!force && audio.musicTimer && audio.signature === signature) {
    audio.mode = mode;
    duckMusic(mode === "battle" && state.paused ? 0.1 : 1);
    return;
  }
  if (audio.musicTimer) window.clearInterval(audio.musicTimer);
  audio.mode = mode;
  audio.signature = signature;
  audio.musicStep = 0;
  audio.nextNoteAt = context.currentTime + 0.045;
  audio.currentThemeName = `${selectedTheme().name} / ${selectedStageMix().name}`;
  audio.duck = mode === "battle" && state.paused ? 0.1 : 1;
  audio.musicTimer = window.setInterval(scheduleMusic, 25);
  applyAudioLevels();
  scheduleMusic();
}

function stopTheme() {
  if (audio.musicTimer) window.clearInterval(audio.musicTimer);
  audio.musicTimer = null;
  audio.signature = "";
}

function duckMusic(level) {
  audio.duck = clamp(level, 0, 1);
  applyAudioLevels();
}

function effectPan(options = {}) {
  if (options.sideKey === "player") return -0.32;
  if (options.sideKey === "cpu") return 0.32;
  return 0;
}

function playSfx(name, options = {}) {
  if (!audio.settings.enabled || document.hidden) return;
  const context = ensureAudio();
  if (!context) return;
  if (context.state === "suspended") context.resume().catch(() => {});
  const at = context.currentTime + 0.006;
  const pan = effectPan(options);
  audio.lastSfx = name;
  audio.sfxCount += 1;

  const referenceProfile = REFERENCE_SFX_PLAYBACK[name];
  if (referenceProfile) {
    const variation = [0.985, 1, 1.018][audio.sfxCount % 3];
    scheduleReferenceSample(referenceProfile.sample, {
      at,
      gain: referenceProfile.gain,
      rate: referenceProfile.rate * variation,
      pan,
    });
    pulseMusicDuck(referenceProfile.duck, referenceProfile.duckMs);
  }

  if (name === "select") {
    scheduleTone(audio.sfxGain, { frequency: 440, endFrequency: 520, at, duration: 0.055, gain: 0.055, type: "square", pan });
  } else if (name === "confirm") {
    [330, 495, 660].forEach((frequency, index) => scheduleTone(audio.sfxGain, { frequency, at: at + index * 0.055, duration: 0.11, gain: 0.06, type: "triangle" }));
  } else if (name === "ready") {
    [110, 165].forEach((frequency, index) => scheduleTone(audio.sfxGain, { frequency, at: at + index * 0.12, duration: 0.2, gain: 0.1, type: "sawtooth", filter: 1200 }));
  } else if (name === "fight") {
    scheduleKick(audio.sfxGain, at, 0.24);
    scheduleNoise(audio.sfxGain, { at, duration: 0.24, gain: 0.13, filter: 1200, filterType: "lowpass" });
    scheduleTone(audio.sfxGain, { frequency: 180, endFrequency: 760, at, duration: 0.3, gain: 0.085, type: "sawtooth", filter: 3400 });
  } else if (name === "light") {
    scheduleNoise(audio.sfxGain, { at, duration: 0.07, gain: 0.07, filter: 4200, filterType: "highpass", pan });
    scheduleTone(audio.sfxGain, { frequency: 260, endFrequency: 115, at, duration: 0.085, gain: 0.075, type: "square", pan });
  } else if (name === "heavy") {
    scheduleNoise(audio.sfxGain, { at, duration: 0.14, gain: 0.12, filter: 850, filterType: "lowpass", pan });
    scheduleTone(audio.sfxGain, { frequency: 125, endFrequency: 48, at, duration: 0.2, gain: 0.16, type: "sine", filter: 700, pan });
  } else if (name === "special") {
    scheduleNoise(audio.sfxGain, { at, duration: 0.24, gain: 0.09, filter: 5200, filterType: "bandpass", pan });
    scheduleTone(audio.sfxGain, { frequency: 150, endFrequency: 980, at, duration: 0.32, gain: 0.11, type: "sawtooth", filter: 4800, pan });
    scheduleTone(audio.sfxGain, { frequency: 310, endFrequency: 155, at: at + 0.18, duration: 0.2, gain: 0.07, type: "square", pan });
    if (options.fighterId === "ordi") {
      scheduleTone(audio.sfxGain, { frequency: 880, endFrequency: 2360, at, duration: 0.22, gain: 0.085, type: "square", filter: 6200, pan });
      scheduleTone(audio.sfxGain, { frequency: 1320, endFrequency: 540, at: at + 0.12, duration: 0.28, gain: 0.07, type: "sawtooth", filter: 5400, pan: -pan });
    } else if (options.fighterId === "mutant") {
      scheduleTone(audio.sfxGain, { frequency: 92, endFrequency: 46, at, duration: 0.34, gain: 0.14, type: "sawtooth", filter: 1050, pan });
      scheduleNoise(audio.sfxGain, { at: at + 0.1, duration: 0.34, gain: 0.09, filter: 2400, filterType: "bandpass", pan: -pan });
    } else if (options.fighterId === "duck") {
      [460, 620, 780].forEach((frequency, index) => scheduleTone(audio.sfxGain, { frequency, endFrequency: frequency * 1.35, at: at + index * 0.045, duration: 0.15, gain: 0.07, type: "square", filter: 4400, pan }));
    }
  } else if (name === "impact") {
    scheduleNoise(audio.sfxGain, { at, duration: 0.12, gain: 0.16, filter: 1400, filterType: "lowpass", pan });
    scheduleTone(audio.sfxGain, { frequency: 92, endFrequency: 38, at, duration: 0.18, gain: 0.19, type: "sine", filter: 600, pan });
  } else if (name === "block") {
    scheduleNoise(audio.sfxGain, { at, duration: 0.09, gain: 0.085, filter: 3600, filterType: "highpass", pan });
    [740, 1110].forEach((frequency, index) => scheduleTone(audio.sfxGain, { frequency, endFrequency: frequency * 0.72, at: at + index * 0.018, duration: 0.17, gain: 0.075, type: "triangle", pan }));
  } else if (name === "combo") {
    [420, 630, 840].forEach((frequency, index) => scheduleTone(audio.sfxGain, { frequency, endFrequency: frequency * 1.12, at: at + index * 0.045, duration: 0.16, gain: 0.06, type: "sawtooth", filter: 4200, pan }));
    scheduleNoise(audio.sfxGain, { at, duration: 0.3, gain: 0.07, filter: 5200, filterType: "bandpass", pan });
  } else if (name === "knockdown") {
    scheduleKick(audio.sfxGain, at, 0.2);
    scheduleNoise(audio.sfxGain, { at, duration: 0.32, gain: 0.15, filter: 760, filterType: "lowpass", pan });
    scheduleTone(audio.sfxGain, { frequency: 78, endFrequency: 34, at, duration: 0.34, gain: 0.17, type: "sine", filter: 520, pan });
  } else if (name === "guard") {
    scheduleTone(audio.sfxGain, { frequency: 190, endFrequency: 280, at, duration: 0.16, gain: 0.06, type: "sine", filter: 1400, pan });
  } else if (name === "step") {
    scheduleNoise(audio.sfxGain, { at, duration: 0.045, gain: 0.032, filter: 480, filterType: "lowpass", pan });
  } else if (name === "tag") {
    [240, 380, 620].forEach((frequency, index) => scheduleTone(audio.sfxGain, { frequency, endFrequency: frequency * 1.3, at: at + index * 0.045, duration: 0.15, gain: 0.075, type: "triangle", pan }));
    scheduleNoise(audio.sfxGain, { at, duration: 0.24, gain: 0.065, filter: 4800, filterType: "highpass", pan });
  } else if (name === "rage") {
    [0, 0.11, 0.22].forEach((offset, index) => scheduleTone(audio.sfxGain, { frequency: 78 + index * 10, endFrequency: 42, at: at + offset, duration: 0.28, gain: 0.16, type: "sawtooth", filter: 1100, pan }));
    scheduleNoise(audio.sfxGain, { at: at + 0.16, duration: 0.5, gain: 0.09, filter: 2600, filterType: "bandpass", pan });
  } else if (name === "hazardWarning") {
    [0, 0.15, 0.3].forEach((offset, index) => scheduleTone(audio.sfxGain, { frequency: index % 2 ? 390 : 260, at: at + offset, duration: 0.11, gain: 0.09, type: "square" }));
  } else if (name === "hazardImpact") {
    scheduleNoise(audio.sfxGain, { at, duration: 0.38, gain: 0.18, filter: 900, filterType: "lowpass" });
    scheduleTone(audio.sfxGain, { frequency: 185, endFrequency: 32, at, duration: 0.42, gain: 0.2, type: "sawtooth", filter: 1250 });
  } else if (name === "fatality") {
    scheduleKick(audio.sfxGain, at, 0.28);
    scheduleNoise(audio.sfxGain, { at, duration: 0.7, gain: 0.2, filter: 760, filterType: "lowpass" });
    [196, 146.83, 98, 65.41].forEach((frequency, index) => scheduleTone(audio.sfxGain, {
      frequency,
      endFrequency: frequency * 0.58,
      at: at + index * 0.14,
      duration: 0.48,
      gain: 0.11,
      type: "sawtooth",
      filter: 1350,
      pan: (index - 1.5) * 0.12,
    }));
  } else if (name === "victory") {
    [261.63, 329.63, 392, 523.25].forEach((frequency, index) => scheduleTone(audio.sfxGain, { frequency, at: at + index * 0.11, duration: 0.42, gain: 0.085, type: "triangle", pan: (index - 1.5) * 0.12 }));
  } else if (name === "defeat") {
    [293.66, 246.94, 196, 146.83].forEach((frequency, index) => scheduleTone(audio.sfxGain, { frequency, endFrequency: frequency * 0.9, at: at + index * 0.12, duration: 0.34, gain: 0.075, type: "sawtooth", filter: 1600 }));
  } else if (name === "pause") {
    scheduleTone(audio.sfxGain, { frequency: 260, endFrequency: 130, at, duration: 0.18, gain: 0.07, type: "square" });
  } else if (name === "resume") {
    scheduleTone(audio.sfxGain, { frequency: 160, endFrequency: 360, at, duration: 0.16, gain: 0.07, type: "square" });
  }
}

async function toggleAudio() {
  const nextEnabled = !audio.settings.enabled;
  audio.settings.enabled = nextEnabled;
  saveAudioSettings();
  if (nextEnabled) {
    await unlockAudio(state.inBattle ? "battle" : "select");
    startTheme(state.inBattle ? "battle" : "select", true);
    playSfx("confirm");
  } else {
    stopTheme();
    applyAudioLevels();
  }
  syncAudioUi();
}

function bindAudioControls() {
  els.audioToggles.forEach((button) => button.addEventListener("click", toggleAudio));
  els.musicVolume.addEventListener("input", () => {
    audio.settings.music = Number(els.musicVolume.value) / 100;
    els.musicVolumeOutput.textContent = els.musicVolume.value;
    saveAudioSettings();
    applyAudioLevels();
  });
  els.sfxVolume.addEventListener("input", () => {
    audio.settings.sfx = Number(els.sfxVolume.value) / 100;
    els.sfxVolumeOutput.textContent = els.sfxVolume.value;
    saveAudioSettings();
    applyAudioLevels();
    if (audio.settings.enabled) playSfx("select");
  });
  els.previewThemeButton.addEventListener("click", async () => {
    if (!audio.settings.enabled) audio.settings.enabled = true;
    saveAudioSettings();
    await unlockAudio("select");
    startTheme("select", true);
    playSfx("confirm");
    syncAudioUi();
    els.previewThemeButton.classList.add("is-playing");
    els.previewThemeButton.textContent = "Theme playing";
    window.setTimeout(() => {
      els.previewThemeButton.classList.remove("is-playing");
      els.previewThemeButton.textContent = "Preview theme";
    }, 1400);
  });
  syncAudioUi();
}

window.__audioDebug = Object.freeze({
  getState: () => ({
    available: audio.available,
    enabled: audio.settings.enabled,
    contextState: audio.context?.state || "uninitialized",
    mode: audio.mode,
    theme: audio.currentThemeName,
    musicRunning: Boolean(audio.musicTimer),
    musicStep: audio.musicStep,
    musicVolume: audio.settings.music,
    sfxVolume: audio.settings.sfx,
    lastSfx: audio.lastSfx,
    sfxCount: audio.sfxCount,
    referenceSamplesLoaded: audio.sampleBuffers.size,
    referenceSamplesFailed: audio.sampleFailures,
    referencePlayCount: audio.referencePlayCount,
  }),
  playSfx: (name) => playSfx(name),
});

function mapGamepadInput(pad, previousButtons = []) {
  const pressed = (index) => Boolean(pad?.buttons?.[index]?.pressed ?? pad?.buttons?.[index]);
  const wasPressed = (index) => Boolean(previousButtons[index]);
  const justPressed = (index) => pressed(index) && !wasPressed(index);
  const horizontal = Number(pad?.axes?.[0]) || 0;
  const actions = [];
  if (justPressed(0)) actions.push("light");
  if (justPressed(3)) actions.push("heavy");
  if (justPressed(1) || justPressed(7)) actions.push("special");
  if (justPressed(5)) actions.push("tag");
  if (justPressed(4)) actions.push("rage");
  if (justPressed(10)) actions.push("dash");
  if (justPressed(8)) actions.push("moves");
  if (justPressed(9)) actions.push("pause");
  return {
    left: horizontal < -.28 || pressed(14),
    right: horizontal > .28 || pressed(15),
    block: pressed(2) || pressed(6),
    actions,
    buttons: Array.from(pad?.buttons || [], (button) => Boolean(button?.pressed ?? button)),
  };
}

function updateControllerStatus(connected, name = "") {
  state.gamepad.connected = connected;
  els.controllerStatus.textContent = connected ? "Controller ready" : "Keyboard";
  els.controllerStatus.classList.toggle("is-connected", connected);
  els.controllerStatus.title = connected ? name : "Keyboard controls active";
}

function sendMergedOnlineKeys() {
  if (state.matchMode !== "online" || state.online.role !== "guest") return;
  sendOnline({
    type: "keys",
    keys: {
      left: state.keys.left || state.gamepad.left,
      right: state.keys.right || state.gamepad.right,
      block: state.keys.block || state.gamepad.block,
    },
  });
}

function pollGamepad() {
  const pads = navigator.getGamepads?.() || [];
  let pad = state.gamepad.index == null ? null : pads[state.gamepad.index];
  if (!pad) pad = [...pads].find(Boolean) || null;
  if (!pad) {
    if (state.gamepad.connected) updateControllerStatus(false);
    state.gamepad.index = null;
    state.gamepad.left = false;
    state.gamepad.right = false;
    state.gamepad.block = false;
    state.gamepad.buttons = [];
    return;
  }

  if (!state.gamepad.connected || state.gamepad.index !== pad.index) updateControllerStatus(true, pad.id || "Game controller");
  state.gamepad.index = pad.index;
  const mapped = mapGamepadInput(pad, state.gamepad.buttons);
  const keysChanged = mapped.left !== state.gamepad.left || mapped.right !== state.gamepad.right || mapped.block !== state.gamepad.block;
  state.gamepad.left = mapped.left;
  state.gamepad.right = mapped.right;
  state.gamepad.block = mapped.block;
  state.gamepad.buttons = mapped.buttons;
  if (keysChanged) sendMergedOnlineKeys();

  mapped.actions.forEach((action) => {
    if (state.race.active) {
      if (action === "light") raceAction("accelerate");
      if (action === "special") raceAction("nitro");
      if (action === "heavy" || action === "tag") raceAction("hijack");
      return;
    }
    if (action === "moves") {
      if (els.helpDialog.open) els.helpDialog.close();
      else openMoveList();
    } else if (action === "pause" && state.inBattle && !state.finished) {
      requestPause(!state.paused);
    } else if (!state.inBattle && action === "light" && !els.fightButton.disabled && !els.helpDialog.open) {
      state.matchMode === "online" ? startOnlineFight() : startMatch();
    } else if (state.finished && action === "light" && !els.rematchButton.disabled) {
      state.race.finished ? startRace() : state.matchMode === "online" ? startOnlineFight(true) : startMatch();
    } else if (state.inBattle && state.running && !state.paused && !state.finished) {
      performPlayerAction(action);
    }
  });
}

function openMoveList() {
  if (els.helpDialog.open) return;
  if (state.inBattle && state.running && !state.paused && !state.finished) {
    state.helpPausedBattle = true;
    requestPause(true);
  }
  els.helpDialog.showModal();
}

function handleMoveListClosed() {
  if (!state.helpPausedBattle) return;
  state.helpPausedBattle = false;
  if (state.inBattle && state.paused && !state.finished) requestPause(false);
}

window.__combatDebug = Object.freeze({
  getState: () => ({
    inBattle: state.inBattle,
    running: state.running,
    matchScore: state.matchScore,
    playerCombo: state.player?.combo || 0,
    playerInputs: [...(state.player?.comboInputs || [])],
    bufferedActions: [state.player?.bufferedAction, state.player?.bufferedNext].filter(Boolean),
    activeWeapon: state.player ? activeFighter(state.player).weapon.name : "",
    controllerConnected: state.gamepad.connected,
    difficulty: activeDifficulty().id,
    cpuTeam: state.cpu ? state.cpu.team.map((index) => FIGHTERS[index].id) : buildCpuTeam(state.selected).map((index) => FIGHTERS[index].id),
    race: {
      active: state.race.active,
      garage: state.race.garage,
      mode: state.race.mode,
      ride: STREET_RIDES[state.race.rideIndex]?.name || "",
      speed: Math.round(state.race.speed || 0),
      x: Math.round(state.race.x || 0),
      traffic: state.race.traffic?.length || 0,
      nitro: Math.round(state.race.nitro || 0),
      wantedStage: state.race.wantedStage || 0,
      jailed: Boolean(state.race.jailed),
      jailbreak: state.race.jailbreak || 0,
      onFoot: Boolean(state.race.onFoot),
      footY: Math.round(state.race.footY || 0),
    },
  }),
  mapGamepadInput,
  getDifficultyProfiles: () => JSON.parse(JSON.stringify(DIFFICULTIES)),
});

function gameLoop(time) {
  const delta = Math.min(0.05, Math.max(0, (time - state.lastFrame) / 1000));
  state.lastFrame = time;
  pollGamepad();
  update(delta, time);
  updateRace(delta, time);
  cinematicFx.frame(time);
  requestAnimationFrame(gameLoop);
}

function handleKeyDown(event) {
  if (state.race.active) {
    if (state.race.jailed) {
      if (!event.repeat && (event.code === "Enter" || event.code === "Space" || event.code === "KeyE")) {
        event.preventDefault();
        attemptJailbreak();
      }
      if (event.code === "Escape") returnToSelect();
      return;
    }
    if (["KeyW", "ArrowUp", "KeyJ", "KeyQ", "KeyA", "KeyD", "KeyS", "ArrowDown", "KeyE", "ShiftLeft", "ShiftRight"].includes(event.code)) event.preventDefault();
    if (event.code === "KeyW" || event.code === "ArrowUp" || event.code === "KeyJ") state.race.keys.throttle = true;
    if (event.code === "KeyS" || event.code === "ArrowDown") state.race.keys.brake = true;
    if (event.code === "KeyA") state.race.keys.left = true;
    if (event.code === "KeyD") state.race.keys.right = true;
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") state.race.keys.sprint = true;
    if (!event.repeat && (event.code === "KeyW" || event.code === "ArrowUp" || event.code === "KeyJ")) raceAction("accelerate");
    if (!event.repeat && event.code === "KeyA") state.race.x = Math.max(13, state.race.x - 4);
    if (!event.repeat && event.code === "KeyD") state.race.x = Math.min(87, state.race.x + 4);
    if (!event.repeat && event.code === "KeyQ") raceAction("nitro");
    if (!event.repeat && event.code === "KeyE") raceAction("hijack");
    if (event.code === "Escape") returnToSelect();
    return;
  }
  if (state.race.garage && event.code === "Escape") {
    returnToSelect();
    return;
  }
  if (event.code === "KeyM") {
    event.preventDefault();
    if (els.helpDialog.open) els.helpDialog.close();
    else openMoveList();
    return;
  }
  if (event.code === "Space" && !state.inBattle && !els.helpDialog.open) {
    event.preventDefault();
    if (state.matchMode === "online") startOnlineFight();
    else startMatch();
    return;
  }
  if (event.code === "Enter" && state.finished && !els.resultOverlay.hidden) {
    if (state.race.finished) startRace();
    else if (state.matchMode === "online") {
      if (state.online.role === "host") startOnlineFight(true);
    } else startMatch();
    return;
  }
  if (event.code === "Escape") {
    if (els.helpDialog.open) return;
    if (state.inBattle && !state.finished) requestPause(!state.paused);
    return;
  }
  if (!state.inBattle || !state.running || state.paused || event.repeat) return;
  if (["KeyA", "KeyD", "KeyQ", "ShiftLeft", "ShiftRight", "KeyJ", "KeyK", "KeyL", "KeyT", "KeyR", "KeyM"].includes(event.code)) event.preventDefault();
  if (event.code === "KeyA") setPlayerKey("left", true);
  if (event.code === "KeyD") setPlayerKey("right", true);
  if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
    if (!state.keys.block && !(state.matchMode === "online" && state.online.role === "guest")) playSfx("guard", { sideKey: "player" });
    setPlayerKey("block", true);
  }
  if (event.code === "KeyJ") performPlayerAction("light");
  if (event.code === "KeyK") performPlayerAction("heavy");
  if (event.code === "KeyL") performPlayerAction("special");
  if (event.code === "KeyQ") performPlayerAction("dash");
  if (event.code === "KeyT") performPlayerAction("tag");
  if (event.code === "KeyR") performPlayerAction("rage");
}

function handleKeyUp(event) {
  if (state.race.active) {
    if (event.code === "KeyW" || event.code === "ArrowUp" || event.code === "KeyJ") state.race.keys.throttle = false;
    if (event.code === "KeyS" || event.code === "ArrowDown") state.race.keys.brake = false;
    if (event.code === "KeyA") state.race.keys.left = false;
    if (event.code === "KeyD") state.race.keys.right = false;
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") state.race.keys.sprint = false;
    return;
  }
  if (event.code === "KeyA") setPlayerKey("left", false);
  if (event.code === "KeyD") setPlayerKey("right", false);
  if (event.code === "ShiftLeft" || event.code === "ShiftRight") setPlayerKey("block", false);
}

function bindTouchControls() {
  $$("[data-hold]").forEach((button) => {
    const key = button.dataset.hold;
    const set = (active) => {
      if (key === "block" && active && !state.keys[key] && !(state.matchMode === "online" && state.online.role === "guest")) playSfx("guard", { sideKey: "player" });
      setPlayerKey(key, active);
      button.classList.toggle("is-held", active);
    };
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      button.setPointerCapture(event.pointerId);
      set(true);
    });
    button.addEventListener("pointerup", () => set(false));
    button.addEventListener("pointercancel", () => set(false));
    button.addEventListener("lostpointercapture", () => set(false));
  });

  $$("[data-action]").forEach((button) => {
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      const action = button.dataset.action;
      performPlayerAction(action);
    });
  });

  $$("[data-race-hold]").forEach((button) => {
    const key = button.dataset.raceHold;
    const set = (active) => {
      if (!state.race.keys) return;
      state.race.keys[key] = active;
      button.classList.toggle("is-held", active);
    };
    button.addEventListener("pointerdown", (event) => { event.preventDefault(); button.setPointerCapture(event.pointerId); set(true); });
    button.addEventListener("pointerup", () => set(false));
    button.addEventListener("pointercancel", () => set(false));
    button.addEventListener("lostpointercapture", () => set(false));
  });
  $$("[data-race-action]").forEach((button) => button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    raceAction(button.dataset.raceAction);
  }));
}

els.fightButton.addEventListener("click", () => state.matchMode === "online" ? startOnlineFight() : startMatch());
els.raceButton.addEventListener("click", openRaceGarage);
els.garageStartButton.addEventListener("click", () => startRace({ freeDrive: false }));
els.garageFreeDriveButton.addEventListener("click", () => startRace({ freeDrive: true }));
els.garageWantedButton.addEventListener("click", () => startRace({ wantedStory: true }));
els.jailbreakButton.addEventListener("click", attemptJailbreak);
els.garageBackButton.addEventListener("click", returnToSelect);
els.quitRaceButton.addEventListener("click", returnToSelect);
els.pauseButton.addEventListener("click", () => requestPause(true));
els.resumeButton.addEventListener("click", () => requestPause(false));
els.quitButton.addEventListener("click", returnToSelect);
els.rematchButton.addEventListener("click", () => state.race.finished ? startRace() : state.matchMode === "online" ? startOnlineFight(true) : startMatch());
els.newTeamsButton.addEventListener("click", returnToSelect);
els.playerTagButton.addEventListener("click", () => performPlayerAction("tag"));
els.helpButton.addEventListener("click", openMoveList);
els.movesButton.addEventListener("click", openMoveList);
els.difficultyButtons.forEach((button) => button.addEventListener("click", () => setDifficulty(button.dataset.difficulty)));
els.closeHelpButton.addEventListener("click", () => els.helpDialog.close());
els.helpDialog.addEventListener("close", handleMoveListClosed);
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
document.addEventListener("visibilitychange", () => {
  if (document.hidden && state.inBattle && state.running && !state.finished) requestPause(true);
});
window.addEventListener("beforeunload", () => resetOnlineTransport());
window.addEventListener("resize", () => cinematicFx.ensureSize());
window.addEventListener("gamepadconnected", (event) => {
  state.gamepad.index = event.gamepad.index;
  updateControllerStatus(true, event.gamepad.id || "Game controller");
  playSfx("confirm");
});
window.addEventListener("gamepaddisconnected", (event) => {
  if (state.gamepad.index === event.gamepad.index) updateControllerStatus(false);
});

document.addEventListener("pointerdown", () => unlockAudio(), { once: true, capture: true });
document.addEventListener("keydown", () => unlockAudio(), { once: true, capture: true });

bindAudioControls();
bindOnlineControls();
initializeSelection();
const launchParams = new URLSearchParams(window.location.search);
const launchRace = launchParams.get("race");
if (launchParams.get("online") === "1") setGameMode("online");
if (launchParams.get("wanted") === "1" || launchRace === "wanted") window.setTimeout(() => startRace({ wantedStory: true }), 120);
else if (launchRace === "free") window.setTimeout(() => startRace({ freeDrive: true }), 120);
else if (launchRace === "circuit") window.setTimeout(() => startRace({ freeDrive: false }), 120);
FIGHTERS.forEach((fighter) => {
  const image = new Image();
  image.src = fighter.sprite;
  if (fighter.weapon?.asset) {
    const weapon = new Image();
    weapon.src = fighter.weapon.asset;
  }
});
bindTouchControls();
requestAnimationFrame((time) => {
  state.lastFrame = time;
  requestAnimationFrame(gameLoop);
});
