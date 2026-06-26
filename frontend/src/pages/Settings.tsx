import { useState } from "react";
import { toast } from "sonner";
import { Key, Bell, Building2, Palette, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Settings() {
  const [theme, setTheme] = useState("dark");
  const [keys, setKeys] = useState([
    { id: "k1", label: "Production", masked: "sk_live_••••••••3f4a", created: "Mar 12, 2026" },
    { id: "k2", label: "Staging", masked: "sk_test_••••••••71be", created: "May 02, 2026" },
  ]);

  return (
    <>
      <PageHeader title="Settings" description="Manage your workspace, API keys, notifications and theme." />

      <Tabs defaultValue="keys" className="w-full">
        <TabsList className="bg-secondary">
          <TabsTrigger value="keys"><Key className="mr-2 h-4 w-4" />API Keys</TabsTrigger>
          <TabsTrigger value="theme"><Palette className="mr-2 h-4 w-4" />Theme</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4" />Notifications</TabsTrigger>
          <TabsTrigger value="workspace"><Building2 className="mr-2 h-4 w-4" />Workspace</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="mt-6">
          <div className="surface-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold">API keys</h3>
                <p className="text-xs text-muted-foreground">Used by your backend to call the platform.</p>
              </div>
              <Button
                onClick={() =>
                  setKeys((k) => [
                    ...k,
                    {
                      id: `k${k.length + 1}`,
                      label: "New key",
                      masked: "sk_new_••••••••" + Math.random().toString(36).slice(2, 6),
                      created: "Today",
                    },
                  ])
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Create key
              </Button>
            </div>
            <div className="divide-y divide-border rounded-lg border border-border">
              {keys.map((k) => (
                <div key={k.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium">{k.label}</p>
                    <p className="font-mono text-xs text-muted-foreground">{k.masked}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">Created {k.created}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setKeys((arr) => arr.filter((x) => x.id !== k.id));
                        toast.success("Key revoked");
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="theme" className="mt-6">
          <div className="surface-card max-w-xl space-y-5 p-6">
            <div className="space-y-1.5">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark (default)</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Accent color</Label>
              <div className="flex gap-2">
                {["#7c5cff", "#22d3ee", "#22c55e", "#f59e0b", "#ec4899"].map((c) => (
                  <button
                    key={c}
                    className="h-8 w-8 rounded-md border border-border ring-offset-background transition-transform hover:scale-110"
                    style={{ background: c }}
                    onClick={() => toast.success(`Accent set to ${c}`)}
                  />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="surface-card max-w-xl space-y-5 p-6">
            {[
              { k: "agent", l: "Agent completions", d: "Notify when any agent run finishes." },
              { k: "alerts", l: "System alerts", d: "Errors, rate limits and incidents." },
              { k: "weekly", l: "Weekly digest", d: "Pipeline + opportunity summary every Monday." },
            ].map((row) => (
              <div key={row.k} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{row.l}</p>
                  <p className="text-xs text-muted-foreground">{row.d}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workspace" className="mt-6">
          <div className="surface-card max-w-xl space-y-5 p-6">
            <div className="space-y-1.5">
              <Label>Workspace name</Label>
              <Input defaultValue="Acme Corp" />
            </div>
            <div className="space-y-1.5">
              <Label>Billing email</Label>
              <Input defaultValue="billing@acme.io" />
            </div>
            <div className="flex justify-end">
              <Button onClick={() => toast.success("Workspace saved")} className="bg-[image:var(--gradient-primary)] text-primary-foreground hover:opacity-90">
                Save changes
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
