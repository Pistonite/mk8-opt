import { useMemo, useState } from "react";

import { FindOptimalInput, useBuildSelection, useFindOptimalBuild } from "core";
import { CharacterData, findCharacter, findGlider, findKart, findTire, KartData, TireData, GliderData, getBuildStat, Build, StatKey } from "data";
import { BuildSelectionInput, BuildTable, StatSelection, StatTable } from "ui";

const DATA_LINK = "https://www.mariowiki.com/Mario_Kart_8_Deluxe_in-game_statistics";

export const App: React.FC = () => {
    const [considerStats, setConsiderStats] = useState<StatKey[]>(["mt", "sl"]);
    const [reversedStats, setReversedStats] = useState<StatKey[]>(["wg"]);

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

    const lockedParts = useMemo(() => [
        characterBuild.locked,
        kartBuild.locked,
        tireBuild.locked,
        gliderBuild.locked,
    ], [characterBuild, kartBuild, tireBuild, gliderBuild]);

    return (
        <>
            <h1>MK8 Optimize Tool</h1>
            <p>Data is from <a href={DATA_LINK}>{DATA_LINK}</a></p>
            <StatSelection 
                title="Consider Stats"
                selected={considerStats}
                setSelected={setConsiderStats}
            />
            <p>
                The tool will find any builds where at least one stat is better, and none of the selected stats are worse.
            </p>
            <StatSelection 
                title="Reversed Stats"
                selected={reversedStats}
                setSelected={setReversedStats}
            />
            <p>
                If a stat is reversed, lower numeric value is considered better.
            </p>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <ul>
                    <li><b>WG</b> Weight</li>
                    <li><b>AC</b> Acceleration</li>
                    <li><b>ON</b> On-Road traction</li>
                    <li><b>OF</b> (Off-Road) Traction</li>
                    <li><b>MT</b> Mini-Turbo</li>
                    <li><b>IV</b> Invincibility</li>
                </ul>
                <ul>
                    <li><b>SL</b> Ground Speed</li>
                    <li><b>SW</b> Water Speed</li>
                    <li><b>SA</b> Anti-Gravity Speed</li>
                    <li><b>SG</b> Air Speed</li>
                    <li><b>TL</b> Ground Handling</li>
                    <li><b>TW</b> Water Handling</li>
                    <li><b>TA</b> Anti-Gravity Handling</li>
                    <li><b>TG</b> Air Handling</li>
                </ul>
            </div>
            <h2>Part Selection</h2>
            <div className="form">
                <BuildSelectionInput 
                    title="Character" 
                    items={CharacterData}
                    considerStats={considerStats}
                    {...characterBuild}
                />
                <BuildSelectionInput 
                    title="Kart"
                    items={KartData}
                    considerStats={considerStats}
                    {...kartBuild}
                />
                <BuildSelectionInput 
                    title="Tire" 
                    items={TireData}
                    considerStats={considerStats}
                    {...tireBuild}
                />
                <BuildSelectionInput 
                    title="Glider"
                    items={GliderData}
                    considerStats={considerStats}
                    {...gliderBuild}
                />
            </div>
            <h2>Build</h2>
            {
                build ? 
                    <BuildSection 
                        currentBuild={build}
                        considerStats={considerStats}
                        reversedStats={reversedStats}
                        lockedParts={lockedParts}
                    />
                : <p>Please finish selecting parts above </p>
            }
        </>
    );
}

const BuildSection: React.FC<FindOptimalInput> = (input) => {
    const { currentBuild, considerStats, reversedStats } = input;
    const stat = getBuildStat(currentBuild);
    const result = useFindOptimalBuild(input);
    return (
        <>
            <p>This is your current build</p>
            <StatTable 
                name="Current Build" 
                stat={stat} 
                considerStats={considerStats}
            />
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
                        <p>Found {result.moreEfficientBuilds.length} build{result.moreEfficientBuilds.length === 1 ? "" : "s"} that may potentially be more efficient</p>
                        <ol>
                            {
                                result.moreEfficientBuilds.map((newBuild, index) => (
                                    <li key={index}>
                                        <BuildTable 
                                            currentBuild={currentBuild} 
                                            build={newBuild}
                                            considerStats={considerStats}
                                            reversedStats={reversedStats}
                                        />
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

