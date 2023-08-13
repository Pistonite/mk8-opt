import "./StatTable.css";
import { Build, Stat, StatKey, StatKeys, getBuildStat } from "data"

export const StatTable: React.FC<{
    name: string,
    stat: Stat,
    considerStats: StatKey[],
}> = ({name, stat, considerStats}) => {
    return (
        <table className="stat-table">
            <thead>
                <tr>
                    <th colSpan={StatKeys.length}>{name}</th>
                </tr>
                <StatHeaderRow />
            </thead>
            <tbody>
                <tr>
                    {
                        StatKeys.map((key) => (
                            <td 
                                className={getStatClass(
                                    stat, 
                                    stat, 
                                    key, 
                                    considerStats,
                                    []
                                )} 
                                key={key}
                            >{stat[key]}</td>
                        ))
                    }
                </tr>
            </tbody>
        </table>
    );
}

export const BuildTable: React.FC<{
    currentBuild: Build,
    build: Build,
    considerStats: StatKey[],
    reversedStats: StatKey[],
}> = ({ build, currentBuild, considerStats, reversedStats }) => {
    const currentStat = getBuildStat(currentBuild);
    const stat = getBuildStat(build);
    return (
        <table className="stat-table">
            <thead>
                {
                    build.map((item, index) => (
                        <tr key={index}>
                            <th className={item !== currentBuild[index] ? "build-different" : "build-same"
                             } colSpan={StatKeys.length}>{item}</th>
                        </tr>
                    ))
                }
                <StatHeaderRow />
            </thead>
            <tbody>
                <tr>
                    {
                        StatKeys.map((key) => (
                            <td 
                                className={getStatClass(
                                    currentStat, 
                                    stat, 
                                    key, 
                                    considerStats,
                                    reversedStats
                                )} 
                                key={key}
                            >{stat[key]}</td>
                        ))
                    }
                </tr>
            </tbody>
        </table>
    );
}

const getStatClass = (currentStat: Stat, stat: Stat, key: StatKey, consideredStats: StatKey[], reversedStats: StatKey[]) => {
    const output = [];
    const isReversed = reversedStats.includes(key);
    if (stat[key] === currentStat[key]) {
        output.push("stat-equal");
    } else if (stat[key] > currentStat[key]) {
        output.push(isReversed ? "stat-lower" : "stat-higher");
    } else {
        output.push(isReversed ? "stat-higher" : "stat-lower");
    }

    if (consideredStats.includes(key)) {
        output.push("stat-considered");
    }
    return output.join(" ");
};


export const StatSelection: React.FC<{
    title: string,
    selected: StatKey[],
    setSelected: React.Dispatch<React.SetStateAction<StatKey[]>>,
}> = ({title, selected, setSelected}) => {
    return (
        <table className="stat-table">
            <thead>
                <tr>
                    <th colSpan={StatKeys.length}>{title}</th>
                </tr>
                <StatHeaderRow />
            </thead>
            <tbody>
                <tr>
                    {
                        StatKeys.map((key) => (
                            <td key={key}>
                                <input 
                                    type="checkbox"
                                    checked={selected.includes(key)}
                                    onChange={(e) => {
                                        setSelected(prev => {
                                            if (e.target.checked) {
                                                return [...prev, key];
                                            } else {
                                                return prev.filter(x => x !== key);
                                            }
                                        })
                                    }}
                                />
                            </td>
                        ))
                    }
                </tr>
            </tbody>
        </table>
    );
}

const StatHeaderRow = () => {
    return (
        <tr>
            {
                StatKeys.map((key) => (
                    <th key={key}>{key.toUpperCase()}</th>
                ))
            }
        </tr>
    );
}
