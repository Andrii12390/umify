'use client';

import React from 'react';

import {
  Sidebar as SidebarBase,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { useMenu } from '@/hooks';
import { cn } from '@/lib/utils';

import { SidebarLogo } from './components/sidebar-logo';
import { SidebarMenu } from './components/sidebar-menu';
import { SidebarUserProfile } from './components/sidebar-user-profile';

interface Props {
  username?: string;
  email?: string;
}

export const Sidebar = ({ username, email }: Props) => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const menu = useMenu();

  const hasUserInfo = username && email;

  return (
    <SidebarBase
      collapsible="icon"
      className="hidden md:block"
    >
      <SidebarHeader
        className={cn('h-14 justify-center border-b transition-all', !isCollapsed && 'px-4')}
      >
        <SidebarLogo isCollapsed={isCollapsed} />
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarMenu
          items={menu}
          isCollapsed={isCollapsed}
        />
      </SidebarContent>

      {hasUserInfo && (
        <SidebarFooter
          className={cn('h-14 justify-center border-t transition-all', !isCollapsed && 'px-4')}
        >
          <SidebarUserProfile
            username={username}
            email={email}
            isCollapsed={isCollapsed}
          />
        </SidebarFooter>
      )}
    </SidebarBase>
  );
};
