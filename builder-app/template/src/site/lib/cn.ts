import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Site-kit class merge helper. Kept local so `src/site/` is self-contained
 *  and copies cleanly into every generated site. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
