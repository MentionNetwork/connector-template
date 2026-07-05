// Smoke harness: loads the built connector and sanity-checks the contract.
import connector from "../dist/index.js";

const m = connector.manifest;
const fail = (msg) => { console.error(`✗ ${msg}`); process.exit(1); };

if (!/^mn-connector-[a-z0-9-]+$/.test(m.name)) fail(`manifest.name must match mn-connector-<platform>, got "${m.name}"`);
if (connector.write && (!connector.write.dryRun || !connector.write.rollback)) fail("write requires dryRun + rollback");
const r = await connector.detect("https://example.com");
if (typeof r.match !== "boolean") fail("detect() must return { match: boolean, ... }");
console.log(`✓ ${m.name} — manifest valid, detect() answers, write rules satisfied`);
