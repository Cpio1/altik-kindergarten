import type { Metadata, Viewport } from "next";
import { Nunito, Onest } from "next/font/google";
import { getDictionary } from "@/lib/i18n";
import { images } from "@/lib/images";
import { fullAddress, site, siteUrl } from "@/lib/site";
import "./globals.css";

// Оба шрифта содержат казахские буквы (ә, і, ң, ғ, ү, ұ, қ, ө, һ) в наборе cyrillic-ext.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["cyrillic", "cyrillic-ext", "latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});
const onest = Onest({
  variable: "--font-onest",
  subsets: ["cyrillic", "cyrillic-ext", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const t = getDictionary();
const ogImage = images.hero ?? images.about ?? images.logo;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: t.meta.title,
  description: t.meta.description,
  keywords: t.meta.keywords,
  applicationName: site.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.fullName,
    title: t.meta.title,
    description: t.meta.description,
    locale: t.ogLocale,
    ...(ogImage && { images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: site.fullName }] }),
  },
  twitter: {
    card: ogImage ? "summary_large_image" : "summary",
    title: t.meta.title,
    description: t.meta.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "only light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Preschool",
  name: site.fullName,
  alternateName: "Альтик",
  url: siteUrl(),
  description: t.meta.description,
  ...(ogImage && { image: siteUrl() + ogImage.src }),
  ...(images.logo && { logo: siteUrl() + images.logo.src }),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: `${site.address.region}, ${site.address.district}`,
    postalCode: site.address.postalCode,
    addressCountry: "KZ",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lon },
  sameAs: [site.instagram.url],
  inLanguage: "kk",
  hasMap: `https://2gis.kz/almaty?m=${site.geo.lon}%2C${site.geo.lat}%2F17`,
  areaServed: fullAddress,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={t.htmlLang} className={`${nunito.variable} ${onest.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* До отрисовки помечаем, что JS включён — тогда элементы появляются с анимацией при прокрутке */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
