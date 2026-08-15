import { ErasureConfig, ShelbyBlob, StorageCostEstimate } from './types';

export const SHELBY_TESTNET_BASE_URL = 'https://api.testnet.shelby.xyz/shelby/v1';
export const APTOS_TESTNET_RPC = 'https://fullnode.testnet.aptoslabs.com/v1';

/**
 * Format bytes into human readable format (KB, MB, GB)
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Compute SHA-256 hash using browser native Web Crypto API
 */
export async function computeSHA256(data: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Calculate Reed-Solomon Erasure Coding parameters based on blob size
 */
export function calculateErasureCoding(sizeBytes: number): ErasureConfig {
  let dataShards = 4;
  let parityShards = 2;

  if (sizeBytes > 50 * 1024 * 1024) {
    // Large files > 50MB
    dataShards = 10;
    parityShards = 4;
  } else if (sizeBytes > 10 * 1024 * 1024) {
    // Medium files > 10MB
    dataShards = 6;
    parityShards = 3;
  } else if (sizeBytes < 64 * 1024) {
    // Tiny files < 64KB
    dataShards = 2;
    parityShards = 1;
  }

  const totalShards = dataShards + parityShards;
  const shardSizeBytes = Math.ceil(sizeBytes / dataShards);

  return {
    dataShards,
    parityShards,
    totalShards,
    faultTolerance: parityShards,
    shardSizeFormatted: formatBytes(shardSizeBytes),
  };
}

/**
 * Categorize MIME type into high-level category
 */
export function categorizeMime(mime: string, filename: string): ShelbyBlob['category'] {
  const lower = (mime || '').toLowerCase();
  const ext = (filename || '').split('.').pop()?.toLowerCase() || '';

  if (lower.startsWith('image/') || ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'].includes(ext)) {
    return 'image';
  }
  if (lower.startsWith('video/') || ['mp4', 'webm', 'mov', 'mkv', 'avi'].includes(ext)) {
    return 'video';
  }
  if (lower.startsWith('audio/') || ['mp3', 'wav', 'ogg', 'm4a', 'flac'].includes(ext)) {
    return 'audio';
  }
  if (lower.includes('json') || ['json', 'csv', 'parquet', 'arrow', 'npy', 'h5'].includes(ext)) {
    return 'dataset';
  }
  if (['ts', 'tsx', 'js', 'jsx', 'move', 'rs', 'py', 'sol', 'cpp', 'c', 'go', 'html', 'css'].includes(ext)) {
    return 'code';
  }
  if (ext === 'agentmem' || filename.includes('memory') || lower.includes('ai-memory')) {
    return 'ai_memory';
  }
  if (
    lower.includes('pdf') ||
    lower.includes('document') ||
    lower.includes('text') ||
    ['pdf', 'txt', 'md', 'doc', 'docx'].includes(ext)
  ) {
    return 'document';
  }

  return 'other';
}

/**
 * Calculate ShelbyUSD and APT gas cost for hot storage retention
 */
export function estimateStorageCost(sizeBytes: number, durationDays = 30): StorageCostEstimate {
  const erasure = calculateErasureCoding(sizeBytes);
  const redundancyMultiplier = (erasure.dataShards + erasure.parityShards) / erasure.dataShards;
  const totalNetworkBytes = sizeBytes * redundancyMultiplier;

  // Shelby economics: ~$0.0035 per GB per month on decentralized hot tier + network overhead
  const gigabytes = totalNetworkBytes / (1024 * 1024 * 1024);
  const monthlyRatePerGb = 0.0042; // in ShelbyUSD
  const baseCost = gigabytes * monthlyRatePerGb * (durationDays / 30);
  // Base protocol minimum fee per blob write = 0.0001 ShelbyUSD
  const totalShelbyUsd = Math.max(0.0001, parseFloat(baseCost.toFixed(6)));

  // Aptos L1 Gas calculation: metadata inscription (~1200 gas units @ 100 octas)
  const aptGasUnits = 0.00025 + (sizeBytes > 1024 * 1024 ? 0.0001 : 0);

  return {
    sizeBytes,
    sizeFormatted: formatBytes(sizeBytes),
    durationDays,
    shelbyUsdCost: totalShelbyUsd,
    shelbyUsdRaw: totalShelbyUsd.toFixed(6),
    aptGasEstimate: aptGasUnits.toFixed(6) + ' APT',
    dataShards: erasure.dataShards,
    parityShards: erasure.parityShards,
    totalNetworkBytes,
    totalNetworkBytesFormatted: formatBytes(totalNetworkBytes),
  };
}

/**
 * Encrypt data in browser using AES-GCM (256-bit key derived via PBKDF2)
 */
export async function encryptData(
  plainBuffer: ArrayBuffer,
  passphrase: string
): Promise<{ encryptedBuffer: ArrayBuffer; saltHex: string; ivHex: string }> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    plainBuffer
  );

  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');

  return { encryptedBuffer, saltHex, ivHex };
}

/**
 * Decrypt data in browser using AES-GCM
 */
export async function decryptData(
  encryptedBuffer: ArrayBuffer,
  passphrase: string,
  saltHex: string,
  ivHex: string
): Promise<ArrayBuffer> {
  const salt = new Uint8Array(saltHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  const iv = new Uint8Array(ivHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));

  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  return await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    encryptedBuffer
  );
}

/**
 * Get direct Shelby hot storage gateway streaming URL
 */
export function getShelbyHotUrl(accountAddress: string, blobName: string): string {
  const cleanAddr = accountAddress.startsWith('0x') ? accountAddress : `0x${accountAddress}`;
  const cleanName = encodeURIComponent(blobName.replace(/^\/+/, ''));
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api/blobs/${cleanAddr}/${cleanName}`;
  }
  return `https://shelby-cortex.vercel.app/api/blobs/${cleanAddr}/${cleanName}`;
}

/**
 * Get on-chain Move testnet canonical resource URI
 */
export function getCanonicalShelbyUri(accountAddress: string, blobName: string): string {
  const cleanAddr = accountAddress.startsWith('0x') ? accountAddress : `0x${accountAddress}`;
  const cleanName = encodeURIComponent(blobName.replace(/^\/+/, ''));
  return `https://api.testnet.shelby.xyz/shelby/v1/blobs/${cleanAddr}/${cleanName}`;
}
