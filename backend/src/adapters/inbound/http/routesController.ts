import type { Router, Request, Response, NextFunction } from "express";
import type { Route } from "../../../core/domain/Route";
import { computeComparison } from "../../../core/application/ComputeComparison";

export type RoutesControllerDeps = {
  router: Router;
};

let routes: Route[] = [
  {
    routeId: "R001",
    vesselType: "Container",
    fuelType: "HFO",
    year: 2024,
    ghgIntensity: 91,
    fuelConsumption: 5000,
    distance: 12000,
    totalEmissions: 450000,
    isBaseline: false,
  },
  {
    routeId: "R002",
    vesselType: "BulkCarrier",
    fuelType: "MDO",
    year: 2024,
    ghgIntensity: 88,
    fuelConsumption: 4200,
    distance: 9800,
    totalEmissions: 390000,
    isBaseline: false,
  },
  {
    routeId: "R003",
    vesselType: "Tanker",
    fuelType: "LNG",
    year: 2024,
    ghgIntensity: 93.5,
    fuelConsumption: 6100,
    distance: 14000,
    totalEmissions: 520000,
    isBaseline: false,
  },
];

export function createRoutesController({ router }: RoutesControllerDeps): Router {

  /**
   * GET /routes
   */
  router.get("/routes", async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ routes });
    } catch (err) {
      next(err);
    }
  });

  /**
   * POST /routes/:id/baseline
   */
  router.post(
    "/routes/:id/baseline",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;

        routes = routes.map((r) => ({
          ...r,
          isBaseline: r.routeId === id,
        }));

        res.status(200).json({ message: "Baseline route updated" });
      } catch (err) {
        next(err);
      }
    },
  );

  /**
   * GET /routes/comparison
   */
  router.get(
    "/routes/comparison",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const baseline = routes.find((r) => r.isBaseline);

        if (!baseline) {
          res.status(400).json({ error: "No baseline route selected" });
          return;
        }

        const results = routes.map((route) => ({
          routeId: route.routeId,
          ...computeComparison({
            baselineRoute: baseline,
            comparisonRoute: route,
          }),
        }));

        res.json(results);
      } catch (err) {
        next(err);
      }
    },
  );

  return router;
}