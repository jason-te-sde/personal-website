/** Long-form keel content. Every number here comes from the repo's Numbers table. */

export const throughput = [
  { label: "fsync per entry", value: 328, note: "durable, one sync per append", emphasis: false },
  { label: "fsync per batch of 64", value: 19708, note: "durable, one sync per Ready", emphasis: true },
  { label: "no fsync", value: 108081, note: "not durable", emphasis: false },
] as const;

export const bugs = [
  {
    title: "A snapshot install discarded entries the receiver had acknowledged.",
    body: "When the entry at the snapshot's boundary already matches, the prefix below it matches too and there is nothing to install. Discarding anyway threw away entries above the boundary that a leader had already counted toward a quorum, leaving a committed entry on a minority and letting a node without it win the next election.",
    caught: "The nightly soak, once the sweep widened from 500 seeds to 10,000.",
    seed: "seed 1695",
  },
  {
    title: "A heartbeat committed an entry the node had never matched.",
    body: "The commit index was clamped to the receiver's own last index, but a heartbeat carries no evidence of what the log below it holds. After a leader change the node applied a command the cluster never agreed on.",
    caught: "The same sweep.",
    seed: "seed 1537",
  },
  {
    title: "Snapshot metadata misdescribed its own boundary.",
    body: "The boundary index came from the state machine, which only sees client commands; the term came from the last entry applied of any kind. Across a term change those describe different entries, so the snapshot advertised a term its boundary did not have — feeding the previous fix bad input.",
    caught: "The same sweep, two fixes later, traced through the leader's own view of the quorum: matches[1=41 2=0 3=41 4=40 5=42], where node 3 held nothing at index 41.",
    seed: "seed 2626",
  },
] as const;

export const numbers = [
  ["Tests", "253"],
  ["Line / branch coverage", "84.9% / 78.5%"],
  ["Simulation throughput", "149,149 ticks/s"],
  ["Soak", "10,000 seeds · 12M invariant checks · 81s · zero violations"],
  ["Hand-written Java", "9,899 lines main · 6,048 lines test"],
  ["Runtime dependencies", "Protobuf, gRPC, RocksDB, SLF4J"],
] as const;
