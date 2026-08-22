import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LoomRail } from "@/components/ui/weave";
import { Hero } from "@/components/sections/hero";
import { Ticker } from "@/components/sections/ticker";
import { Spotlight, Stats } from "@/components/sections/spotlight";
import { About, Team } from "@/components/sections/about";
import { Magazine } from "@/components/sections/magazine";
import { Stories } from "@/components/sections/stories";
import { Backers } from "@/components/sections/backers";
import { Contact } from "@/components/sections/contact";
import { site } from "@/lib/site";
import { voices } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Periodical",
  name: site.name,
  alternateName: `${site.name} Magazine`,
  url: site.url,
  description: site.description,
  inLanguage: "en",
  publisher: {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/logo-wordmark.png`,
    email: site.email,
    telephone: site.phone,
    address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
    sameAs: site.socials.map((s) => s.href),
  },
  about: voices.map((voice) => ({
    "@type": "Person",
    name: voice.name,
    jobTitle: voice.role,
    worksFor: { "@type": "Organization", name: voice.org },
  })),
};

export default function Home() {
  return (
    <>
      <a
        href="#top"
        className="btn btn-solid sr-only px-4 py-2 text-sm focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:inline-flex"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main>
        <Hero />
        <LoomRail />
        <Ticker />
        <Stats />
        <Spotlight />
        <About />
        <Magazine />
        <Stories />
        <Team />
        <Backers />
        <Contact />
      </main>

      <LoomRail />
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
