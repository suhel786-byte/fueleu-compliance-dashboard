import type { Route } from "../domain/Route";

const TARGET_INTENSITY = 89.3368;

export interface ComputeComparisonInput {
  baselineRoute: Route;
  comparisonRoute: Route;
}

export interface ComputeComparisonResult {
  percentDiff: number;
  compliant: boolean;
}

export function computeComparison(
  input: ComputeComparisonInput,
): ComputeComparisonResult {
  const baseline = input.baselineRoute.ghgIntensity;
  const comparison = input.comparisonRoute.ghgIntensity;

  const percentDiff = ((comparison / baseline) - 1) * 100;
  const compliant = comparison <= TARGET_INTENSITY;

  return { percentDiff, compliant };
}

