import type { Router, Request, Response, NextFunction } from "express";
import type { PoolMember } from "../../../core/domain/PoolMember";
import {
  createPool,
  type CreatePoolInput,
} from "../../../core/application/CreatePool";

export type PoolControllerDeps = {
  router: Router;
};

interface PoolMemberRequestDto {
  shipId: string;
  cb: number;
  poolId?: string;
}

export function createPoolController({ router }: PoolControllerDeps): Router {
  
  router.post(
    "/pools",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { members } = req.body as { members?: PoolMemberRequestDto[] };

        if (!Array.isArray(members) || members.length === 0) {
          res.status(400).json({ error: "members must be a non-empty array" });
          return;
        }

        const poolMembers: PoolMember[] = members.map((m, index) => {
          if (
            !m ||
            typeof m.shipId !== "string" ||
            typeof m.cb !== "number" ||
            !Number.isFinite(m.cb)
          ) {
            throw new Error(
              `Invalid member at index ${index}: shipId (string) and cb (number) are required`,
            );
          }

          const poolId = m.poolId ?? "POOL";

          return {
            poolId,
            shipId: m.shipId,
            cbBefore: m.cb,
            cbAfter: m.cb,
          };
        });

        const input: CreatePoolInput = { members: poolMembers };
        const result = createPool(input);

        res.status(200).json(result);
      } catch (err) {
        if (err instanceof Error) {
          res.status(400).json({ error: err.message });
          return;
        }

        next(err);
      }
    },
  );

  return router;
}

