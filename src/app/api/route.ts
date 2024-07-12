import pb from '@/pocketbase';

export async function GET(request: Request) {
	const data = await pb.collection('users').getFullList();
	return Response.json({ data });
}
