'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FiberCanvas from '@/components/FiberCanvas';
import StorageManager from '@/components/StorageManager';
import AIAgent from '@/components/AIAgent';
import NetworkTelemetry from '@/components/NetworkTelemetry';
import DeveloperStudio from '@/components/DeveloperStudio';
import DocsView from '@/components/DocsView';
import AboutView from '@/components/AboutView';
import WalletModal from '@/components/WalletModal';
import { AptosAccountInfo, NetworkTelemetryData } from '@/lib/types';
import { fetchLiveAptosLedgerInfo, generateEphemeralAptosKeypair } from '@/lib/aptos';
import { ShieldCheck, Globe, ExternalLink, Zap, Cpu, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'storage' | 'agent' | 'telemetry' | 'studio' | 'docs' | 'about'>('storage');
  const [account, setAccount] = useState<AptosAccountInfo | null>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [telemetry, setTelemetry] = useState<NetworkTelemetryData | null>(null);

  // Initialize with a default ephemeral Aptos Dev Account if none is present in local storage
  useEffect(() => {
    try {
      const savedAcc = localStorage.getItem('shelby_cortex_account_v1');
      if (savedAcc) {
        setAccount(JSON.parse(savedAcc));
      } else {
        const kp = generateEphemeralAptosKeypair();
        const initialAcc: AptosAccountInfo = {
          address: kp.address,
          publicKey: kp.publicKey,
          privateKeyHex: kp.privateKeyHex,
          sequenceNumber: '0',
          authenticationKey: kp.address,
          aptBalance: '1000000000',
          aptBalanceFormatted: '10.0000 APT',
          shelbyUsdBalance: '50.0000 ShelbyUSD',
          isDevKeypair: true,
          connectedWalletName: 'Shelby Dev Ephemeral Keypair',
        };
        setAccount(initialAcc);
        localStorage.setItem('shelby_cortex_account_v1', JSON.stringify(initialAcc));
      }
    } catch (e) {
      console.error(e);
    }

    // Fetch initial live telemetry
    fetchLiveAptosLedgerInfo().then(data => setTelemetry(data)).catch(console.error);
  }, []);

  const handleSelectAccount = (acc: AptosAccountInfo) => {
    setAccount(acc);
    try {
      localStorage.setItem('shelby_cortex_account_v1', JSON.stringify(acc));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Dynamic Animated Fiber Background Canvas */}
      <FiberCanvas />

      {/* Main Navbar with Theme Switcher & Wallet Connector */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        account={account}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
        telemetry={telemetry}
      />

      {/* Main Content Area */}
      <div className="app-container" style={{ flex: 1, marginTop: '24px', zIndex: 1, position: 'relative' }}>
        {activeTab === 'storage' && (
          <StorageManager
            account={account}
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
          />
        )}

        {activeTab === 'agent' && (
          <AIAgent
            account={account}
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
          />
        )}

        {activeTab === 'telemetry' && (
          <NetworkTelemetry
            initialTelemetry={telemetry}
            onTelemetryUpdate={setTelemetry}
          />
        )}

        {activeTab === 'studio' && (
          <DeveloperStudio account={account} />
        )}

        {activeTab === 'docs' && (
          <DocsView />
        )}

        {activeTab === 'about' && (
          <AboutView />
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--card-border)',
          backgroundColor: 'var(--card-bg)',
          backdropFilter: 'blur(16px)',
          padding: '24px 20px',
          marginTop: '40px',
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #00f2fe, #9d4edd)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#06080f',
              }}
            >
              <Cpu size={16} />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>
                Shelby Cortex <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>v1.0 Production</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Powered by Aptos L1 & Jump Crypto Fiber Backbone
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('docs')}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '12px' }}
            >
              Documentation
            </button>
            <button
              onClick={() => setActiveTab('about')}
              style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '12px' }}
            >
              About
            </button>
            <a
              href="https://explorer.shelby.xyz/shelbynet"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--shelby-cyan)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
            >
              Shelbynet Explorer <ExternalLink size={12} />
            </a>
            <a
              href="https://docs.shelby.xyz/"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Docs <ExternalLink size={12} />
            </a>
            <a
              href="https://github.com/shelby/shelby-quickstart"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Quickstart <ExternalLink size={12} />
            </a>
            <a
              href="https://x.com/shelbyserves"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              @shelbyserves <ExternalLink size={12} />
            </a>
            <a
              href="https://developers.shelby.xyz/"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--shelby-green)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}
            >
              Apply for Production <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </footer>

      {/* Wallet Connection Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        account={account}
        onSelectAccount={handleSelectAccount}
      />
    </main>
  );
}
