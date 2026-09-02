"use client";

import React from "react";
import { useWizardStore } from "@/store/wizardStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Hash,
  MapPin,
  Mail,
  Phone,
  Scale,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Briefcase,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const JURISDICTION_PRESETS = [
  "Hong Kong SAR",
  "State of Delaware, United States",
  "England & Wales, United Kingdom",
  "Republic of Singapore",
  "Dubai (DIFC / ADGM), United Arab Emirates",
  "Federal Republic of Germany (EU)",
  "Australia",
  "Canada (Federal)",
];

export const Step1Business: React.FC = () => {
  const { business, updateBusiness, loadPreset } = useWizardStore();

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const currentShort = business.shortName;
    const autoShort = val.split(" ")[0] || "";
    updateBusiness({
      companyName: val,
      shortName: !currentShort || currentShort === business.companyName.split(" ")[0] ? autoShort : currentShort,
    });
  };

  return (
    <TooltipProvider>
      <div className="space-y-8 animate-in fade-in-50 duration-300">
        {/* Step Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="dot-pill">
              <span className="dot-indicator" />
              Airwallex Compliance Engine
            </span>
            <Badge variant="subtle">Underwriting Ready</Badge>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Legal Entity & Compliance Information
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
            Provide official entity registration details. These are embedded naturally in
            the fine-print footer, refund policies, and statutory terms to satisfy
            merchant payment underwriting with zero friction.
          </p>
        </div>

        {/* Quick Presets Bar */}
        <div className="p-4 rounded-xl border border-border bg-card/60 backdrop-blur-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Quick Autofill Presets
            </span>
            <span className="text-xs text-muted-foreground">Click to populate sample entity</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs justify-start h-9 hover:border-primary/50"
              onClick={() => loadPreset("hk-tech")}
            >
              🇭🇰 HK Tech Cloud
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs justify-start h-9 hover:border-primary/50"
              onClick={() => loadPreset("us-ai")}
            >
              🇺🇸 Delaware AI Studio
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs justify-start h-9 hover:border-primary/50"
              onClick={() => loadPreset("uk-luxury")}
            >
              🇬🇧 London Atelier
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="text-xs justify-start h-9 hover:border-primary/50"
              onClick={() => loadPreset("sg-vps")}
            >
              🇸🇬 Singapore VPS
            </Button>
          </div>
        </div>

        {/* Business Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Legal Company Name */}
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="companyName" className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Full Legal Entity Name
                <span className="text-destructive">*</span>
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  The exact entity name registered with your government registry (e.g. Companies Registry, Delaware Div of Corps).
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="companyName"
              placeholder="e.g. Vantage Cloud Technologies Limited"
              value={business.companyName}
              onChange={handleCompanyNameChange}
              className="h-11 text-base font-medium"
            />
          </div>

          {/* Short Name / Brand */}
          <div className="space-y-2">
            <Label htmlFor="shortName" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              Brand / Display Short Name
            </Label>
            <Input
              id="shortName"
              placeholder="e.g. Vantage Cloud"
              value={business.shortName}
              onChange={(e) => updateBusiness({ shortName: e.target.value })}
              className="h-11"
            />
          </div>

          {/* Registration Number */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="registrationNumber" className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-primary" />
                Company Registration / CR Number
                <span className="text-destructive">*</span>
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  CR Number (HK), EIN (US), Companies House Number (UK), or UEN (Singapore).
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="registrationNumber"
              placeholder="e.g. 76891245 or DE-902814"
              value={business.registrationNumber}
              onChange={(e) => updateBusiness({ registrationNumber: e.target.value })}
              className="h-11 font-mono text-sm"
            />
          </div>

          {/* Physical Address */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Registered Physical Address
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="address"
              placeholder="e.g. Suite 2408, Two IFC, 8 Finance Street, Central, Hong Kong"
              value={business.address}
              onChange={(e) => updateBusiness({ address: e.target.value })}
              className="h-11"
            />
            <p className="text-xs text-muted-foreground">
              Must be a valid street address for card network verification (P.O. boxes discouraged).
            </p>
          </div>

          {/* Support Email */}
          <div className="space-y-2">
            <Label htmlFor="supportEmail" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Support / Customer Inquiries Email
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="supportEmail"
              type="email"
              placeholder="support@vantagecloud.io"
              value={business.supportEmail}
              onChange={(e) => updateBusiness({ supportEmail: e.target.value })}
              className="h-11"
            />
          </div>

          {/* Direct Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              Customer Support Phone Number
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              placeholder="+852 3008 5890 or +1 (415) 555-0192"
              value={business.phone}
              onChange={(e) => updateBusiness({ phone: e.target.value })}
              className="h-11"
            />
          </div>

          {/* Governing Law / Jurisdiction */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="governingLaw" className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" />
              Governing Law & Legal Jurisdiction
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="governingLaw"
              placeholder="e.g. Hong Kong SAR, England & Wales, State of Delaware"
              value={business.governingLaw}
              onChange={(e) => updateBusiness({ governingLaw: e.target.value })}
              className="h-11"
            />

            {/* Quick Jurisdiction Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1.5">
              <span className="text-xs text-muted-foreground self-center mr-1">Popular:</span>
              {JURISDICTION_PRESETS.slice(0, 5).map((jur) => (
                <button
                  key={jur}
                  type="button"
                  onClick={() => updateBusiness({ governingLaw: jur })}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                    business.governingLaw === jur
                      ? "bg-primary text-primary-foreground border-primary font-medium shadow-xs"
                      : "bg-muted/50 border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {jur.split(",")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Natural Compliance Banner Callout */}
        <div className="p-4 rounded-xl border border-emerald-200/60 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20 flex items-start gap-3.5">
          <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 mt-0.5">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              Clean, Natural Compliance Architecture
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </h4>
            <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 leading-relaxed">
              No crude "KYC info" badges will appear on your homepage. All legal registration,
              physical location, and statutory policies (Privacy, Terms, Refunds, Shipping) are
              automatically rendered into an elegant fine-print footer bar and accessible modals
              matching genuine enterprise conventions.
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};
