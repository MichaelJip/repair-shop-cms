import { statusLabels } from '@/components/booking-form';
import { Button } from '@/components/ui/button';
import { edit, index } from '@/routes/bookings';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, SquarePen } from 'lucide-react';
import React from 'react';

type Props = {
    booking: {
        id: number;
        queue_number: number;
        booking_date: string;
        status: string;
        customer: { id: number; name: string } | null;
        mechanic: { id: number; name: string } | null;
        promo: { id: number; code: string } | null;
        vehicle: {
            id: number;
            plate_number: string;
            vehicle_model: { id: number; brand: string } | null;
        } | null;
    };
};

const Detail = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => (
    <div className="flex flex-col gap-1 border-b py-3 sm:flex-row sm:gap-4">
        <dt className="w-40 shrink-0 text-sm text-muted-foreground">
            {label}
        </dt>
        <dd className="font-medium">{children}</dd>
    </div>
);

const ShowBooking = ({ booking }: Props) => (
    <>
        <Head title={`Booking #${booking.id}`} />
        <div className="mx-4 my-4">
            <div className="flex flex-row items-center justify-between">
                <Link href={index()} className="flex flex-row gap-4">
                    <ArrowLeft />
                    Back
                </Link>
                <Button
                    asChild
                    variant="outline"
                    className="bg-yellow-500 text-white"
                >
                    <Link href={edit(booking.id)}>
                        <SquarePen />
                        Edit
                    </Link>
                </Button>
            </div>

            <dl className="mt-4 max-w-2xl">
                <Detail label="Queue Number">#{booking.queue_number}</Detail>
                <Detail label="Booking Date">{booking.booking_date}</Detail>
                <Detail label="Status">
                    {statusLabels[booking.status] ?? booking.status}
                </Detail>
                <Detail label="Customer">{booking.customer?.name ?? '-'}</Detail>
                <Detail label="Vehicle">
                    {booking.vehicle
                        ? `${booking.vehicle.vehicle_model?.brand ?? '-'} (${booking.vehicle.plate_number})`
                        : '-'}
                </Detail>
                <Detail label="Mechanic">{booking.mechanic?.name ?? '-'}</Detail>
                <Detail label="Promo">{booking.promo?.code ?? '-'}</Detail>
            </dl>
        </div>
    </>
);

export default ShowBooking;

ShowBooking.layout = {
    breadcrumbs: [
        {
            title: 'Bookings',
            href: index(),
        },
        {
            title: 'Detail',
            href: '',
        },
    ],
};
