'use client';

import upsertTag from '@/app/_actions/upsertTag.action';
import Dialog from '@/components/dialog';
import InputField from '@/components/fields/input-field';
import { useToast } from '@/components/toast';
import useFormFields from '@/hooks/useFormFields';
import useUpsertTag from '@/hooks/useUpsertTag';
import { Tag } from '@/schemas';
import { FormEvent, useTransition } from 'react';

type FormUpsertTagProps = {
	data?: Tag;
};

export default function FormUpsertTag({ data }: FormUpsertTagProps) {
	const isUpdate = !!data;
	const { isActive, closeDialog } = useUpsertTag();
	const [isPending, startTransition] = useTransition();
	const { fields, setFields, fieldsError, setFieldsError } = useFormFields({
		name: data?.name ?? '',
	});
	const toast = useToast();

	const handleUpsertTag = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFieldsError(null);
		startTransition(async () => {
			const { validationError, error, success } = await upsertTag({
				id: data?.id,
				payload: fields,
			});
			if (validationError) {
				setFieldsError(validationError.details);
			} else if (error) {
				toast.error(error);
			} else if (success) {
				closeDialog();
				toast.success(isUpdate ? 'Tag updated' : 'Tag created');
			}
		});
	};

	return (
		<Dialog id="upsert-tag-dialog" open={isActive} onClose={closeDialog}>
			<form
				onSubmit={handleUpsertTag}
				className="grid w-full max-w-xl gap-8"
			>
				<h1 className="text-3xl font-bold">
					{isUpdate ? 'Update tag' : 'Create tag'}
				</h1>
				<InputField
					id="name"
					name="name"
					label="Tag name"
					value={fields.name}
					onChange={(e) =>
						setFields((prev) => ({
							...prev,
							name: e.target.value,
						}))
					}
					error={fieldsError?.name}
				/>
				<button
					type="submit"
					disabled={isPending}
					className="btn btn-primary"
				>
					{isUpdate ? 'Update Tag' : 'Create Tag'}
				</button>
			</form>
		</Dialog>
	);
}
