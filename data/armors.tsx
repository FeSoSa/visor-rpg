import { Armor } from "@/typing.d.ts";

export const armorMock: Record<string, Armor> = {
    none: {
        type: " ",
        hp: 0,
        maxHp: 0,
        slots: 2,
        pocket: 0,
        name: "Nenhum"
    },
    light: {
        type: "L",
        hp: 20,
        maxHp: 20,
        slots: 4,
        pocket: 1,
        name: "Colete leve"
    },
    medium: {
        type: "M",
        hp: 32,
        maxHp: 32,
        slots: 5,
        pocket: 2,
        name: "Colete médio"
    },
    heavy: {
        type: "H",
        hp: 42,
        maxHp: 42,
        slots: 6,
        pocket: 2,
        name: "Colete pesado"
    },
    superHeavy: {
        type: "SH",
        hp: 150,
        maxHp: 150,
        slots: 1,
        pocket: 0,
        name: "Colete super-pesado"
    },
}