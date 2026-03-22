import { Repos } from "@/hooks/use-projects";

const OWNER = "JsCodeDevlopment";

export function getImageUrl(project: Repos, path: string) {
  if (!project) return "";

  if (project.homepage && project.homepage !== "") {
    const baseUrl = project.homepage.endsWith("/")
      ? project.homepage.slice(0, -1)
      : project.homepage;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `https://raw.githubusercontent.com/${OWNER}/${project.name}/${project.default_branch}/public${cleanPath}`;
}

export async function getGalleryImages(project: Repos) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${OWNER}/${project.name}/contents/public/gallery`
    );

    if (!response.ok) {
      console.warn(`Gallery folder not found for ${project.name}`);
      return [];
    }

    const files = await response.json();
    if (!Array.isArray(files)) return [];

    return files
      .filter((file: any) => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        return ['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext);
      })
      .map((file: any) => ({
        src: getImageUrl(project, `gallery/${file.name}`),
        alt: file.name.split('.')[0].replace(/-/g, ' ').replace(/_/g, ' ') || "Gallery image",
      }));
  } catch (error) {
    console.error(`Error fetching gallery for ${project.name}:`, error);
    return [];
  }
}
