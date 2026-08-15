'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Cpu,
  Layers,
  Shield,
  Zap,
  Server,
  Code2,
  FileCode,
  Terminal,
  ExternalLink,
  ChevronRight,
  Database,
  Lock,
  Brain,
  Activity,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';

export default function DocsView() {
  const [activeSection, setActiveSection] = useState<string>('architecture');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const docSections = [
    { id: 'architecture', label: 'Protocol Architecture', icon: Cpu },
    { id: 'erasure-coding', label: 'Reed-Solomon Erasure', icon: Layers },
    { id: 'hot-vs-cold', label: 'Hot vs. Cold Storage', icon: Zap },
    { id: 'ai-memory', label: 'AI Agent Memory Pipeline', icon: Brain },
    { id: 'cryptography', label: 'Client-Side Cryptography', icon: Lock },
    { id: 'sdk-reference', label: 'SDK & API Reference', icon: Terminal },
    { id: 's3-gateway', label: 'S3 Compatibility Gateway', icon: Server },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }} className="docs-grid animate-fade-in">
      {/* Left Sidebar Table of Contents */}
      <div className="glass-panel" style={{ padding: '20px', height: 'fit-content', position: 'sticky', top: '96px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <BookOpen size={18} color="var(--shelby-cyan)" />
          <h2 style={{ fontSize: '15px', fontWeight: 800 }}>Technical Docs</h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {docSections.map(s => {
            const Icon = s.icon;
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: 'none',
                  backgroundColor: isActive ? 'rgba(0, 242, 254, 0.15)' : 'transparent',
                  color: isActive ? 'var(--shelby-cyan)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={16} />
                <span>{s.label}</span>
              </button>
            );
          })}
        </nav>

        <div
          style={{
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '11px',
            color: 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <span>Official External Links:</span>
          <a
            href="https://docs.shelby.xyz/"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--shelby-cyan)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            docs.shelby.xyz <ExternalLink size={11} />
          </a>
          <a
            href="https://github.com/shelby/examples"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--shelby-purple)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            github.com/shelby/examples <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Right Content View */}
      <div className="glass-panel" style={{ padding: '36px' }}>
        {/* Section 1: Protocol Architecture */}
        {activeSection === 'architecture' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>Core Engineering</span>
              <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Shelby Protocol Architecture</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', lineHeight: '1.6' }}>
                Shelby is the first verifiable global object storage built for AI. Engineered with <strong>Jump&apos;s HPC-grade storage stack</strong>, <strong>Aptos L1</strong> for on-chain coordination and cryptographic verifiability, and <strong>Doublezero&apos;s dedicated global fiber network</strong> (30+ cities across 5 continents) ensuring sub-second delivery as a guarantee.
              </p>
            </div>

            <div style={{ background: 'var(--input-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: 'var(--shelby-cyan)' }}>
                Two-Tier Plane Separation
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="doc-two-col">
                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#4facfe', marginBottom: '6px' }}>
                    1. Control Plane (Aptos L1)
                  </div>
                  <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '18px' }}>
                    <li>Smart contract metadata registry & access control</li>
                    <li>Payment settlement in <code>shelbyUSD</code></li>
                    <li>Cryptographic Proof of Retrievability on every read</li>
                    <li>High-throughput parallel execution via Block-STM</li>
                  </ul>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--shelby-green)', marginBottom: '6px' }}>
                    2. Data Plane (Doublezero Fiber Network)
                  </div>
                  <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', paddingLeft: '18px' }}>
                    <li>Guaranteed sub-second global retrieval (&lt;100ms)</li>
                    <li>Dedicated fiber routing across 30+ cities & 5 continents</li>
                    <li>70%+ lower egress costs vs. centralized AWS S3</li>
                    <li>Reed-Solomon erasure sharding (zero multi-region replication overhead)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Why Aptos L1?</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Aptos provides sub-second transaction finality via the Block-STM parallel execution engine and Move smart contract safety. This allows Shelby to execute millions of micro-settlements and storage proofs per second with predictable, deterministic gas fees.
              </p>
            </div>
          </div>
        )}

        {/* Section 2: Reed-Solomon Erasure Coding */}
        {activeSection === 'erasure-coding' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span className="badge badge-purple" style={{ marginBottom: '8px' }}>Fault Tolerance</span>
              <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Reed-Solomon Erasure Coding ($K + M$)</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', lineHeight: '1.6' }}>
                Shelby eliminates the storage overhead of simple $3\times$ replication by utilizing mathematical <strong>Reed-Solomon Erasure Coding</strong> over Galois Fields $GF(2^8)$.
              </p>
            </div>

            <div style={{ background: 'var(--input-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px', color: '#c77dff' }}>
                The Sharding Formula
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '14px' }}>
                Any file of size $S$ is partitioned into $K$ data shards and encoded with $M$ parity shards using a Cauchy/Vandermonde generator matrix $G$:
              </p>
              <div style={{ background: 'var(--code-bg)', padding: '12px 16px', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--shelby-cyan)' }}>
                Payload Shards = K (Data) + M (Parity) | Redundancy = (K + M) / K
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }} className="doc-three-col">
              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Small Blobs (&lt;64 KB)</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--shelby-cyan)', margin: '4px 0' }}>K=2, M=1</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>3 Total Nodes • 1 Node Fault Tolerance</div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Standard Blobs (10 - 50 MB)</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#4facfe', margin: '4px 0' }}>K=4, M=2</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>6 Total Nodes • 2 Node Fault Tolerance</div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px', border: '1px solid var(--card-border)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Large AI Weights (&gt;50 MB)</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#c77dff', margin: '4px 0' }}>K=10, M=4</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>14 Total Nodes • 4 Node Fault Tolerance</div>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Hot vs. Cold Storage */}
        {activeSection === 'hot-vs-cold' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span className="badge badge-green" style={{ marginBottom: '8px' }}>Benchmark Matrix</span>
              <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Hot Storage vs. Cold Decentralized Networks</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', lineHeight: '1.6' }}>
                Traditional decentralized storage networks (Filecoin, Arweave) were designed as archival &quot;cold storage&quot;. Shelby is the first decentralized <strong>Hot Storage</strong> network engineered for real-time reads.
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '12px' }}>Metric</th>
                    <th style={{ padding: '12px', color: 'var(--shelby-cyan)' }}>⚡ Shelby Protocol</th>
                    <th style={{ padding: '12px' }}>AWS S3 Hot Tier</th>
                    <th style={{ padding: '12px' }}>Filecoin / Arweave</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>Read Latency</td>
                    <td style={{ padding: '12px', color: 'var(--shelby-green)', fontWeight: 700 }}>&lt;100 ms (Sub-Second)</td>
                    <td style={{ padding: '12px' }}>50 - 150 ms</td>
                    <td style={{ padding: '12px', color: 'var(--shelby-hot)' }}>5s - 30+ seconds</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>Egress / Download Fee</td>
                    <td style={{ padding: '12px', color: 'var(--shelby-green)', fontWeight: 700 }}>Zero Egress Penalties</td>
                    <td style={{ padding: '12px', color: 'var(--shelby-hot)' }}>$0.09 / GB (Expensive)</td>
                    <td style={{ padding: '12px' }}>Variable / Gateway Dependent</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>Decentralized Control</td>
                    <td style={{ padding: '12px', color: 'var(--shelby-cyan)', fontWeight: 700 }}>Aptos L1 Verified</td>
                    <td style={{ padding: '12px', color: 'var(--shelby-hot)' }}>Centralized (Amazon)</td>
                    <td style={{ padding: '12px' }}>Decentralized Archival</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', fontWeight: 600 }}>AI Inference & Streaming</td>
                    <td style={{ padding: '12px', color: 'var(--shelby-green)', fontWeight: 700 }}>Native Fiber Streaming</td>
                    <td style={{ padding: '12px' }}>Supported</td>
                    <td style={{ padding: '12px', color: 'var(--shelby-hot)' }}>Unsuitable (High Latency)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Section 4: AI Agent Memory Pipeline */}
        {activeSection === 'ai-memory' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span className="badge badge-purple" style={{ marginBottom: '8px' }}>Autonomous AI</span>
              <h1 style={{ fontSize: '26px', fontWeight: 800 }}>AI Agent Episodic Memory Pipeline</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', lineHeight: '1.6' }}>
                Shelby Cortex transforms Shelby Hot Storage into a permanent, verifiable <strong>Episodic Memory Vault</strong> for autonomous AI agents.
              </p>
            </div>

            <div style={{ background: 'var(--input-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '10px', color: '#c77dff' }}>
                How Shelby Sentinel Indexes Memory
              </h3>
              <ol style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.7', paddingLeft: '20px' }}>
                <li><strong>Context Extraction:</strong> User dialogues, tool execution traces, and dataset schemas are structured into JSON-LD chunks.</li>
                <li><strong>Cryptographic Hashing:</strong> Browser Web Crypto computes SHA-256 integrity proofs.</li>
                <li><strong>Hot Tier Inscription:</strong> The blob is uploaded to Shelby with sub-second retrieval tags for immediate dynamic vector lookups in subsequent agent turns.</li>
              </ol>
            </div>
          </div>
        )}

        {/* Section 5: Client-Side Cryptography */}
        {activeSection === 'cryptography' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>Privacy & Security</span>
              <h1 style={{ fontSize: '26px', fontWeight: 800 }}>Client-Side Zero-Knowledge Encryption</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', lineHeight: '1.6' }}>
                When client encryption is enabled, data is encrypted directly inside the browser using standard <strong>AES-256-GCM</strong> prior to transmission. Shelby storage providers only ever hold encrypted cipher fragments.
              </p>
            </div>

            <div style={{ background: 'var(--input-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--shelby-cyan)', marginBottom: '8px' }}>
                Encryption Pipeline:
              </div>
              <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
{`1. Passphrase + 16-byte Cryptographic Salt -> PBKDF2 (100,000 iterations, SHA-256)
2. 256-bit AES-GCM Key Derived
3. 12-byte Unique Initialization Vector (IV) Generated
4. ArrayBuffer encrypted -> [Ciphertext + 128-bit Authentication Tag]`}
              </pre>
            </div>
          </div>
        )}

        {/* Section 6: SDK Reference */}
        {activeSection === 'sdk-reference' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>Code Integration</span>
              <h1 style={{ fontSize: '26px', fontWeight: 800 }}>TypeScript SDK Quickstart</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', lineHeight: '1.6' }}>
                Install the official packages and start storing blobs in 3 lines of code:
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <pre
                style={{
                  backgroundColor: 'var(--code-bg)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '20px',
                  color: 'var(--shelby-cyan)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  overflowX: 'auto',
                }}
              >
{`npm install @shelby-protocol/sdk @aptos-labs/ts-sdk

import { ShelbyClient } from '@shelby-protocol/sdk/browser';
import { Network } from '@aptos-labs/ts-sdk';

const client = new ShelbyClient({ network: Network.TESTNET });

// Upload blob
await client.upload({
  account: walletAccount,
  blobData: buffer,
  blobName: "ai_model_index.json",
  expirationMicros: (Date.now() + 30 * 86400000) * 1000
});`}
              </pre>
            </div>
          </div>
        )}

        {/* Section 7: S3 Gateway */}
        {activeSection === 's3-gateway' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>S3 Compatibility</span>
              <h1 style={{ fontSize: '26px', fontWeight: 800 }}>S3-Compatible Gateway Configuration</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px', lineHeight: '1.6' }}>
                Migrate seamlessly from AWS S3, MinIO, or Cloudflare R2 by simply changing your S3 endpoint URL to the Shelby Hot Storage Gateway.
              </p>
            </div>

            <div style={{ background: 'var(--input-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#4facfe', marginBottom: '8px' }}>
                S3 Endpoint Details:
              </div>
              <ul style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.7', paddingLeft: '20px' }}>
                <li><strong>Endpoint:</strong> <code>https://api.testnet.shelby.xyz/s3/v1</code></li>
                <li><strong>Region:</strong> <code>shelby-global-fiber</code></li>
                <li><strong>Auth:</strong> Signature Version 4 (AWS SigV4) with Aptos Account Address</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.docs-grid) {
            grid-template-columns: 1fr !important;
          }
          :global(.doc-two-col), :global(.doc-three-col) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
