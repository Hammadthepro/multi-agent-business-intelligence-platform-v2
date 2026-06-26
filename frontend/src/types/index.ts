export type AgentStatus = "idle" | "running" | "completed" | "error";

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  lastRunAt?: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  industry: string;
  location: string;
  email: string;
  score: number;
  priority: "Low" | "Medium" | "High";
}

export interface Competitor {
  id: string;
  name: string;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
  threatLevel: "Low" | "Medium" | "High";
}

export interface Report {
  id: string;
  title: string;
  type: string;
  createdAt: string;
  sizeKb: number;
}
