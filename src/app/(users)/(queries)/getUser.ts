'use server';

import { cache } from 'react';
import validateRequest from './validateRequest';

const getUser = cache(async () => {
	const { user } = await validateRequest();
	return user;
});

export default getUser;
