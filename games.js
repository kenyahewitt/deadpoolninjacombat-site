"use strict";

const catalog = [
  { id: "dntc-combat", title: "DNTC Combat", genre: "Full-body arcade fighter", status: "Play now", color: "green", href: "index.html#selectScreen", icon: "⚔" },
  { id: "online-arena", title: "Online 1V1 Arena", genre: "Peer-to-peer multiplayer", status: "Host or join", color: "violet", href: "index.html?online=1#selectScreen", icon: "◎" },
  { id: "street-circuit", title: "Street Circuit", genre: "Checkpoint racing", status: "Race now", color: "cyan", href: "index.html?race=circuit#raceScreen", icon: "◇" },
  { id: "neon-free-drive", title: "Neon Free Drive", genre: "Drive · exit · enter rides", status: "Explore now", color: "yellow", href: "index.html?race=free#raceScreen", icon: "✦" },
  { id: "coast-city-escape", title: "Coast City: Wanted", genre: "Five-star story run", status: "$5 USD in SOL", color: "pink", href: "index.html?race=wanted#raceScreen", icon: "◆", sale: true },
];

const $ = (selector) => document.querySelector(selector);
const gameGrid = $("#gameGrid");
const checkoutDialog = $("#checkoutDialog");
const checkoutTitle = $("#checkoutTitle");
const checkoutCopy = $("#checkoutCopy");
const checkoutAction = $("#checkoutAction");
const walletState = $("#walletState");
const walletAddress = $("#walletAddress");
let connectedAddress = "";
let pendingGame = null;

function shortAddress(address) { return `${address.slice(0, 4)}…${address.slice(-4)}`; }

function renderCatalog() {
  gameGrid.innerHTML = catalog.map((game, index) => `
    <article class="game-card ${game.color}" style="--delay:${index * 55}ms">
      <div class="card-art"><i>${game.icon}</i><span>${String(index + 1).padStart(2, "0")}</span></div>
      <div class="card-copy"><span>${game.genre}</span><h3>${game.title}</h3><p>${game.status}</p></div>
      ${game.sale ? `<button type="button" data-buy="${game.id}">Buy download</button><a href="${game.href}">Play now</a>` : `<a class="wide" href="${game.href}">Launch mode</a>`}
    </article>`).join("");
}

function updateWallet(address = "") {
  connectedAddress = address;
  const label = address ? shortAddress(address) : "Connect Solana";
  $("#connectSolana b").textContent = label;
  $("#connectSolana").classList.toggle("connected", Boolean(address));
  walletState.textContent = address ? "Wallet connected" : "Not connected";
  walletAddress.textContent = address ? address : "No wallet permission requested.";
  $("#panelConnect").textContent = address ? "Reconnect wallet" : "Connect wallet";
  checkoutAction.textContent = address ? "Checkout unavailable · setup required" : "Connect Solana wallet";
}

async function connectWallet() {
  const provider = window.phantom?.solana || window.solana;
  if (!provider?.connect) {
    walletState.textContent = "Solana wallet not found";
    walletAddress.textContent = "Install a compatible wallet extension, then reload this page.";
    return "";
  }
  try {
    const response = await provider.connect();
    const address = (response.publicKey || provider.publicKey)?.toString?.() || "";
    updateWallet(address);
    return address;
  } catch (error) {
    walletState.textContent = "Connection cancelled";
    walletAddress.textContent = error?.message || "The wallet did not grant access.";
    return "";
  }
}

function openCheckout(gameId) {
  pendingGame = catalog.find((game) => game.id === gameId);
  if (!pendingGame) return;
  checkoutTitle.textContent = pendingGame.title;
  checkoutCopy.textContent = "Checkout is staged but transfers stay disabled until the creator treasury, distribution rights, delivery package, refund terms, and production transaction tests are verified.";
  updateWallet(connectedAddress);
  checkoutDialog.showModal();
}

document.addEventListener("click", (event) => {
  const buy = event.target.closest("[data-buy]");
  if (buy) openCheckout(buy.dataset.buy);
});
$("#connectSolana").addEventListener("click", connectWallet);
$("#panelConnect").addEventListener("click", connectWallet);
$("#closeCheckout").addEventListener("click", () => checkoutDialog.close());
checkoutAction.addEventListener("click", async () => {
  if (!connectedAddress) await connectWallet();
  if (connectedAddress) {
    checkoutCopy.textContent = "Your wallet is ready, but payment remains locked because this deployment has no verified Solana treasury or signed distribution package. No SOL was requested or sent.";
    checkoutAction.textContent = "No transaction sent";
  }
});

renderCatalog();
updateWallet();
