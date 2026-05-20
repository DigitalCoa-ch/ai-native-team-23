"use client";

import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface IntakeData {
  brand: string;
  product: string;
  audience: string;
  painPoints: string;
  voice: string;
  goal: string;
  platform: string;
}

interface AdMetric {
  id: string;
  copy: string;
  ctr: number;
  clicks: number;
  cpc: number;
}

interface AIDiagnosis {
  reasoning: string;
  winner: string;
  reason: string;
}

interface AdVariant {
  id: string;
  headline: string;
  copy: string;
  ctr: number;
  cpc: number;
  riskFlags: string[];
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────
const DUMMY_ADS: AdMetric[] = [
  { id: "ad1", copy: "Unlock Your Best Self – Limited Time Offer!", ctr: 2.4, clicks: 1240, cpc: 0.82 },
  { id: "ad2", copy: "Join 50,000+ Members Who Transformed Their Lives", ctr: 1.8, clicks: 890, cpc: 1.15 },
  { id: "ad3", copy: "Try Free for 30 Days. Cancel Anytime.", ctr: 3.1, clicks: 2100, cpc: 0.67 },
];

// ─── Components ───────────────────────────────────────────────────────────────

function IntakeForm({ onAnalyze }: { onAnalyze: (data: IntakeData) => void }) {
  const [form, setForm] = useState<IntakeData>({
    brand: "",
    product: "",
    audience: "",
    painPoints: "",
    voice: "",
    goal: "",
    platform: "",
  });

  const handleChange = (field: keyof IntakeData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(form);
  };

  const fields: { key: keyof IntakeData; label: string; placeholder: string }[] = [
    { key: "brand", label: "Brand Name", placeholder: "e.g. TurboBoost Energy" },
    { key: "product", label: "Product / Service", placeholder: "e.g. Pre-workout supplement" },
    { key: "audience", label: "Target Audience", placeholder: "e.g. Active adults 25-45" },
    { key: "painPoints", label: "Pain Points", placeholder: "e.g. Low energy, afternoon crash" },
    { key: "voice", label: "Brand Voice", placeholder: "e.g. Bold, confident, witty" },
    { key: "goal", label: "Campaign Goal", placeholder: "e.g. Drive sign-ups, boost sales" },
    { key: "platform", label: "Primary Platform", placeholder: "e.g. Instagram, Google Ads, TikTok" },
  ];

  return (
    <section className="w-full">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
          Campaign Intake Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {fields.map(({ key, label, placeholder }) => (
              <div key={key} className="flex flex-col gap-2">
                <label
                  htmlFor={key}
                  className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
                >
                  {label}
                </label>
                <input
                  id={key}
                  type="text"
                  value={form[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={placeholder}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-sm"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full mt-4 px-6 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-colors shadow-sm"
          >
            Analyze Campaign
          </button>
        </form>
      </div>
    </section>
  );
}

function MetricComparison({ ads }: { ads: AdMetric[] }) {
  return (
    <section className="w-full mt-8">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
          Metric Comparison Engine
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <th className="text-left py-3 px-4 font-semibold text-zinc-600 dark:text-zinc-400">Ad Copy</th>
                <th className="text-center py-3 px-4 font-semibold text-zinc-600 dark:text-zinc-400">CTR %</th>
                <th className="text-center py-3 px-4 font-semibold text-zinc-600 dark:text-zinc-400">Clicks</th>
                <th className="text-center py-3 px-4 font-semibold text-zinc-600 dark:text-zinc-400">CPC ($)</th>
                <th className="text-center py-3 px-4 font-semibold text-zinc-600 dark:text-zinc-400">Score</th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad, i) => {
                const score = ((ad.ctr * 0.4 + (ad.clicks / 100) * 0.3 + (1 / ad.cpc) * 30 * 0.3)).toFixed(2);
                const isWinner = i === 2; // In DUMMY_ADS, ad3 has 3.1% CTR
                return (
                  <tr
                    key={ad.id}
                    className={`border-b border-zinc-100 dark:border-zinc-800 ${isWinner ? "bg-green-50 dark:bg-green-950/30" : ""}`}
                  >
                    <td className="py-3 px-4 text-zinc-800 dark:text-zinc-200">
                      {isWinner && <span className="inline-block mr-2 text-green-600 dark:text-green-400">★</span>}
                      {ad.copy}
                    </td>
                    <td className="text-center py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">{ad.ctr}%</td>
                    <td className="text-center py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">{ad.clicks.toLocaleString()}</td>
                    <td className="text-center py-3 px-4 font-mono text-zinc-700 dark:text-zinc-300">${ad.cpc.toFixed(2)}</td>
                    <td className={`text-center py-3 px-4 font-mono font-bold ${isWinner ? "text-green-600 dark:text-green-400" : "text-zinc-500"}`}>
                      {score}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function AIDiagnosisPanel({ diagnosis }: { diagnosis: AIDiagnosis }) {
  return (
    <section className="w-full mt-8">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 rounded-2xl shadow-sm border border-purple-200 dark:border-purple-800 p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">AI</span>
          </div>
          <h2 className="text-xl font-bold text-purple-900 dark:text-purple-100">
            AI-Driven Diagnosis
          </h2>
        </div>
        <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed mb-4">
          {diagnosis.reasoning}
        </p>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-purple-200 dark:border-purple-800">
          <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Winner:</span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
            {diagnosis.winner}
          </span>
          <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Why:</span>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">{diagnosis.reason}</span>
        </div>
      </div>
    </section>
  );
}

function AdVariants({ variants, onApprove }: { variants: AdVariant[]; onApprove: (id: string) => void }) {
  return (
    <section className="w-full mt-8">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
        AI-Generated Ad Variants
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {variants.map((v) => (
          <div
            key={v.id}
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Variant {v.id}</span>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mt-1">{v.headline}</h3>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex gap-2">
                  {v.ctr > 0 && (
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded text-xs font-mono font-semibold">
                      CTR {v.ctr}%
                    </span>
                  )}
                  {v.cpc > 0 && (
                    <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded text-xs font-mono font-semibold">
                      CPC ${v.cpc.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{v.copy}</p>
            <div className="flex flex-wrap gap-2">
              {v.riskFlags.map((flag) => (
                <span
                  key={flag}
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    flag === "YES"
                      ? "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                      : "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                  }`}
                >
                  ⚠ {flag === "YES" ? "RISK" : "LOW RISK"}
                </span>
              ))}
            </div>
            <button
              onClick={() => onApprove(v.id)}
              className="w-full mt-2 px-4 py-2.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-700 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold rounded-xl transition-colors text-sm"
            >
              Approve Variant {v.id}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function ApprovalPanel({ approvedVariant }: { approvedVariant: string | null }) {
  return (
    <section className="w-full mt-8">
      <div className={`rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
        approvedVariant
          ? "border-green-400 bg-green-50 dark:bg-green-950/20"
          : "border-zinc-300 dark:border-zinc-600"
      }`}>
        {approvedVariant ? (
          <div className="flex flex-col items-center gap-3">
            <div className="text-4xl">✅</div>
            <h3 className="text-xl font-bold text-green-700 dark:text-green-400">
              Human-in-the-Loop Approved
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Variant <strong>{approvedVariant}</strong> has been approved and is cleared for deployment.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="text-4xl">⏳</div>
            <h3 className="text-xl font-bold text-zinc-500 dark:text-zinc-400">
              Awaiting Human Review
            </h3>
            <p className="text-zinc-500 dark:text-zinc-500 text-sm max-w-md mx-auto">
              No ad variant has been approved yet. Review the AI diagnosis and variants above, then click "Approve" to proceed.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [intakeData, setIntakeData] = useState<IntakeData | null>(null);
  const [approvedVariant, setApprovedVariant] = useState<string | null>(null);

  const handleAnalyze = (data: IntakeData) => {
    setIntakeData(data);
    setApprovedVariant(null);
  };

  const handleApprove = (id: string) => {
    setApprovedVariant(id);
  };

  const diagnosis: AIDiagnosis = {
    reasoning:
      "Ad #3 achieves the best balance of CTR and CPC efficiency, delivering the lowest cost-per-click at $0.67 while maintaining a strong 3.1% CTR. Ad #2 is underperforming with high CPC and low engagement.",
    winner: "Ad #3",
    reason: "Best CTR-to-CPC ratio delivering highest engagement efficiency",
  };

  const variants: AdVariant[] = intakeData
    ? [
        {
          id: "A",
          headline: `${intakeData.brand || "Your Brand"}: ${intakeData.goal || "Transform"} Today`,
          copy: `Experience ${intakeData.product || "our product"} and say goodbye to ${intakeData.painPoints.split(",")[0] || "your struggles"}. Built for ${intakeData.audience || "you"} — ${intakeData.voice || "bold results"} guaranteed.`,
          ctr: 3.4,
          cpc: 0.72,
          riskFlags: ["LOW RISK"],
        },
        {
          id: "B",
          headline: `Don't Miss Out — ${intakeData.brand || "Our Solution"} Is Here`,
          copy: `${intakeData.audience || "Active people"} are switching to ${intakeData.product || "our solution"} because it targets ${intakeData.painPoints || "efficiency"}. Tested for ${intakeData.platform || "Meta Ads"}.`,
          ctr: 4.1,
          cpc: 0.85,
          riskFlags: ["YES"],
        },
      ]
    : [];

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50">
            Real-time Campaign <span className="text-blue-600">Analyzer</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Team 23's AI-native optimizer. Diagnose losing ads, generate high-performance variants, and maintain human oversight.
          </p>
        </header>

        <IntakeForm onAnalyze={handleAnalyze} />

        {intakeData && (
          <div id="results" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <MetricComparison ads={DUMMY_ADS} />
            <AIDiagnosisPanel diagnosis={diagnosis} />
            <AdVariants variants={variants} onApprove={handleApprove} />
            <ApprovalPanel approvedVariant={approvedVariant} />
          </div>
        )}

        <footer className="text-center text-zinc-400 text-sm pt-12 border-t border-zinc-200 dark:border-zinc-800">
          MMY · Marlon Tiik · Martin Lehiste · Yassin Moustafa · Team 23
        </footer>
      </div>
    </main>
  );
}
