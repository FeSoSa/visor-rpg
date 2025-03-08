import { IEnemie } from "@/typing.d.ts";

export const enemiesMock: Record<string, IEnemie> = {
    blindado: {
        name: "Blindado",
        armor: {
            type: "SH",
            hp: 150,
            maxHp: 150,
            slots: 1,
            pocket: 0,
            name: "Colete super-pesado"
        },
        gun: {
            url: "13n42ZkeDqWG-mHLBtWN37KNpipzqPPfU",
            name: "M60",
            capacity: 80,
            magazineSelected: 0,
            type: "M",
            mod: 0
        },
        hp: 50,
        maxHp: 50,
        items: [],
        obs: "",
        magazines: [
            { bullets: 80, capacity: 80, type: "M" },
            { bullets: 80, capacity: 80, type: "M" }
        ]
    },
    lider: {
        name: "Viktor Sokolov",
        armor: {
            type: "M",
            hp: 32,
            maxHp: 32,
            slots: 5,
            pocket: 2,
            name: "Colete médio"
        },
        gun: {
            url: "1ri6cwcKkM9Cho_hmLGk8DSBKL_OsMWfg",
            name: "Desert Eagle",
            capacity: 7,
            magazineSelected: 0,
            type: "M",
            mod: 2
        },
        hp: 35,
        maxHp: 35,
        magazines: [
            { bullets: 7, capacity: 7, type: "M" },
            { bullets: 7, capacity: 7, type: "M" },
            { bullets: 7, capacity: 7, type: "M" },
            { bullets: 7, capacity: 7, type: "M" },
            { bullets: 7, capacity: 7, type: "M" },
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
    sniper: {
        name: "Sniper",
        armor: {
            type: "M",
            hp: 32,
            maxHp: 32,
            slots: 5,
            pocket: 2,
            name: "Colete médio"
        },
        gun: {
            url: "1Ky4koQTNHNW7TZ4DY-QmA9s62lJDL1V9",
            name: "AWP",
            capacity: 7,
            magazineSelected: 0,
            type: "H",
            mod: 0
        },
        hp: 25,
        maxHp: 25,
        magazines: [
            { bullets: 7, capacity: 7, type: "H" },
            { bullets: 7, capacity: 7, type: "H" },
            { bullets: 7, capacity: 7, type: "H" },
            { bullets: 7, capacity: 7, type: "H" },
            { bullets: 7, capacity: 7, type: "H" },
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
            type: " ",
            hp: 0,
            maxHp: 0,
            slots: 3,
            pocket: 0,
            name: "Nenhum"
        },
        gun: {
            url: "1Zb1So3ADaAk6xThujwCHwuPClTkSIaLw",
            name: "Glock",
            capacity: 10,
            magazineSelected: 0,
            type: "L",
            mod: 0
        },
        hp: 20,
        maxHp: 20,
        magazines: [
            { bullets: 10, capacity: 10, type: "L" },
            { bullets: 10, capacity: 10, type: "L" },
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
            type: "L",
            hp: 20,
            maxHp: 20,
            slots: 4,
            pocket: 1,
            name: "Colete leve"
        },
        gun: {
            url: "12z7kSBgte8dHHe7TMBHVENND0e1KLFjN",
            name: "RPG",
            capacity: 1,
            magazineSelected: 0,
            type: "E",
            mod: 0
        },
        hp: 25,
        maxHp: 25,
        magazines: [
            { bullets: 1, capacity: 1, type: "E" },
            { bullets: 1, capacity: 1, type: "E" },
            { bullets: 1, capacity: 1, type: "E" },
        ],
        items: [],
        obs: ""
    }
}