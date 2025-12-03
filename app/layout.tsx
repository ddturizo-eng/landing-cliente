import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true, // ⚡ Preload para mejor performance
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "HC Efectos | Pirotecnia y Efectos Especiales en Valledupar",
  description: "Transforma tu evento en una experiencia inolvidable. Pirotecnia aérea, humo, proyecciones y efectos especiales profesionales.",
  
  keywords: [
    "pirotecnia Valledupar",
    "efectos especiales eventos",
    "bodas Valledupar",
    "XV años",
    "revelación de sexo",
  ],

  authors: [{ name: "HC Efectos", url: "https://hcefectos.com" }],
  creator: "HC Efectos",
  publisher: "HC Efectos",

  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://hcefectos.com",
    siteName: "HC Efectos",
    title: "HC Efectos | Efectos Especiales para Eventos",
    description: "Pirotecnia, humo, proyecciones y más para bodas, XV años y eventos corporativos.",
    images: [
      {
        url: "https://hcefectos.com/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HC Efectos - Efectos Especiales",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HC Efectos | Efectos Especiales",
    description: "Pirotecnia y efectos especiales para tus eventos.",
    images: ["https://hcefectos.com/img/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/manifest.json",

  alternates: {
    canonical: "https://hcefectos.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* ⚡ CRÍTICO: Solo preload de assets ESENCIALES */}
        <link
          rel="preload"
          as="image"
          href="/img/Heroback.jpg"
          media="(min-width: 768px)"
        />

        {/* ⚡ Solo preconnect a dominios CRÍTICOS */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />

        {/* ❌ REMOVIDO: Font Awesome (900KB!) */}
        {/* Ahora usamos emojis y Lucide React (20KB total) */}

        {/* Schema.org - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "HC Efectos",
              image: "https://hcefectos.com/img/logo-hc-efectos-modified.png",
              description: "Pirotecnia y efectos especiales para eventos",
              url: "https://hcefectos.com",
              telephone: "+573137431884",
              email: "info@hcefectos.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Valledupar",
                addressLocality: "Valledupar",
                addressRegion: "Cesar",
                postalCode: "200001",
                addressCountry: "CO",
              },
              sameAs: [
                "https://instagram.com/hcefectos",
                "https://wa.me/573137431884",
              ],
              geo: {
                "@type": "GeoCoordinates",
                latitude: "10.4605",
                longitude: "-73.2543",
              },
              priceRange: "$$$",
            }),
          }}
        />
      </head>
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}