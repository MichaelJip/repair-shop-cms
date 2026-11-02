import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import React from 'react';

export type PaginatorLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type Paginated<T> = {
    data: T[];
    links: PaginatorLink[];
};

export type Column<T> = {
    header: string;
    cell: (row: T) => React.ReactNode;
    className?: string;
};

type Props<T> = {
    columns: Column<T>[];
    rows: Paginated<T>;
    rowKey: (row: T) => string | number;
};

export default function DataTable<T>({ columns, rows, rowKey }: Props<T>) {
    const goTo = (e: React.MouseEvent, url: string | null) => {
        e.preventDefault();
        if (url)
            router.get(url, {}, { preserveScroll: true, preserveState: true });
    };

    const prev = rows.links[0];
    const next = rows.links[rows.links.length - 1];
    const pages = rows.links.slice(1, -1);

    return (
        <>
            <Table className="my-2 text-black rounded-md border">
                <TableHeader>
                    <TableRow>
                        {columns.map((col, i) => (
                            <TableHead key={i} className={cn(col.className)}>
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.data.map((row) => (
                        <TableRow key={rowKey(row)}>
                            {columns.map((col, i) => (
                                <TableCell
                                    key={i}
                                    className={cn(
                                        col.className,
                                        'dark:text-white',
                                    )}
                                >
                                    {col.cell(row)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {pages.length > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href={prev.url ?? '#'}
                                onClick={(e) => goTo(e, prev.url)}
                                className={
                                    !prev.url
                                        ? 'pointer-events-none opacity-50'
                                        : ''
                                }
                            />
                        </PaginationItem>

                        {pages.map((p, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href={p.url ?? '#'}
                                    isActive={p.active}
                                    onClick={(e) => goTo(e, p.url)}
                                >
                                    {p.label}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href={next.url ?? '#'}
                                onClick={(e) => goTo(e, next.url)}
                                className={
                                    !next.url
                                        ? 'pointer-events-none opacity-50'
                                        : ''
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
}
