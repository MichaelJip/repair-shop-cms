import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index, update } from '@/routes/roles';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

type Props = {
    role: { id: number; name: string };
};

const EditRoles = ({ role }: Props) => {
    const { data, setData, patch, processing, errors } = useForm({
        name: role.name,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(update(role.id).url);
        toast.success('Success edit role')
    };
    return (
        <>
            <Head title='Edit' />
            <div className='mx-4 my-4'>
                <Link href={index()} className='flex flex-row gap-4'>
                    <ArrowLeft />
                    Back
                </Link>

                <form onSubmit={submit} className='mt-4 w-full space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='name'>Name</Label>
                        <Input
                            id='name'
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className='flex justify-end'>
                        <Button
                            className='bg-green-500 text-white'
                            type='submit'
                            disabled={processing}
                            variant='outline'
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditRoles

EditRoles.layout = {
    breadcrumbs: [
        {
            title: 'Roles',
            href: index(),
        },
        {
            title: 'Edit',
            href: '',
        },
    ],
};
