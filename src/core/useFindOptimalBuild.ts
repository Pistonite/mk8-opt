import { useEffect, useState, useTransition } from "react";

import { Build, Stat, StatKey, StatKeys, forEachBuild, getBuildStat } from "data";

export type FindOptimalResult = {
    isPending: boolean,
    moreEfficientBuilds: Build[],
};

export type FindOptimalInput = {
    currentBuild: Build,
    considerStats: StatKey[],
    reversedStats: StatKey[],
    lockedParts: boolean[],
}

let searchSerial = 0;

export const useFindOptimalBuild = ({currentBuild, considerStats, reversedStats, lockedParts}: FindOptimalInput): FindOptimalResult => {
    const [isPending, startTransition] = useTransition();
    const [searching, setSearching] = useState<boolean>(false);
    const [result, setResult] = useState<Build[]>([]);

    useEffect(() => {
        startTransition(() => {
            setSearching(true);
            searchSerial++;
            const currentSerial = searchSerial;
            console.log("search start " + currentSerial);
            // console.log(lockedParts)
            findMoreEfficientBuilds({currentBuild, considerStats, reversedStats, lockedParts}).then(builds => {
                setSearching(false);
                if (currentSerial !== searchSerial) {
                    console.log("search cancelled " + currentSerial);
                    return;
                }
                console.log("search end " + currentSerial);
                setResult(builds);
            })
        });
    }, [currentBuild, considerStats, reversedStats, lockedParts]);

    return {
        isPending: isPending || searching,
        moreEfficientBuilds: result,
    };
};

const findMoreEfficientBuilds = async ({currentBuild, considerStats, reversedStats, lockedParts}: FindOptimalInput): Promise<Build[]> => {
    const output: Build[] = [];
    const currentStat = getBuildStat(currentBuild);
    const testBuild = (build: Build) => {
        // if build has part changed but that part is locked, ignore it
        for (let i = 0; i < build.length; i++) {
            if (lockedParts[i] && build[i] !== currentBuild[i]) {
                return false;
            }
        }
        if (buildEquals(build, currentBuild)) {
            return false;
        }
        const newStat = getBuildStat(build);
        return isStatMoreEfficient(currentStat, newStat, considerStats, reversedStats);
    };
    let counter = 0;
    await forEachBuild(async (build) => {
        counter++;
        if (counter % 100 === 0) {
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 0);
            });
        }
        if(testBuild(build)) {
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

