import type { StackGroup } from "./types";

/**
 * `logos` are Simple Icons slugs. `text` covers tools whose marks Simple Icons
 * does not carry — Amazon and LinkedIn pulled theirs, and gRPC/WebSocket/ChromaDB
 * were never there. Named tools only, no concepts.
 */
export const stack: StackGroup[] = [
  { label: "Languages", logos: ["openjdk", "python", "typescript", "javascript"], text: ["SQL", "C/C++", "Bash"] },
  { label: "Backend & APIs", logos: ["spring", "fastapi", "nodedotjs", "apachekafka", "rabbitmq"], text: ["gRPC", "WebSocket"] },
  { label: "Data", logos: ["postgresql", "mysql", "mongodb", "redis", "rocksdb"], text: ["ChromaDB"] },
  {
    label: "Infrastructure",
    logos: ["docker", "kubernetes", "helm", "nginx", "githubactions", "prometheus", "grafana", "opentelemetry"],
    text: ["AWS"],
    wide: true,
  },
  { label: "Tools", logos: ["git", "linux", "apachemaven", "gradle", "claude"], text: [] },
];

/** Simple Icons slug → display label. */
export const LOGO_LABEL: Record<string, string> = {
  openjdk: "Java", python: "Python", typescript: "TypeScript", javascript: "JavaScript",
  spring: "Spring Boot", fastapi: "FastAPI", nodedotjs: "Node.js", apachekafka: "Kafka", rabbitmq: "RabbitMQ",
  postgresql: "PostgreSQL", mysql: "MySQL", mongodb: "MongoDB", redis: "Redis", rocksdb: "RocksDB",
  docker: "Docker", kubernetes: "Kubernetes", helm: "Helm", nginx: "Nginx", githubactions: "GitHub Actions",
  prometheus: "Prometheus", grafana: "Grafana", opentelemetry: "OpenTelemetry",
  git: "Git", linux: "Linux", apachemaven: "Maven", gradle: "Gradle", claude: "Claude",
  react: "React", nextdotjs: "Next.js", vite: "Vite", tailwindcss: "Tailwind",
  supabase: "Supabase", pytorch: "PyTorch",
};
