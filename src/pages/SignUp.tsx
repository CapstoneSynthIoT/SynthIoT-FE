import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import logo from "@/assets/logo.png";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [countryCode, setCountryCode] = useState("+1");
    const [phone, setPhone] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [phoneError, setPhoneError] = useState("");

    // Country codes list
    const countryCodes = [
        { code: "+1", country: "US/CA" },
        { code: "+44", country: "UK" },
        { code: "+91", country: "IN" },
        { code: "+86", country: "CN" },
        { code: "+81", country: "JP" },
        { code: "+49", country: "DE" },
        { code: "+33", country: "FR" },
        { code: "+39", country: "IT" },
        { code: "+34", country: "ES" },
        { code: "+61", country: "AU" },
        { code: "+7", country: "RU" },
        { code: "+82", country: "KR" },
        { code: "+55", country: "BR" },
        { code: "+52", country: "MX" },
        { code: "+27", country: "ZA" },
        { code: "+20", country: "EG" },
        { code: "+234", country: "NG" },
        { code: "+971", country: "AE" },
        { code: "+65", country: "SG" },
        { code: "+60", country: "MY" },
    ];

    // Expected digit counts per country code
    const phoneDigitRules: Record<string, { digits: number; label: string }> = {
        "+1": { digits: 10, label: "US/CA" },
        "+44": { digits: 10, label: "UK" },
        "+91": { digits: 10, label: "India" },
        "+86": { digits: 11, label: "China" },
        "+81": { digits: 10, label: "Japan" },
        "+49": { digits: 10, label: "Germany" },
        "+33": { digits: 9, label: "France" },
        "+39": { digits: 10, label: "Italy" },
        "+34": { digits: 9, label: "Spain" },
        "+61": { digits: 9, label: "Australia" },
        "+7": { digits: 10, label: "Russia" },
        "+82": { digits: 10, label: "South Korea" },
        "+55": { digits: 11, label: "Brazil" },
        "+52": { digits: 10, label: "Mexico" },
        "+27": { digits: 9, label: "South Africa" },
        "+20": { digits: 10, label: "Egypt" },
        "+234": { digits: 10, label: "Nigeria" },
        "+971": { digits: 9, label: "UAE" },
        "+65": { digits: 8, label: "Singapore" },
        "+60": { digits: 9, label: "Malaysia" },
    };

    const validatePhone = (value: string, code: string) => {
        const digits = value.replace(/\D/g, "");
        const rule = phoneDigitRules[code];
        if (!rule) {
            setPhoneError("");
            return;
        }
        if (digits.length === 0) {
            setPhoneError("");
        } else if (digits.length !== rule.digits) {
            setPhoneError(`${rule.label} phone numbers must be exactly ${rule.digits} digits.`);
        } else {
            setPhoneError("");
        }
    };

    // Password validation rules
    const passwordValidation = {
        hasMinLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasNumber: /[0-9]/.test(password),
    };

    const handleSendCode = (e: React.FormEvent) => {
        e.preventDefault();
        // Validate phone length before proceeding
        const digits = phone.replace(/\D/g, "");
        const rule = phoneDigitRules[countryCode];
        if (rule && digits.length !== rule.digits) {
            setPhoneError(`${rule.label} phone numbers must be exactly ${rule.digits} digits.`);
            return;
        }
        // TODO: Send verification code to email
        setStep(2);
    };

    const handleVerifyCode = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Verify code
        setStep(3);
    };

    const handleCreateAccount = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate password requirements
        if (!passwordValidation.hasMinLength || !passwordValidation.hasUpperCase || !passwordValidation.hasNumber) {
            toast({
                title: "Invalid Password",
                description: "Password must contain at least 8 characters, one capital letter, and one number.",
                variant: "destructive",
            });
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            toast({
                title: "Passwords Don't Match",
                description: "Please ensure both passwords are the same.",
                variant: "destructive",
            });
            return;
        }

        // TODO: Create account
        console.log("Account created", { email, phone: `${countryCode} ${phone}`, password });

        // Show success toast
        toast({
            title: "Account created successfully!",
            description: "Please sign in to continue using SynthIoT.",
        });

        // Navigate to sign-in page
        navigate("/signin");
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
                    </div>

                    {/* Sign up card */}
                    <div className="card-shine rounded-2xl border border-border/60 bg-card p-8 shadow-2xl">
                        {/* Progress indicator */}
                        <div className="mb-6 flex justify-center gap-2">
                            <div className={`h-2 w-16 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-border'}`} />
                            <div className={`h-2 w-16 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-border'}`} />
                            <div className={`h-2 w-16 rounded-full transition-colors ${step >= 3 ? 'bg-primary' : 'bg-border'}`} />
                        </div>

                        <h1 className="mb-2 text-center text-3xl font-bold text-foreground">
                            {step === 1 && "Create Account"}
                            {step === 2 && "Verify Email"}
                            {step === 3 && "Set Password"}
                        </h1>
                        <p className="mb-8 text-center text-sm text-muted-foreground">
                            {step === 1 && "Enter your details to get started"}
                            {step === 2 && "Enter the code sent to your email"}
                            {step === 3 && "Create a secure password"}
                        </p>

                        {/* Step 1: Email & Phone */}
                        {step === 1 && (
                            <form onSubmit={handleSendCode} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                                        Phone Number
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            value={countryCode}
                                            onChange={(e) => {
                                                setCountryCode(e.target.value);
                                                validatePhone(phone, e.target.value);
                                            }}
                                            className="rounded-lg border border-input bg-background px-3 py-3 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 w-28"
                                        >
                                            {countryCodes.map((item) => (
                                                <option key={item.code} value={item.code}>
                                                    {item.code} {item.country}
                                                </option>
                                            ))}
                                        </select>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => {
                                                setPhone(e.target.value);
                                                validatePhone(e.target.value, countryCode);
                                            }}
                                            className={`flex-1 rounded-lg border px-4 py-3 text-foreground transition-colors focus:outline-none focus:ring-2 bg-background ${phoneError
                                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                                : "border-input focus:border-primary focus:ring-primary/20"
                                                }`}
                                            placeholder="(555) 000-0000"
                                            required
                                        />
                                    </div>
                                    {phoneError && (
                                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
                                            <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                            </svg>
                                            {phoneError}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary"
                                >
                                    Send Verification Code
                                </button>
                            </form>
                        )}

                        {/* Step 2: Verification Code */}
                        {step === 2 && (
                            <form onSubmit={handleVerifyCode} className="space-y-6">
                                <div>
                                    <label htmlFor="code" className="mb-2 block text-sm font-medium text-foreground">
                                        Verification Code
                                    </label>
                                    <input
                                        type="text"
                                        id="code"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        className="w-full rounded-lg border border-input bg-background px-4 py-3 text-center text-2xl tracking-widest text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="000000"
                                        maxLength={6}
                                        required
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() => console.log("Resend code")}
                                        className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                                    >
                                        Resend Code
                                    </button>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex-1 rounded-xl border border-border px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary"
                                    >
                                        Verify
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Step 3: Password */}
                        {step === 3 && (
                            <form onSubmit={handleCreateAccount} className="space-y-6">
                                <div>
                                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onFocus={() => setIsPasswordFocused(true)}
                                            onBlur={() => setIsPasswordFocused(false)}
                                            className="w-full rounded-lg border border-input bg-background px-4 py-3 pr-12 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="••••••••"
                                            required
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

                                    {/* Password validation rules */}
                                    {isPasswordFocused && (
                                        <div className="mt-3 rounded-lg border border-border/60 bg-card/50 p-3 space-y-2 max-h-40 overflow-y-auto">
                                            <p className="text-xs font-medium text-muted-foreground mb-2">Password must contain:</p>
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2">
                                                    <div className={`h-4 w-4 rounded-full flex items-center justify-center transition-colors ${passwordValidation.hasMinLength ? 'bg-green-500' : 'bg-muted'
                                                        }`}>
                                                        {passwordValidation.hasMinLength && (
                                                            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <span className={`text-xs transition-colors ${passwordValidation.hasMinLength ? 'text-green-500 font-medium' : 'text-muted-foreground'
                                                        }`}>
                                                        At least 8 characters
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className={`h-4 w-4 rounded-full flex items-center justify-center transition-colors ${passwordValidation.hasUpperCase ? 'bg-green-500' : 'bg-muted'
                                                        }`}>
                                                        {passwordValidation.hasUpperCase && (
                                                            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <span className={`text-xs transition-colors ${passwordValidation.hasUpperCase ? 'text-green-500 font-medium' : 'text-muted-foreground'
                                                        }`}>
                                                        One capital letter
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className={`h-4 w-4 rounded-full flex items-center justify-center transition-colors ${passwordValidation.hasNumber ? 'bg-green-500' : 'bg-muted'
                                                        }`}>
                                                        {passwordValidation.hasNumber && (
                                                            <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <span className={`text-xs transition-colors ${passwordValidation.hasNumber ? 'text-green-500 font-medium' : 'text-muted-foreground'
                                                        }`}>
                                                        One number
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-foreground">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full rounded-lg border border-input bg-background px-4 py-3 pr-12 text-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {showConfirmPassword ? (
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

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="flex-1 rounded-xl border border-border px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Sign in link */}
                        <p className="mt-6 text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link to="/signin" className="font-medium text-primary transition-colors hover:text-primary/80">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
