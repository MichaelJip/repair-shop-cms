import UserForm, { UserFormProps } from '@/components/user-form';
import { index } from '@/routes/users';
import { Head } from '@inertiajs/react';

const EditUser = (props: UserFormProps) => (
    <>
        <Head title="Edit User" />
        <UserForm {...props} />
    </>
);

export default EditUser;

EditUser.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: index(),
        },
        {
            title: 'Edit',
            href: '',
        },
    ],
};
