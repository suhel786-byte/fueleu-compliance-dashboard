export interface BankSurplusInput {
  cb: number;
}

export interface BankSurplusResult {
  banked: number;
}


export function bankSurplus(input: BankSurplusInput): BankSurplusResult {
  const banked = input.cb > 0 ? input.cb : 0;
  return { banked };
}

