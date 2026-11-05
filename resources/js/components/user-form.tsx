import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { index, store, update } from '@/routes/users';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import React from 'react';
import Select from 'react-select';
import { toast } from 'sonner';

export type UserFormProps = {
    user?: {
        id: number;
        name: string;
        email: string;
        role_id: number | null;
    };
    roles: { id: number; name: string }[];
};

const UserForm = ({ user, roles }: UserFormProps) => {
    const { data, setData, post, put, processing, errors } = useForm<{
        name: string;
        email: string;
        role_id: number | null;
        password: string;
        password_confirmation: string;
    }>({
        name: user?.name ?? '',
        email: user?.email ?? '',
        role_id: user?.role_id ?? null,
        password: '',
        password_confirmation: '',
    });

    const roleOptions = roles.map((item) => ({
        value: item.id,
        label: item.name,
    }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (user) {
            put(update(user.id).url, {
                onSuccess: () => toast.success('Success edit user'),
            });
            return;
        }

        post(store().url, {
            onSuccess: () => toast.success('Success create user'),
        });
    };

    return (
        <div className="mx-4 my-4">
            <Link href={index()} className="flex flex-row gap-4">
                <ArrowLeft />
                Back
            </Link>

            <form onSubmit={submit} className="mt-4 w-full space-y-4">
                <div className="flex flex-col gap-1 space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    <InputError message={errors.name} />
                </div>
                <div className="flex flex-col gap-1 space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} />
                </div>
                <div className="flex flex-col gap-1 space-y-2">
                    <Label htmlFor="role_id">Role</Label>
                    <Select
                        inputId="role_id"
                        options={roleOptions}
                        value={
                            roleOptions.find(
                                (option) => option.value === data.role_id,
                            ) ?? null
                        }
                        onChange={(option) =>
                            setData('role_id', option?.value ?? null)
                        }
                    />
                    <InputError message={errors.role_id} />
                </div>
                <div className="flex flex-col gap-1 space-y-2">
                    <Label htmlFor="password">
                        Password{user ? ' (leave blank to keep current)' : ''}
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>
                <div className="flex flex-col gap-1 space-y-2">
                    <Label htmlFor="password_confirmation">
                        Confirm Password
                    </Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        autoComplete="new-password"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />
                    <InputError message={errors.password_confirmation} />
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
    );
};

export default UserForm;
