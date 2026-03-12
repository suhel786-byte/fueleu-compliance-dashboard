const TARGET_INTENSITY = 89.3368;
const ENERGY_FACTOR = 41000;

export interface ComputeComplianceBalanceInput {
  fuelConsumption: number;
  ghgIntensity: number;
}

export interface ComputeComplianceBalanceResult {
  complianceBalance: number;
}


export function computeComplianceBalance(
  input: ComputeComplianceBalanceInput,
): ComputeComplianceBalanceResult {
  const energy = input.fuelConsumption * ENERGY_FACTOR;
  const complianceBalance = (TARGET_INTENSITY - input.ghgIntensity) * energy;

  return { complianceBalance };
}

