'use client';

import React, { useState } from 'react';
import { AptosAccountInfo } from '@/lib/types';
import {
  Code2,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  BookOpen,
  Zap,
  Server,
  Key,
  Shield,
  Layers,
  Sparkles,
  Bot,
  Globe,
  Radio,
} from 'lucide-react';

interface DeveloperStudioProps {
  account: AptosAccountInfo | null;
}

export default function DeveloperStudio({ account }: DeveloperStudioProps) {
  const [activeLang, setActiveLang] = useState<
    'mcp' | 'ts-browser' | 'ts-node' | 'react' | 'cross-chain' | 'python' | 'rust' | 'curl'
  >('mcp');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // S3 Config state
  const userAddress = account?.address || '0x1_your_aptos_address';

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getCodeSnippet = () => {
    switch (activeLang) {
      case 'mcp':
        return `// 🤖 Shelby Model Context Protocol (MCP) Server Configuration
// Add this to your Claude Desktop config (claude_desktop_config.json),
// Cursor (.cursor/mcp.json), or Antigravity / Gemini agents:

{
  "mcpServers": {
    "shelby-hot-storage": {
      "command": "npx",
      "args": ["-y", "@shelby-protocol/mcp-server@latest"],
      "env": {
        "SHELBY_NETWORK": "testnet",
        "SHELBY_GATEWAY_URL": "https://api.testnet.shelby.xyz/shelby/v1",
        "SHELBY_ACCOUNT_ADDRESS": "${userAddress}",
        "APTOS_FULLNODE_URL": "https://fullnode.testnet.aptoslabs.com/v1"
      }
    }
  }
}

// Live JSON-RPC 2.0 Endpoint hosted on Shelby Cortex:
// POST https://shelby-cortex.vercel.app/api/mcp
// Tools: shelby_get_blob, shelby_calculate_shards, shelby_inscribe_agent_memory, shelby_verify_read_proof`;

      case 'cross-chain':
        return `// 🌐 Cross-Chain Derived Storage (Ethereum / Solana / Aptos)
// Shelby supports "Any chain. Any stack. Even no chain."

import { ShelbyCrossChain } from "@shelby-protocol/sdk/cross-chain";
import { ethers } from "ethers";

// 1. Derive Shelby Storage Vault from an Ethereum / EVM Wallet
export async function deriveStorageFromEVM(ethereumSigner: ethers.Signer) {
  const evmAddress = await ethereumSigner.getAddress();
  
  // Derives deterministic Aptos Move storage address via EIP-712 signature
  const storageAccount = await ShelbyCrossChain.deriveAccountFromEVM({
    signer: ethereumSigner,
    message: "Shelby Protocol Hot Storage Vault Authorization",
  });

  console.log("Derived Aptos Storage Address:", storageAccount.shelbyAddress);
  return storageAccount;
}

// 2. Derive Shelby Storage Vault from Solana (Ed25519)
export async function deriveStorageFromSolana(solanaKeypair: any) {
  const storageAccount = await ShelbyCrossChain.deriveAccountFromSolana({
    publicKey: solanaKeypair.publicKey.toBase58(),
    signatureCallback: (msg) => solanaKeypair.sign(msg),
  });
  
  return storageAccount;
}`;

      case 'ts-browser':
        return `// 1. Install packages:
// npm install @shelby-protocol/sdk @aptos-labs/ts-sdk

import { ShelbyClient } from '@shelby-protocol/sdk/browser';
import { Network } from '@aptos-labs/ts-sdk';

// 2. Initialize the Shelby Client with Jump HPC & Doublezero Fiber routing
const shelby = new ShelbyClient({
  network: Network.TESTNET,
  gateway: "https://api.testnet.shelby.xyz/shelby/v1",
  fiberBackbone: "doublezero-global",
});

// 3. Upload GenAI Dataset or AI model weights with sub-second retrieval guarantees
export async function uploadDataset(file: File, aptosAccount: any) {
  const expirationMicros = (Date.now() + 30 * 24 * 60 * 60 * 1000) * 1000; // 30 days
  
  const blob = await shelby.upload({
    account: aptosAccount,
    blobData: await file.arrayBuffer(),
    blobName: file.name,
    expirationMicros,
    erasureScheme: "reed-solomon-auto", // K=10, M=4 for >50MB
  });

  console.log("⚡ Blob successfully stored:", blob);
  return blob;
}`;

      case 'ts-node':
        return `// 1. Install packages:
// npm install @shelby-protocol/sdk @aptos-labs/ts-sdk

import { ShelbyNodeClient } from "@shelby-protocol/sdk/node";
import { Network, Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk";
import fs from "fs/promises";

async function main() {
  const shelby = new ShelbyNodeClient({
    network: Network.TESTNET,
    fiberNetwork: "doublezero",
  });

  // Load Aptos private key
  const privateKey = new Ed25519PrivateKey(process.env.APTOS_PRIVATE_KEY!);
  const account = Account.fromPrivateKey({ privateKey });

  const buffer = await fs.readFile("./ai_model_weights.bin");
  const expirationMicros = (Date.now() + 90 * 24 * 60 * 60 * 1000) * 1000;

  console.log("🚀 Inscribing to Shelby Hot Tier network via Jump HPC stack...");
  const uploadResult = await shelby.upload({
    account,
    blobData: buffer,
    blobName: "ai_model_weights.bin",
    expirationMicros,
  });

  console.log("✅ Inscribed! Hot Gateway URL:", uploadResult);
}

main();`;

      case 'react':
        return `import React, { useState } from 'react';
import { ShelbyClient } from '@shelby-protocol/sdk/browser';
import { Network } from '@aptos-labs/ts-sdk';

export function ShelbyHotUploader() {
  const [uploading, setUploading] = useState(false);
  const [hotUrl, setHotUrl] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const shelby = new ShelbyClient({ network: Network.TESTNET });
      const result = await shelby.upload({
        account: (window as any).aptos,
        blobData: await file.arrayBuffer(),
        blobName: file.name,
        expirationMicros: (Date.now() + 30 * 86400000) * 1000,
      });
      setHotUrl(result.hotUrl);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} disabled={uploading} />
      {uploading && <p>⚡ Inscribing to Shelby Hot Tier...</p>}
      {hotUrl && <a href={hotUrl} target="_blank">View Hot Blob</a>}
    </div>
  );
}`;

      case 'python':
        return `# pip install requests aptos-sdk

import requests
import time

SHELBY_RPC = "https://api.testnet.shelby.xyz/shelby/v1"
ACCOUNT_ADDR = "${userAddress}"
BLOB_NAME = "dataset_vector_index.parquet"

def get_hot_blob():
    url = f"{SHELBY_RPC}/blobs/{ACCOUNT_ADDR}/{BLOB_NAME}"
    start_time = time.time()
    
    # Sub-second read from Doublezero fiber network
    response = requests.get(url, headers={"Accept": "application/octet-stream"})
    elapsed_ms = (time.time() - start_time) * 1000
    
    if response.status_code == 200:
        # Cryptographic Proof of Retrievability (PoR) verification header
        por_signature = response.headers.get("X-Shelby-Proof-Of-Read")
        print(f"⚡ Sub-second read successful! Latency: {elapsed_ms:.1f}ms | PoR: {por_signature}")
        with open(BLOB_NAME, "wb") as f:
            f.write(response.content)
    else:
        print("Error:", response.status_code, response.text)

if __name__ == "__main__":
    get_hot_blob()`;

      case 'rust':
        return `// Cargo.toml:
// [dependencies]
// reqwest = { version = "0.11", features = ["json", "stream"] }
// tokio = { version = "1", features = ["full"] }

use std::time::Instant;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = reqwest::Client::new();
    let url = "https://api.testnet.shelby.xyz/shelby/v1/blobs/${userAddress}/ai_weights.bin";

    let start = Instant::now();
    let resp = client.get(url).send().await?;
    
    let duration = start.elapsed();
    let por_header = resp.headers().get("x-shelby-proof-of-read");
    
    println!("⚡ Shelby Hot Stream Verified! Latency: {:?} (PoR Header: {:?})", duration, por_header);

    let bytes = resp.bytes().await?;
    println!("📦 Streamed Bytes Received: {}", bytes.len());

    Ok(())
}`;

      case 'curl':
        return `# 1. Retrieve Blob Metadata & Proof-of-Read Header:
curl -X GET "https://api.testnet.shelby.xyz/shelby/v1/blobs/${userAddress}/my_file.json" \\
     -H "Accept: application/json" -i

# 2. Direct Binary Stream Download:
curl -X GET "https://api.testnet.shelby.xyz/shelby/v1/blobs/${userAddress}/my_file.json" \\
     --output "downloaded_file.json"

# 3. Model Context Protocol (MCP) JSON-RPC Query:
curl -X POST "https://shelby-cortex.vercel.app/api/mcp" \\
     -H "Content-Type: application/json" \\
     -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`;
    }
  };

  const getS3Config = () => {
    return `[shelby-hot-storage]
type = s3
provider = Shelby
endpoint = https://api.testnet.shelby.xyz/s3/v1
access_key_id = ${userAddress}
secret_access_key = YOUR_SHELBY_SECRET_KEY
region = doublezero-global-fiber
acl = public-read
storage_class = HOT_FIBER_TIER`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }} className="animate-fade-in">
      {/* Header */}
      <div
        className="glass-panel cyber-frame"
        style={{
          padding: '28px',
          background: 'linear-gradient(135deg, var(--card-bg) 0%, var(--bg-secondary) 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="badge badge-cyan">Developer Hub</span>
          <span className="badge badge-purple">Shelby MCP Server & AI Skills</span>
          <span className="badge badge-green">Cross-Chain (Aptos / EVM / Solana)</span>
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px' }}>
          Shelby Protocol <span className="gradient-text-cyan">Developer Studio & MCP Matrix</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '780px', lineHeight: '1.6' }}>
          Integrate the Shelby Hot Storage network into AI agents, Claude/Cursor, and cross-chain dApps. Production-ready SDK snippets for TypeScript, React, Python, Rust, Cross-Chain, and Model Context Protocol (MCP).
        </p>
      </div>

      {/* Code Generator & SDK Matrix */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code2 size={18} color="var(--shelby-cyan)" />
            <h2 style={{ fontSize: '16px', fontWeight: 700 }}>SDK & MCP Tooling Integration</h2>
          </div>

          {/* Language selector pills */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { id: 'mcp', label: '🤖 Shelby MCP Server' },
              { id: 'cross-chain', label: '🌐 Cross-Chain (EVM/Solana)' },
              { id: 'ts-browser', label: 'TS Browser' },
              { id: 'ts-node', label: 'TS Node.js' },
              { id: 'react', label: 'React' },
              { id: 'python', label: 'Python' },
              { id: 'rust', label: 'Rust' },
              { id: 'curl', label: 'cURL & MCP' },
            ].map(lang => (
              <button
                key={lang.id}
                onClick={() => setActiveLang(lang.id as any)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: 'none',
                  backgroundColor: activeLang === lang.id ? 'var(--card-border-hover)' : 'var(--input-bg)',
                  color: activeLang === lang.id ? 'var(--shelby-cyan)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Code Box */}
        <div style={{ position: 'relative' }}>
          <pre
            style={{
              backgroundColor: 'var(--code-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '12px',
              padding: '20px',
              color: 'var(--shelby-cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: '1.6',
              overflowX: 'auto',
              maxHeight: '440px',
            }}
          >
            {getCodeSnippet()}
          </pre>

          <button
            onClick={() => handleCopy(getCodeSnippet(), 'sdk_code')}
            className="btn-secondary"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              padding: '6px 12px',
              fontSize: '12px',
            }}
          >
            {copiedKey === 'sdk_code' ? <Check size={14} /> : <Copy size={14} />}
            <span>{copiedKey === 'sdk_code' ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      {/* S3 Gateway & Ecosystem Links Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="studio-bottom-grid">
        {/* S3 Compatibility Generator */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Server size={18} color="#4facfe" />
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>S3 Gateway Compatibility Config</h3>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: '1.5' }}>
            Shelby is drop-in compatible with standard AWS S3 APIs. Use the following configuration with rclone, Cyberduck, or AWS SDK:
          </p>

          <div style={{ position: 'relative' }}>
            <pre
              style={{
                backgroundColor: 'var(--code-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '10px',
                padding: '16px',
                color: '#4facfe',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                lineHeight: '1.5',
                overflowX: 'auto',
              }}
            >
              {getS3Config()}
            </pre>

            <button
              onClick={() => handleCopy(getS3Config(), 's3_config')}
              className="btn-ghost"
              style={{ position: 'absolute', top: '8px', right: '8px', padding: '6px' }}
            >
              {copiedKey === 's3_config' ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* Official Ecosystem Quick Launch */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Sparkles size={18} color="var(--shelby-cyan)" />
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Official Shelby Ecosystem Resources</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="https://docs.shelby.xyz/"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ justifyContent: 'space-between', padding: '12px 16px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <BookOpen size={16} color="var(--shelby-cyan)" />
                  <span>Official Shelby Documentation</span>
                </div>
                <ExternalLink size={14} />
              </a>

              <a
                href="https://github.com/shelby/examples"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ justifyContent: 'space-between', padding: '12px 16px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Code2 size={16} color="var(--shelby-purple)" />
                  <span>Shelby GitHub Examples (Turborepo)</span>
                </div>
                <ExternalLink size={14} />
              </a>

              <a
                href="https://developers.shelby.xyz/apply"
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
                style={{ justifyContent: 'space-between', padding: '12px 16px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Zap size={16} color="var(--shelby-green)" />
                  <span>Early Access & ShelbyUSD Grant Application</span>
                </div>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '16px' }}>
            Shelby is co-developed by Aptos Labs & Jump Crypto, routed over Doublezero global fiber backbone.
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.studio-bottom-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
