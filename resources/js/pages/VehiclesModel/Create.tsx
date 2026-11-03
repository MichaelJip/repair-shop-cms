import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index, store } from '@/routes/vehiclesModel';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const VehicleModelCreate = () => {
    const { data, setData, post, processing, errors } = useForm({
        brand: '',
        type: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store().url);
        toast.success('Success create vehicle model')
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
