import { create } from "zustand";
import { ARCHETYPES } from "@/data/archetypes";
import { THEMES } from "@/data/themes";
import { BusinessData, DomainData, WizardState } from "@/types/wizard";
import { useBuilderStore } from "@/lib/store";

interface WizardStore extends WizardState {
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateBusiness: (data: Partial<BusinessData>) => void;
  selectArchetype: (archetypeId: string) => void;
  selectTheme: (themeId: string) => void;
  updateDomain: (data: Partial<DomainData>) => void;
  loadPreset: (presetName: string) => void;
  startDeployment: () => Promise<void>;
  resetWizard: () => void;
  isStepValid: (step: number) => boolean;
}

const INITIAL_BUSINESS: BusinessData = {
  companyName: "Vantage Cloud Technologies Limited",
  shortName: "Vantage Cloud",
  registrationNumber: "76891245",
  address: "Suite 2408, Two IFC, 8 Finance Street, Central, Hong Kong",
  supportEmail: "support@vantagecloud.io",
  phone: "+852 3008 5890",
  governingLaw: "Hong Kong SAR",
};

const INITIAL_DOMAIN: DomainData = {
  targetDomain: "vantagecloud.io",
  formspreeId: "xpwzgkqv",
  enableFormspree: true,
  githubRepoUrl: "https://github.com/vantage-cloud/vantagecloud.io.git",
};

export const useWizardStore = create<WizardStore>((set, get) => ({
  currentStep: 1,
  business: INITIAL_BUSINESS,
  selectedArchetypeId: "tech-cloud-devops",
  selectedThemeId: "indigo-enterprise",
  domain: INITIAL_DOMAIN,
  isDeploying: false,
  deployProgress: 0,
  deployStepText: "",
  isDeployed: false,
  generatedScript: "",

  setStep: (step: number) => {
    if (step >= 1 && step <= 5) {
      set({ currentStep: step });
      useBuilderStore.getState().setStep(step as any);
    }
  },

  nextStep: () => {
    const { currentStep } = get();
    if (currentStep < 5) {
      const next = currentStep + 1;
      set({ currentStep: next });
      useBuilderStore.getState().setStep(next as any);
    }
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 1) {
      const prev = currentStep - 1;
      set({ currentStep: prev });
      useBuilderStore.getState().setStep(prev as any);
    }
  },

  updateBusiness: (data) => {
    set((state) => ({
      business: { ...state.business, ...data },
    }));
    useBuilderStore.getState().updateBusiness({
      companyName: data.companyName,
      shortName: data.shortName,
      registrationNumber: data.registrationNumber,
      address: data.address,
      email: data.supportEmail,
      phone: data.phone,
      governingLaw: data.governingLaw,
    });
  },

  selectArchetype: (archetypeId: string) => {
    const archetype = ARCHETYPES[archetypeId];
    if (archetype) {
      // Auto-suggest first theme if not already set to one of its suggested themes
      const currentTheme = get().selectedThemeId;
      const themes = archetype.suggestedThemes || archetype.recommendedThemes || [];
      const themeMatches = themes.includes(currentTheme);
      const nextTheme = themeMatches ? currentTheme : themes[0] || currentTheme;
      set({
        selectedArchetypeId: archetypeId,
        selectedThemeId: nextTheme,
      });
      useBuilderStore.getState().setArchetype(archetypeId);
      useBuilderStore.getState().setTheme(nextTheme);
    }
  },

  selectTheme: (themeId: string) => {
    if (THEMES[themeId]) {
      set({ selectedThemeId: themeId });
      useBuilderStore.getState().setTheme(themeId);
    }
  },

  updateDomain: (data) => {
    set((state) => ({
      domain: { ...state.domain, ...data },
    }));
    if (data.targetDomain) {
      useBuilderStore.getState().updateBusiness({ domain: data.targetDomain });
    }
  },

  loadPreset: (presetName: string) => {
    switch (presetName) {
      case "hk-tech":
        set({
          business: {
            companyName: "Vantage Cloud Technologies Limited",
            shortName: "Vantage Cloud",
            registrationNumber: "76891245",
            address: "Suite 2408, Two IFC, 8 Finance Street, Central, Hong Kong",
            supportEmail: "contact@vantagecloud.io",
            phone: "+852 3008 5890",
            governingLaw: "Hong Kong SAR",
          },
          selectedArchetypeId: "tech-cloud-devops",
          selectedThemeId: "indigo-enterprise",
          domain: {
            targetDomain: "vantagecloud.io",
            formspreeId: "xpwzgkqv",
            enableFormspree: true,
            githubRepoUrl: "https://github.com/vantage-cloud/vantagecloud.io.git",
          },
        });
        break;

      case "us-ai":
        set({
          business: {
            companyName: "Nexus Applied Intelligence Inc.",
            shortName: "Nexus AI",
            registrationNumber: "DE-SR-892147",
            address: "500 Howard Street, Suite 400, San Francisco, CA 94105, United States",
            supportEmail: "enterprise@nexusai.systems",
            phone: "+1 (415) 890-2134",
            governingLaw: "State of Delaware, United States",
          },
          selectedArchetypeId: "tech-ai-studio",
          selectedThemeId: "midnight-obsidian",
          domain: {
            targetDomain: "nexusai.systems",
            formspreeId: "mle-contact-ai",
            enableFormspree: true,
            githubRepoUrl: "https://github.com/nexus-ai/nexusai-systems.git",
          },
        });
        break;

      case "uk-luxury":
        set({
          business: {
            companyName: "Maison St. Claire Atelier Ltd.",
            shortName: "Maison St. Claire",
            registrationNumber: "14890218",
            address: "14 Savile Row, Mayfair, London, W1S 3JN, United Kingdom",
            supportEmail: "concierge@maisonstclaire.co.uk",
            phone: "+44 20 7946 0912",
            governingLaw: "England & Wales, United Kingdom",
          },
          selectedArchetypeId: "ecommerce-luxury-fashion",
          selectedThemeId: "monochrome-atelier",
          domain: {
            targetDomain: "maisonstclaire.co.uk",
            formspreeId: "atelier-orders",
            enableFormspree: true,
            githubRepoUrl: "https://github.com/stclaire/atelier-ecommerce.git",
          },
        });
        break;

      case "sg-vps":
        set({
          business: {
            companyName: "Apex High-Compute Networks Pte. Ltd.",
            shortName: "Apex Compute",
            registrationNumber: "202318902M",
            address: "12 Marina Boulevard, Marina Bay Financial Centre Tower 3, Singapore 018982",
            supportEmail: "datacenter@apexcompute.io",
            phone: "+65 6789 0123",
            governingLaw: "Republic of Singapore",
          },
          selectedArchetypeId: "hosting-cloud-vps",
          selectedThemeId: "hyper-speed-ultramarine",
          domain: {
            targetDomain: "apexcompute.io",
            formspreeId: "cloud-ops-ticket",
            enableFormspree: true,
            githubRepoUrl: "https://github.com/apex-cloud/apexcompute.io.git",
          },
        });
        break;
    }
  },

  isStepValid: (step: number) => {
    const { business, selectedArchetypeId, selectedThemeId, domain } = get();
    switch (step) {
      case 1:
        return (
          business.companyName.trim().length > 2 &&
          business.registrationNumber.trim().length > 2 &&
          business.address.trim().length > 5 &&
          business.supportEmail.includes("@") &&
          business.phone.trim().length > 5 &&
          business.governingLaw.trim().length > 2
        );
      case 2:
        return Boolean(selectedArchetypeId && ARCHETYPES[selectedArchetypeId]);
      case 3:
        return Boolean(selectedThemeId && THEMES[selectedThemeId]);
      case 4:
        return domain.targetDomain.trim().length > 3 && domain.targetDomain.includes(".");
      case 5:
        return true;
      default:
        return false;
    }
  },

  startDeployment: async () => {
    const { business, selectedArchetypeId, selectedThemeId, domain } = get();
    set({ isDeploying: true, deployProgress: 10, deployStepText: "Compiling business entity parameters & legal policies..." });

    // Step 1
    await new Promise((r) => setTimeout(r, 600));
    set({ deployProgress: 35, deployStepText: "Configuring Untitled UI theme variables & font hierarchy..." });

    // Step 2
    await new Promise((r) => setTimeout(r, 700));
    set({ deployProgress: 65, deployStepText: "Generating Airwallex compliance footer, legal matrices & Formspree route..." });

    // Step 3
    await new Promise((r) => setTimeout(r, 700));
    set({ deployProgress: 90, deployStepText: "Packaging Dokploy PaaS Cloudflare Tunnel orchestrator..." });

    // Step 4
    await new Promise((r) => setTimeout(r, 600));

    const script = `#!/bin/bash
# =========================================================================
# Airwallex-Compliant Business Site Generator & Dokploy Deployment
# Entity: ${business.companyName} (${business.registrationNumber})
# Domain: ${domain.targetDomain} | Archetype: ${selectedArchetypeId} | Theme: ${selectedThemeId}
# =========================================================================
set -e

DOMAIN="${domain.targetDomain}"
PROJECT_DIR="../$DOMAIN"

echo "🚀 Spinning up bespoke Untitled UI site for ${business.companyName}..."

# 1. Clone base template
if [ ! -d "$PROJECT_DIR" ]; then
  cp -R ./template "$PROJECT_DIR"
fi
cd "$PROJECT_DIR"

# 2. Run automated customization engine
node ../skill/scripts/setup.js \\
  --company "${business.companyName}" \\
  --regNo "${business.registrationNumber}" \\
  --address "${business.address}" \\
  --domain "${domain.targetDomain}" \\
  --email "${business.supportEmail}" \\
  --phone "${business.phone}" \\
  --governingLaw "${business.governingLaw}" \\
  --archetype "${selectedArchetypeId}" \\
  --theme "${selectedThemeId}"

# 3. Copy Production Dockerfile
cp ../skill/resources/Dockerfile ./

# 4. Initialize Git & push to repository
git init
git add .
git commit -m "feat: initial launch of ${business.companyName} on Untitled UI design system"
git branch -M main
${domain.githubRepoUrl ? `git remote add origin ${domain.githubRepoUrl} 2>/dev/null || git remote set-url origin ${domain.githubRepoUrl}\ngit push -u origin main --force || true` : '# No git remote configured'}

# 5. Trigger Dokploy PaaS Deployment (Configured with Cloudflare Tunnel)
echo "🌐 Triggering Dokploy PaaS Cloudflare Tunnel deployment..."
DOKPLOY_API_KEY="GfDwKHpBloKdZLJRcEfMOwQEXirbnjSRkoYyXkNYEOypQxswuDDVEIpZSYyBXFBt"
DOKPLOY_HOST="https://paas.usmankhan.xyz"

curl -s -X POST "$DOKPLOY_HOST/api/project.create" \\
  -H "Authorization: Bearer $DOKPLOY_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "${business.companyName}",
    "description": "Bespoke Untitled UI website for ${domain.targetDomain}"
  }' || true

echo "✅ Build and deployment initiated successfully for ${domain.targetDomain}!"
`;

    set({
      isDeploying: false,
      deployProgress: 100,
      deployStepText: "Deployment package ready! Magic script generated.",
      isDeployed: true,
      generatedScript: script,
    });
  },

  resetWizard: () =>
    set({
      currentStep: 1,
      business: INITIAL_BUSINESS,
      selectedArchetypeId: "tech-cloud-devops",
      selectedThemeId: "indigo-enterprise",
      domain: INITIAL_DOMAIN,
      isDeploying: false,
      deployProgress: 0,
      deployStepText: "",
      isDeployed: false,
      generatedScript: "",
    }),
}));
