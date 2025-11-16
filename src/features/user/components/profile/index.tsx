import { getUser } from '@/actions';
import { ProfileForm } from '@/features/user/components/profile/profile-form';

export const Profile = async () => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <ProfileForm initialValues={{ ...user }} />
    </div>
  );
};
