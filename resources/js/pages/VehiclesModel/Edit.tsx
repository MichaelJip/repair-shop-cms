import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index, update } from '@/routes/vehiclesModel';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react'

type Props = {
    vehicleModels: { id: number; brand: string, type: string };
};

const EditVehicleModels = ({ vehicleModels }: Props) => {
    const { data, setData, patch, processing, errors } = useForm({
        brand: vehicleModels.brand,
        type: vehicleModels.type,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(update(vehicleModels.id).url);
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
                        <Label htmlFor="name">Type</Label>
                        <Input
                            id="type"
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                        />
                        <InputError message={errors.type} />
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

export default EditVehicleModels

EditVehicleModels.layout = {
    breadcrumbs: [
        {
            title: 'Vehicle Models',
            href: index(),
        },
        {
            title: 'Edit',
            href: '',
        },
    ],
};
