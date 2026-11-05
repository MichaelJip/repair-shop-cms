import DataTable, { Paginated } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { create, destroy, edit, index, show } from '@/routes/bookings';
import { Head, router } from '@inertiajs/react';
import { Eye, SquarePen, Trash } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from 'sonner';
import Select from 'react-select'


type Booking = {
    id: number;
    customer: {
        id: number;
        name: string
    };
    vehicle: {
        id: number;
        plate_number: string;
        vehicle_model: {
            id: number;
            brand: string
        } | null;
    }
    mechanic: {
        id: number;
        name: string
    }
    promo: {
        id: number;
        code: string
    } | null;
    booking_date: string;
    status: string;
};

type Customer = {
    id: number;
    name: string
}[]

type Mechanic = {
    id: number;
    name: string
}[]

type Props = {
    customers: Customer,
    mechanics: Mechanic,
    bookings: Paginated<Booking>;
    filters: { search?: string, mechanic_id?: number, customer_id?: number };
};

const Bookings = ({ bookings, filters, customers, mechanics }: Props) => {
    const [search, setSearch] = useState(filters.search ?? '');
    const [customerId, setCustomerId] = useState<number | null>(filters.customer_id ?? null);
    const [mechanicId, setMechanicId] = useState<number | null>(filters.mechanic_id ?? null);
    const optionsCustomers = customers.map((item) => ({ value: item.id, label: item.name }));
    const optionsMechanics = mechanics.map((item) => ({ value: item.id, label: item.name }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(index(), {
            search: search || undefined,
            customer_id: customerId ?? undefined,
            mechanic_id: mechanicId ?? undefined,
        }, { preserveState: true, replace: true });
    };
    return (
        <>
            <Head title='Bookings' />
            <div className="mx-4 my-4">
                <form onSubmit={submit}>
                    <div className="flex flex-row gap-4">
                        <Input
                            type="search"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="dark:bg-white dark:text-black"
                        />
                        <Select
                            isClearable
                            placeholder="Customer"
                            options={optionsCustomers}
                            value={optionsCustomers.find((o) => o.value === customerId) ?? null}
                            onChange={(option) => setCustomerId(option?.value ?? null)}
                        />
                        <Select
                            isClearable
                            placeholder="Mechanic"
                            options={optionsMechanics}
                            value={optionsMechanics.find((o) => o.value === mechanicId) ?? null}
                            onChange={(option) => setMechanicId(option?.value ?? null)}
                        />
                        <Button
                            variant="outline"
                            type="submit"
                            className="dark:text-black dark:bg-white"
                        >
                            Search
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="bg-green-500 text-white dark:bg-green-900 hover:dark:bg-green-800 hover:bg-green-400"
                            onClick={() => router.get(create())}
                        >
                            Create
                        </Button>
                    </div>
                </form>
                <DataTable
                    rows={bookings}
                    rowKey={(r) => r.id}
                    columns={[
                        {
                            header: 'ID',
                            className: 'border-r',
                            cell: (c) => c.id,
                        },
                        {
                            header: 'Customer',
                            className: 'border-r',
                            cell: (c) => c.customer.name ?? '-',
                        },
                        {
                            header: 'Mechanic',
                            className: 'border-r',
                            cell: (c) => c.mechanic.name ?? '-',
                        },
                        {
                            header: 'Promo',
                            className: 'border-r',
                            cell: (c) => c.promo?.code ?? '-',
                        },
                        {
                            header: 'Vehicle',
                            className: 'border-r',
                            cell: (c) => c.vehicle ? `${c.vehicle.vehicle_model?.brand ?? '-'} (${c.vehicle.plate_number})` : '-',
                        },
                        {
                            header: 'Date',
                            className: 'border-r',
                            cell: (c) => c.booking_date ?? '-',
                        }, {
                            header: 'Status',
                            className: 'border-r',
                            cell: (c) => c.status ?? '-',
                        },
                        {
                            header: 'Action',
                            cell: (c) => (
                                <div className="flex flex-row gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => router.get(show(c.id))}
                                    >
                                        <Eye />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => router.get(edit(c.id))}
                                        className={'bg-yellow-500 text-white'}
                                    >
                                        <SquarePen />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className={'bg-red-500 text-white'}
                                        onClick={() => {
                                            if (confirm(`Delete "${c.customer.name} - ${c.booking_date}"`)) {
                                                router.delete(
                                                    destroy(c.id).url,
                                                );
                                                toast.success(
                                                    'Success delete booking',
                                                );
                                            }
                                        }}
                                    >
                                        <Trash />
                                    </Button>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </>
    )
}

export default Bookings

Bookings.layout = {
    breadcrumbs: [
        {
            title: 'Bookings',
            href: index(),
        },
    ],
};
