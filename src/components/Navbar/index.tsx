import './navbar.scss';
import colors from '@theme/colors.module.scss';

import React from 'react';
import Cart from '@assets/images/cart.svg';
import { Button } from '@components/Button';
import Typography from '@components/Typography';
import { View } from '@components/View';
import Link from 'next/link';
import { APP_NAME } from 'src/config';
import { ROUTES } from 'src/routes';

import { NavbarMobile } from './navbarMobile';

export const NavBar = () => {
    return (
        <>
            <nav className="nav-bar">
                <View className="nav-bar-container">
                    <Link href={ROUTES.HOME}>
                        <Typography type={'p1'} weight={'light'} text={APP_NAME} color={colors.SS5} />
                    </Link>
                    <div className="menu">
                        <Link href={ROUTES.ABOUT_US}>
                            <Typography type={'p2'} weight={'light'} text={'About Us'} color={'black'} />
                        </Link>
                        <Link href={ROUTES.OUR_PRODUCTS}>
                            <Typography type={'p2'} weight={'light'} text={'Our Products'} color={'black'} />
                        </Link>
                        <Link href={ROUTES.YOUR_CART} className="cart">
                            <Cart />
                        </Link>
                        <Link href={ROUTES.LOGIN} className="button">
                            <Button label={<Typography type="p2" weight="semibold" text={'Login'} color="white" />} buttonType="primary" backgroundColor={colors.SS5} id="login-btn" type="button" />
                        </Link>
                    </div>
                </View>
            </nav>
            <NavbarMobile />
        </>
    );
};
