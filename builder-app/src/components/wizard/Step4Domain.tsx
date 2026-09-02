"use client";

import React, { useState } from "react";
import { useWizardStore } from "@/store/wizardStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Globe,
  Mail,
  GitBranch,
  Copy,
  Check,
  Server,
  Cloud,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  Radio,
  Lock,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Step4Domain: React.FC = () => {
  const { domain, updateDomain } = useWizardStore();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const cleanDomainInput = (raw: string) => {
    let d = raw.trim().toLowerCase();
    d = d.replace(/^https?:\/\//, "");
    d = d.replace(/\/.*$/, "");
    return d;
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = cleanDomainInput(e.target.value);
    updateDomain({ targetDomain: cleaned });
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const currentDomain = domain.targetDomain || "yourdomain.com";

  return (
    <TooltipProvider>
      <div className="space-y-8 animate-in fade-in-50 duration-300">
        {/* Step Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="dot-pill">
              <span className="dot-indicator" />
              Cloudflare Tunnel & DNS
            </span>
            <Badge variant="subtle">Automated SSL / TLS 1.3</Badge>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Custom Domain & Lead Capture Endpoint
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
            Configure your production domain, lead inquiry email router (Formspree), and
            review the instant DNS configuration table for 1-click Cloudflare Tunnel connectivity.
          </p>
        </div>

        {/* Configuration Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Target Domain */}
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="targetDomain" className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                Target Custom Domain
                <span className="text-destructive">*</span>
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  The root domain where your business website will be published (e.g. vantagecloud.io).
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <Input
                id="targetDomain"
                placeholder="e.g. vantagecloud.io"
                value={domain.targetDomain}
                onChange={handleDomainChange}
                className="h-11 font-mono text-base pl-9"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-xs">
                🌐
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Enter your bare domain (e.g. <code>vantagecloud.io</code>). Both root and <code>www</code> will be routed automatically.
            </p>
          </div>

          {/* Formspree Lead Capture Router */}
          <div className="space-y-3 p-4 rounded-xl border border-border bg-card/60">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="formspreeId" className="flex items-center gap-2 text-sm font-semibold">
                  <Mail className="h-4 w-4 text-primary" />
                  Formspree Lead Routing ID
                </Label>
                <p className="text-xs text-muted-foreground">
                  Connect contact form to your business inbox
                </p>
              </div>
              <Switch
                checked={domain.enableFormspree}
                onCheckedChange={(checked) => updateDomain({ enableFormspree: checked })}
              />
            </div>

            {domain.enableFormspree && (
              <div className="space-y-2 pt-2 border-t border-border/60">
                <Input
                  id="formspreeId"
                  placeholder="e.g. xpwzgkqv or your-endpoint-id"
                  value={domain.formspreeId}
                  onChange={(e) => updateDomain({ formspreeId: e.target.value })}
                  className="h-10 font-mono text-xs"
                />
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Free endpoint from formspree.io</span>
                  <a
                    href="https://formspree.io"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    Get ID <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Empty GitHub Repo URL (Dokploy PaaS Sync) */}
          <div className="space-y-3 p-4 rounded-xl border border-border bg-card/60">
            <div className="space-y-0.5">
              <Label htmlFor="githubRepoUrl" className="flex items-center gap-2 text-sm font-semibold">
                <GitBranch className="h-4 w-4 text-primary" />
                Blank GitHub Repository URL
              </Label>
              <p className="text-xs text-muted-foreground">
                For automated version control and Dokploy CI/CD sync
              </p>
            </div>
            <Input
              id="githubRepoUrl"
              placeholder="https://github.com/organization/repo.git"
              value={domain.githubRepoUrl}
              onChange={(e) => updateDomain({ githubRepoUrl: e.target.value })}
              className="h-10 font-mono text-xs"
            />
            <p className="text-[11px] text-muted-foreground">
              Optional. If provided, the deployment script pushes code to this remote repo.
            </p>
          </div>
        </div>

        {/* Instant DNS Record Guidance Table */}
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
            <div className="space-y-0.5">
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <Server className="h-4 w-4 text-primary" /> Instant DNS Configuration Records
              </h3>
              <p className="text-xs text-muted-foreground">
                Add these two records in your DNS provider (Cloudflare, Namecheap, GoDaddy, etc.)
              </p>
            </div>
            <Badge variant="success" className="gap-1.5 w-fit">
              <Lock className="h-3 w-3" /> Automatic Free SSL
            </Badge>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted text-muted-foreground uppercase tracking-wider font-semibold border-b border-border">
                <tr>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Name / Host</th>
                  <th className="p-3.5">Target / Value</th>
                  <th className="p-3.5">TTL</th>
                  <th className="p-3.5">Proxy Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono">
                {/* CNAME @ Record */}
                <tr className="hover:bg-muted/40 transition-colors">
                  <td className="p-3.5 font-bold text-primary">CNAME</td>
                  <td className="p-3.5 font-semibold text-foreground">@ (root)</td>
                  <td className="p-3.5 text-muted-foreground">paas.usmankhan.xyz</td>
                  <td className="p-3.5 text-muted-foreground">Auto</td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      <Cloud className="h-3 w-3 fill-amber-500 text-amber-500" /> Proxied
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-sans">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs gap-1"
                      onClick={() => handleCopy("cname-root", "paas.usmankhan.xyz")}
                    >
                      {copiedKey === "cname-root" ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Copy
                        </>
                      )}
                    </Button>
                  </td>
                </tr>

                {/* CNAME WWW Record */}
                <tr className="hover:bg-muted/40 transition-colors">
                  <td className="p-3.5 font-bold text-primary">CNAME</td>
                  <td className="p-3.5 font-semibold text-foreground">www</td>
                  <td className="p-3.5 text-muted-foreground">paas.usmankhan.xyz</td>
                  <td className="p-3.5 text-muted-foreground">Auto</td>
                  <td className="p-3.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      <Cloud className="h-3 w-3 fill-amber-500 text-amber-500" /> Proxied
                    </span>
                  </td>
                  <td className="p-3.5 text-right font-sans">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs gap-1"
                      onClick={() => handleCopy("cname-www", "paas.usmankhan.xyz")}
                    >
                      {copiedKey === "cname-www" ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Copy
                        </>
                      )}
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quick DNS Tip Callout */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/50 border border-border/80 text-xs text-muted-foreground">
            <Radio className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <div>
              <strong className="text-foreground font-semibold">Zero Port-Forwarding Required:</strong>{" "}
              Dokploy communicates directly with Cloudflare Tunnel over encrypted tunnels. Your server
              IP remains 100% hidden behind Cloudflare DDoS protection with automated SSL generation.
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
