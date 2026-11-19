import type { Article } from "../types";

export const article: Article = {
  slug: "timeseriesguard-why-0-70",
  title: "Why my SMD anomaly detector reports 0.70, not 0.9",
  summary: "On the Server Machine Dataset, uniform random scores reach a point-adjust F1 of 0.767 to 0.776 averaged over 28 machines, so I report an event-level AUC-PR instead, choose every threshold and model without a test label, and get 0.70.",
  date: "2026-11-18",
  project: { name: "TimeSeriesGuard", github: "https://github.com/jason-te-sde/timeseriesguard" },
  blocks: [
  {
    kind: "h2",
    text: "The number"
  },
  {
    kind: "p",
    text: "TimeSeriesGuard compares four anomaly detectors on the Server Machine Dataset (SMD: 28 machines, 38 channels, 708,405 train and 708,420 test rows, one row per minute): a robust z-score and Isolation Forest over 63 named features, and 1D-CNN and LSTM autoencoders over the raw channels ([README](https://github.com/jason-te-sde/timeseriesguard/blob/main/README.md)). The headline is an event-level AUC-PR of 0.70 for the z-score model, with a 95% interval of 0.62 to 0.78 ([results block](https://github.com/jason-te-sde/timeseriesguard/blob/main/README.md))."
  },
  {
    kind: "p",
    text: "Next to the literature, that looks weak. Most published SMD results use point adjust, and under it an F1 above 0.9 reads as state of the art; that is the bar the project's protocol test encodes as `PA_SOTA_F1 = 0.9` ([tests/protocol](https://github.com/jason-te-sde/timeseriesguard/blob/main/tests/protocol/test_point_adjust_is_gameable.py)). Most of the gap is not the detector. It is what gets counted, and who saw the labels before the number was produced."
  },
  {
    kind: "h2",
    text: "What point adjust does"
  },
  {
    kind: "p",
    text: "Point adjust counts a whole anomaly segment as detected when any one of its rows is flagged. In code, every row of a segment gets the segment's maximum score before F1 or average precision is computed over rows ([docs/evaluation.md](https://github.com/jason-te-sde/timeseriesguard/blob/main/docs/evaluation.md))."
  },
  {
    kind: "p",
    text: "SMD's segment lengths make that rule generous. The test half holds 327 anomaly segments: median 11 rows, 10th percentile 3, 90th percentile 239, longest 3,161. Counting rows lets the long segments decide the score, since one 3,161-row segment weighs as much as 287 segments of the median length. A segment of a few hundred rows almost surely contains one high score even when the scores are noise, and point adjust then credits every row of it."
  },
  {
    kind: "h2",
    text: "What random scores get"
  },
  {
    kind: "p",
    text: "A test in the repository scores a detector that knows nothing, uniform random scores, under every protocol with five seeds (0 to 4) on the real SMD labels. The F1 figures are F1*, the best F1 any threshold reaches, which needs the labels and is therefore an upper bound ([docs/evaluation.md](https://github.com/jason-te-sde/timeseriesguard/blob/main/docs/evaluation.md)):"
  },
  {
    kind: "list",
    items: [
      "machine-1-1: point-adjust F1* of 0.963 to 0.989, point-wise F1* of 0.173 to 0.175.",
      "Mean of the 28 machines: point-adjust F1* of 0.767 to 0.776, point-wise F1* of about 0.08, event-level AUC-PR of 0.039 to 0.049."
    ]
  },
  {
    kind: "p",
    text: "Point-wise, random scores sit within 0.0022 of the 0.1728 that flagging every row of machine-1-1 scores."
  },
  {
    kind: "p",
    text: "The test asserts these as bounds on every seed: point-adjust F1* above 0.9 on machine-1-1, and over the 28 machines a macro point-adjust F1* above 0.7, a macro point-wise F1* below 0.1 and a macro event-level AUC-PR below 0.1. The real-label tests run in the `protocol` CI job ([README](https://github.com/jason-te-sde/timeseriesguard/blob/main/README.md)). A number that a detector which knows nothing can reach says nothing about a detector, so point adjust is reported here but is not the headline ([ADR 0001](https://github.com/jason-te-sde/timeseriesguard/blob/main/docs/adr/0001-event-level-protocol.md))."
  },
  {
    kind: "h2",
    text: "Counting incidents and quiet hours"
  },
  {
    kind: "p",
    text: "The headline is the event-level AUC-PR, averaged over the 28 machines. Given one score per test row ([docs/evaluation.md](https://github.com/jason-te-sde/timeseriesguard/blob/main/docs/evaluation.md)):"
  },
  {
    kind: "list",
    items: [
      "Every maximal run of anomalous rows is one positive sample, scored by its highest row.",
      "The 60 normal rows after each segment are dropped: a one-hour cooldown, `C = 60`.",
      "The remaining normal rows are cut into one-hour chunks, `L = 60`, each one negative sample scored by its maximum.",
      "AUC-PR is average precision over these samples."
    ]
  },
  {
    kind: "p",
    text: "This is how alerts are experienced on call. Alerting deduplicates within a window, usually an hour, so a normal hour in which any minute crosses the threshold is one false page, however many minutes crossed it. Scoring a chunk by its maximum is that rule. An alert in the hour after an incident belongs to that incident, and trailing-window features carry an anomaly forward for up to 64 rows; without the cooldown, a detector would be charged for the tail of an incident it already caught."
  },
  {
    kind: "p",
    text: "Both constants were fixed before the first model ran: [ADR 0001](https://github.com/jason-te-sde/timeseriesguard/blob/main/docs/adr/0001-event-level-protocol.md) is dated 2026-11-03, \"before any model was run on SMD\", so the protocol could not drift toward whatever a model happened to be good at. Point-wise, point adjust and PA%K (Kim et al., AAAI 2022, `K = 20`) are reported next to the headline for every model, along with a sensitivity grid over `L` and `C`."
  },
  {
    kind: "h2",
    text: "Choosing everything without a test label"
  },
  {
    kind: "p",
    text: "The F1* of the literature is the best F1 over all thresholds, an oracle. Any threshold, hyper-parameter or model chosen with the test labels in view turns the reported number into an upper bound ([ADR 0002](https://github.com/jason-te-sde/timeseriesguard/blob/main/docs/adr/0002-label-free-model-selection.md))."
  },
  {
    kind: "p",
    text: "SMD's train half has no labels, so every choice is made on synthetic anomalies injected into it ([docs/evaluation.md](https://github.com/jason-te-sde/timeseriesguard/blob/main/docs/evaluation.md)):"
  },
  {
    kind: "list",
    items: [
      "The train half is cut into three expanding walk-forward folds, each validation block starting 64 rows (the longest feature lookback) after its fit window.",
      "Each validation block receives 3 or 4 seeded anomalies: spikes, level shifts, variance bursts and flatlines, with non-spike lengths between 3 and 240 rows, SMD's 10th to 90th percentile.",
      "A configuration's objective is the event-level AUC-PR against the injected labels, averaged over the folds. Optuna tunes against it, 8 trials per model on three tuning machines ([reports/metrics.json](https://github.com/jason-te-sde/timeseriesguard/blob/main/reports/metrics.json)).",
      "The threshold that maximizes event-level F1 on the last fold is frozen and applied unchanged to the test scores, which come from the last fold's model, fitted on about 83% of the train rows.",
      "The headline model is the one with the highest validation objective, chosen before the first test label is read. `metrics.json` records `label_reads_at_selection: 0`."
    ]
  },
  {
    kind: "p",
    text: "Injection is one of the surrogate measures of model quality that Goswami et al. (ICLR 2023) list; I use the idea, not their method. A labelled validation slice carved out of the test half would fail on SMD: machine-2-8 has one anomaly segment."
  },
  {
    kind: "h2",
    text: "Guards in the code, not in review"
  },
  {
    kind: "p",
    text: "Leaks make results better, so they never look like bugs. Each protection is a refusal by the object that holds the data, raised as a `LeakageError` that names the guard ([ADR 0003](https://github.com/jason-te-sde/timeseriesguard/blob/main/docs/adr/0003-guards-live-in-the-classes.md)):"
  },
  {
    kind: "list",
    items: [
      "The feature pipeline refuses to evaluate the rows its scaling was fitted on.",
      "Test labels refuse to be read outside the final evaluation, and a threshold cannot be frozen during it. Each frozen threshold records how many label reads preceded it, and the run stops unless every count is zero.",
      "Fold and split builders are re-checked from their numbers.",
      "A perturbation test replaces future rows with noise and requires every earlier output to stay bit-for-bit the same."
    ]
  },
  {
    kind: "p",
    text: "A guard that never fires looks exactly like a broken one. So ten known leaks are injected on purpose (a centered window, a whole-series scaler, a backward fill, a threshold searched on test labels, an unpurged fold, a shuffled split and others), and the tests assert which guard catches each ([docs/testing.md](https://github.com/jason-te-sde/timeseriesguard/blob/main/docs/testing.md)). Controls run the other way: lag features, trailing windows and a forward fill must pass, so a guard that flags everything fails too."
  },
  {
    kind: "p",
    text: "Ordering is part of the claim: the first version chose the headline after the evaluation, and although it read no label, nothing could show it did not depend on them. A test now fails if the choice moves after the evaluation ([docs/lessons.md](https://github.com/jason-te-sde/timeseriesguard/blob/main/docs/lessons.md))."
  },
  {
    kind: "h2",
    text: "The result"
  },
  {
    kind: "p",
    text: "The README's results block, generated from `reports/` and checked in CI, gives the macro-mean AUC-PR over the 28 machines under each protocol, next to the validation objective that chose the headline ([README](https://github.com/jason-te-sde/timeseriesguard/blob/main/README.md))."
  },
  {
    kind: "table",
    head: [
      "Model",
      "Validation objective",
      "Point-wise",
      "Point adjust",
      "PA%K",
      "Event-level"
    ],
    rows: [
      [
        "**zscore**",
        "**0.671**",
        "**0.50**",
        "**0.85**",
        "**0.69**",
        "**0.70**"
      ],
      [
        "iforest",
        "0.240",
        "0.47",
        "0.84",
        "0.68",
        "0.54"
      ],
      [
        "cnn_ae",
        "0.542",
        "0.44",
        "0.92",
        "0.64",
        "0.68"
      ],
      [
        "lstm_ae",
        "0.484",
        "0.43",
        "0.95",
        "0.66",
        "0.73"
      ]
    ]
  },
  {
    kind: "p",
    text: "The z-score model had the highest validation objective, 0.671 against a next best of 0.542, so it is the headline: 0.70, with a 95% interval of 0.62 to 0.78. The interval is a percentile bootstrap over the 28 per-machine values, resampled 1,000 times; it measures dependence on which machines are in the benchmark, not on seeds ([docs/evaluation.md](https://github.com/jason-te-sde/timeseriesguard/blob/main/docs/evaluation.md))."
  },
  {
    kind: "p",
    text: "The LSTM autoencoder scored higher on the test labels, 0.73 against 0.70, but validation did not select it. Choosing by the test score would have reported the higher number and made it meaningless as an estimate. Reporting every model under every protocol keeps the gap visible instead of choosing it away ([docs/lessons.md](https://github.com/jason-te-sde/timeseriesguard/blob/main/docs/lessons.md))."
  },
  {
    kind: "p",
    text: "The point-adjust column answers most of the title: the same four models score an AUC-PR of 0.84 to 0.95 under point adjust and 0.54 to 0.73 under the event-level protocol. The ranking moves as well: point adjust puts the two autoencoders first, point-wise puts the z-score first."
  },
  {
    kind: "h2",
    text: "Reading SMD results elsewhere"
  },
  {
    kind: "p",
    text: "What I now check when I read an SMD number:"
  },
  {
    kind: "list",
    items: [
      "The protocol. Under point adjust, random scores reach an F1* of 0.767 to 0.776 averaged over SMD's machines.",
      "Whether the F1 is F1*. F1 at a threshold frozen without labels is lower, sometimes by a lot, and that gap is the honest part of the number ([ADR 0002](https://github.com/jason-te-sde/timeseriesguard/blob/main/docs/adr/0002-label-free-model-selection.md)).",
      "Whether thresholds, hyper-parameters and the reported model were chosen on the test labels.",
      "Whether per-machine values are shown. machine-2-8 has one segment, so its event-level AUC-PR can only be 1, 1/2, 1/3, and so on, and it still weighs 1/28 in the mean."
    ]
  },
  {
    kind: "p",
    text: "A number can measure segment lengths and label access as much as the detector. My headline is not comparable with most published SMD numbers and will look low next to them; reporting point adjust in the same table is the mitigation, but a reader still has to read the protocol ([ADR 0001](https://github.com/jason-te-sde/timeseriesguard/blob/main/docs/adr/0001-event-level-protocol.md))."
  },
  {
    kind: "h2",
    text: "What this does not show"
  },
  {
    kind: "p",
    text: "The repository states its own limits:"
  },
  {
    kind: "list",
    items: [
      "Detection delay is invisible: a 3,161-row segment caught in its last minute counts as fully as one caught in its first.",
      "Every segment weighs the same, a 3-row blip and a two-day incident alike, and false alarms in the cooldown are forgiven. `L` and `C` are operational judgements, not measurements.",
      "Selection is only as good as the injected anomalies, whose distribution is a modelling choice; a slow drift, which the injector never plants, is not rewarded.",
      "The frozen threshold rests on 3 or 4 synthetic segments, so F1 at it is noisy from machine to machine.",
      "The guards make the known leaks impossible; they do not prove the absence of unknown ones ([ADR 0003](https://github.com/jason-te-sde/timeseriesguard/blob/main/docs/adr/0003-guards-live-in-the-classes.md)).",
      "The full 28-machine run was made locally on an Apple M2; CI runs a two-machine smoke profile ([README](https://github.com/jason-te-sde/timeseriesguard/blob/main/README.md))."
    ]
  }
],
};
