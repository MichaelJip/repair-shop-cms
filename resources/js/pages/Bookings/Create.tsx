import BookingForm, { BookingFormProps } from '@/components/booking-form';
import { index } from '@/routes/bookings';
import { Head } from '@inertiajs/react';

const CreateBooking = (props: Omit<BookingFormProps, 'booking'>) => (
    <>
        <Head title="Create Booking" />
        <BookingForm {...props} />
    </>
);

export default CreateBooking;

CreateBooking.layout = {
    breadcrumbs: [
        {
            title: 'Bookings',
            href: index(),
        },
        {
            title: 'Create',
            href: '',
        },
    ],
};
