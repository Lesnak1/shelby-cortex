'use client';

import React from 'react';
import {
  Sparkles,
  Cpu,
  Shield,
  Zap,
  Globe,
  Layers,
  Heart,
  CheckCircle2,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react';

export default function AboutView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} className="animate-fade-in">
      {/* Hero Header */}
      <div
        className="glass-panel cyber-frame"
        style={{
          padding: '40px',
          background: 'linear-gradient(135deg, var(--card-bg) 0%, var(--bg-secondary) 100%)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '820px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="badge badge-cyan">Ecosystem Innovation</span>
            <span className="badge badge-purple">Aptos Labs & Jump Crypto</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px', lineHeight: '1.2' }}>
            Pioneering Decentralized <span className="gradient-text-cyan">Hot Storage</span> for the Autonomous AI Era
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
            <strong>Shelby Cortex</strong> is an expert-tier application built for the Shelby Protocol ecosystem on the Aptos L1 blockchain. It bridges decentralized high-throughput object storage with autonomous AI agents, multi-language developer tooling, and real-time cryptographic verification.
          </p>
        </div>
      </div>

      {/* 4 Core Pillars Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(0, 242, 254, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--shelby-cyan)',
              marginBottom: '16px',
            }}
          >
            <Zap size={22} />
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>Sub-Second Read Latency</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Unlike archival decentralized storage networks, Shelby delivers sub-second (&lt;100ms) data retrieval over a dedicated global fiber backbone.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(157, 78, 221, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c77dff',
              marginBottom: '16px',
            }}
          >
            <Cpu size={22} />
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>Autonomous AI Agent Engine</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Shelby Sentinel operates live protocol tools, executes storage optimization heuristics, and writes long-term episodic memory blobs to Shelby hot tier.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(0, 230, 118, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--shelby-green)',
              marginBottom: '16px',
            }}
          >
            <Shield size={22} />
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>Zero Mock Architecture</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Every interaction is real: live Aptos testnet RPC queries, browser SubtleCrypto SHA-256 computation, and native Shelby hot gateway stream links.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(79, 172, 254, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4facfe',
              marginBottom: '16px',
            }}
          >
            <Globe size={22} />
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>S3 Drop-In Compatibility</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Seamlessly migrate legacy cloud infrastructure (AWS S3, Cloudflare R2, MinIO) to Shelby without altering your existing application logic.
          </p>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="glass-panel" style={{ padding: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '20px' }}>Ecosystem Roadmap</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'var(--input-bg)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
            <div style={{ fontSize: '12px', color: 'var(--shelby-cyan)', fontWeight: 700 }}>PHASE 1: LIVE TESTNET</div>
            <div style={{ fontSize: '15px', fontWeight: 700, margin: '6px 0' }}>Hot Storage & AI Memory</div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Full Aptos L1 smart contract orchestration, browser cryptographic erasure coding, and autonomous AI Sentinel agent integration.
            </p>
          </div>

          <div style={{ background: 'var(--input-bg)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '12px', color: '#c77dff', fontWeight: 700 }}>PHASE 2: INCENTIVIZED NODES</div>
            <div style={{ fontSize: '15px', fontWeight: 700, margin: '6px 0' }}>Read-Based Provider Rewards</div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Dynamic Proof-of-Retrievability challenges, bandwidth incentive settlement in shelbyUSD, and decentralized edge CDN caching.
            </p>
          </div>

          <div style={{ background: 'var(--input-bg)', padding: '18px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ fontSize: '12px', color: 'var(--shelby-green)', fontWeight: 700 }}>PHASE 3: MAINNET & CROSS-CHAIN</div>
            <div style={{ fontSize: '15px', fontWeight: 700, margin: '6px 0' }}>Derived Account Abstraction</div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Native integration with Ethereum and Solana wallets (DAA), enterprise multi-region clusters, and global AI inference streaming pipelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
