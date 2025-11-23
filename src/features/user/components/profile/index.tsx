'use client';

import type { ElementType } from 'react';

import { Lock, User as UserIcon } from 'lucide-react';
import { useState } from 'react';

import type { User } from '@/types';

import { ChangePasswordForm } from '@/features/user/components/profile/change-password-form';
import { ProfileForm } from '@/features/user/components/profile/profile-form';
import { cn } from '@/lib/utils';

type TabId = 'profile' | 'password';

const TABS: { id: TabId; label: string; icon: ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: UserIcon },
  { id: 'password', label: 'Password', icon: Lock },
];

export const Profile = ({ user }: { user: User }) => {
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  return (
    <div className="mx-auto w-fit space-y-6 p-4 lg:p-6">
      <div className="mb-8 grid w-full grid-cols-2 border-b border-gray-700">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;

          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                'relative px-6 py-3 font-medium transition-all',
                isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className="size-[18px]" />
                <span>{label}</span>
              </div>
              <div
                className={cn(
                  'bg-primary absolute inset-x-0 bottom-0 h-0.5 rounded-full transition-opacity',
                  isActive ? 'opacity-100' : 'opacity-0',
                )}
              />
            </button>
          );
        })}
      </div>

      {activeTab === 'profile' && <ProfileForm initialValues={{ ...user }} />}
      {activeTab === 'password' && <ChangePasswordForm />}
    </div>
  );
};
