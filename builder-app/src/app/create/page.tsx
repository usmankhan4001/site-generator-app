import type { Metadata } from 'next';
import { MasterPromptStudio } from '@/components/prompt/MasterPromptStudio';

export const metadata: Metadata = {
  title: 'Create a site — Airwallex Site Cloner',
};

export default function CreatePage() {
  return <MasterPromptStudio />;
}