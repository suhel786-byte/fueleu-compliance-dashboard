import type { Router, Request, Response, NextFunction } from "express";
import {
  bankSurplus,
  type BankSurplusInput,
} from "../../../core/application/BankSurplus";
import {
  applyBanked,
  type ApplyBankedInput,
} from "../../../core/application/ApplyBanked";

export type BankingControllerDeps = {
  router: Router;
};

export function createBankingController({
  router,
}: BankingControllerDeps): Router {
  /**
   * POST /banking/bank
   *
   * Body:
   * {
   *   "cb": number
   * }
   *
   * Rule:
   * Only positive compliance balance can be banked.
   * (Enforced by the bankSurplus use-case.)
   */
  router.post(
    "/banking/bank",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { cb } = req.body as { cb?: unknown };

        if (typeof cb !== "number" || !Number.isFinite(cb)) {
          res.status(400).json({ error: "cb must be a valid number" });
          return;
        }

        const input: BankSurplusInput = { cb };
        const result = bankSurplus(input);

        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    },
  );

  /**
   * POST /banking/apply
   *
   * Body:
   * {
   *   "deficit": number,
   *   "bankedAmount": number
   * }
   *
   * Rule:
   * Apply banked surplus to deficit using applyBanked use-case.
   */
  router.post(
    "/banking/apply",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { deficit, bankedAmount } = req.body as {
          deficit?: unknown;
          bankedAmount?: unknown;
        };

        if (typeof deficit !== "number" || !Number.isFinite(deficit)) {
          res.status(400).json({ error: "deficit must be a valid number" });
          return;
        }

        if (
          typeof bankedAmount !== "number" ||
          !Number.isFinite(bankedAmount)
        ) {
          res
            .status(400)
            .json({ error: "bankedAmount must be a valid number" });
          return;
        }

        const input: ApplyBankedInput = {
          deficitCB: deficit,
          bankedAmount,
        };

        const result = applyBanked(input);
        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    },
  );

  return router;
}

