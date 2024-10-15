import PocketBase from 'pocketbase';

const { PB_URL, PB_ADMIN_EMAIL, PB_ADMIN_PASSWORD } = process.env;

const pb = new PocketBase(PB_URL);

export default pb;
