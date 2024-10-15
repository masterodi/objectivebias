'use server';

import { cache } from 'react';
import validateRequest from './validateRequest.query';

const getUser = cache(async () => {
	const { user } = await validateRequest();
	return user;
});

export default getUser;
