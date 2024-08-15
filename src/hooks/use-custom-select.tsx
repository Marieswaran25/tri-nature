import { useToggle } from './use-toggle';

export function useCustomSelect<T>(initialState: T) {
    const { toggle, setToggle, selectMultipleList, ref } = useToggle(initialState);
    return [toggle, setToggle, ref, selectMultipleList] as const;
}
