import './login.scss';

import { LoginForm } from '@components/LoginForm';
import { View } from '@components/View';
export default function LoginPage() {
    return (
        <View className="login-page" as="main">
            <LoginForm />
        </View>
    );
}
