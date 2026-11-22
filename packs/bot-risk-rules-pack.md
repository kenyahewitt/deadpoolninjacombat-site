# Bot Risk Rules Pack

**Deadpool Ninja Combat store · Cyber Monday digital add-on**  
Draft preview · November 2026  
Not financial advice. Not a bot, signal service, wallet, or performance promise.

This pack is a concise starter rulebook you can copy into your own trading bot or checklist. The numbers below are **example starter limits**. Change them to fit your capital. Leave the switches on. If a rule and a "hot tip" disagree, the rule wins.

Do not put seed phrases, private keys, RPC secrets, or wallet addresses in this pack or in your config file.

---

## How to use this pack

1. Copy `bot-risk-rules.example.json` and rename it.
2. Put your own numbers in. Keep every switch enabled until you have a written reason to change it.
3. Make your bot read the file on every loop, and log every skip, halt, stop, and lock.
4. Keep a KILL switch you can flip by hand.

---

## The rules

### 1. Per-trade cap
Never risk more than a fixed size on one entry.  
Example starter: **0.10 SOL** per meme-coin entry, or **$3** per prediction-market trade.  
If the wallet is smaller than about 3 to 5 times this cap, cut the cap, not the rule.

### 2. Total-open cap
A hard ceiling on the dollar value of all open positions at once.  
Example starter: **$10** total open.

### 3. Max open sleeves
Example starter: **1**. One trade at a time. No stacking "just one more."

### 4. Stops
Default stop: **−15%** from entry.  
Early-tier or newly launched coins: tighter stop, **−10%**.  
If a stop cannot fill at the target because of slippage, flatten anyway. Do not wait for a perfect price.

### 5. Daily halt
After a set realized loss for the day, stop opening new buys until the next day.  
Example starter: **$5** daily halt.

### 6. KILL file
A local, manual kill switch — a file or flag your bot checks every loop. When it is present, all new buys are blocked immediately. Selling and other exits may still run so you can flatten. Keep this on a path you control. This pack does not include any live paths, wallets, or keys.

### 7. Rugcheck
No buy until an automated rug or safety check passes. A fail or a timeout is a skip, and it gets logged.

### 8. Liquidity floor
Skip pools below a liquidity floor.  
Example starter: **$8,000**.  
Optional exemption: coins still on a launch bonding curve may use a separate, stricter path — only if that path has a fast-exit rule.

### 9. Bot-farm / clone skip
Skip tokens that look like copies of a coin that already launched: same or near-same name, factory-band lookalikes, and template swarms. Also skip brand-costume names (tokens posing as real companies, products, or major coins) unless you can verify they are official. Log every skip.

### 10. Breakeven (BE) lock
When a trade is up **+10%**, arm a lock. Trail a floor at **+3%** (or at breakeven if you want it tighter). Do not give a winner back to a full stop.

### 11. Exploit-coin skip
Skip any token named after a hack, exploit, or "stolen / printed" event from the last **72 hours**. Copycat "hack" meme coins show up fast after headlines. Log every skip. Position limits stay the same.

---

## Completing the book

These two exits close the loop with the rules above:

- **Take profit:** example **+20%**.
- **Time exit:** example **15 minutes** if neither the stop nor the target has hit.
- **Launch-curve fast stop:** use a tighter, faster exit while a coin is still on its launch curve.

---

## Logging

Log every skip, halt, kill, stop, and BE arm, with the time, the reason, and the contract address when you have it. Never write secrets or keys into logs.

---

## What this pack is not

This is not financial advice, a signal service, or a promise of profit. It is not a live bot, an API key, or a wallet. You are responsible for your own settings and funds.

---

## One-page checklist

- [ ] Per-trade cap is set and enforced
- [ ] Total-open cap is set and enforced
- [ ] Only one sleeve may be open
- [ ] Default stop −15%; early-tier stop −10%; flatten on slippage
- [ ] Daily halt is on
- [ ] KILL switch is on and tested
- [ ] Rugcheck must pass before a buy
- [ ] Liquidity floor is on (launch-curve path has a fast exit)
- [ ] Bot-farm / clone / brand-costume skips are on
- [ ] BE lock arms at +10% with a +3% floor
- [ ] Exploit-coin skip covers headlines from the last 72 hours
- [ ] Take profit and time exit are on
- [ ] Skips and exits are logged, with no secrets in the logs
