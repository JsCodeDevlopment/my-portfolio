import { baseURL } from "@/constants/baseUrl.const";
import { useEffect, useState } from "react";

export interface Repos {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | undefined;
  topics: string[];
  created_at: string
  message?: "Not Found";
}

export function useProjectsRequest() {
  const [repos, setRepos] = useState<Repos[]>([]);

  useEffect(() => {
    const repositories = async () => {
      try {
        const response = await fetch(`${baseURL}/repos`);
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };
    repositories();
  }, []);

  return { repos };
}