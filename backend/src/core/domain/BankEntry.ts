export type BankEntryId = string;
export type ShipId = string;

/**
 * Banked surplus/deficit entry for later years.
 * Amount units are domain-defined (typically "compliance balance" units).
 */
export interface BankEntry {
  bankEntryId: BankEntryId;
  shipId: ShipId;
  year: number;

  /**
   * Positive for surplus banked, negative for deficit carried.
   */
  amount: number;

  /**
   * ISO-8601 timestamp (e.g. "2026-03-12T10:15:00Z").
   */
  createdAt: string;
}

