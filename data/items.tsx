import { Item } from "@/typing.d.ts";

export const itemsMock: Record<string, Item> = {
    frag: {
        url: "1pRzEGjHc1jsCCY83n4Zt4XfCRLUL2OSN",
        name: "Granda de fragmentação",
        desc: "Causa dano explosivo em área, afeta personagens na área de impacto.",
        quantity: 1,
        usable: true,
        type: "grenade"
    },
    bandage: {
        url: "1hWm4r-u3zxj-6shuIa5XaRvlH0nCncjK",
        name: "Bandagem",
        desc: "Recupera 1D10 pontos de vida.",
        quantity: 1,
        usable: true,
        type: "grenade",
    },
    flashbang: {
        url: "11lvAX4Cnm2Bx4nkGeNKjajy5E3T8aGhu",
        name: "Granada flashbang",
        desc: "Causa cegueira temporária e desorientação nos inimigos próximos.",
        quantity: 1,
        usable: true,
        type: "grenade",
    },
    medkit: {
        url: "1CE2k7-x61oEMYs7Wl2OwMyIjtXoJnVU3",
        name: "Kit Médico",
        desc: "Recupera 20 pontos de vida.",
        quantity: 1,
        usable: true,
        type: "item",
    },
    plate: {
        url: "1tc9j7OKeIkZA6SQvaasFgK6jjo4Yu_Fn",
        name: "Placa balística",
        desc: "Repara o colete até o nível médio, se possível.",
        quantity: 1,
        usable: true,
        type: "item",
    },
    smoke: {
        url: "1cVDwZFEJuza3NHCB_LsQXR_GpOQ-upUl",
        name: "Granada de fumaça",
        desc: "Cria uma nuvem de fumaça que obscurece a visão, útil para coberturas rápidas.",
        quantity: 1,
        usable: true,
        type: "grenade",
    },
    radio: {
        url: "1f_yxE1Pefv2Lvvg0UZbqDqF8Xhod_Ypa",
        name: "Rádio tatico",
        desc: "Permite comunicação em um raio de até 50 metros.",
        quantity: 1,
        usable: false,
        type: "item",
    },
    flare: {
        url: "1yVLlvZ4LyjoWqOXmROnOBNNWzYoLA7LY",
        name: "Sinalizador",
        desc: "Chama o helicóptero se estiver perto, mas também atrai inimigos.",
        quantity: 1,
        usable: true,
        type: "item",
    },
    ammoBox: {
        url: "12wB4WS8910MK9f5LwWJr4lXcKZ3ZBYbF",
        name: "Caixa de munição",
        desc: "Recarrega até 6 cartuchos vazios fora de combate.",
        quantity: 1,
        usable: true,
        type: "item",
    },
    binoculars: {
        url: "1FILArysVn2OjIDP-oWs-sioxtRdG5SP_",
        name: "Binoculos",
        desc: "Permite enxergar longas distâncias.",
        quantity: 1,
        usable: false,
        type: "item",
    },
    painkiller: {
        url: "1AFQ6Y_aVUq0Bz24iWjpYdtOqFwwX4AT_",
        name: "Analgesico",
        desc: "Reduz o dano recebido em 50% por 3 turnos.",
        quantity: 1,
        usable: true,
        type: "item",
    },
    food: {
        url: "1ouHWt7yvN9Tx3sae6YqWWUgppdiUBIw2",
        name: "Alimento",
        desc: "Recupera 1D6 pontos de vida.",
        quantity: 1,
        usable: true,
        type: "item",
    },
    adrenaline: {
        url: "1Lbgcj8CWUprNWeo6rRlB7yFEa6pY7tqK",
        name: "Injeção de adrenalina",
        desc: "Aumenta +1 na rolagem de algum aliado por 2 turnos. 1 vez por combate",
        quantity: 1,
        usable: true,
        type: "item",
    },
    soundGrenade: {
        url: "1ybfJ2pTZKRDpY97lQzBP9Q6stskr6gZM",
        name: "Granada sonora",
        desc: "Causa distrações sonoras no ambiente",
        quantity: 1,
        usable: true,
        type: "item",
    },
    grenadeLauncher: {
        url: "1iVGNNvQPSijxlEs3fIWgEK38zq_jI70_",
        name: "Lança granada",
        desc: "Dispara granadas de maneira mais eficaz.",
        quantity: 1,
        usable: true,
        type: "item",
    },
    improvisedPlate: {
        url: "1K3IQK71diVxhSJkvzdOeDFmkZ1jIQwrM",
        name: "Placa balística improvisada",
        desc: "Criado a partir de uma placa de metal achado nos arredores, oferece alguma proteção em momentos urgentes.",
        quantity: 1,
        usable: true,
        type: "item",
        value: 12
    },
    key: {
        url: "1if_21mUKurzmmEQpDTRLHC8ER9kPfeED",
        name: "Chave",
        desc: "Usada para abrir portas ou cofres.",
        quantity: 1,
        usable: false,
        type: "item",
    },
    keycard: {
        url: "1bmVI3Wo8FbzBGGcRBsZgoDGWGhWIhp9F",
        name: "Cartão de acesso",
        desc: "Acesso a áreas restritas.",
        quantity: 1,
        usable: false,
        type: "item",
    },
    drone: {
        url: "1Ut1kUFLkImNr6EHoZeL8Wso2MJuYYIbP",
        name: "Drone",
        desc: "Veículo aéreo controlado remotamente para vigilância e ataque.",
        quantity: 1,
        usable: true,
        type: "item",
        rechargeable: true,
        reloading: false
    },
    laptop: {
        url: "1ObOyBd6HpPhzYJmL1KrJQvpN27E325JI",
        name: "Laptop de Hacking",
        desc: "Equipamento usado para realizar ataques cibernéticos ou acessar sistemas seguros.",
        quantity: 1,
        usable: true,
        type: "item",
        rechargeable: true,
        reloading: false
    },
    molotov: {
        url: "1PswzouhphYfhPNm2IYl2or8DvhDsXlsd",
        name: "Granada incendiária",
        desc: "Causa dano flamejante em área, afeta personagens na área de impacto.",
        quantity: 1,
        usable: true,
        type: "grenade"
    },
    mask: {
        url: "1NVot0VSonCgJak_49_PlujwLbPxBwbQv",
        name: "Máscara Tática de Gás",
        desc: "Filtra gases tóxicos e fumaça. Protege contra efeitos respiratórios.",
        quantity: 1,
        usable: false,
        type: "item"
    },
    composite: {
        url: "1SojvXe07iJ6U4IRSt_nfZsR7NAUTFvTO",
        name: "VitaFlux-R",
        desc: "Composto injetável que concede +30 de vida temporária.",
        quantity: 1,
        usable: true,
        type: "item"
    },
    nano: {
        url: "1soNKqGX5CqULY3Il9hjzynJx6jBTMdmB",
        name: "NanoDart-X",
        desc: "Lançador de mísseis miniaturizados acoplado ao braço. Capaz de atingir inimigos atrás de cobertura.",
        quantity: 1,
        usable: true,
        type: "item",
        value: 6
    },
    glass: {
        url: "19JOnsuAKXh9gMiMIvKAsq9dJDnxhEDb5",
        name: "Spectra-V",
        desc: "Óculos avançados que permitem visão clara em meio a fumaça, gás e neblina.",
        quantity: 1,
        usable: false,
        type: "item"
    },
    hook: {
        url: "1-6xxRq-4mcPdopxWRIYQnTo2e1DhXffG",
        name: "Gancho Ascendente",
        desc: "Dispositivo portátil para escalada rápida em estruturas verticais.",
        quantity: 1,
        usable: true,
        type: "item"
    },
    pem: {
        url: "1k99YqT7BnwT_MBnicp_CzmkLOhQImrNK",
        name: "Mini PEM",
        desc: "Pulso eletromagnético de curto alcance que desativa eletrônicos em um pequeno raio.",
        quantity: 1,
        usable: true,
        type: "grenade"
    },
    special: {
        url: "1DUJa0qPYKjUuH7sQdJSEiZ9_8HibvZrp",
        name: "Balas Especiais",
        desc: "Munição de alto desempenho, superior à pesada. Pode incluir efeitos como perfuração, explosão ou choque.",
        quantity: 1,
        usable: true,
        type: "item"
    }
}