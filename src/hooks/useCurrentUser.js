import { useContext } from 'react';
import UserProvider from '../UserProvider';

function useCurrentUser() {
  return useContext(UserProvider);
}

export default useCurrentUser;
