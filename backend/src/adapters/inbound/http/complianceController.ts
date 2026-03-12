import type { Router, Request, Response, NextFunction } from "express";
import {
  computeComplianceBalance,
  type ComputeComplianceBalanceInput,
} from "../../../core/application/ComputeComplianceBalance";

export type ComplianceControllerDeps = {
  router: Router;
};

export function createComplianceController({
  router,
}: ComplianceControllerDeps): Router {
  /**
   * GET /compliance/cb
   *
   * Query params:
   * - fuelConsumption
   * - ghgIntensity
   */
  router.get(
    "/compliance/cb",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const rawFuelConsumption = req.query.fuelConsumption;
        const rawGhgIntensity = req.query.ghgIntensity;

        const fuelConsumptionStr =
          typeof rawFuelConsumption === "string" ? rawFuelConsumption : "";
        const ghgIntensityStr =
          typeof rawGhgIntensity === "string" ? rawGhgIntensity : "";

        if (!fuelConsumptionStr || !ghgIntensityStr) {
          res.status(400).json({
            error: "fuelConsumption and ghgIntensity query parameters are required",
          });
          return;
        }

        const fuelConsumption = Number(fuelConsumptionStr);
        const ghgIntensity = Number(ghgIntensityStr);

        if (!Number.isFinite(fuelConsumption) || !Number.isFinite(ghgIntensity)) {
          res.status(400).json({
            error: "fuelConsumption and ghgIntensity must be valid numbers",
          });
          return;
        }

        const input: ComputeComplianceBalanceInput = {
          fuelConsumption,
          ghgIntensity,
        };

        const result = computeComplianceBalance(input);
        res.json(result);
      } catch (err) {
        next(err);
      }
    },
  );

  return router;
}

