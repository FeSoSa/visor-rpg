import { Dispatch, SetStateAction } from "react";

export interface IContext {
    user: IUser | null,
    getUser: () => void,
    player: IPlayer | null,
    getPlayer: () => void,
    authenticated: boolean,
    setAuthenticated: Dispatch<SetStateAction<boolean>>
}

export interface IUser {
    id: string,
    registry: string,
    name: string,
    token: string,
    role: 'admin' | 'player',
    createdAt: Date,
}

export interface Magazines {
    primary: MagazineSlot[]
    secondary: MagazineSlot[]
}
export interface MagazineSlot {
    bullets: number;
    type: "H" | "M" | "L" | "I" | "E";
    capacity: number;
    _id?: string
}
export interface Armor {
    type: "H" | "M" | "L" | "SH";
    hp: number;
    maxHp: number;
    slots: number;
    pocket: number;
    name: string;
}
export interface Guns {
    primary: Gun
    secondary: Gun
}
export interface Gun {
    url: string;
    name: string;
    capacity: number;
    magazineSelected: number;
    type: "H" | "M" | "L" | "I" | "E";
    mod: number;
}
export interface Item {
    _id?: string;
    url: string;
    name: string;
    desc?: string;
    quantity: number;
    usable: boolean
    type: "item" | "grenade";
    reloading?: boolean
    rechargeable?: boolean;
    value?: number
}
export type PlayerClass = 'sniper' | 'assault' | 'engeneer' | 'medic' | 'inteligence';
export interface IPlayer {
    _id: string,
    userRegistry: string,
    registry: string,
    name: string,
    codename: string,
    photo: string,
    status: string,
    class: PlayerClass,

    gunSelected: 'primary' | 'secondary'
    maxHp: number;
    hp: number;
    armor: Armor;
    magazines: Magazines;
    guns: Guns;
    utilitaries: Item[];
    items: Item[];
}
export interface OperatorData {
    gunSelected: 'primary' | 'secondary'
    maxHp: number;
    hp: number;
    armor: Armor;
    magazines: Magazines;
    guns: Guns;
    utilitaries: Item[];
    items: Item[];
}
export interface IGame {
    draw?: string[];
    combat: boolean

    showCompleteMap: boolean
    dbImages: any[]

    ruinedMap: string
    completeMap: string
    others: any[]
}
export interface IViews {
    image: string,
    label: string
}