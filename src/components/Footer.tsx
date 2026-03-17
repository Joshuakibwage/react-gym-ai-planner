import { Link } from "react-router-dom";

const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const DiscordIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028z" />
  </svg>
);

const BrandIcon = () => (
  <span className="inline-flex items-center justify-center w-[22px] h-[22px] bg-foreground rounded-md">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1L10 4V8L6 11L2 8V4L6 1Z" fill="white" />
    </svg>
  </span>
);

type NavLink = {
  label: string;
  href: string;
  badge?: string;
};

type FooterColumn = {
  heading: string;
  links: NavLink[];
};

const columns: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog", badge: "new" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "API", href: "/api" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "Community", href: "/community" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

type SocialLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const socials: SocialLink[] = [
  { label: "Twitter / X", href: "https://x.com", icon: <TwitterIcon /> },
  { label: "GitHub", href: "https://github.com", icon: <GitHubIcon /> },
  { label: "Discord", href: "https://discord.com", icon: <DiscordIcon /> },
];

const legalLinks: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookies", href: "/cookies" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background mt-24">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 mb-12">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <BrandIcon />
              <span className="font-mono text-[17px] font-medium tracking-tight text-foreground">
                Fitness AI
              </span>
            </div>

            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[200px]">
              AI-powered training plans built around you. Train smarter, not harder.
            </p>

            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-100 flex items-center gap-2"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-[12px] text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <span className="text-foreground/70">Fitness AI, Inc.</span> All rights reserved.
          </p>

          <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            All systems operational
          </div>

          <nav className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-[12px] text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  );
}