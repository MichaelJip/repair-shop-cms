import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index, store } from '@/routes/customers';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import Select from 'react-select';
import { toast } from 'sonner';

type Props = {
    users: { id: number; name: string }[];
};

const CreateCustomer = ({ users }: Props) => {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        name: '',
        phone: '',
    });

    const options = users.map((item) => ({ value: item.id, label: item.name }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store().url);
        toast.success('Success create customer');
    };

    return (
        <>
            <Head title="Create" />
            <div className="mx-4 my-4">
                <Link href={index()} className="flex flex-row gap-4">
                    <ArrowLeft />
                    Back
                </Link>

                <form onSubmit={submit} className="mt-4 w-full space-y-4">
                    <div className="space-y-2 flex flex-col gap-1">
                        <Label htmlFor="user_id">User</Label>
                        <Select
                            inputId="user_id"
                            options={options}
                            value={
                                options.find(
                                    (option) =>
                                        option.value === Number(data.user_id),
                                ) ?? null
                            }
                            onChange={(option) =>
                                setData(
                                    'user_id',
                                    option ? String(option.value) : '',
                                )
                            }
                        />
                        <InputError message={errors.user_id} />
                    </div>
                    <div className="space-y-2 flex flex-col gap-1">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} />
                    </div>
                    <div className="space-y-2 flex flex-col gap-1">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                        <InputError message={errors.phone} />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            className="bg-green-500 text-white"
                            type="submit"
                            disabled={processing}
                            variant="outline"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CreateCustomer;

CreateCustomer.layout = {
    breadcrumbs: [
        {
            title: 'Customers',
            href: index(),
        },
        {
            title: 'Create',
            href: '',
        },
    ],
};
