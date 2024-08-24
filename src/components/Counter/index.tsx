import './counter.scss';

import React from 'react';
import Typography from '@components/Typography';
// import colors from '@theme/colors.module.scss';

export type CounterProps = {
    count: number;
    increment: () => void;
    decrement: () => void;
    set: (value: number) => void;
    position: 'horizontal' | 'vertical';
    className?: string;
};

export const Counter: React.FC<CounterProps> = ({ count, increment, decrement, set, position = 'vertical', className }) => {
    return (
        <div className={`counter ${position} ${className || ''}`} data-testid="counter">
            <button onClick={decrement} type="button" className="increment">
                <Typography type="p2" text={'-'} weight={'semibold'} color="black" as="small" />
            </button>
            <div className="value-display">
                <input
                    type="tel"
                    value={count}
                    onChange={e => {
                        set(Number(parseInt(e.currentTarget.value) || 0));
                    }}
                    maxLength={2}
                    minLength={1}
                />
            </div>
            <button onClick={increment} type="button" className="decrement">
                <Typography type="p2" text={'+'} weight={'semibold'} color="black" as="small" />
            </button>
        </div>
    );
};
