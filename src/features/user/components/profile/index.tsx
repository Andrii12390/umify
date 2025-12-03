'use client';

import { Lock, User as UserIcon } from 'lucide-react';

import type { User } from '@/types';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChangePasswordForm } from '@/features/user/components/profile/change-password-form';
import { ProfileForm } from '@/features/user/components/profile/profile-form';
import { VerificationWrapper } from '@/features/user/components/profile/verification-wrapper';

const TABS = [
  { id: 'profile', label: 'Profile', icon: UserIcon },
  { id: 'password', label: 'Password', icon: Lock },
];

export const Profile = ({ user }: { user: User }) => {
  return (
    <div className="mx-auto flex-1 overflow-y-auto p-4 lg:p-6">
      <Tabs
        defaultValue="profile"
        className="mx-auto w-full max-w-xl space-y-6"
      >
        <TabsList className="bg-background grid w-full grid-cols-2 rounded-none border-b p-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <TabsTrigger
              key={id}
              value={id}
              className="text-muted-foreground hover:text-foreground data-[state=active]:text-foreground data-[state=active]:border-b-primary! bg-background! flex cursor-pointer items-center justify-center gap-2 rounded-none border-b-2 border-transparent! font-medium data-[state=active]:shadow-none"
            >
              <Icon className="size-[18px]" />
              <span>{label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile">
          <VerificationWrapper isVerified={user.isVerified}>
            <ProfileForm initialValues={{ ...user }} />
          </VerificationWrapper>
        </TabsContent>

        <TabsContent value="password">
          <VerificationWrapper isVerified={user.isVerified}>
            <ChangePasswordForm />
          </VerificationWrapper>
        </TabsContent>
      </Tabs>
    </div>
  );
};
