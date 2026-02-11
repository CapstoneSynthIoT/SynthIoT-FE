import logo from "@/assets/logo.png";
import logoText from "@/assets/Screenshot_2026-02-11_150622-removebg-preview.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-24 items-center justify-between px-6">
        <Link to="/" className="flex items-center cursor-pointer">
          <img src={logo} alt="SynthIoT S Logo" className="h-20 w-20" />
          <img src={logoText} alt="ynthiot text" className="h-14 -ml-7 relative top-3" />
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
};

export default Header;
