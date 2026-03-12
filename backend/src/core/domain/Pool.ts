import type { PoolMember, PoolId } from "./PoolMember";

export interface Pool {
  poolId: PoolId;
  year: number;

  /**
   * Pool members participating in this pool for the given year.
   */
  members: PoolMember[];
}

