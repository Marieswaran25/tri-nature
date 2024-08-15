import React, { useCallback } from 'react';

export function useToggle<T extends any>(initialState: T) {
    const [toggle, setToggle] = React.useState<any>(initialState);

    const ref = React.useRef<HTMLDivElement>(null);

    const switchToggle = () => {
        setToggle(!toggle);
    };

    const selectMultipleList = useCallback(
        (index: number) => {
            if (typeof index === 'number') {
                if (toggle === index) {
                    return setToggle(null);
                }
                setToggle(index);
            } else {
                setToggle(!toggle);
            }
        },
        [toggle, setToggle],
    );

    React.useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
                setToggle(null);
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    });

    return { toggle, switchToggle, ref, selectMultipleList, setToggle };
}
