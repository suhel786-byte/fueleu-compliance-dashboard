export type ShipId = string;

/**
 * Compliance snapshot for a given ship and year.
 *
 * Formula context:
 * - Energy = fuelConsumption × 41000
 * - ComplianceBalance = (targetIntensity − ghgIntensity) × Energy
 */
export interface ShipCompliance {
  shipId: ShipId;
  year: number;

  targetIntensity: number;
  ghgIntensity: number;

  fuelConsumption: number;

  /**
   * Derived value; may be persisted for traceability.
   * Energy = fuelConsumption × 41000
   */
  energy: number;

  /**
   * Derived value; may be persisted for traceability.
   * ComplianceBalance = (targetIntensity − ghgIntensity) × energy
   */
  complianceBalance: number;
}

export const FUELEU_ENERGY_FACTOR = 41000;

export function computeEnergyFromFuelConsumption(fuelConsumption: number): number {
  return fuelConsumption * FUELEU_ENERGY_FACTOR;
}

export function computeComplianceBalance(params: {
  targetIntensity: number;
  ghgIntensity: number;
  fuelConsumption: number;
}): { energy: number; complianceBalance: number } {
  const energy = computeEnergyFromFuelConsumption(params.fuelConsumption);
  const complianceBalance = (params.targetIntensity - params.ghgIntensity) * energy;
  return { energy, complianceBalance };
}

