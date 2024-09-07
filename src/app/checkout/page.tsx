import { Checkout } from '@components/Checkout';
import { View } from '@components/View';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Checkout',
};
export default async function CheckoutPage() {
    return (
        <View className="checkout-page" as="main">
            <Checkout />
        </View>
    );
}
