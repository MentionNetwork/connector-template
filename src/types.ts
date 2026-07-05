// TEMPORARY vendored copy of @mention-network/connector-sdk@0.1.0
// Replace with the npm package once published. Canonical source:
// https://github.com/MentionNetwork/visibility-engine/blob/main/packages/connector-sdk/src/index.ts

/**
 * @mention-network/connector-sdk — Apache-2.0.
 *
 * A Connector gives the engine read (audit) and optional write (apply fixes)
 * access to a platform: Shopify, WordPress, Magento, marketplaces (via seller
 * APIs), or custom sites. Platform-native products keep their native names
 * (a "Shopify App", a "WordPress Plugin") — the MN-side artifact is a connector.
 */

import type { Prescription, SubjectKind } from "./shared-types.js";

export type AuthKind = "oauth2" | "api_key" | "app_install" | "site_snippet";

export interface AuthSpec {
  kind: AuthKind;
  /** Human-readable scope list shown to the user BEFORE connecting. */
  scopes: string[];
}

export type ReadCap = "site" | "products" | "pages" | "structured_data" | "meta" | "sitemap" | "feeds";

export interface ConnectorManifest {
  /** e.g. "mn-connector-shopify" */
  name: string;
  platform: string;
  version: string;
  /** semver range of connector-sdk this connector targets. */
  engineApi: string;
  targetKinds: SubjectKind[];
  capabilities: {
    read: ReadCap[];
    /** Namespaced action types this connector can apply, e.g. "listing.update_title". */
    write: string[];
  };
  auth: AuthSpec;
}

export interface DetectResult {
  match: boolean;
  confidence: number;
  /** Extracted identity: domain, seller handle, shop id… */
  identity?: string;
}

export interface Session {
  platform: string;
  identity: string;
}

export interface PageSnapshot { url: string; html: string; fetchedAt: string }
export interface ChangePlan { prescriptionId: string; mutations: Array<{ action: string; target: string; summary: string }> }
export interface Diff { entries: Array<{ target: string; before: string; after: string }> }
export interface ApplyResult { applyId: string; applied: number }

export interface SiteConnector {
  manifest: ConnectorManifest;

  /** Fingerprint a URL — offline, free. Community connectors extend platform detection automatically. */
  detect(url: string): Promise<DetectResult>;
  connect(credentials: Record<string, string>): Promise<Session>;

  read: {
    getSite(session: Session): Promise<Record<string, unknown>>;
    getPage(session: Session, urlOrId: string): Promise<PageSnapshot>;
    listProducts?(session: Session): Promise<unknown[]>;
    getStructuredData?(session: Session, scope: string): Promise<unknown[]>;
    getMeta?(session: Session, scope: string): Promise<unknown>;
    getSitemap?(session: Session): Promise<unknown>;
  };

  /** Optional — read-only connectors are valid. If present, dryRun and rollback are REQUIRED. */
  write?: {
    plan(session: Session, rx: Prescription): Promise<ChangePlan>;
    dryRun(session: Session, plan: ChangePlan): Promise<Diff>;
    apply(session: Session, plan: ChangePlan): Promise<ApplyResult>;
    rollback(session: Session, applyId: string): Promise<void>;
  };
}
