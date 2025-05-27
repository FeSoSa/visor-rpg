import { Attachment, Gun } from "@/typing.d.ts";

export const weaponMock: Record<string, Gun> = {
    m4a1: {
        url: "1EgCC_-AghiS1erTqKAOO2J4qSsT2hGZW",
        name: "M4A1",
        capacity: 24,
        magazineSelected: 0,
        type: "medium",
        damage: 5
    },
    ak47: {
        url: "1-NOO6aZKoEmrnITjJIH6ta-rtVu91LHQ",
        name: "AK-47",
        capacity: 24,
        magazineSelected: 0,
        type: "medium",
        damage: 5
    },
    glock: {
        url: "1Zb1So3ADaAk6xThujwCHwuPClTkSIaLw",
        name: "Glock",
        capacity: 10,
        magazineSelected: 0,
        type: "light",
        damage: 2
    },
    usp: {
        url: "17iozdwNXNX6qhqBdsJfvU5ktEgWUBNEN",
        name: "USP-S",
        capacity: 10,
        magazineSelected: 0,
        type: "light",
        damage: 2
    },
    eagle: {
        url: "1ri6cwcKkM9Cho_hmLGk8DSBKL_OsMWfg",
        name: "Desert Eagle",
        capacity: 7,
        magazineSelected: 0,
        type: "medium",
        damage: 3
    },
    barret: {
        url: "1Ky4koQTNHNW7TZ4DY-QmA9s62lJDL1V9",
        name: "Barret M82",
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
    awp: {
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
    mp5: {
        url: "1vQcx-gOnVSGFCQJVruP41gDaZnbMfywH",
        name: "MP5",
        capacity: 30,
        magazineSelected: 0,
        type: "light",
        damage: 3
    },
    uzi: {
        url: "1vQcx-gOnVSGFCQJVruP41gDaZnbMfywH",
        name: "Uzi",
        capacity: 30,
        magazineSelected: 0,
        type: "light",
        damage: 3
    },
    m60: {
        url: "13n42ZkeDqWG-mHLBtWN37KNpipzqPPfU",
        name: "M60",
        capacity: 80,
        magazineSelected: 0,
        type: "light",
        damage: 4
    },
    gauge: {
        url: "1u0ct9d0ko2LlW5Ih07xST_6n2PJ_JLvR",
        name: "12 Gauge",
        capacity: 8,
        magazineSelected: 0,
        type: "shell",
        damage: 7
    },
    rpg: {
        url: "12z7kSBgte8dHHe7TMBHVENND0e1KLFjN",
        name: "RPG",
        capacity: 1,
        magazineSelected: 0,
        type: "explosive",
        damage: 15
    },
    vector: {
        url: "1I8Mw1K6pLLtSnFqRRfVBRsdFtjzFrlNR",
        name: "KRISS Vector",
        capacity: 25,
        magazineSelected: 0,
        type: "light",
        damage: 4
    },
    shield: {
        url: "1s5KBlMAL8mNuxX3TxcjQuNKOKcETa6lT",
        name: "Escudo blindado",
        capacity: 1,
        magazineSelected: 0,
        type: "shield",
        damage: 0
    },
    browning: {
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
    taurus: {
        url: "1BgHnfUkgStA_6kts8PoO1MArDkGApEip",
        name: "Taurus",
        capacity: 7,
        magazineSelected: 0,
        type: "medium",
        damage: 3
    },
    railgun: {
        url: "1LEEIQpdLRcfwCxNBzb_aoNORtuvf0B9k",
        name: "Railgun",
        capacity: 2,
        magazineSelected: 0,
        type: "eletric",
        damage: 60
    },
    claw: {
        url: "1z-mITuwnvvfGcIzxmU_sYLUbGTO32XYI",
        name: "Garra selvagem",
        capacity: 10,
        magazineSelected: 0,
        type: "light",
        damage: 6
    },


    s_eagle: {
        url: "1ri6cwcKkM9Cho_hmLGk8DSBKL_OsMWfg",
        name: "Desert Eagle Dourada",
        capacity: 7,
        magazineSelected: 0,
        type: "medium",
        damage: 4
    },
}

export const attachmentMock: Record<string, Attachment> = {
    muzzle: {
        url: "1QFCfqja1uj19tVc277z5pnY-5a4h1b4L",
        name: "Freio de boca",
        desc: "Aumenta o dano da arma em +1",
        damage: 1,
        mod: 0,
    },
    silencer: {
        url: "1QFCfqja1uj19tVc277z5pnY-5a4h1b4L",
        name: "Silenciador",
        desc: "Aumenta a precisão da arma em +1 e diminui o som causado",
        damage: 0,
        mod: 1,
    },
    grip: {
        url: "1GzCXpyot6cNXPOOBBmjYGjcT5lIzbEix",
        name: "Cabo vertical",
        desc: "Aumenta a precisão da arma em +1",
        damage: 0,
        mod: 1,
    },
    x24: {
        url: "1aW1xZFSehl0l0myweHNnflplzs5f9amr",
        name: "Scope x24",
        desc: "Transforma a arma em uma Sniper Pesada",
        damage: 0,
        mod: 0,
    },
    x12: {
        url: "1aW1xZFSehl0l0myweHNnflplzs5f9amr",
        name: "Scope x12",
        desc: "Transforma a arma em uma Sniper leve",
        damage: 0,
        mod: 0,
    },
    x2: {
        url: "1aW1xZFSehl0l0myweHNnflplzs5f9amr",
        name: "Scope x2",
        desc: "Aumenta a precisão em +1",
        damage: 0,
        mod: 1,
    },
    thermal: {
        url: "1aW1xZFSehl0l0myweHNnflplzs5f9amr",
        name: "Scope Termal",
        desc: "Sem redução de precisão por obstáculos",
        damage: 0,
        mod: 0,
    },
    fang: {
        url: "1OWKaxxgwqOsCZTkadEg8QoDcUvdonFc5",
        name: "Presas de aço",
        desc: "Presas metálicas feitas de aço, equipáveis por animais caninos. Aumentam o dano em ataques corpo a corpo.",
        damage: 2,
        mod: 0,
    },
}