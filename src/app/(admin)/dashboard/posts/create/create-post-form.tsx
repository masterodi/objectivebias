'use client';

type CreatePostFormProps = {
	options: any;
};

export default function CreatePostForm({ options }: CreatePostFormProps) {
	return (
		<form className="mx-auto grid w-full max-w-xl gap-8 rounded-md bg-base-200 p-8 shadow-lg">
			<h1 className="text-3xl font-bold">Create a new post</h1>
			<button type="submit" className="btn btn-primary">
				Publish
			</button>
		</form>
	);
}
