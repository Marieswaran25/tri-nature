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

export const billingSchema = yup.object({
    mobile: yup
        .string()
        .required('Mobile number is required')
        .matches(/^[0-9]{10}$/, 'Mobile number is not valid'),
    addressLine1: yup.string().required('Address line 1 is required'),
    addressLine2: yup.string().required('Address line 2 is required'),
    city: yup
        .string()
        .matches(/^[a-zA-Z\s]*$/, 'City name is not valid')
        .required('City is required'),
    district: yup.string().required('District is required'),
    pinCode: yup
        .string()
        .required('Pin code is required')
        .matches(/^[0-9]{6}$/, 'Pin code is not valid'),
    referredBy: yup.string().notRequired(),
});
