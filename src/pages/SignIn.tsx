import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import logo from "@/assets/logo.png";
import logoText from "@/assets/Screenshot_2026-02-11_150622-removebg-preview.png";

const SignIn = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: authenticate with backend
        navigate("/home");
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Background glow effect */}
            <div className="pointer-events-none fixed inset-0" style={{ background: "var(--gradient-glow)" }} />

            {/* Floating orbs */}
            <div className="pointer-events-none fixed left-1/4 top-1/3 h-72 w-72 animate-pulse-glow rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none fixed right-1/4 bottom-1/3 h-96 w-96 animate-pulse-glow rounded-full bg-accent/5 blur-3xl" style={{ animationDelay: "1.5s" }} />

            <div className="relative flex min-h-screen items-center justify-center px-6 pt-24">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="mb-8 flex justify-center items-center gap-1">
                        <img src={logo} alt="SynthIoT S Logo" className="h-28 w-28" />
                        {/* <img src={logoText} alt="ynthiot text" className="h-12 -ml-4 relative top-2" /> */}
                    </div>

                    {/* Sign in card */}
                    <div className="card-shine rounded-2xl border border-border/60 bg-card p-8 shadow-2xl">
                        <h1 className="mb-2 text-center text-3xl font-bold text-foreground">
                            Welcome Back
                        </h1>
                        <p className="mb-8 text-center text-sm text-muted-foreground">
                            Sign in to your account to continue
                        </p>

                        <form className="space-y-6" onSubmit={handleSignIn}>
                            {/* Email field */}
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="you@example.com"
                                />
                            </div>

                            {/* Password field */}
                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        className="w-full rounded-lg border border-input bg-background px-4 py-3 pr-12 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {showPassword ? (
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot password link */}
                            <div className="flex justify-end">
                                <Link to="/change-password" className="text-sm font-medium text-primary transition-colors hover:text-primary/80">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Sign in button */}
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary"
                            >
                                Sign In
                            </button>
                        </form>

                        {/* Sign up link */}
                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link to="/signup" className="font-medium text-primary transition-colors hover:text-primary/80">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
