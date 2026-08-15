import { ShelbyBlob, AIAgentMessage } from './types';

const BLOBS_STORAGE_KEY = 'shelby_cortex_blobs_v1';
const AGENT_MESSAGES_KEY = 'shelby_cortex_agent_msgs_v1';

/**
 * Get all stored blobs
 */
export function getStoredBlobs(): ShelbyBlob[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BLOBS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read stored blobs:', err);
    return [];
  }
}

/**
 * Save a new blob or update existing blob
 */
export function saveBlob(blob: ShelbyBlob): void {
  if (typeof window === 'undefined') return;
  try {
    const blobs = getStoredBlobs();
    const existingIndex = blobs.findIndex(b => b.id === blob.id || (b.blobName === blob.blobName && b.accountAddress === blob.accountAddress));
    
    if (existingIndex >= 0) {
      blobs[existingIndex] = blob;
    } else {
      blobs.unshift(blob);
    }
    
    localStorage.setItem(BLOBS_STORAGE_KEY, JSON.stringify(blobs));
  } catch (err) {
    console.error('Failed to save blob:', err);
  }
}

/**
 * Delete a blob from storage
 */
export function deleteStoredBlob(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const blobs = getStoredBlobs().filter(b => b.id !== id);
    localStorage.setItem(BLOBS_STORAGE_KEY, JSON.stringify(blobs));
  } catch (err) {
    console.error('Failed to delete blob:', err);
  }
}

/**
 * Get stored AI Agent messages
 */
export function getStoredAgentMessages(): AIAgentMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(AGENT_MESSAGES_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read agent messages:', err);
    return [];
  }
}

/**
 * Save AI Agent messages
 */
export function saveStoredAgentMessages(messages: AIAgentMessage[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(AGENT_MESSAGES_KEY, JSON.stringify(messages));
  } catch (err) {
    console.error('Failed to save agent messages:', err);
  }
}
