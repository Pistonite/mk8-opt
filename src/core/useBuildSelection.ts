import { useEffect, useState, useTransition } from "react";

export type BuildSelection<T> = {
    isPending: boolean;
    input: string;
    setInputValue: (value: string) => void;
    locked: boolean;
    setLocked: (value: boolean) => void;
    found: T[];
    unique: T | undefined;
}

export const useBuildSelection = <T extends string>(
    searchFn: (term: string) => T[],
): BuildSelection<T> => {
    const [isPending, startTransition] = useTransition();

    const [input, setInputValue] = useState<string>("");
    const [locked, setLocked] = useState<boolean>(false);
    const [found, setSearchResult] = useState<T[]>([]);
    useEffect(() => {
        startTransition(() => {
            setSearchResult(searchFn(input));
        });
    }, [input, searchFn]);

    return {
        isPending,
        input,
        setInputValue,
        locked,
        setLocked,
        found,
        unique: found.length === 1 ? found[0] : undefined,
    };
}
