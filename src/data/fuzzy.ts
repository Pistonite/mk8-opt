import Fuse from "fuse.js";

export const fuzzySearch = <N extends string, T extends string>(term: string, fuse: Fuse<N>, items: readonly T[]): T[] => {
    const results = fuse.search(term).map((result) => result.item);

    let exactItem: N | undefined = undefined;
    for (let i = 0; i < results.length; i++) {
        const found = results[i];
        if (found.toLowerCase() === term.toLowerCase()) {
            exactItem = found;
            break;
        }
    }

    const filteredResults = exactItem ? [exactItem] : results;
    return items.filter(item => {
        return filteredResults.some(result => item.includes(result));
    });
}

export const FuseOptions = {
    threshold: 0.3,
}
