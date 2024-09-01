import { Cart } from '@components/Cart';

export default async function YourCart() {
    return (
        <div className="your-cart-page" style={{ marginTop: '90px' }}>
            <Cart />
        </div>
    );
}
