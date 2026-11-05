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
    vehicle: {
        id: number;
        customer_id: number;
        vehicle_model_id: number;
        plate_number: string;
    };
    customers: { id: number; name: string }[];
    vehicleModels: { id: number; brand: string }[];
};

const EditVehicle = ({ vehicle, customers, vehicleModels }: Props) => {
    const { data, setData, put, processing, errors } = useForm({
        customer_id: vehicle.customer_id,
        vehicle_model_id: vehicle.vehicle_model_id,
        plate_number: vehicle.plate_number,
    });

    const customersOptions = customers.map((item) => ({
        value: item.id,
        label: item.name,
    }));
    const vehicleModelOptions = vehicleModels.map((item) => ({
        value: item.id,
        label: item.brand,
    }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update(vehicle.id).url);
        toast.success('Success edit vehicle');
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
                        <Label htmlFor="customer_id">Customer</Label>
                        <Select
                            inputId="customer_id"
                            options={customersOptions}
                            value={
                                customersOptions.find(
                                    (option) =>
                                        option.value ===
                                        Number(data.customer_id),
                                ) ?? null
                            }
                            onChange={(option) =>
                                setData(
                                    'customer_id',
                                    option ? option.value : 0,
                                )
                            }
                        />
                        <InputError message={errors.customer_id} />
                    </div>
                    <div className="space-y-2 flex flex-col gap-1">
                        <Label htmlFor="vehicle_model_id">Vehicle Model</Label>
                        <Select
                            inputId="vehicle_model_id"
                            options={vehicleModelOptions}
                            value={
                                vehicleModelOptions.find(
                                    (option) =>
                                        option.value ===
                                        Number(data.vehicle_model_id),
                                ) ?? null
                            }
                            onChange={(option) =>
                                setData(
                                    'vehicle_model_id',
                                    option ? option.value : 0,
                                )
                            }
                        />
                        <InputError message={errors.customer_id} />
                    </div>
                    <div className="space-y-2 flex flex-col gap-1">
                        <Label htmlFor="plate_number">Plate Number</Label>
                        <Input
                            id="plate_number"
                            value={data.plate_number}
                            onChange={(e) =>
                                setData('plate_number', e.target.value)
                            }
                        />
                        <InputError message={errors.plate_number} />
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

export default EditVehicle;

EditVehicle.layout = {
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
