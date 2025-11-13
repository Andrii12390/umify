import { Monitor, Moon, Sun } from 'lucide-react';

export const THEME_OPTIONS = [
  {
    value: 'light',
    text: 'Classic light theme',
    icon: Sun,
  },
  {
    value: 'dark',
    text: 'Convenient dark theme',
    icon: Moon,
  },
  {
    value: 'system',
    text: 'Automatically accordion to the system',
    icon: Monitor,
  },
];

export const SAVE_INTERVALS = [
  { value: 1, label: '1 min' },
  { value: 5, label: '5 min' },
  { value: 10, label: '10 min' },
  { value: 30, label: '30 min' },
];
