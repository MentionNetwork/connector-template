// Minimal subset of @mention-network/shared needed by a connector (vendored, temporary).
export type SubjectKind =
  | "website" | "marketplace_store" | "marketplace_product" | "local_business"
  | "social_profile" | "app_listing" | "directory_listing" | "no_url";
export interface PrescriptionAction { type: string; target: string; payload: unknown }
export interface Prescription {
  id: string; schemaVersion: string;
  subject: { kind: SubjectKind; identity: string };
  actions: PrescriptionAction[]; createdAt: string;
}
