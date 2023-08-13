// This file is generated by makeData.cjs

import Fuse from "fuse.js";
import { fuzzySearch, FuseOptions } from "./fuzzy";

export type Stat = {
    wg: number;
    ac: number;
    on: number;
    of: number;
    mt: number;
    sl: number;
    sw: number;
    sa: number;
    sg: number;
    tl: number;
    tw: number;
    ta: number;
    tg: number;
    iv: number;
};

export type StatKey = keyof Stat

export const StatKeys = ["wg", "ac", "on", "of", "mt", "sl", "sw", "sa", "sg", "tl", "tw", "ta", "tg", "iv"] as const;

export const hashStat = (stat: Stat): number => {
    const c = 43;
    let h = 0;
    h = h * c + stat.wg;
    h = h * c + stat.ac;
    h = h * c + stat.on;
    h = h * c + stat.of;
    h = h * c + stat.mt;
    h = h * c + stat.sl;
    h = h * c + stat.sw;
    h = h * c + stat.sa;
    h = h * c + stat.sg;
    h = h * c + stat.tl;
    h = h * c + stat.tw;
    h = h * c + stat.ta;
    h = h * c + stat.tg;
    h = h * c + stat.iv;
    return h;
};

export const CharacterData = {
    "Metal Mario / Pink Gold Peach / Gold Mario": { wg: 10, ac: 1, on: 8, of: 1, mt: 1, sl: 8, sw: 8, sa: 8, sg: 8, tl: 3, tw: 3, ta: 3, tg: 3, iv: 3},
    "Petey Piranha": { wg: 10, ac: 1, on: 8, of: 1, mt: 1, sl: 8, sw: 8, sa: 8, sg: 8, tl: 3, tw: 3, ta: 3, tg: 3, iv: 6},
    "Bowser / Morton": { wg: 10, ac: 0, on: 6, of: 0, mt: 0, sl: 10, sw: 10, sa: 10, sg: 10, tl: 0, tw: 0, ta: 0, tg: 0, iv: 6},
    "Wario / Dry Bowser": { wg: 9, ac: 0, on: 5, of: 1, mt: 0, sl: 10, sw: 10, sa: 10, sg: 10, tl: 1, tw: 1, ta: 1, tg: 1, iv: 5},
    "Donkey Kong / Waluigi / Roy / Wiggler": { wg: 8, ac: 1, on: 10, of: 0, mt: 1, sl: 9, sw: 9, sa: 9, sg: 9, tl: 2, tw: 2, ta: 2, tg: 2, iv: 4},
    "Rosalina / Link / King Boo / Link (Breath of the Wild)": { wg: 7, ac: 1, on: 9, of: 3, mt: 2, sl: 8, sw: 8, sa: 8, sg: 8, tl: 3, tw: 3, ta: 3, tg: 3, iv: 4},
    "Luigi / Iggy / Kamek": { wg: 6, ac: 2, on: 5, of: 1, mt: 3, sl: 7, sw: 7, sa: 7, sg: 7, tl: 5, tw: 5, ta: 5, tg: 5, iv: 3},
    "Mario / Ludwig / Mii (medium)": { wg: 6, ac: 2, on: 4, of: 2, mt: 3, sl: 7, sw: 7, sa: 7, sg: 7, tl: 4, tw: 4, ta: 4, tg: 4, iv: 3},
    "Tanooki Mario / Villager (male) / Inkling Boy": { wg: 5, ac: 3, on: 7, of: 1, mt: 4, sl: 6, sw: 6, sa: 6, sg: 6, tl: 5, tw: 5, ta: 5, tg: 5, iv: 1},
    "Peach / Daisy / Yoshi / Birdo": { wg: 4, ac: 3, on: 3, of: 3, mt: 4, sl: 6, sw: 6, sa: 6, sg: 6, tl: 5, tw: 5, ta: 5, tg: 5, iv: 1},
    "Toad / Shy Guy / Larry": { wg: 3, ac: 4, on: 3, of: 4, mt: 4, sl: 4, sw: 4, sa: 4, sg: 4, tl: 7, tw: 7, ta: 7, tg: 7, iv: 3},
    "Cat Peach / Villager (female) / Inkling Girl": { wg: 3, ac: 4, on: 2, of: 3, mt: 4, sl: 5, sw: 5, sa: 5, sg: 5, tl: 6, tw: 6, ta: 6, tg: 6, iv: 3},
    "Koopa Troopa / Lakitu / Bowser Jr.": { wg: 2, ac: 4, on: 1, of: 5, mt: 4, sl: 3, sw: 3, sa: 3, sg: 3, tl: 8, tw: 8, ta: 8, tg: 8, iv: 4},
    "Toadette / Wendy / Isabelle": { wg: 2, ac: 5, on: 4, of: 2, mt: 4, sl: 3, sw: 3, sa: 3, sg: 3, tl: 7, tw: 7, ta: 7, tg: 7, iv: 3},
    "Baby Mario / Baby Luigi / Dry Bones": { wg: 1, ac: 5, on: 2, of: 4, mt: 5, sl: 2, sw: 2, sa: 2, sg: 2, tl: 8, tw: 8, ta: 8, tg: 8, iv: 5},
    "Baby Peach / Baby Daisy": { wg: 0, ac: 4, on: 3, of: 5, mt: 5, sl: 1, sw: 1, sa: 1, sg: 1, tl: 10, tw: 10, ta: 10, tg: 10, iv: 6},
    "Baby Rosalina / Lemmy": { wg: 0, ac: 5, on: 4, of: 3, mt: 5, sl: 1, sw: 1, sa: 1, sg: 1, tl: 9, tw: 9, ta: 9, tg: 9, iv: 6},
} as const;
export type Character = keyof typeof CharacterData;

export const Characters = ["Metal Mario / Pink Gold Peach / Gold Mario", "Petey Piranha", "Bowser / Morton", "Wario / Dry Bowser", "Donkey Kong / Waluigi / Roy / Wiggler", "Rosalina / Link / King Boo / Link (Breath of the Wild)", "Luigi / Iggy / Kamek", "Mario / Ludwig / Mii (medium)", "Tanooki Mario / Villager (male) / Inkling Boy", "Peach / Daisy / Yoshi / Birdo", "Toad / Shy Guy / Larry", "Cat Peach / Villager (female) / Inkling Girl", "Koopa Troopa / Lakitu / Bowser Jr.", "Toadette / Wendy / Isabelle", "Baby Mario / Baby Luigi / Dry Bones", "Baby Peach / Baby Daisy", "Baby Rosalina / Lemmy"] as const;

export const KartData = {
    "Pipe Frame / Varmint": { wg: 1, ac: 6, on: 3, of: 4, mt: 6, sl: 2, sw: 3, sa: 1, sg: 1, tl: 5, tw: 4, ta: 4, tg: 2, iv: 2},
    "Biddybuggy / Mr. Scooty": { wg: 0, ac: 7, on: 1, of: 4, mt: 7, sl: 0, sw: 1, sa: 2, sg: 1, tl: 5, tw: 4, ta: 5, tg: 4, iv: 0},
    "City Tripper": { wg: 1, ac: 6, on: 3, of: 4, mt: 6, sl: 2, sw: 3, sa: 1, sg: 1, tl: 5, tw: 4, ta: 4, tg: 2, iv: 1},
    "Cat Cruiser / Teddy Buggy": { wg: 2, ac: 5, on: 4, of: 3, mt: 6, sl: 2, sw: 2, sa: 3, sg: 4, tl: 4, tw: 2, ta: 3, tg: 4, iv: 3},
    "Landship": { wg: 0, ac: 6, on: 0, of: 6, mt: 6, sl: 2, sw: 5, sa: 0, sg: 2, tl: 4, tw: 5, ta: 2, tg: 3, iv: 1},
    "Standard Bike / W 25 Silver Arrow": { wg: 1, ac: 5, on: 3, of: 5, mt: 5, sl: 2, sw: 2, sa: 4, sg: 3, tl: 4, tw: 3, ta: 4, tg: 3, iv: 3},
    "Comet / Yoshi Bike": { wg: 2, ac: 5, on: 4, of: 3, mt: 6, sl: 2, sw: 2, sa: 3, sg: 4, tl: 4, tw: 2, ta: 3, tg: 4, iv: 2},
    "Flame Rider": { wg: 1, ac: 5, on: 3, of: 5, mt: 5, sl: 2, sw: 2, sa: 4, sg: 3, tl: 4, tw: 3, ta: 4, tg: 3, iv: 2},
    "Wild Wiggler": { wg: 1, ac: 5, on: 3, of: 5, mt: 5, sl: 2, sw: 2, sa: 4, sg: 3, tl: 4, tw: 3, ta: 4, tg: 3, iv: 1},
    "Tanooki Kart": { wg: 3, ac: 2, on: 4, of: 7, mt: 5, sl: 3, sw: 4, sa: 3, sg: 3, tl: 4, tw: 4, ta: 3, tg: 3, iv: 4},
    "Streetle": { wg: 0, ac: 6, on: 0, of: 6, mt: 6, sl: 2, sw: 5, sa: 0, sg: 2, tl: 4, tw: 5, ta: 2, tg: 3, iv: 2},
    "Koopa Clown / Master Cycle Zero": { wg: 3, ac: 2, on: 4, of: 7, mt: 5, sl: 3, sw: 4, sa: 3, sg: 3, tl: 4, tw: 4, ta: 3, tg: 3, iv: 3},
    "Standard Kart / The Duke": { wg: 2, ac: 4, on: 3, of: 3, mt: 5, sl: 3, sw: 3, sa: 3, sg: 3, tl: 3, tw: 2, ta: 3, tg: 3, iv: 3},
    "Prancer": { wg: 1, ac: 2, on: 1, of: 2, mt: 4, sl: 4, sw: 3, sa: 3, sg: 3, tl: 3, tw: 3, ta: 2, tg: 3, iv: 5},
    "Sneeker": { wg: 2, ac: 2, on: 1, of: 0, mt: 4, sl: 4, sw: 2, sa: 3, sg: 3, tl: 3, tw: 2, ta: 3, tg: 2, iv: 5},
    "Gold Standard": { wg: 2, ac: 2, on: 1, of: 0, mt: 4, sl: 4, sw: 2, sa: 3, sg: 3, tl: 3, tw: 2, ta: 3, tg: 2, iv: 4},
    "Sport Bike / Jet Bike": { wg: 1, ac: 2, on: 1, of: 2, mt: 4, sl: 4, sw: 3, sa: 3, sg: 3, tl: 3, tw: 3, ta: 2, tg: 3, iv: 3},
    "300 SL Roadster": { wg: 2, ac: 4, on: 3, of: 3, mt: 5, sl: 3, sw: 3, sa: 3, sg: 3, tl: 3, tw: 2, ta: 3, tg: 3, iv: 4},
    "Master Cycle": { wg: 2, ac: 2, on: 1, of: 0, mt: 4, sl: 4, sw: 2, sa: 3, sg: 3, tl: 3, tw: 2, ta: 3, tg: 2, iv: 3},
    "Mach 8 / Sports Coupe": { wg: 3, ac: 3, on: 2, of: 4, mt: 5, sl: 3, sw: 3, sa: 5, sg: 4, tl: 2, tw: 2, ta: 4, tg: 2, iv: 4},
    "Blue Falcon": { wg: 0, ac: 3, on: 1, of: 3, mt: 4, sl: 4, sw: 2, sa: 4, sg: 3, tl: 2, tw: 3, ta: 5, tg: 1, iv: 4},
    "Splat Buggy": { wg: 0, ac: 3, on: 1, of: 3, mt: 4, sl: 4, sw: 2, sa: 4, sg: 3, tl: 2, tw: 3, ta: 5, tg: 1, iv: 3},
    "Inkstriker": { wg: 3, ac: 3, on: 2, of: 4, mt: 5, sl: 3, sw: 3, sa: 5, sg: 4, tl: 2, tw: 2, ta: 4, tg: 2, iv: 3},
    "Steel Driver / Tri-Speeder": { wg: 4, ac: 1, on: 1, of: 3, mt: 3, sl: 4, sw: 5, sa: 2, sg: 0, tl: 1, tw: 5, ta: 1, tg: 1, iv: 6},
    "Circuit Special / B Dasher / P-Wing": { wg: 3, ac: 1, on: 3, of: 1, mt: 3, sl: 5, sw: 1, sa: 4, sg: 2, tl: 1, tw: 1, ta: 2, tg: 0, iv: 6},
    "Bone Rattler": { wg: 4, ac: 1, on: 1, of: 3, mt: 3, sl: 4, sw: 5, sa: 2, sg: 0, tl: 1, tw: 5, ta: 1, tg: 1, iv: 5},
    "Badwagon / GLA": { wg: 4, ac: 0, on: 2, of: 5, mt: 3, sl: 5, sw: 2, sa: 3, sg: 1, tl: 0, tw: 1, ta: 1, tg: 0, iv: 7},
    "Standard ATV": { wg: 4, ac: 0, on: 2, of: 5, mt: 3, sl: 5, sw: 2, sa: 3, sg: 1, tl: 0, tw: 1, ta: 1, tg: 0, iv: 6},
} as const;
export type Kart = keyof typeof KartData;

export const Karts = ["Pipe Frame / Varmint", "Biddybuggy / Mr. Scooty", "City Tripper", "Cat Cruiser / Teddy Buggy", "Landship", "Standard Bike / W 25 Silver Arrow", "Comet / Yoshi Bike", "Flame Rider", "Wild Wiggler", "Tanooki Kart", "Streetle", "Koopa Clown / Master Cycle Zero", "Standard Kart / The Duke", "Prancer", "Sneeker", "Gold Standard", "Sport Bike / Jet Bike", "300 SL Roadster", "Master Cycle", "Mach 8 / Sports Coupe", "Blue Falcon", "Splat Buggy", "Inkstriker", "Steel Driver / Tri-Speeder", "Circuit Special / B Dasher / P-Wing", "Bone Rattler", "Badwagon / GLA", "Standard ATV"] as const;

export const TireData = {
    "Standard / Blue Standard": { wg: 2, ac: 4, on: 2, of: 5, mt: 4, sl: 2, sw: 3, sa: 2, sg: 3, tl: 3, tw: 3, ta: 3, tg: 3, iv: 3},
    "Monster / Hot Monster": { wg: 4, ac: 2, on: 3, of: 7, mt: 3, sl: 3, sw: 2, sa: 2, sg: 1, tl: 0, tw: 1, ta: 0, tg: 1, iv: 5},
    "Roller / Azure Roller": { wg: 0, ac: 6, on: 0, of: 4, mt: 6, sl: 0, sw: 3, sa: 0, sg: 3, tl: 4, tw: 4, ta: 4, tg: 4, iv: 0},
    "Slim / Wood / Crimson Slim": { wg: 2, ac: 2, on: 4, of: 1, mt: 3, sl: 3, sw: 2, sa: 4, sg: 2, tl: 4, tw: 4, ta: 3, tg: 4, iv: 4},
    "Slick / Cyber Slick": { wg: 3, ac: 1, on: 4, of: 0, mt: 2, sl: 4, sw: 0, sa: 4, sg: 0, tl: 2, tw: 0, ta: 2, tg: 1, iv: 4},
    "Metal": { wg: 4, ac: 0, on: 1, of: 2, mt: 2, sl: 4, sw: 3, sa: 1, sg: 2, tl: 2, tw: 2, ta: 1, tg: 0, iv: 5},
    "Button": { wg: 0, ac: 5, on: 1, of: 3, mt: 5, sl: 1, sw: 2, sa: 2, sg: 2, tl: 3, tw: 3, ta: 4, tg: 2, iv: 2},
    "Off-Road / Retro Off-Road": { wg: 3, ac: 3, on: 3, of: 6, mt: 3, sl: 3, sw: 4, sa: 2, sg: 1, tl: 1, tw: 1, ta: 2, tg: 2, iv: 6},
    "Sponge": { wg: 1, ac: 4, on: 2, of: 6, mt: 5, sl: 1, sw: 1, sa: 1, sg: 4, tl: 2, tw: 1, ta: 2, tg: 3, iv: 3},
    "Cushion": { wg: 1, ac: 4, on: 2, of: 6, mt: 5, sl: 1, sw: 1, sa: 1, sg: 4, tl: 2, tw: 1, ta: 2, tg: 3, iv: 5},
    "Gold Tires": { wg: 4, ac: 0, on: 1, of: 2, mt: 2, sl: 4, sw: 3, sa: 1, sg: 2, tl: 2, tw: 2, ta: 1, tg: 0, iv: 4},
    "GLA Tires": { wg: 2, ac: 4, on: 2, of: 5, mt: 4, sl: 2, sw: 3, sa: 2, sg: 3, tl: 3, tw: 3, ta: 3, tg: 3, iv: 4},
    "Triforce Tires": { wg: 3, ac: 3, on: 3, of: 6, mt: 3, sl: 3, sw: 4, sa: 2, sg: 1, tl: 1, tw: 1, ta: 2, tg: 2, iv: 5},
    "Leaf Tires": { wg: 0, ac: 5, on: 1, of: 3, mt: 5, sl: 1, sw: 2, sa: 2, sg: 2, tl: 3, tw: 3, ta: 4, tg: 2, iv: 5},
    "Ancient Tires": { wg: 4, ac: 2, on: 3, of: 7, mt: 3, sl: 3, sw: 2, sa: 2, sg: 1, tl: 0, tw: 1, ta: 0, tg: 1, iv: 1},
} as const;
export type Tire = keyof typeof TireData;

export const Tires = ["Standard / Blue Standard", "Monster / Hot Monster", "Roller / Azure Roller", "Slim / Wood / Crimson Slim", "Slick / Cyber Slick", "Metal", "Button", "Off-Road / Retro Off-Road", "Sponge", "Cushion", "Gold Tires", "GLA Tires", "Triforce Tires", "Leaf Tires", "Ancient Tires"] as const;

export const GliderData = {
    "Cloud Glider / Parachute / Flower Glider / Paper Glider": { wg: 0, ac: 2, on: 1, of: 1, mt: 2, sl: 0, sw: 1, sa: 1, sg: 1, tl: 1, tw: 0, ta: 1, tg: 2, iv: 0},
    "Peach Parasol / Parafoil / Bowser Kite / MKTV Parafoil": { wg: 1, ac: 2, on: 2, of: 0, mt: 2, sl: 0, sw: 0, sa: 1, sg: 1, tl: 1, tw: 1, ta: 0, tg: 2, iv: 0},
    "Super Glider / Waddle Wing / Hylian Kite": { wg: 1, ac: 1, on: 1, of: 1, mt: 1, sl: 1, sw: 1, sa: 0, sg: 2, tl: 1, tw: 0, ta: 1, tg: 1, iv: 1},
    "Wario Wing / Plane Glider / Gold Glider / Paraglider": { wg: 2, ac: 1, on: 2, of: 0, mt: 1, sl: 1, sw: 0, sa: 1, sg: 2, tl: 1, tw: 1, ta: 0, tg: 1, iv: 1},
} as const;
export type Glider = keyof typeof GliderData;

export const Gliders = ["Cloud Glider / Parachute / Flower Glider / Paper Glider", "Peach Parasol / Parafoil / Bowser Kite / MKTV Parafoil", "Super Glider / Waddle Wing / Hylian Kite", "Wario Wing / Plane Glider / Gold Glider / Paraglider"] as const;

export type Build = [Character, Kart, Tire, Glider]
export const CharacterNames = ["Metal Mario", "Pink Gold Peach", "Gold Mario", "Petey Piranha", "Bowser", "Morton", "Wario", "Dry Bowser", "Donkey Kong", "Waluigi", "Roy", "Wiggler", "Rosalina", "Link", "King Boo", "Link (Breath of the Wild)", "Luigi", "Iggy", "Kamek", "Mario", "Ludwig", "Mii (medium)", "Tanooki Mario", "Villager (male)", "Inkling Boy", "Peach", "Daisy", "Yoshi", "Birdo", "Toad", "Shy Guy", "Larry", "Cat Peach", "Villager (female)", "Inkling Girl", "Koopa Troopa", "Lakitu", "Bowser Jr.", "Toadette", "Wendy", "Isabelle", "Baby Mario", "Baby Luigi", "Dry Bones", "Baby Peach", "Baby Daisy", "Baby Rosalina", "Lemmy"] as const;
export const FuzzyCharacterFinder = new Fuse(CharacterNames, FuseOptions);
export const findCharacter = (searchTerm: string): Character[] => {
    return fuzzySearch(searchTerm, FuzzyCharacterFinder, Characters);
};

export const switchCharacter = (build: Build, newPart: Character): Build => {
    const output = [...build] as Build;
    output[0] = newPart;
    return output;
};

export const KartNames = ["Pipe Frame", "Biddybuggy", "Varmint", "Mr. Scooty", "City Tripper", "Cat Cruiser", "Landship", "Standard Bike", "Comet", "Flame Rider", "Yoshi Bike", "Wild Wiggler", "Teddy Buggy", "W 25 Silver Arrow", "Tanooki Kart", "Streetle", "Koopa Clown", "Master Cycle Zero", "Standard Kart", "Prancer", "Sneeker", "Gold Standard", "Sport Bike", "The Duke", "Jet Bike", "300 SL Roadster", "Master Cycle", "Mach 8", "Sports Coupe", "Blue Falcon", "Splat Buggy", "Inkstriker", "Steel Driver", "Circuit Special", "Tri-Speeder", "B Dasher", "P-Wing", "Bone Rattler", "Badwagon", "Standard ATV", "GLA"] as const;
export const FuzzyKartFinder = new Fuse(KartNames, FuseOptions);
export const findKart = (searchTerm: string): Kart[] => {
    return fuzzySearch(searchTerm, FuzzyKartFinder, Karts);
};

export const switchKart = (build: Build, newPart: Kart): Build => {
    const output = [...build] as Build;
    output[1] = newPart;
    return output;
};

export const TireNames = ["Standard", "Monster", "Roller", "Slim", "Slick", "Metal", "Button", "Off-Road", "Sponge", "Wood", "Cushion", "Blue Standard", "Hot Monster", "Azure Roller", "Crimson Slim", "Cyber Slick", "Retro Off-Road", "Gold Tires", "GLA Tires", "Triforce Tires", "Leaf Tires", "Ancient Tires"] as const;
export const FuzzyTireFinder = new Fuse(TireNames, FuseOptions);
export const findTire = (searchTerm: string): Tire[] => {
    return fuzzySearch(searchTerm, FuzzyTireFinder, Tires);
};

export const switchTire = (build: Build, newPart: Tire): Build => {
    const output = [...build] as Build;
    output[2] = newPart;
    return output;
};

export const GliderNames = ["Cloud Glider", "Parachute", "Flower Glider", "Paper Glider", "Peach Parasol", "Parafoil", "Bowser Kite", "MKTV Parafoil", "Super Glider", "Waddle Wing", "Hylian Kite", "Wario Wing", "Plane Glider", "Gold Glider", "Paraglider"] as const;
export const FuzzyGliderFinder = new Fuse(GliderNames, FuseOptions);
export const findGlider = (searchTerm: string): Glider[] => {
    return fuzzySearch(searchTerm, FuzzyGliderFinder, Gliders);
};

export const switchGlider = (build: Build, newPart: Glider): Build => {
    const output = [...build] as Build;
    output[3] = newPart;
    return output;
};

export const forEachBuild = (callback: (build: Build) => void): void => {
    Characters.forEach((Character) => {
    Karts.forEach((Kart) => {
    Tires.forEach((Tire) => {
    Gliders.forEach((Glider) => {
        callback([Character, Kart, Tire, Glider]);
    });
    });
    });
    });
    };

export const getBuildStat = (build: Build): Stat => {
    const stat = {...CharacterData[build[0]]}
    const KartStat = KartData[build[1]];
    const TireStat = TireData[build[2]];
    const GliderStat = GliderData[build[3]];
    stat.wg += KartStat.wg + TireStat.wg + GliderStat.wg;
    stat.ac += KartStat.ac + TireStat.ac + GliderStat.ac;
    stat.on += KartStat.on + TireStat.on + GliderStat.on;
    stat.of += KartStat.of + TireStat.of + GliderStat.of;
    stat.mt += KartStat.mt + TireStat.mt + GliderStat.mt;
    stat.sl += KartStat.sl + TireStat.sl + GliderStat.sl;
    stat.sw += KartStat.sw + TireStat.sw + GliderStat.sw;
    stat.sa += KartStat.sa + TireStat.sa + GliderStat.sa;
    stat.sg += KartStat.sg + TireStat.sg + GliderStat.sg;
    stat.tl += KartStat.tl + TireStat.tl + GliderStat.tl;
    stat.tw += KartStat.tw + TireStat.tw + GliderStat.tw;
    stat.ta += KartStat.ta + TireStat.ta + GliderStat.ta;
    stat.tg += KartStat.tg + TireStat.tg + GliderStat.tg;
    stat.iv += KartStat.iv + TireStat.iv + GliderStat.iv;
    return stat;
};

