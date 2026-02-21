import logo from "@/assets/logo.png";
import logoText from "@/assets/Screenshot_2026-02-11_150622-removebg-preview.png";
import { Link } from "react-router-dom";

const PRODUCT_LINKS: { label: string; to: string }[] = [
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "#" },
  { label: "Docs", to: "#" },
];

const COMPANY_LINKS: { label: string; to: string }[] = [
  { label: "About", to: "#" },
  { label: "Blog", to: "#" },
  { label: "Contact", to: "#" },
];

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-6 py-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Brand */}
          <div className="col-span-5">
            <Link to="/" className="mb-3 flex items-center">
              <img src={logo} alt="SynthIoT S Logo" className="h-8 w-8" />
              <img src={logoText} alt="ynthiot text" className="h-6 -ml-2.5 relative top-1.5" />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Generate real-looking sensor data. No hardware needed.
            </p>
          </div>

          {/* Product Links */}
          <div className="col-span-2">
            <h4 className="mb-3 text-sm font-semibold text-foreground">Product</h4>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-2">
            <h4 className="mb-3 text-sm font-semibold text-foreground">Company</h4>
            <ul className="space-y-2">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright */}
          <div className="col-span-3 flex items-start justify-end">
            <p className="text-xs text-muted-foreground">© 2026 SynthIoT. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
