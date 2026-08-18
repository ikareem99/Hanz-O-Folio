import { SiteLayout } from "@/components/site/SiteLayout";
import { ProjectsSection } from "@/components/site/sections";
import { getProjects } from "@/lib/data";

export const metadata = {
  title: "Projects — Hanzala Kareem",
  description: "Selected machine learning and C++ projects by Hanzala Kareem.",
  openGraph: {
    title: "Projects — Hanzala Kareem",
    description: "Selected projects by Hanzala Kareem, machine learning engineer.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Projects — Hanzala Kareem",
  description: "Machine Learning and C++ projects built by Hanzala Kareem.",
  url: "https://ikareem.netlify.app/projects",
};

export default async function ProjectsPage() {
  const projectsData = await getProjects();

  return (
    <SiteLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsSection showSearch items={projectsData} />
    </SiteLayout>
  );
}
