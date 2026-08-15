'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AIAgentMessage, AptosAccountInfo, AgentToolCall } from '@/lib/types';
import { getStoredAgentMessages, saveStoredAgentMessages, getStoredBlobs, saveBlob } from '@/lib/storage';
import {
  Bot,
  User,
  Send,
  Sparkles,
  Zap,
  DollarSign,
  Code2,
  Activity,
  Brain,
  CheckCircle2,
  Clock,
  Terminal,
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
  Shield,
  Layers,
} from 'lucide-react';

interface AIAgentProps {
  account: AptosAccountInfo | null;
  onOpenWalletModal: () => void;
}

export default function AIAgent({ account, onOpenWalletModal }: AIAgentProps) {
  const [messages, setMessages] = useState<AIAgentMessage[]>([]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedToolTrace, setSelectedToolTrace] = useState<AgentToolCall | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initial welcome message and load history
  useEffect(() => {
    const stored = getStoredAgentMessages();
    if (stored.length > 0) {
      setMessages(stored);
    } else {
      const initialWelcome: AIAgentMessage = {
        id: 'msg_welcome',
        role: 'assistant',
        content: `Hello! I am **Shelby Sentinel**, an autonomous AI Storage Agent engineered for the **Shelby Protocol** & **Aptos L1** ecosystem.

**Autonomous Protocol Capabilities:**
- 🔍 **Aptos & Shelby Account Analysis:** Audit live testnet gas balances, sequence numbers, and storage quotas.
- 💰 **Reed-Solomon & Cost Optimization:** Project shard distributions, fault tolerances, and monthly ShelbyUSD costs.
- ⚡ **SDK Synthesis:** Generate ready-to-deploy code for Node.js, Browser, React, Python, Rust, or cURL.
- 🧠 **AI Memory Vault:** Automatically inscribe conversation reasoning and dataset schemas to Shelby Hot Tier memory blobs.
- 🛡️ **Network Telemetry Audit:** Monitor real-time block heights, epoch intervals, and sub-second fiber gateway latencies.

Select a quick command below or type your instruction:`,
        timestamp: Date.now(),
        actionableBadge: 'Agent Initialized',
      };
      setMessages([initialWelcome]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (promptText?: string) => {
    const textToSend = promptText || inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: AIAgentMessage = {
      id: 'msg_' + Date.now().toString(36),
      role: 'user',
      content: textToSend,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const blobs = getStoredBlobs();
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          accountAddress: account ? account.address : '0x1',
          contextBlobs: blobs.slice(0, 5),
        }),
      });

      if (!res.ok) {
        throw new Error(`Agent response error: ${res.statusText}`);
      }

      const agentData = await res.json();
      const assistantMsg: AIAgentMessage = {
        id: 'msg_' + Date.now().toString(36),
        role: 'assistant',
        content: agentData.content,
        timestamp: agentData.timestamp || Date.now(),
        toolCalls: agentData.toolCalls || [],
        reasoningSteps: agentData.reasoningSteps || [],
        actionableBadge: agentData.actionableBadge,
      };

      const updated = [...newMessages, assistantMsg];
      setMessages(updated);
      saveStoredAgentMessages(updated);
    } catch (err: any) {
      console.error('Agent error:', err);
      const errorMsg: AIAgentMessage = {
        id: 'msg_err_' + Date.now().toString(36),
        role: 'assistant',
        content: `Error processing request: ${err.message || 'Unknown error'}. Please retry.`,
        timestamp: Date.now(),
        actionableBadge: 'Execution Failed',
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = [
    { label: '🔍 Audit Wallet & ShelbyUSD Quota', prompt: 'Audit my Aptos testnet wallet balance and ShelbyUSD storage quota' },
    { label: '💰 Project 500 MB AI Weights Cost', prompt: 'Calculate the 30-day ShelbyUSD storage cost and Reed-Solomon shard distribution for a 500 MB AI model weight file' },
    { label: '⚡ Synthesize TypeScript SDK Snippet', prompt: 'Generate a TypeScript SDK code snippet using @shelby-protocol/sdk to upload and retrieve blobs with sub-second latency' },
    { label: '🛡️ Audit Shelby Network Telemetry', prompt: 'Check the real-time block height, TPS, and gateway latency for Shelby and Aptos testnet' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }} className="agent-grid animate-fade-in">
      {/* Main Chat Workspace */}
      <div
        className="glass-panel"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 160px)',
          minHeight: '600px',
          overflow: 'hidden',
          border: '1px solid var(--card-border)',
        }}
      >
        {/* Chat Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--card-border)',
            backgroundColor: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #00f2fe 0%, #9d4edd 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#06080f',
                boxShadow: 'var(--glow-cyan)',
              }}
            >
              <Bot size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: 700 }}>Shelby Sentinel</span>
                <span className="badge badge-cyan" style={{ fontSize: '10px', padding: '1px 6px' }}>
                  DeepSeek V4 Flash
                </span>
                <span className="badge badge-green" style={{ fontSize: '10px', padding: '1px 6px' }}>
                  Live API
                </span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Powered by DeepSeek V4 Flash • Aptos L1 Live Tool Executor
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear conversation history?')) {
                setMessages([]);
                localStorage.removeItem('shelby_cortex_agent_msgs_v1');
              }
            }}
            className="btn-ghost"
            style={{ fontSize: '12px' }}
          >
            Clear
          </button>
        </div>

        {/* Message Feed */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: msg.role === 'user' ? 'rgba(79, 172, 254, 0.2)' : 'rgba(0, 242, 254, 0.2)',
                  border: msg.role === 'user' ? '1px solid #4facfe' : '1px solid var(--shelby-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: msg.role === 'user' ? '#4facfe' : 'var(--shelby-cyan)',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>

              {/* Message Bubble */}
              <div
                style={{
                  maxWidth: '82%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    backgroundColor: msg.role === 'user' ? 'var(--card-border-hover)' : 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    fontSize: '13.5px',
                    lineHeight: '1.6',
                    color: 'var(--text-primary)',
                  }}
                >
                  {/* Action Badge */}
                  {msg.actionableBadge && (
                    <div style={{ marginBottom: '8px' }}>
                      <span className="badge badge-green" style={{ fontSize: '10px' }}>
                        <CheckCircle2 size={11} /> {msg.actionableBadge}
                      </span>
                    </div>
                  )}

                  {/* Message Content formatted */}
                  <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    {msg.content}
                  </div>
                </div>

                {/* Reasoning Steps if any */}
                {msg.reasoningSteps && msg.reasoningSteps.length > 0 && (
                  <div
                    style={{
                      background: 'var(--input-bg)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--card-border)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                    }}
                  >
                    <div style={{ fontWeight: 600, color: 'var(--shelby-purple)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Sparkles size={12} /> Autonomous Reasoning Trace:
                    </div>
                    {msg.reasoningSteps.map((step, sIdx) => (
                      <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '2px 0' }}>
                        <ChevronRight size={10} color="var(--shelby-cyan)" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Executed Tools if any */}
                {msg.toolCalls && msg.toolCalls.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {msg.toolCalls.map(tc => (
                      <button
                        key={tc.id}
                        onClick={() => setSelectedToolTrace(tc)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(0, 242, 254, 0.08)',
                          border: '1px solid var(--card-border)',
                          color: 'var(--shelby-cyan)',
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          cursor: 'pointer',
                        }}
                      >
                        <Terminal size={12} />
                        <span>tool:{tc.toolName}()</span>
                        <span style={{ color: 'var(--shelby-green)' }}>({tc.executionTimeMs}ms)</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(0, 242, 254, 0.2)',
                  border: '1px solid var(--shelby-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--shelby-cyan)',
                }}
              >
                <RefreshCw size={16} className="animate-spin" />
              </div>
              <div
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--shelby-cyan)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  fontSize: '13px',
                  color: 'var(--shelby-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Sparkles size={14} />
                <span>Executing protocol tools and synthesizing reasoning...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div
          style={{
            padding: '10px 16px',
            backgroundColor: 'var(--bg-secondary)',
            borderTop: '1px solid var(--card-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
          }}
        >
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp.prompt)}
              disabled={isLoading}
              style={{
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 600,
                backgroundColor: 'var(--input-bg)',
                border: '1px solid var(--card-border)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--shelby-cyan)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Prompt Input Form */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          style={{
            padding: '14px 16px',
            backgroundColor: 'var(--bg-secondary)',
            borderTop: '1px solid var(--card-border)',
            display: 'flex',
            gap: '10px',
          }}
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={e => setInputPrompt(e.target.value)}
            placeholder="Ask Shelby Sentinel or trigger autonomous storage operations..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '10px',
              backgroundColor: 'var(--input-bg)',
              border: '1px solid var(--card-border)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              outline: 'none',
            }}
          />

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="btn-primary"
            style={{ padding: '0 18px', borderRadius: '10px' }}
          >
            <Send size={16} />
            <span>Send</span>
          </button>
        </form>
      </div>

      {/* Right Column: AI Agent Memory Vault & Tool Trace Inspector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Tool Execution Inspector */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Terminal size={16} color="var(--shelby-cyan)" />
            <h3 style={{ fontSize: '14px', fontWeight: 700 }}>Live Tool Execution Trace</h3>
          </div>

          {selectedToolTrace ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge badge-cyan" style={{ fontFamily: 'var(--font-mono)' }}>
                  {selectedToolTrace.toolName}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--shelby-green)' }}>
                  {selectedToolTrace.executionTimeMs} ms
                </span>
              </div>

              <div style={{ background: 'var(--input-bg)', padding: '10px', borderRadius: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>INPUT ARGUMENTS:</div>
                <pre style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                  {JSON.stringify(selectedToolTrace.arguments, null, 2)}
                </pre>
              </div>

              <div style={{ background: 'var(--input-bg)', padding: '10px', borderRadius: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>OUTPUT JSON RESULT:</div>
                <pre style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--shelby-green)' }}>
                  {JSON.stringify(selectedToolTrace.result, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Click any <span style={{ color: 'var(--shelby-cyan)' }}>tool:name()</span> button in the message feed to inspect live JSON input/output traces and latency.
            </p>
          )}
        </div>

        {/* Agent Memory Vault */}
        <div className="glass-panel" style={{ padding: '20px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Brain size={16} color="var(--shelby-purple)" />
            <h3 style={{ fontSize: '14px', fontWeight: 700 }}>Shelby Memory Vault</h3>
          </div>

          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: '1.5' }}>
            Agent reasoning traces and dataset schemas are persisted to Shelby hot storage as retrievable JSON memory blobs.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ background: 'var(--input-bg)', padding: '10px', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--shelby-purple)', fontWeight: 600 }}>
                <span>ai_memory_session_active.json</span>
                <span className="badge badge-purple" style={{ fontSize: '9px', padding: '1px 4px' }}>Hot Indexed</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {messages.length} session turns & {messages.reduce((acc, m) => acc + (m.toolCalls?.length || 0), 0)} tool execution traces
              </div>
            </div>

            <div style={{ background: 'var(--input-bg)', padding: '10px', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-primary)', fontWeight: 600 }}>
                <span>shelby_vector_knowledge.bin</span>
                <span className="badge badge-green" style={{ fontSize: '9px', padding: '1px 4px' }}>Verified</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Shelby Protocol & Aptos Move technical embeddings
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.agent-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
