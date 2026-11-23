/**
 * Authored architecture diagrams. keel, EHR, PipeCI, cairn, nano-claude-code, the job queue, shale, quarry, the arXiv agent,
 * TimeSeriesGuard, CollabDocs and jd-resume-tailor have no GUI to screenshot,
 * so these draw the real shape of each system instead of faking app shots.
 * Note every <path> sets fill="none" — the parent <g> carries a fill, and an
 * L-shaped path without it renders as a filled triangle.
 */

function Arrows() {
  return (
    <defs>
      <marker id="ar" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
        <path d="M0 0 L5 2.5 L0 5 z" fill="#52525b" />
      </marker>
      <marker id="arA" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
        <path d="M0 0 L5 2.5 L0 5 z" fill="#A855F7" />
      </marker>
      <marker id="arD" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
        <path d="M0 0 L5 2.5 L0 5 z" fill="#3f3f46" />
      </marker>
    </defs>
  );
}

export function EhrDiagram() {
  return (
    <svg
      viewBox="0 0 420 200"
      className="w-full"
      role="img"
      aria-label="Mixed clinical records are chunked and embedded into a vector store; a query retrieves context for a hosted model that falls back to a local one, producing a cited summary"
    >
      <g fontFamily="'JetBrains Mono',monospace" fontSize="8.5" fill="#a1a1aa">
        <rect x="4" y="18" width="74" height="20" rx="4" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="41" y="32" textAnchor="middle">PDF · notes</text>
        <rect x="4" y="44" width="74" height="20" rx="4" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="41" y="58" textAnchor="middle">DICOM meta</text>
        <rect x="4" y="70" width="74" height="20" rx="4" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="41" y="84" textAnchor="middle">CSV · HL7</text>
        <text x="41" y="106" textAnchor="middle" fill="#52525b" fontSize="7.5">50K+ documents</text>

        <path fill="none" d="M82 54 h26" stroke="#52525b" strokeWidth="1" markerEnd="url(#ar)" />
        <rect x="112" y="40" width="70" height="28" rx="5" fill="rgba(168,85,247,.10)" stroke="#8E2DE2" />
        <text x="147" y="52" textAnchor="middle" fill="#e4e4e7">chunk +</text>
        <text x="147" y="62" textAnchor="middle" fill="#e4e4e7">embed</text>

        <path fill="none" d="M186 54 h26" stroke="#52525b" strokeWidth="1" markerEnd="url(#ar)" />
        <rect x="216" y="34" width="74" height="40" rx="5" fill="rgba(168,85,247,.14)" stroke="#A855F7" />
        <text x="253" y="50" textAnchor="middle" fill="#e4e4e7" fontWeight="700">ChromaDB</text>
        <text x="253" y="63" textAnchor="middle" fill="#A855F7" fontSize="7.5">p95 &lt; 100ms</text>

        <rect x="4" y="140" width="74" height="22" rx="4" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="41" y="155" textAnchor="middle">query</text>
        <path fill="none" d="M82 151 H240 V80" stroke="#A855F7" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arA)" />

        <path fill="none" d="M294 54 h24" stroke="#52525b" strokeWidth="1" markerEnd="url(#ar)" />
        <rect x="322" y="30" width="92" height="24" rx="5" fill="rgba(168,85,247,.10)" stroke="#8E2DE2" />
        <text x="368" y="45" textAnchor="middle" fill="#e4e4e7">Claude API</text>
        <rect x="322" y="60" width="92" height="24" rx="5" fill="rgba(255,255,255,.03)" stroke="#3f3f46" strokeDasharray="3 3" />
        <text x="368" y="75" textAnchor="middle" fill="#71717a">Ollama, local</text>
        <text x="368" y="98" textAnchor="middle" fill="#52525b" fontSize="7.5">fallback if unreachable</text>

        <path fill="none" d="M368 88 V128" stroke="#52525b" strokeWidth="1" markerEnd="url(#ar)" />
        <rect x="316" y="132" width="100" height="24" rx="5" fill="rgba(52,211,153,.08)" stroke="#34d399" />
        <text x="366" y="147" textAnchor="middle" fill="#a7f3d0">grounded summary</text>
      </g>
      <Arrows />
    </svg>
  );
}

export function PipeCiDiagram() {
  return (
    <svg
      viewBox="0 0 420 200"
      className="w-full"
      role="img"
      aria-label="A CI/CD pipeline. The engine core and worker pool, drawn dimmed, were a teammate's; the OpenTelemetry to Prometheus, Loki, Tempo and Grafana path, drawn in accent colour, was mine"
    >
      <g fontFamily="'JetBrains Mono',monospace" fontSize="8.5">
        <rect x="6" y="26" width="66" height="24" rx="5" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="39" y="41" textAnchor="middle" fill="#a1a1aa">git push</text>
        <path fill="none" d="M76 38 h22" stroke="#3f3f46" strokeWidth="1" markerEnd="url(#arD)" />
        <rect x="102" y="20" width="94" height="36" rx="5" fill="rgba(255,255,255,.025)" stroke="#3f3f46" strokeDasharray="4 3" />
        <text x="149" y="34" textAnchor="middle" fill="#71717a">pipeline engine</text>
        <text x="149" y="46" textAnchor="middle" fill="#52525b" fontSize="7">YAML → job DAG</text>
        <path fill="none" d="M200 38 h22" stroke="#3f3f46" strokeWidth="1" markerEnd="url(#arD)" />
        <rect x="226" y="20" width="76" height="36" rx="5" fill="rgba(255,255,255,.025)" stroke="#3f3f46" strokeDasharray="4 3" />
        <text x="264" y="34" textAnchor="middle" fill="#71717a">worker pool</text>
        <text x="264" y="46" textAnchor="middle" fill="#52525b" fontSize="7">Kubernetes</text>
        <text x="182" y="68" textAnchor="middle" fill="#52525b" fontSize="7.5">— a teammate&apos;s work —</text>

        <path fill="none" d="M149 60 V92" stroke="#A855F7" strokeWidth="1.2" markerEnd="url(#arA)" />
        <path fill="none" d="M264 60 V92" stroke="#A855F7" strokeWidth="1.2" markerEnd="url(#arA)" />
        <rect x="96" y="96" width="212" height="26" rx="5" fill="rgba(168,85,247,.12)" stroke="#A855F7" />
        <text x="202" y="112" textAnchor="middle" fill="#e4e4e7">OpenTelemetry — traces, metrics, logs</text>

        <path fill="none" d="M202 126 V140" stroke="#A855F7" strokeWidth="1.2" markerEnd="url(#arA)" />
        <rect x="46" y="144" width="88" height="22" rx="4" fill="rgba(168,85,247,.08)" stroke="#8E2DE2" />
        <text x="90" y="159" textAnchor="middle" fill="#d4d4d8">Prometheus</text>
        <rect x="142" y="144" width="60" height="22" rx="4" fill="rgba(168,85,247,.08)" stroke="#8E2DE2" />
        <text x="172" y="159" textAnchor="middle" fill="#d4d4d8">Loki</text>
        <rect x="210" y="144" width="60" height="22" rx="4" fill="rgba(168,85,247,.08)" stroke="#8E2DE2" />
        <text x="240" y="159" textAnchor="middle" fill="#d4d4d8">Tempo</text>
        <rect x="278" y="144" width="88" height="22" rx="4" fill="rgba(168,85,247,.18)" stroke="#A855F7" />
        <text x="322" y="159" textAnchor="middle" fill="#f4f4f5" fontWeight="700">Grafana</text>
        <text x="206" y="184" textAnchor="middle" fill="#A855F7" fontSize="8">▲ release engineering + observability — mine</text>
      </g>
      <Arrows />
    </svg>
  );
}

export function MedTriageDiagram() {
  return (
    <svg
      viewBox="0 0 380 150"
      className="w-full"
      role="img"
      aria-label="Described symptoms feed a structured extraction step, then an urgency scoring step, producing a doctor's queue ordered from five down to one"
    >
      <g fontFamily="'JetBrains Mono',monospace" fontSize="8">
        <rect x="4" y="30" width="76" height="30" rx="5" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="42" y="43" textAnchor="middle" fill="#a1a1aa">described</text>
        <text x="42" y="54" textAnchor="middle" fill="#a1a1aa">symptoms</text>
        <path fill="none" d="M84 45 h20" stroke="#52525b" markerEnd="url(#ar)" />
        <rect x="108" y="28" width="80" height="34" rx="5" fill="rgba(168,85,247,.10)" stroke="#8E2DE2" />
        <text x="148" y="41" textAnchor="middle" fill="#e4e4e7">step 1</text>
        <text x="148" y="53" textAnchor="middle" fill="#a1a1aa" fontSize="7">extract structured</text>
        <path fill="none" d="M192 45 h20" stroke="#52525b" markerEnd="url(#ar)" />
        <rect x="216" y="28" width="80" height="34" rx="5" fill="rgba(168,85,247,.16)" stroke="#A855F7" />
        <text x="256" y="41" textAnchor="middle" fill="#e4e4e7">step 2</text>
        <text x="256" y="53" textAnchor="middle" fill="#A855F7" fontSize="7">urgency 1–5</text>
        <path fill="none" d="M256 66 V84" stroke="#A855F7" markerEnd="url(#arA)" />
        <text x="190" y="98" textAnchor="middle" fill="#71717a" fontSize="7.5">doctor&apos;s queue, ordered by score</text>
        <rect x="60" y="106" width="52" height="16" rx="3" fill="rgba(248,113,113,.18)" stroke="#f87171" />
        <text x="86" y="117" textAnchor="middle" fill="#fca5a5">5 · now</text>
        <rect x="118" y="106" width="52" height="16" rx="3" fill="rgba(251,191,36,.16)" stroke="#fbbf24" />
        <text x="144" y="117" textAnchor="middle" fill="#fcd34d">4 · soon</text>
        <rect x="176" y="106" width="52" height="16" rx="3" fill="rgba(168,85,247,.14)" stroke="#A855F7" />
        <text x="202" y="117" textAnchor="middle" fill="#d8b4fe">3</text>
        <rect x="234" y="106" width="52" height="16" rx="3" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="260" y="117" textAnchor="middle" fill="#71717a">2</text>
        <rect x="292" y="106" width="34" height="16" rx="3" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="309" y="117" textAnchor="middle" fill="#71717a">1</text>
      </g>
      <Arrows />
    </svg>
  );
}

export function CairnDiagram() {
  return (
    <svg
      viewBox="0 0 380 150"
      className="w-full"
      role="img"
      aria-label="A command enters a pure step function that returns the next state and a list of effects; the state is logged and snapshotted, the effects are delivered exactly once to a consumer, and a seeded simulator checks twelve invariants after every step"
    >
      <g fontFamily="'JetBrains Mono',monospace" fontSize="8">
        <rect x="4" y="30" width="62" height="30" rx="5" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="35" y="43" textAnchor="middle" fill="#a1a1aa">publish</text>
        <text x="35" y="54" textAnchor="middle" fill="#a1a1aa">command</text>
        <path fill="none" d="M70 45 h20" stroke="#52525b" markerEnd="url(#ar)" />
        <rect x="94" y="22" width="104" height="46" rx="5" fill="rgba(168,85,247,.16)" stroke="#A855F7" />
        <text x="146" y="38" textAnchor="middle" fill="#e4e4e7" fontWeight="700">step(state, cmd)</text>
        <text x="146" y="50" textAnchor="middle" fill="#A855F7" fontSize="6.5">pure: no clock, no I/O</text>
        <text x="146" y="60" textAnchor="middle" fill="#71717a" fontSize="7">→ state&apos;, effects</text>
        <path fill="none" d="M202 36 h22" stroke="#52525b" markerEnd="url(#ar)" />
        <rect x="228" y="22" width="112" height="22" rx="4" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="284" y="36" textAnchor="middle" fill="#a1a1aa">log + snapshot</text>
        <path fill="none" d="M202 56 h22" stroke="#A855F7" markerEnd="url(#arA)" />
        <rect x="228" y="48" width="112" height="22" rx="4" fill="rgba(52,211,153,.08)" stroke="#34d399" />
        <text x="284" y="62" textAnchor="middle" fill="#a7f3d0">effects, exactly once</text>
        <path fill="none" d="M146 72 V96" stroke="#52525b" strokeDasharray="3 3" markerEnd="url(#ar)" />
        <rect x="58" y="100" width="264" height="26" rx="5" fill="rgba(168,85,247,.08)" stroke="#8E2DE2" strokeDasharray="3 3" />
        <text x="190" y="111" textAnchor="middle" fill="#e4e4e7">seeded simulator: replicas, disks, crashes</text>
        <text x="190" y="121" textAnchor="middle" fill="#A855F7" fontSize="7">12 invariants checked after every step</text>
      </g>
      <Arrows />
    </svg>
  );
}

export function NanoDiagram() {
  const roles: [string, string, string][] = [
    ["main", "Anthropic", "#A855F7"],
    ["explore", "local Ollama", "#34d399"],
    ["plan", "OpenAI-compatible", "#8E2DE2"],
    ["verify", "Anthropic", "#A855F7"],
  ];
  return (
    <svg
      viewBox="0 0 380 150"
      className="w-full"
      role="img"
      aria-label="The agent loop sends each role's requests to the model configured for that role, for example main to Anthropic, explore to a local Ollama model, plan to an OpenAI-compatible endpoint; file writes pass a permission check first"
    >
      <g fontFamily="'JetBrains Mono',monospace" fontSize="8">
        <rect x="4" y="44" width="78" height="38" rx="5" fill="rgba(168,85,247,.16)" stroke="#A855F7" />
        <text x="43" y="60" textAnchor="middle" fill="#e4e4e7" fontWeight="700">agent loop</text>
        <text x="43" y="72" textAnchor="middle" fill="#A855F7" fontSize="7">ncc</text>
        {roles.map(([role, model, color], i) => {
          const y = 12 + i * 28;
          return (
            <g key={role}>
              <path fill="none" d={`M86 63 C106 63 106 ${y + 10} 126 ${y + 10}`} stroke="#52525b" markerEnd="url(#ar)" />
              <rect x="130" y={y} width="62" height="20" rx="4" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
              <text x="161" y={y + 13} textAnchor="middle" fill="#a1a1aa">{role}</text>
              <path fill="none" d={`M196 ${y + 10} h22`} stroke="#52525b" markerEnd="url(#ar)" />
              <rect x="222" y={y} width="104" height="20" rx="4" fill="rgba(255,255,255,.03)" stroke={color} />
              <text x="274" y={y + 13} textAnchor="middle" fill="#e4e4e7">{model}</text>
            </g>
          );
        })}
        <text x="161" y="134" textAnchor="middle" fill="#52525b" fontSize="7">+ compact · title</text>
        <rect x="4" y="112" width="78" height="22" rx="4" fill="rgba(251,191,36,.08)" stroke="#fbbf24" />
        <text x="43" y="126" textAnchor="middle" fill="#fcd34d" fontSize="7.5">permission check</text>
        <path fill="none" d="M43 86 V108" stroke="#52525b" strokeDasharray="3 3" markerEnd="url(#ar)" />
      </g>
      <Arrows />
    </svg>
  );
}

export function JobQueueDiagram() {
  return (
    <svg
      viewBox="0 0 380 150"
      className="w-full"
      role="img"
      aria-label="A producer enqueues jobs over gRPC to three stateless brokers that keep every job in PostgreSQL. Worker B, which leased the job under fencing token 2 after worker A's lease expired, completes it and is accepted; worker A, stalled past its lease under token 1, reports late and is refused"
    >
      <g fontFamily="'JetBrains Mono',monospace" fontSize="8">
        <rect x="4" y="31" width="62" height="24" rx="5" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="35" y="41" textAnchor="middle" fill="#a1a1aa">producer</text>
        <text x="35" y="50" textAnchor="middle" fill="#52525b" fontSize="6.5">enqueue</text>
        <path fill="none" d="M70 43 H96" stroke="#52525b" markerEnd="url(#ar)" />

        <text x="142" y="10" textAnchor="middle" fill="#52525b" fontSize="7">stateless brokers · gRPC</text>
        {[16, 35, 54].map((y) => (
          <g key={y}>
            <rect x="100" y={y} width="84" height="15" rx="4" fill="rgba(168,85,247,.10)" stroke="#8E2DE2" />
            <text x="142" y={y + 10.5} textAnchor="middle" fill="#e4e4e7">broker</text>
          </g>
        ))}

        <path fill="none" d="M142 73 V90" stroke="#52525b" markerEnd="url(#ar)" />
        <rect x="92" y="94" width="100" height="34" rx="5" fill="rgba(168,85,247,.16)" stroke="#A855F7" />
        <text x="142" y="108" textAnchor="middle" fill="#e4e4e7" fontWeight="700">PostgreSQL</text>
        <text x="142" y="120" textAnchor="middle" fill="#A855F7" fontSize="7">source of truth</text>

        <rect x="230" y="12" width="146" height="24" rx="5" fill="rgba(52,211,153,.08)" stroke="#34d399" />
        <text x="303" y="22" textAnchor="middle" fill="#a7f3d0">worker B · token 2</text>
        <text x="303" y="31" textAnchor="middle" fill="#71717a" fontSize="7">leased after A expired</text>
        <path fill="none" d="M228 24 H188" stroke="#52525b" markerEnd="url(#ar)" />
        <text x="208" y="33" textAnchor="middle" fill="#34d399" fontSize="6.5">accepted</text>

        <rect x="230" y="50" width="146" height="24" rx="5" fill="rgba(251,191,36,.08)" stroke="#fbbf24" strokeDasharray="3 3" />
        <text x="303" y="60" textAnchor="middle" fill="#fcd34d">worker A · token 1</text>
        <text x="303" y="69" textAnchor="middle" fill="#71717a" fontSize="7">stalled past its lease</text>
        <path fill="none" d="M228 62 H188" stroke="#52525b" strokeDasharray="3 3" markerEnd="url(#ar)" />
        <text x="208" y="71" textAnchor="middle" fill="#f87171" fontSize="6.5">refused</text>

        <text x="303" y="104" textAnchor="middle" fill="#A855F7" fontSize="7">fencing: only the newest lease</text>
        <text x="303" y="114" textAnchor="middle" fill="#A855F7" fontSize="7">holder can change a job</text>
      </g>
      <Arrows />
    </svg>
  );
}

export function ShaleDiagram() {
  return (
    <svg
      viewBox="0 0 380 150"
      className="w-full"
      role="img"
      aria-label="A write goes to the write-ahead log and the memtable; the memtable is flushed to level 0 and compaction merges tables down to levels 1 and 2. All of it runs over a simulated filesystem that loses power at a seeded byte, and after every step the database is compared with a reference model"
    >
      <g fontFamily="'JetBrains Mono',monospace" fontSize="8">
        <rect x="4" y="30" width="58" height="26" rx="5" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="33" y="41" textAnchor="middle" fill="#a1a1aa">Put</text>
        <text x="33" y="51" textAnchor="middle" fill="#52525b" fontSize="6.5">atomic batch</text>
        <path fill="none" d="M66 43 H78 V18 H90" stroke="#52525b" markerEnd="url(#ar)" />
        <path fill="none" d="M78 43 V46 H90" stroke="#52525b" markerEnd="url(#ar)" />

        <rect x="94" y="8" width="84" height="20" rx="4" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="136" y="21" textAnchor="middle" fill="#a1a1aa">write-ahead log</text>
        <rect x="94" y="36" width="84" height="20" rx="4" fill="rgba(168,85,247,.12)" stroke="#8E2DE2" />
        <text x="136" y="49" textAnchor="middle" fill="#e4e4e7">memtable</text>
        <path fill="none" d="M136 60 V72" stroke="#52525b" markerEnd="url(#ar)" />
        <text x="146" y="69" fill="#52525b" fontSize="6.5">flush</text>

        {[
          ["L0", 76, 2],
          ["L1", 96, 4],
          ["L2", 116, 6],
        ].map(([level, y, n]) => (
          <g key={level as string}>
            <text x="86" y={(y as number) + 10} textAnchor="end" fill="#71717a" fontSize="7">{level}</text>
            {Array.from({ length: n as number }, (_, i) => (
              <rect
                key={i}
                x={94 + i * (84 / (n as number))}
                y={y as number}
                width={84 / (n as number) - 2}
                height="14"
                rx="2"
                fill="rgba(168,85,247,.16)"
                stroke="#A855F7"
              />
            ))}
          </g>
        ))}
        <path fill="none" d="M182 83 C194 83 194 103 182 103" stroke="#52525b" markerEnd="url(#ar)" />
        <path fill="none" d="M182 103 C194 103 194 123 182 123" stroke="#52525b" markerEnd="url(#ar)" />
        <text x="198" y="106" fill="#52525b" fontSize="6.5">compaction</text>

        <rect x="244" y="8" width="132" height="48" rx="5" fill="rgba(251,191,36,.06)" stroke="#fbbf24" strokeDasharray="3 3" />
        <text x="310" y="22" textAnchor="middle" fill="#fcd34d">simulated filesystem</text>
        <text x="310" y="34" textAnchor="middle" fill="#71717a" fontSize="7">power lost at a seeded byte,</text>
        <text x="310" y="44" textAnchor="middle" fill="#71717a" fontSize="7">unsynced renames dropped</text>

        <rect x="244" y="70" width="132" height="34" rx="5" fill="rgba(52,211,153,.08)" stroke="#34d399" />
        <text x="310" y="84" textAnchor="middle" fill="#a7f3d0">after every step:</text>
        <text x="310" y="96" textAnchor="middle" fill="#a7f3d0">db == reference model</text>

        <text x="310" y="126" textAnchor="middle" fill="#A855F7" fontSize="7">+ 200 kill -9 rounds per CI run</text>
      </g>
      <Arrows />
    </svg>
  );
}

export function ArxivDiagram() {
  return (
    <svg
      viewBox="0 0 380 150"
      className="w-full"
      role="img"
      aria-label="A question goes to a ReAct agent. Its search tool retrieves 20 candidates by embedding search and reranks them to 5 with a cross-encoder. The answer's citations are checked against the retrieved passages, and the answer streams to the client over Server-Sent Events"
    >
      <g fontFamily="'JetBrains Mono',monospace" fontSize="8">
        <rect x="4" y="58" width="58" height="24" rx="5" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="33" y="73" textAnchor="middle" fill="#a1a1aa">question</text>
        <path fill="none" d="M66 70 H84" stroke="#52525b" markerEnd="url(#ar)" />

        <rect x="88" y="52" width="74" height="36" rx="5" fill="rgba(168,85,247,.14)" stroke="#A855F7" />
        <text x="125" y="67" textAnchor="middle" fill="#e4e4e7" fontWeight="700">ReAct agent</text>
        <text x="125" y="79" textAnchor="middle" fill="#A855F7" fontSize="7">4 tools</text>

        <path fill="none" d="M166 62 C178 62 178 20 190 20" stroke="#52525b" markerEnd="url(#ar)" />
        <text x="160" y="36" fill="#52525b" fontSize="6.5">search</text>
        <rect x="194" y="10" width="100" height="20" rx="4" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="244" y="23" textAnchor="middle" fill="#a1a1aa">embedding · top 20</text>
        <path fill="none" d="M244 34 V40" stroke="#52525b" markerEnd="url(#ar)" />
        <rect x="194" y="44" width="100" height="20" rx="4" fill="rgba(168,85,247,.10)" stroke="#8E2DE2" />
        <text x="244" y="57" textAnchor="middle" fill="#e4e4e7">cross-encoder · top 5</text>
        <text x="300" y="57" fill="#A855F7" fontSize="7">+0.164 MRR@5</text>

        <path fill="none" d="M166 78 C178 78 178 108 190 108" stroke="#52525b" markerEnd="url(#ar)" />
        <rect x="194" y="98" width="100" height="20" rx="4" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="244" y="111" textAnchor="middle" fill="#a1a1aa">answer [1] [2]</text>
        <path fill="none" d="M298 108 H312" stroke="#52525b" markerEnd="url(#ar)" />
        <rect x="316" y="92" width="60" height="32" rx="5" fill="rgba(52,211,153,.08)" stroke="#34d399" />
        <text x="346" y="105" textAnchor="middle" fill="#a7f3d0">citations</text>
        <text x="346" y="116" textAnchor="middle" fill="#a7f3d0">checked</text>
        <path fill="none" d="M244 64 V94" stroke="#A855F7" strokeDasharray="3 3" markerEnd="url(#arA)" />

        <text x="244" y="138" textAnchor="middle" fill="#52525b" fontSize="7">streamed over SSE from FastAPI</text>
      </g>
      <Arrows />
    </svg>
  );
}

export function TsGuardDiagram() {
  const rows: [string, string, number, string, string][] = [
    ["random scores", "point adjust F1", 0.77, "#fbbf24", "0.77"],
    ["random scores", "event-level AUC-PR", 0.044, "#71717a", "0.04"],
    ["z-score model", "event-level AUC-PR", 0.7, "#A855F7", "0.70"],
  ];
  return (
    <svg
      viewBox="0 0 380 150"
      className="w-full"
      role="img"
      aria-label="Bar chart on the 28 SMD machines: uniform random scores reach an F1 of 0.77 under point adjust but an event-level AUC-PR of 0.04, while the headline z-score model reaches an event-level AUC-PR of 0.70"
    >
      <g fontFamily="'JetBrains Mono',monospace" fontSize="8">
        <text x="4" y="12" fill="#52525b" fontSize="7">SMD, mean of 28 machines</text>
        {rows.map(([who, metric, value, color, label], i) => {
          const y = 24 + i * 36;
          return (
            <g key={i}>
              <text x="4" y={y + 9} fill="#a1a1aa">{who}</text>
              <text x="4" y={y + 19} fill="#52525b" fontSize="7">{metric}</text>
              <rect
                x="112"
                y={y + 2}
                width={value * 220}
                height="16"
                rx="2"
                fill={i === 0 ? "rgba(251,191,36,.10)" : "rgba(168,85,247,.16)"}
                stroke={color}
                strokeDasharray={i === 0 ? "3 3" : undefined}
              />
              <text x={116 + value * 220} y={y + 14} fill={color}>{label}</text>
            </g>
          );
        })}
        <text x="4" y="140" fill="#52525b" fontSize="7">thresholds and the headline model chosen without test labels</text>
      </g>
    </svg>
  );
}

export function QuarryDiagram() {
  return (
    <svg
      viewBox="0 0 380 150"
      className="w-full"
      role="img"
      aria-label="SQL text is parsed and bound, then rewritten by optimizer rules into a physical plan. Pull-based operators run the plan over Arrow batches read from Parquet files, and joins and aggregations spill to disk under a memory limit. DuckDB runs the same SQL on the same files as the reference, and every result is compared"
    >
      <g fontFamily="'JetBrains Mono',monospace" fontSize="8">
        <rect x="4" y="8" width="44" height="36" rx="5" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="26" y="29" textAnchor="middle" fill="#a1a1aa">SQL</text>
        <path fill="none" d="M52 26 h8" stroke="#52525b" markerEnd="url(#ar)" />

        <rect x="64" y="8" width="72" height="36" rx="5" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="100" y="24" textAnchor="middle" fill="#a1a1aa">parse</text>
        <text x="100" y="35" textAnchor="middle" fill="#a1a1aa">+ bind</text>
        <path fill="none" d="M140 26 h8" stroke="#52525b" markerEnd="url(#ar)" />

        <rect x="152" y="8" width="88" height="36" rx="5" fill="rgba(168,85,247,.10)" stroke="#8E2DE2" />
        <text x="196" y="24" textAnchor="middle" fill="#e4e4e7">optimizer</text>
        <text x="196" y="35" textAnchor="middle" fill="#71717a" fontSize="7">rules + costs</text>
        <path fill="none" d="M244 26 h8" stroke="#52525b" markerEnd="url(#ar)" />

        <rect x="256" y="8" width="120" height="48" rx="5" fill="rgba(168,85,247,.16)" stroke="#A855F7" />
        <text x="316" y="24" textAnchor="middle" fill="#e4e4e7" fontWeight="700">operators</text>
        <text x="316" y="36" textAnchor="middle" fill="#A855F7" fontSize="7">pulled by their parent</text>
        <text x="316" y="47" textAnchor="middle" fill="#71717a" fontSize="7">over Arrow batches</text>

        <path fill="none" d="M270 60 V72" stroke="#52525b" strokeDasharray="3 3" markerEnd="url(#ar)" />
        <rect x="186" y="76" width="90" height="26" rx="4" fill="rgba(251,191,36,.08)" stroke="#fbbf24" strokeDasharray="3 3" />
        <text x="231" y="87" textAnchor="middle" fill="#fcd34d">spill to disk</text>
        <text x="231" y="97" textAnchor="middle" fill="#71717a" fontSize="7">under a memory limit</text>

        <path fill="none" d="M340 76 V60" stroke="#52525b" markerEnd="url(#ar)" />
        <rect x="292" y="76" width="84" height="26" rx="4" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="334" y="93" textAnchor="middle" fill="#a1a1aa">Parquet files</text>

        <text x="90" y="92" textAnchor="middle" fill="#52525b" fontSize="7">vectorized · hash joins</text>

        <rect x="4" y="110" width="372" height="34" rx="5" fill="rgba(52,211,153,.08)" stroke="#34d399" strokeDasharray="3 3" />
        <text x="190" y="124" textAnchor="middle" fill="#a7f3d0">reference: DuckDB runs the same SQL on the same files</text>
        <text x="190" y="136" textAnchor="middle" fill="#71717a" fontSize="7">results compared on every test query and on seeded random queries</text>
      </g>
      <Arrows />
    </svg>
  );
}

export function CollabDocsDiagram() {
  const clients: [string, string, number][] = [
    ["TipTap + Y.Doc", "IndexedDB copy", 10],
    ["editor", "live cursors", 44],
    ["viewer", "read-only", 78],
  ];
  return (
    <svg
      viewBox="0 0 380 150"
      className="w-full"
      role="img"
      aria-label="Browser editors and read-only viewers hold a Yjs document and sync with a Socket.IO collab server, which checks the token and the role on every event and keeps a Y.Doc per open document. The server appends each update to a PostgreSQL update log that is compacted into snapshots, and a Redis relay carries updates between collab instances"
    >
      <g fontFamily="'JetBrains Mono',monospace" fontSize="8">
        {clients.map(([title, sub, y]) => (
          <g key={title}>
            <rect x="4" y={y} width="78" height="28" rx="5" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
            <text x="43" y={y + 12} textAnchor="middle" fill="#a1a1aa">{title}</text>
            <text x="43" y={y + 22} textAnchor="middle" fill="#52525b" fontSize="6.5">{sub}</text>
            <path fill="none" d={`M86 ${y + 11} H112`} stroke="#52525b" markerEnd="url(#ar)" />
            <path fill="none" d={`M112 ${y + 18} H86`} stroke="#52525b" markerEnd="url(#ar)" />
          </g>
        ))}
        <text x="99" y="130" textAnchor="middle" fill="#52525b" fontSize="6.5">WebSocket</text>

        <rect x="116" y="10" width="116" height="62" rx="5" fill="rgba(168,85,247,.16)" stroke="#A855F7" />
        <text x="174" y="25" textAnchor="middle" fill="#e4e4e7" fontWeight="700">Socket.IO server</text>
        <text x="174" y="39" textAnchor="middle" fill="#A855F7" fontSize="7">token + role checked</text>
        <text x="174" y="49" textAnchor="middle" fill="#A855F7" fontSize="7">on every event</text>
        <text x="174" y="63" textAnchor="middle" fill="#71717a" fontSize="7">Y.Doc per open document</text>

        <path fill="none" d="M236 30 H264" stroke="#52525b" markerEnd="url(#ar)" />
        <rect x="268" y="10" width="108" height="40" rx="5" fill="rgba(168,85,247,.10)" stroke="#8E2DE2" />
        <text x="322" y="26" textAnchor="middle" fill="#e4e4e7" fontWeight="700">PostgreSQL</text>
        <text x="322" y="38" textAnchor="middle" fill="#71717a" fontSize="7">update log → snapshots</text>

        <rect x="116" y="96" width="116" height="24" rx="5" fill="rgba(255,255,255,.03)" stroke="#3f3f46" strokeDasharray="3 3" />
        <text x="174" y="111" textAnchor="middle" fill="#71717a">another instance</text>
        <path fill="none" d="M236 68 L264 84" stroke="#52525b" markerEnd="url(#ar)" />
        <path fill="none" d="M236 108 L264 96" stroke="#52525b" markerEnd="url(#ar)" />
        <rect x="268" y="74" width="108" height="32" rx="5" fill="rgba(251,191,36,.08)" stroke="#fbbf24" />
        <text x="322" y="88" textAnchor="middle" fill="#fcd34d">Redis</text>
        <text x="322" y="99" textAnchor="middle" fill="#71717a" fontSize="7">relay between instances</text>

        <text x="248" y="136" textAnchor="middle" fill="#52525b" fontSize="7">load-tested on loopback, one instance</text>
      </g>
      <Arrows />
    </svg>
  );
}

export function TailorDiagram() {
  return (
    <svg
      viewBox="0 0 380 150"
      className="w-full"
      role="img"
      aria-label="A job description goes to entry selection, then to a rewrite of each bullet from the facts it cites in the fact bank. The verifier gate checks every rewrite against those facts: a bullet that passes goes to the one-page PDF, and one that fails is rewritten once and checked again. If it fails again, the bank's own sentence is used instead"
    >
      <g fontFamily="'JetBrains Mono',monospace" fontSize="8">
        <rect x="4" y="8" width="44" height="36" rx="5" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="26" y="29" textAnchor="middle" fill="#a1a1aa">JD</text>
        <path fill="none" d="M52 26 h8" stroke="#52525b" markerEnd="url(#ar)" />

        <rect x="64" y="8" width="72" height="36" rx="5" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="100" y="24" textAnchor="middle" fill="#a1a1aa">select</text>
        <text x="100" y="35" textAnchor="middle" fill="#a1a1aa">entries</text>
        <path fill="none" d="M140 26 h8" stroke="#52525b" markerEnd="url(#ar)" />

        <rect x="152" y="8" width="72" height="36" rx="5" fill="rgba(255,255,255,.04)" stroke="#3f3f46" />
        <text x="188" y="24" textAnchor="middle" fill="#a1a1aa">rewrite</text>
        <text x="188" y="35" textAnchor="middle" fill="#71717a" fontSize="7">cites fact ids</text>
        <path fill="none" d="M228 26 h8" stroke="#52525b" markerEnd="url(#ar)" />

        <rect x="240" y="8" width="136" height="36" rx="5" fill="rgba(168,85,247,.16)" stroke="#A855F7" />
        <text x="308" y="24" textAnchor="middle" fill="#e4e4e7" fontWeight="700">verifier gate</text>
        <text x="308" y="35" textAnchor="middle" fill="#A855F7" fontSize="7">bullet vs. the facts it cites</text>

        <rect x="4" y="62" width="100" height="26" rx="4" fill="rgba(251,191,36,.08)" stroke="#fbbf24" />
        <text x="54" y="73" textAnchor="middle" fill="#fcd34d">fact bank</text>
        <text x="54" y="83" textAnchor="middle" fill="#71717a" fontSize="7">every bullet cites it</text>
        <path fill="none" d="M80 62 V48" stroke="#52525b" strokeDasharray="3 3" markerEnd="url(#ar)" />

        <path fill="none" d="M285 44 V58" stroke="#52525b" markerEnd="url(#ar)" />
        <text x="290" y="55" fill="#71717a" fontSize="6.5">fails</text>
        <rect x="240" y="62" width="90" height="26" rx="4" fill="rgba(168,85,247,.10)" stroke="#8E2DE2" />
        <text x="285" y="73" textAnchor="middle" fill="#e4e4e7">retry once</text>
        <text x="285" y="83" textAnchor="middle" fill="#71717a" fontSize="7">gate checks it again</text>

        <path fill="none" d="M238 75 H224" stroke="#52525b" markerEnd="url(#ar)" />
        <rect x="120" y="62" width="100" height="26" rx="4" fill="rgba(251,191,36,.08)" stroke="#fbbf24" strokeDasharray="3 3" />
        <text x="170" y="73" textAnchor="middle" fill="#fcd34d">bank&apos;s own sentence</text>
        <text x="170" y="83" textAnchor="middle" fill="#71717a" fontSize="7">if the retry fails too</text>

        <path fill="none" d="M362 44 V104" stroke="#52525b" markerEnd="url(#ar)" />
        <text x="359" y="78" textAnchor="end" fill="#71717a" fontSize="6.5">passes</text>
        <path fill="none" d="M285 88 V104" stroke="#52525b" markerEnd="url(#ar)" />
        <path fill="none" d="M170 88 V104" stroke="#52525b" markerEnd="url(#ar)" />

        <rect x="4" y="108" width="372" height="34" rx="5" fill="rgba(52,211,153,.08)" stroke="#34d399" />
        <text x="190" y="122" textAnchor="middle" fill="#a7f3d0">one-page PDF</text>
        <text x="190" y="134" textAnchor="middle" fill="#71717a" fontSize="7">every bullet passed the verifier or is the bank&apos;s own sentence</text>
      </g>
      <Arrows />
    </svg>
  );
}

export const DIAGRAMS = {
  ehr: EhrDiagram,
  pipeci: PipeCiDiagram,
  medtriage: MedTriageDiagram,
  cairn: CairnDiagram,
  nano: NanoDiagram,
  jobqueue: JobQueueDiagram,
  shale: ShaleDiagram,
  arxiv: ArxivDiagram,
  tsguard: TsGuardDiagram,
  quarry: QuarryDiagram,
  collabdocs: CollabDocsDiagram,
  tailor: TailorDiagram,
} as const;
