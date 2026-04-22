import { loadModule } from "@/lib/content";
import ModuleClient from "./ModuleClient";

interface PageProps {
  params: { slug: string };
  searchParams: { level?: string };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = params;
  const levelId = parseInt(searchParams.level || "1");
  const moduleData = await loadModule(levelId, slug);

  if (!moduleData) return <div>Module non trouvé</div>;

  return <ModuleClient module={moduleData} />;
}
