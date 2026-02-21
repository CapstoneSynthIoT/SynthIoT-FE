import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import logoText from "@/assets/Screenshot_2026-02-11_150622-removebg-preview.png";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_USER = {
    name: "Alex Johnson",
    email: "alex.johnson@synthiot.com",
    phone: "+1 (555) 021-4832",
    role: "IoT Engineer",
    bio: "Passionate about connecting the physical world to the digital one. Building smarter environments through sensor networks and real-time analytics.",
    location: "San Francisco, CA",
    timezone: "America/Los_Angeles",
    avatarInitials: "AJ",
    joinedDate: "January 2025",
    lastLogin: "Today at 6:38 PM",
};

const ACCOUNT_STATS = [
    { label: "Projects", value: "5" },
    { label: "Devices", value: "147" },
    { label: "Data Points", value: "295k" },
    { label: "Alerts Sent", value: "38" },
];

// ─── Shared Header ────────────────────────────────────────────────────────────

const MOCK_USER_HEADER = {
    name: "Alex Johnson",
    email: "alex.johnson@synthiot.com",
    avatarInitials: "AJ",
};

function AppHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    const user = MOCK_USER_HEADER;

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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
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
                                    <Link to="/projects" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-muted">
                                        <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                        Projects
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

// ─── Section Card Wrapper ─────────────────────────────────────────────────────

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="card-shine rounded-2xl border border-border/60 bg-card shadow-md">
            <div className="flex items-center gap-3 border-b border-border/50 px-6 py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>
                <h2 className="text-base font-semibold text-foreground">{title}</h2>
            </div>
            <div className="p-6">{children}</div>
        </div>
    );
}

// ─── Field Row ────────────────────────────────────────────────────────────────

function Field({
    label, value, type = "text", placeholder, onChange, readOnly = false,
}: {
    label: string; value: string; type?: string; placeholder?: string;
    onChange?: (v: string) => void; readOnly?: boolean;
}) {
    return (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
            <input
                type={type}
                value={value}
                readOnly={readOnly}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${readOnly
                    ? "cursor-not-allowed border-border/40 bg-muted/40 text-muted-foreground"
                    : "border-input bg-background/60 focus:border-primary"
                    }`}
            />
        </div>
    );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"}`}
        >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
        </button>
    );
}

// ─── Toast-like success banner ────────────────────────────────────────────────

function SaveBanner({ message, onDismiss }: { message: string; onDismiss: () => void }) {
    return (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <div className="flex items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 shadow-2xl backdrop-blur-sm">
                <svg className="h-5 w-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-emerald-400">{message}</span>
                <button onClick={onDismiss} className="ml-2 text-emerald-400/60 hover:text-emerald-400">×</button>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const ProfilePage = () => {
    // Personal Info
    const [name, setName] = useState(INITIAL_USER.name);
    const [phone, setPhone] = useState(INITIAL_USER.phone);
    const [role, setRole] = useState(INITIAL_USER.role);
    const [bio, setBio] = useState(INITIAL_USER.bio);
    const [location, setLocation] = useState(INITIAL_USER.location);
    const [timezone, setTimezone] = useState(INITIAL_USER.timezone);

    // Password
    const [currentPw, setCurrentPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [pwError, setPwError] = useState("");

    // Notifications
    const [notifEmail, setNotifEmail] = useState(true);
    const [notifSms, setNotifSms] = useState(false);
    const [notifAlerts, setNotifAlerts] = useState(true);
    const [notifDigest, setNotifDigest] = useState(true);

    // Privacy
    const [twoFactor, setTwoFactor] = useState(false);
    const [sessionAlerts, setSessionAlerts] = useState(true);

    // UI state
    const [banner, setBanner] = useState<string | null>(null);
    const [tab, setTab] = useState<"profile" | "security" | "notifications" | "privacy">("profile");

    const showBanner = (msg: string) => {
        setBanner(msg);
        setTimeout(() => setBanner(null), 3000);
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        showBanner("Profile updated successfully!");
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setPwError("");
        if (newPw.length < 8) { setPwError("Password must be at least 8 characters."); return; }
        if (newPw !== confirmPw) { setPwError("Passwords do not match."); return; }
        if (!currentPw) { setPwError("Please enter your current password."); return; }
        setCurrentPw(""); setNewPw(""); setConfirmPw("");
        showBanner("Password changed successfully!");
    };

    // Avatar colour derived from name
    const avatarColors = [
        "from-blue-500 to-indigo-600",
        "from-violet-500 to-purple-600",
        "from-emerald-500 to-teal-600",
    ];
    const colorIdx = INITIAL_USER.name.charCodeAt(0) % avatarColors.length;

    const TABS = [
        { id: "profile", label: "Profile", icon: "👤" },
        { id: "security", label: "Security", icon: "🔒" },
        { id: "notifications", label: "Notifications", icon: "🔔" },
        { id: "privacy", label: "Privacy", icon: "🛡️" },
    ] as const;

    return (
        <div className="min-h-screen bg-background">
            <AppHeader />

            {/* Background effects */}
            <div className="pointer-events-none fixed inset-0" style={{ background: "var(--gradient-glow)" }} />
            <div className="pointer-events-none fixed right-1/4 top-1/3 h-80 w-80 animate-pulse-glow rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none fixed left-1/4 bottom-1/4 h-64 w-64 animate-pulse-glow rounded-full bg-accent/5 blur-3xl" style={{ animationDelay: "2s" }} />

            <div className="relative mx-auto max-w-5xl px-6 pt-32 pb-16">

                {/* ── Breadcrumb ──────────────────────── */}
                <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <Link to="/home" className="hover:text-foreground transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-foreground">Profile</span>
                </div>

                {/* ── Profile Hero Card ─────────────── */}
                <div className="card-shine mb-8 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xl">
                    {/* Top gradient strip */}
                    <div className="h-24 w-full bg-gradient-to-br from-primary/30 via-accent/20 to-transparent" />

                    <div className="px-8 pb-7">
                        {/* Avatar row — pulled up into the gradient strip with negative margin */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between -mt-10">
                            {/* Left: avatar + info */}
                            <div className="flex items-end gap-4">
                                {/* Avatar with camera badge */}
                                <div className="relative shrink-0">
                                    <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${avatarColors[colorIdx]} text-2xl font-bold text-white shadow-xl ring-4 ring-card`}>
                                        {INITIAL_USER.avatarInitials}
                                    </div>
                                    <button
                                        className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-border/60 bg-card text-muted-foreground shadow transition-colors hover:bg-muted hover:text-foreground"
                                        title="Change avatar"
                                    >
                                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Name & meta — sits beside avatar, aligned to bottom */}
                                <div className="pb-0.5">
                                    <h1 className="text-2xl font-bold text-foreground leading-tight">{name}</h1>
                                    <p className="mt-0.5 text-sm text-muted-foreground">{INITIAL_USER.email}</p>
                                    <div className="mt-2 flex flex-wrap items-center gap-2">
                                        <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-medium text-primary">{role}</span>
                                        <span className="text-xs text-muted-foreground">📍 {location}</span>
                                        <span className="hidden text-xs text-muted-foreground sm:inline">· Member since {INITIAL_USER.joinedDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: last login */}
                            <div className="text-left text-xs text-muted-foreground sm:text-right pb-0.5">
                                <p>Last login</p>
                                <p className="font-medium text-foreground">{INITIAL_USER.lastLogin}</p>
                            </div>
                        </div>

                        {/* Account stats */}
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {ACCOUNT_STATS.map((s) => (
                                <div key={s.label} className="rounded-xl bg-background/50 border border-border/40 px-4 py-3 text-center">
                                    <p className="text-xl font-bold text-primary">{s.value}</p>
                                    <p className="text-xs text-muted-foreground">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Tab Nav ───────────────────────── */}
                <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-border/60 bg-card p-1">
                    {TABS.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all ${tab === t.id
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <span>{t.icon}</span>
                            <span className="hidden sm:inline">{t.label}</span>
                        </button>
                    ))}
                </div>

                {/* ── Tab: Profile ──────────────────── */}
                {tab === "profile" && (
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                        <SectionCard title="Personal Information" icon={
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        }>
                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field label="Full Name" value={name} onChange={setName} placeholder="Your full name" />
                                <Field label="Email" value={INITIAL_USER.email} readOnly placeholder="your@email.com" />
                                <Field label="Phone Number" value={phone} onChange={setPhone} placeholder="+1 (555) 000-0000" />
                                <Field label="Role / Title" value={role} onChange={setRole} placeholder="e.g. IoT Engineer" />
                                <Field label="Location" value={location} onChange={setLocation} placeholder="City, Country" />
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-foreground">Timezone</label>
                                    <select
                                        value={timezone}
                                        onChange={(e) => setTimezone(e.target.value)}
                                        className="w-full rounded-xl border border-input bg-background/60 px-4 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        {[
                                            "America/Los_Angeles",
                                            "America/Chicago",
                                            "America/New_York",
                                            "Europe/London",
                                            "Europe/Berlin",
                                            "Asia/Dubai",
                                            "Asia/Kolkata",
                                            "Asia/Singapore",
                                            "Australia/Sydney",
                                        ].map((tz) => (
                                            <option key={tz} value={tz}>{tz.replace("_", " ")}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="mt-5">
                                <label className="mb-1.5 block text-sm font-medium text-foreground">Bio</label>
                                <textarea
                                    rows={3}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="A short description about yourself..."
                                    className="w-full resize-none rounded-xl border border-input bg-background/60 px-4 py-2.5 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                />
                                <p className="mt-1 text-right text-xs text-muted-foreground">{bio.length}/300</p>
                            </div>
                        </SectionCard>

                        <div className="flex justify-end">
                            <button type="submit" className="rounded-xl bg-primary px-7 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary">
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}

                {/* ── Tab: Security ─────────────────── */}
                {tab === "security" && (
                    <form onSubmit={handleChangePassword} className="space-y-6">
                        <SectionCard title="Change Password" icon={
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        }>
                            <div className="space-y-5">
                                {/* Current password */}
                                {[
                                    { label: "Current Password", value: currentPw, setter: setCurrentPw, show: showCurrent, toggle: setShowCurrent },
                                    { label: "New Password", value: newPw, setter: setNewPw, show: showNew, toggle: setShowNew },
                                    { label: "Confirm Password", value: confirmPw, setter: setConfirmPw, show: showConfirm, toggle: setShowConfirm },
                                ].map((f) => (
                                    <div key={f.label}>
                                        <label className="mb-1.5 block text-sm font-medium text-foreground">{f.label}</label>
                                        <div className="relative">
                                            <input
                                                type={f.show ? "text" : "password"}
                                                value={f.value}
                                                onChange={(e) => f.setter(e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full rounded-xl border border-input bg-background/60 px-4 py-2.5 pr-11 text-sm text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => f.toggle(!f.show)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    {f.show
                                                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                                        : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
                                                    }
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                {/* Password strength indicator */}
                                {newPw.length > 0 && (
                                    <div>
                                        <div className="mb-1 flex items-center justify-between">
                                            <span className="text-xs text-muted-foreground">Password strength</span>
                                            <span className={`text-xs font-medium ${newPw.length >= 12 ? "text-emerald-400" :
                                                newPw.length >= 8 ? "text-amber-400" : "text-red-400"
                                                }`}>
                                                {newPw.length >= 12 ? "Strong" : newPw.length >= 8 ? "Fair" : "Weak"}
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                            <div
                                                className={`h-full rounded-full transition-all ${newPw.length >= 12 ? "bg-emerald-400 w-full" :
                                                    newPw.length >= 8 ? "bg-amber-400 w-2/3" : "bg-red-400 w-1/3"
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Error */}
                                {pwError && (
                                    <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        {pwError}
                                    </div>
                                )}
                            </div>
                        </SectionCard>

                        {/* Active sessions — read-only info panel */}
                        <SectionCard title="Active Sessions" icon={
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        }>
                            <div className="space-y-3">
                                {[
                                    { device: "Chrome on macOS", location: "San Francisco, CA", time: "Now", current: true },
                                    { device: "Safari on iPhone", location: "San Francisco, CA", time: "2 hours ago", current: false },
                                    { device: "VS Code Remote", location: "San Francisco, CA", time: "Yesterday", current: false },
                                ].map((session, i) => (
                                    <div key={i} className="flex items-center justify-between rounded-xl border border-border/40 bg-background/40 px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-2 w-2 rounded-full ${session.current ? "bg-emerald-400" : "bg-muted-foreground"}`} />
                                            <div>
                                                <p className="text-sm font-medium text-foreground">{session.device}</p>
                                                <p className="text-xs text-muted-foreground">{session.location} · {session.time}</p>
                                            </div>
                                        </div>
                                        {session.current
                                            ? <span className="rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-400/20">Current</span>
                                            : <button className="text-xs text-destructive hover:underline">Revoke</button>
                                        }
                                    </div>
                                ))}
                            </div>
                        </SectionCard>

                        <div className="flex justify-end">
                            <button type="submit" className="rounded-xl bg-primary px-7 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary">
                                Update Password
                            </button>
                        </div>
                    </form>
                )}

                {/* ── Tab: Notifications ────────────── */}
                {tab === "notifications" && (
                    <div className="space-y-6">
                        <SectionCard title="Notification Channels" icon={
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        }>
                            <div className="space-y-4">
                                {[
                                    { label: "Email Notifications", desc: "Receive alerts and updates via email", value: notifEmail, setter: setNotifEmail },
                                    { label: "SMS Notifications", desc: "Send alerts to your phone number", value: notifSms, setter: setNotifSms },
                                    { label: "Device Alert Emails", desc: "Get notified when a device goes offline or issues occur", value: notifAlerts, setter: setNotifAlerts },
                                    { label: "Weekly Digest", desc: "A summary of your platform activity every Monday", value: notifDigest, setter: setNotifDigest },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between rounded-xl border border-border/40 bg-background/40 px-4 py-3.5">
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{item.label}</p>
                                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                                        </div>
                                        <Toggle checked={item.value} onChange={item.setter} />
                                    </div>
                                ))}
                            </div>
                        </SectionCard>

                        <div className="flex justify-end">
                            <button onClick={() => showBanner("Notification preferences saved!")} className="rounded-xl bg-primary px-7 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary">
                                Save Preferences
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Tab: Privacy ──────────────────── */}
                {tab === "privacy" && (
                    <div className="space-y-6">
                        <SectionCard title="Security & Privacy" icon={
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        }>
                            <div className="space-y-4">
                                {[
                                    { label: "Two-Factor Authentication", desc: "Add an extra layer of security to your account", value: twoFactor, setter: setTwoFactor, tag: !twoFactor ? "Recommended" : undefined },
                                    { label: "Login Alerts", desc: "Be notified of new logins from unrecognised devices", value: sessionAlerts, setter: setSessionAlerts },
                                ].map((item) => (
                                    <div key={item.label} className="flex items-center justify-between rounded-xl border border-border/40 bg-background/40 px-4 py-3.5">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium text-foreground">{item.label}</p>
                                                {item.tag && (
                                                    <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-400 border border-amber-400/20">{item.tag}</span>
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                                        </div>
                                        <Toggle checked={item.value} onChange={item.setter} />
                                    </div>
                                ))}
                            </div>
                        </SectionCard>

                        {/* Danger zone */}
                        <SectionCard title="Danger Zone" icon={
                            <svg className="h-4 w-4 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        }>
                            <div className="space-y-3">
                                {[
                                    { label: "Export My Data", desc: "Download all your project data, device logs, and account info.", action: "Export", style: "border-border hover:bg-muted text-foreground" },
                                    { label: "Delete Account", desc: "Permanently delete your account and all associated data. This cannot be undone.", action: "Delete Account", style: "border-destructive/40 hover:bg-destructive/10 text-destructive" },
                                ].map((item) => (
                                    <div key={item.label} className="flex flex-col gap-3 rounded-xl border border-border/40 bg-background/40 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{item.label}</p>
                                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                                        </div>
                                        <button className={`shrink-0 rounded-xl border px-4 py-2 text-xs font-semibold transition-all ${item.style}`}>
                                            {item.action}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </SectionCard>

                        <div className="flex justify-end">
                            <button onClick={() => showBanner("Privacy settings saved!")} className="rounded-xl bg-primary px-7 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary">
                                Save Settings
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Success Banner ────────────────────── */}
            {banner && <SaveBanner message={banner} onDismiss={() => setBanner(null)} />}
        </div>
    );
};

export default ProfilePage;
