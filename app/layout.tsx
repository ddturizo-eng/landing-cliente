import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap", // Evita text invisible mientras carga la fuente
});

// Viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0a0a0a",
};

// Metadata mejorada con SEO
export const metadata: Metadata = {
  // Información básica
  title: "HC Efectos | Pirotecnia y Efectos Especiales en Valledupar",
  description: "Transforma tu evento en una experiencia inolvidable. Pirotecnia aérea, humo, proyecciones y efectos especiales profesionales para bodas, XV años y eventos corporativos en Valledupar.",
  
  // Keywords
  keywords: [
    "pirotecnia Valledupar",
    "efectos especiales eventos",
    "bodas Valledupar",
    "XV años",
    "revelación de sexo",
    "eventos corporativos",
    "fuentes frías",
    "humo efectos",
  ],

  // Información de contacto/ubicación
  authors: [
    {
      name: "HC Efectos",
      url: "https://hcefectos.com",
    },
  ],

  creator: "HC Efectos",
  publisher: "HC Efectos",

  // Open Graph para redes sociales
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://hcefectos.com",
    siteName: "HC Efectos",
    title: "HC Efectos | Efectos Especiales para Eventos",
    description: "Pirotecnia, humo, proyecciones y más para bodas, XV años y eventos corporativos en Valledupar.",
    images: [
      {
        url: "https://hcefectos.com/img/og-image.jpg", // Crear esta imagen (1200x630px)
        width: 1200,
        height: 630,
        alt: "HC Efectos - Efectos Especiales para Eventos",
        type: "image/jpeg",
      },
      {
        url: "https://hcefectos.com/img/og-image-cuadrada.jpg", // Crear esta imagen (800x800px)
        width: 800,
        height: 800,
        alt: "HC Efectos",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "HC Efectos | Efectos Especiales",
    description: "Pirotecnia y efectos especiales para tus eventos en Valledupar.",
    images: ["https://hcefectos.com/img/og-image.jpg"],
    creator: "@hcefectos", // Cambiar por tu usuario de Twitter/X
    site: "@hcefectos",
  },

  // Información de contacto
  category: "Event Planning",
  applicationName: "HC Efectos",

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  // Iconos
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Manifest
  manifest: "/manifest.json",

  // Verificación de sitios
  verification: {
    // Agregar después de verificar en Google Search Console
    // google: "tu-código-de-verificación",
    // yandex: "tu-código-yandex",
  },

  // Canonical URL (muy importante para SEO)
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
        {/* Preload de assets críticos */}
        <link
          rel="preload"
          as="image"
          href="/img/Heroback.jpg"
          media="(min-width: 768px)"
        />
        <link
          rel="preload"
          as="image"
          href="/img/logo-hc-efectos-modified.png"
        />

        {/* Font Awesome - MANTENER mientras migramos a Lucide */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* Preconnect a servicios externos para mejor performance */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://w.behold.so" />
        <link rel="preconnect" href="https://vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />

        {/* DNS Prefetch para dominios externos */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://instagram.com" />

        {/* Schema.org - Local Business (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "HC Efectos",
              image: "https://hcefectos.com/img/logo-hc-efectos-modified.png",
              description: "Empresa especializada en pirotecnia y efectos especiales para eventos",
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
                "https://facebook.com/hcefectos",
                "https://wa.me/573137431884",
              ],
              geo: {
                "@type": "GeoCoordinates",
                latitude: "10.4605",
                longitude: "-73.2543",
              },
              areaServed: [
                {
                  "@type": "City",
                  name: "Valledupar",
                },
                {
                  "@type": "State",
                  name: "Cesar",
                },
              ],
              priceRange: "$$$",
              serviceType: ["Event Planning", "Pyrotechnics", "Special Effects"],
            }),
          }}
        />

        {/* Schema.org - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "HC Efectos",
              alternateName: "HC Efectos Valledupar",
              url: "https://hcefectos.com",
              logo: "https://hcefectos.com/img/logo-hc-efectos-modified.png",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                telephone: "+573137431884",
                email: "info@hcefectos.com",
                areaServed: "CO",
              },
              foundingDate: "2024",
              sameAs: ["https://instagram.com/hcefectos"],
            }),
          }}
        />
      </head>
      <body className={montserrat.className}>
        {children}
        
        {/* Google Analytics - Agregar solo si tengo cuenta */}
        {/* <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXX"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        /> */}
      </body>
    </html>
  );
}