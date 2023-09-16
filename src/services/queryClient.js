import { QueryClient } from 'react-query';

import { isAuth } from "./auth";
import { INITIAL_STALE_TIME } from '../constants'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: INITIAL_STALE_TIME,
      enabled: isAuth() ? true : false,
      retry: false
    }
  }
});