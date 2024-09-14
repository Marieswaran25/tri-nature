'use client';
import './userButtonMobile.scss';

import React from 'react';
import Dot from '@assets/images/threeDot.svg';
import Typography from '@components/Typography';
import { useCustomSelect } from '@hooks/use-custom-select';
import Image from 'next/image';

type UserButtonMobileProps = {
    user: {
        id?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
    signOut: () => void;
};

export const UserButtonMobile: React.FC<UserButtonMobileProps> = ({ user, signOut }) => {
    const [openSettings, setOpenSettings, ref] = useCustomSelect(false);
    return (
        <div className="user-mobile-btn-wrapper" ref={ref}>
            <div className="user-button">
                {user?.image ? (
                    <Image src={user.image} alt={user.name || 'user-image'} width={40} height={40} className="user-image" onClick={() => setOpenSettings(!openSettings)} />
                ) : user.name ? (
                    <Typography type="p1" text={user.name.charAt(0).toUpperCase()} as="p" weight={'semibold'} />
                ) : (
                    <></>
                )}
            </div>
            <Typography type="p3" text={user?.name || ''} as="p" weight={'regular'} />
            <Dot onClick={() => setOpenSettings(!openSettings)} />

            <div className={`user-settings ${openSettings ? 'open' : ''}`}>
                <Typography type="p3" text={'Sign Out'} as="p" weight={'regular'} onClick={() => signOut()} />
            </div>
        </div>
    );
};
