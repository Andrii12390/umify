interface Props {
  username: string;
  email: string;
  isCollapsed: boolean;
}

export const SidebarUserProfile = ({ username, email, isCollapsed }: Props) => (
  <div className="flex items-center gap-3">
    <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full">
      <span className="text-lg font-bold text-white">{username[0].toUpperCase()}</span>
    </div>
    {!isCollapsed && (
      <div className="flex flex-col overflow-hidden">
        <span className="truncate font-medium">{username}</span>
        <span className="text-muted-foreground truncate text-xs">{email}</span>
      </div>
    )}
  </div>
);
