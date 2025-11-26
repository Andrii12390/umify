'use client';

import { Save } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Switch } from '@/components/ui/switch';
import { STORAGE_KEYS } from '@/constants';
import { SAVE_INTERVALS } from '@/features/settings/constants';
import { cn } from '@/lib/utils';

const getInitialAutoSaveSettings = () => {
  const enabled = !!localStorage.getItem(STORAGE_KEYS.AUTO_SAVE_ENABLED);
  const interval = parseInt(localStorage.getItem(STORAGE_KEYS.AUTO_SAVE_INTERVAL) || '5', 10) || 5;

  return { enabled, interval };
};

export const DiagramSettings = () => {
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);
  const [saveInterval, setSaveInterval] = useState(5);

  useEffect(() => {
    const { enabled, interval } = getInitialAutoSaveSettings();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAutoSaveEnabled(enabled);
    setSaveInterval(interval);
  }, []);

  const toggleAutoSave = () => {
    const next = !autoSaveEnabled;
    setAutoSaveEnabled(next);

    next
      ? localStorage.setItem(STORAGE_KEYS.AUTO_SAVE_ENABLED, 'true')
      : localStorage.removeItem(STORAGE_KEYS.AUTO_SAVE_ENABLED);
  };

  const handleIntervalChange = (value: number) => {
    setSaveInterval(value);
    localStorage.setItem(STORAGE_KEYS.AUTO_SAVE_INTERVAL, value.toString());
  };

  return (
    <div className="p-4 lg:p-6">
      <header className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Auto-save</h2>
        <p className="text-secondary-foreground text-sm">
          Automatically save your diagrams at regular intervals
        </p>
      </header>

      <section
        className={cn(
          'rounded-xl border-2 p-6',
          autoSaveEnabled && 'border-primary/50 bg-primary/15',
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'bg-secondary rounded-full p-3 transition-colors',
                autoSaveEnabled && 'bg-primary/30',
              )}
            >
              <Save className="size-5" />
            </div>
            <div>
              <h3 className="font-semibold">Enable Auto-save</h3>
              <p className="text-secondary-foreground text-xs">Save diagrams automatically</p>
            </div>
          </div>

          <Switch
            className="scale-150 cursor-pointer"
            checked={autoSaveEnabled}
            onCheckedChange={toggleAutoSave}
          />
        </div>

        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            autoSaveEnabled ? 'mt-6 max-h-30 opacity-100' : 'max-h-0 opacity-0',
          )}
        >
          <div className="border-primary/15 border-t pt-4">
            <p className="text-secondary-foreground mb-3 text-sm font-medium">Save interval</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SAVE_INTERVALS.map(({ value, label }) => {
                const isActive = value === saveInterval;
                return (
                  <div
                    key={value}
                    onClick={() => handleIntervalChange(value)}
                    className={cn(
                      'cursor-pointer rounded-md border p-2 text-center font-medium shadow-sm transition-colors',
                      isActive
                        ? 'bg-primary/30 border-primary/50'
                        : 'bg-card hover:bg-primary/30 hover:border-primary/50',
                    )}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
