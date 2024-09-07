import './loader.scss';
import colors from '@theme/colors.module.scss';

import React from 'react';

type LoaderProps = {
    borderTopColor?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    outline?: string;
};

export const Loader: React.FC<LoaderProps> = ({ borderTopColor = colors.LightCeruleanBlue, children, style, outline }) => {
    return (
        <div className="loader-wrapper">
            <div className="loader" style={{ borderTopColor: borderTopColor, ...style, borderBottomColor: outline, borderLeftColor: outline, borderRightColor: outline }}></div>
            {children}
        </div>
    );
};
