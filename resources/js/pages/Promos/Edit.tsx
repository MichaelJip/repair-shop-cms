import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index, update } from '@/routes/promos';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import Select from 'react-select';
import { toast } from 'sonner';

type Props = {
    promo: {
        id: number;
        code: string;
        discount_type: string;
        value: string;
        stock: string;
    };
};

const EditPromo = ({ promo }: Props) => {
    const { data, setData, patch, processing, errors } = useForm({
        code: promo.code,
        discount_type: promo.discount_type,
        value: promo.value,
        stock: promo.stock,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(update(promo.id).url);
        toast.success('Success edit promo');
    };

    const options = [
        {
            value: 'percentage',
            label: 'Percentage',
        },
        {
            value: 'nominal',
            label: 'Nominal',
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
                        <Label htmlFor="code">Code</Label>
                        <Input
                            id="code"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                        />
                        <InputError message={errors.code} />
                    </div>

                    <div className="space-y-2 flex flex-col gap-1">
                        <Label htmlFor="discount_type">Discount Type</Label>
                        <Select
                            inputId="discount_type"
                            options={options}
                            value={
                                options.find(
                                    (option) =>
                                        option.value === data.discount_type,
                                ) ?? null
                            }
                            onChange={(option) =>
                                setData(
                                    'discount_type',
                                    option ? option.value : '',
                                )
                            }
                        />
                        <InputError message={errors.discount_type} />
                    </div>

                    <div className="space-y-2 flex flex-col gap-1">
                        <Label htmlFor="value">Value</Label>
                        <Input
                            id="value"
                            type="number"
                            min={0}
                            max={
                                data.discount_type === 'percentage'
                                    ? 100
                                    : undefined
                            }
                            value={data.value}
                            onChange={(e) => setData('value', e.target.value)}
                        />
                        <InputError message={errors.value} />
                    </div>

                    <div className="space-y-2 flex flex-col gap-1">
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                            id="stock"
                            type="number"
                            value={data.stock}
                            onChange={(e) => setData('stock', e.target.value)}
                        />
                        <InputError message={errors.stock} />
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

export default EditPromo;

EditPromo.layout = {
    breadcrumbs: [
        {
            title: 'Promos',
            href: index(),
        },
        {
            title: 'Edit',
            href: '',
        },
    ],
};
