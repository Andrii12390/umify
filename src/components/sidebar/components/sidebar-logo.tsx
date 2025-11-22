import React from 'react';

import { SidebarTrigger } from '@/components/ui/sidebar';

interface Props {
  isCollapsed: boolean;
}

export const SidebarLogo = ({ isCollapsed }: Props) => (
  <div className="group flex items-center gap-3">
    <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white">
      <span className="text-xl font-bold">U</span>
    </div>
    {!isCollapsed && (
      <div className="flex flex-col">
        <span className="font-semibold">Umify</span>
        <span className="text-muted-foreground truncate text-xs">Free UML-tool</span>
      </div>
    )}
    <SidebarTrigger className="ml-2 cursor-pointer" />
  </div>
);
