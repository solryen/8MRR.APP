import { useState, useEffect, useCallback } from "react";

export interface Project {
  id: string;
  name: string;
  goal: "Sales" | "Leads" | "Installs" | "Audience";
  platforms: string[];
  createdAt: number;
}

const STORAGE_KEY = "eight_projects";
const ACTIVE_KEY  = "eight_active_project";

const DEFAULT_PROJECT: Project = {
  id: "default",
  name: "My Project",
  goal: "Sales",
  platforms: ["Instagram", "TikTok"],
  createdAt: Date.now(),
};

function load(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Project[];
  } catch {}
  return [DEFAULT_PROJECT];
}

function loadActiveId(): string {
  try {
    return localStorage.getItem(ACTIVE_KEY) ?? "default";
  } catch {
    return "default";
  }
}

function save(projects: Project[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(projects)); } catch {}
}

function saveActiveId(id: string) {
  try { localStorage.setItem(ACTIVE_KEY, id); } catch {}
}

export function useProjects() {
  const [projects, setProjects]       = useState<Project[]>(() => load());
  const [activeId, setActiveId]       = useState<string>(() => {
    const id = loadActiveId();
    const list = load();
    return list.some(p => p.id === id) ? id : list[0].id;
  });

  const activeProject = projects.find(p => p.id === activeId) ?? projects[0];

  const switchProject = useCallback((id: string) => {
    setActiveId(id);
    saveActiveId(id);
  }, []);

  const addProject = useCallback((data: Omit<Project, "id" | "createdAt">) => {
    const project: Project = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setProjects(prev => {
      const next = [...prev, project];
      save(next);
      return next;
    });
    setActiveId(project.id);
    saveActiveId(project.id);
    return project;
  }, []);

  const updateProject = useCallback((id: string, data: Partial<Omit<Project, "id" | "createdAt">>) => {
    setProjects(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...data } : p);
      save(next);
      return next;
    });
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => {
      const next = prev.filter(p => p.id !== id);
      if (next.length === 0) next.push({ ...DEFAULT_PROJECT, id: crypto.randomUUID(), createdAt: Date.now() });
      save(next);
      if (activeId === id) {
        setActiveId(next[0].id);
        saveActiveId(next[0].id);
      }
      return next;
    });
  }, [activeId]);

  return { projects, activeProject, switchProject, addProject, updateProject, deleteProject };
}
