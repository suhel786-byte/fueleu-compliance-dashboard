export type PoolId = string;
export type ShipId = string;

export interface PoolMember {
  poolId: PoolId;
  shipId: ShipId;

  /**
   * Compliance balance before pooling allocation.
   */
  cbBefore: number;

  /**
   * Compliance balance after pooling allocation.
   */
  cbAfter: number;
}

