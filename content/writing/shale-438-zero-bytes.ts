import type { Article } from "../types";

export const article: Article = {
  slug: "shale-438-zero-bytes",
  title: "438 zero bytes: what a real kill -9 found that my simulator missed",
  summary: "After I released shale 0.1.0, a crash test on a macOS 14 CI runner left a MANIFEST ending in 438 zero bytes, a shape my deterministic crash simulator had never produced, and the database refused to open.",
  date: "2026-11-18",
  project: { name: "shale", github: "https://github.com/jason-te-sde/shale" },
  blocks: [
  {
    kind: "h2",
    text: "What the simulator says a crash is"
  },
  {
    kind: "p",
    text: "shale is an LSM-tree key-value store I wrote from scratch in C++20. Most of its crash testing happens in a deterministic simulator: the real engine runs over an in-memory filesystem that models the gap between what a program wrote and what a disk kept. The header of that filesystem, [tests/testkit/fault_env.h](https://github.com/jason-te-sde/shale/blob/main/tests/testkit/fault_env.h), states the model:"
  },
  {
    kind: "list",
    items: [
      "A power loss keeps the bytes of each file that `Sync()` made durable, and a seeded prefix of the rest, so a file is cut at a seeded byte.",
      "For each directory, it keeps a seeded in-order prefix of the changes that were never synced (creations, removals, renames): never a change without the ones made before it in that directory.",
      "A process crash keeps everything that reached the operating system, because the machine survives."
    ]
  },
  {
    kind: "p",
    text: "A run also fails calls and flips bits in what is read. The default run is 50 seeds of 2000 steps over 200 keys, and after every step the database is compared with a reference model ([docs/testing.md](https://github.com/jason-te-sde/shale/blob/main/docs/testing.md)). After every reopen, the recovered state must be the state after some prefix of the acknowledged writes, at least as long as the last synced one, with no half-applied batch ([README.md](https://github.com/jason-te-sde/shale/blob/main/README.md))."
  },
  {
    kind: "p",
    text: "The determinism is the point, and also the limit: every byte a simulated crash leaves comes from a rule I wrote, and before 0.1.1 the rule said a file ends in a clean prefix of what was written."
  },
  {
    kind: "h2",
    text: "A second test with no model of the disk"
  },
  {
    kind: "p",
    text: "So I kept a cruder test beside it. [tools/shale_crashtest.cc](https://github.com/jason-te-sde/shale/blob/main/tools/shale_crashtest.cc) forks a writer that applies numbered puts and deletes to a small set of keys and reports each operation to the parent through a pipe when the call returns OK. After a random delay the parent sends `SIGKILL`, reopens the database and checks every key: each holds what its last acknowledged operation left, the one operation in flight may or may not have landed on its own key, and nothing else is there. The parent also counts tables that appear and disappear, and `--min_compactions=1` fails a run in which no kill reached a compaction."
  },
  {
    kind: "p",
    text: "CI runs it on Ubuntu and macOS: 200 rounds in about a minute, then six rounds with synced writes ([.github/workflows/ci.yml](https://github.com/jason-te-sde/shale/blob/main/.github/workflows/ci.yml)). It proves nothing about power loss, because a killed process leaves the page cache behind ([docs/testing.md](https://github.com/jason-te-sde/shale/blob/main/docs/testing.md)), and its seed does not repeat a run, since where a kill lands depends on timing. What it has is a real process, a real filesystem and a real kernel, and when it fails, CI uploads the database it left."
  },
  {
    kind: "h2",
    text: "What macOS 14 left behind"
  },
  {
    kind: "p",
    text: "After 0.1.0, the macOS 14 job failed: run 39308935354, seed 79, round 92 ([tests/db/version_set_test.cc](https://github.com/jason-te-sde/shale/blob/main/tests/db/version_set_test.cc)). The reopen failed with `unknown record type` in the MANIFEST, the log of edits that says which tables are live. The uploaded file is 12,389 bytes: 89 whole records, then zeros from offset 11,951 to the end of the file. That is 438 bytes, the size of the edit the writer was appending when it was killed ([docs/design/0004-durability.md](https://github.com/jason-te-sde/shale/blob/main/docs/design/0004-durability.md)). The file is now a regression input, and this is `xxd` of [tests/db/regression/manifest-zero-tail/MANIFEST-016123](https://github.com/jason-te-sde/shale/blob/main/tests/db/regression/manifest-zero-tail/MANIFEST-016123), trimmed:"
  },
  {
    kind: "code",
    text: "00002e90: 3401 a67c 1e00 0000 0015 6b65 7930 3030  4..|......key000\n00002ea0: 3030 3034 3037 3701 197d 1e00 0000 0000  0004077..}......\n00002eb0: 0000 0000 0000 0000 0000 0000 0000 0000  ................\n...\n00003060: 0000 0000 00                             ....."
  },
  {
    kind: "p",
    text: "The zero tail starts at `0x2eaf`. The four zero bytes just before it belong to the last whole record, so where the zeros begin is not where the records end; only the record headers say that."
  },
  {
    kind: "p",
    text: "The engine never writes this. A record header is a checksum, a length and a type, and type 0 is never written ([docs/format.md](https://github.com/jason-te-sde/shale/blob/main/docs/format.md)); the MANIFEST is only ever appended to. The operating system had allotted the space for the edit and not written it. The 0.1.0 reader found a zero where a type should be and reported a damaged record, and because a MANIFEST has no lenient mode ([docs/design/0003-wal-format-and-recovery.md](https://github.com/jason-te-sde/shale/blob/main/docs/design/0003-wal-format-and-recovery.md)), the database would not open at all."
  },
  {
    kind: "h2",
    text: "Where I drew the line"
  },
  {
    kind: "p",
    text: "The obvious fix, taking a zero header in the last block for the end of the log, is a guess by position ([docs/design/0003-wal-format-and-recovery.md](https://github.com/jason-te-sde/shale/blob/main/docs/design/0003-wal-format-and-recovery.md)), and I had already had to retract one rule of that kind. The first version of D6, the clause of the durability contract that lists crash traces, said a defect with nothing valid after it was a torn tail. That is false: at a defect the reader drops the rest of the block, and the records it drops can be ones that were acknowledged, so where a report falls says nothing about whether a crash caused it ([docs/design/0004-durability.md](https://github.com/jason-te-sde/shale/blob/main/docs/design/0004-durability.md))."
  },
  {
    kind: "p",
    text: "The rule in 0.1.1 is narrower. Zeros that start at a record boundary and run to the last byte of the file are a crash trace, in the write-ahead logs and the MANIFEST alike, and the reader establishes that by reading every byte to the end. This is the check in [src/io/log_reader.cc](https://github.com/jason-te-sde/shale/blob/main/src/io/log_reader.cc):"
  },
  {
    kind: "code",
    text: "if (raw_type == kZeroType && AllZeros(buffer_)) {\n  const size_t in_this_block = buffer_.size();\n  uint64_t after = 0;\n  if (ZerosRunToTheEnd(&after)) {\n    zero_tail_bytes_ = in_this_block + after;\n    return Physical::kEof;\n  }\n  // Something that is not zero follows. This header is a zero type, reported with the rest of\n  // its block, as any is.\n  Report(in_this_block, Status::Corruption(\"unknown record type\"));\n  return Physical::kBad;\n}"
  },
  {
    kind: "p",
    text: "Two arguments make dropping those zeros safe:"
  },
  {
    kind: "list",
    items: [
      "**Nothing after them is lost.** Every byte from the boundary to the end of the file has been read and is zero, so no record, whole or damaged, can be among them.",
      "**Nothing acknowledged as synced is in them.** D1 promises that a synced write survives a power loss, assuming the device honours `fsync`, so a synced byte is never zeroed. In a log the zeros were writes made without a sync; in the MANIFEST, an edit whose flush or compaction had not finished, with its inputs still on disk ([docs/operations.md](https://github.com/jason-te-sde/shale/blob/main/docs/operations.md))."
    ]
  },
  {
    kind: "p",
    text: "Everything outside that shape is still a defect, and a default open still refuses it ([CHANGELOG.md](https://github.com/jason-te-sde/shale/blob/main/CHANGELOG.md)):"
  },
  {
    kind: "list",
    items: [
      "**Zeros followed by any other byte.** Something comes after them, so taking them for the end could swallow a record.",
      "**Zeros inside a record that the file holds in full.** The header is not zero and the record fails its checksum. A record that the file ends inside is the older trace, a record cut off by the end of the file.",
      "**A garbage tail**, bytes that are not all zero, as in 0.1.0."
    ]
  },
  {
    kind: "p",
    text: "The line sits where the reader can prove, from the bytes alone, that it dropped nothing but zeros. It has a cost, which the design record states: zeros are trusted to be unsynced. A device that zeroes synced bytes breaks D1, the writes in them are dropped without a failure, and the `LOG` line that names the file and the number of zero bytes is the only trace ([docs/design/0004-durability.md](https://github.com/jason-te-sde/shale/blob/main/docs/design/0004-durability.md))."
  },
  {
    kind: "p",
    text: "The CI file is pinned by `TheManifestThatAKillOnMacOs14LeftEndingInZerosRecovers`, which recovers it to the state of its last whole edit with 438 bytes dropped, the same state as the file cut at offset 11,951 ([tests/db/version_set_test.cc](https://github.com/jason-te-sde/shale/blob/main/tests/db/version_set_test.cc))."
  },
  {
    kind: "h2",
    text: "Teaching the simulator to leave zeros"
  },
  {
    kind: "p",
    text: "The simulator's power loss had to change too, or it would stay as blind as before. For a file with unsynced bytes, one time in four, it now keeps the synced bytes followed by as many zeros as were written after them, in [tests/testkit/fault_env.cc](https://github.com/jason-te-sde/shale/blob/main/tests/testkit/fault_env.cc):"
  },
  {
    kind: "code",
    text: "if (kind == Crash::kPowerLoss && unsynced > 0 && crash_random_.OneIn(kZeroFillOneIn)) {\n  // The length of the file reached the disk and its data did not: the bytes appended since\n  // the last sync read back as zeros, as many as were written.\n  std::fill(file.data.begin() + static_cast<std::ptrdiff_t>(file.synced_size),\n            file.data.end(), '\\0');\n} else {\n  uint64_t kept = 0;\n  if (kind == Crash::kPowerLoss && unsynced > 0) {\n    kept = crash_random_.Next() % (unsynced + 1);\n  }\n  file.data.resize(static_cast<size_t>(file.synced_size + kept));\n}"
  },
  {
    kind: "p",
    text: "Before the reader tolerated zeros, this change made 190 of 200 seeds fail ([docs/design/0004-durability.md](https://github.com/jason-te-sde/shale/blob/main/docs/design/0004-durability.md)). Seeds 0 and 48 became regression seeds, and seed 48 reaches the MANIFEST shape that the kill left on macOS 14 ([tests/sim/regression_seeds.txt](https://github.com/jason-te-sde/shale/blob/main/tests/sim/regression_seeds.txt)). The default run is held to a floor so that the simulator cannot quietly stop producing zeros: its 50 seeds had 142 opens that dropped a zero-filled tail when I measured, and the floor is 71 ([tests/sim/sim_test.cc](https://github.com/jason-te-sde/shale/blob/main/tests/sim/sim_test.cc)). A MANIFEST that ends in zeros is rarer, about one seed in 50, too rare for a floor, so regression seed 1462 is required to produce one ([docs/testing.md](https://github.com/jason-te-sde/shale/blob/main/docs/testing.md))."
  },
  {
    kind: "h2",
    text: "What the simulator cannot tell me"
  },
  {
    kind: "p",
    text: "The simulator checked crash consistency after every step of every seed, and it missed this because I had never told it that a filesystem can keep a file's length without its data. A simulator finds the failures you model. A test against a real kernel and a real filesystem can show one nobody modelled, which is why the kill test stays in CI beside it."
  },
  {
    kind: "p",
    text: "Both still leave gaps, and [docs/testing.md](https://github.com/jason-te-sde/shale/blob/main/docs/testing.md) lists them:"
  },
  {
    kind: "list",
    items: [
      "**A real power loss.** Nothing models a drive that acknowledges a flush it has not done, or one that zeroes synced bytes, and the kill test leaves the page cache intact.",
      "**The simulator's own omissions.** A power loss never leaves a garbage tail or zeros that start inside the unsynced part of a file, and a process crash never leaves zeros. The failure that started this was a process kill; the simulator reproduces its shape only at a power loss.",
      "**Other filesystems and platforms.** Only ext4 and APFS, on x86-64 Linux and arm64 macOS. XFS, btrfs, ZFS, NFS and FUSE have not been run.",
      "**Bigger runs.** CI runs 50 seeds of 2000 steps and 200 kills; a database of tens of gigabytes has never been run."
    ]
  },
  {
    kind: "p",
    text: "The 438 zero bytes are in the repository now, and a unit test recovers them on every CI run."
  }
],
};
