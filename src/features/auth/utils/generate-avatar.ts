import { sample } from 'lodash-es';

import { AVATAR_GRADIENTS } from '@/features/auth/constants';

export const generateAvatar = () => sample(AVATAR_GRADIENTS);
