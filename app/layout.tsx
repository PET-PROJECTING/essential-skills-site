import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ScrollToTop } from "@/components/home/scroll-to-top";
import { SmoothScroll } from "@/components/smooth-scroll";
import { getPackageSkills } from "@/lib/essential-skills";
import { hero, site } from "@/lib/home-data";
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

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: hero.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.githubUrl }],
  creator: site.name,
  keywords: [
    "essential-skills",
    "npx essential-skills",
    "Quick pack",
    "Full pack",
    "AI coding agents",
    "Cursor skills",
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
    description: hero.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: hero.description,
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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { version } = await getPackageSkills();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${getMetadataBase()}/#website`,
        url: getMetadataBase(),
        name: site.name,
        description: hero.description,
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
        softwareVersion: version,
        license: "https://opensource.org/licenses/MIT",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
