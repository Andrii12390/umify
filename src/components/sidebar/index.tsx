'use client';

import Link from 'next/link';
import React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { useMenu } from '@/hooks';
import { cn } from '@/lib/utils';

export const AppSidebar = () => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const menuItems = useMenu();

  return (
    <Sidebar
      collapsible="icon"
      className="hidden md:block"
    >
      <SidebarHeader
        className={cn('h-14 justify-center border-b transition-all', !isCollapsed && 'px-4')}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white">
            <span className="text-xl font-bold">U</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-semibold">Umify</span>
              <span className="text-muted-foreground truncate text-xs">Free UML-tool</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map(item => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                className={cn(
                  'hover:text-primary active:text-primary',
                  item.isActive
                    ? 'bg-primary/15 hover:bg-primary/15 active:bg-primary/15'
                    : 'hover:bg-sidebar active:bg-sidebar',
                )}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2',
                    item.isActive && 'text-primary',
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter
        className={cn('h-14 justify-center border-t transition-all', !isCollapsed && 'px-4')}
      >
        <div className="flex items-center gap-3">
          <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full">
            <span className="text-lg font-bold text-white">S</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="truncate font-medium">andrii</span>
              <span className="text-muted-foreground truncate text-xs">
                pasiura.andrii.dev@gmail.com
              </span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
