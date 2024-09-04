import PocketBase from 'pocketbase';

const { PB_URL, PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD } = process.env;

const pb = new PocketBase(PB_URL);

pb.autoCancellation(false);

await pb.admins.authWithPassword(PB_ADMIN_EMAIL!, PB_ADMIN_PASSWORD!, {
	autoRefreshThreshold: 30 * 60,
});

export default pb;
