import type { Article } from "../types";

export const article: Article = {
  slug: "keel-deterministic-simulation",
  title: "Testing Raft with Deterministic Simulation: Three Seeds, Three Bugs",
  summary: "keel's Raft core is a pure state machine, so a five-node cluster under faults is a function of one integer seed, and widening a sweep from 500 seeds to 10,000 found ways a committed entry could end up on a minority of nodes.",
  date: "2026-11-18",
  project: { name: "keel", github: "https://github.com/jason-te-sde/keel" },
  blocks: [
  {
    kind: "p",
    text: "Most Raft projects prove they work by starting a cluster and watching it not fall over. The Raft implementation I worked on before keel was tested that way, and the two stale-read bugs in its read path had no test that could have found them ([ADR 0001](https://github.com/jason-te-sde/keel/blob/main/docs/design/0001-deterministic-core.md))."
  },
  {
    kind: "p",
    text: "keel is a linearizable key-value store in Java with Raft written from scratch. Its testing rests on three decisions: the consensus core is a pure state machine, so a whole cluster is a function of one seed; the paper's safety properties are asserted after every simulated step; and client histories are checked for linearizability."
  },
  {
    kind: "h2",
    text: "A cluster as a function of one seed"
  },
  {
    kind: "p",
    text: "`RaftNode` owns no threads, reads no clock, performs no I/O, and holds no locks. Its entire surface, from [docs/architecture.md](https://github.com/jason-te-sde/keel/blob/main/docs/architecture.md):"
  },
  {
    kind: "code",
    text: "tick()                                       one unit of logical time has passed\nstep(RaftMessage)                            a message arrived\npropose(byte[]), requestRead(long), campaign()\nready() / advance(Ready)                     collect the work, then confirm it was done"
  },
  {
    kind: "p",
    text: "Randomness is an injected `Random`, and membership iterates in sorted order. The driver owns the disk, the network and the clock, and handles each `Ready` batch in a fixed order: write hard state and entries, sync, send, apply, `advance()`. Sync comes before send because an acknowledgement promises durability, and a leader counts acknowledgements toward a quorum."
  },
  {
    kind: "p",
    text: "The simulator runs five nodes for twelve hundred ticks under partitions, crashes, drops and duplicates in about fifteen milliseconds, identically every time ([ADR 0001](https://github.com/jason-te-sde/keel/blob/main/docs/design/0001-deterministic-core.md)). One step, abbreviated from [Sim.java](https://github.com/jason-te-sde/keel/blob/main/keel-testkit/src/main/java/io/keel/testkit/Sim.java):"
  },
  {
    kind: "code",
    text: "public void step() {\n    tick++;\n    injectFaults();\n    // deliver messages due this tick, tick each live node, drive its Ready batch\n    invariants.check(tick, views());\n}"
  },
  {
    kind: "p",
    text: "[SimTest.java](https://github.com/jason-te-sde/keel/blob/main/keel-testkit/src/test/java/io/keel/testkit/SimTest.java) asserts two runs with the same config produce the same trace hash. The simulator compacts every 8 to 16 entries, deliberately unrealistic, so every seed crosses the snapshot paths ([docs/testing.md](https://github.com/jason-te-sde/keel/blob/main/docs/testing.md))."
  },
  {
    kind: "h2",
    text: "Two checkers: replicas, then clients"
  },
  {
    kind: "p",
    text: "These properties are asserted after every step, because a cluster that elects two leaders in one term and then recovers looks healthy by the time a run finishes ([docs/testing.md](https://github.com/jason-te-sde/keel/blob/main/docs/testing.md)):"
  },
  {
    kind: "table",
    head: [
      "Property",
      "Paper",
      "Meaning"
    ],
    rows: [
      [
        "Election Safety",
        "5.2",
        "at most one leader per term"
      ],
      [
        "Log Matching",
        "5.3",
        "equal `(index, term)` implies identical prefixes"
      ],
      [
        "State Machine Safety",
        "5.4.3",
        "no two replicas apply different commands at one index, and no replica rewrites what it applied"
      ],
      [
        "Term monotonicity",
        "none",
        "a node's term never decreases, including across a crash"
      ],
      [
        "Commit monotonicity",
        "none",
        "a node's commit index never decreases"
      ]
    ]
  },
  {
    kind: "p",
    text: "Invariants confirm that replicas agree. A store can do that perfectly and still hand a client a value no sequential execution allows, which is what a read served by a deposed leader looks like. The [linearizability checker](https://github.com/jason-te-sde/keel/blob/main/keel-testkit/src/main/java/io/keel/testkit/linz/Linearizability.java) searches a recorded client history for a sequential order the model accepts: Wing and Gong's search, decomposed per key and memoized."
  },
  {
    kind: "p",
    text: "A checker that never says no proves nothing, so [SimLinearizabilityTest.java](https://github.com/jason-te-sde/keel/blob/main/keel-testkit/src/test/java/io/keel/testkit/SimLinearizabilityTest.java) breaks the read path on purpose, reading local state without a read index, and asserts the checker rejects the history at some seed."
  },
  {
    kind: "h2",
    text: "Widening the sweep"
  },
  {
    kind: "p",
    text: "The nightly soak, which runs 2,000 seeds, started failing on main at seed 1695. Locally I widened the sweep from 500 seeds to 10,000, and it turned up four ways a committed entry could end up on fewer than a majority of nodes: three in the consensus core and one in the simulator that drives it ([CHANGELOG.md](https://github.com/jason-te-sde/keel/blob/main/CHANGELOG.md)). Three came with seeds: 1695, 1537 and 2626, all above 500. The fourth, a leader counting its own not-yet-durable entries toward a quorum, turned up while I was chasing the others. Every tag before v0.3.1 can lose a committed entry."
  },
  {
    kind: "p",
    text: "Each seed in [SoakTest.java](https://github.com/jason-te-sde/keel/blob/main/keel-testkit/src/test/java/io/keel/testkit/SoakTest.java) runs 1,200 ticks, alternating a `chaotic` profile that builds long logs with a `brutal` one that spends most of its time partitioned. A failing seed reproduces the run exactly, so diagnosis starts with a single-seed rerun, not an attempt to make the failure happen again."
  },
  {
    kind: "h2",
    text: "Seed 1695: a snapshot install that discarded acknowledged entries"
  },
  {
    kind: "p",
    text: "A follower receiving `InstallSnapshot` always restored from it and discarded its whole log. That is right when the follower's log conflicts with the snapshot. It is wrong when the follower already holds the boundary entry with the same term: by Log Matching it holds the whole prefix, and there is nothing to install. Discarding threw away entries above the boundary that the follower had acknowledged and a leader had counted toward a quorum. The committed entry survived on a minority, and a node without it won the next election ([RegressionSeedTest.java](https://github.com/jason-te-sde/keel/blob/main/keel-testkit/src/test/java/io/keel/testkit/RegressionSeedTest.java)). The paper covers this case in figure 13, step 6."
  },
  {
    kind: "p",
    text: "My snapshot tests covered a follower behind the snapshot and one whose commit index was already past it. None put a follower in the state between: holding the boundary entry and acknowledged entries above it. Reaching it takes compaction, a snapshot landing after acknowledgements for later entries, and an election. A hand-written test encodes a schedule its author already has in mind; a sweep does not need one."
  },
  {
    kind: "p",
    text: "The fix in [RaftNode.java](https://github.com/jason-te-sde/keel/blob/main/keel-raft/src/main/java/io/keel/raft/RaftNode.java): if the follower's boundary entry matches the snapshot's term, it commits up to the boundary, keeps its tail, and replies. A conflicting term still discards everything, correctly, since nothing above a divergence can have been committed. [SnapshotTest.java](https://github.com/jason-te-sde/keel/blob/main/keel-raft/src/test/java/io/keel/raft/SnapshotTest.java) pins both halves."
  },
  {
    kind: "h2",
    text: "Seed 1537: a heartbeat that committed an entry nobody agreed on"
  },
  {
    kind: "p",
    text: "This bug was a line I wrote on purpose, with a comment defending it. From the fix commit's diff of [RaftNode.java](https://github.com/jason-te-sde/keel/blob/main/keel-raft/src/main/java/io/keel/raft/RaftNode.java):"
  },
  {
    kind: "code",
    text: "// before\n// A heartbeat may advertise a commit index past the end of our log when we are behind, so\n// clamp: committing an entry we do not have would be committing nothing.\nif (log.commitTo(Math.min(h.leaderCommit(), log.lastIndex()))) {\n\n// after\nif (h.leaderCommit() <= log.lastIndex() && log.commitTo(h.leaderCommit())) {"
  },
  {
    kind: "p",
    text: "A heartbeat carries no entries, so it verifies nothing about the receiver's log. The leader advertises the minimum of its commit index and what that follower has acknowledged, and an acknowledged index was checked against the leader's log. When the leader's view ran ahead of the follower's actual log, the clamp turned \"commit up to what you acknowledged\" into \"commit whatever you happen to have\". After a leader change, a follower with a divergent tail committed its own entries and applied a command the cluster never agreed on."
  },
  {
    kind: "p",
    text: "A test written from the same reasoning as the clamp would have passed. The failure needs a follower holding a tail from an old leader and a new leader with stale information about it. `heartbeatCannotCommitPastTheMatchingPrefix` in [ReplicationTest.java](https://github.com/jason-te-sde/keel/blob/main/keel-raft/src/test/java/io/keel/raft/ReplicationTest.java) builds that state directly: the follower holds indexes 1 to 3 from term 1, two of them divergent, and a term-2 heartbeat advertising commit index 5 must leave its commit index at 0. It is a short test once the shape is known; the seed is what made it known."
  },
  {
    kind: "h2",
    text: "Seed 2626: the bug was in the simulator"
  },
  {
    kind: "p",
    text: "The third failure, two fixes later, looked like the first one coming back. The decisive evidence was the leader's own view of the quorum at the moment it committed ([README.md](https://github.com/jason-te-sde/keel/blob/main/README.md)):"
  },
  {
    kind: "code",
    text: "matches[1=41 2=0 3=41 4=40 5=42]"
  },
  {
    kind: "p",
    text: "Three of five nodes are at 41 or above, so by its own information the leader was right to commit index 41. The information was wrong: node 3 held nothing at index 41. It had acknowledged those entries and then discarded them, the first bug's failure mode on the path where the boundary did not match."
  },
  {
    kind: "p",
    text: "It did not match because of the simulator. Acting as the driver, [Sim.java](https://github.com/jason-te-sde/keel/blob/main/keel-testkit/src/main/java/io/keel/testkit/Sim.java) took a snapshot's boundary index from the state machine, which only sees client commands, and its term from the last entry applied of any kind. When a no-op or configuration entry followed a command across a term boundary, the snapshot advertised a term its own boundary did not have, so receivers failed the match check the 1695 fix relies on and discarded acknowledged entries."
  },
  {
    kind: "p",
    text: "[ADR 0001](https://github.com/jason-te-sde/keel/blob/main/docs/design/0001-deterministic-core.md) lists this kind of mistake as the design's cost: the driver does work the core would otherwise do, and getting it wrong is silent. The simulator is a driver. It now takes index and term from the same applied entry, and both log stores, [MemoryLogStore.java](https://github.com/jason-te-sde/keel/blob/main/keel-raft/src/main/java/io/keel/raft/MemoryLogStore.java) and [SegmentedLog.java](https://github.com/jason-te-sde/keel/blob/main/keel-storage/src/main/java/io/keel/storage/SegmentedLog.java), reject compaction metadata whose term does not match the log at its boundary, so bad metadata fails where it is built rather than several hundred ticks later."
  },
  {
    kind: "h2",
    text: "Keeping what the sweep found"
  },
  {
    kind: "p",
    text: "Every fix has a unit test that isolates it, and the three seeds replay on every run, so removing a fix fails the fast suite rather than the nightly job. From [RegressionSeedTest.java](https://github.com/jason-te-sde/keel/blob/main/keel-testkit/src/test/java/io/keel/testkit/RegressionSeedTest.java):"
  },
  {
    kind: "code",
    text: "@CsvSource({\n    \"1695, brutal, install-snapshot discarded acknowledged entries\",\n    \"1537, brutal, heartbeat committed an unmatched entry\",\n    \"2626, chaotic, snapshot metadata misdescribed its own boundary\",\n})"
  },
  {
    kind: "p",
    text: "After the fixes, 10,000 seeds ran 12,000,000 invariant checks and 572,141 snapshots in 81 seconds on my laptop with zero violations; the nightly job keeps running 2,000 ([README.md](https://github.com/jason-te-sde/keel/blob/main/README.md))."
  },
  {
    kind: "h2",
    text: "What this does not prove"
  },
  {
    kind: "p",
    text: "A passing sweep covers the schedules it ran, inside the simulator's fault model. [docs/testing.md](https://github.com/jason-te-sde/keel/blob/main/docs/testing.md) lists where that model stops:"
  },
  {
    kind: "list",
    items: [
      "No failure is injected during compaction: no crash between writing a snapshot and compacting the log, no snapshot arriving at a follower mid-append.",
      "Membership changes are tested for their rules, not their interleavings. Changes during partitions and crashes are not in the random fault set, and that is where the remaining risk is.",
      "Messages are never serialized, so codec bugs are left to the integration tests.",
      "The simulated disk models sync boundaries, not the disk: no torn-sector or reordered-write injection.",
      "A node dies between ticks. A real process can die between two instructions inside a `Ready` drain.",
      "There is no clock skew, because the core reads no clock. That changes the moment leader leases are added."
    ]
  },
  {
    kind: "h2",
    text: "What I took from it"
  },
  {
    kind: "p",
    text: "Determinism is only worth something if every failure carries its seed. The soak attached the seed only to invariant violations, so failures thrown by the core's own assertions came out as bare stack traces. Two of these failures could not be replayed until [SoakTest.java](https://github.com/jason-te-sde/keel/blob/main/keel-testkit/src/test/java/io/keel/testkit/SoakTest.java) reported the seed and cluster state for any exception ([CHANGELOG.md](https://github.com/jason-te-sde/keel/blob/main/CHANGELOG.md))."
  },
  {
    kind: "p",
    text: "The harness is code under test too. Seed 2626 was a simulator bug that presented as a core bug, and the invariant checker once had its own: Log Matching compared logs by list position, which failed at eight seeds when compaction was enabled ([README.md](https://github.com/jason-te-sde/keel/blob/main/README.md)). What closed the 2626 class of mistake was not more seeds but a rule enforced where the data is built."
  }
],
};
