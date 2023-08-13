import { useEffect, useState, useTransition } from "react";

import { Build, Characters, Gliders, Karts, Stat, StatKey, Tires, getBuildStat, hashStat, switchCharacter, switchGlider, switchKart, switchTire } from "data";

export type FindOptimalResult = {
    isPending: boolean,
    moreEfficientBuilds: Build[],
};

export const useFindOptimalBuild = (currentBuild: Build, considerStats: StatKey[]): FindOptimalResult => {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<Build[]>([]);

    useEffect(() => {
        startTransition(() => {
            setResult(findMoreEfficientBuilds(currentBuild, considerStats));
        });
    }, [currentBuild, considerStats]);

    return {
        isPending,
        moreEfficientBuilds: result,
    };
};
const findMoreEfficientBuilds = (currentBuild: Build, considerStats: StatKey[]): Build[] => {
    if (considerStats.length === 0) {
        return [];
    }
    return findMoreEfficientBuildsWithStatMemo(
        currentBuild,
        getBuildStat(currentBuild),
        considerStats,
        {}
    );
}

const findMoreEfficientBuildsWithStatMemo = (
    currentBuild: Build, 
    currentStat: Stat, 
    considerStats: StatKey[], 
    memo: Record<number, Build[]>,
): Build[] => {
    const hash = hashStat(currentStat);
    const memoized = memo[hash];
    if (memoized) {
        return memoized;
    }
    const output = findMoreEfficientBuildsWithStatCore(
        currentBuild, 
        currentStat, 
        considerStats,
        memo
    );
    memo[hash] = output;
    return output;
}

const findMoreEfficientBuildsWithStatCore = (
    currentBuild: Build, 
    currentStat: Stat, 
    considerStats: StatKey[], 
    memo: Record<number, Build[]>,
): Build[] => {

    const output: Build[] = [];

    findMoreEfficientBuildsWithStatBySwitching(
        Characters,
        switchCharacter,
        currentBuild,
        currentStat,
        considerStats,
        output,
        memo,
    );

    findMoreEfficientBuildsWithStatBySwitching(
        Karts,
        switchKart,
        currentBuild,
        currentStat,
        considerStats,
        output,
        memo,
    );

    findMoreEfficientBuildsWithStatBySwitching(
        Tires,
        switchTire,
        currentBuild,
        currentStat,
        considerStats,
        output,
        memo,
    );

    findMoreEfficientBuildsWithStatBySwitching(
        Gliders,
        switchGlider,
        currentBuild,
        currentStat,
        considerStats,
        output,
        memo,
    );


    return output;
}

const findMoreEfficientBuildsWithStatBySwitching = <T extends string>(
    items: readonly T[],
    switchFn: (build: Build, t: T) => Build,
    currentBuild: Build,
    currentStat: Stat,
    considerStats: StatKey[],
    output: Build[],
    memo: Record<number, Build[]>,
) => {
    items.forEach((item) => {
        const newBuild = switchFn(currentBuild, item);
        const newStat = getBuildStat(newBuild);
        if (isStatMoreEfficient(currentStat, newStat, considerStats)) {
            const betterBuilds = findMoreEfficientBuildsWithStatMemo(
                newBuild,
                newStat,
                considerStats,
                memo
            );
            if (betterBuilds.length === 0) {
                output.push(newBuild);
            }
        }
    });
}

/// Return if none of considered stats are worse and at least one is better
const isStatMoreEfficient = (currentStat: Stat, newStat: Stat, considerStats: StatKey[]): boolean => {
    let someBetter = false;
    for (let i = 0; i < considerStats.length; i++) {
        const stat = considerStats[i];
        if (currentStat[stat] >= newStat[stat]) {
            return false;
        }
        if (currentStat[stat] < newStat[stat]) {
            someBetter = true;
        }
    }
    return someBetter;
}

