import DataTable, { Paginated } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { create, destroy, edit, index } from '@/routes/vehiclesModel';
import { Head, router } from '@inertiajs/react';
import { SquarePen, Trash } from 'lucide-react';
import React, { useState } from 'react';

type VehicleModel = { id: number; name: string, brand: string, type: string };

type Props = {
    vehiclesModels: Paginated<VehicleModel>;
    filters: { search?: string };
};

const VehicleModels = ({ vehiclesModels, filters }: Props) => {
    const [search, setSearch] = useState(filters.search ?? '');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(index(), { search }, { preserveState: true, replace: true });
    };
    return (
        <>
            <Head title="Vehicle Models" />
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
                        <Button
                            variant="outline"
                            type="submit"
                            className="dark:text-black dark:bg-white"
                        >
                            Search
                        </Button>
                        <Button
                            type='button'
                            variant="outline"
                            className="bg-green-500 text-white dark:bg-green-900 hover:dark:bg-green-800 hover:bg-green-400"
                            onClick={() => router.get(create())}
                        >
                            Create
                        </Button>
                    </div>
                </form>
                <DataTable
                    rows={vehiclesModels}
                    rowKey={(r) => r.id}
                    columns={[
                        {
                            header: 'ID',
                            className: 'border-r',
                            cell: (c) => c.id,
                        },
                        {
                            header: 'Brand',
                            className: 'border-r',
                            cell: (c) => c.brand,
                        },
                        {
                            header: 'Type',
                            className: 'border-r',
                            cell: (c) => c.type,
                        },
                        {
                            header: 'Action',
                            cell: (c) => (
                                <div className="flex flex-row gap-4">
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
                                            if (confirm(`Delete "${c.name}"`)) {
                                                router.delete(
                                                    destroy(c.id).url,
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
            </div >
        </>
    );
};

export default VehicleModels;

VehicleModels.layout = {
    breadcrumbs: [
        {
            title: 'Vehicles Model',
            href: index(),
        },
    ],
};
