# mn-connector-template

Build a **connector** for Mention Network's [visibility-engine](https://github.com/MentionNetwork/visibility-engine): read (audit) and optionally write (apply fixes) access to a platform — Joomla, Magento, Wix, a marketplace seller API, or your own stack.

> Naming note: platform-native products keep their native names (a Shopify **App**, a WordPress **Plugin**). The engine-side artifact is always a *connector*.

## Quickstart

1. Click **"Use this template"** → name your repo `mn-connector-<platform>`
2. Fill `src/manifest.ts` — platform, capabilities, auth (users see & approve capabilities before connecting)
3. Implement `detect()` first (URL fingerprint — this alone improves the whole ecosystem's URL detection), then `read`, then optionally `write`
4. `npm install && npm run typecheck && npm test`
5. Publish to npm as `mn-connector-<platform>` and submit to the [registry](https://github.com/MentionNetwork/registry)

## Iron rules for `write`

- Declare every action type in `manifest.capabilities.write` — undeclared mutations are rejected
- `dryRun` (diff preview) and `rollback` are **required** if `write` exists
- Never persist credentials outside the local session

## SDK types

`src/types.ts` is a **temporary vendored copy** of `@mention-network/connector-sdk@0.1.0`. Once the SDK is published to npm, replace it with the real dependency (one import path change).
