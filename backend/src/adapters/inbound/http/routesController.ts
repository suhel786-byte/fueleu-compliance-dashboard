import type { Router, Request, Response, NextFunction } from "express";
import type { Route } from "../../../core/domain/Route";
import { computeComparison } from "../../../core/application/ComputeComparison";
import { pool } from "../../../db";

export type RoutesControllerDeps = {
  router: Router;
};

let baselineRouteId: string | null = null;

export function createRoutesController({ router }: RoutesControllerDeps): Router {

  /**
   * GET /routes
   */
  router.get("/routes", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await pool.query("SELECT * FROM routes");

      const routes: Route[] = result.rows.map((row: any) => ({
        routeId: row.route_id,
        vesselType: row.vessel_type,
        fuelType: row.fuel_type,
        year: row.year,
        ghgIntensity: row.ghg_intensity,
        fuelConsumption: 0,
        distance: 0,
        totalEmissions: 0,
        isBaseline: row.route_id === baselineRouteId,
      }));

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
        const { id } = req.params as { id: string };

        baselineRouteId = id;

        res.status(200).json({ message: "Baseline route updated" });
      } catch (err) {
        next(err);
      }
    }
  );

  /**
   * GET /routes/comparison
   */
  router.get(
    "/routes/comparison",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await pool.query("SELECT * FROM routes");

        const routes: Route[] = result.rows.map((row: any) => ({
          routeId: row.route_id,
          vesselType: row.vessel_type,
          fuelType: row.fuel_type,
          year: row.year,
          ghgIntensity: row.ghg_intensity,
          fuelConsumption: 0,
          distance: 0,
          totalEmissions: 0,
          isBaseline: row.route_id === baselineRouteId,
        }));

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
    }
  );

  return router;
}
