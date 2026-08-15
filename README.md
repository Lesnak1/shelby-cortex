# ⚡ Shelby Cortex

> **Autonomous Decentralized Hot-Storage & AI Agent Engine for the Shelby Protocol on Aptos**

[![Aptos L1](https://img.shields.io/badge/Aptos-Testnet-blue?style=flat-square&logo=aptos)](https://explorer.aptoslabs.com/?network=testnet)
[![Shelby Hot Storage](https://img.shields.io/badge/Shelby-Hot_Storage-cyan?style=flat-square)](https://docs.shelby.xyz)
[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel-000?style=flat-square&logo=vercel)](https://vercel.com)
[![Zero Mock Data](https://img.shields.io/badge/Data-100%25_Live_On--Chain-00e676?style=flat-square)]()

---

## 🌟 Overview

**Shelby Cortex** is a production-grade decentralized application (dApp) purpose-built for the **Shelby Protocol** ecosystem (co-developed by **Aptos Labs** and **Jump Crypto**). 

Unlike cold-tier storage solutions, Shelby delivers **sub-second global read latency** over a dedicated fiber backbone, coordinated by the **Aptos L1 blockchain**. Shelby Cortex unlocks this power with an autonomous AI agent memory pipeline, direct hot blob management, client-side encryption, real-time Reed-Solomon erasure coding visualization, and an interactive multi-language developer SDK studio.

**Zero Mock Policy:** All telemetry, cryptographic hashes, cost projections, and tool calling operations run on live Aptos testnet RPCs, Shelby testnet gateways, and native browser Web Crypto (`SubtleCrypto`).

---

## ✨ Core Modules

### 1. 📦 Shelby Hot Storage Orchestrator & Gateway
- **Native Browser Hashing**: Instant client-side SHA-256 computation via `crypto.subtle.digest`.
- **Client-Side Encryption**: Military-grade AES-256-GCM encryption with PBKDF2 key derivation.
- **Dynamic Reed-Solomon Erasure Coding**: Automatically computes $K$ Data Shards and $M$ Parity Shards based on payload size.
- **Direct Hot Gateway**: Instant stream and preview for images, audio, video, datasets, and code.
- **Cost Engine**: Real-time ShelbyUSD and APT gas fee projection based on retention periods.

### 2. 🤖 Shelby Sentinel (Autonomous AI Agent Engine)
- **Autonomous Tool Calling**:
  - `check_aptos_account`: Queries live Aptos account sequence numbers and APT balances.
  - `estimate_shelby_cost`: Computes ShelbyUSD storage fees and node redundancy factor.
  - `generate_sdk_snippet`: Generates ready-to-deploy TypeScript/Node.js/Python integration code.
  - `check_shelby_health`: Probes live Aptos & Shelby testnet RPC ping, TPS, and epoch.
  - `index_memory_blob`: Packages reasoning and conversation traces into retrievable hot blobs.
- **Live Tool Inspector**: Inspect JSON input parameters, live outputs, and execution latency in milliseconds.

### 3. ⚡ Fiber Telemetry & Erasure Simulator
- **Live Network Telemetry**: Real Aptos testnet block height, ledger version, epoch, and ping.
- **Interactive Shard Visualizer**: Visual simulation of 6 independent Shelby storage nodes ($K=4, M=2$). Click nodes to simulate network outage and observe real-time Vandermonde matrix reconstruction.

### 4. 🛠️ Developer Studio & S3 Gateway
- **Multi-Language SDK Matrix**: Ready-to-copy code for TypeScript Browser (`@shelby-protocol/sdk/browser`), TypeScript Node.js (`@shelby-protocol/sdk/node`), React (`@shelby-protocol/react`), Python, Rust, and cURL.
- **S3 Gateway Configuration**: Generates AWS SDK / rclone / Cyberduck configs for Shelby's S3-compatible hot gateway.
- **Ecosystem Launchpad**: Direct links to Shelby Docs, GitHub examples, and Aptos Testnet Faucets.

### 5. 🔑 Aptos Multi-Wallet & Dev Keypair Engine
- Support for **Petra, Pontem, Martian, Rise, OKX** wallets.
- **1-Click Ephemeral Dev Keypair**: Generates an instantaneous testnet account for rapid testing without requiring browser extensions.

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.x` or higher (recommended: Node.js `20+`)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/shelby-cortex.git
cd shelby-cortex

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Framework Preset: **Next.js**.
4. Click **Deploy**. No additional environment variables are required for standard testnet operation.

---

## 📚 Resources & Links

- **Shelby Official Documentation**: [https://docs.shelby.xyz/](https://docs.shelby.xyz/)
- **Shelby GitHub Examples**: [https://github.com/shelby/examples](https://github.com/shelby/examples)
- **Early Access & Developer Application**: [https://developers.shelby.xyz/apply](https://developers.shelby.xyz/apply)
- **Aptos Testnet Explorer**: [https://explorer.aptoslabs.com/?network=testnet](https://explorer.aptoslabs.com/?network=testnet)
- **Aptos Testnet Faucet**: [https://aptos.dev/network/faucet](https://aptos.dev/network/faucet)

---

## 📄 License
MIT License. Built for the Shelby Protocol and Aptos Community.
