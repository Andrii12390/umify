import Link from 'next/link';
import React from 'react';

import type { MenuList } from '@/hooks';

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu as SidebarMenuBase,
} from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface Props {
  items: MenuList;
  isCollapsed: boolean;
}

export const SidebarMenu = ({ items, isCollapsed }: Props) => (
  <SidebarMenuBase>
    {items.map(({ href, label, icon: Icon, isActive }) => {
      return (
        <SidebarMenuItem key={label}>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarMenuButton
                asChild
                className={cn(
                  'hover:text-primary active:text-primary',
                  isActive
                    ? 'bg-primary/15 hover:bg-primary/15 active:bg-primary/15'
                    : 'hover:bg-sidebar active:bg-sidebar',
                )}
              >
                <Link
                  href={href}
                  className={cn('flex items-center gap-3 px-3 py-2', isActive && 'text-primary')}
                >
                  <Icon className="size-5" />
                  {!isCollapsed && <span>{label}</span>}
                </Link>
              </SidebarMenuButton>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className={cn(!isCollapsed && 'hidden')}
            >
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        </SidebarMenuItem>
      );
    })}
  </SidebarMenuBase>
);
