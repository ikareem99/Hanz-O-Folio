import { SiteLayout } from "@/components/site/SiteLayout";
import { ToolsSection } from "@/components/site/sections";
import { getTools } from "@/lib/data";

export const metadata = {
  title: "Tools — Hanzala Kareem",
  description: "The core tools and tech stack behind the work: Python, C++, Pandas, Numpy and more.",
  openGraph: {
    title: "Tools — Hanzala Kareem",
    description: "The core tools and tech stack behind the work: Python, C++, Pandas, Numpy and more.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Tools — Hanzala Kareem",
  description: "The core tech stack used by Hanzala Kareem.",
  url: "https://ikareem.netlify.app/tools",
};

export default async function ToolsPage() {
  const toolsData = await getTools();

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolsSection showSearch items={toolsData} />
    </SiteLayout>
  );
}
