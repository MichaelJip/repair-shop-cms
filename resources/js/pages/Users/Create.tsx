import UserForm, { UserFormProps } from '@/components/user-form';
import { index } from '@/routes/users';
import { Head } from '@inertiajs/react';

const CreateUser = (props: Omit<UserFormProps, 'user'>) => (
    <>
        <Head title="Create User" />
        <UserForm {...props} />
    </>
);

export default CreateUser;

CreateUser.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: index(),
        },
        {
            title: 'Create',
            href: '',
        },
    ],
};
