import './customInput.scss';

import React, { forwardRef } from 'react';
import Info from '@assets/images/info.svg';
import EyeClose from '@assets/images/library/eyeClose.svg';
import EyeOpen from '@assets/images/library/eyeOpen.svg';
import { FallbackLine } from '@components/FallbackLine';
import Tooltip from '@components/Tooltip/tooltip';
import Typography from '@components/Typography';
import { stylize } from '@function/stylize';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement> {
    label: string;
    error?: string;
    loading?: boolean;
    as?: 'input' | 'textarea';
    groupClass?: string;
    labelStyle?: React.CSSProperties;
    info?: string;
    isRequired?: boolean;
    hasEye?: boolean;
}

const CustomInput = forwardRef((props: InputProps, ref: React.LegacyRef<HTMLInputElement & HTMLTextAreaElement>) => {
    const { label, type, as: Element = 'input', loading, defaultValue, isRequired, readOnly, onClick, error, className, hasEye, labelStyle, groupClass, info, ...otherProps } = props;
    const [originalType, setOriginalType] = React.useState(type);
    return (
        <div className="form-group-wrapper">
            <div className={`form-group ${groupClass || ''}`}>
                {label && (
                    <div className="info-wrapper">
                        <Typography
                            type="p2"
                            weight="semibold"
                            text={stylize(label) as string}
                            as="strong"
                            className={` p2 typography semibold custom-label ${isRequired ? 'required' : ''}`}
                            style={labelStyle}
                        />
                        {info && (
                            <Tooltip infoText={info}>
                                <Info className="info" />
                            </Tooltip>
                        )}
                    </div>
                )}
                {!loading ? (
                    <Element
                        ref={ref}
                        type={originalType}
                        defaultValue={defaultValue}
                        readOnly={readOnly}
                        onClick={onClick}
                        className={`custom-input ${className || ''}`}
                        {...otherProps}
                        onKeyUp={
                            Element === 'textarea'
                                ? element => {
                                      element.currentTarget.style.height = element.currentTarget.scrollHeight + 'px';
                                  }
                                : () => {}
                        }
                        onFocusCapture={
                            Element === 'textarea'
                                ? element => {
                                      element.currentTarget.style.height = element.currentTarget.scrollHeight + 'px';
                                  }
                                : () => {}
                        }
                    />
                ) : (
                    <FallbackLine className={''} containerStyle={{}} lineStyle={{ width: '100%', height: '40px', borderRadius: '5px' }} />
                )}
                {hasEye && <div className="eye">{originalType === 'password' ? <EyeClose onClick={() => setOriginalType('text')} /> : <EyeOpen onClick={() => setOriginalType('password')} />}</div>}
            </div>
            {error && <Typography type="p3" weight="regular" text={error} as="small" id="error-message" color="red" />}
        </div>
    );
});
CustomInput.displayName = 'CustomInput';

export default CustomInput;
