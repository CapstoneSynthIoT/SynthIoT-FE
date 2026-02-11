import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden pt-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-72 w-72 animate-pulse-glow rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/3 h-96 w-96 animate-pulse-glow rounded-full bg-accent/5 blur-3xl" style={{ animationDelay: "1.5s" }} />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <div className="mx-auto max-w-3xl">

          <h1 className="mb-3 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Generate Synthetic Data{" "}
            <span className="text-gradient">That Mimics Real Sensors</span>
          </h1>
          <p className="mx-auto mb-5 max-w-xl text-base text-muted-foreground">
            Create realistic IoT sensor datasets with AI. Noise, drift, weather patterns — all generated in seconds.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/signup">
              <button className="rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:brightness-110 glow-primary">
                Get Started Free
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
