import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, ReferenceLine, Brush,
} from "recharts";
import logo from "@/assets/logo.png";
import logoText from "@/assets/Screenshot_2026-02-11_150622-removebg-preview.png";

// ─── Mock data (mirrors EditProjectPage) ──────────────────────────────────────
const LOCATIONS = ["Rainforest", "Desert", "Arctic", "Coastal", "Urban", "Mountain", "Savanna", "Wetland"];

function generateRows(count = 50) {
    const base = new Date(2025, 0, 15, 12, 0, 0);
    return Array.from({ length: count }, (_, i) => {
        const d = new Date(base.getTime() + i * 30_000);
        return {
            id: String(i + 1),
            date: d.toLocaleDateString("en-GB"),
            time: d.toLocaleTimeString("en-GB"),
            temperature: parseFloat((80 + Math.random() * 6).toFixed(2)),
            humidity: parseFloat((75 + Math.random() * 5).toFixed(1)),
            location: LOCATIONS[i % 4],
        };
    });
}

const PROJECTS: Record<string, { name: string; icon: string }> = {
    "1": { name: "Smart Factory Grid", icon: "🏭" },
    "2": { name: "Urban Weather Net", icon: "🌦️" },
    "3": { name: "AgriSense Fields", icon: "🌾" },
    "4": { name: "Cold Chain Monitor", icon: "❄️" },
    "5": { name: "Office Energy Hub", icon: "⚡" },
};

// ─── Custom Tooltip ────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl border border-border/60 bg-card px-4 py-3 shadow-2xl text-xs">
            <p className="mb-2 font-semibold text-foreground">{label}</p>
            {payload.map((p: any) => (
                <div key={p.dataKey} className="flex items-center gap-2 mt-1">
                    <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                    <span className="text-muted-foreground capitalize">{p.name}:</span>
                    <span className="font-bold text-foreground">{p.value}{p.dataKey === "temperature" ? "°" : "%"}</span>
                </div>
            ))}
        </div>
    );
};

// ─── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
    return (
        <div className="card-shine rounded-2xl border border-border/60 bg-card px-5 py-4">
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">{sub}</p>
        </div>
    );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
    const { id } = useParams<{ id: string }>();
    const project = PROJECTS[id ?? "1"] ?? PROJECTS["1"];

    const [visTemp, setVisTemp] = useState(true);
    const [visHum, setVisHum] = useState(true);
    const [rowCount, setRowCount] = useState(50);

    const data = useMemo(() => generateRows(rowCount), [rowCount]);

    const temps = data.map(r => r.temperature);
    const hums = data.map(r => r.humidity);
    const avgTemp = (temps.reduce((s, v) => s + v, 0) / temps.length).toFixed(2);
    const avgHum = (hums.reduce((s, v) => s + v, 0) / hums.length).toFixed(1);
    const maxTemp = Math.max(...temps).toFixed(2);
    const minTemp = Math.min(...temps).toFixed(2);

    const chartData = data.map(r => ({ time: r.time, temperature: r.temperature, humidity: r.humidity }));

    // colours matching the app's design system
    const TEMP_COLOR = "hsl(262 83% 65%)"; // primary purple
    const HUM_COLOR = "hsl(198 89% 55%)"; // sky blue accent

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Ambient glow */}
            <div className="pointer-events-none fixed inset-0" style={{ background: "var(--gradient-glow)" }} />

            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
                <div className="flex h-16 items-center justify-between px-6">
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="h-12 w-12" alt="" />
                        <img src={logoText} className="h-9 -ml-4 relative top-1" alt="" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className="text-lg">{project.icon}</span>
                        <div>
                            <p className="text-sm font-semibold text-foreground leading-tight">{project.name}</p>
                            <p className="text-xs text-muted-foreground">Analytics Dashboard</p>
                        </div>
                    </div>
                    <Link to={`/projects/${id}/edit`}
                        className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Editor
                    </Link>
                </div>
            </header>

            <div className="relative mx-auto max-w-7xl px-6 py-8 space-y-8">

                {/* Page title */}
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Temperature &amp; Humidity Over Time</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Sensor readings sampled every 30 seconds · {data.length} data points
                    </p>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <StatCard label="Avg Temperature" value={`${avgTemp}°`} sub={`Range ${minTemp}° – ${maxTemp}°`} color="text-primary" />
                    <StatCard label="Peak Temperature" value={`${maxTemp}°`} sub="Maximum recorded" color="text-amber-400" />
                    <StatCard label="Avg Humidity" value={`${avgHum}%`} sub="Mean relative humidity" color="text-sky-400" />
                    <StatCard label="Data Points" value={String(data.length)} sub="Rows in dataset" color="text-emerald-400" />
                </div>

                {/* Main chart card */}
                <div className="card-shine rounded-2xl border border-border/60 bg-card p-6">
                    {/* Chart toolbar */}
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="text-base font-semibold text-foreground">Sensor Readings</h2>
                            <p className="text-xs text-muted-foreground">Time on X-axis · Values on Y-axis</p>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            {/* Series toggles */}
                            <button onClick={() => setVisTemp(!visTemp)}
                                className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${visTemp ? "border-primary/40 bg-primary/10 text-primary" : "border-border/50 bg-muted text-muted-foreground"}`}>
                                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: TEMP_COLOR }} />
                                Temperature
                            </button>
                            <button onClick={() => setVisHum(!visHum)}
                                className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${visHum ? "border-sky-400/40 bg-sky-400/10 text-sky-400" : "border-border/50 bg-muted text-muted-foreground"}`}>
                                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: HUM_COLOR }} />
                                Humidity
                            </button>
                            {/* Row count selector */}
                            <div className="flex items-center gap-1.5 rounded-lg border border-border/50 bg-background px-3 py-1.5">
                                <span className="text-xs text-muted-foreground">Rows:</span>
                                {[25, 50, 100, 200].map(n => (
                                    <button key={n} onClick={() => setRowCount(n)}
                                        className={`rounded px-2 py-0.5 text-xs font-medium transition-colors ${rowCount === n ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                                        {n}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <ResponsiveContainer width="100%" height={420}>
                        <LineChart data={chartData} margin={{ top: 8, right: 20, left: 0, bottom: 8 }}>
                            <defs>
                                <linearGradient id="tempGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor={TEMP_COLOR} stopOpacity={0.8} />
                                    <stop offset="100%" stopColor={TEMP_COLOR} stopOpacity={1} />
                                </linearGradient>
                                <linearGradient id="humGrad" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor={HUM_COLOR} stopOpacity={0.8} />
                                    <stop offset="100%" stopColor={HUM_COLOR} stopOpacity={1} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(228 35% 18%)" vertical={false} />

                            <XAxis dataKey="time"
                                tick={{ fill: "hsl(215 20% 55%)", fontSize: 11 }}
                                tickLine={false}
                                axisLine={{ stroke: "hsl(228 35% 20%)" }}
                                interval={Math.floor(chartData.length / 8)}
                            />

                            {/* Left Y-axis for Temperature */}
                            <YAxis yAxisId="temp"
                                domain={["auto", "auto"]}
                                tick={{ fill: TEMP_COLOR, fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v: number) => `${v}°`}
                                width={48}
                            />

                            {/* Right Y-axis for Humidity */}
                            <YAxis yAxisId="hum" orientation="right"
                                domain={["auto", "auto"]}
                                tick={{ fill: HUM_COLOR, fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v: number) => `${v}%`}
                                width={44}
                            />

                            <Tooltip content={<CustomTooltip />} />

                            <Legend
                                wrapperStyle={{ paddingTop: 16, fontSize: 12 }}
                                formatter={(value) => <span style={{ color: "hsl(215 20% 65%)" }}>{value}</span>}
                            />

                            {/* Average reference lines */}
                            {visTemp && (
                                <ReferenceLine yAxisId="temp" y={parseFloat(avgTemp)}
                                    stroke={TEMP_COLOR} strokeDasharray="6 3" strokeOpacity={0.4}
                                    label={{ value: `avg ${avgTemp}°`, fill: TEMP_COLOR, fontSize: 10, position: "insideTopLeft" }} />
                            )}
                            {visHum && (
                                <ReferenceLine yAxisId="hum" y={parseFloat(avgHum)}
                                    stroke={HUM_COLOR} strokeDasharray="6 3" strokeOpacity={0.4}
                                    label={{ value: `avg ${avgHum}%`, fill: HUM_COLOR, fontSize: 10, position: "insideTopRight" }} />
                            )}

                            {visTemp && (
                                <Line yAxisId="temp" type="monotone" dataKey="temperature" name="Temperature"
                                    stroke={TEMP_COLOR} strokeWidth={2}
                                    dot={false} activeDot={{ r: 5, strokeWidth: 0 }}
                                />
                            )}
                            {visHum && (
                                <Line yAxisId="hum" type="monotone" dataKey="humidity" name="Humidity"
                                    stroke={HUM_COLOR} strokeWidth={2}
                                    dot={false} activeDot={{ r: 5, strokeWidth: 0 }}
                                />
                            )}

                            {/* Brush for zooming */}
                            <Brush dataKey="time" height={24} stroke="hsl(228 35% 25%)"
                                fill="hsl(228 35% 14%)" travellerWidth={8}
                                tickFormatter={() => ""} />
                        </LineChart>
                    </ResponsiveContainer>

                    <p className="mt-3 text-center text-[11px] text-muted-foreground">
                        Drag the brush below the chart to zoom into a time window · Hover for exact values
                    </p>
                </div>
            </div>
        </div>
    );
}
