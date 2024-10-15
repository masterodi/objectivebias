'use client';

import Input from '@/components/input';
import { useToast } from '@/components/toast';
import useFormFields from '@/hooks/useFormFields';
import useSearchParamsManager from '@/hooks/useSearchParamsManager';
import { Tag } from '@/schemas';
import { FormEvent, useTransition } from 'react';
import { twMerge } from 'tailwind-merge';
import upsertTag from '../_actions/upsertTag.action';

const DIALOG_SEARCH_PARAM = 'upsert-tag';

type UpsertTagFormProps = {
	data?: Tag;
};

export default function UpsertTagForm({ data }: UpsertTagFormProps) {
	const isUpdate = !!data;
	const { isUpsertTagDialogOpen, closeUpsertTagDialog } =
		useSearchParamsManager();
	const [isPending, startTransition] = useTransition();
	const { fields, setFields, fieldsError, setFieldsError } = useFormFields({
		name: data?.name ?? '',
	});
	const toast = useToast();

	const handleCloseDialog = (e: FormEvent) => {
		e.preventDefault();
		closeUpsertTagDialog();
	};

	const handleUpsertTag = async (e: FormEvent) => {
		e.preventDefault();
		startTransition(async () => {
			setFieldsError(null);

			const { validationError, error, success } = await upsertTag({
				id: data?.id,
				payload: fields,
			});

			if (validationError) {
				setFieldsError(validationError.details);
			} else if (error) {
				toast.error(error);
			} else if (success) {
				closeUpsertTagDialog();
				toast.success(isUpdate ? 'Tag updated' : 'Tag created');
			}
		});
	};

	return (
		<dialog
			id="upsert-tag-dialog"
			className={twMerge('modal', isUpsertTagDialogOpen && 'modal-open')}
			open={isUpsertTagDialogOpen}
		>
			<div className="modal-box">
				<form
					onSubmit={handleUpsertTag}
					className="grid w-full max-w-xl gap-8"
				>
					<h1 className="text-3xl font-bold">
						{isUpdate ? 'Update tag' : 'Create tag'}
					</h1>
					<Input
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
			</div>
			<form
				onSubmit={handleCloseDialog}
				method="dialog"
				className="modal-backdrop"
			>
				<button>close</button>
			</form>
		</dialog>
	);
}
