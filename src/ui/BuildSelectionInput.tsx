import { BuildSelection } from "core";
import { Stat, StatKey } from "data";

import { StatTable } from "./StatTable";

export const BuildSelectionInput: React.FC<BuildSelection<string> & {
    title: string,
    items: Readonly<Record<string, Stat>>,
    considerStats: StatKey[],
}> = ({
    title,
    input,
    setInputValue,
    locked,
    setLocked,
    considerStats,
    isPending,
    found,
    unique,
    items,
}) => {
    const id = `input-${title.toLowerCase()}`;
    const MAX_RESULT = 5;
    const filteredResult = found.length > MAX_RESULT + 1 ? [...found.slice(0, MAX_RESULT), `... (${found.length - MAX_RESULT} more)`] : found; 


    return (
        <div>
            <label htmlFor={id}>{title}</label>
            <input 
                id={id}
                type="text" 
                value={input} 
                onChange={(e) => setInputValue(e.target.value)} 
            />
            {
                input && <InputMessage pending={isPending} items={found} />
            }
            <input type="checkbox" checked={locked} onChange={() => setLocked(!locked)} /> Lock
            {
                unique ?
                <StatTable 
                    name={unique} 
                    stat={items[unique]}
                    considerStats={considerStats}
                />
                :
                <ul className="result-list">
                    {filteredResult.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            }
        </div>
    );
}

const InputMessage: React.FC<{
    pending: boolean, 
    items: string[]
}> = ({pending, items}) => {
    if (pending) {
        return (
            <span className="pending-message">Loading...</span>
        );
    }
    if (items.length > 1) {
        return (
            <span className="error-message">Multiple items found!</span>
        );
    }
    if (items.length === 0) {
        return (
            <span className="error-message">Not found!</span>
        );
    }
    return null;
};
