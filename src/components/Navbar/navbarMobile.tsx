'use client';

import colors from '@theme/colors.module.scss';

import React, { SetStateAction, useEffect, useState } from 'react';
import Cart from '@assets/images/cart.svg';
import Close from '@assets/images/close.svg';
import Logout from '@assets/images/logout.svg';
import Menu from '@assets/images/menu.svg';
import { Button } from '@components/Button';
import Typography from '@components/Typography';
import { UserButtonMobile } from '@components/UserButtonMobile';
import { useCart } from '@hooks/use-cart';
import { useCustomSelect } from '@hooks/use-custom-select';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { APP_NAME } from 'src/config';
import { ROUTES } from 'src/routes';
export const NavbarMobile = ({ user, signIn, signOut }: { user: any; signIn: () => Promise<void>; signOut: () => Promise<void> }) => {
    const [toggle, setToggle, ref] = useCustomSelect(false);
    const { cart } = useCart();
    const pathname = usePathname();

    useEffect(() => {
        setToggle(false);
    }, [pathname, setToggle]);
    return (
        <>
            <div className="nav-mobile-group">
                <nav className="navbar-mobile">
                    <div className="navbar-menu">
                        <div className="icon" onClick={() => setToggle(true)}>
                            <Menu />
                        </div>
                    </div>
                    <Link href={'/'}>
                        <Typography type={'p1'} weight={'light'} text={APP_NAME} color={colors.SS5} />
                    </Link>
                    <Link href={ROUTES.YOUR_CART} className="cart">
                        <Cart />
                        <Typography type={'caption'} weight={'light'} text={`${cart?.cartLineItems.length || 0}`} color={'white'} as="small" />
                    </Link>
                </nav>
                <div className={`nav-content ${toggle ? 'open' : ''}`} ref={ref}>
                    <div className="logo-wrapper">
                        <Link href={'/'}>
                            <Typography type={'p1'} weight={'light'} text={APP_NAME} color={colors.SS5} />
                        </Link>
                        <Close onClick={() => setToggle(false)} />
                    </div>
                    <Link href={ROUTES.ABOUT_US}>
                        <Typography type={'p2'} weight={'light'} text={'About Us'} color={'black'} />
                    </Link>
                    <Link href={ROUTES.OUR_PRODUCTS}>
                        <Typography type={'p2'} weight={'light'} text={'Our Products'} color={'black'} />
                    </Link>
                    {!user && (
                        <form
                            action={async () => {
                                await signIn();
                            }}
                        >
                            <Button label={<Typography type="p2" weight="semibold" text={'Login'} color="white" />} buttonType="primary" backgroundColor={colors.SS5} id="login-btn" type="submit" />
                        </form>
                    )}
                    {user && (
                        <UserButtonMobile
                            user={user}
                            signOut={async () => {
                                await signOut();
                            }}
                        />
                    )}
                </div>
            </div>
        </>
    );
};
