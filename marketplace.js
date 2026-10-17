const filterButtons = [...document.querySelectorAll("[data-filter]")];
const collectibleCards = [...document.querySelectorAll(".collectible-card")];
const copyButton = document.querySelector("#copyContract");
const addressNode = document.querySelector("#tokenAddress");
const toast = document.querySelector("#copyToast");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((candidate) => {
      const isSelected = candidate === button;
      candidate.classList.toggle("is-active", isSelected);
      candidate.setAttribute("aria-pressed", String(isSelected));
    });

    collectibleCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.hidden = filter !== "all" && !categories.includes(filter);
    });
  });
});

copyButton?.addEventListener("click", async () => {
  const address = addressNode?.textContent.trim();
  if (!address) return;

  try {
    await navigator.clipboard.writeText(address);
    copyButton.textContent = "NinjaAgent copied — verify before trading";
  } catch {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(addressNode);
    selection.removeAllRanges();
    selection.addRange(range);
    copyButton.textContent = "Address selected — copy it";
  }

  toast?.classList.add("is-visible");
  window.setTimeout(() => {
    toast?.classList.remove("is-visible");
    copyButton.textContent = "Copy contract address";
  }, 2400);
});

const NFT_COLLECTION = "0x59652e80e0103303fcf40911fb41eff022eadee2";
const ROBINHOOD_CHAIN_ID = "0x1237";
const ROBINHOOD_RPC = "https://rpc.mainnet.chain.robinhood.com";
const connectWalletButton = document.querySelector("#connectWallet");
const verifyOwnedTokenButton = document.querySelector("#verifyOwnedToken");
const tokenVerify = document.querySelector("#tokenVerify");
const tokenIdInput = document.querySelector("#ownedTokenId");
const walletAddress = document.querySelector("#walletAddress");
const walletChainStatus = document.querySelector("#walletChainStatus");
const walletMessage = document.querySelector("#walletMessage");
const fighterUnlocked = document.querySelector("#fighterUnlocked");
const ownedFighterImage = document.querySelector("#ownedFighterImage");
const ownedFighterName = document.querySelector("#ownedFighterName");
const ownedFighterDetail = document.querySelector("#ownedFighterDetail");
const openGameWithNft = document.querySelector("#openGameWithNft");
const walletInventory = document.querySelector("#walletInventory");
const inventoryGrid = document.querySelector("#inventoryGrid");
const inventoryCount = document.querySelector("#inventoryCount");

let connectedAccount = "";

function shortAddress(address) {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function encodeUint256(value) {
  return BigInt(value).toString(16).padStart(64, "0");
}

async function rpcRequest(method, params) {
  const response = await fetch(ROBINHOOD_RPC, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const payload = await response.json();
  if (!response.ok || payload.error) throw new Error(payload.error?.message || "Robinhood Chain RPC request failed.");
  return payload.result;
}

async function rpcCall(data) {
  return rpcRequest("eth_call", [{ to: NFT_COLLECTION, data }, "latest"]);
}

function decodeAbiString(data) {
  if (!data || data === "0x" || data.length < 130) return "";
  const hexLength = data.slice(66, 130);
  const length = Number.parseInt(hexLength, 16);
  const value = data.slice(130, 130 + length * 2);
  let output = "";
  for (let index = 0; index < value.length; index += 2) output += String.fromCharCode(Number.parseInt(value.slice(index, index + 2), 16));
  return output;
}

function normalizeMediaUrl(url) {
  if (!url) return "";
  if (url.startsWith("ipfs://")) return `https://ipfs.io/ipfs/${url.slice(7)}`;
  return /^https?:\/\//i.test(url) ? url : "";
}

async function getTokenMetadata(tokenId) {
  try {
    const uri = decodeAbiString(await rpcCall(`0xc87b56dd${encodeUint256(tokenId)}`));
    const normalized = normalizeMediaUrl(uri);
    const endpoints = uri.startsWith("ipfs://")
      ? [`https://gateway.pinata.cloud/ipfs/${uri.slice(7)}`, `https://ipfs.io/ipfs/${uri.slice(7)}`]
      : [normalized];
    for (const endpoint of endpoints) {
      if (!endpoint) continue;
      try {
        const response = await fetch(endpoint);
        if (!response.ok) continue;
        const metadata = await response.json();
        const image = metadata.image?.startsWith("ipfs://") ? `https://gateway.pinata.cloud/ipfs/${metadata.image.slice(7)}` : normalizeMediaUrl(metadata.image);
        return { name: metadata.name, image, attributes: metadata.attributes || [] };
      } catch { /* Try the next public gateway. */ }
    }
    return {};
  } catch {
    return {};
  }
}

async function getWalletTokenIds(wallet) {
  const transferTopic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
  const paddedWallet = `0x${wallet.slice(2).padStart(64, "0")}`;
  const logs = await rpcRequest("eth_getLogs", [{
    address: NFT_COLLECTION,
    fromBlock: "0x23ece9e",
    toBlock: "latest",
    topics: [transferTopic, null, paddedWallet],
  }]);
  const candidates = [...new Set(logs.map((log) => BigInt(log.topics[3]).toString()))].slice(0, 60);
  const checks = await Promise.all(candidates.map(async (tokenId) => {
    try {
      const encodedOwner = await rpcCall(`0x6352211e${encodeUint256(tokenId)}`);
      return `0x${encodedOwner.slice(-40)}`.toLowerCase() === wallet ? tokenId : null;
    } catch { return null; }
  }));
  return checks.filter(Boolean).sort((left, right) => Number(left) - Number(right));
}

function selectWalletFighter(fighter, card) {
  saveWalletFighter(fighter);
  localStorage.setItem("dntcActiveWalletFighter", fighter.tokenId);
  localStorage.setItem("dntcActiveWalletFighterRecord", JSON.stringify(fighter));
  inventoryGrid?.querySelectorAll(".inventory-card").forEach((node) => node.classList.toggle("is-picked", node === card));
  ownedFighterImage.src = fighter.image;
  ownedFighterImage.alt = fighter.name;
  ownedFighterName.textContent = fighter.name;
  ownedFighterDetail.textContent = `Token #${fighter.tokenId} is selected for your next fight.`;
  openGameWithNft.href = `index.html?walletFighter=${encodeURIComponent(fighter.tokenId)}`;
  fighterUnlocked.hidden = false;
  walletMessage.textContent = `DNTC #${fighter.tokenId} selected. Open the game to fight as this exact NFT.`;
}

async function renderWalletInventory() {
  walletMessage.textContent = "Reading your DNTC inventory from Robinhood Chain…";
  walletInventory.hidden = false;
  inventoryGrid.innerHTML = "";
  try {
    const tokenIds = await getWalletTokenIds(connectedAccount);
    inventoryCount.textContent = `${tokenIds.length} fighter${tokenIds.length === 1 ? "" : "s"}`;
    if (!tokenIds.length) throw new Error("No DNTC items are currently held by this wallet.");
    const fighters = await Promise.all(tokenIds.map(async (tokenId) => {
      const metadata = await getTokenMetadata(tokenId);
      return { tokenId, wallet: connectedAccount, collection: NFT_COLLECTION, name: metadata.name || `DNTC #${tokenId}`, image: metadata.image, attributes: metadata.attributes, verifiedAt: new Date().toISOString() };
    }));
    fighters.forEach((fighter) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "inventory-card";
      card.innerHTML = `${fighter.image ? `<img src="${fighter.image}" alt="${fighter.name}">` : ""}<span>#${fighter.tokenId}</span>`;
      card.addEventListener("click", () => selectWalletFighter(fighter, card));
      inventoryGrid.append(card);
    });
    walletMessage.textContent = "Choose the exact NFT you want to use, then open the game.";
  } catch (error) {
    walletInventory.hidden = true;
    walletMessage.textContent = error?.message || "Unable to load this wallet's DNTC collection.";
  }
}

function saveWalletFighter(fighter) {
  let fighters = [];
  try { fighters = JSON.parse(localStorage.getItem("dntcWalletFighters") || "[]"); } catch { fighters = []; }
  fighters = Array.isArray(fighters) ? fighters.filter((item) => item?.tokenId !== fighter.tokenId) : [];
  fighters.unshift(fighter);
  localStorage.setItem("dntcWalletFighters", JSON.stringify(fighters.slice(0, 20)));
  // Keep the original key during the rollout so players who verified earlier retain access.
  localStorage.setItem("dntcWalletFighter", JSON.stringify(fighter));
}

async function connectWallet() {
  if (!window.ethereum) {
    walletMessage.textContent = "No compatible wallet was found. Install or open a wallet that supports Robinhood Chain, then reload.";
    return;
  }
  try {
    connectWalletButton.disabled = true;
    connectWalletButton.textContent = "Connecting…";
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    if (!accounts?.[0]) throw new Error("No wallet account was selected.");
    try {
      await window.ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: ROBINHOOD_CHAIN_ID }] });
    } catch (error) {
      if (error?.code === 4902) throw new Error("Add Robinhood Chain (ID 4663) to your wallet, then reconnect.");
      throw error;
    }
    connectedAccount = accounts[0].toLowerCase();
    walletAddress.textContent = `Connected: ${shortAddress(connectedAccount)}`;
    walletChainStatus.textContent = "Robinhood Chain ready";
    walletMessage.textContent = "Enter a token ID to run an on-chain ownership check. No transaction will be sent.";
    connectWalletButton.hidden = true;
    tokenVerify.hidden = false;
    renderWalletInventory();
  } catch (error) {
    walletMessage.textContent = error?.message || "Wallet connection was cancelled.";
  } finally {
    connectWalletButton.disabled = false;
    connectWalletButton.textContent = "Connect wallet";
  }
}

async function verifyOwnedToken() {
  const tokenId = tokenIdInput.value.trim();
  if (!connectedAccount || !/^\d+$/.test(tokenId)) {
    walletMessage.textContent = "Connect your wallet and enter a valid numeric token ID.";
    return;
  }
  try {
    verifyOwnedTokenButton.disabled = true;
    verifyOwnedTokenButton.textContent = "Checking…";
    const encodedOwner = await rpcCall(`0x6352211e${encodeUint256(tokenId)}`);
    const owner = `0x${encodedOwner.slice(-40)}`.toLowerCase();
    if (owner !== connectedAccount) throw new Error(`Token #${tokenId} is not held by the connected wallet.`);
    const metadata = await getTokenMetadata(tokenId);
    const fighter = {
      tokenId,
      wallet: connectedAccount,
      collection: NFT_COLLECTION,
      name: metadata.name || `DNTC Fighter #${tokenId}`,
      image: metadata.image || "assets/characters/matrix-cap.jpeg",
      verifiedAt: new Date().toISOString(),
    };
    saveWalletFighter(fighter);
    localStorage.setItem("dntcActiveWalletFighter", fighter.tokenId);
    localStorage.setItem("dntcActiveWalletFighterRecord", JSON.stringify(fighter));
    ownedFighterImage.src = fighter.image;
    ownedFighterImage.alt = fighter.name;
    ownedFighterName.textContent = fighter.name;
    ownedFighterDetail.textContent = `Token #${tokenId} belongs to ${shortAddress(connectedAccount)}.`;
    openGameWithNft.href = `index.html?walletFighter=${encodeURIComponent(tokenId)}`;
    fighterUnlocked.hidden = false;
    const savedCount = JSON.parse(localStorage.getItem("dntcWalletFighters") || "[]").length;
    walletMessage.textContent = `${savedCount} verified fighter${savedCount === 1 ? "" : "s"} saved for this browser. Verify another token ID to add it, and reconnect after a transfer.`;
  } catch (error) {
    fighterUnlocked.hidden = true;
    walletMessage.textContent = error?.message || "Unable to verify this token right now.";
  } finally {
    verifyOwnedTokenButton.disabled = false;
    verifyOwnedTokenButton.textContent = "Verify fighter";
  }
}

connectWalletButton?.addEventListener("click", connectWallet);
verifyOwnedTokenButton?.addEventListener("click", verifyOwnedToken);
openGameWithNft?.addEventListener("click", (event) => {
  const activeTokenId = localStorage.getItem("dntcActiveWalletFighter");
  if (!activeTokenId || !/^\d+$/.test(activeTokenId)) {
    event.preventDefault();
    walletMessage.textContent = "Choose a fighter from your wallet before opening the game.";
  }
});
