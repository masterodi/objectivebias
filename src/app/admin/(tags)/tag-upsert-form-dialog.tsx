'use client';

import upsertTag from '@/app/(tags)/(actions)/upsertTag';
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
	const upsertModal = useUpsertModal();
	const toast = useToast();
	const [isPending, startTransition] = useTransition();
	const { fields, setFields, errors, setErrors } = useFields({
		name: tag?.name ?? '',
	});

	const handleFieldChange = useChangeEventHandler(setFields);

	const handleUpsertTag: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		startTransition(async () => {
			const { validationError, error, success } = await upsertTag(
				fields,
				tag?.id
			);

			setErrors(validationError?.details);

			if (error) {
				toast.error(error);
			}

			if (success) {
				upsertModal.close();
				toast.success(isUpdate ? 'Tag updated' : 'Tag created');
			}
		});
	};

	return (
		<Dialog
			id="upsert-tag-dialog"
			open={upsertModal.isActive}
			onClose={upsertModal.close}
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
