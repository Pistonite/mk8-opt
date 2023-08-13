import "./StatTable.css";
import { Build, Stat, StatKey, StatKeys, getBuildStat } from "data"

export const StatTable: React.FC<{
    name: string,
    stat: Stat
}> = ({name, stat}) => {
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
                            <td key={key}>{stat[key]}</td>
                        ))
                    }
                </tr>
            </tbody>
        </table>
    );
}

export const BuildTable: React.FC<{
    currentBuild: Build,
    build: Build
}> = ({ build, currentBuild }) => {
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
                            <td className={getStatClass(currentStat, stat, key)} key={key}>{stat[key]}</td>
                        ))
                    }
                </tr>
            </tbody>
        </table>
    );
}

const getStatClass = (currentStat: Stat, stat: Stat, key: StatKey) => {
    if (stat[key] === currentStat[key]) {
        return "stat-equal";
    }
    if (stat[key] > currentStat[key]) {
        return "stat-higher";
    }
    return "stat-lower";
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
