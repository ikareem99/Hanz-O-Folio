import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../src/styles.css"; // Moved from old router logic

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Hanzala Kareem — Machine Learning Engineer Portfolio",
  description:
    "Portfolio of Hanzala Kareem, a machine learning engineer crafting intelligent solutions.",
  authors: [{ name: "Hanzala Kareem" }],
  openGraph: {
    title: "Hanzala Kareem — Machine Learning Engineer Portfolio",
    description:
      "Portfolio of Hanzala Kareem, a machine learning engineer crafting intelligent solutions.",
    type: "website",
    url: "https://ikareem.netlify.app/",
    images: [{ url: "https://ikareem.netlify.app/profile.png" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://ikareem.netlify.app/profile.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hanzala Kareem",
  url: "https://ikareem.netlify.app/",
  image: "https://ikareem.netlify.app/profile.png",
  jobTitle: "Machine Learning Engineer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "FAST NUCES ISLAMABAD",
  },
  sameAs: [
    "https://pk.linkedin.com/in/hanzala-kareem",
    "https://github.com/ikareem99/",
    "https://www.instagram.com/ikareem99/",
    "https://www.facebook.com/ikareem99/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${poppins.variable} font-sans`}>{children}</body>
    </html>
  );
}
