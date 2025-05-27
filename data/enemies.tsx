import { IEnemie } from "@/typing.d.ts";

export const enemiesMock: Record<string, IEnemie> = {
    blindado: {
        name: "Blindado",
        armor: {
            url: "1fRVf1tw0EjLjLx5PCrlI4HygBkVPFwiW",
            type: "super-heavy",
            hp: 80,
            maxHp: 80,
            slots: 1,
            name: "Colete Ultra-Pesado",
            desc: "Extremamente pesado perdendo toda mobilidade, porém oferece proteção para todos tipos de calibre. Imune a calibres pequenos"
        },
        gun: {
            url: "13n42ZkeDqWG-mHLBtWN37KNpipzqPPfU",
            name: "M60",
            capacity: 80,
            magazineSelected: 0,
            type: "light",
            damage: 4
        },
        hp: 50,
        maxHp: 50,
        items: [],
        obs: "",
        magazines: [
            { bullets: 80, capacity: 80, type: "medium" },
            { bullets: 80, capacity: 80, type: "medium" }
        ]
    },
    lider: {
        name: "Kade",
        armor: {
            url: "1xEB5KVnHGRxTjW3c9H1FGAGi9ogUlXup",
            type: "titan",
            hp: 60,
            maxHp: 60,
            slots: 6,
            name: "Traje Titan",
            desc: "Um traje de combate avançado feito com titânio e fibra de carbono reforçada. Equipado com um exoesqueleto integrado, concede +1 em qualquer rolagem de teste, oferecendo força e precisão sobre-humanas no campo de batalha."
        },
        gun: {
            url: "1-NOO6aZKoEmrnITjJIH6ta-rtVu91LHQ",
            name: "AK-47",
            capacity: 24,
            magazineSelected: 0,
            type: "medium",
            damage: 5
        },
        hp: 50,
        maxHp: 50,
        magazines: [
            { bullets: 24, capacity: 24, type: "medium" },
            { bullets: 24, capacity: 24, type: "medium" },
            { bullets: 24, capacity: 24, type: "medium" },
            { bullets: 24, capacity: 24, type: "medium" },
            { bullets: 24, capacity: 24, type: "medium" },
            { bullets: 24, capacity: 24, type: "medium" },
        ],
        items: [
            {
                url: "1PswzouhphYfhPNm2IYl2or8DvhDsXlsd",
                name: "Granada incendiária",
                desc: "Causa dano flamejante em área, afeta personagens na área de impacto.",
                quantity: 2,
                usable: true,
                type: "grenade"
            },
            {
                url: "1f_yxE1Pefv2Lvvg0UZbqDqF8Xhod_Ypa",
                name: "Rádio tatico",
                desc: "Permite comunicação em um raio de até 50 metros.",
                quantity: 1,
                usable: false,
                type: "item",
            }
        ],
        obs: ""
    },
    julian: {
        name: "Julian Falcon",
        armor: {
            url: "1phvlzhZ1KaotEUb-avhCuKEZEE0xvuXC",
            type: "light",
            hp: 20,
            maxHp: 20,
            slots: 4,
            name: "Colete Leve",
            desc: "Ideal para mobilidade, oferece boa proteção contra armas de baixo calibre, mas frágil contra fuzis."
        },
        gun: {
            url: "1Zb1So3ADaAk6xThujwCHwuPClTkSIaLw",
            name: "Glock",
            capacity: 10,
            magazineSelected: 0,
            type: "light",
            damage: 2
        },
        hp: 25,
        maxHp: 25,
        magazines: [
            { bullets: 10, capacity: 10, type: "light" },
            { bullets: 10, capacity: 10, type: "light" },
            { bullets: 10, capacity: 10, type: "light" },
            { bullets: 10, capacity: 10, type: "light" },
        ],
        items: [
            {
                url: "1bmVI3Wo8FbzBGGcRBsZgoDGWGhWIhp9F",
                name: "Cartão de acesso",
                desc: "Acesso a áreas restritas.",
                quantity: 1,
                usable: false,
                type: "item",
            },
            {
                url: "1CE2k7-x61oEMYs7Wl2OwMyIjtXoJnVU3",
                name: "Kit Médico",
                desc: "Recupera 20 pontos de vida.",
                quantity: 1,
                usable: true,
                type: "item",
            }
        ],
        obs: ""
    },
    sniper: {
        name: "Sniper",
        armor: {
            url: "10P5H8gnaAiipRYpTcKl3bY6GjoYN46rI",
            type: "medium",
            hp: 32,
            maxHp: 32,
            slots: 5,
            name: "Colete Médio",
            desc: "Proteção balanceada, sendo eficaz contra fuzis de médio calibre, mas com limitação em impacto contínuo de fuzis pesados."
        },
        gun: {
            url: "1Ky4koQTNHNW7TZ4DY-QmA9s62lJDL1V9",
            name: "AWP",
            capacity: 7,
            magazineSelected: 0,
            type: "heavy",
            damage: 20,
            attachment: [
                {
                    url: "1aW1xZFSehl0l0myweHNnflplzs5f9amr",
                    name: "Scope x24",
                    desc: "Transforma a arma em uma Sniper Pesada",
                    damage: 0,
                    mod: 0,
                }
            ]
        },
        hp: 25,
        maxHp: 25,
        magazines: [
            { bullets: 7, capacity: 7, type: "heavy" },
            { bullets: 7, capacity: 7, type: "heavy" },
            { bullets: 7, capacity: 7, type: "heavy" },
            { bullets: 7, capacity: 7, type: "heavy" },
            { bullets: 7, capacity: 7, type: "heavy" },
        ],
        items: [
            {
                url: "1FILArysVn2OjIDP-oWs-sioxtRdG5SP_",
                name: "Binoculos",
                desc: "Permite enxergar longas distâncias.",
                quantity: 1,
                usable: false,
                type: "item",
            }
        ],
        obs: ""
    },
    bomber: {
        name: "Bomber",
        armor: {
            type: "none",
            hp: 0,
            maxHp: 0,
            slots: 2,
            name: "Nenhum",
        },
        gun: {
            url: "1Zb1So3ADaAk6xThujwCHwuPClTkSIaLw",
            name: "Glock",
            capacity: 10,
            magazineSelected: 0,
            type: "light",
            damage: 2
        },
        hp: 20,
        maxHp: 20,
        magazines: [
            { bullets: 10, capacity: 10, type: "light" },
            { bullets: 10, capacity: 10, type: "light" },
        ],
        items: [
            {
                url: "1pRzEGjHc1jsCCY83n4Zt4XfCRLUL2OSN",
                name: "Granda de fragmentação",
                desc: "Causa dano explosivo em área, afeta personagens na área de impacto.",
                quantity: 3,
                usable: true,
                type: "grenade"
            }
        ],
        obs: ""
    },
    canhoneiro: {
        name: "Canhoneiro",
        armor: {
            url: "1phvlzhZ1KaotEUb-avhCuKEZEE0xvuXC",
            type: "light",
            hp: 20,
            maxHp: 20,
            slots: 4,
            name: "Colete Leve",
            desc: "Ideal para mobilidade, oferece boa proteção contra armas de baixo calibre, mas frágil contra fuzis."
        },
        gun: {
            url: "12z7kSBgte8dHHe7TMBHVENND0e1KLFjN",
            name: "RPG",
            capacity: 1,
            magazineSelected: 0,
            type: "explosive",
            damage: 15
        },
        hp: 25,
        maxHp: 25,
        magazines: [
            { bullets: 1, capacity: 1, type: "explosive" },
            { bullets: 1, capacity: 1, type: "explosive" },
            { bullets: 1, capacity: 1, type: "explosive" },
        ],
        items: [],
        obs: ""
    },
    caçador: {
        name: "Caçador",
        armor: {
            url: "1phvlzhZ1KaotEUb-avhCuKEZEE0xvuXC",
            type: "light",
            hp: 20,
            maxHp: 20,
            slots: 4,
            name: "Colete Leve",
            desc: "Ideal para mobilidade, oferece boa proteção contra armas de baixo calibre, mas frágil contra fuzis."
        },
        gun: {
            url: "12z7kSBgte8dHHe7TMBHVENND0e1KLFjN",
            name: "Browning Bar MK3",
            capacity: 7,
            magazineSelected: 0,
            type: "medium",
            damage: 5,
            attachment: [
                {
                    url: "1aW1xZFSehl0l0myweHNnflplzs5f9amr",
                    name: "Scope x12",
                    desc: "Transforma a arma em uma Sniper leve",
                    damage: 0,
                    mod: 0,
                }
            ]
        },
        hp: 35,
        maxHp: 35,
        magazines: [
            { bullets: 7, capacity: 1, type: "medium" },
            { bullets: 7, capacity: 7, type: "medium" },
            { bullets: 7, capacity: 7, type: "medium" },
            { bullets: 7, capacity: 7, type: "medium" },
            { bullets: 7, capacity: 7, type: "medium" },
        ],
        items: [],
        obs: ""
    },
    exterminador: {
        name: "Exterminador",
        armor: {
            url: "1xEB5KVnHGRxTjW3c9H1FGAGi9ogUlXup",
            type: "titan",
            hp: 60,
            maxHp: 60,
            slots: 6,
            name: "Traje Titan",
            desc: "Um traje de combate avançado feito com titânio e fibra de carbono reforçada. Equipado com um exoesqueleto integrado, concede +1 em qualquer rolagem de teste, oferecendo força e precisão sobre-humanas no campo de batalha."
        },
        gun: {
            url: "1LEEIQpdLRcfwCxNBzb_aoNORtuvf0B9k",
            name: "Railgun",
            capacity: 2,
            magazineSelected: 0,
            type: "eletric",
            damage: 60,
        },
        hp: 50,
        maxHp: 50,
        magazines: [
            { bullets: 1, capacity: 1, type: "eletric" },
            { bullets: 1, capacity: 1, type: "eletric" },
        ],
        items: [],
        obs: ""
    },
    lobo: {
        name: "Lobo Selvagem",
        armor: {
            type: "none",
            hp: 0,
            maxHp: 0,
            slots: 0,
            name: "Nenhum"
        },
        gun: {
            url: "1z-mITuwnvvfGcIzxmU_sYLUbGTO32XYI",
            name: "Garra selvagem",
            capacity: 10,
            magazineSelected: 0,
            type: "light",
            damage: 6
        },
        hp: 25,
        maxHp: 25,
        magazines: [
            { bullets: 10, capacity: 10, type: "light" },
        ],
        items: [],
        obs: ""
    }
}