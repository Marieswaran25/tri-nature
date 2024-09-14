'use client';
import './paymentMode.scss';

import React from 'react';
import COD from '@assets/images/payment/cod.svg';
import Gpay from '@assets/images/payment/gpay.svg';
import PhonePay from '@assets/images/payment/phonepay.svg';
import CustomInput from '@components/CustomInput';
import Typography from '@components/Typography';
import { LocalStorage } from '@Customtypes/localStorage';
import { PaymentOptions } from '@Customtypes/payment';

export const PaymentMode = ({ isActive, onSuccess }: { isActive: boolean; onSuccess: () => void }) => {
    const [selectedPayment, setSelectedPayment] = React.useState<null | PaymentOptions>(null);

    const handlePaymentSelect = (value: PaymentOptions) => {
        setSelectedPayment(value);
        localStorage.setItem(LocalStorage.PREFERRED_PAYMENT_MODE, value);
        onSuccess();
    };

    React.useEffect(() => {
        const localPaymentMode = localStorage.getItem(LocalStorage.PREFERRED_PAYMENT_MODE);
        if (localPaymentMode) {
            setSelectedPayment(localPaymentMode as PaymentOptions);
            onSuccess();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`payment-mode ${isActive ? 'open' : ''}`}>
            <Typography type="p2" weight="light" text="Select your preferred payment mode" as="h3" />
            <form>
                <div className={`group cod ${selectedPayment === 'cod' ? 'active' : ''}`} onClick={() => handlePaymentSelect('cod')}>
                    <CustomInput label="" type="radio" name="cod" defaultValue={'cod'} checked={selectedPayment === 'cod'} />
                    <COD />
                    <Typography type={'p2'} weight={'semibold'} text={'Cash on Delivery (COD)'} />
                </div>
                <div className={`group g-pay ${selectedPayment === 'phone-pay' ? 'active' : ''}`} onClick={() => handlePaymentSelect('phone-pay')}>
                    <CustomInput label="" type="radio" name="phone-pay" defaultValue={'phone-pay'} checked={selectedPayment === 'phone-pay'} />
                    <PhonePay />
                    <Typography type={'p2'} weight={'semibold'} text={'Pay using Phone Pay'} />
                </div>
                <div className={`group phone-pay ${selectedPayment === 'g-pay' ? 'active' : ''}`} onClick={() => handlePaymentSelect('g-pay')}>
                    <CustomInput label="" type="radio" name="g-pay" defaultValue={'g-pay'} checked={selectedPayment === 'g-pay'} />
                    <Gpay />
                    <Typography type={'p2'} weight={'semibold'} text={'Pay using Google Pay'} />
                </div>
            </form>
            <Typography type="caption" weight="light" text="*Your Payment is safe and secure with us" as="p" color="gray" />
        </div>
    );
};
