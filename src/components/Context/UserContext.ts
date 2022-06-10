import { createContext } from 'react';
import { CurrentUser } from '../../types/user';

export type UserContextGlobal = {
	user: CurrentUser | undefined;
};
const UserContext = createContext<UserContextGlobal>({
	user: undefined
});
UserContext.displayName = 'UserContext';

export default UserContext;
