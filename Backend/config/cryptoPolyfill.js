/**
 * Polyfill global crypto for Node.js environments (< v19/20)
 * Mongoose v8/v9 and MongoDB driver v6/v7 use WebCrypto (crypto.subtle / crypto.getRandomValues)
 * for SCRAM-SHA-256 authentication and BSON generation. On Node runtimes where global crypto
 * is not exposed, this prevents "Error: crypto is not defined" crashes.
 */
const nodeCrypto = require("crypto");

if (typeof globalThis.crypto === "undefined" || !globalThis.crypto) {
  try {
    globalThis.crypto = nodeCrypto.webcrypto || nodeCrypto;
  } catch {
    globalThis.crypto = nodeCrypto;
  }
}

if (!globalThis.crypto.subtle && nodeCrypto.webcrypto && nodeCrypto.webcrypto.subtle) {
  try {
    globalThis.crypto.subtle = nodeCrypto.webcrypto.subtle;
  } catch {}
}

if (typeof global !== "undefined" && !global.crypto) {
  global.crypto = globalThis.crypto;
}

module.exports = globalThis.crypto;
