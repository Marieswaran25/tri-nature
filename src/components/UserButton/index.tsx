'use client';
import './userButton.scss';

import React from 'react';
import SignOut from '@assets/images/signOut.svg';
import { Button } from '@components/Button';
import Typography from '@components/Typography';
import { useCustomSelect } from '@hooks/use-custom-select';
import Image from 'next/image';

type UserButtonProps = {
    user: {
        id?: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
    signOut: () => void;
};

export const UserButton: React.FC<UserButtonProps> = ({ user, signOut }) => {
    const [openSettings, setOpenSettings, ref] = useCustomSelect(false);
    return (
        <div className="user-btn-wrapper" ref={ref}>
            <div className="user-button">
                {user?.image ? (
                    <Image src={user.image} alt={user.name || 'user-image'} width={40} height={40} className="user-image" onClick={() => setOpenSettings(!openSettings)} />
                ) : user.name ? (
                    <Typography type="p1" text={user.name.charAt(0).toUpperCase()} as="p" weight={'semibold'} onClick={() => setOpenSettings(!openSettings)} />
                ) : (
                    <></>
                )}
            </div>

            <div className={`user-settings ${openSettings ? 'open' : ''}`}>
                <Typography type="p3" text={user?.name || ''} as="p" weight={'regular'} />
                <Button label={'Sign Out'} leftIcon={SignOut} onClick={() => signOut()} />
            </div>
        </div>
    );
};
