import { useState } from "react";
import { toast } from "sonner";
import { Copy, Mail, Linkedin, RefreshCw, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const defaultEmail = `Subject: Helping {{company}} accelerate {{outcome}}

Hi {{firstName}},

I noticed {{company}} just expanded into the DACH region — congrats on the momentum. We've been working with similar Series-B SaaS teams to compress their pipeline-to-revenue cycle using a multi-agent intelligence layer.

Three quick wins our agents typically surface for teams like yours:
• Mapping the next 50 high-intent accounts in your ICP
• A live competitor delta brief refreshed weekly
• 1-click outreach sequences tied to opportunity scores

Worth a 15-minute look next week?

— {{senderName}}`;

const defaultLinkedIn = `Hi {{firstName}} — saw {{company}}'s recent move into DACH. We help teams at your stage spin up an agentic intelligence layer (competitor briefs, lead scoring, outreach) in under a week. Worth a quick chat?`;

export default function OutreachGenerator() {
  const [email, setEmail] = useState(defaultEmail);
  const [li, setLi] = useState(defaultLinkedIn);
  const [tone, setTone] = useState("consultative");
  const [generating, setGenerating] = useState(false);

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  };

  const regenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 900));
    setGenerating(false);
    toast.success("Outreach regenerated");
  };

  return (
    <>
      <PageHeader
        title="Outreach Generator"
        description="The outreach agent crafts personalized email + LinkedIn sequences from your scored opportunities."
      />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="surface-card space-y-5 p-6">
          <div className="space-y-1.5">
            <Label>Recipient</Label>
            <Input placeholder="firstName lastName" defaultValue="Ava Chen" />
          </div>
          <div className="space-y-1.5">
            <Label>Company</Label>
            <Input placeholder="Company" defaultValue="Initech" />
          </div>
          <div className="space-y-1.5">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="consultative">Consultative</SelectItem>
                <SelectItem value="direct">Direct</SelectItem>
                <SelectItem value="warm">Warm</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Hook</Label>
            <Textarea rows={3} placeholder="Trigger event, mutual context, etc." defaultValue="Recent DACH expansion" />
          </div>

          <Button
            onClick={regenerate}
            disabled={generating}
            className="w-full bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-90"
          >
            {generating ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate
              </>
            )}
          </Button>
        </div>

        <div className="surface-card p-6">
          <Tabs defaultValue="email" className="w-full">
            <div className="mb-4 flex items-center justify-between">
              <TabsList className="bg-secondary">
                <TabsTrigger value="email"><Mail className="mr-2 h-4 w-4" />Email</TabsTrigger>
                <TabsTrigger value="linkedin"><Linkedin className="mr-2 h-4 w-4" />LinkedIn</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="email" className="mt-0">
              <div className="rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-4 py-2 text-xs text-muted-foreground">
                  <span>Editable email preview</span>
                  <Button size="sm" variant="ghost" onClick={() => copy(email, "Email")}>
                    <Copy className="mr-1.5 h-3.5 w-3.5" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-h-[360px] border-0 bg-transparent font-mono text-sm focus-visible:ring-0"
                />
              </div>
            </TabsContent>

            <TabsContent value="linkedin" className="mt-0">
              <div className="rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-4 py-2 text-xs text-muted-foreground">
                  <span>Editable LinkedIn message</span>
                  <Button size="sm" variant="ghost" onClick={() => copy(li, "Message")}>
                    <Copy className="mr-1.5 h-3.5 w-3.5" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={li}
                  onChange={(e) => setLi(e.target.value)}
                  className="min-h-[200px] border-0 bg-transparent text-sm focus-visible:ring-0"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
