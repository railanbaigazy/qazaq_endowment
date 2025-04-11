import ProjectsList from "../../components/ProjectsList";

export default async function ProjectsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/projects`, { cache: "no-store" });
  console.log("Fetching from URL:", `${process.env.NEXT_PUBLIC_API_URL || ""}/api/projects`);
  const projects = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto md:pt-28 pt-24 px-4">
        <ProjectsList projects={projects} />
      </div>
    </div>
  );
}
