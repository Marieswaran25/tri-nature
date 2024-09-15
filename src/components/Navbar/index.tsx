import './navbar.scss';
import colors from '@theme/colors.module.scss';

import React from 'react';
import Cart from '@assets/images/cart.svg';
import Google from '@assets/images/google.svg';
import { Button } from '@components/Button';
import Typography from '@components/Typography';
import { UserButton } from '@components/UserButton';
import { View } from '@components/View';
import { auth, signIn, signOut } from '@customAuth/*';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { APP_NAME } from 'src/config';
import { prismaInstance } from 'src/lib/prisma';
import { ROUTES } from 'src/routes';

import { NavbarMobile } from './navbarMobile';

export const NavBar = async () => {
    let cart = [];
    let session;
    try {
        cart = await prismaInstance.cartLineItem.findMany({
            where: {
                cartId: cookies().get('cartId')?.value,
            },
        });
        session = await auth();
    } catch (error) {}

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
                            <Typography type={'caption'} weight={'light'} text={`${cart?.length || 0}`} color={'white'} as="small" />
                        </Link>

                        {session?.user ? (
                            <UserButton
                                user={session?.user}
                                signOut={async () => {
                                    'use server';
                                    await signOut();
                                }}
                            />
                        ) : (
                            <form
                                action={async () => {
                                    'use server';
                                    await signIn('google');
                                }}
                            >
                                <Button
                                    label={<Typography type="p2" weight="semibold" text={'Login with Google'} color="black" />}
                                    buttonType="primary"
                                    backgroundColor={'white'}
                                    id="login-btn"
                                    type="submit"
                                    leftIcon={Google}
                                    backgroundColorOnHover={colors.B0}
                                />
                            </form>
                        )}
                    </div>
                </View>
            </nav>
            <NavbarMobile
                user={session?.user}
                signIn={async () => {
                    'use server';
                    await signIn('google');
                }}
                signOut={async () => {
                    'use server';
                    await signOut();
                }}
            />
        </>
    );
};
