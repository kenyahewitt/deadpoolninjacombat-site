# DNTC Fighter Vault — launch checklist

Status: **draft only; not deployed; do not fund or transfer NFTs.**

## Locked launch inputs (pending timezone confirmation)

- Reward: **1 NinjaAgent per staked DNTC NFT per day** (`1e18 / 86400` token units per second for an 18-decimal token).
- Start: **September 6, 2026 at 00:00 America/New_York** (`1788667200` Unix seconds / 04:00 UTC).
- End: no fixed end; claims stop when the funded **12,000,000 NinjaAgent** budget is depleted.
- NFT cap: **20 DNTC NFTs per wallet**.
- Admin: `0xdfF1a5dc565a2D8d0C2818f8B190ca8399B869b3` (recommended to replace with a multisig before mainnet launch).
- Prize NFTs: only project-funded NFTs deposited into a separate prize vault are eligible. User-staked NFTs can never become prizes.

The collection creator address `0xdfF1a5dc565a2D8d0C2818f8B190ca8399B869b3` is an externally owned wallet shown as the creator by Robinscan. It is not a staking-vault contract.

## Proposed contract split

1. `DntcNftStakingVault` accepts only DNTC collection `0x59652e80e0103303fcf40911fb41eff022eadee2` and pays only NinjaAgent `0x5ce837cf242e763f9b0e9a87aa7907c3f5dd083c`.
2. A separate prize-distribution contract holds project-owned NFT prizes. It must never share custody with user-staked NFTs.
3. The game entitlement checks both direct ownership and `stakeOf(tokenId).staker`, so a staked NFT can remain playable.

## Required decisions before deployment

- NinjaAgent rate per NFT per day, total campaign budget, start time, and end time.
- Maximum NFTs per wallet and whether rare traits receive a multiplier.
- Prize-NFT mechanism: public sweepstakes rules, fixed milestones, or a claim list. Do not use an unverifiable random draw.
- Admin multisig address, pause policy, upgrade policy (recommended: no upgradeability), and incident response owner.
- Independent Solidity review, testnet deployment, and public verified source before mainnet funding.
- Exact funding transaction amount after verifying the NinjaAgent token source and balances.

## Auction marketplace prerequisite

An auction page can display every DNTC item and let an owner prepare a listing, but a real bid/settlement flow requires a separate audited marketplace-escrow contract. It must atomically hold the listed NFT, accept the allowed payment assets, track highest bids, return losing bids, distribute royalties, and transfer the NFT only after settlement. Do not use a creator wallet as auction escrow.

The included Solidity file is a design draft and has not been compiled or audited. It contains no arbitrary admin withdrawal path for user NFTs; withdrawals are intentionally available to the staker at all times. Do not use it for a live launch until the listed decisions and review are complete.
