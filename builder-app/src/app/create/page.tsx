import type { Metadata } from 'next';
import { CreateFlow } from '@/components/create/CreateFlow';

export const metadata: Metadata = {
  title: 'Create a site — Airwallex Site Cloner',
};

export default function CreatePage() {
  return <CreateFlow />;
}
