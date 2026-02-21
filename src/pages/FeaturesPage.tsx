import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import logoText from "@/assets/Screenshot_2026-02-11_150622-removebg-preview.png";
import {
    Zap,
    Table,
    MessageSquare,
    Brain,
    Shield,
    Sliders,
    CloudRain,
    Timer,
    Download,
    BarChart3,
    Cpu,
    Network,
} from "lucide-react";

// ─── Feature Data ─────────────────────────────────────────────────────────────

const HERO_FEATURES = [
    {
        icon: Brain,
        title: "AI-Powered Generation",
        subtitle: "CrewAI Multi-Agent System",
        description:
            "Two intelligent agents — a Climate Context Specialist and a Sensor Safety Engineer — collaborate to parse your natural language prompt and extract validated sensor parameters. The agents ensure every generated dataset respects real-world physics.",
        color: "text-primary",
        bgColor: "bg-primary/10",
        borderColor: "border-primary/30",
        tag: "Core AI",
    },
    {
        icon: Zap,
        title: "TimeGAN Synthesis",
        subtitle: "Deep Learning Time-Series GAN",
        description:
            "Powered by a pre-trained TimeGAN model, SynthIoT produces temporally coherent sequences that capture the autocorrelation and drift patterns of real IoT deployments — indistinguishable from live sensor streams.",
        color: "text-emerald-400",
        bgColor: "bg-emerald-400/10",
        borderColor: "border-emerald-400/30",
        tag: "ML Engine",
    },
    {
        icon: Table,
        title: "Editable Dataset Interface",
        subtitle: "MS-Excel-like Spreadsheet UI",
        description:
            "After generation, tweak any row or cell directly in the in-browser spreadsheet editor. Adjust outliers, override anomalies, or add manual annotations before exporting — no external tools needed.",
        color: "text-amber-400",
        bgColor: "bg-amber-400/10",
        borderColor: "border-amber-400/30",
        tag: "UI / UX",
    },
];

const CAPABILITY_GRID = [
    {
        icon: MessageSquare,
        title: "Natural Language Control",
        description:
            'Just type: "48 hours of rainy indoor data in Seattle" and the AI does the rest.',
    },
    {
        icon: Shield,
        title: "Sensor-Safe Validation",
        description:
            "All parameters are validated against AM2320 hardware specs (−40 °C → 80 °C, 0–99.9 % RH) before generation.",
    },
    {
        icon: CloudRain,
        title: "Environmental Conditions",
        description:
            "Toggle AC, fans, rain, and indoor/outdoor environments to simulate diverse real-world scenarios.",
    },
    {
        icon: Sliders,
        title: "Fine-Grained Parameters",
        description:
            "Control thermal inertia, noise scale, base humidity, and daily temperature min/max with precision.",
    },
    {
        icon: Timer,
        title: "Flexible Time Windows",
        description:
            "Define any start and end timestamp — from five-minute bursts to week-long continuous streams.",
    },
    {
        icon: Download,
        title: "Instant CSV Export",
        description:
            "Download a ready-to-use CSV (Date, Time, Temperature, Humidity, Location) in seconds.",
    },
    {
        icon: BarChart3,
        title: "Physics-Based Modelling",
        description:
            "Sine-wave daily cycles, temperature-correlated humidity, and configurable Gaussian noise for authenticity.",
    },
    {
        icon: Cpu,
        title: "Groq-Accelerated LLM",
        description:
            "Prompt parsing runs on LangChain-Groq for ultra-low-latency natural language understanding.",
    },
    {
        icon: Network,
        title: "REST API Access",
        description:
            "Programmatically integrate via the FastAPI endpoint — perfect for CI pipelines and data engineering workflows.",
    },
];

const PARAMETERS = [
    { param: "location", type: "string", description: "Geographic location name", example: "Phoenix, AZ" },
    { param: "t_min / t_max", type: "float (°F)", description: "Min / max temperature bounds", example: "68 / 104" },
    { param: "humidity_base", type: "float (%)", description: "Baseline relative humidity", example: "35.0" },
    { param: "inertia", type: "float (1–4)", description: "Thermal inertia factor", example: "2.0" },
    { param: "noise_scale", type: "float", description: "Sensor noise amplitude", example: "1.0" },
    { param: "ac_status", type: "boolean", description: "Air conditioning on / off", example: "false" },
    { param: "fan_status", type: "boolean", description: "Fan on / off", example: "true" },
    { param: "rain_status", type: "boolean", description: "Raining conditions", example: "false" },
    { param: "indoor_status", type: "boolean", description: "Indoor vs outdoor sensor", example: "true" },
    { param: "start_time / end_time", type: "ISO string", description: "Recording window timestamps", example: "Today 08:00 → 18:00" },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function FeaturesHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto flex h-20 items-center justify-between px-6">
                <Link to="/" className="flex items-center cursor-pointer">
                    <img src={logo} alt="SynthIoT S Logo" className="h-16 w-16" />
                    <img src={logoText} alt="ynthiot text" className="h-12 -ml-5 relative top-2" />
                </Link>
                <div className="flex items-center gap-3">
                    <Link to="/signin">
                        <button className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                            Sign In
                        </button>
                    </Link>
                    <Link to="/signup">
                        <button className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary">
                            Get Started Free
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const FeaturesPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <FeaturesHeader />

            {/* Background effects */}
            <div className="pointer-events-none fixed inset-0" style={{ background: "var(--gradient-glow)" }} />
            <div className="pointer-events-none fixed left-1/4 top-1/3 h-96 w-96 animate-pulse-glow rounded-full bg-primary/5 blur-3xl" />
            <div
                className="pointer-events-none fixed right-1/4 bottom-1/4 h-72 w-72 animate-pulse-glow rounded-full bg-accent/5 blur-3xl"
                style={{ animationDelay: "2s" }}
            />

            <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20">

                {/* ── Hero ──────────────────────────────────────── */}
                <div className="mb-16 text-center">
                    <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                        Platform Features
                    </span>
                    <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
                        Everything you need to{" "}
                        <span className="text-gradient">simulate real IoT data</span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                        SynthIoT combines large language models, generative adversarial networks, and a physics-aware
                        simulation engine so you can prototype, test, and train on realistic sensor streams — without
                        touching a single piece of hardware.
                    </p>
                </div>

                {/* ── Core 3 Feature Cards ─────────────────────── */}
                <div className="mb-16 grid gap-6 lg:grid-cols-3">
                    {HERO_FEATURES.map((f) => (
                        <div
                            key={f.title}
                            className="card-shine group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-7 shadow-lg transition-all duration-300 hover:border-primary/40 hover:shadow-primary/10 hover:shadow-xl hover:-translate-y-1"
                        >
                            {/* Glow strip */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

                            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${f.bgColor}`}>
                                <f.icon className={`h-6 w-6 ${f.color}`} />
                            </div>

                            <span className={`mb-3 inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${f.borderColor} ${f.bgColor} ${f.color}`}>
                                {f.tag}
                            </span>

                            <h3 className="mb-1 text-xl font-bold text-foreground">{f.title}</h3>
                            <p className={`mb-3 text-sm font-medium ${f.color}`}>{f.subtitle}</p>
                            <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                        </div>
                    ))}
                </div>

                {/* ── Divider ──────────────────────────────────── */}
                <div className="mb-14 flex items-center gap-4">
                    <div className="h-px flex-1 bg-border/60" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Capabilities</span>
                    <div className="h-px flex-1 bg-border/60" />
                </div>

                {/* ── 9-Feature Capability Grid ─────────────────── */}
                <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {CAPABILITY_GRID.map((cap) => (
                        <div
                            key={cap.title}
                            className="card-shine flex gap-4 rounded-xl border border-border/60 bg-card p-5 shadow-md transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5"
                        >
                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                <cap.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="mb-1 text-sm font-bold text-foreground">{cap.title}</h4>
                                <p className="text-xs leading-relaxed text-muted-foreground">{cap.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Parameters Reference Table ────────────────── */}
                <div className="mb-16">
                    <div className="mb-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-border/60" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Configuration Parameters</span>
                        <div className="h-px flex-1 bg-border/60" />
                    </div>

                    <div className="card-shine overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border/60 bg-muted/40">
                                        <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Parameter</th>
                                        <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</th>
                                        <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</th>
                                        <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Example</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/40">
                                    {PARAMETERS.map((p, i) => (
                                        <tr key={i} className="transition-colors hover:bg-muted/30">
                                            <td className="px-5 py-3 font-mono text-xs font-medium text-primary">{p.param}</td>
                                            <td className="px-5 py-3 text-xs text-muted-foreground">{p.type}</td>
                                            <td className="px-5 py-3 text-xs text-foreground/80">{p.description}</td>
                                            <td className="px-5 py-3 font-mono text-xs text-amber-400">{p.example}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ── Data Flow Diagram ─────────────────────────── */}
                <div className="mb-16">
                    <div className="mb-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-border/60" />
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">How It Works</span>
                        <div className="h-px flex-1 bg-border/60" />
                    </div>

                    <div className="card-shine overflow-hidden rounded-2xl border border-border/60 bg-card p-8 shadow-lg">
                        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                            {[
                                { step: "01", label: "Your Prompt", icon: "💬", color: "border-primary/40 bg-primary/10 text-primary" },
                                { step: "02", label: "Climate Agent", icon: "🌍", color: "border-emerald-400/40 bg-emerald-400/10 text-emerald-400" },
                                { step: "03", label: "Sensor Agent", icon: "🔬", color: "border-amber-400/40 bg-amber-400/10 text-amber-400" },
                                { step: "04", label: "Validation", icon: "✅", color: "border-accent/40 bg-accent/10 text-accent-foreground" },
                                { step: "05", label: "TimeGAN", icon: "⚡", color: "border-primary/40 bg-primary/10 text-primary" },
                                { step: "06", label: "CSV Output", icon: "📄", color: "border-emerald-400/40 bg-emerald-400/10 text-emerald-400" },
                            ].map((node, i, arr) => (
                                <div key={node.step} className="flex items-center gap-3">
                                    <div className={`flex flex-col items-center rounded-xl border px-4 py-3 text-center transition-all hover:-translate-y-0.5 ${node.color}`}>
                                        <span className="text-2xl">{node.icon}</span>
                                        <span className="mt-1 text-xs font-bold">{node.label}</span>
                                        <span className="text-[10px] opacity-60">{node.step}</span>
                                    </div>
                                    {i < arr.length - 1 && (
                                        <span className="hidden text-muted-foreground sm:block">→</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── CTA Banner ───────────────────────────────── */}
                <div className="card-shine overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-xl">
                    <div className="relative p-10 text-center">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
                        <h2 className="relative mb-3 text-3xl font-extrabold text-foreground">
                            Ready to generate your first dataset?
                        </h2>
                        <p className="relative mx-auto mb-7 max-w-lg text-base text-muted-foreground">
                            Sign up for free and start producing realistic IoT sensor data in under a minute — no hardware required.
                        </p>
                        <div className="relative flex flex-wrap items-center justify-center gap-4">
                            <Link to="/signup">
                                <button className="rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary">
                                    Get Started Free
                                </button>
                            </Link>
                            <Link to="/">
                                <button className="rounded-xl border border-border/60 bg-background/50 px-8 py-3.5 text-base font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-muted">
                                    Back to Home
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FeaturesPage;
