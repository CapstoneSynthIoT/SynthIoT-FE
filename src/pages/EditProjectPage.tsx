import { useState, useRef, useCallback, useEffect, KeyboardEvent, MouseEvent } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import logoText from "@/assets/Screenshot_2026-02-11_150622-removebg-preview.png";

// ─── Types ─────────────────────────────────────────────────────────────────────
type ProjectStatus = "Active" | "Idle" | "Warning";
interface Project { id: number; name: string; description: string; devices: number; dataPoints: number; uptime: number; status: ProjectStatus; lastActivity: string; icon: string; createdAt: string; tags: string[]; }
interface DataRow { id: string; date: string; time: string; temperature: string; humidity: string; location: string; }

// ─── Data ──────────────────────────────────────────────────────────────────────
const PROJECTS_STORE: Project[] = [
    { id: 1, name: "Smart Factory Grid", description: "Industrial sensor network monitoring production line health and equipment vitals in real-time.", devices: 48, dataPoints: 128400, uptime: 99.2, status: "Active", lastActivity: "2 min ago", icon: "🏭", createdAt: "2025-03-12", tags: ["industrial", "sensors", "monitoring"] },
    { id: 2, name: "Urban Weather Net", description: "City-wide environmental monitoring with 50+ weather nodes tracking temperature, humidity, and air quality.", devices: 53, dataPoints: 94200, uptime: 97.8, status: "Active", lastActivity: "8 min ago", icon: "🌦️", createdAt: "2025-04-05", tags: ["environment", "weather", "urban"] },
    { id: 3, name: "AgriSense Fields", description: "Precision agriculture soil & moisture analytics to optimize irrigation and crop yield predictions.", devices: 22, dataPoints: 41800, uptime: 85.4, status: "Warning", lastActivity: "34 min ago", icon: "🌾", createdAt: "2025-05-20", tags: ["agriculture", "soil", "irrigation"] },
    { id: 4, name: "Cold Chain Monitor", description: "Pharmaceutical cold-storage temperature compliance across distributed warehouse locations.", devices: 15, dataPoints: 22300, uptime: 100, status: "Active", lastActivity: "1 min ago", icon: "❄️", createdAt: "2025-06-01", tags: ["pharma", "temperature", "compliance"] },
    { id: 5, name: "Office Energy Hub", description: "Smart building energy usage optimisation with automated scheduling and anomaly detection.", devices: 9, dataPoints: 8700, uptime: 72.1, status: "Idle", lastActivity: "3 hr ago", icon: "⚡", createdAt: "2025-06-18", tags: ["energy", "building", "automation"] },
];
const STATUS_STYLES: Record<ProjectStatus, { dot: string; badge: string }> = {
    Active: { dot: "bg-emerald-400", badge: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" },
    Warning: { dot: "bg-amber-400 animate-pulse", badge: "bg-amber-400/10  text-amber-400  border-amber-400/20" },
    Idle: { dot: "bg-slate-400", badge: "bg-slate-400/10  text-slate-400  border-slate-400/20" },
};
const LOCATIONS = ["Rainforest", "Desert", "Arctic", "Coastal", "Urban", "Mountain", "Savanna", "Wetland"];
const MOCK_USER = { name: "Alex Johnson", email: "alex.johnson@synthiot.com", avatarInitials: "AJ" };

function generateRows(count = 50): DataRow[] {
    const base = new Date(2025, 0, 15, 12, 0, 0);
    return Array.from({ length: count }, (_, i) => {
        const d = new Date(base.getTime() + i * 30_000);
        return { id: String(i + 1), date: d.toLocaleDateString("en-GB"), time: d.toLocaleTimeString("en-GB"), temperature: (80 + Math.random() * 6).toFixed(2), humidity: (75 + Math.random() * 5).toFixed(1), location: LOCATIONS[i % 4] };
    });
}

const COLS: { key: keyof DataRow; label: string; w: number; editable: boolean; right?: boolean }[] = [
    { key: "date", label: "Date", w: 132, editable: true },
    { key: "time", label: "Time", w: 110, editable: true },
    { key: "temperature", label: "Temperature", w: 130, editable: true, right: true },
    { key: "humidity", label: "Humidity (%)", w: 130, editable: true, right: true },
    { key: "location", label: "Location", w: 150, editable: true },
];

// ─── AppHeader ─────────────────────────────────────────────────────────────────
function AppHeader() {
    const [open, setOpen] = useState(false);
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
            <div className="flex h-16 items-center justify-between px-5">
                <Link to="/" className="flex items-center">
                    <img src={logo} className="h-12 w-12" alt="" />
                    <img src={logoText} className="h-9 -ml-4 relative top-1" alt="" />
                </Link>
                <div className="relative">
                    <button onClick={() => setOpen(!open)} className="flex items-center gap-2 rounded-xl border border-border/60 bg-card px-3 py-1.5 text-sm hover:bg-muted transition-colors">
                        <div className="h-7 w-7 flex items-center justify-center rounded-lg bg-primary/20 text-xs font-bold text-primary">{MOCK_USER.avatarInitials}</div>
                        <span className="hidden sm:block font-medium text-foreground">{MOCK_USER.name}</span>
                        <svg className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {open && (
                        <div className="absolute right-0 mt-1.5 w-48 rounded-xl border border-border/60 bg-card shadow-2xl overflow-hidden z-50">
                            <div className="border-b border-border/50 px-4 py-2.5"><p className="text-sm font-semibold text-foreground">{MOCK_USER.name}</p><p className="text-xs text-muted-foreground">{MOCK_USER.email}</p></div>
                            <div className="p-1">
                                <Link to="/home" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted">Home</Link>
                                <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted">Profile</Link>
                                <div className="my-1 border-t border-border/50" />
                                <Link to="/signin" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10">Sign Out</Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

// ─── Editable Cell ─────────────────────────────────────────────────────────────
function Cell({ value, editable, right, isActive, onActivate, onChange, onNav, onFillHandleMouseDown }: {
    value: string; editable: boolean; right?: boolean; isActive: boolean;
    onActivate: () => void; onChange: (v: string) => void; onNav: (d: "up" | "down" | "left" | "right" | "enter" | "escape") => void;
    onFillHandleMouseDown?: (e: React.MouseEvent) => void;
}) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(value);
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => { setDraft(value); }, [value]);
    useEffect(() => { if (isActive && editing) ref.current?.focus(); }, [isActive, editing]);
    const commit = () => { onChange(draft); setEditing(false); };
    const kd = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") { e.preventDefault(); commit(); onNav("enter"); }
        if (e.key === "Escape") { setDraft(value); setEditing(false); onNav("escape"); }
        if (e.key === "Tab") { e.preventDefault(); commit(); onNav(e.shiftKey ? "left" : "right"); }
        if (e.key === "ArrowDown") { e.preventDefault(); commit(); onNav("down"); }
        if (e.key === "ArrowUp") { e.preventDefault(); commit(); onNav("up"); }
    };
    const ck = (e: KeyboardEvent<HTMLDivElement>) => {
        if (!editable) return;
        if (e.key === "Enter" || e.key === "F2") { setEditing(true); return; }
        if (e.key === "ArrowDown") { onNav("down"); return; }
        if (e.key === "ArrowUp") { onNav("up"); return; }
        if (e.key === "ArrowLeft") { onNav("left"); return; }
        if (e.key === "ArrowRight") { onNav("right"); return; }
        if (e.key === "Tab") { e.preventDefault(); onNav(e.shiftKey ? "left" : "right"); return; }
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) { setDraft(e.key); setEditing(true); }
    };
    return (
        <div tabIndex={0} onFocus={onActivate} onClick={onActivate} onDoubleClick={() => { if (editable) setEditing(true); }} onKeyDown={ck}
            className={`relative flex h-full w-full items-center outline-none select-none ${isActive ? "ring-2 ring-inset ring-primary z-10" : ""} ${editable ? "cursor-cell" : "cursor-default"}`}>
            {editing && editable
                ? <input ref={ref} value={draft} onChange={e => setDraft(e.target.value)} onBlur={commit} onKeyDown={kd}
                    className="absolute inset-0 w-full bg-[hsl(228_35%_17%)] px-3 text-sm text-foreground outline-none border-2 border-primary z-20" autoFocus />
                : <span className={`truncate px-3 text-sm text-foreground w-full ${right ? "text-right" : ""}`}>{value || <span className="text-muted-foreground/30">—</span>}</span>
            }
            {/* Fill handle — bottom-right corner, only on active cell */}
            {isActive && editable && onFillHandleMouseDown && (
                <div
                    onMouseDown={e => { e.stopPropagation(); onFillHandleMouseDown(e); }}
                    title="Drag to fill"
                    className="absolute bottom-0 right-0 h-3 w-3 cursor-crosshair bg-primary z-30"
                    style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
                />
            )}
        </div>
    );
}

// ─── Generate Modal ─────────────────────────────────────────────────────────────
function GenerateModal({ count, defLoc, onGenerate, onClose, loading }: {
    count: number; defLoc: string;
    onGenerate: (p: string, l: string, s: number) => void; onClose: () => void; loading: boolean;
}) {
    const [prompt, setPrompt] = useState(""); const [loc, setLoc] = useState(defLoc); const [sm, setSm] = useState(1); const [err, setErr] = useState(false);
    const submit = (e: React.FormEvent) => { e.preventDefault(); if (!prompt.trim()) { setErr(true); return; } onGenerate(prompt.trim(), loc, sm); };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={!loading ? onClose : undefined} />
            <div className="relative w-full max-w-lg card-shine rounded-2xl border border-border/60 bg-card shadow-2xl overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary to-accent/60" />
                <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-primary/15">
                            <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div><h2 className="text-base font-bold text-foreground">Generate Data</h2><p className="text-xs text-muted-foreground">{count} rows selected</p></div>
                    </div>
                    {!loading && <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"><svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>}
                </div>
                {loading ? (
                    <div className="flex flex-col items-center justify-center gap-5 px-8 py-14">
                        <div className="relative h-16 w-16">
                            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
                            <div className="absolute inset-2 animate-ping rounded-full bg-primary/10" />
                        </div>
                        <div className="text-center"><p className="text-sm font-semibold text-foreground">Synthesizing data…</p><p className="mt-1 text-xs text-muted-foreground">Applying smoothing and generating {count} new readings</p></div>
                        <div className="w-full overflow-hidden rounded-full bg-muted h-1.5 relative">
                            <div className="h-full rounded-full bg-primary absolute" style={{ animation: "indeterminate 1.8s ease-in-out infinite" }} />
                        </div>
                        <style>{`@keyframes indeterminate{0%{left:0;width:0}50%{left:20%;width:60%}100%{left:100%;width:0}}`}</style>
                    </div>
                ) : (
                    <form onSubmit={submit} className="space-y-5 px-6 py-5">
                        <div>
                            <label className="mb-1.5 flex items-center gap-1 text-sm font-medium text-foreground">Prompt <span className="text-destructive text-xs">*</span><span className="ml-auto text-[10px] text-muted-foreground font-normal">Required</span></label>
                            <textarea rows={3} value={prompt} onChange={e => { setPrompt(e.target.value); if (e.target.value.trim()) setErr(false); }} placeholder="Describe the pattern, e.g. 'Gradual temperature rise with humidity spikes'…"
                                className={`w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 ${err ? "border-destructive focus:ring-destructive/20" : "border-input focus:border-primary focus:ring-primary/20"}`} />
                            {err && <p className="mt-1 text-xs text-destructive">A prompt is required to generate data.</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-foreground">Location<span className="text-[10px] text-muted-foreground font-normal">Optional</span></label>
                                <input value={loc} onChange={e => setLoc(e.target.value)} placeholder="e.g. Rainforest, Lab-3…"
                                    className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                            </div>
                            <div>
                                <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-foreground">Smoothing<span className={`text-xs font-bold ${sm <= 1 ? "text-primary" : sm <= 2 ? "text-amber-400" : "text-emerald-400"}`}>{sm.toFixed(1)}</span></label>
                                <input type="range" min={0.1} max={5} step={0.1} value={sm} onChange={e => setSm(Number(e.target.value))} className="w-full accent-primary mt-1" />
                                <div className="flex justify-between text-[10px] text-muted-foreground mt-1"><span>Sharp</span><span>Default: 1.0</span><span>Smooth</span></div>
                            </div>
                        </div>
                        <div className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                            <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <p className="text-xs text-muted-foreground leading-relaxed">SynthIoT will synthesize new <strong className="text-foreground">Temperature</strong> and <strong className="text-foreground">Humidity</strong> values for the {count} selected rows.</p>
                        </div>
                        <div className="flex gap-3 border-t border-border/50 pt-4">
                            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors">Cancel</button>
                            <button type="submit" className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 glow-primary transition-all">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>Generate
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
const EditProjectPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const project = PROJECTS_STORE.find(p => String(p.id) === id) ?? PROJECTS_STORE[0];
    const s = STATUS_STYLES[project.status];

    // Sidebar
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [sidebarWidth, setSidebarWidth] = useState(288); // px, default ~18rem
    const isResizing = useRef(false);

    const startResize = (e: React.MouseEvent) => {
        e.preventDefault();
        isResizing.current = true;
        const startX = e.clientX;
        const startW = sidebarWidth;
        const onMove = (me: globalThis.MouseEvent) => {
            if (!isResizing.current) return;
            const next = Math.min(520, Math.max(160, startW + me.clientX - startX));
            setSidebarWidth(next);
        };
        const onUp = () => {
            isResizing.current = false;
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    };

    // Meta
    const [meta, setMeta] = useState({ name: project.name, description: project.description, status: project.status as ProjectStatus, uptime: project.uptime, tags: project.tags });
    const [tagInput, setTagInput] = useState("");
    const [saved, setSaved] = useState(false);

    // Table
    const [rows, setRows] = useState<DataRow[]>(() => generateRows(50));
    const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [search, setSearch] = useState("");
    const [sortCol, setSortCol] = useState<keyof DataRow | null>(null);
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
    const [highlightIds, setHighlightIds] = useState<Set<string>>(new Set());
    const [showGenModal, setShowGenModal] = useState(false);
    const [genLoading, setGenLoading] = useState(false);

    // Drag-select state
    const dragStart = useRef<number | null>(null);
    const isDragging = useRef(false);
    const lastShiftAnchor = useRef<number | null>(null);

    // Fill-handle drag state
    type FillDrag = { srcRow: number; srcCol: number; srcValue: string; previewRows: Set<number> } | null;
    const [fillDrag, setFillDrag] = useState<FillDrag>(null);
    const fillDragRef = useRef<FillDrag>(null);
    fillDragRef.current = fillDrag;

    // Fill confirm pending state
    type FillConfirm = { srcRow: number; srcCol: number; srcValue: string; indices: number[] } | null;
    const [fillConfirm, setFillConfirm] = useState<FillConfirm>(null);

    const displayed = (() => {
        let list = rows.filter(r => !search || Object.values(r).some(v => String(v).toLowerCase().includes(search.toLowerCase())));
        if (sortCol) list = [...list].sort((a, b) => { const av = a[sortCol], bv = b[sortCol]; const n = Number(av) - Number(bv); const c = isNaN(n) ? String(av).localeCompare(String(bv)) : n; return sortDir === "asc" ? c : -c; });
        return list;
    })();

    const updateCell = useCallback((rowId: string, col: keyof DataRow, val: string) => { setRows(p => p.map(r => r.id === rowId ? { ...r, [col]: val } : r)); }, []);

    const navCell = (dir: "up" | "down" | "left" | "right" | "enter" | "escape") => {
        if (!activeCell) return;
        const { row, col } = activeCell;
        const R = displayed.length, C = COLS.length;
        if (dir === "down" || dir === "enter") setActiveCell({ row: Math.min(row + 1, R - 1), col });
        else if (dir === "up") setActiveCell({ row: Math.max(row - 1, 0), col });
        else if (dir === "right") setActiveCell({ row, col: Math.min(col + 1, C - 1) });
        else if (dir === "left") setActiveCell({ row, col: Math.max(col - 1, 0) });
        else if (dir === "escape") setActiveCell(null);
    };

    // ── Row selection helpers
    const selectRange = (from: number, to: number, base: Set<string>) => {
        const next = new Set(base);
        const lo = Math.min(from, to), hi = Math.max(from, to);
        for (let i = lo; i <= hi; i++) if (displayed[i]) next.add(displayed[i].id);
        return next;
    };

    const handleRowMouseDown = (e: MouseEvent, ri: number) => {
        // Don't interfere with cell editing clicks
        const target = e.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;

        if (e.shiftKey && lastShiftAnchor.current !== null) {
            // Shift+click: range select from anchor
            setSelectedIds(selectRange(lastShiftAnchor.current, ri, new Set()));
            return;
        }
        if (e.ctrlKey || e.metaKey) {
            // Ctrl+click: toggle single
            const next = new Set(selectedIds);
            displayed[ri] && (next.has(displayed[ri].id) ? next.delete(displayed[ri].id) : next.add(displayed[ri].id));
            setSelectedIds(next);
            lastShiftAnchor.current = ri;
            return;
        }
        // Plain click — start drag
        isDragging.current = false;
        dragStart.current = ri;
        lastShiftAnchor.current = ri;

        const onMove = (me: globalThis.MouseEvent) => {
            if (!isDragging.current) isDragging.current = true;
            const rows2 = document.querySelectorAll("[data-row-index]");
            let closest: number | null = null;
            rows2.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (me.clientY >= rect.top && me.clientY <= rect.bottom) closest = Number(el.getAttribute("data-row-index"));
            });
            if (closest !== null && dragStart.current !== null) {
                setSelectedIds(selectRange(dragStart.current, closest, new Set()));
            }
        };
        const onUp = () => {
            if (!isDragging.current && dragStart.current !== null) {
                // simple click — select only this row (unless checkbox)
                const clickedId = displayed[dragStart.current]?.id;
                if (clickedId) setSelectedIds(new Set([clickedId]));
            }
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    };

    // ── Fill handle drag
    const handleFillHandleMouseDown = (srcRow: number, srcCol: number, srcValue: string) => {
        setFillDrag({ srcRow, srcCol, srcValue, previewRows: new Set([srcRow]) });

        const onMove = (me: globalThis.MouseEvent) => {
            const els = document.querySelectorAll("[data-row-index]");
            let targetRow: number | null = null;
            els.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (me.clientY >= rect.top && me.clientY <= rect.bottom)
                    targetRow = Number(el.getAttribute("data-row-index"));
            });
            if (targetRow !== null && fillDragRef.current) {
                const { srcRow: sr } = fillDragRef.current;
                const lo = Math.min(sr, targetRow), hi = Math.max(sr, targetRow);
                const preview = new Set<number>();
                for (let i = lo; i <= hi; i++) preview.add(i);
                setFillDrag(prev => prev ? { ...prev, previewRows: preview } : null);
            }
        };

        const onUp = () => {
            const drag = fillDragRef.current;
            if (drag && drag.previewRows.size > 1) {
                const { srcRow: sr, srcCol: sc, srcValue: sv, previewRows } = drag;
                const indices = [...previewRows].sort((a, b) => a - b);
                // Instead of applying immediately, show confirmation
                setFillConfirm({ srcRow: sr, srcCol: sc, srcValue: sv, indices });
            }
            setFillDrag(null);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    };

    // Apply the pending fill after confirmation
    const applyFill = () => {
        if (!fillConfirm) return;
        const { srcRow: sr, srcCol: sc, srcValue: sv, indices } = fillConfirm;
        const num = Number(sv);
        const isNum = !isNaN(num) && sv.trim() !== "";
        setRows(prev => {
            const next = [...prev];
            indices.forEach(dispIdx => {
                const rowId = displayed[dispIdx]?.id;
                if (!rowId) return;
                const ri = next.findIndex(r => r.id === rowId);
                if (ri === -1) return;
                const col = COLS[sc].key;
                const offset = dispIdx - sr;
                const fillVal = isNum
                    ? (num + offset).toFixed(sv.includes(".") ? (sv.split(".")[1]?.length ?? 2) : 0)
                    : sv;
                next[ri] = { ...next[ri], [col]: fillVal };
            });
            return next;
        });
        setFillConfirm(null);
    };

    const handleGenerate = (prompt: string, loc: string, sm: number) => {
        setGenLoading(true);
        setTimeout(() => {
            void prompt;
            setRows(p => p.map(r => {
                if (!selectedIds.has(r.id)) return r;
                const v = 1 / Math.max(sm, 0.1);
                return { ...r, temperature: (80 + Math.random() * 8 + (Math.random() - .5) * 4 * v).toFixed(2), humidity: (74 + Math.random() * 10 + (Math.random() - .5) * 6 * v).toFixed(1), location: loc };
            }));
            setHighlightIds(new Set(selectedIds));
            setTimeout(() => setHighlightIds(new Set()), 2200);
            setGenLoading(false);
            setShowGenModal(false);
            setSelectedIds(new Set());
        }, 1800 + Math.random() * 1200);
    };

    const addRow = () => {
        const last = rows[rows.length - 1];
        setRows(p => [...p, { id: String(Date.now()), date: last?.date ?? new Date().toLocaleDateString("en-GB"), time: new Date().toLocaleTimeString("en-GB"), temperature: (80 + Math.random() * 5).toFixed(2), humidity: (75 + Math.random() * 5).toFixed(1), location: last?.location ?? "Rainforest" }]);
    };
    const deleteSelected = () => { setRows(p => p.filter(r => !selectedIds.has(r.id))); setSelectedIds(new Set()); setActiveCell(null); };
    const addTag = () => { const t = tagInput.trim().toLowerCase(); if (t && !meta.tags.includes(t)) setMeta(m => ({ ...m, tags: [...m.tags, t] })); setTagInput(""); };
    const defLoc = (() => { const locs = rows.filter(r => selectedIds.has(r.id)).map(r => r.location); if (!locs.length) return LOCATIONS[0]; const f: Record<string, number> = {}; locs.forEach(l => { f[l] = (f[l] ?? 0) + 1; }); return Object.entries(f).sort((a, b) => b[1] - a[1])[0][0]; })();
    const canGen = selectedIds.size > 5;
    const avgTemp = rows.length ? (rows.reduce((s, r) => s + Number(r.temperature), 0) / rows.length).toFixed(2) : "—";
    const avgHum = rows.length ? (rows.reduce((s, r) => s + Number(r.humidity), 0) / rows.length).toFixed(1) : "—";

    return (
        <div className="h-screen flex flex-col overflow-hidden bg-background">
            <AppHeader />
            <div className="pointer-events-none fixed inset-0" style={{ background: "var(--gradient-glow)" }} />

            {/* ── Body: sidebar + table ─── */}
            <div className="flex flex-1 overflow-hidden pt-16">

                {/* ── LEFT SIDEBAR ─────────────────────────────────── */}
                <aside
                    className="flex flex-col border-r border-border/60 bg-card/60 backdrop-blur-sm overflow-y-auto flex-shrink-0 transition-[width] duration-300"
                    style={{ width: sidebarOpen ? sidebarWidth : 0, minWidth: 0, overflow: sidebarOpen ? undefined : "hidden" }}
                >
                    <div className="flex-1 px-4 py-4 space-y-5">

                        {/* Project header */}
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-2xl">{project.icon}</span>
                                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${s.badge}`}>
                                    <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${s.dot}`} />
                                    {project.status}
                                </span>
                            </div>
                            <input value={meta.name} onChange={e => setMeta(m => ({ ...m, name: e.target.value }))}
                                className="w-full bg-transparent text-base font-bold text-foreground focus:outline-none border-b border-transparent focus:border-primary pb-0.5 transition-colors" />
                        </div>

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
                            <Link to="/home" className="hover:text-foreground">Home</Link><span>/</span>
                            <Link to="/projects" className="hover:text-foreground">Projects</Link><span>/</span>
                            <span className="text-foreground truncate max-w-[7rem]">{meta.name}</span>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Description</label>
                            <textarea rows={3} value={meta.description} onChange={e => setMeta(m => ({ ...m, description: e.target.value }))}
                                className="mt-1 w-full resize-none rounded-lg border border-input bg-background/60 px-3 py-2 text-xs text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20" />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Status</label>
                            <select value={meta.status} onChange={e => setMeta(m => ({ ...m, status: e.target.value as ProjectStatus }))}
                                className="mt-1 w-full rounded-lg border border-input bg-background/60 px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20">
                                <option value="Active">Active</option><option value="Warning">Warning</option><option value="Idle">Idle</option>
                            </select>
                        </div>

                        {/* Uptime */}
                        <div>
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                                Uptime
                                <span className={`font-bold text-xs ${meta.uptime >= 95 ? "text-emerald-400" : meta.uptime >= 80 ? "text-amber-400" : "text-red-400"}`}>{meta.uptime.toFixed(1)}%</span>
                            </label>
                            <input type="range" min={0} max={100} step={0.1} value={meta.uptime} onChange={e => setMeta(m => ({ ...m, uptime: Number(e.target.value) }))} className="w-full accent-primary mt-1" />
                            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                <div className={`h-full rounded-full ${meta.uptime >= 95 ? "bg-emerald-400" : meta.uptime >= 80 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${meta.uptime}%` }} />
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Tags</label>
                            <div className="mt-1 flex gap-1.5">
                                <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Add tag…"
                                    className="flex-1 min-w-0 rounded-lg border border-input bg-background/60 px-2.5 py-1.5 text-xs focus:border-primary focus:outline-none" />
                                <button onClick={addTag} className="rounded-lg border border-border/60 px-2.5 py-1.5 text-xs hover:bg-muted transition-colors">Add</button>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                                {meta.tags.map(t => (
                                    <span key={t} className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                                        {t}<button onClick={() => setMeta(m => ({ ...m, tags: m.tags.filter(x => x !== t) }))} className="opacity-60 hover:opacity-100">×</button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-border/50" />

                        {/* Dataset stats */}
                        <div>
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Dataset Stats</label>
                            <div className="mt-2 space-y-2">
                                {[
                                    { label: "Total Rows", value: String(rows.length), color: "text-primary" },
                                    { label: "Avg Temp", value: `${avgTemp}°`, color: "text-amber-400" },
                                    { label: "Avg Humidity", value: `${avgHum}%`, color: "text-sky-400" },
                                    { label: "High-temp Rows", value: String(rows.filter(r => Number(r.temperature) >= 83).length), color: "text-rose-400" },
                                ].map(st => (
                                    <div key={st.label} className="flex items-center justify-between rounded-lg bg-background/40 px-3 py-2">
                                        <span className="text-xs text-muted-foreground">{st.label}</span>
                                        <span className={`text-sm font-bold ${st.color}`}>{st.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Created at */}
                        <p className="text-[10px] text-muted-foreground">Created: <span className="text-foreground">{project.createdAt}</span></p>
                    </div>

                    {/* Sidebar save button */}
                    <div className="border-t border-border/50 px-4 py-3 space-y-2">
                        <button onClick={() => navigate("/projects")} className="w-full flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>Back to Projects
                        </button>
                        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110 glow-primary transition-all">
                            {saved
                                ? <><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Saved!</>
                                : <><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>Save Changes</>
                            }
                        </button>
                    </div>
                </aside>

                {/* ── Resize Handle ── */}
                {sidebarOpen && (
                    <div
                        onMouseDown={startResize}
                        className="group relative z-10 flex w-1 flex-shrink-0 cursor-col-resize items-center justify-center bg-border/40 hover:bg-primary/40 transition-colors duration-150"
                        title="Drag to resize sidebar"
                    >
                        {/* Visual pip */}
                        <div className="h-8 w-0.5 rounded-full bg-border/60 group-hover:bg-primary transition-colors duration-150" />
                    </div>
                )}

                {/* ── MAIN CONTENT ─────────────────────────────────── */}
                <main className="flex flex-1 flex-col overflow-hidden">

                    {/* Toolbar */}
                    <div className="flex items-center gap-2 border-b border-border/50 bg-card/40 px-4 py-2.5 flex-shrink-0 flex-wrap">
                        {/* Sidebar toggle */}
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} title="Toggle sidebar"
                            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex-shrink-0">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>

                        <div className="h-5 w-px bg-border/60 flex-shrink-0" />

                        {/* Search */}
                        <div className="relative flex-1 min-w-[160px] max-w-xs">
                            <svg className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
                                className="w-full rounded-lg border border-input bg-card py-1.5 pl-8 pr-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20" />
                        </div>

                        {/* Selection badge */}
                        {selectedIds.size > 0 && (
                            <span className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium border ${canGen ? "border-primary/40 bg-primary/10 text-primary" : "border-border/60 bg-muted text-muted-foreground"}`}>
                                {selectedIds.size} selected{!canGen && <span className="opacity-60"> — select &gt;5</span>}
                            </span>
                        )}

                        <div className="ml-auto flex items-center gap-2 flex-wrap">
                            {/* Generate Selected */}
                            {canGen && (
                                <button onClick={() => setShowGenModal(true)}
                                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-1.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:brightness-110 hover:-translate-y-px active:translate-y-0 transition-all">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    Generate Selected
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-bold">{selectedIds.size}</span>
                                </button>
                            )}
                            {/* Delete */}
                            {selectedIds.size > 0 && (
                                <button onClick={deleteSelected} className="flex items-center gap-1.5 rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-1.5 text-sm text-destructive hover:bg-destructive/20 transition-colors">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>Delete
                                </button>
                            )}
                            {/* Add row */}
                            <button onClick={addRow} className="flex items-center gap-1.5 rounded-xl border border-border/60 bg-card px-3 py-1.5 text-sm text-foreground hover:bg-muted transition-colors">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add Row
                            </button>

                            <div className="h-5 w-px bg-border/60 flex-shrink-0" />

                            {/* View Analytics */}
                            <button
                                onClick={() => window.open(`/projects/${project.id}/analytics`, "_blank")}
                                className="flex items-center gap-2 rounded-xl border border-sky-400/40 bg-sky-400/10 px-3 py-1.5 text-sm font-medium text-sky-400 hover:bg-sky-400/20 transition-colors"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                View Analytics
                                <svg className="h-3 w-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </button>
                        </div>
                    </div>

                    {/* Tip bar */}
                    <div className="flex items-center gap-3 px-4 py-1.5 bg-background/40 border-b border-border/30 flex-shrink-0">
                        <p className="text-[11px] text-muted-foreground">
                            💡 <strong>Click &amp; drag rows</strong> to select · <kbd className="rounded bg-muted px-1 font-mono text-[10px]">Shift</kbd>+click range · <kbd className="rounded bg-muted px-1 font-mono text-[10px]">Ctrl</kbd>+click toggle · <kbd className="rounded bg-muted px-1 font-mono text-[10px]">F2</kbd>/double-click to edit · <strong>Drag ▸ corner</strong> of active cell to fill (strings repeat, numbers AP) · &gt;5 rows → <span className="text-primary font-medium">Generate Selected</span>
                        </p>
                    </div>

                    {/* TABLE — fills all remaining height */}
                    <div className="flex-1 overflow-auto relative" style={{ userSelect: "none" }}>
                        <table className="w-full border-collapse text-sm" style={{ tableLayout: "fixed", minWidth: COLS.reduce((s, c) => s + c.w, 80) }}>
                            <colgroup>
                                <col style={{ width: 40 }} />{/* checkbox */}
                                <col style={{ width: 40 }} />{/* # */}
                                {COLS.map(c => <col key={c.key} style={{ width: c.w }} />)}
                            </colgroup>

                            <thead className="sticky top-0 z-20">
                                <tr className="border-b border-border/60 bg-[hsl(228_38%_9%)]">
                                    <th className="border-r border-border/40 px-3 py-3 text-center select-none">
                                        <input type="checkbox" checked={selectedIds.size === displayed.length && displayed.length > 0}
                                            onChange={e => setSelectedIds(e.target.checked ? new Set(displayed.map(r => r.id)) : new Set())}
                                            className="accent-primary cursor-pointer h-3.5 w-3.5" />
                                    </th>
                                    <th className="border-r border-border/40 px-2 py-3 text-center text-[11px] font-medium text-muted-foreground/50 select-none">#</th>
                                    {COLS.map((col, ci) => (
                                        <th key={col.key} onClick={() => { if (sortCol === col.key) setSortDir(d => d === "asc" ? "desc" : "asc"); else { setSortCol(col.key); setSortDir("asc"); } }}
                                            className={`border-r border-border/40 px-3 py-3 text-left text-xs font-semibold text-muted-foreground cursor-pointer select-none hover:bg-muted/50 transition-colors ${ci === COLS.length - 1 ? "border-r-0" : ""}`}>
                                            <span className="flex items-center gap-1">
                                                {col.label}
                                                {sortCol === col.key && <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sortDir === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} /></svg>}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {displayed.length === 0
                                    ? <tr><td colSpan={COLS.length + 2} className="py-20 text-center text-sm text-muted-foreground">No rows match your search.</td></tr>
                                    : displayed.map((row, ri) => {
                                        const isSel = selectedIds.has(row.id);
                                        const isFlash = highlightIds.has(row.id);
                                        return (
                                            <tr key={row.id}
                                                data-row-index={ri}
                                                onMouseDown={e => handleRowMouseDown(e, ri)}
                                                className={`border-b border-border/20 transition-colors duration-200 cursor-default
                                                    ${isFlash ? "bg-primary/15" : isSel ? "bg-primary/10" : ri % 2 !== 0 ? "bg-[hsl(228_35%_11%)]" : ""}
                                                    hover:bg-primary/5
                                                `}>
                                                <td className="border-r border-border/20 px-3 py-0 text-center h-10">
                                                    <input type="checkbox" checked={isSel} onChange={e => { const n = new Set(selectedIds); e.target.checked ? n.add(row.id) : n.delete(row.id); setSelectedIds(n); }}
                                                        className="accent-primary cursor-pointer h-3.5 w-3.5" />
                                                </td>
                                                <td className="border-r border-border/20 px-2 py-0 text-center text-[11px] text-muted-foreground/50 select-none h-10">{ri + 1}</td>
                                                {COLS.map((col, ci) => {
                                                    const isCellAct = activeCell?.row === ri && activeCell?.col === ci;
                                                    const isFillPreview = fillDrag !== null && fillDrag.previewRows.has(ri) && fillDrag.srcCol === ci && ri !== fillDrag.srcRow;
                                                    return (
                                                        <td key={col.key} className={`border-r border-border/20 p-0 h-10 ${ci === COLS.length - 1 ? "border-r-0" : ""} ${isFillPreview ? "bg-primary/20 outline outline-1 outline-primary/50" : ""}`}>
                                                            <Cell value={String(row[col.key])} editable={col.editable} right={col.right}
                                                                isActive={isCellAct}
                                                                onActivate={() => setActiveCell({ row: ri, col: ci })}
                                                                onChange={v => updateCell(row.id, col.key, v)}
                                                                onNav={navCell}
                                                                onFillHandleMouseDown={isCellAct ? (e) => { e.preventDefault(); handleFillHandleMouseDown(ri, ci, String(row[col.key])); } : undefined} />
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })
                                }
                                {/* Add-row footer */}
                                <tr className="border-t border-border/30">
                                    <td colSpan={COLS.length + 2} className="px-4 py-2.5">
                                        <button onClick={addRow} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add row
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Status bar */}
                    <div className="flex items-center gap-4 border-t border-border/40 bg-card/40 px-4 py-1.5 text-[11px] text-muted-foreground flex-shrink-0">
                        <span><span className="text-foreground font-medium">{displayed.length}</span> rows</span>
                        <span className="h-3 w-px bg-border" />
                        <span><span className="text-foreground font-medium">{COLS.length}</span> columns</span>
                        {selectedIds.size > 0 && <><span className="h-3 w-px bg-border" /><span><span className={`font-medium ${canGen ? "text-primary" : "text-foreground"}`}>{selectedIds.size}</span> selected{canGen && <span className="text-primary ml-1">✓ ready to generate</span>}</span></>}
                        {activeCell && <><span className="h-3 w-px bg-border" /><span>Cell <span className="font-mono text-foreground">{String.fromCharCode(65 + activeCell.col)}{activeCell.row + 1}</span></span></>}
                        <span className="ml-auto">Last saved: <span className="text-foreground">{saved ? "just now" : project.lastActivity}</span></span>
                    </div>
                </main>
            </div>

            {/* Fill Confirm Modal */}
            {fillConfirm && (() => {
                const { srcCol, srcValue, indices } = fillConfirm;
                const colLabel = COLS[srcCol]?.label ?? "column";
                const fillCount = indices.length - 1; // exclude source row
                const num = Number(srcValue);
                const isNum = !isNaN(num) && srcValue.trim() !== "";
                const preview = isNum ? `${srcValue} → ${(num + fillCount).toFixed(srcValue.includes(".") ? (srcValue.split(".")[1]?.length ?? 2) : 0)}` : `"${srcValue}" × ${fillCount}`;
                return (
                    <div className="fixed inset-0 z-50 flex items-end justify-center pb-10 px-4 pointer-events-none">
                        <div className="pointer-events-auto w-full max-w-sm rounded-2xl border border-border/70 bg-card shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
                            <div className="h-0.5 w-full bg-gradient-to-r from-primary/60 via-primary to-accent/60" />
                            <div className="px-5 py-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 h-8 w-8 flex flex-shrink-0 items-center justify-center rounded-lg bg-primary/15">
                                        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-foreground">Fill {fillCount} row{fillCount !== 1 ? "s" : ""} in <span className="text-primary">{colLabel}</span>?</p>
                                        <p className="mt-0.5 text-xs text-muted-foreground truncate">Values: <span className="font-mono text-foreground">{preview}</span></p>
                                        {isNum && <p className="mt-0.5 text-[10px] text-muted-foreground">Arithmetic progression (+1 per row)</p>}
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <button onClick={() => setFillConfirm(null)}
                                        className="flex-1 rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">Cancel</button>
                                    <button onClick={applyFill}
                                        className="flex-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110 glow-primary transition-all">Fill Rows</button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Generate Modal */}
            {showGenModal && <GenerateModal count={selectedIds.size} defLoc={defLoc} onGenerate={handleGenerate} onClose={() => setShowGenModal(false)} loading={genLoading} />}
        </div>
    );
};

export default EditProjectPage;
