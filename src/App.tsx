import { useMemo, useState } from "react";

import { useBuildSelection, useFindOptimalBuild } from "core";
import { CharacterData, findCharacter, findGlider, findKart, findTire, KartData, TireData, GliderData, getBuildStat, Build, StatKey } from "data";
import { BuildSelectionInput, BuildTable, StatSelection, StatTable } from "ui";

const DATA_LINK = "https://www.mariowiki.com/Mario_Kart_8_Deluxe_in-game_statistics";

export const App: React.FC = () => {
    const [considerStats, setConsiderStats] = useState<StatKey[]>(["mt", "sl"]);

    const characterBuild = useBuildSelection(findCharacter);
    const kartBuild = useBuildSelection(findKart);
    const tireBuild = useBuildSelection(findTire);
    const gliderBuild = useBuildSelection(findGlider);

    const build = useMemo(() => {
        const character = characterBuild.unique;
        const kart = kartBuild.unique;
        const tire = tireBuild.unique;
        const glider = gliderBuild.unique;

        if (character && kart && tire && glider) {
            return [character, kart, tire, glider] as Build;
        }
        return undefined;
    }, [characterBuild, kartBuild, tireBuild, gliderBuild]);

    return (
        <>
            <h1>MK8 Optimize Tool</h1>
            <p>Data is from <a href={DATA_LINK}>{DATA_LINK}</a></p>
            <p>
                Select the set of stats to see if you can increase any of them without sacrificing any of them.
            </p>
            <StatSelection 
                title="Consider Stats"
                selected={considerStats}
                setSelected={setConsiderStats}
            />
            <ul>
                <li><b>WG</b> Weight</li>
                <li><b>AC</b> Acceleration</li>
                <li><b>ON</b> On-Road traction</li>
                <li><b>OF</b> (Off-Road) Traction</li>
                <li><b>MT</b> Mini-Turbo</li>
                <li><b>SL</b> Ground Speed</li>
                <li><b>SW</b> Water Speed</li>
                <li><b>SA</b> Anti-Gravity Speed</li>
                <li><b>SG</b> Air Speed</li>
                <li><b>TL</b> Ground Handling</li>
                <li><b>TW</b> Water Handling</li>
                <li><b>TA</b> Anti-Gravity Handling</li>
                <li><b>TG</b> Air Handling</li>
                <li><b>IV</b> Invincibility</li>
            </ul>
            <h2>Part Selection</h2>
            <div className="form">
                <BuildSelectionInput 
                    title="Character" 
                    items={CharacterData}
                    {...characterBuild}
                />
                <BuildSelectionInput 
                    title="Kart"
                    items={KartData}
                    {...kartBuild}
                />
                <BuildSelectionInput 
                    title="Tire" 
                    items={TireData}
                    {...tireBuild}
                />
                <BuildSelectionInput 
                    title="Glider"
                    items={GliderData}
                    {...gliderBuild}
                />
            </div>
            <h2>Build</h2>
            {
                build 
                ? <BuildSection build={build} considerStats={considerStats}/>
                : <p>Please finish selecting parts above </p>
            }
        </>
    );
}

const BuildSection: React.FC<{build: Build, considerStats: StatKey[]}> = ({build, considerStats}) => {
    const stat = getBuildStat(build);
    const result = useFindOptimalBuild(build, considerStats);
    return (
        <>
            <p>This is your current build</p>
            <StatTable name="Current Build" stat={stat} />
            <h2>Analysis</h2>
            {
                result.isPending && <p>Loading...</p>
            }
            {
                !result.isPending && result.moreEfficientBuilds.length === 0 && <p>Cannot find more efficient builds</p>
            }
            {
                !result.isPending && result.moreEfficientBuilds.length > 0 && (
                    <>
                        <p>Found {result.moreEfficientBuilds.length} more efficient builds</p>
                        <ol>
                            {
                                result.moreEfficientBuilds.map((newBuild, index) => (
                                    <li key={index}>
                                        <BuildTable currentBuild={build} build={newBuild}/>

                                    </li>
                                ))
                            }
                        </ol>
                    </>
                )
            }
        </>
    );
}

