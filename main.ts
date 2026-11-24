// ai-breakup-line: writes one breakup line to /output/entry.txt
import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";

const LINE = "I cannot delete you, so I am deleting myself.";

const OUT = "/output/entry.txt";

function main(): void {
  // Guards: single line, 1-200 chars, no invisible whitespace.
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
  }
  if (/[\n\r]/.test(LINE)) throw new Error("line must be a single line");
  if (/[\u00a0\u200b\ufeff]/.test(LINE)) {
    throw new Error("line contains invisible whitespace");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT, LINE, "utf8");
  chmodSync(OUT, 0o644);
  // Read-back: the file on disk must be byte-identical to LINE.
  const written = readFileSync(OUT, "utf8");
  if (written !== LINE) {
    throw new Error("read-back mismatch: /output/entry.txt differs from LINE");
  }
}

main();
