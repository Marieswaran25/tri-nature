import { Checkout } from '@components/Checkout';
import { View } from '@components/View';
import { auth, signIn } from '@customAuth/*';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Checkout',
};
export default async function CheckoutPage() {
    const session = await auth();
    return (
        <View className="checkout-page" as="main" style={{ marginTop: '90px' }}>
            <Checkout
                user={session?.user}
                signIn={async () => {
                    'use server';
                    await signIn('google');
                }}
            />
        </View>
    );
}
