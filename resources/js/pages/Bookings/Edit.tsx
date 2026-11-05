import BookingForm, { BookingFormProps } from '@/components/booking-form';
import { index } from '@/routes/bookings';
import { Head } from '@inertiajs/react';

const EditBooking = (props: BookingFormProps) => (
    <>
        <Head title="Edit Booking" />
        <BookingForm {...props} />
    </>
);

export default EditBooking;

EditBooking.layout = {
    breadcrumbs: [
        {
            title: 'Bookings',
            href: index(),
        },
        {
            title: 'Edit',
            href: '',
        },
    ],
};
