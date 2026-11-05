import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index, store, update } from '@/routes/bookings';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import Select from 'react-select';
import { toast } from 'sonner';

export type NamedOption = { id: number; name: string };

export type BookingFormProps = {
    booking?: {
        id: number;
        customer_id: number | null;
        vehicle_id: number | null;
        mechanic_id: number | null;
        promo_id: number | null;
        booking_date: string;
        status: string;
    };
    customers: NamedOption[];
    mechanics: NamedOption[];
    promos: { id: number; code: string }[];
    vehicles: {
        id: number;
        plate_number: string;
        vehicle_model: { id: number; brand: string } | null;
    }[];
};

export const statusLabels: Record<string, string> = {
    waiting: 'Waiting',
    in_service: 'In Service',
    finished: 'Finished',
    cancelled: 'Cancelled',
};

type Option = { value: number | string; label: string };

type SelectFieldProps = {
    id: string;
    label: string;
    options: Option[];
    value: number | string | null;
    onChange: (value: number | string | null) => void;
    error?: string;
    isClearable?: boolean;
};

const SelectField = ({
    id,
    label,
    options,
    value,
    onChange,
    error,
    isClearable = true,
}: SelectFieldProps) => (
    <div className="flex flex-col gap-1 space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Select
            inputId={id}
            isClearable={isClearable}
            options={options}
            value={options.find((option) => option.value === value) ?? null}
            onChange={(option) => onChange(option?.value ?? null)}
        />
        <InputError message={error} />
    </div>
);

const BookingForm = ({
    booking,
    customers,
    mechanics,
    promos,
    vehicles,
}: BookingFormProps) => {
    const { data, setData, post, put, processing, errors } = useForm<{
        customer_id: number | null;
        vehicle_id: number | null;
        mechanic_id: number | null;
        promo_id: number | null;
        booking_date: string;
        status: string;
    }>({
        customer_id: booking?.customer_id ?? null,
        vehicle_id: booking?.vehicle_id ?? null,
        mechanic_id: booking?.mechanic_id ?? null,
        promo_id: booking?.promo_id ?? null,
        booking_date: booking?.booking_date ?? new Date().toLocaleDateString('en-CA'),
        status: booking?.status ?? 'waiting',
    });

    const customerOptions = customers.map((item) => ({
        value: item.id,
        label: item.name,
    }));
    const mechanicOptions = mechanics.map((item) => ({
        value: item.id,
        label: item.name,
    }));
    const promoOptions = promos.map((item) => ({
        value: item.id,
        label: item.code,
    }));
    const vehicleOptions = vehicles.map((item) => ({
        value: item.id,
        label: `${item.vehicle_model?.brand ?? '-'} (${item.plate_number})`,
    }));
    const statusOptions = Object.entries(statusLabels).map(
        ([value, label]) => ({ value, label }),
    );

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (booking) {
            put(update(booking.id).url, {
                onSuccess: () => toast.success('Success edit booking'),
            });
            return;
        }

        post(store().url, {
            onSuccess: () => toast.success('Success create booking'),
        });
    };

    return (
        <div className="mx-4 my-4">
            <Link href={index()} className="flex flex-row gap-4">
                <ArrowLeft />
                Back
            </Link>

            <form onSubmit={submit} className="mt-4 w-full space-y-4">
                <SelectField
                    id="customer_id"
                    label="Customer"
                    options={customerOptions}
                    value={data.customer_id}
                    onChange={(value) =>
                        setData('customer_id', value as number | null)
                    }
                    error={errors.customer_id}
                />
                <SelectField
                    id="vehicle_id"
                    label="Vehicle"
                    options={vehicleOptions}
                    value={data.vehicle_id}
                    onChange={(value) =>
                        setData('vehicle_id', value as number | null)
                    }
                    error={errors.vehicle_id}
                />
                <SelectField
                    id="mechanic_id"
                    label="Mechanic"
                    options={mechanicOptions}
                    value={data.mechanic_id}
                    onChange={(value) =>
                        setData('mechanic_id', value as number | null)
                    }
                    error={errors.mechanic_id}
                />
                <SelectField
                    id="promo_id"
                    label="Promo"
                    options={promoOptions}
                    value={data.promo_id}
                    onChange={(value) =>
                        setData('promo_id', value as number | null)
                    }
                    error={errors.promo_id}
                />
                <div className="flex flex-col gap-1 space-y-2">
                    <Label htmlFor="booking_date">Booking Date</Label>
                    <Input
                        id="booking_date"
                        type="date"
                        value={data.booking_date}
                        onChange={(e) => setData('booking_date', e.target.value)}
                    />
                    <InputError message={errors.booking_date} />
                </div>
                <SelectField
                    id="status"
                    label="Status"
                    options={statusOptions}
                    value={data.status}
                    onChange={(value) => setData('status', String(value))}
                    error={errors.status}
                    isClearable={false}
                />
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
    );
};

export default BookingForm;
