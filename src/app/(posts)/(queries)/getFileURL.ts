'use server';

export default async function getFile(filePath: string) {
	return `https://r2.objectivebias.heio.dev/${filePath}`;
}
