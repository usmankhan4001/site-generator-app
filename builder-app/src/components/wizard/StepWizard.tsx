"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWizardStore } from "@/store/wizardStore";
import { Step1Business } from "./Step1Business";
import { Step2Archetype } from "./Step2Archetype";
import { Step3Theme } from "./Step3Theme";
import { Step4Domain } from "./Step4Domain";
import { Step5ReviewDeploy } from "./Step5ReviewDeploy";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Sparkles,
  Palette,
  Globe,
  Rocket,
  ArrowRight,
  ArrowLeft,
  Check,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

interface StepConfig {
  step: number;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

const STEPS: StepConfig[] = [
  {
    step: 1,
    label: "Business",
    sublabel: "Legal Entity & Compliance",
    icon: <Building2 className="h-4 w-4" />,
  },
  {
    step: 2,
    label: "Archetype",
    sublabel: "20 Value Propositions",
    icon: <Sparkles className="h-4 w-4" />,
  },
  {
    step: 3,
    label: "Theme",
    sublabel: "20 Untitled UI Palettes",
    icon: <Palette className="h-4 w-4" />,
  },
  {
    step: 4,
    label: "Domain",
    sublabel: "DNS & Formspree Router",
    icon: <Globe className="h-4 w-4" />,
  },
  {
    step: 5,
    label: "Deploy",
    sublabel: "Pre-Flight & Launch",
    icon: <Rocket className="h-4 w-4" />,
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
  }),
};

interface StepWizardProps {
  hideHeader?: boolean;
}

export const StepWizard: React.FC<StepWizardProps> = ({ hideHeader = false }) => {
  const { currentStep, setStep, nextStep, prevStep, isStepValid, resetWizard } =
    useWizardStore();
  const [direction, setDirection] = React.useState<number>(0);
  const [prevStepState, setPrevStepState] = React.useState<number>(currentStep);

  useEffect(() => {
    setDirection(currentStep > prevStepState ? 1 : -1);
    setPrevStepState(currentStep);
  }, [currentStep, prevStepState]);

  // Keyboard shortcut: Ctrl/Cmd + Enter to proceed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        if (isStepValid(currentStep) && currentStep < 5) {
          nextStep();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, isStepValid, nextStep]);

  const canProceed = isStepValid(currentStep);

  return (
    <div className={`w-full ${hideHeader ? 'space-y-6' : 'max-w-6xl mx-auto space-y-8 pb-16'}`}>
      {/* Top Navbar Header (conditional) */}
      {!hideHeader && (
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-card shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/20">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg text-foreground tracking-tight">
                  Airwallex Site Cloner Studio
                </h1>
                <Badge variant="pill" className="text-[10px]">
                  v2.4
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                5-Step Guided Untitled UI & Merchant Underwriting Builder
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={resetWizard}
              className="text-xs text-muted-foreground hover:text-foreground gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset Form
            </Button>
          </div>
        </header>
      )}

      {/* Step Indicator Stepper */}
      <nav aria-label="Progress Stepper" className="p-4 rounded-2xl border border-border bg-card shadow-xs">
        <ol className="grid grid-cols-5 gap-2 sm:gap-4">
          {STEPS.map((s) => {
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            const isSelectable = s.step < currentStep || isStepValid(s.step - 1);

            return (
              <li
                key={s.step}
                onClick={() => isSelectable && setStep(s.step)}
                className={`relative flex flex-col items-center sm:items-start p-2 sm:p-3 rounded-xl transition-all ${
                  isSelectable ? "cursor-pointer" : "cursor-not-allowed opacity-60"
                } ${
                  isCurrent
                    ? "bg-primary/10 border border-primary/30"
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2.5 w-full">
                  {/* Step Icon / Checkmark */}
                  <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                      isCompleted
                        ? "bg-emerald-600 text-white shadow-xs"
                        : isCurrent
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 ring-2 ring-primary/40"
                        : "bg-muted text-muted-foreground border border-border"
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : s.icon}
                  </div>

                  <div className="hidden sm:block min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Step {s.step}
                      </span>
                    </div>
                    <h3 className="font-bold text-xs text-foreground truncate">
                      {s.label}
                    </h3>
                  </div>
                </div>

                {/* Bottom Step Progress Bar Indicator */}
                <div
                  className={`mt-2.5 h-1 w-full rounded-full transition-all ${
                    isCompleted
                      ? "bg-emerald-600"
                      : isCurrent
                      ? "bg-primary"
                      : "bg-muted"
                  }`}
                />
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Dynamic Animated Step Viewport */}
      <main className="min-h-[500px] p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm overflow-hidden relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {currentStep === 1 && <Step1Business />}
            {currentStep === 2 && <Step2Archetype />}
            {currentStep === 3 && <Step3Theme />}
            {currentStep === 4 && <Step4Domain />}
            {currentStep === 5 && <Step5ReviewDeploy />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Sticky Bottom Navigation Footer */}
      <footer className="sticky bottom-4 z-40 p-4 rounded-2xl border border-border bg-card/95 backdrop-blur-md shadow-lg flex items-center justify-between gap-4">
        <div>
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="gap-2 h-11 px-5 text-sm font-semibold cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex text-xs text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 rounded bg-muted border font-mono text-[10px] mx-1">⌘ / Ctrl + Enter</kbd> to continue
          </span>

          {currentStep < 5 && (
            <Button
              type="button"
              onClick={nextStep}
              disabled={!canProceed}
              className="gap-2 h-11 px-7 text-sm font-bold shadow-md shadow-primary/20 cursor-pointer"
            >
              Continue to Step {currentStep + 1} <ArrowRight className="h-4 w-4" />
            </Button>
          )}

          {currentStep === 5 && (
            <div className="text-xs text-muted-foreground font-medium">
              Review and click <strong>Deploy Website Now</strong> above to complete.
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};
