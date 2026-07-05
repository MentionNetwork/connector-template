import type { SiteConnector, DetectResult, Session } from "./types.js";

/**
 * Rename "example" everywhere to your platform. Implement detect() first —
 * it runs offline in every engine install and improves URL routing for everyone.
 */
export const connector: SiteConnector = {
  manifest: {
    name: "mn-connector-example",
    platform: "example",
    version: "0.1.0",
    engineApi: "^0.1.0",
    targetKinds: ["website"],
    capabilities: {
      read: ["site", "pages", "meta"],
      write: [], // e.g. ["meta.update", "content.publish"] — dryRun + rollback become REQUIRED
    },
    auth: { kind: "api_key", scopes: ["read pages and metadata"] },
  },

  async detect(url: string): Promise<DetectResult> {
    // TODO: fingerprint the platform (HTML markers, headers, URL patterns)
    void url;
    return { match: false, confidence: 0 };
  },

  async connect(credentials: Record<string, string>): Promise<Session> {
    // TODO: validate credentials against the platform API
    void credentials;
    return { platform: "example", identity: "example.com" };
  },

  read: {
    async getSite(session) {
      void session;
      return { todo: "return platform/site info" };
    },
    async getPage(session, urlOrId) {
      void session;
      return { url: String(urlOrId), html: "<!-- TODO -->", fetchedAt: new Date().toISOString() };
    },
  },
};

export default connector;
