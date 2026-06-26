import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  Users,
  Target,
  Globe,
  Sparkles,
  Mail,
  FileText,
  Settings as SettingsIcon,
  Bell,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  Command,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const navigation = [
  { name: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { name: "Market Research", to: "/market-research", icon: Search },
  { name: "Competitors", to: "/competitors", icon: Users },
  { name: "Lead Generation", to: "/leads", icon: Target },
  { name: "Website Audit", to: "/website-audit", icon: Globe },
  { name: "Opportunity Scoring", to: "/opportunities", icon: Sparkles },
  { name: "Outreach Generator", to: "/outreach", icon: Mail },
  { name: "Reports", to: "/reports", icon: FileText },
  { name: "Settings", to: "/settings", icon: SettingsIcon },
];

const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/market-research": "Market Research",
  "/competitors": "Competitors",
  "/leads": "Lead Generation",
  "/website-audit": "Website Audit",
  "/opportunities": "Opportunity Scoring",
  "/outreach": "Outreach Generator",
  "/reports": "Reports",
  "/settings": "Settings",
};

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const title = routeTitles[location.pathname] || "Workspace";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          "relative flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300",
          collapsed ? "w-[72px]" : "w-[260px]",
        )}
      >
        <div className="flex h-16 items-center gap-3 px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] shadow-[var(--shadow-glow)]">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">MABI</span>
              <span className="text-[11px] text-muted-foreground">Intelligence Platform</span>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive &&
                    "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_0_0_0_1px_var(--color-sidebar-border)]",
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.name}</span>}
              {!collapsed && item.to === "/leads" && (
                <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-[10px]">
                  24
                </Badge>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="flex w-full items-center justify-center gap-2 rounded-md px-2 py-2 text-xs text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
          >
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background/60 px-6 backdrop-blur-xl">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 gap-2 px-2 text-sm font-medium">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[image:var(--gradient-primary)] text-[10px] font-bold text-primary-foreground">
                  AC
                </div>
                Acme Corp
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
              <DropdownMenuItem>Acme Corp</DropdownMenuItem>
              <DropdownMenuItem>Initech</DropdownMenuItem>
              <DropdownMenuItem>Soylent Ltd</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" /> New workspace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium">{title}</span>

          <div className="ml-auto flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search agents, reports…"
                className="h-9 w-[280px] border-border bg-card pl-9 pr-14 text-sm"
              />
              <kbd className="pointer-events-none absolute right-2 top-1/2 inline-flex h-5 -translate-y-1/2 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
                <Command className="h-3 w-3" />K
              </kbd>
            </div>

            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[image:var(--gradient-primary)]" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-md p-1 hover:bg-accent">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-secondary text-xs">JS</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Jordan Smith</span>
                    <span className="text-xs text-muted-foreground">jordan@acme.io</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="relative flex-1 overflow-y-auto">
          <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-glow)] opacity-60" />
          <div className="relative mx-auto w-full max-w-7xl px-6 py-8 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
