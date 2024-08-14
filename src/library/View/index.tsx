import './view.scss';

import React, { CSSProperties, ElementType, ReactNode } from 'react';

interface ViewProps {
    children: ReactNode;
    className?: string;
    id?: string;
    style?: CSSProperties;
    as?: ElementType;
}

export const View: React.FC<ViewProps> = ({ children, className, id, style, as: Element = 'div' }) => {
    return (
        <Element id={id} className={`view-wrapper ${className ?? ''} index`} style={style}>
            {children}
        </Element>
    );
};
