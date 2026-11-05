import DataTable, { Paginated } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { create, destroy, edit, index } from '@/routes/users';
import { Head, router } from '@inertiajs/react';
import { SquarePen, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    role: { id: number; name: string } | null;
};

type Props = {
    users: Paginated<User>;
    filters: { search?: string };
};

const Users = ({ users, filters }: Props) => {
    const [search, setSearch] = useState(filters.search ?? '');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(index(), { search }, { preserveState: true, replace: true });
    };

    return (
        <>
            <Head title="Users" />
            <div className="mx-4 my-4">
                <form onSubmit={submit}>
                    <div className="flex flex-row gap-4">
                        <Input
                            type="search"
                            placeholder="Search name or email..."
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
                    rows={users}
                    rowKey={(r) => r.id}
                    columns={[
                        {
                            header: 'ID',
                            className: 'border-r',
                            cell: (u) => u.id,
                        },
                        {
                            header: 'Name',
                            className: 'border-r',
                            cell: (u) => u.name,
                        },
                        {
                            header: 'Email',
                            className: 'border-r',
                            cell: (u) => u.email,
                        },
                        {
                            header: 'Role',
                            className: 'border-r',
                            cell: (u) => u.role?.name ?? '-',
                        },
                        {
                            header: 'Verified',
                            className: 'border-r',
                            cell: (u) => (u.email_verified_at ? 'Yes' : 'No'),
                        },
                        {
                            header: 'Action',
                            cell: (u) => (
                                <div className="flex flex-row gap-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => router.get(edit(u.id))}
                                        className={'bg-yellow-500 text-white'}
                                    >
                                        <SquarePen />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className={'bg-red-500 text-white'}
                                        onClick={() => {
                                            if (confirm(`Delete "${u.name}"`)) {
                                                router.delete(destroy(u.id).url, {
                                                    onSuccess: () =>
                                                        toast.success(
                                                            'Success delete user',
                                                        ),
                                                });
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
    );
};

export default Users;

Users.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: index(),
        },
    ],
};
