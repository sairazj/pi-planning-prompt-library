/**
 * Verify GitHub Copilot Extension request signatures.
 *
 * GitHub signs each request with an ECDSA signature using the public key
 * available at https://api.github.com/meta/public_keys/copilot_api.
 * In production, verify against the live public key.
 * In development, set SKIP_SIGNATURE_VERIFY=true to bypass.
 */

const crypto = require('crypto');

const GITHUB_KEYS_URI = 'https://api.github.com/meta/public_keys/copilot_api';

// Cache the public key to avoid fetching on every request
let cachedKey = null;
let keyFetchedAt = null;
const KEY_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

async function fetchGitHubPublicKey() {
  const now = Date.now();
  if (cachedKey && keyFetchedAt && now - keyFetchedAt < KEY_CACHE_TTL_MS) {
    return cachedKey;
  }

  const res = await fetch(GITHUB_KEYS_URI);
  if (!res.ok) throw new Error(`Failed to fetch GitHub public keys: ${res.status}`);
  const data = await res.json();
  cachedKey = data.public_keys.find((k) => k.is_current)?.key;
  keyFetchedAt = now;
  return cachedKey;
}

async function verifySignature(req, res, next) {
  // Skip in development if explicitly set
  if (process.env.SKIP_SIGNATURE_VERIFY === 'true') {
    return next();
  }

  const signature = req.headers['github-public-key-signature'];
  const keyId = req.headers['github-public-key-identifier'];

  if (!signature || !keyId) {
    return res.status(401).json({ error: 'Missing signature headers' });
  }

  try {
    const rawBody = JSON.stringify(req.body);
    const publicKey = await fetchGitHubPublicKey();

    if (!publicKey) {
      return res.status(500).json({ error: 'Could not fetch GitHub public key' });
    }

    const isValid = crypto.verify(
      'sha256',
      Buffer.from(rawBody),
      { key: publicKey, dsaEncoding: 'ieee-p1363' },
      Buffer.from(signature, 'base64')
    );

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    next();
  } catch (err) {
    console.error('Signature verification error:', err);
    return res.status(401).json({ error: 'Signature verification failed' });
  }
}

module.exports = { verifySignature };
