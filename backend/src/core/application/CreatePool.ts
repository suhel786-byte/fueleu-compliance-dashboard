import type { PoolMember } from "../domain/PoolMember";

export interface CreatePoolInput {
  members: PoolMember[];
}

export interface CreatePoolResult {
  /**
   * Members with `cbAfter` set according to greedy pooling.
   */
  members: PoolMember[];

  /**
   * Whether the pool as a whole is compliant (sum of CB >= 0).
   */
  poolCompliant: boolean;
}


export function createPool(input: CreatePoolInput): CreatePoolResult {
  const originalMembers = input.members;

  const totalCb = originalMembers.reduce((sum, m) => sum + m.cbBefore, 0);
  const poolCompliant = totalCb >= 0;

  // Work on a mutable copy so we don't mutate the input objects.
  const working = originalMembers.map((m) => ({
    ...m,
    cbAfter: m.cbBefore,
  }));

  // Sort by cbBefore descending (surplus first).
  const sorted = [...working].sort((a, b) => b.cbBefore - a.cbBefore);

  const donors = sorted.filter((m) => m.cbBefore > 0);
  const receivers = sorted
    .filter((m) => m.cbBefore < 0)
    // Most negative deficits first.
    .sort((a, b) => a.cbBefore - b.cbBefore);

  // Greedily transfer surplus from donors to receivers.
  for (const receiver of receivers) {
    if (receiver.cbAfter >= 0) {
      continue;
    }

    let remainingDeficit = -receiver.cbAfter; // positive number

    for (const donor of donors) {
      if (remainingDeficit <= 0) {
        break;
      }

      if (donor.cbAfter <= 0) {
        continue;
      }

      const transferable = donor.cbAfter;
      const applied = Math.min(transferable, remainingDeficit);

      donor.cbAfter -= applied;
      remainingDeficit -= applied;

      // Deficits cannot become worse; cap at 0 so they don't turn into surplus.
      receiver.cbAfter += applied;
      if (receiver.cbAfter > 0) {
        receiver.cbAfter = 0;
        remainingDeficit = 0;
      }
    }
  }

  return {
    members: working,
    poolCompliant,
  };
}

