import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    ".next/**",
    "build/**",
    "coverage/**",
    "out/**",
    "studio/.sanity/**",
    "studio/dist/**",
    "src/lib/sanity/sanity.types.ts",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
