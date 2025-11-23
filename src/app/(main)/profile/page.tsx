import { getUser } from '@/actions';
import { Profile } from '@/features/user/components/profile';

export const dynamic = 'force-dynamic';

async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    return null;
  }
  return <Profile user={user} />;
}

export default ProfilePage;
