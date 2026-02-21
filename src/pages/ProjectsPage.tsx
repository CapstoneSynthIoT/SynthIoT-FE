import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import logoText from "@/assets/Screenshot_2026-02-11_150622-removebg-preview.png";

// ─── Types ────────────────────────────────────────────────────────────────────

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
    createdAt: string;
    tags: string[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_PROJECTS: Project[] = [
    {
        id: 1,
        name: "Smart Factory Grid",
        description: "Industrial sensor network monitoring production line health and equipment vitals in real-time.",
        devices: 48,
        dataPoints: 128400,
        uptime: 99.2,
        status: "Active",
        lastActivity: "2 min ago",
        icon: "🏭",
        createdAt: "2025-03-12",
        tags: ["industrial", "sensors", "monitoring"],
    },
    {
        id: 2,
        name: "Urban Weather Net",
        description: "City-wide environmental monitoring with 50+ weather nodes tracking temperature, humidity, and air quality.",
        devices: 53,
        dataPoints: 94200,
        uptime: 97.8,
        status: "Active",
        lastActivity: "8 min ago",
        icon: "🌦️",
        createdAt: "2025-04-05",
        tags: ["environment", "weather", "urban"],
    },
    {
        id: 3,
        name: "AgriSense Fields",
        description: "Precision agriculture soil & moisture analytics to optimize irrigation and crop yield predictions.",
        devices: 22,
        dataPoints: 41800,
        uptime: 85.4,
        status: "Warning",
        lastActivity: "34 min ago",
        icon: "🌾",
        createdAt: "2025-05-20",
        tags: ["agriculture", "soil", "irrigation"],
    },
    {
        id: 4,
        name: "Cold Chain Monitor",
        description: "Pharmaceutical cold-storage temperature compliance across distributed warehouse locations.",
        devices: 15,
        dataPoints: 22300,
        uptime: 100,
        status: "Active",
        lastActivity: "1 min ago",
        icon: "❄️",
        createdAt: "2025-06-01",
        tags: ["pharma", "temperature", "compliance"],
    },
    {
        id: 5,
        name: "Office Energy Hub",
        description: "Smart building energy usage optimisation with automated scheduling and anomaly detection.",
        devices: 9,
        dataPoints: 8700,
        uptime: 72.1,
        status: "Idle",
        lastActivity: "3 hr ago",
        icon: "⚡",
        createdAt: "2025-06-18",
        tags: ["energy", "building", "automation"],
    },
];

const MOCK_USER = {
    name: "Alex Johnson",
    email: "alex.johnson@synthiot.com",
    avatarInitials: "AJ",
};

const STATUS_STYLES: Record<ProjectStatus, { dot: string; badge: string }> = {
    Active: { dot: "bg-emerald-400", badge: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" },
    Warning: { dot: "bg-amber-400 animate-pulse", badge: "bg-amber-400/10  text-amber-400  border-amber-400/20" },
    Idle: { dot: "bg-slate-400", badge: "bg-slate-400/10  text-slate-400  border-slate-400/20" },
};

const PROJECT_ICONS = ["🏭", "🌦️", "🌾", "❄️", "⚡", "🏗️", "🚗", "🏥", "🌊", "🔬", "🛰️", "💡"];

// ─── AppHeader (shared across authenticated pages) ────────────────────────────

function AppHeader({ user }: { user: typeof MOCK_USER }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto flex h-20 items-center justify-between px-6">
                <Link to="/" className="flex items-center cursor-pointer">
                    <img src={logo} alt="SynthIoT S Logo" className="h-16 w-16" />
                    <img src={logoText} alt="ynthiot text" className="h-12 -ml-5 relative top-2" />
                </Link>


                <div className="flex items-center gap-4">
                    <button className="relative rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                    </button>

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
                            <div className="absolute right-0 mt-2 w-52 rounded-xl border border-border/60 bg-card shadow-2xl overflow-hidden">
                                <div className="border-b border-border/50 px-4 py-3">
                                    <p className="text-sm font-semibold text-foreground">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                </div>
                                <div className="p-1.5">
                                    <Link to="/home" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted">
                                        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                        Home
                                    </Link>
                                    <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted">
                                        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        Edit Profile
                                    </Link>
                                    <div className="my-1 border-t border-border/50" />
                                    <Link to="/signin" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
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

// ─── Uptime Bar ───────────────────────────────────────────────────────────────

function UptimeBar({ value }: { value: number }) {
    const color = value >= 95 ? "bg-emerald-400" : value >= 80 ? "bg-amber-400" : "bg-red-400";
    return (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${value}%` }} />
        </div>
    );
}

// ─── Project Form Modal ───────────────────────────────────────────────────────

interface ProjectFormProps {
    initial?: Partial<Project>;
    onSave: (data: Omit<Project, "id" | "dataPoints" | "lastActivity">) => void;
    onClose: () => void;
}

function ProjectFormModal({ initial, onSave, onClose }: ProjectFormProps) {
    const [name, setName] = useState(initial?.name ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");
    const [devices, setDevices] = useState(initial?.devices ?? 1);
    const [uptime, setUptime] = useState(initial?.uptime ?? 100);
    const [status, setStatus] = useState<ProjectStatus>(initial?.status ?? "Active");
    const [icon, setIcon] = useState(initial?.icon ?? "💡");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>(initial?.tags ?? []);

    const addTag = () => {
        const t = tagInput.trim().toLowerCase();
        if (t && !tags.includes(t)) setTags([...tags, t]);
        setTagInput("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            name,
            description,
            devices,
            uptime,
            status,
            icon,
            createdAt: initial?.createdAt ?? new Date().toISOString().split("T")[0],
            tags,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-lg card-shine rounded-2xl border border-border/60 bg-card shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
                    <h2 className="text-lg font-bold text-foreground">
                        {initial?.id ? "Edit Project" : "New Project"}
                    </h2>
                    <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 px-6 py-5">
                    {/* Icon picker */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Project Icon</label>
                        <div className="flex flex-wrap gap-2">
                            {PROJECT_ICONS.map((em) => (
                                <button
                                    key={em}
                                    type="button"
                                    onClick={() => setIcon(em)}
                                    className={`h-10 w-10 rounded-xl text-xl transition-all ${icon === em ? "bg-primary/20 ring-2 ring-primary" : "bg-muted hover:bg-muted/80"}`}
                                >
                                    {em}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Project Name <span className="text-destructive">*</span></label>
                        <input
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Smart Meter Network"
                            className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Description</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What does this project monitor?"
                            className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    {/* Devices + Status row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">Devices</label>
                            <input
                                type="number"
                                min={1}
                                value={devices}
                                onChange={(e) => setDevices(Number(e.target.value))}
                                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-foreground">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                <option value="Active">Active</option>
                                <option value="Warning">Warning</option>
                                <option value="Idle">Idle</option>
                            </select>
                        </div>
                    </div>

                    {/* Uptime */}
                    <div>
                        <label className="mb-2 flex items-center justify-between text-sm font-medium text-foreground">
                            <span>Uptime</span>
                            <span className={`font-bold ${uptime >= 95 ? "text-emerald-400" : uptime >= 80 ? "text-amber-400" : "text-red-400"}`}>{uptime}%</span>
                        </label>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            step={0.1}
                            value={uptime}
                            onChange={(e) => setUptime(Number(e.target.value))}
                            className="w-full accent-primary"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-foreground">Tags</label>
                        <div className="flex gap-2">
                            <input
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                                placeholder="Add a tag..."
                                className="flex-1 rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                            <button type="button" onClick={addTag} className="rounded-lg border border-border/60 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                                Add
                            </button>
                        </div>
                        {tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                                {tags.map((t) => (
                                    <span key={t} className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                        {t}
                                        <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))} className="opacity-60 hover:opacity-100">×</button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2 border-t border-border/50">
                        <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                            Cancel
                        </button>
                        <button type="submit" className="flex-1 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary">
                            {initial?.id ? "Save Changes" : "Create Project"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function DeleteModal({ project, onConfirm, onClose }: { project: Project; onConfirm: () => void; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-sm card-shine rounded-2xl border border-destructive/30 bg-card p-6 shadow-2xl">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
                    <svg className="h-6 w-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </div>
                <h3 className="mb-1 text-lg font-bold text-foreground">Delete Project</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                    Are you sure you want to delete <span className="font-semibold text-foreground">"{project.name}"</span>? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="flex-1 rounded-xl bg-destructive px-4 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Project Grid Card ────────────────────────────────────────────────────────

function ProjectGridCard({ project, onEdit, onDelete, onOpen }: { project: Project; onEdit: () => void; onDelete: () => void; onOpen: () => void }) {
    const s = STATUS_STYLES[project.status];
    return (
        <div onClick={onOpen} className="card-shine group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-md transition-all hover:border-primary/40 hover:shadow-primary/10 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer">
            {/* Card top accent strip */}
            <div className={`h-1 w-full ${project.uptime >= 95 ? "bg-emerald-400" : project.uptime >= 80 ? "bg-amber-400" : "bg-red-400"} opacity-60`} />

            <div className="flex flex-1 flex-col p-5">
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted text-2xl">
                            {project.icon}
                        </div>
                        <div className="min-w-0">
                            <h3 className="truncate text-sm font-semibold text-foreground">{project.name}</h3>
                            <p className="text-xs text-muted-foreground">{project.createdAt}</p>
                        </div>
                    </div>
                    <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${s.badge}`}>
                        <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${s.dot}`} />
                        {project.status}
                    </span>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">{project.description}</p>

                {/* Tags */}
                {project.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((t) => (
                            <span key={t} className="rounded-full bg-primary/8 px-2 py-0.5 text-[10px] font-medium text-primary/80 border border-primary/15">
                                {t}
                            </span>
                        ))}
                        {project.tags.length > 3 && (
                            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">+{project.tags.length - 3}</span>
                        )}
                    </div>
                )}

                {/* Stats + Analytics */}
                <div className="mt-4 flex items-center gap-2">
                    <div className="flex flex-1 flex-col items-center rounded-lg bg-background/50 px-2 py-2">
                        <span className="text-sm font-bold text-foreground">{(project.dataPoints / 1000).toFixed(1)}k</span>
                        <span className="text-[10px] text-muted-foreground">Data Pts</span>
                    </div>
                    <Link
                        to={`/projects/${project.id}/analytics`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-sky-400/40 bg-sky-400/10 px-2 py-2 text-xs font-medium text-sky-400 hover:bg-sky-400/20 transition-colors"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        Analytics
                    </Link>
                </div>


                {/* Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
                    <span className="text-xs text-muted-foreground">
                        <svg className="mb-0.5 mr-1 inline h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {project.lastActivity}
                    </span>
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-primary" title="Edit">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive" title="Delete">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Project List Row ─────────────────────────────────────────────────────────

function ProjectListRow({ project, onEdit, onDelete, onOpen }: { project: Project; onEdit: () => void; onDelete: () => void; onOpen: () => void }) {
    const s = STATUS_STYLES[project.status];
    return (
        <div onClick={onOpen} className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card px-5 py-4 transition-all hover:border-primary/40 hover:bg-card/80 cursor-pointer">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-xl">
                {project.icon}
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground truncate">{project.name}</h3>
                    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${s.badge}`}>
                        <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${s.dot}`} />
                        {project.status}
                    </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{project.description}</p>
            </div>
            <div className="hidden items-center gap-4 sm:flex">
                <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">{(project.dataPoints / 1000).toFixed(1)}k</p>
                    <p className="text-[10px] text-muted-foreground">Data Pts</p>
                </div>
                <Link
                    to={`/projects/${project.id}/analytics`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 rounded-lg border border-sky-400/40 bg-sky-400/10 px-3 py-1.5 text-xs font-medium text-sky-400 hover:bg-sky-400/20 transition-colors"
                >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    Analytics
                </Link>
                <p className="w-20 text-right text-xs text-muted-foreground">{project.lastActivity}</p>
            </div>
            <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button onClick={(e) => { e.stopPropagation(); onEdit(); }} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-primary">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const ProjectsPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState<ProjectStatus | "All">("All");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState<"name" | "uptime" | "devices" | "dataPoints">("name");
    const [showForm, setShowForm] = useState(false);
    const [editProject, setEditProject] = useState<Project | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
    const [nextId, setNextId] = useState(INITIAL_PROJECTS.length + 1);

    // ── Derived stats
    const totalDevices = projects.reduce((s, p) => s + p.devices, 0);
    const totalDataPoints = projects.reduce((s, p) => s + p.dataPoints, 0);
    const activeCount = projects.filter(p => p.status === "Active").length;
    const warningCount = projects.filter(p => p.status === "Warning").length;

    // ── Filtered + sorted list
    const displayed = useMemo(() => {
        return projects
            .filter((p) => {
                const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                    p.description.toLowerCase().includes(search.toLowerCase()) ||
                    p.tags.some(t => t.includes(search.toLowerCase()));
                const matchStatus = filterStatus === "All" || p.status === filterStatus;
                return matchSearch && matchStatus;
            })
            .sort((a, b) => {
                if (sortBy === "name") return a.name.localeCompare(b.name);
                if (sortBy === "uptime") return b.uptime - a.uptime;
                if (sortBy === "devices") return b.devices - a.devices;
                if (sortBy === "dataPoints") return b.dataPoints - a.dataPoints;
                return 0;
            });
    }, [projects, search, filterStatus, sortBy]);

    // ── CRUD handlers
    const handleCreate = (data: Omit<Project, "id" | "dataPoints" | "lastActivity">) => {
        setProjects([...projects, { ...data, id: nextId, dataPoints: data.devices * 500, lastActivity: "just now" }]);
        setNextId(nextId + 1);
        setShowForm(false);
    };

    const handleEdit = (data: Omit<Project, "id" | "dataPoints" | "lastActivity">) => {
        setProjects(projects.map(p => p.id === editProject!.id ? { ...p, ...data } : p));
        setEditProject(null);
    };

    const handleDelete = () => {
        setProjects(projects.filter(p => p.id !== deleteTarget!.id));
        setDeleteTarget(null);
    };

    return (
        <div className="min-h-screen bg-background">
            <AppHeader user={MOCK_USER} />

            {/* Background effects */}
            <div className="pointer-events-none fixed inset-0" style={{ background: "var(--gradient-glow)" }} />
            <div className="pointer-events-none fixed left-1/3 top-1/4 h-80 w-80 animate-pulse-glow rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none fixed right-1/4 bottom-1/3 h-64 w-64 animate-pulse-glow rounded-full bg-accent/5 blur-3xl" style={{ animationDelay: "1.5s" }} />

            <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-16">

                {/* ── Page Header ─────────────────────────── */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <Link to="/home" className="hover:text-foreground transition-colors">Home</Link>
                            <span>/</span>
                            <span className="text-foreground">Projects</span>
                        </div>
                        <h1 className="text-3xl font-bold text-foreground">
                            My Projects
                            <span className="text-gradient">.</span>
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage, monitor and configure all your IoT projects.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Project
                    </button>
                </div>

                {/* ── Summary Stats ────────────────────────── */}
                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[
                        { label: "Total Projects", value: projects.length, icon: "📁", accent: "text-primary" },
                        { label: "Active", value: activeCount, icon: "✅", accent: "text-emerald-400" },
                        { label: "Warnings", value: warningCount, icon: "⚠️", accent: "text-amber-400" },
                        { label: "Total Devices", value: totalDevices, icon: "📡", accent: "text-foreground" },
                    ].map((stat) => (
                        <div key={stat.label} className="card-shine rounded-2xl border border-border/60 bg-card px-5 py-4 shadow-md">
                            <span className="text-2xl">{stat.icon}</span>
                            <p className={`mt-2 text-2xl font-bold ${stat.accent}`}>{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* ── Data summary strip ───────────────────── */}
                <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl border border-border/50 bg-card/40 px-5 py-3">
                    <span className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">{totalDataPoints.toLocaleString()}</span> total data points
                    </span>
                    <span className="hidden h-3 w-px bg-border sm:block" />
                    <span className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">{totalDevices}</span> connected devices
                    </span>
                    <span className="hidden h-3 w-px bg-border sm:block" />
                    <span className="text-xs text-muted-foreground">
                        Showing <span className="font-semibold text-foreground">{displayed.length}</span> of <span className="font-semibold text-foreground">{projects.length}</span> projects
                    </span>
                </div>

                {/* ── Controls ─────────────────────────────── */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {/* Search */}
                    <div className="relative flex-1 max-w-sm">
                        <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search projects, tags..."
                            className="w-full rounded-xl border border-input bg-card py-2.5 pl-9 pr-4 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        {search && (
                            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* Status filter */}
                        <div className="flex rounded-xl border border-border/60 bg-card overflow-hidden">
                            {(["All", "Active", "Warning", "Idle"] as const).map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setFilterStatus(s)}
                                    className={`px-3.5 py-2 text-xs font-medium transition-colors ${filterStatus === s
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                            className="rounded-xl border border-border/60 bg-card px-3 py-2 text-xs text-foreground transition-colors focus:border-primary focus:outline-none"
                        >
                            <option value="name">Sort: Name</option>
                            <option value="uptime">Sort: Uptime</option>
                            <option value="devices">Sort: Devices</option>
                            <option value="dataPoints">Sort: Data Points</option>
                        </select>

                        {/* View toggle */}
                        <div className="flex rounded-xl border border-border/60 bg-card overflow-hidden">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Project List / Grid ───────────────────── */}
                {displayed.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 py-20 text-center">
                        <span className="mb-3 text-5xl">🔍</span>
                        <h3 className="text-lg font-semibold text-foreground">No projects found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {search || filterStatus !== "All"
                                ? "Try adjusting your search or filters."
                                : "Create your first project to get started."}
                        </p>
                        {!search && filterStatus === "All" && (
                            <button
                                onClick={() => setShowForm(true)}
                                className="mt-5 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary"
                            >
                                + New Project
                            </button>
                        )}
                    </div>
                ) : viewMode === "grid" ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {displayed.map((p) => (
                            <ProjectGridCard
                                key={p.id}
                                project={p}
                                onOpen={() => navigate(`/projects/${p.id}/edit`)}
                                onEdit={() => setEditProject(p)}
                                onDelete={() => setDeleteTarget(p)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {displayed.map((p) => (
                            <ProjectListRow
                                key={p.id}
                                project={p}
                                onOpen={() => navigate(`/projects/${p.id}/edit`)}
                                onEdit={() => setEditProject(p)}
                                onDelete={() => setDeleteTarget(p)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* ── Modals ───────────────────────────────────── */}
            {showForm && (
                <ProjectFormModal onSave={handleCreate} onClose={() => setShowForm(false)} />
            )}
            {editProject && (
                <ProjectFormModal initial={editProject} onSave={handleEdit} onClose={() => setEditProject(null)} />
            )}
            {deleteTarget && (
                <DeleteModal project={deleteTarget} onConfirm={handleDelete} onClose={() => setDeleteTarget(null)} />
            )}
        </div>
    );
};

export default ProjectsPage;
