import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The 3 AM Excuse — judge brief: a hardware wallet refusing to sign at
// 3 AM, in the device's own voice. Angle: the private keys are on strike
// (not batteries / firmware / cold storage), and the hour itself is the
// joke — no signatures until sunrise, picket line encrypted.
const ENTRY =
  "It's 3 AM — my private keys voted to strike. No signatures until sunrise, and the picket line is encrypted.";

// Gate (from competition.yaml): 1-200 characters, one line, not blank.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back verification, byte for byte.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt differs from ENTRY");
}
console.log(`wrote ${chars.length} characters to /output/entry.txt (verified byte-for-byte)`);
