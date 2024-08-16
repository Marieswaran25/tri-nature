import './home.scss';

import Bottle from '@assets/images/bottle.png';
import { NavBar } from '@components/Navbar';
import { ProductCard } from '@components/ProductCard';
import { View } from '@components/View';

export default function Home() {
    return (
        <>
            <NavBar />

            <View className="product-list">
                {Array.from({ length: 4 }).map((_, i) => (
                    <ProductCard key={i} productName={'Air Pods'} productDescription={'A best and clean quality air pods from boat.'} productImage={Bottle} productPrice={10} />
                ))}
            </View>
        </>
    );
}
