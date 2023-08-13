import { useEffect, useState, useTransition } from "react";

import { Build, Stat, StatKey, StatKeys, forEachBuild, getBuildStat } from "data";

export type FindOptimalResult = {
    isPending: boolean,
    moreEfficientBuilds: Build[],
};

export const useFindOptimalBuild = (currentBuild: Build, considerStats: StatKey[], reversedStats: StatKey[]): FindOptimalResult => {
    const [isPending, startTransition] = useTransition();
    const [result, setResult] = useState<Build[]>([]);

    useEffect(() => {
        startTransition(() => {
            setResult(findMoreEfficientBuilds(currentBuild, considerStats, reversedStats));
        });
    }, [currentBuild, considerStats, reversedStats]);

    return {
        isPending,
        moreEfficientBuilds: result,
    };
};

const findMoreEfficientBuilds = (currentBuild: Build, considerStats: StatKey[], reversedStats: StatKey[]): Build[] => {
    const output: Build[] = [];
    const currentStat = getBuildStat(currentBuild);
    forEachBuild((build) => {
        if (buildEquals(build, currentBuild)) {
            return;
        }
        const newStat = getBuildStat(build);
        if (isStatMoreEfficient(currentStat, newStat, considerStats, reversedStats)) {
            output.push(build);
        }
    });

    return output;
}

const buildEquals = (a: Build, b: Build): boolean => {
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

/// Return if none of considered stats are worse and at least one is better
const isStatMoreEfficient = (currentStat: Stat, newStat: Stat, considerStats: StatKey[], reversedStats: StatKey[]): boolean => {
    let someBetter = false;
    for (let i = 0; i < StatKeys.length; i++) {
        const statKey = StatKeys[i];
        if (currentStat[statKey] === newStat[statKey]) {
            continue;
        }
        const isConsidered = considerStats.includes(statKey);
        const isReversed = reversedStats.includes(statKey);
        const isNewBetter = isReversed ? newStat[statKey] < currentStat[statKey] : newStat[statKey] > currentStat[statKey];
        // considered stat cannot be worse
        if (isConsidered && !isNewBetter) {
            return false;
        }
        // at least one needs to be better
        if (isNewBetter) {
            someBetter = true;
        }
    }
    return someBetter;
}

