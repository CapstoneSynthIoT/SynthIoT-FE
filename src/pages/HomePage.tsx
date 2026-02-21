import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import logoText from "@/assets/Screenshot_2026-02-11_150622-removebg-preview.png";

// ─── Mock User & Projects ────────────────────────────────────────────────────

const MOCK_USER = {
    name: "Alex Johnson",
    email: "alex.johnson@synthiot.com",
    role: "IoT Engineer",
    avatarInitials: "AJ",
    joinedDate: "Jan 2025",
};

type ProjectStatus = "Active" | "Idle" | "Warning";

interface Project {
    id: number;
    name: string;
    description: string;
    devices: number;
    dataPoints: number;
    uptime: number;
    status: ProjectStatus;
    lastActivity: string;
    icon: string;
}

const MOCK_PROJECTS: Project[] = [
    {
        id: 1,
        name: "Smart Factory Grid",
        description: "Industrial sensor network monitoring production line health",
        devices: 48,
        dataPoints: 128400,
        uptime: 99.2,
        status: "Active",
        lastActivity: "2 min ago",
        icon: "🏭",
    },
    {
        id: 2,
        name: "Urban Weather Net",
        description: "City-wide environmental monitoring with 50+ weather nodes",
        devices: 53,
        dataPoints: 94200,
        uptime: 97.8,
        status: "Active",
        lastActivity: "8 min ago",
        icon: "🌦️",
    },
    {
        id: 3,
        name: "AgriSense Fields",
        description: "Precision agriculture soil & moisture analytics",
        devices: 22,
        dataPoints: 41800,
        uptime: 85.4,
        status: "Warning",
        lastActivity: "34 min ago",
        icon: "🌾",
    },
    {
        id: 4,
        name: "Cold Chain Monitor",
        description: "Pharmaceutical cold-storage temperature compliance",
        devices: 15,
        dataPoints: 22300,
        uptime: 100,
        status: "Active",
        lastActivity: "1 min ago",
        icon: "❄️",
    },
    {
        id: 5,
        name: "Office Energy Hub",
        description: "Smart building energy usage optimisation",
        devices: 9,
        dataPoints: 8700,
        uptime: 72.1,
        status: "Idle",
        lastActivity: "3 hr ago",
        icon: "⚡",
    },
];

// ─── Status helpers ──────────────────────────────────────────────────────────

const STATUS_STYLES: Record<ProjectStatus, { dot: string; badge: string }> = {
    Active: { dot: "bg-emerald-400", badge: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" },
    Warning: { dot: "bg-amber-400 animate-pulse", badge: "bg-amber-400/10   text-amber-400   border-amber-400/20" },
    Idle: { dot: "bg-slate-400", badge: "bg-slate-400/10   text-slate-400   border-slate-400/20" },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function HomeHeader({ user }: { user: typeof MOCK_USER }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto flex h-20 items-center justify-between px-6">
                {/* Logo */}
                <Link to="/" className="flex items-center cursor-pointer">
                    <img src={logo} alt="SynthIoT S Logo" className="h-16 w-16" />
                    <img src={logoText} alt="ynthiot text" className="h-12 -ml-5 relative top-2" />
                </Link>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Notification bell */}
                    <button className="relative rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                    </button>

                    {/* Avatar + menu */}
                    <div className="relative">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-card px-3 py-2 transition-all hover:border-primary/40 hover:bg-muted"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-sm font-bold text-primary">
                                {user.avatarInitials}
                            </div>
                            <span className="hidden text-sm font-medium text-foreground sm:block">{user.name}</span>
                            <svg className={`h-4 w-4 text-muted-foreground transition-transform ${menuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-52 rounded-xl border border-border/60 bg-card shadow-2xl overflow-hidden animate-in">
                                <div className="border-b border-border/50 px-4 py-3">
                                    <p className="text-sm font-semibold text-foreground">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                                <div className="p-1.5">
                                    <Link to="/profile" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted">
                                        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Edit Profile
                                    </Link>
                                    <Link to="/projects" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted">
                                        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        Manage Projects
                                    </Link>
                                    <div className="my-1 border-t border-border/50" />
                                    <Link to="/signin" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Sign Out
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

function StatPill({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex flex-col items-center rounded-lg bg-background/50 px-4 py-2.5">
            <span className="text-lg font-bold text-foreground">{value}</span>
            <span className="text-xs text-muted-foreground">{label}</span>
        </div>
    );
}

function UptimeBar({ value }: { value: number }) {
    const color =
        value >= 95 ? "bg-emerald-400" :
            value >= 80 ? "bg-amber-400" :
                "bg-red-400";
    return (
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
                className={`h-full rounded-full transition-all ${color}`}
                style={{ width: `${value}%` }}
            />
        </div>
    );
}

function ProjectCard({ project }: { project: Project }) {
    const s = STATUS_STYLES[project.status];
    return (
        <div className="card-shine group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-lg transition-all hover:border-primary/40 hover:shadow-primary/10 hover:shadow-xl hover:-translate-y-0.5">
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-2xl">
                        {project.icon}
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground leading-tight">{project.name}</h3>
                        <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{project.description}</p>
                    </div>
                </div>
                <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${s.badge}`}>
                    <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${s.dot}`} />
                    {project.status}
                </span>
            </div>

            {/* Stats row */}
            <div className="mt-4 grid grid-cols-3 gap-2">
                <StatPill label="Devices" value={project.devices} />
                <StatPill label="Data Points" value={project.dataPoints.toLocaleString()} />
                <StatPill label="Uptime" value={`${project.uptime}%`} />
            </div>

            {/* Uptime bar */}
            <div className="mt-3 px-0.5">
                <UptimeBar value={project.uptime} />
            </div>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                    <svg className="mb-0.5 mr-1 inline h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {project.lastActivity}
                </span>
                <Link to={`/projects/${project.id}/edit`} className="text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100 hover:text-primary/80">
                    View Details →
                </Link>
            </div>
        </div>
    );
}

// ─── Page ────────────────────────────────────────────────────────────────────

const HomePage = () => {
    const user = MOCK_USER;
    const projects = MOCK_PROJECTS;

    const totalDevices = projects.reduce((s, p) => s + p.devices, 0);
    const totalDataPoints = projects.reduce((s, p) => s + p.dataPoints, 0);
    const activeProjects = projects.filter(p => p.status === "Active").length;
    const avgUptime = (projects.reduce((s, p) => s + p.uptime, 0) / projects.length).toFixed(1);

    const now = new Date();
    const hour = now.getHours();
    const greeting =
        hour < 12 ? "Good morning" :
            hour < 17 ? "Good afternoon" :
                "Good evening";

    return (
        <div className="min-h-screen bg-background">
            <HomeHeader user={user} />

            {/* Background effects */}
            <div className="pointer-events-none fixed inset-0" style={{ background: "var(--gradient-glow)" }} />
            <div className="pointer-events-none fixed left-1/4 top-1/3 h-96 w-96 animate-pulse-glow rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none fixed right-1/4 bottom-1/4 h-72 w-72 animate-pulse-glow rounded-full bg-accent/5 blur-3xl" style={{ animationDelay: "2s" }} />

            <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-16">

                {/* ── Welcome Banner ───────────────────────── */}
                <div className="card-shine mb-8 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl">
                    <div className="relative flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
                        {/* Decorative glow strip */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />

                        {/* Left: greeting */}
                        <div className="relative">
                            <p className="mb-1 text-sm font-medium text-muted-foreground">
                                {greeting}, welcome back 👋
                            </p>
                            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                                {user.name}
                                <span className="text-gradient">.</span>
                            </h1>
                            <div className="mt-2 flex flex-wrap items-center gap-3">
                                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                    {user.role}
                                </span>
                                <span className="text-xs text-muted-foreground">Member since {user.joinedDate}</span>
                            </div>
                        </div>

                        {/* Right: CTAs */}
                        <div className="relative flex flex-wrap gap-3">
                            <Link to="/profile">
                                <button className="flex items-center gap-2 rounded-xl border border-border/60 bg-background/50 px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-muted">
                                    <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Edit Profile
                                </button>
                            </Link>
                            <Link to="/projects">
                                <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    Manage Projects
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ── Quick Stats ──────────────────────────── */}
                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                        { label: "Total Projects", value: projects.length, icon: "📁", accent: "text-primary" },
                        { label: "Active Projects", value: activeProjects, icon: "✅", accent: "text-emerald-400" },
                        { label: "Total Devices", value: totalDevices, icon: "📡", accent: "text-accent-foreground" },
                        { label: "Avg Uptime", value: `${avgUptime}%`, icon: "⏱️", accent: "text-amber-400" },
                    ].map((stat) => (
                        <div key={stat.label} className="card-shine rounded-2xl border border-border/60 bg-card px-5 py-4 shadow-md">
                            <span className="text-2xl">{stat.icon}</span>
                            <p className={`mt-2 text-2xl font-bold ${stat.accent}`}>{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* ── Recent Projects ──────────────────────── */}
                <div>
                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-foreground">Recent Projects</h2>
                            <p className="text-sm text-muted-foreground">
                                {totalDataPoints.toLocaleString()} data points across {projects.length} projects
                            </p>
                        </div>
                        <Link to="/projects">
                            <button className="rounded-lg border border-border/60 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground">
                                View All →
                            </button>
                        </Link>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                </div>

                {/* ── Data Summary Footer ──────────────────── */}
                <div className="mt-10 rounded-2xl border border-border/60 bg-card/50 p-6">
                    <p className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Platform Overview
                    </p>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {[
                            { label: "Total Data Points", value: totalDataPoints.toLocaleString() },
                            { label: "Connected Devices", value: totalDevices },
                            { label: "Active Streams", value: activeProjects * 4 },
                            { label: "Alerts Today", value: 3 },
                        ].map((item) => (
                            <div key={item.label} className="text-center">
                                <p className="text-2xl font-bold text-foreground">{item.value}</p>
                                <p className="mt-0.5 text-xs text-muted-foreground">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
