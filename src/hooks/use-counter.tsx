'use client';

import { useState } from 'react';

export interface UseCounterReturn {
    count: number;
    increment: () => void;
    decrement: () => void;
    set: (value: number) => void;
    reset: () => void;
}

export function useCounter(min = 0, max?: number): UseCounterReturn {
    const [count, setCount] = useState<number>(min);

    const increment = () => {
        setCount(prev => {
            if (typeof max === 'number' && prev >= max) {
                return max;
            }
            return prev + 1;
        });
    };

    const decrement = () => {
        setCount(prev => {
            if (prev <= min) {
                return min;
            }
            return prev - 1;
        });
    };

    const reset = () => {
        setCount(min);
    };

    const set = (value: number) => {
        setCount(value);
    };

    return {
        count,
        increment,
        decrement,
        set,
        reset,
    };
}
