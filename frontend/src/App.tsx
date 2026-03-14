import { useState, useEffect } from "react";

const API = "http://localhost:3000";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;500;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #020c14;
    --surface: #071828;
    --surface2: #0b2235;
    --border: rgba(0, 200, 255, 0.12);
    --accent: #00c8ff;
    --accent2: #00ffc8;
    --accent3: #ff6b35;
    --text: #e0f4ff;
    --muted: #4a7a96;
    --danger: #ff4060;
    --success: #00ffc8;
    --glow: 0 0 30px rgba(0, 200, 255, 0.15);
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    min-height: 100vh;
  }

  .dashboard {
    min-height: 100vh;
    background: radial-gradient(ellipse 80% 60% at 50% -20%, rgba(0,200,255,0.08) 0%, transparent 60%), var(--bg);
  }

  .header {
    padding: 48px 60px 32px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .title {
    font-size: 42px;
    font-weight: 800;
    background: linear-gradient(135deg, #fff 30%, var(--accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .nav {
    display: flex;
    gap: 4px;
    padding: 24px 60px;
    border-bottom: 1px solid var(--border);
  }

  .nav-btn {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 10px 22px;
    border-radius: 6px;
    border: 1px solid transparent;
    cursor: pointer;
    background: transparent;
    color: var(--muted);
  }

  .nav-btn.active {
    background: rgba(0, 200, 255, 0.08);
    border-color: rgba(0, 200, 255, 0.3);
    color: var(--accent);
  }

  .content { padding: 40px 60px; }

  .section-title {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .data-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 6px;
  }

  .data-table thead th {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    padding: 0 24px 12px;
    text-align: left;
  }

  .data-table tbody tr {
    background: var(--surface);
  }

  .data-table tbody td { padding: 18px 24px; }

  .route-id {
    font-family: 'Space Mono', monospace;
    color: var(--accent);
  }

  .btn {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    padding: 9px 18px;
    border-radius: 6px;
    cursor: pointer;
  }

  .btn-primary {
    background: rgba(0,200,255,0.12);
    color: var(--accent);
    border: 1px solid rgba(0,200,255,0.3);
  }

  .btn-success {
    background: rgba(0,255,200,0.1);
    color: var(--accent2);
    border: 1px solid rgba(0,255,200,0.3);
  }

  .btn-purple {
    background: rgba(150,80,255,0.12);
    color: #b47fff;
    border: 1px solid rgba(150,80,255,0.3);
    padding: 12px 28px;
  }

  .form-input {
    width: 100%;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 14px 18px;
    color: var(--text);
    margin-bottom: 20px;
  }

  .result-card {
    margin-top: 24px;
    background: rgba(0,255,200,0.04);
    border: 1px solid rgba(0,255,200,0.2);
    border-radius: 10px;
    padding: 20px;
  }

  .badge-compliant { color: var(--success); }
  .badge-noncompliant { color: var(--danger); }
`;

export default function App() {
  const [tab, setTab] = useState("routes");
  const tabs = ["routes", "compare", "banking", "pooling"];

  return (
    <>
      <style>{styles}</style>

      <div className="dashboard">
        <header className="header">
          <h1 className="title">FuelEU Compliance</h1>
        </header>

        <nav className="nav">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`nav-btn ${tab === t ? "active" : ""}`}
            >
              {t}
            </button>
          ))}
        </nav>

        <main className="content">
          {tab === "routes" && <RoutesTab />}
          {tab === "compare" && <CompareTab />}
          {tab === "banking" && <BankingTab />}
          {tab === "pooling" && <PoolingTab />}
        </main>
      </div>
    </>
  );
}

type RouteDto = {
  routeId: string;
  ghgIntensity: number;
};

function RoutesTab() {
  const [routes, setRoutes] = useState<RouteDto[]>([]);

  useEffect(() => {
    fetch(`${API}/routes`)
      .then((r) => r.json())
      .then((d) => setRoutes(d.routes));
  }, []);

  const setBaseline = async (id: string) => {
    await fetch(`${API}/routes/${id}/baseline`, { method: "POST" });
  };

  return (
    <div>
      <h2 className="section-title">Routes</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>Route</th>
            <th>GHG</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {routes.map((r) => (
            <tr key={r.routeId}>
              <td className="route-id">{r.routeId}</td>
              <td>{r.ghgIntensity}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => setBaseline(r.routeId)}
                >
                  Set Baseline
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type ComparisonResultDto = {
  routeId: string;
  percentDiff: number;
  compliant: boolean;
};

function CompareTab() {
  const [results, setResults] = useState<ComparisonResultDto[]>([]);

  useEffect(() => {
    fetch(`${API}/routes/comparison`)
      .then((r) => r.json())
      .then((data) => setResults(data.results ?? data));
  }, []);

  return (
    <div>
      <h2 className="section-title">Route Comparison</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>Route</th>
            <th>% Diff</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r) => (
            <tr key={r.routeId}>
              <td className="route-id">{r.routeId}</td>
              <td>{r.percentDiff?.toFixed(2)}%</td>
              <td>
                {r.compliant ? (
                  <span className="badge-compliant">Compliant</span>
                ) : (
                  <span className="badge-noncompliant">Non-Compliant</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

type BankResultDto = {
  banked: number;
};

function BankingTab() {
  const [cb, setCb] = useState("");
  const [result, setResult] = useState<BankResultDto | null>(null);

  const bank = async () => {
    if (!cb) return;

    try {
      const res = await fetch(`${API}/banking/bank`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cb: Number(cb) }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Banking API error:", err);
    }
  };

  return (
    <div>
      <h2 className="section-title">Bank Compliance Surplus</h2>

      <input
        type="number"
        className="form-input"
        placeholder="Enter compliance balance"
        value={cb}
        onChange={(e) => setCb(e.target.value)}
      />

      <button className="btn btn-success" onClick={bank}>
        Bank Surplus
      </button>

      {result && (
        <div className="result-card">
          Banked Amount: {Number(result.banked).toLocaleString()}
        </div>
      )}
    </div>
  );
}

type PoolResultDto = {
  members: Array<{
    poolId: string;
    shipId: string;
    cbBefore: number;
    cbAfter: number;
  }>;
  poolCompliant: boolean;
};

function PoolingTab() {
  const [result, setResult] = useState<PoolResultDto | null>(null);

  const pool = async () => {
    const members = [
      { shipId: "R001", cb: 200000 },
      { shipId: "R002", cb: -100000 },
      { shipId: "R003", cb: -50000 },
    ];

    const res = await fetch(`${API}/pools`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ members }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div>
      <h2 className="section-title">Pooling Compliance</h2>

      <button className="btn btn-purple" onClick={pool}>
        Create Pool
      </button>

      {result && (
        <div className="result-card">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}