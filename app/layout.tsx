import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { profile } from "@/content/profile";
import { Backdrop, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { MotionFx } from "@/components/client/motion-fx";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-jb", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s · Jason Te" },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: "Jason Te",
    title: SITE.title,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  robots: { index: true, follow: true },
};

/** Person schema. Deliberately omits telephone. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE.url,
  image: `${SITE.url}${profile.headshot.src}`,
  jobTitle: "Backend & Distributed Systems Engineer",
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Seattle", addressRegion: "WA", addressCountry: "US" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Northeastern University" },
    { "@type": "CollegeOrUniversity", name: "Xiamen University" },
    { "@type": "CollegeOrUniversity", name: "Xi'an University of Posts and Telecommunications" },
  ],
  knowsAbout: ["Distributed Systems", "Raft consensus", "Java", "Kubernetes", "Observability", "LLM agents"],
  sameAs: [profile.github, profile.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-ink font-sans text-zinc-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Backdrop />
        <SiteHeader />
        {children}
        <SiteFooter />
        <MotionFx />
      </body>
    </html>
  );
}
