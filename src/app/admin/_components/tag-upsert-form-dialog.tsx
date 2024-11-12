'use client';

import upsertTag from '@/app/_actions/upsertTag.action';
import Button from '@/components/button';
import Dialog from '@/components/dialog';
import InputField from '@/components/fields/input-field';
import { useToast } from '@/components/toast';
import useChangeEventHandler from '@/hooks/useChangeEventHandler';
import useFields from '@/hooks/useFields';
import useUpsertModal from '@/hooks/useUpsertModal';
import { TagUpsertData } from '@/types';
import { FormEventHandler, useTransition } from 'react';

const TagUpsertFormDialog = ({ data }: { data?: TagUpsertData }) => {
	const { tag } = data ?? {};
	const isUpdate = !!tag;
	const upsert = useUpsertModal();
	const toast = useToast();
	const [isPending, startTransition] = useTransition();
	const { fields, setFields, errors, setErrors } = useFields({
		name: data?.tag?.name ?? '',
	});

	const handleFieldChange = useChangeEventHandler(setFields);

	const handleUpsertTag: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const data = {
			id: tag?.id,
			payload: fields,
		};

		startTransition(async () => {
			const { validationError, error, success } = await upsertTag(data);

			setErrors(validationError?.details);

			if (error) {
				toast.error(error);
			}

			if (success) {
				upsert.close();
				toast.success(isUpdate ? 'Tag updated' : 'Tag created');
			}
		});
	};

	return (
		<Dialog
			id="upsert-tag-dialog"
			open={upsert.active}
			onClose={upsert.close}
		>
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
					onChange={handleFieldChange}
					error={errors?.name}
				/>
				<Button type="submit" variant="primary" loading={isPending}>
					{isUpdate ? 'Update Tag' : 'Create Tag'}
				</Button>
			</form>
		</Dialog>
	);
};

export default TagUpsertFormDialog;
