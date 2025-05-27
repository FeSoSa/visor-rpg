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
    secondary?: MagazineSlot[]
}
export interface MagazineSlot {
    bullets: number;
    type: gunTypes;
    capacity: number;
    _id?: string
}
export interface Armor {
    type: armorTypes;
    hp: number;
    maxHp: number;
    slots: number;
    name: string;
    desc?: string
    url?: string
}
export interface Guns {
    primary: Gun
    secondary?: Gun
}
export interface Gun {
    url: string;
    name: string;
    desc?: string;
    capacity: number;
    magazineSelected: number;
    damage: number;
    type: gunTypes;
    attachment?: Attachment[];
}
export interface Attachment {
    url: string;
    name: string;
    desc: string
    mod: number
    damage: number
}
export interface Companion {
    name: string;
    desc: string;
    maxHp: number;
    hp: number;
    url: string;
    usable: boolean
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
export interface IPlayer {
    _id: string,
    userRegistry: string,
    registry: string,
    nationality: string,
    name: string,
    codename: string,
    photo: string,
    status: string,
    class: playerClass,

    gunSelected: 'primary' | 'secondary'
    maxHp: number;
    hp: number;
    armor: Armor;
    magazines: Magazines;
    guns: Guns;
    companion: Companion
    utilitaries: Item[];
    items: Item[];
}
export interface IEnemie {
    _id?: string,
    name: string,
    maxHp: number;
    hp: number;
    armor: Armor;
    gun: Gun
    magazines: MagazineSlot[];
    items: Item[];
    obs: string
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
    companion?: Companion
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

export type gunTypes = "light" | "medium" | "heavy" | "shell" | "explosive" | "eletric" | "shield"
export type armorTypes = "light" | "medium" | "heavy" | "super-heavy" | "titan" | "none"
export type playerClass = 'sniper' | 'assault' | 'engeneer' | 'medic' | 'inteligence' | 'hunter' | 'vanguard'