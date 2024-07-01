import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useConfig } from 'common/hooks/useConfig';
import { User } from 'common/models/user';
import { QueryKey } from 'common/utils/constants';

interface UseGetUserProps {
  userId: string;
}

export const useGetUser = ({ userId }: UseGetUserProps) => {
  const config = useConfig();

  const getUser = async (): Promise<User | null> => {
    const response = await axios.request({
      url: `${config.VITE_BASE_URL_API}/users/${userId}`,
    });

    return response.data;
  };

  return useQuery({
    queryKey: [QueryKey.Users, userId],
    queryFn: () => getUser(),
    enabled: !!userId,
  });
};
