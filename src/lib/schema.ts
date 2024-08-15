import * as yup from 'yup';
export const signUpSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8, 'Password must be at least 8 characters').required(),
    username: yup.string().required(),
});

export const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
});
