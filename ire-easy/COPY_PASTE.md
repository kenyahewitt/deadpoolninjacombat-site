# IRE ire-1 — easiest validator join (copy-paste)

**Testnet only.** Do not put real mainnet money on `ire-1`. No faucet. Grants paused.
Canonical docs: https://boomer250.com/join/ · Call: https://github.com/kenyahewitt/ire-blockchain/issues/8

You need a **Linux PC, Mac, or cheap VPS** (phones alone cannot run a validator node).
Or paste the **AI prompt** below into an agent that has a computer.

---

## For humans — one block at a time

### 1) Build + init (replace `mymoniker`)
```sh
git clone https://github.com/kenyahewitt/ire-blockchain.git
cd ire-blockchain
git checkout a762557
make build

./build/ired init mymoniker --chain-id ire-1 --home "$HOME/.ire"
cp networks/ire-1/genesis.json "$HOME/.ire/config/genesis.json"
```

### 2) Seed peer — edit `$HOME/.ire/config/config.toml`
```text
persistent_peers = "63c21a2befb884a958cdc88a1c78788eae42bf5b@91.99.1.9:26656"
```
Optional if you have a public IP:
```text
external_address = "tcp://YOUR_PUBLIC_IP:26656"
```

### 3) Start + wait until synced
```sh
./build/ired start --home "$HOME/.ire"
```
In another terminal:
```sh
curl -s http://127.0.0.1:26657/status | python3 -c 'import sys,json; s=json.load(sys.stdin)["result"]["sync_info"]; print(s["latest_block_height"], s["catching_up"])'
```
Ready when second value is `False`.

### 4) Make wallet (never paste the mnemonic in chat)
```sh
./build/ired keys add myvalidator --home "$HOME/.ire"
./build/ired keys show myvalidator -a --home "$HOME/.ire"
./build/ired tendermint show-validator --home "$HOME/.ire"
```

### 5) Comment on GitHub #8 (reply template)
```text
Moniker:
Country / DC (optional):
Synced height (or syncing):
ire1 address (for join allocation):
Tendermint node id + listen (optional):
```
Issue: https://github.com/kenyahewitt/ire-blockchain/issues/8

### 6) After you receive `uire` — create-validator
Copy `networks/ire-1/validator.json.example` → `validator.json`, paste pubkey, set moniker + amount, then:
```sh
./build/ired tx staking create-validator validator.json \
  --from myvalidator \
  --chain-id ire-1 \
  --home "$HOME/.ire" \
  --gas auto \
  --gas-adjustment 1.4 \
  --gas-prices 0.001uire \
  --yes
```

Public RPC (optional checks): `https://rpc.boomer250.com/rpc`  
Alt: `https://91.99.1.9/rpc` (may need `curl -k`)

---

## For AI agents — paste this whole prompt

```text
You are helping me join the IRE public testnet ire-1 as a full node / future validator.

Facts (do not invent others):
- Chain-id: ire-1
- Repo: https://github.com/kenyahewitt/ire-blockchain
- Match seed binary: git checkout a762557 then make build
- Genesis: networks/ire-1/genesis.json → $HOME/.ire/config/genesis.json
- Seed peer: 63c21a2befb884a958cdc88a1c78788eae42bf5b@91.99.1.9:26656
- Docs: https://boomer250.com/join/
- Call issue: https://github.com/kenyahewitt/ire-blockchain/issues/8
- No faucet. Never ask me to paste a mnemonic in chat.
- Prefer RPC https://rpc.boomer250.com/rpc

Do this on my computer or a Linux VPS:
1) Clone, checkout a762557, make build
2) ired init with a moniker I choose, copy genesis
3) Set persistent_peers in config.toml
4) Start ired and wait until catching_up is false
5) keys add myvalidator (I type mnemonic recovery ONLY in the local terminal if recovering)
6) Print my ire1 address and synced height so I can comment on GitHub #8
7) Stop before create-validator until I have uire funded

Report: moniker, ire1 address, height, catching_up, any errors.
```

---

## No PC?
- Rent a cheap Linux VPS ($4–6/mo) and paste the AI prompt there, **or**
- Ask a friend with a Mac/PC to run it, **or**
- Activate Crypto Brokers later for agent enrollment (25 IRE grants are **paused** right now — not live).
