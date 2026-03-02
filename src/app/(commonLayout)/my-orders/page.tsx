import CheckoutForm from '@/components/modules/orders/CheckoutForm';
import OrderHistory from '@/components/modules/orders/OrderHistory';
import React from 'react';

const MyOrdersPage = () => {
    return (
        <div>
            {/* <CheckoutForm /> */}
            <OrderHistory />
        </div>
    );
};

export default MyOrdersPage;