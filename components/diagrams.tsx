/**
 * Authored architecture diagrams. keel, EHR and PipeCI have no GUI to screenshot,
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

export const DIAGRAMS = {
  ehr: EhrDiagram,
  pipeci: PipeCiDiagram,
  medtriage: MedTriageDiagram,
} as const;
