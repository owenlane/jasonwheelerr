import type { InquiryIntent } from "./site";

/** Form field contract. Field meaning is fixed by the Design Report. */
export const REPLY_PREFERENCES = ["Email", "Phone Call", "Text"] as const;
export type ReplyPreference = (typeof REPLY_PREFERENCES)[number];

export type Inquiry = {
  intent: InquiryIntent;
  name: string;
  email: string;
  phone?: string;
  replyPreference: ReplyPreference;
  message?: string;
};

export const MAX_FIELD_LENGTH = 2000;
export const MAX_PAYLOAD_BYTES = 16_000;
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const INTENT_LABEL: Record<InquiryIntent, string> = {
  buyer: "Buying",
  seller: "Selling",
  investor: "Investing",
  "property-help": "Property Help",
  general: "Something Else",
};
