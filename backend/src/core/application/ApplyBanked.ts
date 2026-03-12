export interface ApplyBankedInput {
  deficitCB: number;
  bankedAmount: number;
}

export interface ApplyBankedResult {
  applied: number;
  remainingDeficit: number;
  remainingBanked: number;
}


export function applyBanked(input: ApplyBankedInput): ApplyBankedResult {
  const { deficitCB, bankedAmount } = input;

  // Only deficits (negative CB) can be covered.
  const deficit = deficitCB < 0 ? -deficitCB : 0;

  const applied = Math.min(deficit, Math.max(bankedAmount, 0));

  const remainingDeficit = deficit - applied;
  const remainingBanked = bankedAmount - applied;

  // Return deficit back as a negative number to stay in CB units.
  const signedRemainingDeficit = remainingDeficit === 0 ? 0 : -remainingDeficit;

  return {
    applied,
    remainingDeficit: signedRemainingDeficit,
    remainingBanked,
  };
}

