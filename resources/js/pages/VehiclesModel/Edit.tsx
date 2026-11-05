import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index, update } from '@/routes/vehiclesModel';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import Select from 'react-select';

type Props = {
    vehiclesModel: { id: number; brand: string; type: string };
};

const EditVehicleModels = ({ vehiclesModel }: Props) => {
    const { data, setData, patch, processing, errors } = useForm({
        brand: vehiclesModel.brand,
        type: vehiclesModel.type,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(update(vehiclesModel.id).url);
        toast.success('Success edit vehicle model');
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
            <Head title="Edit" />
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
                                    (option) =>
                                        option.value ===
                                        data.type,
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

export default EditVehicleModels;

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
