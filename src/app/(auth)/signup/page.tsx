import './signUp.scss';

import { SignUpForm } from '@components/SignUpForm';
import { View } from '@components/View';
export default function SignUp() {
    return (
        <View className="sign-up-page" as="main">
            <SignUpForm />
        </View>
    );
}
