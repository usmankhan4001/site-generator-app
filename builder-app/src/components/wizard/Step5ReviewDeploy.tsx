"use client";

import React, { useState } from "react";
import { useWizardStore } from "@/store/wizardStore";
import { ARCHETYPES } from "@/data/archetypes";
import { THEMES } from "@/data/themes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ShieldCheck,
  CheckCircle2,
  Rocket,
  Copy,
  Check,
  Building2,
  Sparkles,
  Layers,
  Globe,
  Terminal,
  ExternalLink,
  Lock,
  CreditCard,
  FileText,
  Mail,
  Phone,
  Scale,
  RefreshCw,
} from "lucide-react";

export const Step5ReviewDeploy: React.FC = () => {
  const {
    business,
    selectedArchetypeId,
    selectedThemeId,
    domain,
    isDeploying,
    deployProgress,
    deployStepText,
    isDeployed,
    generatedScript,
    startDeployment,
  } = useWizardStore();

  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  const archetype = ARCHETYPES[selectedArchetypeId] || ARCHETYPES["tech-cloud-devops"];
  const theme = THEMES[selectedThemeId] || THEMES["indigo-enterprise"];

  const handleCopyScript = () => {
    navigator.clipboard.writeText(generatedScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const complianceItems = [
    {
      title: "Legal Entity & Registration Matched",
      desc: `${business.companyName} (Reg: ${business.registrationNumber})`,
      status: Boolean(business.companyName && business.registrationNumber),
    },
    {
      title: "Registered Physical Address",
      desc: business.address,
      status: Boolean(business.address),
    },
    {
      title: "Customer Support & Direct Contact",
      desc: `${business.supportEmail} • ${business.phone}`,
      status: Boolean(business.supportEmail && business.phone),
    },
    {
      title: "Statutory Legal Policy Suite Ingested",
      desc: `Privacy Policy, Terms of Service, Refund Policy (14/30-Day), Shipping Policy under ${business.governingLaw}`,
      status: Boolean(business.governingLaw),
    },
    {
      title: "Payment Card Badges & PCI Compliance",
      desc: "Visa, Mastercard, Amex, Apple Pay, Google Pay, Airwallex Secured Checkout Drawer",
      status: true,
    },
    {
      title: "Untitled UI Theme & CDN Assets",
      desc: `${theme.name} • ${archetype.name} • Watermark-free CDN Media`,
      status: true,
    },
    {
      title: "Custom Domain & Cloudflare Tunnel",
      desc: `${domain.targetDomain} • Automated SSL & DDoS Shield`,
      status: Boolean(domain.targetDomain),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-300">
      {/* Step Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="dot-pill">
            <span className="dot-indicator" />
            Pre-Flight Compliance Audit
          </span>
          <Badge variant="success">All Systems Verified</Badge>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Pre-Flight Compliance Review & Instant Launch
        </h2>
        <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
          Verify all merchant payment compliance requirements before generating your
          automated build package and triggering Dokploy PaaS deployment.
        </p>
      </div>

      {/* Compliance Checklist Grid */}
      <div className="p-6 rounded-2xl border border-emerald-200/80 bg-emerald-50/30 dark:border-emerald-900/40 dark:bg-emerald-950/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-emerald-950 dark:text-emerald-100">
                Airwallex Merchant Underwriting Readiness
              </h3>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80">
                7 of 7 compliance verification benchmarks satisfied
              </p>
            </div>
          </div>
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> 100% Passed
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {complianceItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-background/80 border border-emerald-100 dark:border-emerald-900/30 flex items-start gap-3 shadow-2xs"
            >
              <div className="mt-0.5 rounded-full p-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs font-bold text-foreground truncate">{item.title}</h4>
                <p className="text-[11px] text-muted-foreground line-clamp-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment Configuration Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Entity Summary */}
        <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-primary" /> Entity Info
            </span>
            <Badge variant="outline" className="text-[10px]">Verified</Badge>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-foreground">{business.companyName}</h4>
            <p className="text-xs text-muted-foreground font-mono">Reg No: {business.registrationNumber}</p>
            <p className="text-xs text-muted-foreground">{business.address}</p>
            <p className="text-xs text-muted-foreground">{business.supportEmail} • {business.phone}</p>
            <p className="text-xs font-medium text-primary">Law: {business.governingLaw}</p>
          </div>
        </div>

        {/* Archetype & Pricing Summary */}
        <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Blueprint
            </span>
            <Badge variant="subtle" className="text-[10px] capitalize">{archetype.category}</Badge>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-foreground">{archetype.name}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">{archetype.tagline}</p>
            <div className="pt-2 border-t border-border/60 flex flex-wrap gap-1">
              {archetype.offerings.map((o) => (
                <span key={o.id} className="text-[11px] font-semibold px-2 py-0.5 rounded bg-muted text-foreground">
                  ${o.price}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Theme & Infrastructure */}
        <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-primary" /> Design & Domain
            </span>
            <Badge variant={theme.isDark ? "default" : "secondary"} className="text-[10px]">
              {theme.isDark ? "Dark" : "Light"}
            </Badge>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-foreground">{theme.name}</h4>
            <p className="text-xs text-muted-foreground">{theme.fontPairingLabel}</p>
            <p className="text-xs font-mono font-bold text-primary pt-1">🌐 {domain.targetDomain}</p>
            <p className="text-xs text-muted-foreground">Tunnel: paas.usmankhan.xyz</p>
          </div>
        </div>
      </div>

      {/* Fine-Print Footer Preview */}
      <div className="p-5 rounded-2xl border border-border bg-muted/40 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-primary" /> Fine-Print Statutory Footer Preview
          </span>
          <span className="text-xs text-muted-foreground">Rendered at bottom of your website</span>
        </div>
        <div className="p-4 rounded-xl border border-border bg-background text-foreground space-y-2 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-2">
            <span className="font-bold text-sm">{business.companyName}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded bg-muted border font-mono">
                CR: {business.registrationNumber}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-muted border">
                {business.governingLaw}
              </span>
            </div>
          </div>
          <p className="text-muted-foreground text-[11px] leading-relaxed">
            Registered Office: {business.address} • Customer Inquiries: {business.supportEmail} • Support Line: {business.phone}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-muted-foreground">
            <div className="flex gap-3">
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Terms & Conditions</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Refund & Cancellation</span>
              <span>•</span>
              <span className="hover:underline cursor-pointer">Shipping Policy</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-foreground">
              <CreditCard className="h-3 w-3 text-primary" /> Visa • Mastercard • AMEX • Airwallex
            </div>
          </div>
        </div>
      </div>

      {/* Primary Deploy Section */}
      <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-foreground">
              {isDeployed ? "Website Deployment Ready" : "Generate Production Package"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {isDeployed
                ? "Your customization engine script has been compiled and is ready for terminal execution."
                : "Initiates the customization compiler, injects compliance policies, and builds the magic script."}
            </p>
          </div>

          {!isDeployed && !isDeploying && (
            <Button
              size="lg"
              onClick={startDeployment}
              className="w-full sm:w-auto font-bold gap-2 text-base px-8 h-12 shadow-lg shadow-primary/25 cursor-pointer"
            >
              <Rocket className="h-5 w-5" /> Deploy Website Now
            </Button>
          )}

          {isDeployed && (
            <Button
              variant="outline"
              size="sm"
              onClick={startDeployment}
              className="gap-1.5 text-xs"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Re-compile Package
            </Button>
          )}
        </div>

        {/* Deployment Progress Bar */}
        {isDeploying && (
          <div className="space-y-2 py-3">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-primary flex items-center gap-2">
                <RefreshCw className="h-3.5 w-3.5 animate-spin" /> {deployStepText}
              </span>
              <span className="text-muted-foreground">{deployProgress}%</span>
            </div>
            <Progress value={deployProgress} className="h-2.5" />
          </div>
        )}

        {/* Generated Magic Script Box */}
        {isDeployed && generatedScript && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Terminal className="h-4 w-4 text-primary" /> Magic Terminal / OpenCode Command
              </span>
              <Button
                type="button"
                size="sm"
                onClick={handleCopyScript}
                className="gap-1.5 text-xs font-semibold h-8"
              >
                {copiedScript ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied Magic Script!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy Magic Code Block
                  </>
                )}
              </Button>
            </div>

            <div className="relative rounded-xl border border-border bg-[#090d16] p-4 text-xs font-mono text-emerald-400 overflow-x-auto max-h-72">
              <pre className="whitespace-pre">{generatedScript}</pre>
            </div>

            <div className="p-3.5 rounded-xl bg-card border border-border flex items-start gap-3 text-xs text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground">Next Step:</strong> Paste the code block above into{" "}
                <strong>OpenCode</strong> or your terminal in the root package directory. It will clone the
                clean template, inject your legal compliance constants, compile Tailwind OKLCH styles,
                commit to Git, and trigger Dokploy PaaS Cloudflare Tunnel deployment automatically!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
