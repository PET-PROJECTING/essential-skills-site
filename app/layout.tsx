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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-text">
        <SmoothScroll>
          {children}
          <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
