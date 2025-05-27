import { Armor } from "@/typing.d.ts";

export const armorMock: Record<string, Armor> = {
    none: {
        type: "none",
        hp: 0,
        maxHp: 0,
        slots: 2,
        name: "Nenhum",
    },
    light: {
        url: "1phvlzhZ1KaotEUb-avhCuKEZEE0xvuXC",
        type: "light",
        hp: 20,
        maxHp: 20,
        slots: 4,
        name: "Colete Leve",
        desc: "Ideal para mobilidade, oferece boa proteção contra armas de baixo calibre, mas frágil contra fuzis."
    },
    medium: {
        url: "10P5H8gnaAiipRYpTcKl3bY6GjoYN46rI",
        type: "medium",
        hp: 32,
        maxHp: 32,
        slots: 5,
        name: "Colete Médio",
        desc: "Proteção balanceada, sendo eficaz contra fuzis de médio calibre, mas com limitação em impacto contínuo de fuzis pesados."
    },
    heavy: {
        url: "13n42ZkeDqWG-mHLBtWN37KNpipzqPPfU",
        type: "heavy",
        hp: 42,
        maxHp: 42,
        slots: 6,
        name: "Colete Pesado",
        desc: "Focado em absorver impactos de alta intensidade, mas reduz a mobilidade. Ideal para enfrentamentos pesados."
    },
    superHeavy: {
        url: "1fRVf1tw0EjLjLx5PCrlI4HygBkVPFwiW",
        type: "super-heavy",
        hp: 80,
        maxHp: 80,
        slots: 1,
        name: "Colete Ultra-Pesado",
        desc: "Extremamente pesado perdendo toda mobilidade, porém oferece proteção para todos tipos de calibre. Imune a calibres pequenos"
    },
    titan: {
        url: "1xEB5KVnHGRxTjW3c9H1FGAGi9ogUlXup",
        type: "titan",
        hp: 60,
        maxHp: 60,
        slots: 6,
        name: "Traje Titan",
        desc: "Um traje de combate avançado feito com titânio e fibra de carbono reforçada. Equipado com um exoesqueleto integrado, concede +1 em qualquer rolagem de teste, oferecendo força e precisão sobre-humanas no campo de batalha."
    }
}