import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useConfig } from 'common/hooks/useConfig';
import { User } from 'common/models/user';
import { QueryKey } from 'common/utils/constants';

export const useGetUsers = () => {
  const config = useConfig();

  const getUsers = async (): Promise<User[]> => {
    const response = await axios.request({
      url: `${config.VITE_BASE_URL_API}/users`,
    });

    return response.data;
  };

  return useQuery({
    queryKey: [QueryKey.Users],
    queryFn: () => getUsers(),
  });
};
