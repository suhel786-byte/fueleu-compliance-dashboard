import express from "express";
import cors from "cors";

import { createComplianceController } from "../../adapters/inbound/http/complianceController";
import { createBankingController } from "../../adapters/inbound/http/bankingController";
import { createPoolController } from "../../adapters/inbound/http/poolController";
import { createRoutesController } from "../../adapters/inbound/http/routesController";

const app = express();

app.use(cors());
app.use(express.json());

/**
 * Health Check
 */
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/**
 * Shared Router
 */
const router = express.Router();

/**
 * Register Controllers
 */
app.use(createComplianceController({ router }));
app.use(createBankingController({ router }));
app.use(createPoolController({ router }));
app.use(createRoutesController({ router }));

/**
 * Start Server
 */
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});