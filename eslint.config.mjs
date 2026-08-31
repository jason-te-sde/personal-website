// eslint-config-next 16 ships flat config directly. Do not route it through
// FlatCompat/@eslint/eslintrc — that combination throws on ESLint 10.
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [
  ...coreWebVitals,
  ...typescript,
  { ignores: [".next/**", "node_modules/**", "mockup/**", "next-env.d.ts"] },
];

export default config;
