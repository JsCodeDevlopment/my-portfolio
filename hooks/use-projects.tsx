import { baseURL } from "@/constants/baseUrl.const";
import { useEffect, useState } from "react";

export interface Repos {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | undefined;
  topics: string[];
  created_at: string;
  message?: "Not Found";
}

export function useProjectsRequest() {
  const [repos, setRepos] = useState<Repos[]>([]);

  useEffect(() => {
    const repositories = async () => {
      try {
        let page = 1;
        const data: Repos[] = [];

        while (true) {
          const response = await fetch(`${baseURL}/repos?page=${page}`);
          const repos = await response.json();

          if (repos.length === 0) {
            break;
          }

          data.push(...repos);
          page++;
        }
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };
    repositories();
  }, []);

  return { repos };
}
