# WATTx Chain Whitepaper

**A Hybrid PoW/PoS Blockchain with Multi-Algorithm Mining, Smart Contracts, and Privacy**

Version 2.0 | February 2026

---

## Abstract

WATTx is a hybrid Proof-of-Work and Proof-of-Stake blockchain that combines the security of multi-algorithm mining with the energy efficiency of staking consensus. Built on a QTUM-derived foundation with significant enhancements, WATTx introduces the X25X multi-algorithm framework supporting seven distinct mining algorithms across ASIC, GPU, and CPU hardware, enabling the broadest possible miner participation.

The network features a novel dual-halving mechanism that progressively reduces both block rewards and staking maturity requirements, a Trust Tier system that rewards validator uptime with multiplied staking returns, AuxPoW merged mining across all seven supported algorithms, full EVM-compatible smart contracts, and built-in privacy features including cross-chain privacy pools, stealth addresses, and encrypted messaging.

Central to the WATTx vision is the decentralization of mining hash power and electricity across all PoW and PoS blockchains. Through AuxPoW merged mining, miners on any supported algorithm — SHA256d, Scrypt, Ethash, RandomX, Equihash, X11, or kHeavyHash — can simultaneously earn WATTx rewards while supporting the network and algorithm of their choice. A 1% pool fee from merged mining flows into the Mining Game NFT mining pools, creating a self-sustaining circular economy where miners, stakers, gamers, and cross-chain participants all benefit from a unified ecosystem.

WATTx aims to be a truly decentralized, multi-chain-connected cryptocurrency where miners of all hardware types, stakers of all sizes, and developers building decentralized applications can participate in a unified, secure ecosystem.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Vision & Core Principles](#2-vision--core-principles)
3. [Technical Architecture](#3-technical-architecture)
4. [Consensus Mechanism](#4-consensus-mechanism)
5. [X25X Multi-Algorithm Mining](#5-x25x-multi-algorithm-mining)
6. [AuxPoW Merged Mining](#6-auxpow-merged-mining)
7. [Decentralizing Hash Power Across All Chains](#7-decentralizing-hash-power-across-all-chains)
8. [Staking & Delegation](#8-staking--delegation)
9. [Trust Tier System](#9-trust-tier-system)
10. [Tokenomics](#10-tokenomics)
11. [Smart Contract Platform](#11-smart-contract-platform)
12. [Privacy Features](#12-privacy-features)
13. [Ecosystem](#13-ecosystem)
14. [Roadmap](#14-roadmap)
15. [Conclusion](#15-conclusion)

---

## 1. Introduction

### 1.1 The Current Landscape

The cryptocurrency space has matured significantly since Bitcoin's inception in 2009. While Bitcoin established the foundational principles of decentralized digital currency, the ecosystem has diversified into specialized chains optimizing for different trade-offs:

- **Single-algorithm PoW chains** concentrate mining power among owners of specific hardware
- **Pure PoS chains** risk "rich get richer" dynamics and may lack fair initial distribution
- **Smart contract platforms** often sacrifice decentralization for throughput
- **Privacy chains** typically operate in isolation without cross-chain connectivity

No single blockchain has successfully unified multi-algorithm mining, hybrid consensus, smart contract capability, privacy features, and cross-chain interoperability into a cohesive platform.

### 1.2 The WATTx Solution

WATTx bridges these paradigms by implementing:

- **X25X Multi-Algorithm Mining:** 7 algorithms supporting ASICs, GPUs, and CPUs
- **Hybrid PoW/PoS Consensus:** Dual security from both miners and stakers
- **AuxPoW Merged Mining:** Mine WATTx simultaneously with any SHA256d, Scrypt, RandomX, or kHeavyHash chain
- **Trust Tier System:** Progressive validator rewards based on uptime commitment
- **EVM Smart Contracts:** Full Solidity compatibility for dApps and tokens
- **Built-in Privacy:** Cross-chain privacy pools, stealth addresses, and encrypted messaging
- **Cross-Chain Connectivity:** LayerZero-powered bridge to Ethereum, BSC, and Polygon

---

## 2. Vision & Core Principles

### 2.1 Vision

To create a sustainable, decentralized blockchain that empowers individuals worldwide to participate through mining with any hardware, staking with any amount, and building applications with familiar tools.

### 2.2 Core Principles

1. **Hardware Inclusivity:** Every miner, from ASIC operators to laptop users, has a place on the network
2. **Progressive Decentralization:** The network becomes more accessible with each halving era
3. **Security in Depth:** Multiple consensus mechanisms provide defense against any single attack vector
4. **Privacy as a Right:** Financial privacy features are built into the protocol, not bolted on
5. **Fair Launch:** No premine, no ICO, no insider allocation — all coins distributed through mining and staking

---

## 3. Technical Architecture

### 3.1 Network Specifications

| Parameter | Value |
|-----------|-------|
| **Ticker** | WTX |
| **Consensus** | Hybrid PoW/PoS |
| **Mining Framework** | X25X (7 algorithms) |
| **Block Time** | 120 seconds (2 minutes) |
| **Block Reward** | 10 WTX |
| **Reward Split** | 50% PoW / 50% PoS |
| **Maximum Supply** | 21,000,000 WTX |
| **Coinbase Maturity** | 1 block |
| **Stake Maturity** | 500 blocks (dynamic, halves with reward) |
| **Super Staker Minimum** | 20,000 WTX |
| **Smart Contracts** | EVM / Solidity (up to 0.8.x) |
| **Token Standards** | QRC-20, QRC-721 |
| **P2P Port** | 3888 |
| **RPC Port** | 3889 |

### 3.2 Network Layer Architecture

```
+-------------------------------------------------------------+
|                     Application Layer                        |
|  (Wallets, Explorer, WATTxSecret, Bridge, Mining Game, ANS) |
+-------------------------------------------------------------+
|                     Contract Layer                           |
|            (EVM Smart Contracts, QRC-20 Tokens)              |
+-------------------------------------------------------------+
|                     Privacy Layer                            |
|  (Stealth Addresses, Shielded Commitments, Privacy Pools)   |
+-------------------------------------------------------------+
|                     Consensus Layer                          |
|      (X25X PoW + PoS Staking + AuxPoW Merged Mining)        |
+-------------------------------------------------------------+
|                     Network Layer                            |
|             (P2P, Block Propagation, PeerDAS)                |
+-------------------------------------------------------------+
|                      Data Layer                              |
|              (Blockchain, UTXO Set, EVM State)               |
+-------------------------------------------------------------+
```

### 3.3 Codebase Foundation

WATTx is built on a QTUM Core foundation with the following enhancements:

- **X25X Multi-Algorithm Module:** Seven mining algorithms in a unified framework
- **AuxPoW Integration:** Merged mining protocol for auxiliary proof-of-work
- **Proof-of-Stake Module:** Native staking with coinstake transactions and delegation
- **Trust Tier Engine:** Uptime-based reward multiplier system
- **Privacy Primitives:** Cross-chain privacy pools, stealth addresses, encrypted messaging
- **EVM Layer:** Full Ethereum Virtual Machine for smart contract execution
- **Enhanced RPC:** Extended API for mining, staking, contracts, and analytics

### 3.4 Activation Schedule

| Milestone | Block Height |
|-----------|-------------|
| Genesis (Pure PoW) | Block 0 |
| PoW to Hybrid PoW/PoS Transition | Block 500 |
| AuxPoW Merged Mining Activation | Block 210,000 |
| X25X Multi-Algorithm Activation | Block 210,000 |

---

## 4. Consensus Mechanism

### 4.1 Hybrid PoW/PoS Overview

WATTx employs a hybrid consensus where blocks can be produced by either Proof-of-Work miners or Proof-of-Stake validators. Every block reward of 10 WTX is split evenly: 5 WTX to miners and 5 WTX to stakers.

This dual approach provides:

- **Enhanced Security:** Attackers must compromise both mining and staking simultaneously
- **Continuous Operation:** Network continues functioning if either mechanism is temporarily weakened
- **Inclusive Participation:** Users contribute through mining, staking, or both
- **Economic Balance:** Neither miners nor stakers can dominate the reward structure

### 4.2 Block Selection

When both PoW and PoS solutions are found:
- The first valid block received by the majority of nodes wins
- The network naturally balances between PoW and PoS based on participation levels
- Combined difficulty ensures both mechanisms contribute proportionally to security

### 4.3 Combined Difficulty

```
Combined Difficulty = PoW_Difficulty^0.6 x PoS_Difficulty^0.4

Where:
- PoW Difficulty: Traditional mining difficulty across all algorithms
- PoS Difficulty: 100 / Staking Participation Rate
```

This formula ensures both mechanisms contribute to the network's security assessment, with PoW weighted slightly higher to maintain mining incentives.

---

## 5. X25X Multi-Algorithm Mining

### 5.1 Overview

The X25X framework is WATTx's multi-algorithm mining system, activated at block 100,000. It supports seven distinct algorithms, each targeting different hardware classes, ensuring that no single hardware type can monopolize block production.

### 5.2 Supported Algorithms

| Algorithm | Target Hardware | Type | Compatible Chains |
|-----------|----------------|------|-------------------|
| **SHA256d** | ASIC | Hash | Bitcoin, Bitcoin Cash, and other SHA256d chains |
| **Scrypt** | ASIC / GPU | Memory-hard | Litecoin, Dogecoin, Flopcoin, Trollcoin and other Scrypt chains |
| **Ethash** | GPU | Memory-hard | Ethereum Classic, Altcoinchain, EGAZ, Octaspace and other Ethash chains |
| **RandomX** | CPU | CPU-optimized | Monero, WATTx, Etica and other RandomX chains |
| **Equihash** | GPU / ASIC | Memory-hard | Zcash, Horizen, bitcoinZ, and other Equihash chains |
| **X11** | ASIC / GPU | Chained hash | Dash, DGB, HTH and other X11 chains |
| **kHeavyHash** | GPU / ASIC | Matrix-heavy | Kaspa and other kHeavyHash chains |

### 5.3 Design Philosophy

**Hardware Inclusivity:** By supporting seven algorithms across three hardware classes (ASIC, GPU, CPU), WATTx ensures:

- **SHA256d** miners can contribute with ASICs — compatible with any SHA256d chain
- **Scrypt** miners can contribute with ASICs or GPUs — compatible with any Scrypt chain
- **Ethash** miners can contribute with GPUs — compatible with any Ethash chain
- **RandomX** miners can contribute with CPUs — compatible with any RandomX chain
- **Equihash** miners can contribute with GPUs or ASICs — compatible with any Equihash chain
- **X11** miners can contribute with ASICs or GPUs — compatible with any X11 chain
- **kHeavyHash** miners can contribute with GPUs or ASICs — compatible with any kHeavyHash chain

This approach maximizes network hash power by tapping into existing mining infrastructure across the entire cryptocurrency ecosystem — not limited to any single chain, but welcoming miners from every chain that shares a supported algorithm.

**Difficulty Isolation:** Each algorithm maintains its own independent difficulty adjustment, preventing hashrate fluctuations on one algorithm from affecting others. This ensures stable block production regardless of miner migration patterns.

**Algorithm Rotation:** Blocks cycle through algorithms, giving each equal opportunity for block production and preventing any single algorithm from becoming dominant.

---

## 6. AuxPoW Merged Mining

### 6.1 What is Merged Mining?

Auxiliary Proof-of-Work (AuxPoW) allows miners to submit work done on any parent chain using a supported algorithm as valid proof-of-work on WATTx simultaneously. Miners earn rewards on both chains with no additional energy cost.

### 6.2 Supported Merge-Mining Algorithms

| Algorithm | Target Hardware | Activation |
|-----------|----------------|------------|
| SHA256d | ASIC | Block 210,000 |
| Scrypt | ASIC / GPU | Block 210,000 |
| Ethash | GPU | Block 210,000 |
| RandomX | CPU | Block 210,000 |
| Equihash | GPU / ASIC | Block 210,000 |
| X11 | ASIC / GPU | Block 210,000 |
| kHeavyHash | GPU / ASIC | Block 210,000 |

All seven X25X algorithms support AuxPoW merged mining from activation. Miners on **any** chain that shares a supported algorithm can merge-mine WATTx — this is not limited to specific parent chains.

### 6.3 How It Works

1. Miner constructs a parent chain block using any supported algorithm that includes a WATTx block hash commitment in its coinbase transaction
2. Upon finding a valid parent chain solution, the miner extracts the AuxPoW proof
3. The AuxPoW proof is submitted to WATTx, demonstrating that sufficient work was performed
4. WATTx validates the proof and accepts the block, rewarding the miner on both chains

### 6.4 Benefits

- **Free Security:** WATTx inherits hash power from any chain sharing a supported algorithm at no marginal energy cost
- **Miner Incentive:** Miners earn additional revenue without additional hardware or electricity
- **Network Effect:** As more miners opt in, WATTx security scales with total hash power across all compatible chains
- **Decentralization:** No need for dedicated WATTx mining infrastructure — any miner on any chain using SHA256d, Scrypt, RandomX, or kHeavyHash can participate
- **Algorithm Breadth:** Seven algorithms mean WATTx can tap into the hash power of virtually every major PoW chain in existence

---

## 7. Decentralizing Hash Power Across All Chains

### 7.1 The Problem: Concentrated Hash Power

Today's blockchain mining landscape suffers from extreme concentration. A handful of large pools control the majority of hash power on most PoW chains, creating single points of failure and centralization risk. Smaller networks with less hashrate are especially vulnerable to 51% attacks, while miners on large networks have no incentive to support smaller chains.

Meanwhile, the electricity consumed by global PoW mining is enormous — yet each joule of energy typically secures only a single blockchain. This is a massive inefficiency.

### 7.2 The WATTx Vision: One Hash, Many Chains

WATTx's multi-algorithm AuxPoW merged mining fundamentally changes this equation. A miner running **any** of the seven supported algorithms on **any** compatible chain can simultaneously earn WATTx rewards:

- **SHA256d** miners earn parent chain rewards + WTX — works with any SHA256d chain
- **RandomX** miners earn parent chain rewards + WTX — works with any RandomX chain
- **Scrypt** miners earn parent chain rewards + WTX — works with any Scrypt chain
- **kHeavyHash** miners earn parent chain rewards + WTX — works with any kHeavyHash chain
- **Ethash** miners earn parent chain rewards + WTX — works with any Ethash chain
- **Equihash** miners earn parent chain rewards + WTX — works with any Equihash chain
- **X11** miners earn parent chain rewards + WTX — works with any X11 chain

Every watt of electricity spent mining on any chain that uses a supported algorithm can now **also** secure the WATTx network at zero additional energy cost. This is the core innovation: **decentralizing hash power and electricity across all PoW blockchains, regardless of which specific chain a miner supports.**

### 7.3 Supporting Smaller Networks

Merged mining works both ways. WATTx doesn't just absorb security from large chains — it creates incentive for miners on large chains to pay attention to smaller networks. A SHA256d miner who merge-mines WATTx is now economically connected to the WATTx ecosystem, and so is every Scrypt, RandomX, Ethash, Equihash, X11, or kHeavyHash miner. This cross-chain mining participation strengthens the entire cryptocurrency landscape by distributing security more broadly.

Miners can choose to support the network and algorithm of their choice — whether it's the largest chain with the most hashrate or the smallest chain that needs the most help. Because WATTx supports seven algorithms, virtually every PoW chain in existence shares at least one algorithm with WATTx, meaning no mining community is left out.

### 7.4 The 1% Pool Fee and the Mining Game Economy

A critical piece of the WATTx mining economy is the **1% pool fee** from merged mining pools, which flows directly into the **Mining Game NFT mining pools**. This creates a self-sustaining circular economy:

```
+------------------------------------------------------------------+
|                  WATTx Mining Economy Cycle                       |
|                                                                  |
|  Miners (any chain/algorithm)                                    |
|     |                                                            |
|     v                                                            |
|  Merge-mine WATTx --> earn WTX rewards                           |
|     |                                                            |
|     +--> 1% pool fee --> Mining Game NFT Pools                   |
|                              |                                   |
|                              v                                   |
|                    Mining Game NFTs (rigs, components)            |
|                              |                                   |
|                              v                                   |
|               Buy NFTs with WATT, WTX, or other coins            |
|                              |                                   |
|                              v                                   |
|                Spend WATT by bridging WTX across                 |
|               LayerZero to Altcoinchain, Polygon,                |
|                  or other community-chosen EVMs                   |
|                              |                                   |
|                              v                                   |
|                 NFT mining rigs earn WATT rewards                |
|                              |                                   |
|                              +---> back to mining/staking        |
+------------------------------------------------------------------+
```

**How it works:**

1. **Miners** on any chain merge-mine WATTx through pools that charge a standard 1% fee
2. **Pool fees** fund the Mining Game NFT mining pools, creating a treasury of WATT rewards
3. **Players** purchase Mining Game NFTs (CPUs, GPUs, rigs, components) using WATT, WTX, or other supported coins
4. **NFT holders** build virtual mining rigs that earn WATT token rewards proportional to their rig's hashrate
5. **WATT spending** happens by bridging WTX across LayerZero to Altcoinchain, Polygon, or other EVM chains that the community votes to participate in
6. **Community governance** decides which chains participate in the Mining Game ecosystem, ensuring organic growth driven by actual miner and user interest

### 7.5 Why This Matters

This architecture solves several fundamental problems simultaneously:

- **For miners:** Additional revenue stream on every block mined, regardless of which chain they primarily support
- **For small chains:** Inherited hash power from merged mining without needing to attract dedicated miners
- **For the environment:** More security per watt of electricity consumed globally
- **For gamers/NFT users:** A play-to-earn economy funded by real mining activity, not inflationary token printing
- **For cross-chain users:** A reason to bridge assets, creating genuine cross-chain economic activity
- **For the community:** Democratic governance over which chains and ecosystems participate

WATTx doesn't just build another isolated blockchain — it builds a **connective tissue between all PoW chains**, redistributing hash power, economic incentives, and security across the entire cryptocurrency ecosystem.

---

## 8. Staking & Delegation

### 8.1 Solo Staking

**Requirements:**
1. Hold WTX in a wallet you control
2. Wait for coins to mature (current threshold: 500 blocks, ~16.7 hours)
3. Keep wallet online and unlocked for staking
4. Earn the PoS share of block rewards (5 WTX per block)

**Stake Weight Calculation:**
```
Stake Weight = Sum(Mature UTXO Values)

A UTXO is mature when:
- Confirmations >= Maturity Threshold (currently 500 blocks)
- Has not moved within the maturity window
```

### 8.2 Delegation (Super Staking)

For users who cannot run a staking node 24/7, WATTx offers delegation to Super Stakers:

**Super Staker Requirements:**
- Minimum stake: 20,000 WTX
- Run a full node 24/7
- Maintain high uptime (eligible for Trust Tier bonuses)
- Set transparent fee structure

**Delegator Benefits:**
- Stake without running a node
- Coins never leave your wallet (non-custodial)
- Participate with any amount
- Cold storage compatible

### 8.3 Cold Staking

WATTx supports cold staking through delegation:
- Hardware wallet storage of coins
- Air-gapped security
- No exposure of private keys
- Delegation to a hot Super Staker node

---

## 9. Trust Tier System

### 9.1 Overview

The Trust Tier system rewards validators who maintain consistent uptime with multiplied staking rewards. This incentivizes reliable network infrastructure and penalizes intermittent participation.

### 9.2 Tier Structure

| Tier | Uptime Requirement | Reward Multiplier |
|------|-------------------|-------------------|
| Bronze | 95% | 1.0x |
| Silver | 97% | 1.25x |
| Gold | 99% | 1.5x |
| Platinum | 99.9% | 2.0x |

### 9.3 How It Works

- Validator uptime is measured over rolling windows
- Tier assignment updates dynamically based on recent uptime performance
- Higher tiers receive proportionally larger shares of staking rewards
- Platinum validators (99.9% uptime) earn double the base staking rate

### 9.4 Design Rationale

The Trust Tier system solves the "lazy validator" problem in PoS networks:
- **Without Trust Tiers:** Validators can go offline frequently, stake intermittently, and still earn proportional rewards, weakening network reliability
- **With Trust Tiers:** Dedicated validators earn significantly more, creating economic incentive for professional-grade infrastructure and consistent block production

---

## 10. Tokenomics

### 10.1 Supply Model

WATTx follows a deflationary emission model with a maximum supply of **21,000,000 WTX**.

- **Block Reward:** 10 WTX (5 PoW + 5 PoS)
- **Halving Interval:** Every 1,051,200 blocks (~4 years at 2-minute blocks)
- **Coinbase Maturity:** 1 block (newly mined coins available almost immediately)

### 10.2 Dual-Halving Mechanism

WATTx implements a novel dual-halving where each halving event simultaneously:

1. **Reduces block rewards by 50%** — controlling inflation
2. **Reduces staking maturity requirements by 50%** — increasing accessibility

| Era | Block Reward | Maturity | Approx. Timeline |
|-----|-------------|----------|-------------------|
| 0 | 10 WTX | 500 blocks (~16.7 hrs) | Launch |
| 1 | 5 WTX | 250 blocks (~8.3 hrs) | ~Year 4 |
| 2 | 2.5 WTX | 125 blocks (~4.2 hrs) | ~Year 8 |
| 3 | 1.25 WTX | 62 blocks (~2.1 hrs) | ~Year 12 |
| 4 | 0.625 WTX | 31 blocks (~1 hr) | ~Year 16 |
| 5 | 0.3125 WTX | 15 blocks (~30 min) | ~Year 20 |

### 10.3 Progressive Accessibility

The decreasing maturity threshold is a deliberate mechanism for progressive decentralization:

- **Early eras:** Higher barriers ensure committed stakers and strong initial security
- **Later eras:** Lower barriers invite broader participation, securing the network through numbers rather than individual commitment
- **Final eras:** Near-instant maturity (15-31 blocks) enables maximum participation and decentralization

### 10.4 Fair Launch

WATTx was launched with:
- **Zero premine:** No coins allocated before launch
- **No ICO/IEO/IDO:** All coins distributed through mining and staking
- **No founder allocation:** Team earns through participation like everyone else
- **Fair distribution:** Community-driven from block 0

---

## 11. Smart Contract Platform

### 11.1 EVM Compatibility

WATTx includes a full Ethereum Virtual Machine (EVM) compatible layer:

- **Solidity Support:** Up to version 0.8.x
- **Built-in Compiler:** Deploy contracts directly from wattx-qt wallet
- **QRC-20 Tokens:** ERC-20 equivalent token standard
- **QRC-721 NFTs:** ERC-721 equivalent NFT standard
- **Contract Verification:** On-chain source code verification via the block explorer

### 10.2 Contract Interaction

```bash
# Deploy a contract (from compiled bytecode)
./wattx-cli createcontract "BYTECODE"

# Call a contract method (read-only)
./wattx-cli callcontract "CONTRACT_ADDR" "DATA"

# Send to a contract (state-changing)
./wattx-cli sendtocontract "CONTRACT_ADDR" "DATA" 0
```

### 10.3 Gas Model

- Contracts consume gas for execution, paid in WTX
- Gas prevents infinite loops and spam transactions
- Gas pricing ensures economic sustainability for developers
- Lower gas costs than Ethereum mainnet

---

## 12. Privacy Features

### 11.1 Cross-Chain Privacy Pools

WATTx implements cross-chain privacy pools using LayerZero messaging and zero-knowledge proofs:

**How It Works:**
1. User deposits USDT on any supported chain (Ethereum, BSC, Polygon) in fixed denominations (100, 1K, 10K, 100K)
2. USDT is locked in that chain's Privacy Pool contract
3. LayerZero sends a cross-chain message to WATTx, creating a shielded commitment
4. User generates a zero-knowledge proof off-chain
5. User withdraws to ANY supported chain using the proof — with no on-chain link to the original deposit

**Privacy Guarantees:**
- Fixed denominations prevent amount-based correlation
- ZK proofs ensure withdrawal validity without revealing deposit source
- Cross-chain withdrawal breaks single-chain analysis
- Incremental Merkle tree (20 levels) stores commitments efficiently

### 11.2 Stealth Addresses

Stealth addresses allow recipients to receive funds without revealing their public address on the blockchain:
- Sender generates a one-time address from the recipient's public key
- Only the recipient can detect and spend funds sent to stealth addresses
- Each transaction appears to go to a unique, unlinked address

### 11.3 WATTxSecret — Encrypted Messaging

WATTxSecret is a client-side encrypted messaging tool built into the WATTx ecosystem:

- **AES-256-GCM encryption** — military-grade, performed entirely in the browser
- **Self-destructing messages** — configurable expiry (1-30 days) and view limits (1-10 views)
- **Zero-knowledge architecture** — no data is ever sent to a server
- **No tracking** — no cookies, no analytics, no server-side storage

---

## 13. Ecosystem

### 12.1 Block Explorer

The WATTx Block Explorer provides real-time visibility into the blockchain:
- Block and transaction browsing
- Address balance and history lookup
- QRC-20 token tracking with holders and transfers
- Smart contract interaction (read/write functions)
- Contract source code verification
- Network statistics and staking metrics

**Live:** [wtx-explorer.wattxchange.app](https://wtx-explorer.wattxchange.app)

### 12.2 WATTxSecret

End-to-end encrypted self-destructing messaging, accessible at [wattxchain.org/secret](https://wattxchain.org/secret).

### 12.3 Cross-Chain Bridge (Coming Soon)

LayerZero-powered bridge enabling seamless asset transfers between:
- WATTx
- Ethereum
- Binance Smart Chain
- Polygon

### 13.4 Mining Game (Coming Soon)

The Mining Game is an NFT Mining Rig Builder dApp that sits at the heart of the WATTx circular economy. Funded by the 1% pool fee from all merged mining pools, it creates a play-to-earn ecosystem backed by real mining activity:

**Gameplay:**
- Collect component NFTs — CPUs, GPUs, motherboards, power supplies, cooling systems
- Build virtual mining rigs by combining components
- Each rig has a virtual hashrate determined by its components
- Earn WATT token rewards proportional to rig hashrate

**Economy:**
- Purchase Mining Game NFTs using WATT, WTX, or other supported coins
- Spend WATT by bridging WTX across LayerZero to Altcoinchain, Polygon, or other community-chosen EVM chains
- The community governs which chains participate in the Mining Game ecosystem
- Pool fee treasury continuously funds rewards, creating sustainable yield backed by real mining revenue

**Cross-Chain:**
- NFTs deployed on both Polygon and Altcoinchain
- WATT token bridgeable across LayerZero to any participating EVM chain
- Community votes determine new chain integrations

### 13.5 ANS — WATTx Name Service

Human-readable domain names for WATTx addresses (similar to ENS on Ethereum):
- Register `.wtx` domains
- Map domains to wallet addresses, smart contracts, and IPFS content
- Resolve names natively in wallets and dApps

### 12.6 Official Wallets

**Desktop Wallet (wattx-qt):**
- Full node capability with built-in mining
- Staking interface with delegation management
- Smart contract deployment and interaction
- Available for Linux, Windows, and macOS

**Mobile Wallet (Coming Soon):**
- Light client for Android and iOS
- Delegation support
- QR code transactions

---

## 14. Roadmap

### Phase 1: Foundation (Completed)
- [x] Network launch with hybrid PoW/PoS consensus
- [x] Core desktop wallet (Linux, Windows, macOS)
- [x] Block explorer deployment
- [x] Mining pool support
- [x] EVM smart contract layer

### Phase 2: Multi-Algorithm & Merged Mining (Completed)
- [x] X25X multi-algorithm framework (7 algorithms)
- [x] AuxPoW merged mining (SHA256d, RandomX, Scrypt, kHeavyHash)
- [x] Dynamic stake maturity with dual-halving
- [x] Trust Tier validator reward system
- [x] Enhanced block explorer with contract interaction

### Phase 3: Privacy & Ecosystem (In Progress)
- [x] WATTxSecret encrypted messaging
- [x] Cross-chain privacy pool contracts (LayerZero)
- [x] Stealth address primitives
- [x] ANS domain name service
- [ ] ZK circuit deployment (Groth16 proofs for withdrawals)
- [ ] Cross-chain bridge launch
- [ ] Mining Game dApp launch

### Phase 4: Scaling & Adoption (Planned)
- [ ] Mobile wallets (Android & iOS)
- [ ] Hardware wallet integration (Ledger, Trezor)
- [ ] PeerDAS data availability sampling
- [ ] On-chain governance
- [ ] Developer grants program
- [ ] Exchange listings

### Phase 5: Mass Adoption (Vision)
- [ ] Merchant payment solutions
- [ ] Layer 2 scaling solutions
- [ ] Enterprise partnerships
- [ ] Regulatory compliance framework

---

## 15. Conclusion

WATTx represents a comprehensive evolution of blockchain technology, unifying features that typically exist in isolation across separate chains:

**Key Innovations:**

1. **X25X Multi-Algorithm Mining:** Seven algorithms ensure any miner, regardless of hardware, can participate in securing the network
2. **AuxPoW Merged Mining:** Inherited security from any chain sharing a supported algorithm at zero marginal energy cost
3. **Trust Tier System:** Economic incentives for reliable validator infrastructure
4. **Dual-Halving Mechanism:** Simultaneously reduces emission and barriers to participation
5. **Built-in Privacy:** Cross-chain privacy pools, stealth addresses, and encrypted messaging as first-class features
6. **Full Smart Contract Support:** EVM compatibility brings the entire Solidity ecosystem to WATTx

**The WATTx Promise:**

- A blockchain that welcomes every type of miner
- A staking system that rewards commitment and reliability
- A network that grows more decentralized with each era
- Privacy features built into the protocol, not afterthoughts
- A fair-launch, community-owned asset with transparent economics

WATTx is not just another cryptocurrency — it is a unified platform for mining, staking, privacy, and decentralized applications, designed for long-term sustainability and maximum participation.

---

## Appendix A: Network Parameters

| Parameter | Value |
|-----------|-------|
| Ticker | WTX |
| Consensus | Hybrid PoW/PoS |
| Mining Framework | X25X (SHA256d, Scrypt, Ethash, RandomX, Equihash, X11, kHeavyHash) |
| Block Time | 120 seconds |
| Block Reward | 10 WTX (5 PoW + 5 PoS) |
| Coinbase Maturity | 1 block |
| Stake Maturity | 500 blocks (halves with reward) |
| Max Supply | 21,000,000 WTX |
| Super Staker Minimum | 20,000 WTX |
| Smart Contracts | EVM / Solidity 0.8.x |
| Token Standards | QRC-20 (fungible), QRC-721 (NFT) |
| P2P Port | 3888 |
| RPC Port | 3889 |
| PoW to Hybrid | Block 5,000 |
| AuxPoW Activation | Block 210,000 |
| X25X Activation | Block 100,000 |

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| **AuxPoW** | Auxiliary Proof-of-Work; merged mining proof from a parent chain |
| **Block Reward** | New coins created with each block (currently 10 WTX) |
| **Coinstake** | A PoS block's special transaction proving stake ownership |
| **Delegator / Super Staker** | A node accepting staking delegations (min 20,000 WTX) |
| **Era** | Period between halvings with constant block reward and maturity |
| **Halving** | Event reducing block reward and stake maturity by 50% |
| **Maturity** | Minimum age for coins to be eligible for staking |
| **QRC-20** | WATTx fungible token standard (ERC-20 compatible) |
| **RandomX** | ASIC-resistant CPU mining algorithm (Monero-derived) |
| **Stake Weight** | Total value of mature coins eligible for staking |
| **Trust Tier** | Uptime-based validator classification affecting reward multiplier |
| **UTXO** | Unspent Transaction Output |
| **X25X** | WATTx's multi-algorithm mining framework |

## Appendix C: Resources

**Official Links:**
- Website: [wattxchain.org](https://wattxchain.org)
- Explorer: [wtx-explorer.wattxchange.app](https://wtx-explorer.wattxchange.app)
- GitHub: [github.com/WATTxChain](https://github.com/WATTxChain)
- WATTxSecret: [wattxchain.org/secret](https://wattxchain.org/secret)

---

## Disclaimer

This whitepaper is for informational purposes only and does not constitute financial advice, an offer to sell, or a solicitation of an offer to buy any tokens or securities. Cryptocurrency investments carry significant risks including the potential loss of all invested capital. Past performance is not indicative of future results.

The WATTx project makes no guarantees regarding the future value of WTX tokens, the completion of roadmap items, or the accuracy of forward-looking statements contained herein. Readers should conduct their own research and consult with qualified financial advisors before making any investment decisions.

Regulatory requirements vary by jurisdiction. It is the responsibility of each individual to ensure compliance with applicable laws and regulations.

---

**Document Version:** 2.0
**Last Updated:** February 2026
**Status:** Living Document — Subject to Community Updates

*Copyright 2026 WATTx Community. Released under CC BY-SA 4.0 license.*
