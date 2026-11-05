import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index, update } from '@/routes/customers';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import Select from 'react-select';
import { toast } from 'sonner';

type Props = {
    customer: { id: number; user_id: number; name: string; phone: string };
    users: { id: number; name: string }[];
};

const EditCustomer = ({ customer, users }: Props) => {
    const { data, setData, put, processing, errors } = useForm({
        user_id: customer.user_id,
        name: customer.name,
        phone: customer.phone,
    });

    const options = users.map((item) => ({ value: item.id, label: item.name }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update(customer.id).url);
        toast.success('Success edit customer');
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
                                setData('user_id', option ? option.value : 0)
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
                            type="number"
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

export default EditCustomer;

EditCustomer.layout = {
    breadcrumbs: [
        {
            title: 'Customers',
            href: index(),
        },
        {
            title: 'Edit',
            href: '',
        },
    ],
};
