const fs = require("fs");
const path = require("path");

const dataTxtPath = path.join(__dirname, "src/data/stats.txt");
const outputPath = path.join(__dirname, "src/data/stats.ts");

const data = fs.readFileSync(dataTxtPath, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter(line => line && !line.startsWith("#"));

const statKeys = data[0].split("\t").map((key) => key.trim().toLowerCase());
console.log(`Stat keys: ${statKeys.join(", ")}`);

if (!data[1].startsWith("[")) {
    throw new Error("Expected category before anything else after the header");
}

const statEquals = (a, b) => {
    for (let i = 0; i < statKeys.length; i++) {
        if (a[statKeys[i]] !== b[statKeys[i]]) {
            return false;
        }
    }
    return true;
};

const categories = [];
const names = {};
let currentCategory = null;
const obj = {};

for (let i = 1; i < data.length; i++) {
    const name = data[i];
    if (name.startsWith("[") && name.endsWith("]")) {
        currentCategory = name.slice(1, name.length - 1);
        categories.push(currentCategory);
        names[currentCategory] = [];
        obj[currentCategory] = [];
        continue;
    }
    names[currentCategory].push(name);
    i++;
    const stats = data[i].split("\t").map((value) => parseInt(value.trim()));
    if (stats.length !== statKeys.length) {
        throw new Error(`Expected ${statKeys.length} stats, got ${stats.length}. Name is ${name}`);
    }
    const statObj = {};
    for (let j = 0; j < statKeys.length; j++) {
        statObj[statKeys[j]] = stats[j];
    }

    let isDuplicate = false;
    for (let j = 0; j < obj[currentCategory].length; j++) {
        if (statEquals(obj[currentCategory][j].statObj, statObj)) {
            obj[currentCategory][j].name += ` / ${name}`;
            isDuplicate = true;
            break;
        }
    }

    if (isDuplicate) {
        continue;
    }

    obj[currentCategory].push({
        name,
        statObj
    });
}

console.log(`Categories: ${categories.join(", ")}`);
categories.forEach((category) => {
    console.log(`  ${category}: ${obj[category].length} unique items`);
});

let outputString = `// This file is generated by makeData.cjs

import Fuse from "fuse.js";
import { fuzzySearch, FuseOptions } from "./fuzzy";

`;

/// Stat type
outputString += "export type Stat = {\n";
for (let i = 0; i < statKeys.length; i++) {
    outputString += `    ${statKeys[i]}: number;\n`;
}
outputString += "};\n\n";

outputString += "export type StatKey = keyof Stat\n\n";
outputString += `export const StatKeys = [${statKeys.map(key => JSON.stringify(key)).join(", ")}] as const;\n\n`;

/// hashStat function
outputString += "export const hashStat = (stat: Stat): number => {\n";
outputString += "    const c = 43;\n";
outputString += "    let h = 0;\n";
for (let i = 0; i < statKeys.length; i++) {
    outputString += `    h = h * c + stat.${statKeys[i]};\n`;
}
outputString += "    return h;\n";
outputString += "};\n\n";

/// Data
categories.forEach((category) => {
    outputString += `export const ${category}Data = {\n`;
    const names = [];
    obj[category].forEach(({name, statObj}) => {
        const nameString = JSON.stringify(name);
        outputString += `    ${nameString}: { ${statKeys.map(key => `${key}: ${statObj[key]}`).join(", ")}},\n`;
        names.push(nameString);
    });
    outputString += "} as const;\n"
    outputString += `export type ${category} = keyof typeof ${category}Data;\n\n`;
    outputString += `export const ${category}s = [${names.join(", ")}] as const;\n\n`;
});

/// Build type
outputString += `export type Build = [${categories.join(", ")}]\n`;

/// category function
categories.forEach((category, i) => {
    outputString += `export const ${category}Names = [${names[category].map(n => JSON.stringify(n)).join(", ")}] as const;\n`
    outputString += `export const Fuzzy${category}Finder = new Fuse(${category}Names, FuseOptions);\n`;
    outputString += `export const find${category} = (searchTerm: string): ${category}[] => {\n`;
    outputString += `    return fuzzySearch(searchTerm, Fuzzy${category}Finder, ${category}s);\n`;
    outputString += "};\n\n";

    outputString += `export const switch${category} = (build: Build, newPart: ${category}): Build => {\n`;
    outputString += "    const output = [...build] as Build;\n";
    outputString += `    output[${i}] = newPart;\n`;
    outputString += "    return output;\n";
    outputString += "};\n\n";
});

/// Iterator
outputString += "export const forEachBuild = async (callback: (build: Build) => Promise<void>): Promise<void> => {\n";
categories.forEach((category) => {
    outputString += `    for (const ${category} of ${category}s) {\n`;
});
outputString += `        await callback([${categories.join(", ")}]);\n`;
categories.forEach(() => {
    outputString += "    }\n";
});
outputString += "    };\n\n";

/// getBuildStat function
outputString += "export const getBuildStat = (build: Build): Stat => {\n";
outputString += `    const stat = {...${categories[0]}Data[build[0]]}\n`;
for (let i = 1; i < categories.length; i++) {
    outputString += `    const ${categories[i]}Stat = ${categories[i]}Data[build[${i}]];\n`;
}
statKeys.forEach((key) => {
    outputString += `    stat.${key} += ${categories.slice(1).map((category) => `${category}Stat.${key}`).join(" + ")};\n`;
});
outputString += "    return stat;\n";
outputString += "};\n\n";

fs.writeFileSync(outputPath, outputString);
console.log(`Wrote to ${outputPath}`);

