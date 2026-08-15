export interface ErasureConfig {
  dataShards: number; // e.g. 4
  parityShards: number; // e.g. 2
  totalShards: number; // dataShards + parityShards
  faultTolerance: number; // parityShards
  shardSizeFormatted: string;
}

export interface ShelbyBlob {
  id: string;
  blobName: string;
  accountAddress: string;
  sizeBytes: number;
  sizeFormatted: string;
  mimeType: string;
  category: 'image' | 'video' | 'audio' | 'document' | 'dataset' | 'code' | 'ai_memory' | 'other';
  sha256Hash: string;
  isEncrypted: boolean;
  encryptionAlgorithm?: string;
  expirationMicros: number;
  expirationDateString: string;
  createdAt: number;
  status: 'active' | 'syncing' | 'expired';
  erasureConfig: ErasureConfig;
  chunksCount: number;
  hotUrl: string;
  gatewayUrl: string;
  tags: string[];
  dataUrl?: string; // local cache / data uri for immediate rich preview
  textContent?: string; // cached text preview for documents/code/AI memory
}

export interface NetworkTelemetryData {
  chain_id: number;
  epoch: string;
  ledger_version: string;
  oldest_ledger_version: string;
  block_height: string;
  oldest_block_height: string;
  ledger_timestamp: string;
  node_role: string;
  aptosLatencyMs: number;
  shelbyLatencyMs: number;
  tpsEstimate: number;
  networkStatus: 'optimal' | 'degraded' | 'offline';
  shelbyEndpoint: string;
  aptosEndpoint: string;
}

export interface AgentToolCall {
  id: string;
  toolName: string;
  arguments: Record<string, any>;
  result?: any;
  status: 'running' | 'completed' | 'error';
  executionTimeMs?: number;
}

export interface AIAgentMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  toolCalls?: AgentToolCall[];
  reasoningSteps?: string[];
  attachedBlobId?: string;
  actionableBadge?: string;
}

export interface StorageCostEstimate {
  sizeBytes: number;
  sizeFormatted: string;
  durationDays: number;
  shelbyUsdCost: number; // formatted USD string
  shelbyUsdRaw: string;
  aptGasEstimate: string;
  dataShards: number;
  parityShards: number;
  totalNetworkBytes: number;
  totalNetworkBytesFormatted: string;
}

export interface AptosAccountInfo {
  address: string;
  publicKey?: string;
  privateKeyHex?: string; // only for dev-generated ephemeral accounts
  sequenceNumber: string;
  authenticationKey: string;
  aptBalance: string;
  aptBalanceFormatted: string;
  shelbyUsdBalance: string;
  isDevKeypair: boolean;
  connectedWalletName?: string;
}
