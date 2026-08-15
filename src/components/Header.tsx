'use client';

import React, { useState, useEffect } from 'react';
import { AptosAccountInfo, NetworkTelemetryData } from '@/lib/types';
import {
  HardDrive,
  Bot,
  Activity,
  Code2,
  Wallet,
  Menu,
  X,
  Globe,
  Sparkles,
  Shield,
  Cpu,
  BookOpen,
  Info,
  Sun,
  Moon,
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'storage' | 'agent' | 'telemetry' | 'studio' | 'docs' | 'about';
  onTabChange: (tab: 'storage' | 'agent' | 'telemetry' | 'studio' | 'docs' | 'about') => void;
  account: AptosAccountInfo | null;
  onOpenWalletModal: () => void;
  telemetry: NetworkTelemetryData | null;
}

export default function Header({
  activeTab,
  onTabChange,
  account,
  onOpenWalletModal,
  telemetry,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('shelby_cortex_theme') as 'dark' | 'light' | null;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('shelby_cortex_theme', nextTheme);
    } catch (e) {
      console.error(e);
    }
  };

  const navItems = [
    { id: 'storage', label: 'Hot Storage', icon: HardDrive, tag: 'S3 Hot Tier' },
    { id: 'agent', label: 'AI Sentinel', icon: Bot, tag: 'Autonomous' },
    { id: 'telemetry', label: 'Telemetry & RS', icon: Activity, tag: 'Sub-Sec' },
    { id: 'studio', label: 'Dev Studio', icon: Code2, tag: 'SDKs' },
    { id: 'docs', label: 'Docs', icon: BookOpen, tag: 'Technical' },
    { id: 'about', label: 'About', icon: Info, tag: 'Ecosystem' },
  ] as const;

  const handleNavClick = (id: 'storage' | 'agent' | 'telemetry' | 'studio' | 'docs' | 'about') => {
    onTabChange(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--card-bg)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--card-border)',
        padding: '0 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => onTabChange('storage')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 50%, #9d4edd 100%)',
              padding: '2px',
              boxShadow: 'var(--glow-cyan)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                backgroundColor: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--shelby-cyan)',
              }}
            >
              <Cpu size={22} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: 800, letterSpacing: '-0.03em' }}>
                SHELBY <span className="gradient-text-cyan">CORTEX</span>
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '10px', padding: '2px 8px' }}>
                Aptos L1 Hot Tier
              </span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Autonomous Storage & AI Agent Hub</span>
            </div>
          </div>
        </div>

        {/* Desktop Nav Tabs */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '4px',
            background: 'var(--bg-secondary)',
            padding: '5px',
            borderRadius: '14px',
            border: '1px solid var(--card-border)',
          }}
          className="desktop-nav"
        >
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  backgroundColor: isActive ? 'var(--card-border-hover)' : 'transparent',
                  color: isActive ? 'var(--shelby-cyan)' : 'var(--text-secondary)',
                  boxShadow: isActive ? 'var(--glow-cyan)' : 'none',
                }}
              >
                <Icon size={15} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Live Ping & Network Badge */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--card-border)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
            }}
            className="network-badge"
          >
            <span className="pulse-dot" />
            <span style={{ color: 'var(--text-primary)' }}>Aptos Testnet</span>
            <span style={{ color: 'var(--shelby-green)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
              {telemetry ? `${telemetry.aptosLatencyMs}ms` : '42ms'}
            </span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="btn-ghost"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              padding: '8px',
              borderRadius: '10px',
              color: 'var(--text-primary)',
              border: '1px solid var(--card-border)',
            }}
          >
            {theme === 'dark' ? <Sun size={18} color="#ffb703" /> : <Moon size={18} color="#0070f3" />}
          </button>

          {/* Wallet Button */}
          <button
            onClick={onOpenWalletModal}
            className="btn-primary"
            style={{
              padding: '8px 16px',
              fontSize: '13px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Wallet size={16} />
            {account ? (
              <span className="mono" style={{ fontSize: '12px' }}>
                {account.address.substring(0, 6)}...{account.address.substring(account.address.length - 4)}
              </span>
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-ghost mobile-menu-btn"
            style={{ padding: '8px', display: 'flex', color: 'var(--text-primary)' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--bg-secondary)',
            borderTop: '1px solid var(--card-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 600,
                  border: 'none',
                  backgroundColor: isActive ? 'var(--card-border-hover)' : 'transparent',
                  color: isActive ? 'var(--shelby-cyan)' : 'var(--text-primary)',
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                <span className="badge badge-cyan" style={{ fontSize: '10px' }}>
                  {item.tag}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <style jsx>{`
        @media (min-width: 980px) {
          :global(.desktop-nav) {
            display: flex !important;
          }
          :global(.network-badge) {
            display: flex !important;
          }
          :global(.mobile-menu-btn) {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
