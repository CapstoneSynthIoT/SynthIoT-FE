import logo from "@/assets/logo.png";
import logoText from "@/assets/Screenshot_2026-02-11_150622-removebg-preview.png";

const footerLinks = {
  Product: ["Features", "Pricing", "Docs"],
  Company: ["About", "Blog", "Contact"],
};

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-6 py-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Brand - takes up more space */}
          <div className="col-span-5">
            <div className="mb-3 flex items-center">
              <img src={logo} alt="SynthIoT S Logo" className="h-8 w-8" />
              <img src={logoText} alt="ynthiot text" className="h-6 -ml-2.5 relative top-1.5" />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Generate real-looking sensor data. No hardware needed.
            </p>
          </div>

          {/* Product Links */}
          <div className="col-span-2">
            <h4 className="mb-3 text-sm font-semibold text-foreground">Product</h4>
            <ul className="space-y-2">
              {footerLinks.Product.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-2">
            <h4 className="mb-3 text-sm font-semibold text-foreground">Company</h4>
            <ul className="space-y-2">
              {footerLinks.Company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Copyright - aligned to the right */}
          <div className="col-span-3 flex items-start justify-end">
            <p className="text-xs text-muted-foreground">© 2026 SynthIoT. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
