import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index, store } from '@/routes/vehiclesModel';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import Select from 'react-select';

const VehicleModelCreate = () => {
    const { data, setData, post, processing, errors } = useForm({
        brand: '',
        type: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store().url);
        toast.success('Success create vehicle model');
    };

    const options = [
        {
            value: 'car',
            label: 'Car',
        },
        {
            value: 'motorcycle',
            label: 'Motorcycle',
        },
    ];

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
                        <Label htmlFor="name">Brand</Label>
                        <Input
                            id="brand"
                            value={data.brand}
                            onChange={(e) => setData('brand', e.target.value)}
                        />
                        <InputError message={errors.brand} />
                    </div>
                    <div className="space-y-2 flex flex-col gap-1">
                        <Label htmlFor="type">Type</Label>
                        <Select
                            inputId="type"
                            options={options}
                            value={
                                options.find(
                                    (option) => option.value === data.type,
                                ) ?? null
                            }
                            onChange={(option) =>
                                setData('type', option ? option.value : '')
                            }
                        />
                        <InputError message={errors.type} />
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

export default VehicleModelCreate;

VehicleModelCreate.layout = {
    breadcrumbs: [
        {
            title: 'Vehicle Models',
            href: index(),
        },
        {
            title: 'Create',
            href: '',
        },
    ],
};
