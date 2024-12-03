'use server';

import S3 from '@/storage';
import { PutObjectCommand } from '@aws-sdk/client-s3';

export default async function uploadFile(file: File, key: string) {
	const data = await file.arrayBuffer();
	const command = new PutObjectCommand({
		Bucket: 'objectivebias',
		Body: Buffer.from(data),
		ContentType: file.type,
		Key: key,
	});

	await S3.send(command);
	return `https://r2.objectivebias.heio.dev/${key}`;
}
