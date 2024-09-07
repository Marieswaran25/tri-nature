import './customSelect.scss';

import React, { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Typography from '@components/Typography';

interface CustomSelectProps {
    id: string;
    title: string;
    placeholder: string;
    error?: string;
    register: UseFormRegisterReturn;
    options: { value: string; label: string }[];
    isRequired?: boolean;
    defaultValue?: string;
    isValid?: boolean;
}

const CustomSelect = forwardRef<HTMLDivElement, CustomSelectProps>(({ id, title, placeholder, error, register, options, isRequired, defaultValue, isValid }, ref) => {
    return (
        <div className="custom-select-wrapper" ref={ref}>
            <div className={`custom-select ${error ? 'error' : ''}`}>
                <Typography type="p2" weight="semibold" text={title} className={`p2 typography semibold ${isRequired ? 'required' : ''}`} as="strong" />
                <select id={id} {...register} className="form-select" style={{ color: isValid ? 'black' : 'gray' }}>
                    <option value={defaultValue || ''} style={{ color: 'gray' }}>
                        {placeholder}
                    </option>
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {error && <Typography type="p3" weight="semibold" text={error} as="small" id="error-message" color="red" />}
        </div>
    );
});

CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;
