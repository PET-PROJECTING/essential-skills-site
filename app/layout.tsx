import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ScrollToTop } from "@/components/home/scroll-to-top";
import { SmoothScroll } from "@/components/smooth-scroll";
import { site } from "@/lib/home-data";
import { getMetadataBase } from "@/lib/site-url";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const description =
  "Install curated, structured skill protocols for AI coding agents. Enforce TDD, SOLID principles, and clean commits.";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.githubUrl }],
  creator: site.name,
  keywords: [
    "AI coding agents",
    "Cursor skills",
    "agent skills",
    "TDD",
    "SOLID",
    "essential-skills",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: site.name,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport = {
  themeColor: "#08080a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${getMetadataBase()}/#website`,
        url: getMetadataBase(),
        name: site.name,
        description:
          "Install curated, structured skill protocols for AI coding agents. Enforce TDD, SOLID principles, and clean commits.",
        inLanguage: "en-US",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${getMetadataBase()}/#software`,
        name: site.name,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Cross-platform",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "CLI tool to install curated skill protocols for AI coding agents like Cursor, Claude Code, Codex, and Copilot.",
        url: site.githubUrl,
        downloadUrl: site.npmUrl,
        softwareVersion: "1.0",
        license: "https://opensource.org/licenses/MIT",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased selection:bg-[#cf0] selection:text-[#08080a]`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-dvh flex-col font-text">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SmoothScroll>
          {children}
          <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
